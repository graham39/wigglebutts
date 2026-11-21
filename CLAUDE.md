# wigglebutts-site

Marketing site for wigglebutts — Celina's dog walking & pet sitting practice in Fort Collins, CO. Mobile-first single-column editorial layout, ported from a Claude Design prototype.

Repo: https://github.com/graham39/wigglebutts (public, default branch `main`).

## Stack

- Vite 5 + React 18, plain JSX (no TypeScript)
- react-router-dom for the four routes
- No CSS framework — global tokens in `src/styles/global.css`, per-page styles inlined as a `<style dangerouslySetInnerHTML={{ __html: css }} />` block at the bottom of each page component (preserves the prototype's locality of style + markup)
- Fonts loaded from Google Fonts via `<link>` in `index.html`: DM Serif Display (headlines), Newsreader (serif body), Inter (sans), JetBrains Mono (labels)
- Contact form: native React form → Cloudflare Pages Function (`functions/api/contact.js`) → Resend email, with Turnstile + honeypot spam protection and a KV backup of every submission (see "Contact form" below)

## Layout

The site is intentionally locked to a centered 480px column even on desktop — the prototype was designed inside a 402px iOS frame and the editorial pacing depends on that narrow measure. Don't add a "desktop layout" without explicit user request.

## Files

- `src/pages/HomePage.jsx`, `AboutPage.jsx`, `ServicesPage.jsx`, `ContactPage.jsx` — one file per route, each owns its own scoped CSS
- `src/pages/NewClientsPage.jsx` — `/new-clients`, the landing page for Instagram ads. Not linked from site nav. Copy in `NEW_CLIENTS`; set `NEW_CLIENTS.seasonal` to `null` to drop the holiday block.
- `functions/api/contact.js` — Pages Function for `POST /api/contact` (validates, verifies Turnstile, backs up to KV, emails via Resend). Unit tests in `tests/contact.test.js` (kept outside `functions/` because every file there becomes a route).
- `src/data/content.js` — **all user-facing copy lives here.** Edit copy here, not in pages.
- `src/data/photos.js` — local photo paths + `BADGES` export for the Petcare Insurance badge / wigglebutts logo
- `src/styles/global.css` — design tokens (colors, fonts, shared `.cta` / `.mono` / `.display` classes)
- `public/photos/` — 12 real photos sourced from wigglebutts.dog (hero, Celina portrait, 10 gallery)
- `public/badges/` — Petcare Insurance seal (used) + wigglebutts logo (downloaded but not currently displayed; dark-on-white doesn't fit the dark editorial design)
- `public/favicon-32.png`, `public/icon-512.png`, `public/og-image.jpg` — favicon, Apple touch icon, og:image for link previews
- `_design/` — original Claude Design handoff bundle (HTML prototypes, chat transcripts). Read-only reference, gitignored.

## Design tokens

```
bg:           #0a0a0a
ink:          #efe9dc       (warm off-white)
ink-2/3:      #b8b0a0 / #7a7263   (body / muted)
rule:         #2a2620
accent (Aubergine):
  bright:     #b9a4dc
  dim:        #7d6b9a
  deep:       #3a2b52
display font: DM Serif Display 400
serif body:   Newsreader 400
sans:         Inter
mono labels:  JetBrains Mono
```

The original prototype let the user toggle accent (Aubergine / Cream / Amber / Sage), display font (Newsreader / Fraunces / DM Serif), and headline copy via a Tweaks panel. The user chose **Aubergine + DM Serif** — those are now baked in. The current headline is "Big walk energy." (set in `HERO.headlineL1` / `headlineL2`). Alternate accents/fonts are documented in `_design/wigglebutts/project/tokens.jsx`.

## Conventions

- Routing: navigation uses `<Link to="...">` from react-router. `ScrollToTop.jsx` resets scroll on route change. `/book` redirects to `/contact` (legacy from the original booking-flow prototype).
- Each page's CSS is a `const css = ...` template string at the bottom of the file, rendered via `<style dangerouslySetInnerHTML={{ __html: css }} />` inside the component. This is intentional — keeps a page self-contained. (Not `<style>{css}</style>`: server rendering escapes quotes in that form, which breaks CSS like `content: "+"` and causes hydration errors.)
- No emoji, no comments unless explaining a non-obvious why.
- Photos: import from `src/data/photos.js`, never hardcode URLs in pages. Every content photo gets `className="photo"` (one shared grade, `--photo-filter`); badges/logos don't.
- Restraint rules: the italic-accent word (`.italic-accent`) is used on the homepage hero and at most one H1 per page (plus the wordmark); secondary headings, prices and quotes stay plain. No mono eyebrow above a heading that already says the same thing. "→" only on `.cta` pill buttons, never on text links. No "№".
- Shared layout: topbars use the global `.topbar` + `rule rule-inset` classes; paddings use the spacing tokens in `:root` (`--gutter`, `--space-hero`, `--space-section`, `--space-end`). Small text links get `.hit` (or are `.text-link`) for a 44px tap area. Global `:focus-visible` outline; contact inputs keep their border-color focus instead.

## Content status

All user-facing copy and photos are real (no more placeholders). Copy lives in `src/data/content.js`. Photos live in `public/photos/`, mapped in `src/data/photos.js`.

## Contact form

`/contact` is a native form (`ContactPage.jsx`, copy in `CONTACT_FORM`). It POSTs FormData to `/api/contact`, then navigates to `/thanks` on success; on failure it shows an inline error pointing to Instagram and resets Turnstile. Field names (`first_name`, `last_name`, `email`, `phone`, `zip`, `message`, honeypot `website`) must match `FIELDS` in `functions/api/contact.js`.

The function: honeypot filled → fake `{ok:true}`; trims and caps fields; 400 on missing/invalid; verifies Turnstile (siteverify with `remoteip`, expects action `contact`) → 403; writes `submission:<ISO time>:<uuid>` to KV if bound (errors logged, not fatal); sends via Resend (`reply_to` = submitter) → 502 on failure. Responses are JSON with `cache-control: no-store`.

Config lives in the Cloudflare Pages dashboard (Settings → Variables and Secrets / Bindings), for both Production and Preview:

- Secrets: `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`
- Plaintext: `CONTACT_TO` (comma-separated inboxes), `CONTACT_FROM` = `wigglebutts <form@notify.wigglebutts.dog>`
- KV binding: `SUBMISSIONS`

**Do not add a `wrangler.toml`** — it would override the dashboard bindings. Email sends from `notify.wigglebutts.dog` (verified in Resend, DNS in Cloudflare). Never touch root-domain DNS: the root's MX/SPF/DMARC belong to Microsoft 365.

Turnstile site key is public, in `CONTACT.turnstileSiteKey`; dev builds use the always-pass test key. The widget is rendered explicitly in a `useEffect` (SPA route changes don't trigger auto-render) and removed on unmount. The widget's allowed hostnames in the Turnstile dashboard must include `wigglebutts.dog` and `wigglebutts.pages.dev` (covers preview subdomains), or previews can't submit.

Local end-to-end: `npm run build && npx wrangler pages dev dist`, with a gitignored `.dev.vars` holding `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` (always-pass test secret) plus `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.

## Prerendering and AI / search discoverability

Production pages are prerendered so crawlers that don't run JavaScript (most AI crawlers) see real content. `npm run build` runs three steps: the normal client build, an SSR build of `src/entry-server.jsx`, then `scripts/prerender.js`, which:

- writes each route in `SEO` (content.js) to `dist/<route>/index.html` with its own title, description, canonical and og tags
- injects LocalBusiness JSON-LD on every page and FAQPage JSON-LD on `/services`
- generates `dist/sitemap.xml` and `dist/llms.txt` from content.js (don't hand-edit those; they're build output)

`src/main.jsx` hydrates prerendered HTML. Anything touching `window`/`document` must stay inside `useEffect` or the prerender breaks. New routes need an entry in `SEO` to get prerendered. `public/robots.txt` explicitly allows AI crawlers. Site URL lives in `SITE.url`.

## Commands

```
npm run dev      # vite dev server (default :5173)
npm run build    # production build to dist/
npm run preview  # preview the built site
npm test         # unit tests for the contact Pages Function
```

## What not to do

- Don't render the `_design/` HTML prototypes in a browser — they're React-via-Babel-CDN scaffolding, not the actual site.
- Don't reintroduce the iOS phone frame or the design canvas — those were design-tool chrome, not part of the production site.
- Don't add a Tweaks panel or runtime accent/font switching unless the user asks. The user picked their direction.
- Don't commit `claude-*.sh` or `.claude/settings.local.json` — they're gitignored on purpose (user's launcher scripts and Claude Code's per-machine permissions cache).
