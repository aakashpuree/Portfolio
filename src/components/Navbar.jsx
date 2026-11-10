import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation, site } from '../data/site';
import { BrandIcon } from './BrandIcons';
import { scrollToId, setScrollLock } from '../lib/scroll';

const SECTION_IDS = ['home', ...navigation.map((item) => item.id)];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-42% 0px -52% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setScrollLock(menuOpen);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => () => setScrollLock(false), []);

  const go = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    setScrollLock(false);
    scrollToId(id);
  };

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`}>
        <div className="nav-progress" aria-hidden="true" />
        <div className="nav-inner">
          <a
            className="brand"
            href="#home"
            onClick={(event) => go(event, 'home')}
            aria-label="Aakash Puri — back to top"
          >
            <span className="brand-mark" aria-hidden="true">A</span>
            <span className="brand-name">aakashpuree</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {navigation.filter((item) => item.id !== 'contact').map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${active === item.id ? 'is-active' : ''}`}
                aria-current={active === item.id ? 'page' : undefined}
                onClick={(event) => go(event, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              className="btn btn-primary btn-sm nav-cta"
              href="#contact"
              onClick={(event) => go(event, 'contact')}
            >
              Let&apos;s talk
              <ArrowUpRight size={16} />
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => go(event, item.id)}
              style={{ '--i': index }}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="mobile-nav-index">{String(index + 1).padStart(2, '0')}</span>
              <span>{item.label}</span>
              <ArrowUpRight size={22} />
            </a>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <div className="mobile-socials">
            {site.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="me noreferrer"
                aria-label={social.label}
                tabIndex={menuOpen ? 0 : -1}
              >
                <BrandIcon name={social.id} size={18} />
              </a>
            ))}
          </div>
          <p>{site.username} · {site.location}</p>
        </div>
      </div>
    </>
  );
}
