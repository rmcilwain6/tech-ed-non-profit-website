# Bootstrap: MVP plan

Starting brief for building the MVP (SPEC section 5, decision record 0002). Delete this file once every item below is done or tracked as an issue.

Read `AGENTS.md` and `docs/SPEC.md` first. Each numbered step is roughly one issue and one pull request. Steps 1 to 4 are in order; the pages in step 5 can be built in any order once step 4 lands.

## 1. Scaffold Astro into the existing repo

- `npm create astro@latest .` with the minimal template, TypeScript strict. Keep the existing files; merge generated `.gitignore` entries into the existing one.
- Pin Node to the current LTS in `.nvmrc` and `package.json` `engines`.
- Prettier, ESLint (with `eslint-plugin-astro` and `eslint-plugin-jsx-a11y`), and `astro check` as the type check.
- `npm` scripts: `dev`, `build`, `preview`, `check`, `lint`, `format`.
- i18n config with English as the default locale and no prefix (SPEC T8).
- One GitHub Actions workflow on pull requests and `main`: check, lint, format check, build.

## 2. Deploy to Cloudflare Workers static assets

- The site is fully static, so no Astro server adapter is needed. Deploy `dist/` as Workers static assets with a `wrangler.jsonc` (`"assets": { "directory": "./dist" }`, `compatibility_date` set to the current date).
- Production deploy from `main` and a preview deploy per pull request. Prefer Cloudflare's Git integration (no deploy secrets in the repo); record the choice in a short decision record.
- Cloudflare Access in front of the `workers.dev` and preview URLs (D23). Configured in the Cloudflare dashboard, not the repo.
- `noindex` on every page until launch.
- A `_headers` file with basic security headers. A full Content Security Policy can come later.
- Do not hard-code the GitHub owner or repo name (SPEC 11).

## 3. Brand layer and placeholder theme

- `src/brand/brand.config.ts`, `src/brand/tokens.css` (light and dark colours, type scale, spacing, radius, motion tokens), and a self-hosted font with wide character coverage, so the orthography sample strings render (SPEC 6).
- Placeholder brand: neutral wireframe look, labelled "Placeholder brand".
- A short `src/brand/README.md` listing every token and config value. The people doing the brand work fill these in.
- An orthography fixture page showing the SPEC 6 sample strings in every font weight in use.

## 4. Shared layout

- Base layout: header with primary navigation, footer (contact, regions, privacy link), skip link, page title and meta description.
- Theme toggle with no flash of the wrong theme: a small inline script in `<head>` reads the stored preference or the system setting before first paint. Hidden when JavaScript is off.
- Content collection schemas for page content, `content/board.ts` and Valleyview information.

## 5. Core pages (SPEC 7)

Home, About, Contact, 404, Funding, Board, Valleyview (information only), Privacy. Use `[TK: ...]` for anything not yet known. Funding wording, board bios and privacy text are drafted and need human approval. Board details are committed only with the member's agreement (SPEC 7.3).

## 6. Pre-launch and launch

- Manual checks in SPEC 9.2 with the final brand.
- Brand swap pull request touching only `src/brand/` and `public/brand/`.
- Launch checklist (SPEC 13).
- Stretch: anonymous page views (D7, R2).

## Open questions to settle along the way

- **Home page visuals.** Home is the likely home of the signature BC visual and motion, and it is also a key performance route. Decide during the brand work whether Home gets its own budget (decision record) or a lighter version of the visual.
- **Analytics and rule 3.** If a page-view script loads from a vendor domain, decide whether that is acceptable or whether to self-host or proxy it. Part of R2.

## Human steps (not for agents)

- Branch protection on `main`: pull request required, CI green, one approval.
- Create the `agent-ready` label (for agents working on their own).
- Enable private vulnerability reporting (secret scanning and push protection are already on).
- Create the Cloudflare account (organizational use), connect the repo, and set up the Access allowlist.
