/**
 * Offline map support (service worker + Cache Storage)
 * ====================================================
 *
 * The tracking page's Leaflet map draws OpenStreetMap tiles fetched from the
 * internet. When the tourist loses connectivity the GPS keeps recording (the
 * offline queue handles that) but the map itself renders grey unless the
 * tiles for Abbottabad City + the Galiyat corridor are already saved on the
 * device.
 *
 * This service:
 *   • computes the exact tile set for those two areas at the chosen zoom
 *     depth (the tile count is small enough to stay well inside the OSM tile
 *     usage policy: a one-time, user-triggered download of a small region),
 *   • fetches every tile with gentle concurrency and stores it in the same
 *     Cache Storage bucket the service worker serves tiles from
 *     (`tpa-tiles-v1`), so offline they simply resolve from cache,
 *   • reports progress, supports cancel + resume, and can delete everything.
 *
 * The cache name MUST stay in sync with `public/service-worker.js`.
 */

/** Same string as `TILE_CACHE` in public/service-worker.js. */
const TILE_CACHE_NAME = 'tpa-tiles-v1';

const OSM_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

/* -------------------------------------------------------------------------- */
/*                              area definitions                              */
/* -------------------------------------------------------------------------- */

export interface OfflineMapArea {
  id: 'abbottabad-city' | 'galiyat-corridor';
  labelEn: string;
  labelUrdu: string;
  /** west, south, east, north */
  bounds: [number, number, number, number];
}

export const OFFLINE_MAP_AREAS: OfflineMapArea[] = [
  {
    id: 'abbottabad-city',
    labelEn: 'Abbottabad City',
    labelUrdu: 'ایبٹ آباد شہر',
    bounds: [73.13, 34.08, 73.32, 34.27],
  },
  {
    id: 'galiyat-corridor',
    labelEn: 'Galiyat (Nathia Gali / Thandiani axis)',
    labelUrdu: 'گلیات (نٹھیا گالی / ٹھنڈیا نی)',
    bounds: [73.3, 33.95, 73.55, 34.15],
  },
];

export type OfflineMapDepth = 'basic' | 'detailed';

const DEPTH_ZOOMS: Record<OfflineMapDepth, number[]> = {
  /** Overview + district roads —-light download. */
  basic: [12, 13, 14],
  /** Adds street-level zoom 15 for both areas — comfortable walking detail. */
  detailed: [12, 13, 14, 15],
};

/* -------------------------------------------------------------------------- */
/*                                 tile maths                                 */
/* -------------------------------------------------------------------------- */

function lonToTileX(lon: number, zoom: number): number {
  return ((lon + 180) / 360) * 2 ** zoom;
}

function latToTileY(lat: number, zoom: number): number {
  const rad = (lat * Math.PI) / 180;
  return ((1 - Math.asinh(Math.tan(rad)) / Math.PI) / 2) * 2 ** zoom;
}

export function tileUrl(z: number, x: number, y: number): string {
  return OSM_TILE_URL.replace('{z}', String(z)).replace('{x}', String(x)).replace('{y}', String(y));
}

/** Every tile that must exist for the given depth, de-duplicated. */
export function offlineTileUrls(depth: OfflineMapDepth): string[] {
  const zooms = DEPTH_ZOOMS[depth];
  const seen = new Set<string>();
  for (const area of OFFLINE_MAP_AREAS) {
    const [west, south, east, north] = area.bounds;
    for (const zoom of zooms) {
      const x0 = Math.floor(lonToTileX(west, zoom));
      const x1 = Math.floor(lonToTileX(east, zoom));
      const y0 = Math.max(0, Math.floor(latToTileY(north, zoom)));
      const y1 = Math.floor(latToTileY(south, zoom));
      for (let x = x0; x <= x1; x += 1) {
        for (let y = y0; y <= y1; y += 1) {
          seen.add(tileUrl(zoom, x, y));
        }
      }
    }
  }
  return Array.from(seen);
}

/* Rough OSM tile weight; used only for the size estimate shown in the UI. */
const AVG_TILE_BYTES = 18 * 1024;

export function estimateOfflineMapSize(depth: OfflineMapDepth) {
  const urls = offlineTileUrls(depth);
  return {
    tiles: urls.length,
    bytes: urls.length * AVG_TILE_BYTES,
  };
}

/* -------------------------------------------------------------------------- */
/*                              download engine                               */
/* -------------------------------------------------------------------------- */

export type DownloadStatus = 'complete' | 'partial' | 'aborted';

export interface OfflineMapProgress {
  total: number;
  done: number;
  /** Bytes actually fetched this session (already-cached tiles cost nothing). */
  bytes: number;
  failed: number;
}

export interface OfflineMapDownloadResult {
  status: DownloadStatus;
  failed: number;
}

