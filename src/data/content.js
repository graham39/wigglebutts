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
  // Hosted form embed (forms.space) — handles its own submission + thank-you screen
  formUrl: 'https://derelict-tapestry-191.forms.space/019df8b1-4352-739e-9445-7be43e77e555',
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

// Hero photo pull-quote (the big full-bleed image on homepage)
export const HERO_QUOTE = {
  quote: 'Even my dogs felt\nthe love right away.',
  attribution: 'Anna B.',
  photoKey: 'heroGolden',
  photoAlt: 'Two black dogs resting on a Colorado mountain ridge.',
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
