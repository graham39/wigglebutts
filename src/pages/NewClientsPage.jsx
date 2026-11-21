import { Link } from 'react-router-dom';
import { PHOTOS } from '../data/photos.js';
import { BUSINESS, BASICS, HOME_SERVICES, TESTIMONIALS, NEW_CLIENTS as NC } from '../data/content.js';

export default function NewClientsPage() {
  const quote = TESTIMONIALS[0];
  return (
    <div className="nc">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="topbar">
        <Link to="/" className="mono hit">← {BUSINESS.name}</Link>
        <div className="nc-status">
          <span className="nc-dot" />
          <span className="mono">{NC.topbarLabel}</span>
        </div>
      </div>
      <div className="rule rule-inset" />

      <section className="nc-hero">
        <h1 className="display nc-h1">
          {NC.headlineL1}
          <br />
          <span className="italic-accent">{NC.headlineL2}</span>
        </h1>
        <p className="nc-lede">{NC.lede}</p>
        <Link to="/contact" className="cta nc-cta">{NC.cta}</Link>
      </section>

      <section className="nc-photo">
        <img className="photo" src={PHOTOS[NC.photoKey]} alt={NC.photoAlt} />
      </section>

      {NC.seasonal && (
        <section className="nc-section">
          <div className="nc-seasonal">
            <div className="mono nc-seasonal-title">{NC.seasonal.title}</div>
            <p className="nc-seasonal-body">{NC.seasonal.body}</p>
          </div>
        </section>
      )}

      <section className="nc-section">
        <h2 className="display nc-h2">{NC.areaTitle}</h2>
        <p className="nc-body">{NC.areaBody}</p>
      </section>

      <section className="nc-section">
        <div className="mono nc-eyebrow">{NC.pricingEyebrow}</div>
        <div className="nc-pricing">
          {HOME_SERVICES.map(([n, name, durations, prices]) => (
            <div key={n} className="nc-pricing-row">
              <div>
                <div className="display nc-pricing-name">{name}</div>
                <div className="mono nc-pricing-d">{durations}</div>
              </div>
              <div className="display nc-pricing-p">{prices}</div>
            </div>
          ))}
        </div>
        <p className="nc-note">{NC.pricingNote}</p>
        <Link to="/services" className="text-link nc-more">Full service details</Link>
      </section>

      <section className="nc-section">
        <div className="mono nc-eyebrow">{NC.stepsEyebrow}</div>
        <ol className="nc-steps">
          {NC.steps.map(([t, d], i) => (
            <li key={t} className="nc-step">
              <span className="mono nc-step-n">0{i + 1}</span>
              <div>
                <div className="display nc-step-t">{t}</div>
                <div className="nc-step-d">{d}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="nc-section">
        <ul className="nc-basics">
          {BASICS.map(([t, d]) => (
            <li key={t}>
              <div className="display nc-basics-t">{t}</div>
              <div className="nc-basics-d">{d}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="nc-section">
        <blockquote className="nc-quote">
          <span className="display">“{quote.pull}</span>
          <span className="nc-quote-rest">{quote.rest}”</span>
          <footer className="mono">{quote.name}</footer>
        </blockquote>
      </section>

      <section className="nc-closing">
        <h2 className="display nc-closing-h">{NC.closingTitle}</h2>
        <p className="nc-body">{NC.closingBody}</p>
        <Link to="/contact" className="cta nc-cta">{NC.cta}</Link>
      </section>
    </div>
  );
}

const css = `
  .nc { background: var(--bg); color: var(--ink); min-height: 100%; }
  .nc-status { display: flex; align-items: center; gap: 8px; }
  .nc-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent-bright); box-shadow: 0 0 0 4px var(--accent-deep); }

  .nc-eyebrow { margin-bottom: 16px; }
  .nc-hero { padding: var(--space-hero) var(--gutter) 30px; }
  .nc-h1 { font-size: 54px; margin: 0; }
  .nc-lede { font-size: 15px; line-height: 1.6; color: var(--ink-2); margin: 20px 0 0; }
  .nc-cta { margin-top: 24px; }

  .nc-photo { height: 320px; overflow: hidden; }
  .nc-photo img { width: 100%; height: 100%; object-fit: cover; }

  .nc-section { padding: var(--space-section) var(--gutter) 0; }
  .nc-h2 { font-size: 36px; margin: 0; line-height: 1.0; }
  .nc-body { font-size: 14px; line-height: 1.6; color: var(--ink-2); margin: 14px 0 0; }

  .nc-seasonal { border: 1px solid var(--accent-deep); background: var(--bg-2); border-radius: 4px; padding: 20px; }
  .nc-seasonal-title { color: var(--accent-bright); }
  .nc-seasonal-body { font-size: 14px; line-height: 1.6; color: var(--ink-2); margin: 10px 0 0; }

  .nc-pricing { border-top: 1px solid var(--rule); }
  .nc-pricing-row { display: flex; justify-content: space-between; align-items: baseline; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--rule); }
  .nc-pricing-name { font-size: 20px; }
  .nc-pricing-d { margin-top: 4px; }
  .nc-pricing-p { font-size: 19px; white-space: nowrap; text-align: right; }
  .nc-note { font-size: 12px; line-height: 1.5; color: var(--ink-3); margin: 12px 0 0; }
  .nc-more { display: inline-block; margin-top: 14px; }

  .nc-steps { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--rule); }
  .nc-step { display: flex; gap: 14px; align-items: baseline; padding: 14px 0; border-bottom: 1px solid var(--rule); }
  .nc-step-n { color: var(--accent-dim); }
  .nc-step-t { font-size: 20px; }
  .nc-step-d { font-size: 13.5px; line-height: 1.55; color: var(--ink-2); margin-top: 4px; }

  .nc-basics { list-style: none; padding: 0; margin: 0; display: grid; gap: 18px; }
  .nc-basics-t { font-size: 20px; }
  .nc-basics-d { font-size: 13.5px; line-height: 1.55; color: var(--ink-2); margin-top: 4px; }

  .nc-quote { margin: 0; padding: 22px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
  .nc-quote .display { font-size: 24px; line-height: 1.15; }
  .nc-quote-rest { font-family: var(--serif-font); font-size: 16px; line-height: 1.5; color: var(--ink-2); }
  .nc-quote footer { margin-top: 14px; }

  .nc-closing { padding: 44px var(--gutter) var(--space-end); text-align: center; }
  .nc-closing-h { font-size: 36px; margin: 0; line-height: 1.05; }
`;
