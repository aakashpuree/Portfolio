import {
  ArrowUpRight,
  FolderGit2,
  GitBranch,
  Star,
  Users,
} from 'lucide-react';
import { site } from '../data/site';
import { formatNumber, formatRelativeDate, languageColor } from '../lib/format';
import { BrandIcon } from './BrandIcons';
import CountUp from './CountUp';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const statCards = [
  { key: 'repos', label: 'Public repositories', icon: FolderGit2 },
  { key: 'stars', label: 'Stars earned', icon: Star },
  { key: 'followers', label: 'GitHub followers', icon: Users },
  { key: 'contributions', label: 'Contributions / year', icon: GitBranch },
];

function Heatmap({ github }) {
  const { weeks } = github;

  if (weeks.length === 0) {
    return (
      <div className="heatmap-empty">
        <p>Contribution data is temporarily unavailable.</p>
        <a
          className="text-link"
          href={`${site.github}?tab=overview&from=${new Date().getFullYear()}-01-01`}
          target="_blank"
          rel="noreferrer"
        >
          View the contribution graph on GitHub
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className="heatmap-scroll">
      <div
        className="heatmap-months"
        style={{ '--weeks': weeks.length }}
        aria-hidden="true"
      >
        {weeks.map((week, index) => (
          week.label ? (
            <span key={`${week.label}-${index}`} style={{ gridColumnStart: index + 1 }}>
              {week.label}
            </span>
          ) : null
        ))}
      </div>
      <div className="heatmap" style={{ '--weeks': weeks.length }}>
        {weeks.map((week) => week.days.map((day) => (
          <span
            className="heat-cell"
            key={day.date}
            data-level={day.level}
            title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
            aria-label={`${day.count} contributions on ${day.date}`}
          />
        )))}
      </div>
      <div className="heat-legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span className="heat-legend-cell" data-level={level} key={level} aria-hidden="true" />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

export default function OpenSource({ github }) {
  const { profile } = github;

  return (
    <section className="section section--surface" id="github" aria-labelledby="github-title">
      <div className="container">
        <SectionHeading
          index="04"
          label="Open source"
          title={(
            <>
              Built in public<span className="accent">.</span>
            </>
          )}
          description="I learn by shipping. These are the numbers behind the repositories — pulled live from GitHub."
          id="github-title"
        />

        <div className="os-stats">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal className="stat-card" key={card.key} delay={index * 70}>
                <span className="stat-icon" aria-hidden="true"><Icon size={19} /></span>
                <strong><CountUp value={github.totals[card.key]} /></strong>
                <span>{card.label}</span>
              </Reveal>
            );
          })}
        </div>

        <div className="os-grid">
          <Reveal className="os-panel os-panel--heatmap" delay={80}>
            <div className="os-panel-head">
              <div className="os-profile">
                <img
                  src={profile.avatar_url}
                  alt=""
                  width="44"
                  height="44"
                  loading="lazy"
                />
                <div>
                  <strong>@{site.username}</strong>
                  <span>{profile.bio || site.philosophy}</span>
                </div>
              </div>
              <div className="os-heatmap-total">
                <strong>{formatNumber(github.totals.contributions)}</strong>
                <span>contributions in the last year</span>
              </div>
            </div>

            <Heatmap github={github} />

            <p className="os-source">
              Live from the GitHub API · cached for 30 minutes
            </p>
          </Reveal>

          <Reveal className="os-panel os-panel--repos" delay={140}>
            <div className="os-panel-head">
              <div>
                <span className="eyebrow eyebrow--accent">Recently updated</span>
                <h3>Latest repositories</h3>
              </div>
              <BrandIcon name="github" size={22} />
            </div>

            <div className="repo-list">
              {github.latest.map((repo) => (
                <a
                  className="repo-row"
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="repo-info">
                    <span className="repo-name">
                      {repo.name}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                    <span className="repo-desc">{repo.description || 'No description yet.'}</span>
                  </div>
                  <div className="repo-meta">
                    {repo.language ? (
                      <span className="repo-language">
                        <span
                          className="lang-dot"
                          style={{ background: languageColor(repo.language) }}
                          aria-hidden="true"
                        />
                        {repo.language}
                      </span>
                    ) : null}
                    {repo.stargazers_count > 0 ? (
                      <span className="repo-stars">
                        <Star size={12} aria-hidden="true" />
                        {repo.stargazers_count}
                      </span>
                    ) : null}
                    <span>{formatRelativeDate(repo.updated_at)}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="os-repos-footer">
              <a className="btn btn-ghost btn-sm" href={site.github} target="_blank" rel="noreferrer">
                Follow @{site.username}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
