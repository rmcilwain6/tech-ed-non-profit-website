// Samples real elevations along the coast-to-Rockies line in waypoints.geojson,
// using the Open-Meteo elevation API (Copernicus DEM, 90 m).
// Writes data/map/profile.json. Usage: node tools/map/elevation.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const OUT = new URL('../../data/map/profile.json', import.meta.url);
const STEP_KM = 1.5;
const waypoints = JSON.parse(
  readFileSync(new URL('waypoints.geojson', import.meta.url), 'utf8'),
).features.map((f) => ({
  name: f.properties.name,
  lon: f.geometry.coordinates[0],
  lat: f.geometry.coordinates[1],
}));

const rad = Math.PI / 180;
function distanceKm(a, b) {
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

const points = [];
const marks = [{ name: waypoints[0].name, km: 0 }];
let total = 0;
for (let i = 0; i < waypoints.length - 1; i++) {
  const a = waypoints[i];
  const b = waypoints[i + 1];
  const d = distanceKm(a, b);
  const n = Math.max(4, Math.round(d / STEP_KM));
  for (let k = i === 0 ? 0 : 1; k <= n; k++) {
    const t = k / n;
    points.push({
      lat: a.lat + (b.lat - a.lat) * t,
      lon: a.lon + (b.lon - a.lon) * t,
      km: total + d * t,
    });
  }
  total += d;
  marks.push({ name: b.name, km: total });
}

// The API takes up to 100 coordinates per request.
for (let i = 0; i < points.length; i += 100) {
  const chunk = points.slice(i, i + 100);
  const lat = chunk.map((p) => p.lat.toFixed(4)).join(',');
  const lon = chunk.map((p) => p.lon.toFixed(4)).join(',');
  const res = await fetch(
    `https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`,
  );
  if (!res.ok) throw new Error(`Open-Meteo returned ${res.status}`);
  const { elevation } = await res.json();
  elevation.forEach((e, k) => (chunk[k].e = Math.max(0, Math.round(e))));
  await new Promise((r) => setTimeout(r, 300));
}

writeFileSync(
  OUT,
  JSON.stringify({
    totalKm: Math.round(total),
    marks: marks.map((m) => ({ ...m, km: Math.round(m.km) })),
    pts: points.map((p) => [Math.round(p.km * 10) / 10, p.e]),
  }),
);
console.log(`${points.length} points over ${Math.round(total)} km`);
