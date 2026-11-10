import { useCallback, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import CanvasSequence from './components/CanvasSequence';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useGitHub from './hooks/useGitHub';
import { registerLenis, setScrollLock } from './lib/scroll';

function App() {
  const github = useGitHub();
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !window.sessionStorage.getItem('ap:visited');
    } catch {
      return true;
    }
  });

  const handleLoaded = useCallback(() => {
    setIsLoading(false);
    try {
      window.sessionStorage.setItem('ap:visited', '1');
    } catch {
      // Session storage is optional; the site works without it.
    }
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      const updateProgress = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        document.documentElement.style.setProperty('--scroll-progress', String(progress));
      };

      updateProgress();
      window.addEventListener('scroll', updateProgress, { passive: true });
      return () => window.removeEventListener('scroll', updateProgress);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (time) => Math.min(1, 1.001 - (2 ** (-10 * time))),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    registerLenis(lenis);
    lenis.scrollTo(0, { immediate: true });
    lenis.start();

    lenis.on('scroll', ({ progress }) => {
      document.documentElement.style.setProperty('--scroll-progress', String(progress));
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    setScrollLock(isLoading);
    return () => setScrollLock(false);
  }, [isLoading]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="app-shell">
        <CanvasSequence />
        <div className="scene-overlay" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <CustomCursor />

        {isLoading ? <Preloader onComplete={handleLoaded} /> : null}

        <Navbar />

        <main id="main">
          <Hero github={github} introReady={!isLoading} />

          <div className="page-body">
            <About github={github} />
            <Skills github={github} />
            <Projects github={github} />
            <OpenSource github={github} />
            <Journey />
            <Contact />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
