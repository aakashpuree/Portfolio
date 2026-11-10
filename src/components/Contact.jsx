import { useState } from 'react';
import { ArrowUpRight, Loader2, Send } from 'lucide-react';
import { site } from '../data/site';
import { BrandIcon } from './BrandIcons';
import LocalTime from './LocalTime';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const initialState = { state: 'idle', message: '' };

export default function Contact() {
  const [status, setStatus] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status.state === 'sending') return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get('botcheck')) return;

    setStatus({ state: 'sending', message: '' });

    formData.append(
      'access_key',
      import.meta.env.VITE_WEB3FORMS_KEY || '1370f99d-303c-4d20-9591-5659f7d4ee11',
    );
    formData.append('subject', 'New message from the portfolio');
    formData.append('from_name', 'Aakash Puri — Portfolio');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Submission failed');

      setStatus({
        state: 'success',
        message: 'Message sent. I\u2019ll get back to you within 24\u201348 hours.',
      });
      form.reset();
    } catch {
      setStatus({
        state: 'error',
        message: 'Something went wrong. Please try again, or reach me on WhatsApp.',
      });
    }
  };

  return (
    <section className="section section--surface" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          index="06"
          label="Contact"
          title={(
            <>
              Let&apos;s build something
              {' '}
              <span className="accent">worth remembering.</span>
            </>
          )}
          description="Have a product in mind, a role to fill, or just a question? Tell me what you're working on."
          id="contact-title"
        />

        <div className="contact-grid">
          <div className="contact-intro">
            <Reveal>
              <p className="contact-lead">
                Good work starts with a good conversation. Mine usually begins over
                a message like this.
              </p>
              <p className="contact-copy">
                I&apos;m available for select freelance projects and full-time
                opportunities. The fastest way to reach me is WhatsApp or the form —
                I read and reply to everything.
              </p>
            </Reveal>

            <Reveal className="contact-links" delay={90}>
              {site.socials.map((social) => (
                <a
                  key={social.id}
                  className="contact-link"
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="contact-link-icon" aria-hidden="true">
                    <BrandIcon name={social.id} size={18} />
                  </span>
                  <span className="contact-link-label">{social.label}</span>
                  <span className="contact-link-value">{social.handle}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </Reveal>

            <Reveal className="contact-status-card" delay={160}>
              <div>
                <span className="status-dot" aria-hidden="true" />
                Available for select projects
              </div>
              <p>Usually replies within 24–48 hours · <LocalTime /></p>
            </Reveal>
          </div>

          <Reveal className="contact-form-wrap" delay={120}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="contact-email">Email address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="contact-message">What are you working on?</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about the project, timeline and what success looks like…"
                  required
                />
              </div>

              <input
                className="honeypot"
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <button
                className="btn btn-primary form-submit"
                type="submit"
                disabled={status.state === 'sending'}
              >
                {status.state === 'sending' ? (
                  <>
                    Sending
                    <Loader2 size={17} className="spin" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Send message
                    <Send size={17} aria-hidden="true" />
                  </>
                )}
              </button>

              <p className={`form-status ${status.state}`} role="status" aria-live="polite">
                {status.message}
              </p>
              <p className="form-note">
                Your details stay private. No spam, ever.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
