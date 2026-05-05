# wigglebutts-site

Marketing site for a small dog-walking practice. Mobile-first single-column editorial layout, ported from a Claude Design prototype.

## Stack

- Vite 5 + React 18, plain JSX (no TypeScript)
- react-router-dom for the four routes
- No CSS framework — global tokens in `src/styles/global.css`, per-page styles inlined as a `<style>{css}</style>` block at the bottom of each page component (preserves the prototype's locality of style + markup)
- Fonts loaded from Google Fonts via `<link>` in `index.html`: DM Serif Display (headlines), Newsreader (serif body), Inter (sans), JetBrains Mono (labels)

## Layout

The site is intentionally locked to a centered 480px column even on desktop — the prototype was designed inside a 402px iOS frame and the editorial pacing depends on that narrow measure. Don't add a "desktop layout" without explicit user request.

## Files

- `src/pages/HomePage.jsx`, `AboutPage.jsx`, `ServicesPage.jsx`, `ContactPage.jsx` — one file per route, each owns its own scoped CSS
- `src/data/content.js` — **all user-facing copy lives here.** Edit copy here, not in pages.
- `src/data/photos.js` — Unsplash URL constants (placeholders until real photos arrive)
- `src/styles/global.css` — design tokens (colors, fonts, shared `.cta` / `.mono` / `.display` classes)
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

The original prototype let the user toggle accent (Aubergine / Cream / Amber / Sage), display font (Newsreader / Fraunces / DM Serif), and headline copy via a Tweaks panel. The user chose **Aubergine + DM Serif + "favorite human" headline** — those are now baked in. If revisiting, the alternate values are documented in `_design/wigglebutts/project/tokens.jsx`.

## Conventions

- Routing: navigation uses `<Link to="...">` from react-router. `ScrollToTop.jsx` resets scroll on route change.
- Each page's CSS is a `const css = ...` template string at the bottom of the file, rendered into `<style>{css}</style>` inside the component. This is intentional — keeps a page self-contained.
- No emoji, no comments unless explaining a non-obvious why.
- Photos: import from `src/data/photos.js`, never hardcode URLs in pages.

## Content status

User-facing copy has been replaced with real content (Celina, Fort Collins, real testimonials, real pricing) and centralized in `src/data/content.js`. Photos are still Unsplash placeholders — see `PLAN.md` Phase 3.

Routing: the original prototype had a 4-step `/book` flow; this was replaced with a `/contact` form (First/Last/Phone/Zip/Message). `/book` redirects to `/contact` for any external links. Form submission goes to Formspree — endpoint is set via `CONTACT.formspreeEndpoint` in `content.js`. While empty, the form simulates success on submit so it's usable in dev.

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
