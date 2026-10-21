# Website Spec (v0.5)

Status: moved into the repo from Notion on 2026-10-20. This file is now the source of truth; changes go through pull requests. Section 14 tracks every decision as **Decided**, **Open (board)** or **Open (research)**. Research tasks (R1, R2, ...) are defined in section 15.

**This is a living guide, not a contract.** Decisions are firm enough to build on, not fixed forever. Requirements will change as the brand, the board's decisions and the team's needs develop. When something here gets in the way of what the work needs, raise it and change the spec in a pull request rather than working around it quietly. Larger changes get a decision record (section 12.4).

**We are in MVP mode** (decision record 0002). The goal is a live, well-made site with the core pages, the final name and the final brand. The values rules in section 4 hold from day one. Heavy process and automation (the full CI test suite, skills, analytics events) come after launch. Where this spec describes something as post-MVP, do not build it yet.

Owners: Reed McIlwain and Nicole Peverley (shared; no fixed split of roles)

Source material: 2026-10-15 requirements meeting minutes; strategic framework draft (Oct 2026); spec Q&A 2026-10-17 (two rounds); stack decision 2026-10-20; MVP scoping 2026-10-21

---

## 1. Purpose

Build the public website for a BC technology education nonprofit (name not yet chosen). The site exists to:

1. Give teachers, school leaders and district staff a credible place to land after a conversation with us.
2. Give students a findable home for the Valleyview Social Innovation Grant. Last year the application was only reachable by direct link.
3. Publish our positions, resources and values openly.
4. Serve as a working demonstration that we build technology well: fast, accessible, private by default.

The site is built **before** the name and brand are final. Brand application must be a single, isolated change (section 6).

## 2. Organizational context agents must know

- Four strategic pillars (board vote, Oct 15 2026):
  1. Be an independent voice on technology in BC education.
  2. Build lasting, face-to-face partnerships with educators and communities.
  3. Help students understand, question and shape the digital world.
  4. Empower young people to build their ideas now.
- Regions in priority order: Kamloops, Victoria, Vancouver.
- We are a BC organization working on a BC problem. BC identity (its geography, its map, its regions) is expected to shape the brand and the site's feel.
- Values that become engineering rules: skepticism of ed-tech business models, transparency, privacy by default, face-to-face over platform.
- Public voice: plain language, no marketing language, critique ideas not people.

## 3. Audiences

| Priority | Audience | What they need |
| --- | --- | --- |
| 1 | Teachers and school/district staff (BC) | Who we are, what we do, why to trust us, how to reach us |
| 2 | Graduating high school students | Valleyview grant details and how to apply |
| 3 | Funders, partners, media | Mission, board, funding values, contact |
| 4 | Parents and the public | Plain-language writing and resources (later phases) |

## 4. Non-negotiable rules

These apply to every change, including during MVP. Agents must not break them without a recorded decision (section 12.4). During MVP, most of them are checked by people in review and in a pre-launch pass (section 9) rather than by automated checks.

1. **No personal information is collected or stored by this site.** No forms that submit personal data to our infrastructure, no accounts, no logins. Anything that collects personal information (applications, surveys, sign-ups) is a separate system reached by an outbound link, unless a recorded decision says otherwise (see D5).
2. **No tracking of individuals.** No cookies, no persistent identifiers in storage, no fingerprinting, no IP address retention, no third-party trackers or pixels. Anonymous aggregate counts only (section 10).
3. **No third-party runtime requests for core assets.** Fonts, images and scripts are self-hosted.
4. **Core content works without JavaScript.** JavaScript and motion enhance; they never gate reading.
5. **Accessibility is a release blocker.** WCAG 2.2 AA. Checked manually before launch; automated checks in CI after MVP (section 9).
6. **Agents do not invent facts.** Copy not sourced from `content/` or this spec uses a visible placeholder: `[TK: what is needed]`. No `[TK:` may remain at launch (checked manually for MVP; a build check after MVP).
7. **Brand values live in one place.** No component hard-codes the organization name, colours, fonts, logo, domain or contact details (section 6).
8. **No stock imagery.** Image slots stay as labelled placeholders until original photography exists.
9. **The repository is public.** Never commit secrets, personal contact details, or anything about students. Assume every issue, comment and pull request discussion is read by the public.

## 5. Scope by phase

The MVP is Phases 0 to 2: foundation, core pages, then brand and launch.

