# 0001: Astro on Cloudflare Workers static assets

- Status: Accepted
- Date: 2026-10-20
- Deciders: Reed McIlwain
- Spec references: D1, R1, section 8.1 (T1 to T10), D7

## Context

The site needs a framework and free host that meet SPEC requirements T1 to T10. The main site is content-first (pages read once, little shared state), with a small number of interactive pieces (theme toggle, Valleyview status, later a BC map). Rules 3 and 4 and the performance budgets in section 9 favour shipping little or no JavaScript on text-first pages.

## Options considered

1. **Next.js (static export).** Most mainstream option, large ecosystem, familiar to agents and volunteers. Every page hydrates as a React app, so text-first pages carry React's runtime against a 100 KB JS budget. Static export drops server-dependent features and needs a custom image loader. Strongest if the site later becomes an application.
2. **Astro.** Pages render to HTML and CSS with no JavaScript by default. Interactive components are islands loaded per component and per route, which matches T6 and rule 4 directly. Built-in content collections with schemas (T4), i18n routing (T8), fonts and CSP APIs. Islands can be written in React, Svelte or plain JS. The Astro team joined Cloudflare in January 2026; Astro remains MIT-licensed and host-agnostic.
3. **SvelteKit.** Capable and light, but smaller ecosystem than Next.js and less content-oriented than Astro. Not pursued.

Hosting: Cloudflare's free tier permits organizational use (T1). Cloudflare now directs new static projects to Workers static assets rather than Pages. Vercel Hobby is personal and non-commercial only.

## Decision

Build the MVP with Astro, prerendered to static files, deployed to Cloudflare Workers static assets on the free tier, with a preview deploy per pull request.

App-like features go, in order of preference: an island on a page; a server-rendered Astro route (needs its own decision record under T2); or a separate app on a subdomain or routed path with its own privacy scope.

Analytics at launch is page views only (D7). Cloudflare Web Analytics is the default candidate because it is free and cookieless; the final choice is R2.

## Consequences

- Text-first pages ship near-zero JavaScript, which makes the section 9 budgets easy to hold.
- `.astro` syntax is new to some contributors. Islands that need to share state need a small shared store.
- Framework and host are both Cloudflare-stewarded. Mitigation: output is plain static files that any host can serve; avoid Cloudflare-only APIs in the main site without a decision record.
- Revisit if the main site needs accounts, a database, or substantial shared client state across pages. Prefer a separate app first; reconsider Next.js only if that split stops making sense.
- The R1 proof of concept (motion-heavy hero, one MDX page, one island, deployed on the free tier) is the first Phase 0 task and should confirm the budgets in practice. Replaced by record 0002: the scaffold and first deploy act as the proof of concept, and motion work comes with the brand.
