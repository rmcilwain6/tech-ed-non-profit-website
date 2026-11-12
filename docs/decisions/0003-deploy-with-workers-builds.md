# 0003: Deploy with Cloudflare Workers Builds

- Status: Accepted
- Date: 2026-10-30
- Deciders: Reed McIlwain, Nicole Peverley
- Spec references: section 8.1, 11, 13; D1, D23; record 0001

## Context

The site needs a preview for each pull request, a staging copy of `main`, and a production deploy that happens only when the team decides to release. All of these are visible only to the team until launch (D23). The repository is public and must not hard-code its owner (SPEC 11).

## Options considered

1. **Cloudflare Workers Builds (Git integration).** Cloudflare builds and deploys when the repository changes. No deploy secrets in GitHub, and nothing in the repo names the owner. Build settings live in the Cloudflare dashboard rather than in the repo.
2. **GitHub Actions with Wrangler.** All steps visible in the repo, but needs an API token stored as a repository secret, and pull requests from forks need extra care.

## Decision

Option 1, with a separate `production` branch. The dashboard settings are:

- Production branch: `production`
- Builds for non-production branches: on
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command: `npx wrangler preview`

How code reaches each environment:

- **Pull request:** each push builds a preview, and Cloudflare comments its link on the pull request.
- **Staging:** `main` is not the production branch, so each merge builds a preview of `main`. Its branch link is the staging site.
- **Production:** publishing a GitHub release runs `.github/workflows/release.yml`. The workflow checks that the release's tag points to a commit on `main`, then fast-forwards `production` to that commit, and Cloudflare deploys it. Pre-releases do not deploy. The workflow uses the built-in `GITHUB_TOKEN`, so there are still no deploy secrets.
- **Rollback:** `production` only moves forward. Roll back from the Worker's Deployments page in the Cloudflare dashboard, then fix or revert on `main` and release again.

A ruleset on `production` blocks deletion and force pushes. Nobody pushes to `production` by hand.

`wrangler.jsonc` serves `dist/` as static assets with no Worker script. It also has an empty `previews` block, which `wrangler preview` requires. Wrangler is a development dependency, so builds use the version in the lockfile.

Preview URLs are public by default, so Access must be on before the repository is connected. Access can only be turned on for a Worker that already exists, so the order is:

1. Create a placeholder Worker from a template (not from Git), named `website` to match `wrangler.jsonc`.
2. In that Worker's settings, turn on Cloudflare Access for the `workers.dev` and preview URLs, and limit the policy to the team.
3. Open the `workers.dev` URL in a private window and confirm it asks for sign-in.
4. Connect the repository to that Worker. Builds replace the placeholder with the site.

Keep the allowlist out of the repo.

## Consequences

- No deploy credentials to store or rotate in GitHub, and moving the repository to an organization account only means reconnecting it.
- Merging to `main` no longer changes production. Each release is a tagged point the team can see and return to.
- These settings are not version controlled, so this record is their documentation. Update it if they change.
- At launch, Access comes off production and `X-Robots-Tag: noindex` comes out of `public/_headers` (SPEC 13).
- Revisit if builds need steps the dashboard cannot run, or if the free tier's build limits get in the way.
