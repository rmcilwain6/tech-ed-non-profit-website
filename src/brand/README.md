# Brand layer

Everything that makes the site look and sound like the organization lives here and in `public/brand/`. The final brand lands as one pull request that touches only these two folders (SPEC section 6). Components read from this layer and never hard-code a name, colour, font, duration, logo or contact detail.

The current values are a **placeholder brand**: neutral greys, one blue accent, Noto Sans. It is meant to look unfinished.

Changes here need approval from a person (AGENTS.md).

## Files

| File                     | What it holds                                                       |
| ------------------------ | ------------------------------------------------------------------- |
| `brand.config.ts`        | Name, contact details, regions, paths to logo and images            |
| `tokens.css`             | Colours (light and dark), type, spacing, layout, shape, motion      |
| `fonts.css`              | `@font-face` rules for self-hosted fonts                            |
| `fonts/`                 | Font files and their licences                                       |
| `brand.css`              | Imports `fonts.css` and `tokens.css`; layouts import this file      |
| `public/brand/`          | `logo.svg`, `logo-mark.svg`, `favicon.svg`, `og-default.png`        |
| `/fixtures/orthography/` | Page that renders the SPEC section 6 sample strings in every weight |

## Config values (`brand.config.ts`)

| Key           | Current value                             | Notes                                                                                     |
| ------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `placeholder` | `true`                                    | Set to `false` with the final brand. While `true`, pages show a "Placeholder brand" label |
| `name`        | `[TK]`                                    | Full organization name                                                                    |
| `shortName`   | `[TK]`                                    | For tight spaces                                                                          |
| `tagline`     | `[TK]`                                    | One line, plain language                                                                  |
| `domain`      | `[TK]`                                    | Bare `.ca` domain, no `https://`                                                          |
| `email`       | `[TK]`                                    | Organization email, created with the domain (D21)                                         |
| `social`      | none                                      | List of `{ label, href }`                                                                 |
| `regions`     | Kamloops, Victoria, Vancouver             | Priority order (SPEC section 2)                                                           |
| `logo`        | `/brand/logo.svg`, `/brand/logo-mark.svg` | Full logo, square mark, and alt text                                                      |
| `favicon`     | `/brand/favicon.svg`                      | SVG favicon                                                                               |
| `socialImage` | `/brand/og-default.png`                   | 1200 × 630, with alt text                                                                 |

## Tokens (`tokens.css`)

### Colour

Each colour is written as `light-dark(light, dark)`. The site follows the system theme; `data-theme="light"` or `data-theme="dark"` on `<html>` overrides it. Every text pairing must reach 4.5:1 and every border 3:1 in both themes (checked before launch).

| Token                | Use                                           |
| -------------------- | --------------------------------------------- |
| `--color-bg`         | Page background                               |
| `--color-surface`    | Raised or set-apart areas, image placeholders |
| `--color-text`       | Body text and headings                        |
| `--color-text-muted` | Secondary text                                |
| `--color-border`     | Borders and dividers                          |
| `--color-accent`     | Buttons, highlights                           |
| `--color-on-accent`  | Text on `--color-accent`                      |
| `--color-link`       | Links (defaults to the accent)                |
| `--color-focus`      | Focus outline (defaults to the accent)        |

### Type

| Token                                                | Use                                |
| ---------------------------------------------------- | ---------------------------------- |
| `--font-body`, `--font-heading`, `--font-mono`       | Font stacks                        |
| `--font-weight-regular`, `--font-weight-bold`        | The only weights in use (400, 700) |
| `--text-sm`, `--text-base`, `--text-lg`, `--text-xl` | Fixed sizes                        |
| `--text-2xl`, `--text-3xl`                           | Headings; scale with the viewport  |
| `--leading-tight`, `--leading-normal`                | Line height for headings and body  |

Any font must render the orthography fixture correctly (SPEC section 6). If you add a weight, add a `--font-weight-*` token and add it to the fixture page.

### Space, layout and shape

| Token                                       | Use                             |
| ------------------------------------------- | ------------------------------- |
| `--space-1` to `--space-8`                  | Spacing scale, 0.25rem to 4rem  |
| `--width-prose`                             | Maximum line length for reading |
| `--width-page`                              | Maximum page width              |
| `--radius-sm`, `--radius-md`, `--radius-lg` | Corner radius                   |
| `--border-width`                            | Default border                  |
| `--focus-width`, `--focus-offset`           | Focus outline size and gap      |

### Motion

Animate `transform` and `opacity` only. Under `prefers-reduced-motion: reduce`, durations and distances drop to zero; components still provide their own still alternative.

| Token                                                   | Use                 |
| ------------------------------------------------------- | ------------------- |
| `--duration-fast`, `--duration-base`, `--duration-slow` | 120ms, 200ms, 400ms |
| `--ease-standard`, `--ease-enter`, `--ease-exit`        | Easing curves       |
| `--motion-distance-sm`, `--motion-distance-md`          | How far things move |

## Placeholder font

Noto Sans (SIL Open Font License, `fonts/OFL.txt`), variable weight 400 to 700, about 108 KB as WOFF2. It was cut from the full upstream font, because the Google Fonts subsets drop combining marks the orthographies need (U+0313 comma above, U+0331 macron below). Covered ranges: `U+0000-024F, U+0250-02FF, U+0300-036F, U+0370-03FF, U+1E00-1E9F, U+2000-206F`, plus a few symbols.

To swap in the final fonts: add the files to `fonts/` with their licence, update `fonts.css` and the `--font-*` tokens, then check the fixture page in every weight.
