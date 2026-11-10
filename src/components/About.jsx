import {
  ArrowUpRight,
  Code2,
  ServerCog,
  Sparkles,
} from 'lucide-react';
import { facts, highlights, site } from '../data/site';
import { scrollToId } from '../lib/scroll';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const highlightIcons = {
  code: Code2,
  sparkles: Sparkles,
  server: ServerCog,
};

export default function About({ github }) {
  const avatar = github.profile.avatar_url;

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          index="01"
          label="About"
          title={(
            <>
              Not your usual flow<span className="accent">.</span>
            </>
          )}
          description="Aakash Puri — known online as aakashpuree — is a creative full-stack developer from Nepal, building products where considered engineering meets visual craft."
          id="about-title"
        />

        <div className="about-grid">
          <Reveal className="about-portrait">
            <div className="portrait-wrap">
              <div className="portrait-frame" data-cursor-label="HELLO">
                <img
                  src={avatar}
                  alt="Aakash Puri, full-stack developer and creative engineer from Nepal"
                  loading="lazy"
                  decoding="async"
                  width="640"
                  height="800"
                />
                <div className="portrait-overlay">
                  <span className="portrait-name">Aakash Puri</span>
                  <span className="portrait-role">Full Stack Developer · Nepal</span>
                </div>
              </div>
              <div className="portrait-sticker">
                <Sparkles size={15} aria-hidden="true" />
                Building since 2025
              </div>
            </div>
            <p className="portrait-caption">
              Also known as <strong>aakashpuree</strong> — the handle behind the code,
              the commits and the late-night experiments.
            </p>
          </Reveal>

          <div className="about-copy">
            <Reveal delay={60}>
              <p className="about-lead">
                I&apos;m Aakash Puri — a full-stack developer and creative engineer who
                treats the browser as a <span className="accent">canvas</span>, not just
                a document.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <p>
                My work sits where engineering discipline meets visual craft. I design
                and build complete products — the interface people touch, the APIs and
                data flows underneath, and the small performance decisions that make
                everything feel instant. From a 77-district weather platform used across
                Nepal to a client-side search engine for 326+ banknote records, I like
                problems that are useful in the real world.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p>
                React, Vue, TypeScript, Python and Node.js are my everyday tools, but the
                real stack is curiosity, taste and a refusal to ship something I would not
                use myself. I build in public, maintain 20+ repositories and treat every
                project as a chance to raise the bar a little higher.
              </p>
            </Reveal>

            <Reveal className="about-highlights" delay={240}>
              {highlights.map((item) => {
                const Icon = highlightIcons[item.icon] || Code2;
                return (
                  <div className="about-highlight" key={item.title}>
                    <span className="about-highlight-icon" aria-hidden="true">
                      <Icon size={17} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                );
              })}
            </Reveal>

            <Reveal as="blockquote" className="about-quote" delay={300}>
              <p>&ldquo;{site.philosophy}&rdquo;</p>
              <footer>— from my GitHub bio</footer>
            </Reveal>

            <Reveal className="facts" delay={360}>
              {facts.map((fact) => (
                <div className="fact" key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </Reveal>

            <Reveal className="about-actions" delay={420}>
              <a
                className="text-link"
                href={site.github}
                target="_blank"
                rel="me noreferrer"
              >
                More about my work on GitHub
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                className="text-link"
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId('contact');
                }}
              >
                Start a conversation
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
