// Turns the projected (BC Albers) layers in data/map/ into SVG path strings that
// share one viewBox, and writes data/map/bc-map.json for components to read.
// Usage: node tools/map/build-svg.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../../data/map/', import.meta.url);
function read(file) {
  const j = JSON.parse(readFileSync(new URL(file, dir), 'utf8'));
  // mapshaper writes attribute-free layers as a GeometryCollection.
  return j.type === 'GeometryCollection'
    ? { features: j.geometries.map((g) => ({ geometry: g, properties: {} })) }
    : j;
}

function walk(g, fn) {
  const c = g.coordinates;
  if (g.type === 'Point') fn([c]);
  else if (g.type === 'LineString') fn(c);
  else if (g.type === 'MultiLineString' || g.type === 'Polygon') c.forEach(fn);
  else if (g.type === 'MultiPolygon') c.forEach((poly) => poly.forEach(fn));
}

// The viewBox is BC's bounding box plus 4% padding, 1000 units wide.
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;
for (const f of read('bc.json').features) {
  walk(f.geometry, (ring) => {
    for (const [x, y] of ring) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  });
}
const pad = (maxX - minX) * 0.04;
minX -= pad;
maxX += pad;
minY -= pad;
maxY += pad;
const W = 1000;
const scale = W / (maxX - minX);
const H = Math.round((maxY - minY) * scale);
const X = (x) => Math.round((x - minX) * scale * 10) / 10;
const Y = (y) => Math.round((maxY - y) * scale * 10) / 10;

function ringD(ring, close) {
  let out = '';
  let px;
  let py;
  ring.forEach(([x, y], i) => {
    const a = X(x);
    const b = Y(y);
    if (i && a === px && b === py) return;
    out += (i ? 'L' : 'M') + a + ' ' + b;
    px = a;
    py = b;
  });
  return out + (close ? 'Z' : '');
}
function geomD(g) {
  const close = g.type === 'Polygon' || g.type === 'MultiPolygon';
  let d = '';
  walk(g, (ring) => (d += ringD(ring, close)));
  return d;
}
const layerD = (file) =>
  read(file)
    .features.filter((f) => f.geometry)
    .map((f) => geomD(f.geometry))
    .join('');
const point = (f) => [
  X(f.geometry.coordinates[0]),
  Y(f.geometry.coordinates[1]),
];

const roads = read('roads.json').features.filter((f) => f.geometry);
const roadsOf = (test) =>
  roads
    .filter((f) => test(f.properties.type))
    .map((f) => geomD(f.geometry))
    .join('');

const schools = { public: [], independent: [] };
for (const f of read('schools.json').features) {
  if (!f.geometry) continue;
  const [x, y] = point(f);
  const kind =
    f.properties.SCHOOL_CATEGORY === 'Independent School'
      ? 'independent'
      : 'public';
  schools[kind].push([Math.round(x), Math.round(y)]);
}

const profile = read('profile.json');
const map = {
  viewBox: [W, H],
  kmPerUnit: Math.round((1 / scale / 1000) * 1000) / 1000,
  bc: layerD('bc.json'),
  neighbours: layerD('neighbours.json'),
  highways: roadsOf((t) => t === 'Major Highway'),
  roads: roadsOf((t) => t === 'Secondary Highway'),
  ferries: roadsOf((t) => /Ferry/.test(t)),
  rivers: layerD('rivers.json'),
  lakes: layerD('lakes.json'),
  districtLines: layerD('district_lines.json'),
  districts: read('districts.json')
    .features.filter((f) => f.geometry)
    .map((f) => ({
      number: f.properties.SCHOOL_DISTRICT_NUMBER,
      name: f.properties.SCHOOL_DISTRICT_NAME,
      d: geomD(f.geometry),
      label: [X(f.properties.cx), Y(f.properties.cy)],
    }))
    .sort((a, b) => a.number - b.number),
  places: read('places.json').features.map((f) => ({
    name: f.properties.name,
    rank: f.properties.scalerank,
    at: point(f),
  })),
  waypoints: read('waypoints.json').features.map((f) => ({
    name: f.properties.name,
    at: point(f),
  })),
  schools,
  profile: {
    totalKm: profile.totalKm,
    marks: profile.marks,
    km: profile.pts.map((p) => p[0]),
    elevation: profile.pts.map((p) => p[1]),
  },
};

const json = JSON.stringify(map);
writeFileSync(new URL('bc-map.json', dir), json);
console.log(`viewBox ${W}x${H}, ${Math.round(json.length / 1024)} KB`);
