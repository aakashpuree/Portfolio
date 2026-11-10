import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  );
  const cursorRef = useRef(null);
  const raysRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const cursor = cursorRef.current;
    const rays = raysRef.current;
    if (!cursor || !rays) return undefined;

    document.documentElement.classList.add('has-custom-cursor');

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let movingTimer;
    let visible = false;

    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.12, ease: 'power2.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.12, ease: 'power2.out' });
    const rotateRays = gsap.quickTo(rays, 'rotation', { duration: 0.35, ease: 'power2.out' });

    gsap.set(cursor, { x: lastX, y: lastY, autoAlpha: 0 });

    const show = () => {
      if (visible) return;
      visible = true;
      cursor.classList.add('is-visible');
      gsap.to(cursor, { autoAlpha: 1, duration: 0.2 });
    };

    const hide = () => {
      visible = false;
      cursor.classList.remove('is-visible');
      gsap.to(cursor, { autoAlpha: 0, duration: 0.2 });
    };

    const handleMove = (event) => {
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const distance = Math.hypot(dx, dy);

      if (distance > 3) {
        rotateRays(Math.atan2(dy, dx) * (180 / Math.PI));
        cursor.classList.add('is-moving');
        clearTimeout(movingTimer);
        movingTimer = setTimeout(() => cursor.classList.remove('is-moving'), 120);
      }

      lastX = event.clientX;
      lastY = event.clientY;
      moveX(event.clientX);
      moveY(event.clientY);
      show();
    };

    const handleOver = (event) => {
      const interactive = event.target.closest(
        'a, button, [role="button"], [data-cursor-label]',
      );
      if (!interactive) return;

      cursor.classList.add('is-hover');

      const label = interactive.getAttribute('data-cursor-label');
      if (label && labelRef.current) {
        labelRef.current.textContent = label;
        cursor.classList.add('has-label');
      }
    };

    const handleOut = (event) => {
      const interactive = event.target.closest(
        'a, button, [role="button"], [data-cursor-label]',
      );
      if (!interactive) return;
      if (event.relatedTarget && interactive.contains(event.relatedTarget)) return;

      cursor.classList.remove('is-hover', 'has-label');
    };

    const handleDown = () => cursor.classList.add('is-down');
    const handleUp = () => cursor.classList.remove('is-down');
    const handleLeave = (event) => {
      if (!event.relatedTarget) hide();
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerover', handleOver);
    document.addEventListener('pointerout', handleOut);
    document.addEventListener('pointerdown', handleDown);
    document.addEventListener('pointerup', handleUp);
    document.addEventListener('pointerleave', handleLeave);
    window.addEventListener('blur', hide);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerout', handleOut);
      document.removeEventListener('pointerdown', handleDown);
      document.removeEventListener('pointerup', handleUp);
      document.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('blur', hide);
      clearTimeout(movingTimer);
      gsap.killTweensOf(cursor);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor" ref={cursorRef} aria-hidden="true">
      <div className="cursor-rays" ref={raysRef}>
        <span className="cursor-ray" />
        <span className="cursor-ray" />
        <span className="cursor-ray" />
      </div>

      <svg className="cursor-arrow" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 2.8 20.4 12l-7.7 1.9L9.1 21.6 4 2.8Z"
          fill="#e2401c"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>

      <span className="cursor-label" ref={labelRef} />
    </div>
  );
}
