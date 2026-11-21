// All user-facing copy. Edit here, not in page components.

export const BUSINESS = {
  name: 'wigglebutts',
  city: 'Fort Collins',
  region: 'Colorado',
  shortLocation: 'Fort Collins, CO',
  serviceArea: 'Fort Collins and surrounding areas',
  established: 2024,
};

export const CONTACT = {
  instagramHandle: 'wigglebutts.dog',
  instagramUrl: 'https://instagram.com/wigglebutts.dog',
  // Cloudflare Turnstile site key (public). Dev builds use Cloudflare's always-pass test key.
  turnstileSiteKey: import.meta.env?.DEV ? '1x00000000000000000000AA' : '0x4AAAAAAGME4qsSBX_wi9bJ',
};

export const HERO = {
  // Editorial headline: split across two lines, second line gets italic accent.
  headlineL1: 'Big walk',
  headlineL2: 'energy.',
  loc: '№ 01 · Fort Collins, CO',
  lede:
    "Hi, I'm Celina! I provide dog walking and drop-in pet care across Fort Collins. Puppies, seniors, daily meds, and all types of animals are always welcome. I'm fully insured and you'll get daily photo updates. Let's keep those butts wiggling!",
  ctaPrimary: 'Get in touch →',
  ctaSecondary: 'How it works',
};

export const BASICS = [
  ['Daily photo updates', 'A real photo and a short note from every visit, so you can see exactly how it went.'],
  ['Just me, no subcontractors', "I'm the only person who walks and sits with your pet. Always."],
  ['Fully insured', 'Petcare Business Insurance. Every walk, every visit, covered.'],
];

// Compact services list shown on homepage
export const HOME_SERVICES = [
  ['01', 'Dog walking', '15 / 30 / 60 min', '$20 / $30 / $45'],
  ['02', 'Drop-in pet sitting', '15 / 30 / 60 min', '$20 / $30 / $45'],
  ['03', 'Overnights', 'By arrangement', 'From $150'],
];

// Detailed cards on services page
export const SERVICES = [
  {
    n: '01',
    name: 'Dog walking',
    sub: 'Exercise + attention, on your dog’s schedule.',
    copy:
      'A quick potty break or a full walk. Your dog gets the time, sniffs, and attention they need. Every visit is tailored to your dog, and you\'ll get photos and an update when I drop them off.',
    durations: [
      { d: '15 min', p: '$20', note: 'Potty break.' },
      { d: '30 min', p: '$30', note: 'Proper walk. Plenty of sniffs.' },
      { d: '60 min', p: '$45', note: 'Longer route. More exercise.' },
    ],
    includes: [
      'Same handler, me, every time',
      'Photo updates with every visit',
      'Comfortable with reactive and special-needs dogs',
      'Fully insured for every visit',
      'Free meet-and-greet before we start',
    ],
    photoKey: 'walking',
  },
  {
    n: '02',
    name: 'Drop-in pet sitting',
    sub: 'Personalized care while you’re away.',
    copy:
      "Feeding, watering, litter box, medication if needed, plenty of playtime and cuddles. I'll also collect mail and water plants on request. All animals welcome.",
    durations: [
      { d: '15 min', p: '$20', note: 'Quick check-in. Potty break, fresh water.' },
      { d: '30 min', p: '$30', note: 'Feed, fresh water, playtime or a walk.' },
      { d: '60 min', p: '$45', note: 'Full visit. Extended playtime and cuddles.' },
    ],
    includes: [
      'Feed, water, litter / potty break',
      'Med administration on schedule',
      'Mail, plants, household checks',
      'Photo updates with every visit',
      'All animals welcome: cats, dogs, more',
    ],
    photoKey: 'dropIn',
  },
  {
    n: '03',
    name: 'Overnights',
    sub: 'In your home. By arrangement.',
    copy:
      "Multi-night care for existing clients. Your pet stays in their own home, on their own routine. Same daily walks and drop-ins, plus me sleeping over. Reach out for a quote.",
    durations: [{ d: 'Per night', p: 'From $150', note: 'Custom to your pet and stay length.' }],
    includes: [
      'Existing clients only',
      "Your home, your pet's routine",
      'Daily photo updates',
    ],
    photoKey: 'cozy',
  },
];

export const SERVICES_INTRO = {
  eyebrow: 'What I offer',
  title: ['What I ', 'actually', ' do.'], // middle gets italic accent
  lede:
    "I keep the menu honest. Walks, drop-ins, and overnights for existing clients. That's it. Pricing is the pricing.",
};

