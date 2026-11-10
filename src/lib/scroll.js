let lenisInstance = null;

export function registerLenis(instance) {
  lenisInstance = instance;
}

export function scrollToId(id, options = {}) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: -84,
      duration: 1.15,
      ...options,
    });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function setScrollLock(locked) {
  if (lenisInstance) {
    if (locked) {
      lenisInstance.stop();
    } else {
      lenisInstance.start();
    }
  }

  document.documentElement.classList.toggle('scroll-locked', locked);
}
