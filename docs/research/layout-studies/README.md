# Layout studies

Throwaway prototypes used to choose the site's base layout, October 2026. They are reference material, not site code. Feedback on each round is in the team's brand exploration log.

- `round-1.html`: Transect, Field Notes and Trailhead. Opens directly in a browser.
- `round-2.src.html`: Atlas, Story Map and Network, built on the BC map. The `/*__GEO__*/` marker is where the map data was injected as `const GEO = …` when it was published. The data now lives in `data/map/`, in a slightly different shape (see `tools/map/build-svg.mjs`).

Both pages load fonts from Google Fonts. That breaks SPEC rule 3 and is fine only because these are prototypes; the site self-hosts its fonts.
