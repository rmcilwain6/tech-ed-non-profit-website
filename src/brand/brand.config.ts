// Organization identity. Components read the name, contact details and
// brand assets from here, never from literals (SPEC section 6, rule 7).
// Every value is listed in README.md in this folder.

export interface SocialLink {
  /** Visible link text, e.g. the platform name. */
  label: string;
  href: string;
}

export interface Brand {
  /** True until the final brand lands. Layouts show a "Placeholder brand" label while it is set. */
  placeholder: boolean;
  name: string;
  shortName: string;
  tagline: string;
  /** Bare domain, no protocol. */
  domain: string;
  email: string;
  social: readonly SocialLink[];
  /** Where we start, not our boundary (SPEC section 2). */
  regions: readonly string[];
  /** Paths under `public/`. */
  logo: {
    full: string;
    mark: string;
    alt: string;
  };
  favicon: string;
  socialImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

const name = '[TK: organization name, pending board decision]';

export const brand = {
  placeholder: true,
  name,
  shortName: '[TK: short name]',
  tagline: '[TK: tagline, from the brand work]',
  domain: '[TK: .ca domain, registered at launch]',
  email: '[TK: organization email, created with the domain (D21)]',
  social: [],
  regions: ['Kamloops', 'Victoria', 'Vancouver'],
  logo: {
    full: '/brand/logo.svg',
    mark: '/brand/logo-mark.svg',
    alt: name,
  },
  favicon: '/brand/favicon.svg',
  socialImage: {
    src: '/brand/og-default.png',
    alt: 'Placeholder brand',
    width: 1200,
    height: 630,
  },
} as const satisfies Brand;