// Full testimonials section on homepage
export const TESTIMONIALS = [
  {
    pull: 'There was an immediate unspoken trust',
    rest:
      ' I felt with Celina the moment we met. Even my dogs felt the love right away. Getting her cute photos and messages always made my day.',
    name: 'Anna B.',
  },
  {
    pull: 'I always feel fully secure',
    rest:
      ' that she is tending to their specific needs, giving them love and keeping them safe. One of the best parts is you basically receive a free photo shoot.',
    name: 'Marissa L.',
  },
  {
    pull: "Celina has taken care of my dogs for several years",
    rest:
      " and I couldn't be happier. She accommodates their schedule, picky food, medications, and lots of cuddles. My dogs adore her.",
    name: 'Lisa T.',
  },
  {
    pull: "Celina has been Meeko's trusted sitter since he was just a puppy.",
    rest:
      " Her reliability and dedication have brought us so much peace of mind. Meeko's excitement every time she arrives says it all.",
    name: 'Ashley M.',
  },
];

export const ABOUT = {
  eyebrow: 'Letter № 01',
  // Headline split into two parts: leading text, then italic-accented name + trailing
  headlineLead: "Hi, I'm ",
  headlineName: 'Celina',
  headlineTrail: ".\nHere's how I got here.",
  // Three paragraphs from your bio. Italic emphasis is rendered via <em> in the page.
  paragraphs: [
    "Hi there! I'm a passionate animal lover and professional dog walker / pet sitter based in Fort Collins. Originally from Chicago, I've called Colorado home for the past 10 years and have loved every moment here. My journey with pet care began when I started walking my neighbor's dog and quickly became the go-to caregiver for family and friends' pets.",
    "After moving to Colorado, I expanded my experience by working with a reputable pet sitting company before deciding to launch my own independent business here in Fort Collins. I believe in <em>open, honest communication</em> and provide daily updates with photos to keep you connected with your pets while you're away.",
    "I offer dog walking and drop-in visits where I will spend quality time with your pets, with experience caring for puppies, seniors, special needs pets, and administering medications. Your pets are family, and <em>I will treat them as my own</em>. I am also fully insured for your peace of mind.",
  ],
  pullQuote: {
    accent: "It started with one neighbor's dog. Now I can't imagine doing anything else.",
    rest: '',
  },
  facts: [
    ['Insured', 'Petcare Business Insurance'],
    ['Service area', 'Fort Collins and surrounding areas'],
    ['Capacity', 'Calendar fills up quickly. First come, first serve'],
  ],
  ctaTitle: ['Want to ', 'meet', '?'], // middle gets italic accent
  ctaBody: 'I do a free meet-and-greet before I take any new pet on. No pressure either way.',
  ctaLabel: 'Set up a meet-and-greet →',
};

export const FOOTER = {
  headline: 'Calendar fills up quickly.\nFirst come, first serve.',
  ctaLabel: 'Get in touch →',
  meta: 'Fort Collins, Colorado · est. 2024',
};

export const CONTACT_PAGE = {
  eyebrow: 'Get in touch',
  title: ['Tell me about your ', 'fur babies', '.'], // middle gets italic accent
  body:
    "Fill this out and I'll get back to you within a day, usually same morning. If we're a fit, we'll set up a free meet-and-greet.",
};

// Native contact form (ContactPage.jsx). Field names must match functions/api/contact.js.
export const CONTACT_FORM = {
  fields: {
    first_name: { label: 'First name', required: true, autoComplete: 'given-name' },
    last_name: { label: 'Last name', autoComplete: 'family-name' },
    email: { label: 'Email', required: true, type: 'email', autoComplete: 'email' },
    phone: { label: 'Phone', required: true, type: 'tel', autoComplete: 'tel' },
    zip: { label: 'Zip code', autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 10 },
    message: {
      label: 'Tell me about your pets',
      required: true,
      placeholder: "Names, ages, breeds, and what kind of care you're looking for.",
      maxLength: 5000,
    },
  },
  submit: 'Send message →',
  sending: 'Sending…',
  errors: {
    generic: "Sorry, your message didn't go through. Please try again, or reach out on Instagram",
    verifying: "Still checking you're human. Give it a few seconds and try again, or reach out on Instagram",
    invalid_email: 'That email address doesn’t look right. Please check it and try again, or reach out on Instagram',
    missing_fields: 'Please fill in the required fields and try again, or reach out on Instagram',
    verification_failed: "We couldn't verify you're human. Please try again, or reach out on Instagram",
  },
};

// Post-submit landing page (the contact form navigates here after a successful send)
export const THANKS = {
  eyebrow: 'Confirmation',
  headlineL1: 'Thanks!',
  headlineL2: 'Talk soon.',
  body:
    "I got your message and will reach out shortly. Usually same morning, always within a day.",
  ctaPrimary: 'Back to home →',
  ctaSecondary: 'Or say hi on Instagram',
  photoKey: 'heroGolden',
  photoAlt: 'Two black dogs resting on a Colorado mountain ridge.',
};

export const SITE = {
  url: 'https://wigglebutts.dog',
  ownerName: 'Celina',
  ogImage: '/og-image.jpg',
};

