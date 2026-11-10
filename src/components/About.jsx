import { ArrowUpRight, Sparkles } from 'lucide-react';
import { facts, site } from '../data/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

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
          description="A creative full-stack developer from Nepal, building products where considered engineering meets visual craft."
          id="about-title"
        />

        <div className="about-grid">
          <Reveal className="about-portrait">
            <div className="portrait-frame" data-cursor-label="HELLO">
              <img
                src={avatar}
                alt="Portrait of Aakash Puri"
                loading="lazy"
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
          </Reveal>

          <div className="about-copy">
            <Reveal delay={60}>
              <p className="about-lead">
                I&apos;m Aakash Puri — a creative full-stack developer who treats the browser
                as a <span className="accent">canvas</span>, not just a document.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <p>
                My approach isn&apos;t only about writing code. It&apos;s about crafting
                experiences that tell a story — from pixel-perfect interfaces to robust
                full-stack architecture. I care about the details most people never notice,
                because that&apos;s usually where a product starts to feel special.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p>
                I work across React, Vue, TypeScript and Python, and I&apos;m most at home
                at the intersection of engineering and design. When the world sleeps,
                that&apos;s usually when the best work happens.
              </p>
            </Reveal>

            <Reveal as="blockquote" className="about-quote" delay={240}>
              <p>&ldquo;{site.philosophy}&rdquo;</p>
              <footer>— from my GitHub bio</footer>
            </Reveal>

            <Reveal className="facts" delay={300}>
              {facts.map((fact) => (
                <div className="fact" key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </Reveal>

            <Reveal delay={360}>
              <a
                className="text-link"
                href={site.github}
                target="_blank"
                rel="noreferrer"
              >
                More about my work on GitHub
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
