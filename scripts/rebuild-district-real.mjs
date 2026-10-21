/* One-off: rebuild public/data/abbottabad-district.geojson from the REAL
   OpenStreetMap district boundary (relation 16544561, i.e. the dotted line
   rendered on the tiles). Run: node scripts/rebuild-district-real.mjs       */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const nomPath = join(tmpdir(), 'nom-abb-full.json');
if (!existsSync(nomPath)) {
  console.error('Missing', nomPath, '- download Nominatim search first.');
  process.exit(1);
}
const nom = JSON.parse(readFileSync(nomPath, 'utf8'));
const district = nom.find(
  (r) => r.osm_type === 'relation' && r.geojson && r.geojson.type === 'Polygon'
);
if (!district) {
  console.error('No polygon relation found in Nominatim result.');
  process.exit(1);
}
const ring = district.geojson.coordinates[0];

/* Sanity report */
let minLat = 99, maxLat = -99, minLon = 999, maxLon = -999;
for (const [lon, lat] of ring) {
  minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat);
  minLon = Math.min(minLon, lon); maxLon = Math.max(maxLon, lon);
}
console.log('relation', district.osm_id, '- ring points:', ring.length);
console.log('bbox lon:', minLon.toFixed(5), '→', maxLon.toFixed(5), ' lat:', minLat.toFixed(5), '→', maxLat.toFixed(5));

/* Anchor checks so we KNOW the real line covers the shared expectations. */
const anchorChecks = [
  ['Lora',        [73.28243, 33.88995]],
  ['Barrian',     [73.38892, 33.96535]],
  ['Birote',      [73.49292, 34.04452]],
  ['Nathia Gali', [73.41140, 34.38760]],
];
function pointInRing(lon, lat, r) {
  let inside = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i], [xj, yj] = r[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
for (const [name, [lon, lat]] of anchorChecks) {
  console.log(`${name} inside real boundary: ${pointInRing(lon, lat, ring)}`);
}

const out = {
  type: 'Feature',
  properties: {
    shapeName: 'Abbottabad',
    shapeID: 'OSM-16544561',
    source: 'OpenStreetMap administrative relation 16544561 (district Abbottabad, Hazara Division) - the same boundary rendered as the dotted line on the live tiles',
    license: 'ODbL',
    sourceURL: 'https://www.openstreetmap.org/relation/16544561',
    retrieved: '2026-10',
    boundaryNote: 'Authentic district boundary of Abbottabad (the dotted line on the OSM tiles). Retrieved live via Nominatim polygon_geojson; replaces all earlier hand-adjusted display outlines (v4-v12).',
  },
  geometry: { type: 'Polygon', coordinates: [ring] },
};

writeFileSync('public/data/abbottabad-district.geojson', JSON.stringify(out));
console.log('written public/data/abbottabad-district.geojson');
