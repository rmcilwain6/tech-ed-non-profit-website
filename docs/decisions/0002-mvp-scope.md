# 0002: MVP scope and lighter process until launch

- Status: Proposed
- Date: 2026-10-21
- Deciders: Reed McIlwain (pending review)
- Spec references: sections 4, 5, 7.4, 9, 10, 12; D5, D7, D16, D20, D23, D24; R1, R2, R4

## Context

Spec v0.4 front-loaded a lot of process into Phase 0: a full CI suite (end-to-end tests across widths and themes, axe, Lighthouse CI, an orthography fixture, custom checks), an initial set of agent skills, and a motion-heavy proof of concept. It also made the Valleyview page, with a working apply button and live status, a launch requirement.

The team wants to get a good site live first. Website, brand and board work are running in parallel with several people involved. The brand is the hardest piece, and the launch date can move with it. How Valleyview applications are collected involves data handling and process questions that belong to the board, not the website.

## Options considered

1. **Keep v0.4 as written.** Strong guarantees from day one, but most early effort goes into tooling for pages that don't exist yet, and launch depends on a board decision outside the website's control.
2. **MVP mode.** Keep the section 4 rules and the brand layer from day one. Check quality by hand during MVP and automate it after launch. Ship Valleyview as an information page.

## Decision

Option 2.

- The MVP is Phases 0 to 2: foundation, core pages, brand and launch. Target mid-November 2026, moving with the brand.
- The section 4 rules apply unchanged. During MVP they are checked by people in review and in one pre-launch pass (SPEC 9.2).
- MVP CI is type check, lint, format check and build. The rest of the automated suite moves to post-MVP (SPEC 9.3).
- Valleyview is an information page with no apply button until the board decides D5. Live status is post-MVP.
- Anonymous page views are a stretch goal for launch, not a blocker.
- Agent skills are written after MVP, once real patterns exist.
- The scaffold and first deploy replace the R1 proof of concept named in record 0001. Motion work comes with the brand.
- Every pull request still needs one approval from someone other than the author.
- Agents directed by a person in a live session act on that person's instructions. Agents working on their own only take `agent-ready` issues.
- Pre-launch deploys are protected by Cloudflare Access (D23), so there is no public interim URL.

## Consequences

- Effort goes into the site itself and the brand layer the brand work depends on.
- Regressions in accessibility or performance can slip in between pull requests and are caught later, at the pre-launch pass. Reviewers carry more of the load until the automated suite exists.
- The pre-launch pass must actually happen. It is on the launch checklist (SPEC 13).
- Revisit soon after launch: schedule the section 9.3 automation as the first post-MVP work.
