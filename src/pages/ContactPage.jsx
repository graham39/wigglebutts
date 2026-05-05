import { Link } from 'react-router-dom';
import { CONTACT_PAGE, BUSINESS, CONTACT } from '../data/content.js';

export default function ContactPage() {
  return (
    <div className="ct">
      <style>{css}</style>

      <div className="ct-topbar">
        <Link to="/" className="mono">
          ← {BUSINESS.name}
        </Link>
        <div className="mono">Contact</div>
      </div>
      <div className="rule ct-rule" />

      <section className="ct-hero">
        <div className="mono ct-eyebrow">{CONTACT_PAGE.eyebrow}</div>
        <h1 className="display ct-h1">
          {CONTACT_PAGE.title[0]}
          <span className="italic-accent">{CONTACT_PAGE.title[1]}</span>
          {CONTACT_PAGE.title[2]}
        </h1>
        <p className="ct-body">{CONTACT_PAGE.body}</p>
      </section>

      <div className="ct-form-wrap">
        <iframe
          src={CONTACT.formUrl}
          title="Contact form"
          width="100%"
          height="600"
          frameBorder="0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="ct-iframe"
        />
      </div>

      <section className="ct-fallback">
        <p>
          Or reach out on Instagram{' '}
          <a className="text-link" href={CONTACT.instagramUrl} target="_blank" rel="noreferrer">
            @{CONTACT.instagramHandle}
          </a>
          .
        </p>
      </section>
    </div>
  );
}

const css = `
  .ct { background: var(--bg); color: var(--ink); min-height: 100%; }
  .ct-topbar { display:flex; align-items:center; justify-content:space-between; padding: 18px 22px 12px; }
  .ct-topbar a { text-decoration: none; }
  .ct-rule { margin: 0 22px; }

  .ct-hero { padding: 40px 22px 24px; }
  .ct-eyebrow { color: var(--accent-bright); margin-bottom: 14px; }
  .ct-h1 { font-size: 38px; margin: 0; line-height: 1.0; }
  .ct-body { font-size: 14.5px; line-height: 1.6; color: var(--ink-2); margin-top: 18px; }

  .ct-form-wrap { padding: 12px 22px 8px; }
  .ct-iframe { border: none; border-radius: 8px; width: 100%; max-width: 100%; background: var(--ink); display: block; }

  .ct-fallback { padding: 16px 22px 60px; text-align: center; }
  .ct-fallback p { font-size: 13.5px; color: var(--ink-3); margin: 0; }
`;