const DOWNLOAD_CONCURRENCY = 5;
const PROGRESS_MIN_INTERVAL_MS = 120;

function tileCache(): Promise<Cache> {
  if (!('caches' in window)) return Promise.reject(new Error('CACHE_UNAVAILABLE'));
  return caches.open(TILE_CACHE_NAME);
}

/** Persistent storage stops the browser evicting the map under pressure. */
async function requestPersistentStorage(): Promise<void> {
  try {
    if (navigator.storage?.persist) {
      await navigator.storage.persist();
    }
  } catch {
    /* Best effort only. */
  }
}

export async function downloadOfflineMap(
  depth: OfflineMapDepth,
  options: {
    onProgress?: (progress: OfflineMapProgress) => void;
    signal?: AbortSignal;
  } = {}
): Promise<OfflineMapDownloadResult> {
  const urls = offlineTileUrls(depth);
  const total = urls.length;
  const cache = await tileCache();
  await requestPersistentStorage();

  let cursor = 0;
  let done = 0;
  let bytes = 0;
  let failed = 0;
  let lastReport = 0;

  const signal = options.signal;

  const report = (force = false) => {
    const now = Date.now();
    if (!force && now - lastReport < PROGRESS_MIN_INTERVAL_MS) return;
    lastReport = now;
    options.onProgress?.({ total, done, bytes, failed });
  };

  const fetchOne = async (url: string): Promise<void> => {
    const hit = await cache.match(url, { ignoreVary: true });
    done += 1; // already stored → counts as done, costs no traffic
    if (hit) {
      report();
      return;
    }
    signal?.throwIfAborted();
    const response = await fetch(url, { mode: 'cors', credentials: 'omit', signal });
    if (!response.ok) throw new Error(`TILE_HTTP_${response.status}`);
    const clone = response.clone();
    const blob = await response.blob();
    bytes += blob.size;
    await cache.put(url, clone);
    report();
  };

  const worker = async (): Promise<void> => {
    for (;;) {
      if (signal?.aborted) throw new DOMException('The download was cancelled.', 'AbortError');
      const index = cursor;
      cursor += 1;
      if (index >= urls.length) return;
      try {
        await fetchOne(urls[index]);
      } catch (error) {
        if (signal?.aborted || (error instanceof DOMException && error.name === 'AbortError')) {
          throw error;
        }
        failed += 1;
        report(true);
      }
    }
  };

  try {
    await Promise.all(
      Array.from({ length: Math.min(DOWNLOAD_CONCURRENCY, total) }, () => worker())
    );
    report(true);
    return { status: failed > 0 ? 'partial' : 'complete', failed };
  } catch (error) {
    if (signal?.aborted || (error instanceof DOMException && error.name === 'AbortError')) {
      report(true);
      return { status: 'aborted', failed };
    }
    throw error;
  }
}

export async function deleteOfflineMap(): Promise<void> {
  if (!('caches' in window)) return;
  await caches.delete(TILE_CACHE_NAME);
}

/* -------------------------------------------------------------------------- */
/*                                   status                                   */
/* -------------------------------------------------------------------------- */

export interface OfflineMapStatus {
  /** Tiles required for the chosen depth. */
  expected: number;
  /** How many of those are actually on the device right now. */
  cached: number;
  /** Total storage used by the page (approximate, when the API cooperates). */
  storageBytes: number | null;
  /** True when every required tile exists. */
  ready: boolean;
}

export async function getOfflineMapStatus(depth: OfflineMapDepth): Promise<OfflineMapStatus> {
  const expected = offlineTileUrls(depth);
  let cached = 0;
  let storageBytes: number | null = null;

  if ('caches' in window) {
    const cache = await caches.open(TILE_CACHE_NAME);
    /* One pass over stored keys (fast) instead of one match() per tile. */
    const stored = new Set<string>();
    await cache.keys().then((keys) => {
      keys.forEach((request) => {
        if (request.url.includes('tile.openstreetmap.org')) stored.add(request.url);
      });
    });
    expected.forEach((url) => {
      if (stored.has(url)) cached += 1;
    });
  }

  try {
    const estimate = await navigator.storage?.estimate?.();
    if (estimate?.usage != null) storageBytes = estimate.usage;
  } catch {
    /* Ignore. */
  }

  return {
    expected: expected.length,
    cached,
    storageBytes,
    ready: expected.length > 0 && cached >= expected.length,
  };
}

/* -------------------------------------------------------------------------- */
/*                                availability                                */
/* -------------------------------------------------------------------------- */

export function isOfflineMapAvailable(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.isSecureContext &&
    'serviceWorker' in navigator &&
    'caches' in window
  );
}

export function isServiceWorkerRegistered(): boolean {
  return Boolean(navigator.serviceWorker?.controller);
}
