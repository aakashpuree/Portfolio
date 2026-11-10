import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const FRAME_COUNT = 60;

export default function CanvasSequence() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadedImages = new Array(FRAME_COUNT).fill(null);
    let loadedCount = 0;

    for (let index = 1; index <= FRAME_COUNT; index += 1) {
      const image = new Image();
      const id = String(index).padStart(3, '0');
      image.src = `/assets/seq/ezgif-frame-${id}.jpg`;

      image.onload = () => {
        loadedImages[index - 1] = image;
        loadedCount += 1;

        if (index === 1 || loadedCount === FRAME_COUNT) {
          setImages([...loadedImages]);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (images.length === 0 || !containerRef.current) return undefined;

    const animation = gsap.fromTo(
      containerRef.current,
      { scale: 1.08, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' },
    );

    return () => animation.kill();
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame = null;

    const render = () => {
      animationFrame = null;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, maxScroll > 0 ? window.scrollY / maxScroll : 0),
      );
      const frameIndex = Math.floor(progress * (FRAME_COUNT - 1));

      if (containerRef.current) {
        gsap.set(containerRef.current, {
          scale: 1,
          y: reducedMotion ? 0 : progress * 50,
        });
      }

      const image = images[frameIndex] || images[0];
      if (!image) return;

      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = image.width / image.height;
      let drawWidth;
      let drawHeight;
      let offsetX;
      let offsetY;

      if (canvasRatio > imageRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imageRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };

    const scheduleRender = () => {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      context.imageSmoothingQuality = 'high';
      scheduleRender();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', scheduleRender, { passive: true });

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', scheduleRender);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [images]);

  return (
    <div className="canvas-container" ref={containerRef} style={{ opacity: 0 }} aria-hidden="true">
      <canvas ref={canvasRef} className="sequence-canvas" />
    </div>
  );
}
