import { ArrowUpRight } from 'lucide-react';
import { focusedOn, journey, site } from '../data/site';
import LocalTime from './LocalTime';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { scrollToId } from '../lib/scroll';

export default function Journey() {
  return (
    <section className="section" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeading
          index="05"
          label="Journey"
          title={(
            <>
              The road so far<span className="accent">.</span>
            </>
          )}
          description="No shortcuts — just a lot of late nights, real products and a stubborn attention to detail."
          id="journey-title"
        />

        <div className="journey-grid">
          <ol className="timeline">
            {journey.map((item, index) => (
              <Reveal as="li" className="timeline-item" key={item.title} delay={index * 70}>
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="journey-card" delay={120}>
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              {site.availability}
            </span>

            <h3>Good things take shape after hours.</h3>
            <p>
              I&apos;m currently open to freelance projects and full-time roles where I can
              own the front of the stack — and care about the details end to end.
            </p>

            <div className="focus">
              <span className="eyebrow">Focused on</span>
              <ul className="focus-list">
                {focusedOn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <dl className="journey-meta">
              <div>
                <dt>Local time</dt>
                <dd><LocalTime /></dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{site.location}</dd>
              </div>
            </dl>

            <a
              className="btn btn-primary"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToId('contact');
              }}
            >
              Let&apos;s build something
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
