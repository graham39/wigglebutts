import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CONTACT_PAGE, CONTACT_FORM, BUSINESS, CONTACT } from '../data/content.js';

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let turnstileLoader;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!turnstileLoader) {
    turnstileLoader = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = TURNSTILE_SRC;
      script.onload = () => resolve(window.turnstile);
      script.onerror = () => {
        turnstileLoader = null;
        script.remove();
        reject(new Error('Turnstile failed to load'));
      };
      document.head.appendChild(script);
    });
  }
  return turnstileLoader;
}

const F = CONTACT_FORM.fields;

export default function ContactPage() {
  const navigate = useNavigate();
  const widgetEl = useRef(null);
  const widgetId = useRef(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  // Explicit render: the script only auto-renders on full page loads, not SPA route changes.
  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !widgetEl.current) return;
        widgetId.current = turnstile.render(widgetEl.current, {
          sitekey: CONTACT.turnstileSiteKey,
          action: 'contact',
          theme: 'dark',
          appearance: 'interaction-only',
        });
      })
      .catch((err) => console.error(err));
    return () => {
      cancelled = true;
      if (widgetId.current != null && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  const resetWidget = () => {
    if (widgetId.current != null && window.turnstile) window.turnstile.reset(widgetId.current);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (sending) return;
    // Build the payload before disabling the fieldset; disabled inputs are left out of FormData.
    const data = new FormData(e.currentTarget);
    setError(null);

    if (!data.get('cf-turnstile-response')) {
      setError(CONTACT_FORM.errors.verifying);
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: data });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        navigate('/thanks');
        return;
      }
      setError(CONTACT_FORM.errors[body.error] || CONTACT_FORM.errors.generic);
    } catch {
      setError(CONTACT_FORM.errors.generic);
    }
    setSending(false);
    resetWidget();
  }

  const field = (name, extra = {}) => {
    const f = F[name];
    const id = `ct-${name}`;
    const Tag = name === 'message' ? 'textarea' : 'input';
    return (
      <div className={`ct-field ${extra.className || ''}`}>
        <label htmlFor={id} className="mono ct-label">
          {f.label}
          {f.required && <span className="ct-req" aria-hidden="true"> *</span>}
        </label>
        <Tag
          id={id}
          name={name}
          className={name === 'message' ? 'ct-textarea' : 'ct-input'}
          type={Tag === 'input' ? f.type || 'text' : undefined}
          required={f.required}
          autoComplete={f.autoComplete}
          inputMode={f.inputMode}
          maxLength={f.maxLength}
          placeholder={f.placeholder}
          rows={name === 'message' ? 6 : undefined}
        />
      </div>
    );
  };

  return (
    <div className="ct">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="topbar">
        <Link to="/" className="mono hit">
          ← {BUSINESS.name}
        </Link>
        <div className="mono">Contact</div>
      </div>
      <div className="rule rule-inset" />

      <section className="ct-hero">
        <h1 className="display ct-h1">
          {CONTACT_PAGE.title[0]}
          <span className="italic-accent">{CONTACT_PAGE.title[1]}</span>
          {CONTACT_PAGE.title[2]}
        </h1>
        <p className="ct-body">{CONTACT_PAGE.body}</p>
      </section>

      <form className="ct-form" onSubmit={onSubmit}>
        <fieldset className="ct-fieldset" disabled={sending}>
          <div className="ct-pair">
            {field('first_name')}
            {field('last_name')}
          </div>
          {field('email')}
          <div className="ct-pair">
            {field('phone')}
            {field('zip')}
          </div>
          {field('message')}

          <div className="ct-hp" aria-hidden="true">
            <label htmlFor="ct-website">Website</label>
            <input id="ct-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div ref={widgetEl} className="ct-turnstile" />

          {error && (
            <p className="ct-error" role="alert">
              {error}{' '}
              <a className="text-link" href={CONTACT.instagramUrl} target="_blank" rel="noreferrer">
                @{CONTACT.instagramHandle}
              </a>
              .
            </p>
          )}

          <button type="submit" className="cta ct-submit">
            {sending ? CONTACT_FORM.sending : CONTACT_FORM.submit}
          </button>
        </fieldset>
      </form>

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

  .ct-hero { padding: var(--space-hero) var(--gutter) 24px; }
  .ct-h1 { font-size: 38px; margin: 0; line-height: 1.0; }
  .ct-body { font-size: 14.5px; line-height: 1.6; color: var(--ink-2); margin-top: 18px; }

  .ct-form { padding: 12px var(--gutter) 8px; }
  .ct-fieldset { border: 0; margin: 0; padding: 0; min-width: 0; display: grid; gap: 24px; }
  .ct-fieldset:disabled { opacity: 0.6; }
  .ct-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .ct-field { display: flex; flex-direction: column; min-width: 0; }
  .ct-label { color: var(--ink-3); margin-bottom: 8px; }
  .ct-req { color: var(--accent-bright); }

  .ct-input, .ct-textarea {
    width: 100%;
    background: transparent;
    color: var(--ink);
    font-family: var(--serif-font);
    font-size: 18px;
    line-height: 1.4;
    border-radius: 0;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    transition: border-color 0.15s ease;
  }
  .ct-input { border: 0; border-bottom: 1px solid var(--rule); padding: 6px 0 8px; }
  .ct-textarea { border: 1px solid var(--rule); border-radius: 4px; padding: 12px 14px; resize: vertical; min-height: 140px; }
  .ct-input:focus { border-bottom-color: var(--accent-bright); }
  .ct-textarea:focus { border-color: var(--accent-bright); }
  .ct-textarea::placeholder { color: var(--ink-3); font-style: italic; }

  .ct-input:-webkit-autofill,
  .ct-input:-webkit-autofill:hover,
  .ct-input:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--ink);
    caret-color: var(--ink);
    -webkit-box-shadow: 0 0 0 1000px var(--bg) inset;
    box-shadow: 0 0 0 1000px var(--bg) inset;
    transition: background-color 9999s ease-out 0s;
  }

  .ct-hp { position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden; }

  .ct-turnstile:empty { display: none; }

  .ct-error { margin: 0; font-size: 13.5px; line-height: 1.55; color: var(--ink); border-left: 2px solid var(--accent-bright); padding: 2px 0 2px 12px; }

  .ct-submit { justify-self: start; }
  .ct-fieldset:disabled .ct-submit { cursor: progress; }

  .ct-fallback { padding: 28px var(--gutter) var(--space-end); text-align: center; }
  .ct-fallback p { font-size: 13.5px; color: var(--ink-3); margin: 0; }
`;
