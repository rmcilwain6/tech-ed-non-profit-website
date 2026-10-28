# BC map data

Open data for the site's map of British Columbia, projected to BC Albers (EPSG:3005) and simplified for the web. The site draws its maps from this data at build time. There are no map tiles and no map service, so showing a map sends no requests to anyone.

Rebuild everything with `bash tools/map/build-map.sh`. To rebuild only `bc-map.json` from the files here, run `node tools/map/build-svg.mjs`.

## Files

| File                        | What it holds                                                                    |
| --------------------------- | -------------------------------------------------------------------------------- |
| `bc-map.json`               | Every layer as SVG path data in one 1000-unit-wide viewBox. Components read this |
| `bc.json`, `bc_full.json`   | Province outline: simplified for drawing, full detail for clipping               |
| `neighbours.json`           | Neighbouring provinces and states, for context                                   |
| `roads.json`                | Major and secondary highways, ferry routes                                       |
| `rivers.json`, `lakes.json` | Major rivers and lakes                                                           |
| `districts.json`            | 59 school district boundaries, with a label point for each                       |
| `district_lines.json`       | Shared district boundaries, drawn once                                           |
| `schools.json`              | Standard public and independent K–12 schools (locations and category only)       |
| `places.json`               | Towns and cities                                                                 |
| `waypoints.json`            | Stops on the Victoria to Kicking Horse Pass line                                 |
| `profile.json`              | Elevation every 1.5 km along that line                                           |

## Sources and licences

These need credit wherever the map appears (for example, in the page receipt or footer).

- **Natural Earth** (public domain): province outlines, roads and ferries, rivers, lakes, places. https://www.naturalearthdata.com
- **DataBC** (Open Government Licence – British Columbia): school district boundaries (`WHSE_TANTALIS.TA_SCHOOL_DISTRICTS_SVW`) and K–12 schools (`WHSE_IMAGERY_AND_BASE_MAPS.GSR_SCHOOLS_K_TO_12_SVW`). Contains information licensed under the Open Government Licence – British Columbia. https://www2.gov.bc.ca/gov/content/data/open-data/open-government-licence-bc
- **Copernicus DEM** via the Open-Meteo elevation API: elevation profile. © DLR e.V. 2010–2014 and © Airbus Defence and Space GmbH 2014–2018, provided under COPERNICUS by the European Union and ESA. https://open-meteo.com

## Not included

- **First Nations schools** are not in the DataBC schools layer, and they are not added here on purpose. Any map of First Nations schools or communities comes out of guidance from and partnership with First Nations education partners (SPEC R6), not out of a dataset.
- **Board member locations** are not stored here. They are content, added only with each member's agreement.
