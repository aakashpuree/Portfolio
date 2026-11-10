import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { site } from '../data/site';

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counter = { value: 0 };
    const duration = reduced ? 0.35 : 1.55;

    const timeline = gsap.timeline({ onComplete });

    timeline
      .to(counter, {
        value: 100,
        duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0');
          }
        },
      }, 0)
      .fromTo(barRef.current, { scaleX: 0 }, {
        scaleX: 1,
        duration,
        ease: 'power2.inOut',
      }, 0)
      .fromTo('.preloader-char', { yPercent: 120 }, {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.035,
        ease: 'power4.out',
      }, 0)
      .to('.preloader-center', {
        autoAlpha: 0,
        y: -24,
        duration: 0.45,
        ease: 'power2.in',
      }, '+=0.12')
      .to(rootRef.current, {
        yPercent: -100,
        duration: reduced ? 0.4 : 0.9,
        ease: 'power4.inOut',
      }, '-=0.05');

    return () => timeline.kill();
  }, [onComplete]);

  const letters = 'AAKASH PURI';

  return (
    <div
      className="preloader"
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="preloader-top">
        <span>{site.name} — Portfolio</span>
        <span>©{new Date().getFullYear()}</span>
      </div>

      <div className="preloader-center">
        <h1 className="preloader-name" aria-label={site.name}>
          {letters.split('').map((character, index) => (
            character === ' ' ? (
              <span className="preloader-space" key={`space-${index}`} aria-hidden="true" />
            ) : (
              <span className="preloader-char" key={`${character}-${index}`} aria-hidden="true">
                {character}
              </span>
            )
          ))}
        </h1>
        <p className="preloader-caption">Creative Full Stack Developer</p>
      </div>

      <div className="preloader-bottom">
        <div className="preloader-bar" aria-hidden="true">
          <span ref={barRef} />
        </div>
        <div className="preloader-meta">
          <span>Loading experience</span>
          <span className="preloader-count" ref={counterRef}>000</span>
        </div>
      </div>
    </div>
  );
}
