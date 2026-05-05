# Content revision plan

The site was built from a design prototype. Most user-facing copy is templated placeholder content. This plan tracks replacing it with real data.

## Phase 1 — Inventory ✅ done

Real copy collected and applied (2026-05-05). All values now live in `src/data/content.js`.

## Phase 2 — Refactor ✅ done

- `src/data/content.js` created with all copy as named exports
- Page components now read from content (no literals)
- `/book` booking flow replaced with `/contact` form (`/book` redirects)
- `index.html` title + meta updated

## Phase 3 — Photos ✅ done

Pulled 12 real photos from wigglebutts.dog into `public/photos/`. Mapping in `src/data/photos.js`:

- `heroGolden` — `hero.jpg` (two black dogs on a CO mountain ridge)
- `celinaPortrait` — `celina.jpg`
- `walking` — `gallery-03.jpg` (lab in autumn aspens)
- `dropIn` — `gallery-08.jpg` (cat being petted indoors)
- `cozy` — `gallery-06.jpg` (pug napping)
- IG grid (3×2) — gallery-09, 04, 01, 02, 07, 10
- `_unused_catScratch` — `gallery-05.jpg` available to swap in

To swap any slot, edit `src/data/photos.js`. To add more photos, drop into `public/photos/` and add new keys.

Insurance badge wired onto About page → "Insured" row. Wigglebutts logo also downloaded to `public/badges/wigglebutts-logo.webp` but unused (the dark-on-white logo doesn't fit the dark editorial design — kept the italic text wordmark instead).

## Phase 4 — Contact form ✅ done

Switched from a custom React form to a hosted forms.space embed. URL lives in `CONTACT.formUrl` in `src/data/content.js`. The iframe handles its own submission and thank-you state.

## Phase 5 — Assets / TODOs

- [x] Insurance badge wired onto About page → "Insured" row
- [x] Captions removed (portrait, photo-split, "Pic. 01" tag)
- [ ] **Favicon + og-image** — user is preparing assets; drop into `public/` and we'll wire `<link rel="icon">` + `<meta property="og:image">` in `index.html`

## Phase 6 — Optional polish

- [ ] Desktop layout (currently mobile-locked at 480px even on wide screens — explicit design choice from the prototype, but worth revisiting for desktop visitors)
- [ ] Real domain + deploy (Vercel / Netlify both work out of the box for Vite)
