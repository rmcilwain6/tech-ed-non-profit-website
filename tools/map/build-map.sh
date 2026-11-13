#!/usr/bin/env bash
# Rebuilds data/map/ from open data. Development only: nothing here ships to visitors.
# Needs network access, Node, and about 150 MB of free space for the downloads.
# Usage: bash tools/map/build-map.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$ROOT/data/map"
RAW="$(mktemp -d)"
trap 'rm -rf "$RAW"' EXIT
M="npx --yes mapshaper@0.6.102"

# BC Albers (EPSG:3005), the projection used by the BC government.
P="+proj=aea +lat_0=45 +lon_0=-126 +lat_1=50 +lat_2=58.5 +x_0=1000000 +y_0=0 +datum=NAD83 +units=m +no_defs"
NE="https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson"
WFS="https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=2.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&typeName="
NEIGHBOURS='["Alberta","Yukon","Northwest Territories","Washington","Idaho","Montana","Alaska","Oregon"]'

cd "$RAW"
for f in ne_10m_admin_1_states_provinces ne_10m_roads ne_10m_populated_places_simple ne_10m_rivers_lake_centerlines ne_10m_lakes; do
  curl -fsSL -o "$f.geojson" "$NE/$f.geojson"
done
curl -fsSL -o districts.geojson "${WFS}pub:WHSE_TANTALIS.TA_SCHOOL_DISTRICTS_SVW"
curl -fsSL -o schools.geojson "${WFS}pub:WHSE_IMAGERY_AND_BASE_MAPS.GSR_SCHOOLS_K_TO_12_SVW"

# Province outline: full detail for clipping, simplified for drawing.
$M ne_10m_admin_1_states_provinces.geojson -filter 'name=="British Columbia"' -filter-fields name -proj "$P" \
  -o "$OUT/bc_full.json" format=geojson
$M "$OUT/bc_full.json" -simplify interval=700 keep-shapes -filter-islands min-area=25000000 remove-empty \
  -o "$OUT/bc.json" format=geojson precision=1
$M ne_10m_admin_1_states_provinces.geojson -filter "$NEIGHBOURS.indexOf(name)>-1" -filter-fields name \
  -clip bbox=-145,44,-105,63 -proj "$P" -clip bbox=-150000,150000,2150000,1900000 \
  -simplify interval=3000 -filter-islands min-area=200000000 -o "$OUT/neighbours.json" format=geojson precision=1

# Lines and water, clipped to BC.
$M ne_10m_roads.geojson -filter 'continent=="North America"' -clip bbox=-140,48,-114,60.1 -proj "$P" \
  -clip "$OUT/bc_full.json" -filter-fields featurecla,type,name,scalerank -simplify interval=1500 \
  -o "$OUT/roads.json" format=geojson precision=1
$M ne_10m_rivers_lake_centerlines.geojson -clip bbox=-140,48,-114,60.1 -proj "$P" -clip "$OUT/bc_full.json" \
  -filter-fields name,scalerank,featurecla -simplify interval=1500 -o "$OUT/rivers.json" format=geojson precision=1
$M ne_10m_lakes.geojson -clip bbox=-140,48,-114,60.1 -proj "$P" -clip "$OUT/bc_full.json" -filter-fields name,scalerank \
  -simplify interval=1500 -filter-islands min-area=150000000 remove-empty -o "$OUT/lakes.json" format=geojson precision=1

# School districts (polygons with label points, plus shared boundaries) and schools.
$M districts.geojson -proj "$P" -clip "$OUT/bc_full.json" -filter-fields SCHOOL_DISTRICT_NAME,SCHOOL_DISTRICT_NUMBER \
  -simplify interval=1800 keep-shapes -filter-islands min-area=30000000 remove-empty -each 'cx=this.innerX, cy=this.innerY' \
  -o "$OUT/districts.json" format=geojson precision=1
$M districts.geojson -proj "$P" -clip "$OUT/bc_full.json" -simplify interval=1800 -innerlines \
  -o "$OUT/district_lines.json" format=geojson precision=1
$M schools.geojson -filter 'FACILITY_TYPE=="Standard School"' -filter-fields SCHOOL_CATEGORY -proj "$P" \
  -o "$OUT/schools.json" format=geojson precision=1

# Places and the coast-to-Rockies line.
$M ne_10m_populated_places_simple.geojson -filter 'adm1name=="British Columbia"' -filter-fields name,pop_max,scalerank \
  -proj "$P" -o "$OUT/places.json" format=geojson precision=1
$M "$ROOT/tools/map/waypoints.geojson" -proj "$P" -o "$OUT/waypoints.json" format=geojson precision=1

node "$ROOT/tools/map/elevation.mjs"
node "$ROOT/tools/map/build-svg.mjs"
