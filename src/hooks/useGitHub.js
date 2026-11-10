import { useEffect, useState } from 'react';
import { githubFallback } from '../data/site';

const USERNAME = 'aakashpuree';
const CACHE_PREFIX = 'ap:github:v2:';
const CACHE_TTL = 30 * 60 * 1000;
const inflight = new Map();

function readCache(key) {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.at > CACHE_TTL) return null;
    return parsed.value;
  } catch {
    return null;
  }
}

function writeCache(key, value) {
  try {
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ at: Date.now(), value }));
  } catch {
    // Storage can be unavailable (private mode / quota). Live data still renders.
  }
}

function requestJson(url) {
  if (inflight.has(url)) return inflight.get(url);

  const request = fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
    .then((response) => {
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      return response.json();
    })
    .finally(() => inflight.delete(url));

  inflight.set(url, request);
  return request;
}

async function load(key, url) {
  const cached = readCache(key);
  if (cached) return cached;
  const value = await requestJson(url);
  writeCache(key, value);
  return value;
}

function buildWeeks(contributions) {
  if (!Array.isArray(contributions) || contributions.length === 0) return [];

  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    const days = contributions.slice(i, i + 7);
    weeks.push({ days, label: null });
  }

  let previousMonth = '';
  weeks.forEach((week) => {
    if (!week.days[0]) return;
    const date = new Date(`${week.days[0].date}T00:00:00`);
    const month = date.toLocaleString('en-US', { month: 'short' });
    if (month !== previousMonth) {
      week.label = month;
      previousMonth = month;
    }
  });

  return weeks;
}

function deriveState({ profile, repositories, contributions, status }) {
  const safeProfile = profile || githubFallback.profile;
  const hasLiveRepos = Array.isArray(repositories) && repositories.length > 0;
  const sourceRepos = hasLiveRepos ? repositories : githubFallback.repositories;
  const repos = sourceRepos.filter((repo) => !repo.fork && !repo.archived);

  const stars = hasLiveRepos
    ? repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
    : githubFallback.totals.stars;

  const languageCounts = new Map();
  repos.forEach((repo) => {
    if (!repo.language) return;
    languageCounts.set(repo.language, (languageCounts.get(repo.language) || 0) + 1);
  });
  const languageEntries = [...languageCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const languageTotal = languageEntries.reduce((sum, [, count]) => sum + count, 0) || 1;

  const percentages = languageEntries.map(([name, count]) => {
    const exact = (count / languageTotal) * 100;
    return { name, count, exact, percent: Math.floor(exact) };
  });
  const remaining = 100 - percentages.reduce((sum, language) => sum + language.percent, 0);
  const byRemainder = [...percentages].sort(
    (a, b) => (b.exact % 1) - (a.exact % 1) || b.count - a.count,
  );
  for (let i = 0; i < remaining; i += 1) {
    byRemainder[i % byRemainder.length].percent += 1;
  }

  const languages = hasLiveRepos && percentages.length > 0
    ? percentages.map(({ name, count, percent }) => ({ name, count, percent }))
    : githubFallback.languages;

  const latest = [...repos]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 4);

  const contributionList = Array.isArray(contributions?.contributions)
    ? contributions.contributions
    : [];
  const contributionTotal = contributionList.length > 0
    ? contributions?.total?.lastYear
      ?? contributionList.reduce((sum, day) => sum + (day.count || 0), 0)
    : githubFallback.totals.contributions;

  return {
    status,
    profile: safeProfile,
    repositories: repos,
    latest,
    languages,
    weeks: buildWeeks(contributionList),
    totals: {
      repos: safeProfile.public_repos || repos.length,
      stars,
      followers: safeProfile.followers || 0,
      contributions: contributionTotal,
    },
  };
}

function initialState() {
  const profile = readCache('profile');
  const repositories = readCache('repos');
  const contributions = readCache('contributions');
  return deriveState({
    profile,
    repositories,
    contributions,
    status: profile && repositories ? 'ready' : 'loading',
  });
}

export default function useGitHub() {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    let active = true;

    Promise.allSettled([
      load('profile', `https://api.github.com/users/${USERNAME}`),
      load('repos', `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
      load('contributions', `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`),
    ]).then(([profileResult, reposResult, contributionsResult]) => {
      if (!active) return;

      const profile = profileResult.status === 'fulfilled' ? profileResult.value : null;
      const repositories = reposResult.status === 'fulfilled' ? reposResult.value : null;
      const contributions = contributionsResult.status === 'fulfilled'
        ? contributionsResult.value
        : null;

      setData(deriveState({
        profile,
        repositories,
        contributions,
        status: profile && repositories ? 'ready' : 'error',
      }));
    });

    return () => {
      active = false;
    };
  }, []);

  return data;
}