// Per-route <title> and meta description. Baked into each page's HTML at build
// time (scripts/prerender.js) so crawlers that don't run JavaScript still see them.
export const SEO = {
  '/': {
    title: 'wigglebutts · Fort Collins dog walking & pet sitting',
    description:
      'Celina is an independent, fully insured dog walker and pet sitter in Fort Collins, CO. Walks and drop-ins from $20, daily photo updates, free meet-and-greet.',
  },
  '/about': {
    title: 'About Celina · wigglebutts Fort Collins pet care',
    description:
      'Meet Celina, the Fort Collins dog walker and pet sitter behind wigglebutts. Experienced with puppies, seniors, special-needs pets, and medications.',
  },
  '/services': {
    title: 'Services & pricing · wigglebutts Fort Collins',
    description:
      'Dog walking and drop-in pet sitting in Fort Collins: $20 for 15 min, $30 for 30 min, $45 for 60 min. Overnights from $150 for existing clients.',
  },
  '/contact': {
    title: 'Contact · wigglebutts Fort Collins dog walking',
    description:
      'Get in touch with Celina about dog walking or pet sitting in Fort Collins. Replies within a day, free meet-and-greet before any new pet.',
  },
  '/new-clients': {
    title: 'Now accepting new clients · wigglebutts Fort Collins',
    description:
      'Celina is accepting new dog walking and pet sitting clients in Fort Collins, CO. Walks and drop-ins from $20, fully insured, free meet and greet.',
  },
  '/thanks': {
    title: 'Thanks · wigglebutts',
    description: 'Thanks for reaching out. Celina will be in touch within a day.',
    noindex: true,
  },
};

export const FAQ_INTRO = {
  eyebrow: 'Questions',
  title: ['Good to ', 'know', '.'], // middle gets italic accent
};

// Plain-language answers to what people ask before booking. Also published as
// FAQPage structured data and in /llms.txt so AI assistants can quote them.
export const FAQ = [
  [
    'How much does dog walking cost?',
    'Walks are $20 for 15 minutes, $30 for 30 minutes, and $45 for 60 minutes. Drop-in pet sitting visits are priced the same. Overnights start at $150 per night.',
  ],
  [
    'What area do you serve?',
    'Fort Collins, Colorado and the surrounding areas.',
  ],
  [
    'Who will be caring for my pet?',
    "Me, Celina. I don't use subcontractors, so the same person walks and sits with your pet every time.",
  ],
  [
    'Do you work with reactive or special-needs dogs?',
    "Yes. I'm comfortable with reactive and special-needs dogs, and I have experience with puppies, seniors, and giving medications on schedule.",
  ],
  [
    'Do you care for cats and other animals?',
    'Yes, all animals are welcome. Drop-in visits cover feeding, fresh water, litter boxes, medication, and playtime.',
  ],
  [
    'Are you insured?',
    'Yes. I carry Petcare Business Insurance, which covers every walk and every visit.',
  ],
  [
    'Do you offer overnight pet sitting?',
    'Yes, for existing clients. I stay in your home so your pet keeps their own routine. Overnights start at $150 per night.',
  ],
  [
    'How do I get started?',
    "Send me a message through the contact form. I reply within a day, usually the same morning, and if we're a fit we'll set up a free meet-and-greet first.",
  ],
];

// Landing page for Instagram ads (/new-clients). Points everything at the meet and greet.
export const NEW_CLIENTS = {
  topbarLabel: 'New clients',
  loc: 'Fort Collins, CO · Now booking',
  headlineL1: 'Now accepting',
  headlineL2: 'new clients.',
  lede:
    "Fort Collins pet owners: I'm Celina, an independent, fully insured dog walker and pet sitter. Every new client starts with a free meet and greet, so your pet gets to know me before I ever walk in alone.",
  cta: 'Book a meet and greet →',
  photoKey: 'heroGolden',
  photoAlt: 'Two black dogs resting on a Colorado mountain ridge.',

  // Timely angle shown as its own block, not the headline. Set to null after the
  // holidays and the page keeps working as-is.
  seasonal: {
    eyebrow: 'Traveling for the holidays?',
    body:
      "Set up your meet and greet now so we're ready before you leave. Drop-ins, walks, and meds on schedule while you're away, with photo updates every visit.",
  },

  areaEyebrow: 'Service area',
  areaTitle: ['Fort Collins ', 'and', ' nearby.'], // middle gets italic accent
  areaBody: "If you're not sure whether you're in range, ask in your message and I'll let you know.",

  pricingEyebrow: 'Pricing',
  pricingNote: 'Drop-in visits are priced the same as walks. Overnights are for existing clients.',

  stepsEyebrow: 'How it starts',
  steps: [
    ['Send a message', "Tell me about your pet. I reply within a day, usually the same morning."],
    ['Free meet and greet', 'I come meet your pet at home. No pressure either way.'],
    ['First visit', 'Then we get on the calendar, and you get a photo and a note every visit.'],
  ],

  closingTitle: ['Book a ', 'meet and greet', '.'], // middle gets italic accent
  closingBody: 'Calendar fills up quickly. First come, first serve.',
};
