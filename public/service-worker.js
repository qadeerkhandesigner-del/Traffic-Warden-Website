/* ============================================================================
 * Traffic Police Abbottabad — Service Worker
 * ============================================================================
 *
 * Purpose: make the tourist tracking page and its Abbottabad/Galiyat maps
 * work with NO internet connection.
 *
 * What it caches:
 *   1. Map tiles (tile.openstreetmap.org)  → "tpa-tiles-v1"  (cache-first)
 *   2. The app shell (index.html + hashed assets + Leaflet CSS)
 *      and the district boundary GeoJSON      → "tpa-shell-v1"
 *
 * What it NEVER caches:
 *   - Supabase API calls (all non-GET requests and cross-origin non-tile
 *     traffic go straight to the network) — tracking data must never be
 *     served from a stale copy.
 *
 * NOTE: `TILE_CACHE` / `SHELL_CACHE` version strings must stay in sync with
 * `offlineMapService.ts` (TILE_CACHE_NAME / SHELL_CACHE_NAME).
 * ============================================================================
 */

const TILE_CACHE = 'tpa-tiles-v1';
const SHELL_CACHE = 'tpa-shell-v1';
const TILE_HOSTS = new Set(['tile.openstreetmap.org']);

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      /* Drop caches from older deployments. */
      const names = await caches.keys();
      const keep = new Set([TILE_CACHE, SHELL_CACHE]);
      await Promise.all(
        names
          .filter((name) => name.startsWith('tpa-') && !keep.has(name))
          .map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  /* Only reads are ever served from cache. Mutations always hit the network. */
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  /* 1) Map tiles → cache-first so the map keeps drawing offline. */
  if (TILE_HOSTS.has(url.hostname)) {
    event.respondWith(cacheFirst(request, TILE_CACHE));
    return;
  }

  /* 2) Everything else cross-origin (Supabase REST, etc.) → network only. */
  if (url.origin !== self.location.origin) return;

  /* 3) Page navigations (the SPA shell) → network-first, offline fallback. */
  if (request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(navigationFirst(request));
    return;
  }

  /* 4) District boundary / GeoJSON data → freshness matters online, but the
        offline cache must have the last good copy. */
  if (url.pathname.includes('/data/')) {
    event.respondWith(networkFirst(request, SHELL_CACHE));
    return;
  }

  /* 5) Hashed build assets (JS/CSS/images/fonts) → cache-first; they are
        immutable per deployment so a cached copy is always correct. */
  event.respondWith(cacheFirst(request, SHELL_CACHE));
});

/* -------------------------------------------------------------------------- */

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request, { ignoreVary: true });
  if (hit) return hit;

  try {
    /* Tiles usually arrive as <img> requests (no-cors → opaque responses).
       Re-fetching with `mode: 'cors'` gets a normal, storable response
       (OSM tiles are served with full CORS headers). */
    const isTile = TILE_HOSTS.has(new URL(request.url).hostname);
    const response = await fetch(
      isTile
        ? new Request(request.url, { method: 'GET', mode: 'cors', credentials: 'omit' })
        : request
    );
    if (response && (response.ok || response.type === 'opaque')) {
      await cache.put(request.url, response.clone());
    }
    return response;
  } catch (error) {
    return offlineResponse();
  }
}

async function navigationFirst(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      /* Keep the newest shell under one stable key so every route can be
         re-served offline (the SPA fallback serves index.html everywhere). */
      await cache.put('index.html', response.clone());
    }
    return response;
  } catch (error) {
    return (
      (await cache.match('index.html', { ignoreVary: true })) ||
      (await cache.match(request, { ignoreVary: true })) ||
      offlineResponse()
    );
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      await cache.put(request.url, response.clone());
    }
    return response;
  } catch (error) {
    const hit = await cache.match(request.url, { ignoreVary: true });
    return hit || offlineResponse();
  }
}

function offlineResponse() {
  return new Response('', {
    status: 504,
    statusText: 'Offline',
    headers: { 'Content-Type': 'text/plain' },
  });
}