### Phase 0: Foundation

- D1 (Astro on Cloudflare) recorded as decision record 0001.
- Repo, basic tooling (type check, lint, format, build in CI), deploy pipeline, preview deploys per pull request. Pre-launch deploys are protected by Cloudflare Access (D23).
- `AGENTS.md`, this spec, decision log, public-repo files (section 11).
- Brand layer and placeholder brand: neutral "wireframe" theme in light and dark, plus the shared layout (header, navigation, footer, skip link, theme toggle).

### Phase 1: Core pages (pre-brand)

Pages: Home, About, Board, Valleyview Grant (information only), Funding, Contact, Privacy, 404 (section 7), built against the placeholder brand.

### Phase 2: Brand and launch

- Apply name, logo, colours, type and motion language through the brand layer.
- Register the domain, set up the organization email, connect the domain, make production public, remove `noindex`.
- Pre-launch checks (section 9.2) and launch checklist (section 13).
- Stretch goal: anonymous page view counts (D7).

### Launch timing (D16, D20)

Target: mid-November 2026. Website, brand and board work run in parallel, with several people involved. The brand is the hardest piece; if it is not ready, the launch date moves, and that is fine. The site goes public with the final name, brand and domain together, and there is no public interim URL. Until launch, deploys are visible only to the team (D23).

### Post-MVP (soon after launch)

- The automated quality suite in section 9.3.
- Agent skills (section 12.6).
- Named analytics events (section 10).
- Valleyview application link and status, once the board settles how applications are handled (D5).

### Phase 3: Publishing (soon after launch)

Blog/News first, then Teacher Resources, Tool Guide, Events, Get Involved, FAQ, Corrections log, AI Use statement. Truth and Reconciliation page if the board approves it (R6).

### Phase 4: Interactive tools (each gets its own spec)

- BC map.
- Troubleshooting toolkit (web plus printable PDF).
- Digital skills check (runs in the browser, stores nothing).
- Annual report as a web page.

### Stretch goals (no phase assigned)

- French language support.
- Content in Indigenous languages, only in partnership with the communities concerned (R7).

### Out of scope for this repo

- Surveys, volunteer databases or any system holding personal information, unless D5 decides otherwise for Valleyview.
- Donations and payments.
- Accounts or member areas.

## 6. Brand layer (swap-in architecture)

Goal: applying the final brand is one pull request that touches only `src/brand/` and `public/brand/`.

```
src/brand/
  brand.config.ts   # name, shortName, tagline, domain, email, social links, regions
  tokens.css        # colour (light and dark), type scale, spacing, radius, motion tokens
  fonts.*           # self-hosted font definitions
public/brand/
  logo.svg, logo-mark.svg, favicon.svg, og-default.png
```

Rules:

- Components use tokens only. No raw colour values, font names or durations outside `src/brand/`.
- Motion tokens (durations, easings, distances) live in the brand layer, so the brand pass can change how the site moves as well as how it looks.
- Organization name and contact details are read from `brand.config.ts`.
- Post-MVP: a CI check fails on colour literals and the placeholder org name outside `src/brand/`. Until then, reviewers check this.
- Both themes (light and dark) must pass contrast checks for every token pairing used (checked before launch).
- The placeholder theme must look deliberately unfinished and be labelled "Placeholder brand".
- **Typefaces must render Indigenous place names and orthographies correctly**, including characters such as é, ʷ, ̓ (combining comma above), ə, ł, ḵ, x̱ and ʔ. A fixture page renders sample strings (Secwépemc, Lək̓ʷəŋən, xʷməθkʷəy̓əm, Sḵwx̱wú7mesh, səl̓ilw̓ətaʔɬ) in every font weight in use. For MVP, a person checks it with the brand fonts before launch; post-MVP it becomes an automated check.

## 7. Site map and page requirements

All pages share: header with primary navigation, footer (contact, regions, privacy link), skip link, theme toggle, page title and meta description. Navigation goes to separate pages; no anchor-scroll menus.

### 7.1 Home (`/`) Phase 1

- One-sentence statement of who we are (`[TK]` until the mission is final).
- The four pillars, linking to About.
- Valleyview Grant highlight linking to the grant page. Automatic status (open / opening soon / closed) is post-MVP (section 7.4).
- Primary call to action: **Contact us**.
- Regional presence: Kamloops, Victoria, Vancouver. A strong candidate for the site's signature BC visual and motion (section 8.2).

