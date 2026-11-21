import { Link } from 'react-router-dom';
import { PHOTOS } from '../data/photos.js';
import { BUSINESS, CONTACT, THANKS } from '../data/content.js';

export default function ThankYouPage() {
  return (
    <div className="th">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="topbar">
        <Link to="/" className="mono hit">
          ← {BUSINESS.name}
        </Link>
        <div className="mono">{THANKS.topbarLabel}</div>
      </div>
      <div className="rule rule-inset" />

      <section className="th-photo">
        <img className="photo" src={PHOTOS[THANKS.photoKey]} alt={THANKS.photoAlt} />
      </section>

      <section className="th-section">
        <h1 className="display th-h1">
          {THANKS.headlineL1}
          <br />
          <span className="italic-accent">{THANKS.headlineL2}</span>
        </h1>
        <p className="th-body">{THANKS.body}</p>

        <div className="th-cta-row">
          <Link to="/" className="cta">
            {THANKS.ctaPrimary}
          </Link>
          <a className="text-link" href={CONTACT.instagramUrl} target="_blank" rel="noreferrer">
            {THANKS.ctaSecondary}
          </a>
        </div>
      </section>
    </div>
  );
}

const css = `
  .th { background: var(--bg); color: var(--ink); min-height: 100%; }

  .th-photo { height: 360px; overflow: hidden; margin-top: 10px; }
  .th-photo img { width: 100%; height: 100%; object-fit: cover; }

  .th-section { padding: var(--space-section) var(--gutter) var(--space-end); }
  .th-h1 { font-size: 56px; margin: 0; }
  .th-body { font-size: 14.5px; line-height: 1.55; color: var(--ink-2); margin-top: 22px; max-width: 360px; }
  .th-cta-row { margin-top: 26px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
`;
