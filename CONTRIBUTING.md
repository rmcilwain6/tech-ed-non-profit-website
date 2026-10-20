# Contributing

Thanks for helping. This repository is public, so please read the privacy notes below before writing anything in an issue or pull request.

## How work happens

1. Every change starts as a GitHub Issue with acceptance criteria. If you have an idea but not criteria yet, open the issue anyway and say so.
2. A maintainer labels issues `agent-ready` when they are clear enough for an AI agent to pick up. Humans can pick up any open issue.
3. One issue per pull request. Keep pull requests under about 400 changed lines, excluding content and lockfiles.
4. Every pull request needs green CI and at least one human approval, including content-only changes.

## Before you open a pull request

- Read the rules in [`docs/SPEC.md`](docs/SPEC.md) section 4. They are short and they apply to everything.
- Run type checks, lint, format and tests locally.
- Fill in the pull request template, including screenshots at mobile and desktop widths in light and dark themes.
- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

## Decisions

Architectural changes, new runtime dependencies, server code, motion budget exceptions and any exception to the spec's rules need a decision record in `docs/decisions/`, added in the same pull request. Copy `0000-template.md`.

## Areas that need human approval

Anyone (including an AI agent) may draft these, but a human maintainer must approve: the brand layer, privacy text, funding wording, board bios, and any statement of the organization's position.

## Using AI tools

You can use whichever AI tool you like. All agent instructions live in [`AGENTS.md`](AGENTS.md). If your tool needs its own config file, make it point to `AGENTS.md` instead of duplicating rules.

## Privacy in a public repo

- Never commit secrets, API tokens, personal email addresses or phone numbers.
- Never include anything about students, applicants or grant recipients in code, content, issues or pull requests.
- Assume everything you write here is public and permanent.

## Writing style for site copy

Plain language, no marketing language, Canadian spelling. Critique ideas, not people. If you do not know a fact, write `[TK: what is needed]` instead of guessing.
