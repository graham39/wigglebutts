// Runs after the client + SSR builds. Writes each route as real HTML into dist/
// so crawlers that don't execute JavaScript (most AI crawlers) can read the content,
// then generates sitemap.xml and llms.txt from the same copy in src/data/content.js.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  SITE, SEO, BUSINESS, CONTACT, HERO, BASICS, SERVICES, TESTIMONIALS, ABOUT, FAQ,
} from '../src/data/content.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (p) => SITE.url + p;
const stripTags = (s) => s.replace(/<[^>]+>/g, '');

const business = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': abs('/#business'),
  name: BUSINESS.name,
  description: SEO['/'].description,
  url: abs('/'),
  image: abs(SITE.ogImage),
  logo: abs('/icon-512.png'),
  foundingDate: String(BUSINESS.established),
  founder: { '@type': 'Person', name: SITE.ownerName, jobTitle: 'Dog walker and pet sitter' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.city,
    addressRegion: 'CO',
    addressCountry: 'US',
  },
  areaServed: { '@type': 'City', name: `${BUSINESS.city}, ${BUSINESS.region}` },
  priceRange: '$20–$150',
  sameAs: [CONTACT.instagramUrl],
  knowsAbout: ['Dog walking', 'Pet sitting', 'Cat care', 'Pet medication administration', 'Reactive dogs'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pet care services',
    itemListElement: SERVICES.flatMap((s) =>
      s.durations.map((d) => ({
        '@type': 'Offer',
        name: `${s.name}, ${d.d}`,
        description: d.note,
        price: d.p.replace(/[^0-9.]/g, ''),
        priceCurrency: 'USD',
        itemOffered: { '@type': 'Service', name: s.name, description: s.copy },
      }))
    ),
  },
  review: TESTIMONIALS.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewBody: (t.pull + t.rest).trim(),
  })),
};

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const ldScript = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

function replaceMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`index.html is missing <meta ${attr}="${key}">`);
  return html.replace(re, `$1${esc(value)}$2`);
}

const routes = Object.keys(SEO);
for (const route of routes) {
  const meta = SEO[route];
  const url = abs(route === '/' ? '/' : route);
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = replaceMeta(html, 'name', 'description', meta.description);
  html = replaceMeta(html, 'property', 'og:title', meta.title);
  html = replaceMeta(html, 'property', 'og:description', meta.description);
  html = replaceMeta(html, 'property', 'og:url', url);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);

  const head = [ldScript(business)];
  if (route === '/services') head.push(ldScript(faqPage));
  if (meta.noindex) head.push('<meta name="robots" content="noindex" />');
  html = html.replace('</head>', `    ${head.join('\n    ')}\n  </head>`);

  html = html.replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);

  const out = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`prerendered ${route}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => !SEO[r].noindex)
  .map((r) => `  <url><loc>${abs(r === '/' ? '/' : r)}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

const llms = `# ${BUSINESS.name}

> ${BUSINESS.name} is ${SITE.ownerName}'s independent dog walking and pet sitting business in ${BUSINESS.city}, ${BUSINESS.region} (est. ${BUSINESS.established}). Fully insured, no subcontractors, daily photo updates, free meet-and-greet before taking on any new pet.

${stripTags(HERO.lede)}

## Services and pricing

${SERVICES.map(
  (s) =>
    `### ${s.name}\n\n${s.copy}\n\n${s.durations.map((d) => `- ${d.d}: ${d.p}. ${d.note}`).join('\n')}\n\nIncludes:\n${s.includes.map((i) => `- ${i}`).join('\n')}`
).join('\n\n')}

## Why clients choose ${BUSINESS.name}

${BASICS.map(([t, d]) => `- **${t}.** ${d}`).join('\n')}

## About ${SITE.ownerName}

${ABOUT.paragraphs.map(stripTags).join('\n\n')}

## Frequently asked questions

${FAQ.map(([q, a]) => `### ${q}\n\n${a}`).join('\n\n')}

## What clients say

${TESTIMONIALS.map((t) => `- "${(t.pull + t.rest).trim()}" (${t.name})`).join('\n')}

## Contact and booking

- Service area: ${BUSINESS.serviceArea}
- Book or ask a question: ${abs('/contact')} (replies within a day)
- Instagram: ${CONTACT.instagramUrl}

## Pages

- [Home](${abs('/')})
- [About ${SITE.ownerName}](${abs('/about')})
- [Services and pricing](${abs('/services')})
- [Contact](${abs('/contact')})
`;
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('wrote sitemap.xml and llms.txt');
