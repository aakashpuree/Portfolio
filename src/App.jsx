import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import CanvasSequence from './components/CanvasSequence';
import OverlayUI from './components/OverlayUI';

function App() {

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Force scroll to top on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.scrollTo(0, { immediate: true });

    lenis.start();

    // Scroll updates CSS variable for gradient transition
    lenis.on('scroll', ({ progress }) => {
      document.documentElement.style.setProperty('--scroll-progress', progress);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <div className="app-container">
      <CanvasSequence />
      <OverlayUI />
    </div>
  );
}

export default App;
