import { ArrowUpRight, Code2, ServerCog, Wrench } from 'lucide-react';
import { site, skillGroups } from '../data/site';
import { languageColor } from '../lib/format';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const icons = {
  code: Code2,
  server: ServerCog,
  tool: Wrench,
};

export default function Skills({ github }) {
  return (
    <section className="section section--surface" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          index="02"
          label="Toolkit"
          title={(
            <>
              Tools I build with<span className="accent">.</span>
            </>
          )}
          description="A practical stack for taking an idea from a blank canvas to a shipped product."
          id="skills-title"
        />

        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = icons[group.icon] || Code2;
            return (
              <Reveal className="skill-card" key={group.title} delay={index * 80}>
                <span className="skill-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul className="skill-tags">
                  {group.skills.map((skill) => (
                    <li className="skill-tag" key={skill}>{skill}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="lang-panel" delay={120}>
          <div className="lang-panel-copy">
            <span className="eyebrow eyebrow--accent">Live from GitHub</span>
            <h3>Language footprint</h3>
            <p>
              Based on the primary language of my public repositories. It updates as
              new work ships.
            </p>
            <a
              className="text-link"
              href={`${site.github}?tab=repositories`}
              target="_blank"
              rel="me noreferrer"
            >
              Explore repositories
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="lang-panel-data">
            <div
              className="lang-bar"
              role="img"
              aria-label={`GitHub language distribution: ${github.languages
                .map((language) => `${language.name} ${language.percent}%`)
                .join(', ')}`}
            >
              {github.languages.map((language) => (
                <span
                  key={language.name}
                  style={{
                    width: `${language.percent}%`,
                    background: languageColor(language.name),
                  }}
                />
              ))}
            </div>
            <ul className="lang-legend">
              {github.languages.map((language) => (
                <li key={language.name}>
                  <span
                    className="lang-dot"
                    style={{ background: languageColor(language.name) }}
                    aria-hidden="true"
                  />
                  {language.name}
                  <strong>{language.percent}%</strong>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
