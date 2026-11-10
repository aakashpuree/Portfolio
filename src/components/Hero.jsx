import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { site } from '../data/site';
import { BrandIcon } from './BrandIcons';
import CountUp from './CountUp';
import { scrollToId } from '../lib/scroll';

export default function Hero({ github, introReady }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!introReady) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .fromTo('.hero-eyebrow', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo('.hero-kicker', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.35')
        .fromTo('.hero-line-inner', { yPercent: 115 }, {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.09,
          ease: 'power4.out',
        }, '-=0.3')
        .fromTo('.hero-lead', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.55')
        .fromTo('.hero-actions > *', { y: 16, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
        }, '-=0.45')
        .fromTo('.hero-socials > *', { y: 12, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
        }, '-=0.35')
        .fromTo('.hero-stats', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');
    }, rootRef);

    return () => context.revert();
  }, [introReady]);

  return (
    <section className="hero" id="home" aria-labelledby="hero-title" ref={rootRef}>
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            <span>{site.availability}</span>
            <span className="hero-eyebrow-sep" aria-hidden="true" />
            <span className="hero-location">
              <MapPin size={13} aria-hidden="true" />
              {site.location}
            </span>
          </div>

          <p className="hero-kicker">{site.role} / Creative Engineer</p>

          <h1 className="hero-title" id="hero-title">
            <span className="hero-line">
              <span className="hero-line-inner">Aakash</span>
            </span>
            <span className="hero-line hero-line--outline">
              <span className="hero-line-inner">
                Puri<span className="hero-dot">.</span>
              </span>
            </span>
          </h1>

          <p className="hero-lead">
            I build fast, thoughtful products at the intersection of engineering and design —
            from full-stack platforms used across Nepal to interfaces that feel alive.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollToId('work')}
            >
              View selected work
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <a
              className="btn btn-ghost"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToId('contact');
              }}
            >
              Start a conversation
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>

          <div className="hero-socials">
            {site.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${social.label} — ${social.handle}`}
              >
                <BrandIcon name={social.id} size={17} />
                <span>{social.label}</span>
              </a>
            ))}
          </div>

          <dl className="hero-stats">
            <div className="hero-stat">
              <dt>Public repos</dt>
              <dd><CountUp value={github.totals.repos} /></dd>
            </div>
            <div className="hero-stat">
              <dt>Stars earned</dt>
              <dd><CountUp value={github.totals.stars} /></dd>
            </div>
            <div className="hero-stat">
              <dt>Followers</dt>
              <dd><CountUp value={github.totals.followers} /></dd>
            </div>
            <div className="hero-stat">
              <dt>Contributions / yr</dt>
              <dd><CountUp value={github.totals.contributions} /></dd>
            </div>
          </dl>
        </div>
      </div>

      <button
        type="button"
        className="hero-scroll"
        onClick={() => scrollToId('about')}
        aria-label="Scroll to the about section"
      >
        <span className="hero-scroll-line" aria-hidden="true" />
        <span>Scroll to explore</span>
        <ArrowDown size={14} aria-hidden="true" />
      </button>
    </section>
  );
}
