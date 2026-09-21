// UI strings. Architecture ready for a future `es.ts` and locale routing.
export const t = {
  nav: { tools: 'Tools', about: 'About', contact: 'Contact' },
  home: {
    heroTitle: 'Writing tools, AI-ready',
    heroSub: 'Generators for titles, captions and descriptions. Free, no sign-up.',
    searchPlaceholder: 'Search tools...',
    allTools: 'All tools',
    popular: 'Popular tools'
  },
  tool: {
    howTo: 'How to use',
    examples: 'Examples',
    faq: 'Frequently asked questions',
    related: 'Related tools'
  },
  footer: {
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    cookies: 'Cookie Policy',
    about: 'About',
    contact: 'Contact',
    rights: 'All rights reserved.'
  },
  notFound: { title: 'Page not found', body: 'The page you are looking for does not exist or was moved.' }
};
export type Strings = typeof t;
