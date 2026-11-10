import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  CloudSun,
  ExternalLink,
  HeartPulse,
  ScanLine,
  Sparkles,
  Star,
  Terminal,
} from 'lucide-react';
import { featuredProjects, site } from '../data/site';
import { BrandIcon } from './BrandIcons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const coverIcons = {
  sparkles: Sparkles,
  scan: ScanLine,
  cloud: CloudSun,
  heart: HeartPulse,
  book: BookOpen,
  terminal: Terminal,
};

const filters = ['All', 'Web Apps', 'Python & ML'];

function ProjectCover({ project, index }) {
  const Icon = coverIcons[project.icon] || Sparkles;
  return (
    <div className="project-cover" aria-hidden="true">
      <div className="project-cover-grid" />
      <span className="project-cover-index">{String(index + 1).padStart(2, '0')}</span>
      <span className="project-cover-icon"><Icon size={42} strokeWidth={1.25} /></span>
      <span className="project-cover-word">{project.title}</span>
    </div>
  );
}

function ProjectCard({ project, repo, index }) {
  const href = project.live || repo?.html_url || `${site.github}/${project.repo}`;
  const githubUrl = repo?.html_url || `${site.github}/${project.repo}`;
  const stars = repo?.stargazers_count;

  return (
    <article className="project-card" style={{ '--i': index }}>
      <a
        className="project-media"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title}`}
        data-cursor-label="VIEW"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} interface preview by Aakash Puri`}
            loading="lazy"
            decoding="async"
            width={project.imageWidth}
            height={project.imageHeight}
          />
        ) : (
          <ProjectCover project={project} index={index} />
        )}
        <span className="project-chip">
          <span className={project.live ? 'status-dot' : 'status-dot status-dot--muted'} aria-hidden="true" />
          {project.live ? 'Live' : 'Open source'}
        </span>
      </a>

      <div className="project-body">
        <div className="project-head">
          <h3>{project.title}</h3>
          <div className="project-links">
            {project.live ? (
              <a
                className="icon-btn"
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink size={16} />
              </a>
            ) : null}
            <a
              className="icon-btn"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} source code on GitHub`}
            >
              <BrandIcon name="github" size={16} />
            </a>
          </div>
        </div>

        <p className="project-desc">{project.description}</p>

        <ul className="tag-list" aria-label={`${project.title} stack`}>
          {project.stack.map((item) => (
            <li className="tag" key={item}>{item}</li>
          ))}
        </ul>

        <div className="project-meta">
          {typeof stars === 'number' && stars > 0 ? (
            <span className="project-meta-item">
              <Star size={13} aria-hidden="true" />
              {stars}
            </span>
          ) : null}
          {repo?.language ? (
            <span className="project-meta-item">{repo.language}</span>
          ) : null}
          <span className="project-meta-category">{project.category}</span>
        </div>
      </div>
    </article>
  );
}

export default function Projects({ github }) {
  const [filter, setFilter] = useState('All');

  const repoMap = useMemo(() => {
    const map = new Map();
    github.repositories.forEach((repo) => map.set(repo.name, repo));
    return map;
  }, [github.repositories]);

  const visible = filter === 'All'
    ? featuredProjects
    : featuredProjects.filter((project) => project.category === filter);

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          index="03"
          label="Selected work"
          title={(
            <>
              Things I&apos;ve shipped<span className="accent">.</span>
            </>
          )}
          description="A few projects that show how I think about product, interface and code. All of them are built, tested and live."
          id="work-title"
        />

        <div className="projects-toolbar">
          <div className="filters" role="group" aria-label="Filter projects by category">
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                className={`filter ${filter === item ? 'is-active' : ''}`}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="projects-count">
            {String(visible.length).padStart(2, '0')} projects
          </span>
        </div>

        <div className="projects-grid">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.repo}
              project={project}
              repo={repoMap.get(project.repo)}
              index={index}
            />
          ))}
        </div>

        <Reveal className="projects-footer" delay={80}>
          <p>
            There&apos;s more in the repos — experiments, tools and work in progress.
          </p>
          <a className="btn btn-ghost" href={`${site.github}?tab=repositories`} target="_blank" rel="noreferrer">
            Browse all {github.totals.repos} repositories
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