### 7.2 About (`/about`) Phase 1

- Mission statement (`[TK]` until ratified).
- Pillars with approved one-line definitions.
- Values and how we work (remote-first, in person by choice, three regions).

### 7.3 Board (`/board`) Phase 1

Card per person, with data in `content/board.ts`, schema-validated:

- Required: name, photo, board role, home region.
- Optional: industry or career, areas of expertise, short bio, one external link.
- Not shown: personal email, phone, or regional lead designation (pending board decision D14).
- Photo slots use placeholders until original portraits are shot.
- A board member's details are committed only after that member has agreed to them. Git history is public and permanent, so a draft that is later removed is still published.

### 7.4 Valleyview Social Innovation Grant (`/valleyview`) Phase 1, information only

For MVP this is a well-designed information page. How applications are collected and handled is not the website's decision; the board is working it out (D5). The likely outcome is an outbound link to a Canadian-hosted form or survey tool.

MVP:

- What it is, who can apply, award amount, what recipients get (funding plus mentorship). Use `[TK]` for any detail the board has not confirmed.
- The three application questions: what's the idea, why are you the right person, how will this help.
- Timeline from data, where dates are known.
- How and when to apply, as text. No apply button until D5 is decided.
- Short FAQ addressing last year's barriers: nerves about pitching, feeling unqualified.
- No past-recipient section.
- Short, memorable URL for posters and school announcements.

Post-MVP, once D5 is decided:

- Apply button pointing to the application destination. Outside the window, the button is replaced by explanatory text and the next expected date.
- Page status (open / opening soon / closed) computed from dates. It must stay correct on a static site: status computed only at build time goes stale when the window opens or closes, and the text must make sense without JavaScript.

### 7.5 Funding (`/funding`) Phase 1

- Funding values only: why we fund the organization the way we do, no money from companies whose main business is selling ed-tech, and the aim that no single source becomes large enough to shape what we say.
- How and where funding will be disclosed is a board decision (D11). The page must not show funder names or amounts until then.
- Wording drafted from the strategic plan, approved by a human.

### 7.6 Contact (`/contact`) Phase 1

- Organization email from brand config as a `mailto:` link. No form. The address does not exist yet; it is created with the domain (Phase 2).
- What to contact us about: Pro-D and workshops, school visits, partnerships, Valleyview, media.
- Post-MVP: clicking the email link counts as an anonymous event (section 10, D7).

### 7.7 Privacy (`/privacy`) Phase 1

- States what the site does and does not collect: no personal information, no cookies, anonymous aggregate counts only.
- Lists every service involved (hosting, analytics) and where it is based.
- Explains that linked external forms have their own notices, and where their data is stored.
- Notes that the theme toggle preference is stored only in the visitor's own browser.
- Agent drafts, human approves.

### 7.8 404 Phase 1

Helpful, on-brand, links to Home and Contact.

### 7.9 Phase 3 pages

| Page | Path | Notes |
| --- | --- | --- |
| Blog / News | `/writing` | Posts with author, date, tags; RSS feed. Authors may include anyone on the team (section 12.7) |
| Teacher Resources | `/resources` | Curated, filterable by type, grade band, topic |
| Tool Guide | `/tools` | Critical reviews against fixed questions; vendor naming policy D15 |
| Events | `/events` | Data-driven; .ics file per event |
| Get Involved | `/get-involved` | Outbound links only |
| FAQ | `/faq` | |
| Corrections | `/corrections` | Public log of what we got wrong and what changed |
| AI Use | `/ai` | Once the organization's statement exists |
| Truth and Reconciliation | TBD | Our perspective on the TRC Calls to Action and how we are working toward them. Only if the board approves (D13, R6). Replaces a footer land acknowledgement |

## 8. Technical requirements

### 8.1 Stack: Astro on Cloudflare (D1, decided Oct 20, 2026)

Astro, deployed to Cloudflare Workers (static assets) on the free tier. This is the MVP platform and stays open to revision if needs change. See `docs/decisions/0001-astro-on-cloudflare.md`.

App-like features go, in order of preference:

1. An island on a page (client-side component loaded only where used).
2. A server-rendered Astro route (decision record required under T2).
3. A separate app on a subdomain or routed path, with its own privacy scope.

