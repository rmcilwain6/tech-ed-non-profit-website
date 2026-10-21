# Bootstrap: Phase 0 handoff

Starting brief for the first agent session in this repo. Delete this file once every item below is either done or an open issue.

The repo currently holds documentation only. Read `AGENTS.md` and `docs/SPEC.md` before starting.

## 1. Scaffold Astro into the existing repo

- Run `npm create astro@latest .` with the minimal template, TypeScript strict. Keep the existing files; merge any generated `.gitignore` entries into the existing one.
- Pin Node to the current LTS in `.nvmrc` and `package.json` `engines`.
- Add Prettier, ESLint (with `eslint-plugin-astro` and `eslint-plugin-jsx-a11y`), and `astro check` as the type check.
- Add `npm` scripts: `dev`, `build`, `preview`, `check`, `lint`, `format`, `test`, `test:e2e`.

## 2. Deploy to Cloudflare Workers static assets

- The site is fully static, so no Astro server adapter is needed yet. Deploy `dist/` as Workers static assets with a `wrangler.jsonc` (`"assets": { "directory": "./dist" }`, `compatibility_date` set to the current date).
- Preview deploy per pull request and production deploy from `main`, via GitHub Actions or Cloudflare's Git integration, whichever keeps secrets out of the repo with the least setup. Record the choice in a short decision record.
- Do not hard-code the GitHub owner or repo name anywhere (SPEC 11). Read from `${{ github.repository }}` or config.
- Production stays `noindex` until launch (SPEC 13).

## 3. CI (SPEC 9)

Set up incrementally; an empty-but-wired check is better than a missing one.

- On every PR: `astro check`, lint, format check, unit tests (Vitest), build.
- Playwright smoke test: every route, mobile and desktop widths, light and dark themes.
- axe accessibility scan on every route and theme (`@axe-core/playwright`).
- Lighthouse CI on key routes against the preview URL, thresholds at 95 (mobile).
- Custom checks: colour literals and placeholder org name outside `src/brand/`; `[TK:` present (only fails when a `LAUNCH` flag is set); internal link check.
- Secret scanning: enable GitHub secret scanning and push protection in repo settings (human step).

## 4. Brand layer and placeholder theme (SPEC 6)

- `src/brand/brand.config.ts`, `src/brand/tokens.css` with light and dark tokens including motion tokens, self-hosted font definitions.
- Placeholder brand: neutral wireframe look, labelled "Placeholder brand".
- Theme toggle with no flash of the wrong theme: a small inline script in `<head>` reads the stored preference or the system setting before first paint.
- Orthography fixture page or test rendering the sample strings from SPEC 6 in every font weight in use.

## 5. R1 proof of concept

A motion-heavy hero (CSS transform and opacity only, reduced-motion still state), one MDX page, and one island using `client:visible`. Deploy to a preview URL and record the JS and transfer sizes in the PR. This confirms the section 9 budgets on real output.

## Known gaps to raise as issues

These came out of the spec review on 2026-10-20 and need a decision before or during Phase 1.

- **Valleyview status on a static site.** Status (open / opening soon / closed) computed at build time goes stale when the window opens. Options: a scheduled daily rebuild (GitHub Actions cron), or correct no-JS fallback text plus a small script that updates the status client-side. Must be settled before the Valleyview page ships.
- **Home page budget.** Home is a key route held to Lighthouse 95, and it is also the likely home of the signature BC map and motion. Decide whether Home is a heavy-visual route with its own budget (decision record) or carries a lighter version of the visual.
- **Analytics beacon and rule 3.** If the page-view beacon loads from a vendor domain, confirm it is acceptable under rule 3 ("core assets") or proxy/self-host it. Name the service on the Privacy page.

## Human steps (not for agents)

- Create the public repository on GitHub and push these files.
- Branch protection on `main`: PR required, CI green, one human approval.
- Create the `agent-ready` label.
- Enable private vulnerability reporting, secret scanning and push protection.
- Create the Cloudflare account (organizational use) and connect deploy credentials as repository secrets.
