import { useEffect, useRef, useState } from 'react';
import { formatNumber } from '../lib/format';

export default function CountUp({ value, duration = 1400, className = '' }) {
  const elementRef = useRef(null);
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const element = elementRef.current;
    if (!element) return undefined;

    const resetFrame = requestAnimationFrame(() => setDisplay(0));
    let animationFrame;
    let started = false;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;

      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(Math.round(value * eased));
        if (progress < 1) animationFrame = requestAnimationFrame(tick);
      };

      animationFrame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    observer.observe(element);

    return () => {
      cancelAnimationFrame(resetFrame);
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [value, duration, reducedMotion]);

  return (
    <span ref={elementRef} className={className}>
      {formatNumber(reducedMotion ? value : display)}
    </span>
  );
}
