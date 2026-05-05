// Real photos sourced from wigglebutts.dog. Vite serves public/ at root,
// so /photos/foo.jpg refers to public/photos/foo.jpg.

export const PHOTOS = {
  // Homepage full-bleed hero (with pull-quote overlay)
  heroGolden: '/photos/hero.jpg',

  // About-page portrait + homepage about-teaser
  celinaPortrait: '/photos/celina.jpg',

  // Services cards (also reused on About-page photo split)
  walking: '/photos/gallery-03.jpg', // black lab in autumn aspens
  dropIn: '/photos/gallery-08.jpg', // cat being petted indoors
  cozy: '/photos/gallery-06.jpg', // pug napping

  // Instagram grid (3×2)
  ig1: '/photos/gallery-09.jpg', // shepherd at sunset
  ig2: '/photos/gallery-04.jpg', // golden retriever, snow on nose
  ig3: '/photos/gallery-01.jpg', // border collie at stream
  ig4: '/photos/gallery-02.jpg', // two bulldogs with a leaf
  ig5: '/photos/gallery-07.jpg', // husky-mix with treat
  ig6: '/photos/gallery-10.jpg', // black cat in grocery bag

  // Available but currently unused — drop into a slot above to swap
  _unused_catScratch: '/photos/gallery-05.jpg',
};

export const BADGES = {
  petcareInsurance: '/badges/petcare-insurance.png',
  wigglebuttsLogo: '/badges/wigglebutts-logo.webp',
};
