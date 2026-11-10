import { ArrowUp } from 'lucide-react';
import { navigation, site } from '../data/site';
import { BrandIcon } from './BrandIcons';
import LocalTime from './LocalTime';
import { scrollToId, scrollToTop } from '../lib/scroll';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a
              className="brand"
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                scrollToTop();
              }}
            >
              <span className="brand-mark" aria-hidden="true">A</span>
              <span className="brand-name">aakashpuree</span>
            </a>
            <p>
              Full-stack developer crafting thoughtful digital experiences
              from Nepal.
            </p>
            <span className="footer-time">
              {site.location} · <LocalTime />
            </span>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer-connect">
            <span className="eyebrow">Elsewhere</span>
            <div className="footer-socials">
              {site.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  <BrandIcon name={social.id} size={17} />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          Aakash Puri
        </div>

        <div className="footer-bottom">
          <span>© {year} Aakash Puri. All rights reserved.</span>
          <span className="footer-built">
            Built with React, Vite, GSAP &amp; Lenis
          </span>
          <div className="footer-actions">
            <a href={site.repoUrl} target="_blank" rel="noreferrer">
              View source
            </a>
            <button type="button" onClick={scrollToTop}>
              Back to top
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
