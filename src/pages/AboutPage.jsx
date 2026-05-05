import { Link } from 'react-router-dom';
import { PHOTOS, BADGES } from '../data/photos.js';
import { ABOUT, BUSINESS } from '../data/content.js';

export default function AboutPage() {
  // Headline trail may include a newline for visual break
  const trailLines = ABOUT.headlineTrail.split('\n');

  return (
    <div className="ab">
      <style>{css}</style>

      {/* nav */}
      <div className="ab-topbar">
        <Link to="/" className="mono ab-back">
          ← {BUSINESS.name}
        </Link>
        <div className="mono">About</div>
      </div>
      <div className="rule ab-rule" />

      {/* hero */}
      <section className="ab-hero">
        <div className="mono ab-eyebrow">{ABOUT.eyebrow}</div>
        <h1 className="display ab-h1">
          {ABOUT.headlineLead}
          <span className="italic-accent">{ABOUT.headlineName}</span>
          {trailLines.map((line, i) => (
            <span key={i}>
              {i === 0 ? line : <><br />{line}</>}
            </span>
          ))}
        </h1>
      </section>

      {/* portrait */}
      <div className="ab-portrait">
        <img src={PHOTOS.celinaPortrait} alt="Celina." />
      </div>

      {/* body */}
      <section className="ab-body-section">
        <div className="ab-body">
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </section>

      {/* pull-quote */}
      <section className="ab-pull">
        <div className="rule" />
        <div className="display ab-pullquote">
          <span className="italic-accent">"{ABOUT.pullQuote.accent}"</span>
          {ABOUT.pullQuote.rest}
        </div>
        <div className="rule" />
      </section>

      {/* photo split */}
      <div className="ab-split">
        <img src={PHOTOS.walking} alt="Dog on a walk." />
        <img src={PHOTOS.cozy} alt="Dog napping." />
      </div>

      {/* facts */}
      <section className="ab-facts">
        <div className="mono ab-eyebrow">The boring stuff</div>
        {ABOUT.facts.map(([k, v]) => (
          <div key={k} className="ab-fact">
            <span className="mono ab-fact-key">{k}</span>
            <span className="ab-fact-val">
              {v}
              {k === 'Insured' && (
                <a
                  href="https://www.petcareins.com"
                  target="_blank"
                  rel="noreferrer"
                  className="ab-badge-link"
                  aria-label="Pet Care Business Insurance"
                >
                  <img src={BADGES.petcareInsurance} alt="" className="ab-badge" />
                </a>
              )}
            </span>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="ab-footer">
        <div className="display ab-footer-h">
          {ABOUT.ctaTitle[0]}
          <span className="italic-accent">{ABOUT.ctaTitle[1]}</span>
          {ABOUT.ctaTitle[2]}
        </div>
        <p className="ab-footer-body">{ABOUT.ctaBody}</p>
        <Link to="/contact" className="cta">
          {ABOUT.ctaLabel}
        </Link>
      </section>
    </div>
  );
}

const css = `
  .ab { background: var(--bg); color: var(--ink); min-height: 100%; }
  .ab-topbar { display:flex; align-items:center; justify-content:space-between; padding: 18px 22px 12px; }
  .ab-back { text-decoration: none; }
  .ab-rule { margin: 0 22px; }

  .ab-hero { padding: 40px 22px 28px; }
  .ab-eyebrow { margin-bottom: 18px; }
  .ab-h1 { font-size: 46px; margin: 0; line-height: 1.0; }

  .ab-portrait { padding: 0 22px; }
  .ab-portrait img { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; }

  .ab-body-section { padding: 36px 22px 20px; }
  .ab-body { font-size: 15px; line-height: 1.65; color: var(--ink-2); font-family: var(--serif-font); font-weight: 400; }
  .ab-body p { margin: 0 0 18px; }
  .ab-body em { color: var(--accent-bright); font-style: italic; }

  .ab-pull { padding: 8px 22px 28px; }
  .ab-pullquote { font-size: 28px; padding: 28px 0; color: var(--ink); line-height: 1.05; }

  .ab-split { padding: 8px 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .ab-split img { width: 100%; aspect-ratio: 3/4; object-fit: cover; }

  .ab-facts { padding: 40px 22px 24px; }
  .ab-fact { display: grid; grid-template-columns: 120px 1fr; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--rule); align-items: center; }
  .ab-fact-key { color: var(--accent-bright); }
  .ab-fact-val { font-size: 13.5px; color: var(--ink-2); line-height: 1.5; display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .ab-badge-link { display: inline-block; line-height: 0; flex-shrink: 0; }
  .ab-badge { width: 64px; height: auto; background: var(--ink); border-radius: 6px; padding: 4px; }

  .ab-footer { padding: 30px 22px 60px; text-align: center; }
  .ab-footer-h { font-size: 32px; }
  .ab-footer-body { font-size: 14px; color: var(--ink-2); max-width: 320px; margin: 14px auto 22px; line-height: 1.55; }
`;
