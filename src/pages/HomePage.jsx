import { Link } from 'react-router-dom';
import { PHOTOS } from '../data/photos.js';
import {
  BUSINESS,
  CONTACT,
  HERO,
  BASICS,
  HOME_SERVICES,
  TESTIMONIALS,
  FOOTER,
} from '../data/content.js';

export default function HomePage() {
  return (
    <div className="ed">
      <style>{css}</style>

      {/* nav */}
      <div className="ed-topbar">
        <div className="ed-display italic-accent ed-wordmark">{BUSINESS.name}</div>
        <div className="ed-status">
          <span className="ed-dot" />
          <span className="mono ed-status-text">{BUSINESS.shortLocation}</span>
        </div>
      </div>
      <div className="rule ed-rule" />

      {/* hero */}
      <section className="ed-hero">
        <div className="mono ed-loc">{HERO.loc}</div>
        <h1 className="display ed-h1">
          {HERO.headlineL1}
          <br />
          <span className="italic-accent">{HERO.headlineL2}</span>
        </h1>
        <p className="ed-lede">{HERO.lede}</p>

        <div className="ed-cta-row">
          <Link to="/contact" className="cta">
            {HERO.ctaPrimary}
          </Link>
          <Link to="/services" className="text-link">
            {HERO.ctaSecondary}
          </Link>
        </div>
      </section>

      {/* about teaser */}
      <section className="ed-section ed-about-teaser">
        <img src={PHOTOS.celinaPortrait} alt="Celina." className="ed-about-portrait" />
        <div>
          <div className="mono ed-section-eyebrow">About</div>
          <div className="display ed-about-line">
            The go-to dog person, turned professional.
          </div>
          <Link to="/about" className="text-link ed-about-link">
            Read more →
          </Link>
        </div>
      </section>

      {/* trust strip */}
      <section className="ed-section">
        <div className="mono ed-section-eyebrow">The basics</div>
        <div className="ed-basics">
          {BASICS.map(([h, b]) => (
            <div key={h}>
              <div className="display ed-basic-h">{h}</div>
              <div className="ed-basic-body">{b}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="rule ed-rule" />

      {/* services list */}
      <section className="ed-section">
        <div className="mono ed-section-eyebrow">Services</div>
        {HOME_SERVICES.map(([n, name, sub, price]) => (
          <Link to="/services" key={n} className="ed-srow">
            <div className="ed-srow-left">
              <span className="mono ed-srow-num">{n}</span>
              <div>
                <div className="display ed-srow-name">{name}</div>
                <div className="ed-srow-sub">{sub}</div>
              </div>
            </div>
            <span className="mono ed-srow-price">{price}</span>
          </Link>
        ))}
      </section>

      {/* testimonials */}
      <section className="ed-section">
        <div className="mono ed-section-eyebrow">Words from clients</div>
        <div className="ed-tmgrid">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="ed-tm">
              <blockquote className="ed-tm-quote">
                <span className="display italic-accent ed-tm-pull">{t.pull}</span>
                <span className="ed-tm-rest">{t.rest}</span>
              </blockquote>
              <figcaption className="mono ed-tm-attrib">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Instagram grid */}
      <section className="ed-section ed-ig-section">
        <div className="ed-ig-head">
          <div className="mono">From the field</div>
          <a className="mono ed-ig-handle" href={CONTACT.instagramUrl} target="_blank" rel="noreferrer">
            @{CONTACT.instagramHandle} ↗
          </a>
        </div>
        <div className="ed-ig-grid">
          {[PHOTOS.ig1, PHOTOS.ig2, PHOTOS.ig3, PHOTOS.ig4, PHOTOS.ig5, PHOTOS.ig6].map((p, i) => (
            <div key={i} className="ed-ig-tile">
              <img src={p} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="ed-ig-foot">
          <a className="text-link" href={CONTACT.instagramUrl} target="_blank" rel="noreferrer">
            Follow for daily walks →
          </a>
        </div>
      </section>

      {/* footer cta */}
      <section className="ed-footer">
        <div className="display ed-footer-h">
          {FOOTER.headline.split('\n').map((line, i, a) => (
            <span key={i}>
              {i === 0 ? <span className="italic-accent">{line}</span> : line}
              {i < a.length - 1 && <br />}
            </span>
          ))}
        </div>
        <Link to="/contact" className="cta ed-footer-cta">
          {FOOTER.ctaLabel}
        </Link>
        <div className="mono ed-footer-meta">{FOOTER.meta}</div>
      </section>
    </div>
  );
}

const css = `
  .ed { background: var(--bg); color: var(--ink); min-height: 100%; }
  .ed-topbar { display:flex; align-items:center; justify-content:space-between; padding: 18px 22px 12px; }
  .ed-wordmark { font-size: 18px; }
  .ed-status { display:flex; gap:6px; align-items:center; }
  .ed-dot { width:6px; height:6px; border-radius:99px; background:var(--accent-bright); }
  .ed-status-text { font-size: 9.5px; }
  .ed-rule { margin: 0 22px; }

  .ed-hero { padding: 34px 22px 24px; }
  .ed-loc { margin-bottom: 22px; }
  .ed-h1 { font-size: 56px; margin: 0; }
  .ed-lede { font-size: 14.5px; line-height: 1.55; color: var(--ink-2); margin-top: 22px; max-width: 360px; }
  .ed-cta-row { margin-top: 26px; display:flex; align-items:center; gap: 18px; flex-wrap: wrap; }

  .ed-section { padding: 40px 22px 28px; }
  .ed-section-eyebrow { margin-bottom: 18px; }
  .ed-basics { display: grid; gap: 18px; }
  .ed-basic-h { font-size: 22px; }
  .ed-basic-body { font-size: 13.5px; line-height: 1.55; color: var(--ink-2); margin-top: 5px; }

  .ed-srow { display: flex; align-items: baseline; justify-content: space-between; padding: 18px 0; border-bottom: 1px solid var(--rule); cursor: pointer; text-decoration: none; color: inherit; gap: 14px; }
  .ed-srow:first-of-type { border-top: 1px solid var(--rule); }
  .ed-srow-left { display: flex; align-items: baseline; gap: 14px; min-width: 0; }
  .ed-srow-num { color: var(--accent-dim); }
  .ed-srow-name { font-size: 19px; }
  .ed-srow-sub { font-size: 11.5px; color: var(--ink-3); margin-top: 3px; }
  .ed-srow-price { color: var(--accent-bright); white-space: nowrap; }

  .ed-tmgrid { display: grid; gap: 28px; }
  .ed-tm { margin: 0; padding: 0; }
  .ed-tm-quote { margin: 0; font-family: var(--serif-font); font-size: 14.5px; line-height: 1.6; color: var(--ink-2); }
  .ed-tm-pull { font-size: 22px; line-height: 1.15; display: inline; }
  .ed-tm-rest { font-style: normal; }
  .ed-tm-attrib { margin-top: 12px; color: var(--ink-3); }

  .ed-ig-section { padding-bottom: 16px; }
  .ed-ig-head { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:16px; }
  .ed-ig-handle { color: var(--accent-bright); text-decoration: none; }
  .ed-ig-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
  .ed-ig-tile { aspect-ratio: 1; overflow: hidden; }
  .ed-ig-tile img { width:100%; height:100%; object-fit: cover; transition: transform .4s; }
  .ed-ig-tile:hover img { transform: scale(1.04); }
  .ed-ig-foot { text-align: center; margin-top: 18px; }

  .ed-about-teaser { display: flex; gap: 16px; align-items: flex-start; padding-bottom: 16px; }
  .ed-about-portrait { width: 96px; height: 120px; object-fit: cover; border-radius: 4px; flex-shrink: 0; }
  .ed-about-line { font-size: 22px; line-height: 1.1; }
  .ed-about-link { margin-top: 14px; display: inline-block; }

  .ed-footer { padding: 36px 22px 60px; text-align: center; }
  .ed-footer-h { font-size: 32px; line-height: 1.1; }
  .ed-footer-cta { margin-top: 22px; }
  .ed-footer-meta { margin-top: 22px; }
`;
