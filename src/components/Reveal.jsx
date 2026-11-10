import { useEffect, useRef } from 'react';

export default function Reveal({
  as = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const Tag = as;
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('is-in');
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.classList.add('is-in');
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      {...rest}
      ref={elementRef}
      className={`reveal ${className}`.trim()}
      style={{ ...rest.style, '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
