# 0003: Deploy with Cloudflare Workers Builds

- Status: Proposed
- Date: 2026-10-30
- Deciders: pending review
- Spec references: section 8.1, 11, 13; D1, D23; record 0001

## Context

The site needs a production deploy from `main` and a preview for each pull request, visible only to the team until launch (D23). The repository is public and must not hard-code its owner (SPEC 11).

## Options considered

1. **Cloudflare Workers Builds (Git integration).** Cloudflare builds and deploys when the repository changes. No deploy secrets in GitHub, and nothing in the repo names the owner. Build settings live in the Cloudflare dashboard rather than in the repo.
2. **GitHub Actions with Wrangler.** All steps visible in the repo, but needs an API token stored as a repository secret, and pull requests from forks need extra care.

## Decision

Option 1. The dashboard settings are:

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command: `npx wrangler preview`

`wrangler.jsonc` serves `dist/` as static assets with no Worker script. Wrangler is a development dependency, so builds use the version in the lockfile.

Preview URLs are public by default. Before connecting the repository, use "Protect all Workers" on the Workers & Pages overview and choose "All traffic", so the first deploy is already protected. Keep the allowlist out of the repo.

## Consequences

- No deploy credentials to store or rotate in GitHub, and moving the repository to an organization account only means reconnecting it.
- These settings are not version controlled, so this record is their documentation. Update it if they change.
- At launch, Access comes off production and `X-Robots-Tag: noindex` comes out of `public/_headers` (SPEC 13).
- Revisit if builds need steps the dashboard cannot run, or if the free tier's build limits get in the way.
