# Website

Public website for a BC technology education nonprofit. The organization name and brand are not final yet, so the site runs on a deliberately plain placeholder brand until then.

Built with [Astro](https://astro.build), deployed as static files to Cloudflare. No cookies, no tracking, no personal information collected.

## Start here

- [`docs/SPEC.md`](docs/SPEC.md): what we are building, the rules, and the open decisions
- [`AGENTS.md`](AGENTS.md): instructions for AI agents (and a useful summary for humans)
- [`docs/decisions/`](docs/decisions/): decisions and why we made them
- [`CONTRIBUTING.md`](CONTRIBUTING.md): how to propose and review changes

## Local development

Requires Node.js (current LTS).

```sh
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the build locally
```

## Licence

Code is released under the [MIT licence](LICENSE). Written content in `content/` and `docs/` is released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Photography is not covered by either licence unless stated alongside the image.
