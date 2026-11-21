import { Link } from 'react-router-dom';
import { PHOTOS, PHOTO_ALTS } from '../data/photos.js';
import { BUSINESS, SERVICES, SERVICES_INTRO, FAQ, FAQ_INTRO } from '../data/content.js';

export default function ServicesPage() {
  return (
    <div className="sv">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="topbar">
        <Link to="/" className="mono hit">← {BUSINESS.name}</Link>
        <div className="mono">Services</div>
      </div>
      <div className="rule rule-inset" />

      <section className="sv-intro">
        <h1 className="display sv-h1">
          {SERVICES_INTRO.title[0]}
          <span className="italic-accent">{SERVICES_INTRO.title[1]}</span>
          {SERVICES_INTRO.title[2]}
        </h1>
        <p className="sv-lede">{SERVICES_INTRO.lede}</p>
      </section>

      <section className="sv-cards">
        {SERVICES.map((s) => (
          <article key={s.n} className="sv-card">
            <img className="photo" src={PHOTOS[s.photoKey]} alt={PHOTO_ALTS[PHOTOS[s.photoKey]] || ''} />
            <div className="sv-card-body">
              <div className="sv-card-head">
                <span className="mono sv-card-num">{s.n}</span>
                <div className="display sv-card-name">{s.name}</div>
              </div>
              <div className="sv-card-sub">{s.sub}</div>
              <p className="sv-card-copy">{s.copy}</p>

              <div className="sv-pricing">
                {s.durations.map((d) => (
                  <div key={d.d} className="sv-pricing-row">
                    <div>
                      <div className="display sv-pricing-d">{d.d}</div>
                      <div className="sv-pricing-note">{d.note}</div>
                    </div>
                    <div className="display sv-pricing-p">{d.p}</div>
                  </div>
                ))}
              </div>

              <div className="sv-incl">
                <div className="mono">Includes</div>
                <ul>
                  {s.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>

              <Link to="/contact" className="cta sv-card-cta">
                Request {s.name.toLowerCase()} →
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="sv-faq">
        <h2 className="display sv-faq-h2">{FAQ_INTRO.title}</h2>
        <dl className="sv-faq-list">
          {FAQ.map(([q, a]) => (
            <div key={q} className="sv-faq-item">
              <dt className="display sv-faq-q">{q}</dt>
              <dd className="sv-faq-a">{a}</dd>
            </div>
          ))}
        </dl>
        <Link to="/contact" className="cta sv-card-cta">Get in touch →</Link>
      </section>
    </div>
  );
}

const css = `
  .sv { background: var(--bg); color: var(--ink); min-height: 100%; }

  .sv-intro { padding: var(--space-hero) var(--gutter) 28px; }
  .sv-h1 { font-size: 42px; margin: 0; line-height: 1.0; }
  .sv-lede { font-size: 14.5px; line-height: 1.6; color: var(--ink-2); margin-top: 18px; }

  .sv-cards { padding: 8px var(--gutter) var(--space-end); display: grid; gap: 24px; }
  .sv-card { background: var(--bg-2); border-radius: 4px; overflow: hidden; }
  .sv-card img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
  .sv-card-body { padding: 22px; }
  .sv-card-head { display: flex; align-items: baseline; gap: 10px; }
  .sv-card-num { color: var(--accent-dim); }
  .sv-card-name { font-size: 28px; }
  .sv-card-sub { font-size: 12px; color: var(--ink-2); margin-top: 4px; font-style: italic; }
  .sv-card-copy { font-size: 13.5px; line-height: 1.6; color: var(--ink-2); margin: 14px 0 0; }

  .sv-pricing { margin-top: 20px; border-top: 1px solid var(--rule); }
  .sv-pricing-row { display: flex; justify-content: space-between; align-items: baseline; padding: 12px 0; border-bottom: 1px solid var(--rule); gap: 14px; }
  .sv-pricing-d { font-size: 18px; }
  .sv-pricing-note { font-size: 11.5px; color: var(--ink-3); margin-top: 2px; }
  .sv-pricing-p { font-size: 22px; white-space: nowrap; }

  .sv-incl { margin-top: 14px; }
  .sv-incl ul { padding: 0; margin: 12px 0 0; list-style: none; }
  .sv-incl li { padding: 10px 0; border-bottom: 1px solid var(--rule); font-size: 13.5px; color: var(--ink-2); display: flex; gap: 10px; align-items: flex-start; }
  .sv-incl li:before { content: "+"; color: var(--accent-bright); font-family: var(--serif-font); font-size: 16px; line-height: 1; margin-top: 1px; }

  .sv-card-cta { margin-top: 18px; }

  .sv-faq { padding: 0 var(--gutter) var(--space-end); }
  .sv-faq-h2 { font-size: 34px; margin: 0; line-height: 1.0; }
  .sv-faq-list { margin: 22px 0 0; border-top: 1px solid var(--rule); }
  .sv-faq-item { padding: 16px 0; border-bottom: 1px solid var(--rule); }
  .sv-faq-q { font-size: 19px; line-height: 1.2; }
  .sv-faq-a { margin: 8px 0 0; font-size: 13.5px; line-height: 1.6; color: var(--ink-2); }
`;
