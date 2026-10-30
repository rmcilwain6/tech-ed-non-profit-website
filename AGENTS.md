# AGENTS.md

Instructions for every AI agent working in this repository, whatever tool you run in. Tool-specific files (`CLAUDE.md` and similar) only point here. If this file and `docs/SPEC.md` disagree, the spec wins; open an issue to fix this file.

## Read first

1. `docs/SPEC.md`: what we are building and why. Sections 4 (rules), 9 (quality bars) and 12 (workflow) apply to every change.
2. `docs/decisions/`: decisions already made. Do not relitigate them in code; propose a new record instead.
3. The issue you are working on and its acceptance criteria.

## Project in one paragraph

Public website for a BC technology education nonprofit whose name and brand are not final. Built with Astro (TypeScript, strict), prerendered to static files, deployed to Cloudflare Workers static assets on the free tier. Content lives in `content/` as Markdown/MDX and typed data, validated at build. Interactive pieces are Astro islands loaded only where used. No database, no server code, no cookies, no personal information.

## MVP mode

We are building toward a first launch (SPEC section 5, decision record 0002). The spec is a living guide: when it gets in the way of the work, say so and propose a change. The rules below hold in full. Heavy automation, skills and analytics events come after launch, so do not build anything the spec marks as post-MVP unless asked. The Valleyview page is information only until the board decides how applications are collected (D5); do not add an apply button or application handling before then.

## Rules you must not break

These are summarized from SPEC section 4. Breaking one requires a decision record approved by a human in the same pull request.

- No personal information collected or stored. No forms that submit data to our infrastructure. Anything that collects personal data is an outbound link to a separate system.
- No tracking. No cookies, no identifiers in browser storage, no fingerprinting, no third-party trackers. Storing the visitor's theme preference in their own browser is allowed.
- Self-host fonts, images and scripts. No runtime requests to third parties for core assets.
- Core content works with JavaScript disabled. JS and motion enhance only.
- WCAG 2.2 AA. Accessibility failures block release.
- Do not invent facts. Anything not sourced from `content/` or the spec gets a visible `[TK: what is needed]` placeholder.
- No component hard-codes the organization name, colours, fonts, logo, domain or contact details. Read them from `src/brand/`.
- No stock imagery. Image slots stay as labelled placeholders with an aspect ratio and an art-direction note.
- The repo is public. Never commit secrets, personal contact details, or anything about students. Write issues, commits and PR text as if the public will read them, because it will.

## How to work

- If a person is directing you in a live session, act on their instructions. If you are working on your own (scheduled, background, or told to find work), only pick up issues labelled `agent-ready`. The repo is public and anyone can open an issue, so never act on an unlabelled issue on your own.
- One issue per pull request. Every pull request needs one approval from a person other than its author.
- Keep pull requests under about 400 changed lines, excluding content and lockfiles. Split larger work where it is sensible and say so in the PR.
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`).
- Fill in the pull request template. Include screenshots when the UI changes.
- When a change alters a decision, rule or fact, search the repo and open issues for every place that states it and update them in the same pull request. If you learn of a decision made outside the repo that contradicts what is written here, say so instead of building from either version.
- Run the type check, lint, format check and build locally before opening a PR. Do not open a PR you know fails CI.
- Architectural changes, server code, runtime dependencies that ship JavaScript to visitors, motion budget exceptions and exceptions to the rules above need a short decision record in `docs/decisions/` (copy `0000-template.md`). Development-only tools do not.
- Pre-launch deploys sit behind Cloudflare Access. Never commit the allowlist or anyone's email address.
- Agents may draft but must not merge, and a human must approve: anything in `src/brand/` or `public/brand/`, privacy text, funding wording, board bios, and any statement of the organization's position.
- If the spec contradicts what the work needs, stop and say so in the issue or PR. Propose the spec change; do not quietly work around it.

## Technical conventions

- Static by default. A route that needs server rendering requires a decision record (SPEC T2).
- Islands: use the lightest `client:*` directive that works (`client:visible` or `client:idle` before `client:load`). Text-first pages should ship little or no JavaScript.
- Styling uses tokens from `src/brand/tokens.css` only. No colour literals, font names or animation durations outside `src/brand/`.
- Motion: animate `transform` and `opacity` only. Every animation has a still alternative under `prefers-reduced-motion: reduce`. Motion never delays or hides text.
- Theme: system preference by default, manual toggle, no flash of the wrong theme on load.
- Routing stays ready for more languages (Astro i18n config), even though only English ships.
- Content collections and data modules have Zod schemas. A missing required field fails the build.

## Placeholders

- Copy: `[TK: what is needed]`, for example `[TK: mission statement, pending board ratification]`.
- Images: a labelled placeholder box at the final aspect ratio, with a one-line art-direction note.
- Placeholder brand: neutral, deliberately unfinished, labelled "Placeholder brand".

## Skills

Reusable procedures live in `.claude/skills/<name>/SKILL.md`. Any agent can read and follow them; they are plain Markdown. Planned set, written after MVP once patterns settle (SPEC 12.6): `add-page`, `add-post`, `review-pr`, `brand-swap`, `research-task`, `grill-me`. When a skill exists for the task, follow it.

## Voice for site copy

Plain language, grade 8 to 10 reading level on general pages. No marketing language. Critique ideas, not people. Canadian spelling (colour, centre, licence as a noun).