The stack must continue to meet these requirements:

| # | Requirement |
| --- | --- |
| T1 | Free hosting tier whose terms allow use by an organization (Vercel's Hobby tier does not: personal, non-commercial only) |
| T2 | Pages prerendered as static files by default. Server code only by recorded decision |
| T3 | TypeScript, strict mode |
| T4 | Content as Markdown/MDX files plus typed data modules, validated at build |
| T5 | Path to a CMS that non-technical writers can use without GitHub accounts (R3) |
| T6 | Rich motion and interactive components (e.g. a BC map) loaded only where used, without bloating text-only pages |
| T7 | Light and dark themes without a flash of the wrong theme on load |
| T8 | Routing structure ready for additional languages without a rewrite |
| T9 | Anonymous page view counting (a stretch goal for launch); named events later (section 10, D7) |
| T10 | Mainstream enough that AI agents and future volunteers can work in it, and credible as a modern stack |

Candidates considered: Next.js (static export), Astro, SvelteKit. Next.js remains the fallback if the site shifts toward being an application.

Fixed regardless of stack:

- No database in Phases 0 to 2.
- `.ca` domain at a Canadian registrar once the name is chosen.
- $0 per month operating cost target; only the domain is paid.
- Until launch, the production and preview deploys sit behind Cloudflare Access (free tier), so only allowlisted team members can see them (D23). This is account configuration, not code. Never commit the allowlist or team email addresses. At launch, Access comes off the production domain; it may stay on previews.

### 8.2 Look, feel and motion

- Approachable, active and unique. The site should feel alive and clearly from BC.
- BC geography and the map of BC are expected brand ingredients. Design research (R5) explores this before the brand pass.
- Motion is part of the identity, under these limits:
  - Every animation respects `prefers-reduced-motion` with a still alternative.
  - Motion never delays or hides content. Text is readable at first paint.
  - Animate transform and opacity only, unless a recorded decision allows otherwise.
  - Heavy visuals (map, canvas, WebGL) load only on routes that use them and have their own performance budget.
- Dark mode ships at launch, following the system setting by default with a manual toggle.
- Photography: original images shot by Reed in fall 2026. Layouts define image slots with fixed aspect ratios and a short art-direction note per slot.

## 9. Quality bars

The standards are the same before and after MVP. What changes is how they are checked: by people during MVP, by automation after it.

### 9.1 MVP: enforced on every pull request

- CI: type check (`astro check`), lint, format check and build pass.
- Secret scanning and push protection (GitHub repository settings).
- Content schemas validate at build (a missing required field fails the build).

### 9.2 MVP: checked in review and before launch

In review, for changes that affect the UI:

- Keyboard navigation with visible focus on every interactive element.
- Reduced-motion version checked for every animated component.
- 200% zoom without horizontal scroll.
- Plain-language copy (aim for grade 8 to 10 reading level on general pages).
- No colour literals, font names, durations or organization name outside `src/brand/`.

Once before launch, run by hand against the built site with the final brand:

- Accessibility scan (axe) on every route in both themes, with zero violations.
- Lighthouse on key routes, aiming for 95 or above (mobile) in all four categories.
- Budgets for text-first pages: under 200 KB transferred excluding images; JavaScript under 100 KB compressed.
- Contrast for every token pairing in both themes.
- Orthography fixture with the brand fonts (section 6).
- No `[TK:` placeholders remain, and internal links resolve.

### 9.3 Post-MVP: automated

- Unit tests for data schemas and utilities.
- End-to-end smoke tests load every route at mobile and desktop widths, in light and dark themes.
- Automated axe scan with zero violations on every route and theme.
- Lighthouse CI on key routes at 95 or above (mobile). Run against a local production build with the median of several runs, because scores vary between runs.
- Brand-literal check, `[TK:` check (when launch is enabled), orthography font fixture, internal link check.
- Routes with heavy visuals (for example a BC map on Home) declare their own budget in a decision record.

## 10. Analytics

Purpose: know which pages are visited and whether key actions happen, without knowing who anyone is.

At launch (D7), as a stretch goal: page views per route only. Launch does not wait for it.

Later (deferred, tool via R2):

- Named events, initially: `valleyview_apply_click`, `contact_email_click`, `theme_toggle`.
- Referrer domain and broad device class, if the tool provides them without identifiers.

Must not, at any phase:

- Set cookies or store identifiers in the browser.
- Store IP addresses or build per-visitor sessions.
- Share data with advertising networks.

The Privacy page names the tool. Optional, if cheap: publish the aggregate numbers on a public stats page as part of being transparent.

## 11. Repository

- Hosted on Reed's personal GitHub account for now, with transfer to an organization account later. Nothing (CI, deploy config, links, badges) may hard-code the owner name; read it from config so the transfer is painless.
- Public from day one. Required files: `README.md`, `LICENSE` (D17), `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`.

```
/AGENTS.md                 # rules for all AI agents (canonical, tool-neutral)
/CLAUDE.md                 # imports AGENTS.md
/docs/SPEC.md              # this document
/docs/decisions/           # numbered decision records
/docs/research/            # technical research findings, if moved from Drive (D22)
/docs/CONTENT.md           # editing guide, voice and style (when needed)
/.claude/skills/           # skills, also listed in AGENTS.md so any agent can read them (post-MVP)
/content/                  # pages and typed data
/src/                      # application code, brand layer
/public/brand/             # logo, favicon, social image
/tests/                    # end-to-end, unit, visual fixtures
/.github/                  # CI, issue and pull request templates
```

## 12. Agent workflow

### 12.1 Work intake

- Work is tracked as GitHub Issues with short acceptance criteria, so the whole team can see what is planned and in progress. One issue per pull request.
- **An agent working with a person directing it in a live session** may act on that person's instructions. The instruction is the approval.
- **An agent working without a person directing it** (scheduled, background, or told to find work) only picks up issues labelled `agent-ready`, applied by a maintainer. The repository is public and anyone can open an issue, so agents never act on an unlabelled issue on their own.

### 12.2 Pull requests

- Branch protection on `main`: pull request required, CI green, at least one approval from a person other than the author. No exceptions for content-only changes. Team members review each other's work.
- Size guideline: under about 400 changed lines excluding content and lockfiles. Split larger work where it is sensible.
- Template: what changed, why, linked issue, and screenshots when the UI changes (mobile and desktop; light and dark where it matters).
- Preview deploy URL on every pull request (behind Cloudflare Access until launch).
- Conventional Commits.

### 12.3 Agent tools

Team members may use different AI tools. `AGENTS.md` is the single source of agent instructions and must not assume a specific tool. Tool-specific files only point to it.

### 12.4 Decisions

Decision records are for choices worth explaining later: architectural changes, server code, runtime dependencies that ship JavaScript to visitors, motion budget exceptions, and any exception to section 4. Add the record in the same pull request. Keep it short. Agents may propose; humans approve through review. Development-only tools (linters, test runners) do not need a record.

### 12.5 Human-only areas

Agents may draft, but a human must approve: the brand layer, privacy text, funding wording, board bios, and any statement of the organization's position.

### 12.6 Skills (post-MVP)

Write these once the patterns they describe have settled in real code. `add-page` may come earlier if several pages are built the same way.

| Skill | Purpose |
| --- | --- |
| `add-page` | New route, content file, metadata, navigation entry, end-to-end test, from the page template |
| `add-post` | Converts a submitted draft into a blog post with valid metadata (Phase 3) |
| `review-pr` | Checks a pull request against this spec, section 4 and section 9 |
| `brand-swap` | Applies a brand package to the brand layer only, then runs visual checks |
| `research-task` | Runs an R-task and writes findings in a fixed format: question, options, criteria, evidence with sources, recommendation (location per D22) |
| `grill-me` | Interviews a human to turn a vague request into an issue with acceptance criteria |

### 12.7 Blog publishing workflow (Phase 3)

- Start: writers send drafts in any format. A maintainer (or an agent using `add-post`) turns each into a pull request; a human approves.
- Later: a CMS that lets any team member write and submit without a GitHub account, chosen through R3.

## 13. Launch checklist (Phase 2)

- [ ] Name, logo, colours, type and motion applied through the brand layer only
- [ ] Pre-launch checks in section 9.2 pass with the final brand, both themes
- [ ] No `[TK:` placeholders remain
- [ ] Domain connected, HTTPS enforced, `www` redirect decided
- [ ] Cloudflare Access removed from the production domain
- [ ] `noindex` removed
- [ ] Privacy page approved; names the analytics tool if one is in use
- [ ] Valleyview content approved; application link included only if D5 is decided
- [ ] Organization email tested from the Contact page

## 14. Decisions

| ID | Decision | Status | Resolution or default |
| --- | --- | --- | --- |
| D1 | Stack and hosting | Decided | Astro on Cloudflare Workers (static assets), free tier. Oct 20, 2026. Record 0001 |
| D2 | Domain | Open (board) | `.ca`, after the name is chosen |
| D3 | GitHub home | Decided | Reed's personal account, transferable later |
| D4 | Home call to action | Decided | Contact us |
| D5 | Where Valleyview applications are collected | Open (board) | Decided outside the website, in board discussions; R4 informs it. Likely an outbound link to a Canadian-hosted form tool. Not an MVP blocker |
| D6 | Repo visibility | Decided | Public |
| D7 | Analytics | Decided for MVP | Anonymous page views only, no cookies, as a stretch goal for launch. Named events deferred; tool via R2 |
| D8 | Content editing and CMS | Decided for now | Drafts submitted, published via pull request. CMS later via R3 |
| D9 | Languages | Decided | English only. i18n-ready routing. French and Indigenous languages are stretch goals (R7) |
| D10 | Dark mode | Decided | At launch, system default plus toggle |
| D11 | Funding disclosure | Open (board) | Values only on the page until decided; may live in formal reports instead |
| D12 | Donations | Decided | Out of scope |
| D13 | Land acknowledgement / Truth and Reconciliation page | Open (board) | No footer acknowledgement by default. R6 informs the board |
| D14 | Regional leads shown publicly | Open (board) | Not shown |
| D15 | Tool Guide names specific products | Open (board) | Phase 3 |
| D16 | Launch date | Decided (target) | Mid-November 2026, together with name, brand and domain (D20). Moves if the brand is not ready. Revised Oct 21, 2026 (record 0002) |
| D17 | Licence | Decided | MIT for code, CC BY 4.0 for written content |
| D18 | Human review on every pull request | Decided | Yes, including content-only changes |
| D19 | Past Valleyview recipients featured | Decided for Phase 1 | No. Revisit with consent later |
| D20 | Valleyview page before the name exists | Decided | No public interim launch. The site, name, brand and domain go public together. Valleyview launches as an information page; the application link follows D5. Revised Oct 21, 2026 (record 0002) |
| D21 | Organization email | Open (blocked) | Created with the domain in Phase 2 |
| D22 | Where research findings live | Decided for now | Google Drive. Technical findings may move to `docs/research/` |
| D23 | Pre-launch visibility | Decided | Production and preview deploys behind Cloudflare Access until launch; only allowlisted team members can see them. Oct 21, 2026 |
| D24 | MVP scope | Decided | Phases 0 to 2 with the section 4 rules; heavy automation, skills and analytics events after launch. Oct 21, 2026 (record 0002) |

## 15. Research tasks

Each produces a findings document in Google Drive (D22) using the `research-task` format: question, options, criteria, evidence with sources, recommendation. Humans make the decision.

| ID | Question | Blocks |
| --- | --- | --- |
| R1 | Which stack and host best meet T1 to T10? | Resolved by D1. The scaffold and first deploy act as the proof of concept; motion work comes with the brand |
| R2 | Which tool counts anonymous page views (and later named events) with no cookies, at no cost? Include hosted options and a self-built counter on the host's free tier. Check rules 2 and 3: whether a vendor-hosted script counts as a third-party request, and what the tool does with IP addresses | Page views at launch (stretch goal, D7) |
| R3 | Which CMS lets non-technical writers draft and submit posts without GitHub accounts, works with Astro, and costs nothing? | Phase 3 |
| R4 | How should Valleyview applications be collected? Compare building our own (separate system, Canadian hosting) with Canadian form tools. Account for applicants who are minors, BC privacy law (PIPA), what schools expect, cost, and effort | Valleyview application link (post-MVP, D5). Owned by the board discussion |
| R5 | Design inspiration: sites and identities that feel approachable, active and rooted in place, especially BC and Canadian examples, and how others use maps, geography and motion | Phase 2 |
| R6 | Best practices for land acknowledgements and organizational responses to the TRC Calls to Action, especially Calls 62 to 65 on education. What makes them meaningful rather than performative, and who should be consulted | Board decision D13 |
| R7 | What supporting French and Indigenous languages would take: technical needs, translation and community partnership, and examples of respectful practice | Stretch |
