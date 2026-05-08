# wigglebutts-site

Marketing site for wigglebutts — Celina's dog walking & pet sitting practice in Fort Collins, CO. Mobile-first single-column editorial layout, ported from a Claude Design prototype.

Repo: https://github.com/graham39/wigglebutts (public, default branch `main`).

## Stack

- Vite 5 + React 18, plain JSX (no TypeScript)
- react-router-dom for the four routes
- No CSS framework — global tokens in `src/styles/global.css`, per-page styles inlined as a `<style>{css}</style>` block at the bottom of each page component (preserves the prototype's locality of style + markup)
- Fonts loaded from Google Fonts via `<link>` in `index.html`: DM Serif Display (headlines), Newsreader (serif body), Inter (sans), JetBrains Mono (labels)
- Contact form: Jotform iframe (form id in `CONTACT.formId`), auto-sized via Jotform's official embed handler script

## Layout

The site is intentionally locked to a centered 480px column even on desktop — the prototype was designed inside a 402px iOS frame and the editorial pacing depends on that narrow measure. Don't add a "desktop layout" without explicit user request.

## Files

- `src/pages/HomePage.jsx`, `AboutPage.jsx`, `ServicesPage.jsx`, `ContactPage.jsx` — one file per route, each owns its own scoped CSS
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
- Each page's CSS is a `const css = ...` template string at the bottom of the file, rendered into `<style>{css}</style>` inside the component. This is intentional — keeps a page self-contained.
- No emoji, no comments unless explaining a non-obvious why.
- Photos: import from `src/data/photos.js`, never hardcode URLs in pages.

## Content status

All user-facing copy and photos are real (no more placeholders). Copy lives in `src/data/content.js`. Photos live in `public/photos/`, mapped in `src/data/photos.js`.

The contact page is a Jotform iframe (form id in `CONTACT.formId`) — the iframe handles its own submission and thank-you screen. `ContactPage.jsx` injects Jotform's official embed handler script (`for-form-embed-handler.js`) and calls `window.jotformEmbedHandler` to auto-size the iframe. Form theme/colors are managed inside Jotform's dashboard (cross-origin, can't be styled from this side); the configured colors should match the site tokens in `src/styles/global.css`.

## Commands

```
npm run dev      # vite dev server (default :5173)
npm run build    # production build to dist/
npm run preview  # preview the built site
```

## What not to do

- Don't render the `_design/` HTML prototypes in a browser — they're React-via-Babel-CDN scaffolding, not the actual site.
- Don't reintroduce the iOS phone frame or the design canvas — those were design-tool chrome, not part of the production site.
- Don't add a Tweaks panel or runtime accent/font switching unless the user asks. The user picked their direction.
- Don't commit `claude-*.sh` or `.claude/settings.local.json` — they're gitignored on purpose (user's launcher scripts and Claude Code's per-machine permissions cache).
