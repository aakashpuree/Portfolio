import { ArrowUpRight, MessageCircleQuestion } from 'lucide-react';
import { faqs, nameVariations, site } from '../data/site';
import { scrollToId } from '../lib/scroll';
import { BrandIcon } from './BrandIcons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Faq() {
  return (
    <section className="section section--surface" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <SectionHeading
          index="07"
          label="FAQ"
          title={(
            <>
              Questions, <span className="accent">answered.</span>
            </>
          )}
          description="Who Aakash Puri is, what he builds and how to work together — the short version, without the guesswork."
          id="faq-title"
        />

        <div className="faq-layout">
          <Reveal className="faq-aside">
            <span className="eyebrow eyebrow--accent">One developer, several spellings</span>
            <h3>However you found me, you&apos;re in the right place.</h3>
            <p>
              Aakash Puri is the name. <strong>aakashpuree</strong> is the handle.
              Spelling variations like Aakash Puree or Akash Puri still lead here — same
              developer, same work, same attention to detail.
            </p>

            <ul className="faq-aliases" aria-label="Name variations for Aakash Puri">
              {nameVariations.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>

            <a
              className="btn btn-primary faq-cta"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToId('contact');
              }}
            >
              <MessageCircleQuestion size={17} aria-hidden="true" />
              Ask me anything
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>

            <div className="faq-socials">
              {site.socials.slice(0, 3).map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="me noreferrer"
                  aria-label={`${social.label} — ${social.handle}`}
                >
                  <BrandIcon name={social.id} size={16} />
                  {social.label}
                </a>
              ))}
            </div>
          </Reveal>

          <div className="faq-list">
            {faqs.map((item, index) => (
              <Reveal
                as="article"
                className="faq-item"
                key={item.question}
                delay={index * 45}
              >
                <span className="faq-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="faq-item-copy">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
