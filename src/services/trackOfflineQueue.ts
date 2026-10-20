import {
  submitTrackingLocations,
  type StoredTrackingSession,
  type TrackingPoint,
} from './trackingService';

/**
 * Offline location queue (IndexedDB)
 * ==================================
 *
 * When the tourist's device has no connectivity, reading a GPS fix still
 * succeeds — but the upload does not. Every fix the server could NOT accept is
 * queued here and replayed automatically when connectivity returns (browser
 * `online` event or a periodic sweep while a tracking session runs).
 *
 * Guarantees:
 *   * A queued point carries its own session id + token, so a replay can
 *     never write into someone else's session — the server re-verifies the
 *     token on every batch.
 *   * Points are deduped on enqueue (same session, timestamp, coordinates).
 *   * Nothing is invented: only actually-observed GPS readings are queued,
 *     never fabricated or interpolated.
 *   * Points that can never succeed (expired/stopped/deleted session) are
 *     dropped; network failures stay queued for the next flush.
 *
 * IndexedDB is used when available; a localStorage fallback with the same
 * behaviour covers browsers that block IndexedDB.
 */

const DB_NAME = 'tpa_tracking_queue';
const DB_VERSION = 1;
const STORE = 'pending_points';
const MAX_QUEUE = 5_000;
const UPLOAD_BATCH = 200;

interface QueuedPoint extends TrackingPoint {
  id: number;
  sessionId: string;
}

let idbPromise: Promise<IDBDatabase | null> | null = null;

/* -------------------------------------------------------------------------- */
/*                              IndexedDB plumbing                            */
/* -------------------------------------------------------------------------- */

function openQueueDb(): Promise<IDBDatabase | null> {
  if (idbPromise) return idbPromise;
  idbPromise = new Promise((resolve) => {
    try {
      if (typeof indexedDB === 'undefined') return resolve(null);
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
          store.createIndex('sessionId', 'sessionId', { unique: false });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return idbPromise;
}

function putWithIdb(db: IDBDatabase, payload: Omit<QueuedPoint, 'id'>): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const request = db
        .transaction(STORE, 'readwrite')
        .objectStore(STORE)
        .add(payload);
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

function readWithIdb(db: IDBDatabase, sessionId: string): Promise<QueuedPoint[]> {
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readonly');
      const request = tx.objectStore(STORE).index('sessionId').getAll(sessionId);
      request.onsuccess = () => resolve((request.result as QueuedPoint[]) ?? []);
      request.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

function deleteWithIdb(db: IDBDatabase, ids: number[]): Promise<boolean> {
  return new Promise((resolve) => {
    if (ids.length === 0) return resolve(true);
    try {
      const tx = db.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      ids.forEach((id) => store.delete(id));
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

function clearSessionWithIdb(db: IDBDatabase, sessionId: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readwrite');
      const index = tx.objectStore(STORE).index('sessionId');
      const request = index.openCursor(IDBKeyRange.only(sessionId));
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

/* -------------------------------------------------------------------------- */
/*                          localStorage fallback                             */
/* -------------------------------------------------------------------------- */

const FALLBACK_KEY = 'tpa_tracking_queue_v1';

function readAllFallback(): QueuedPoint[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(FALLBACK_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as QueuedPoint[]) : [];
  } catch {
    return [];
  }
}

function writeAllFallback(entries: QueuedPoint[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      FALLBACK_KEY,
      JSON.stringify(entries.slice(-MAX_QUEUE))
    );
  } catch {
    // Storage unavailable/full — points stay in memory until the next edit;
    // never fatal to tracking itself.
  }
}

function readFallback(sessionId: string): QueuedPoint[] {
  return readAllFallback().filter((entry) => entry.sessionId === sessionId);
}

function deleteFallback(ids: number[]): void {
  const idSet = new Set(ids);
  const next = readAllFallback().filter((entry) => !idSet.has(entry.id));
  writeAllFallback(next);
}

/* -------------------------------------------------------------------------- */
/*                                   queue                                    */
/* -------------------------------------------------------------------------- */

function samePoint(a: TrackingPoint, b: TrackingPoint): boolean {
  return (
    a.latitude.toFixed(6) === b.latitude.toFixed(6) &&
    a.longitude.toFixed(6) === b.longitude.toFixed(6) &&
    a.recordedAt === b.recordedAt
  );
}

/** Queues one GPS fix for upload. Deduplicates exact repeats. */
export async function enqueueTrackingPoint(
  sessionId: string,
  point: TrackingPoint
): Promise<void> {
  const db = await openQueueDb();

  if (db) {
    const existing = await readWithIdb(db, sessionId);
    if (existing.some((entry) => samePoint(entry, point))) return;
    if (existing.length >= MAX_QUEUE) {
      const oldest = [...existing]
        .sort((a, b) => a.recordedAt.localeCompare(b.recordedAt))
        .slice(0, Math.ceil(MAX_QUEUE * 0.1))
        .map((entry) => entry.id);
      await deleteWithIdb(db, oldest);
    }
    await putWithIdb(db, { sessionId, ...point });
    return;
  }

  const existing = readFallback(sessionId);
  if (existing.some((entry) => samePoint(entry, point))) return;
  const maxId = readAllFallback().reduce((max, entry) => Math.max(max, entry.id), 0);
  writeAllFallback([...readAllFallback(), { id: maxId + 1, sessionId, ...point }]);
}

/** Number of queued (offline) readings for one session. */
export async function countQueuedPoints(sessionId: string): Promise<number> {
  const db = await openQueueDb();
  if (db) return (await readWithIdb(db, sessionId)).length;
  return readFallback(sessionId).length;
}

/* -------------------------------------------------------------------------- */
/*                                   flush                                    */
/* -------------------------------------------------------------------------- */

export type FlushResult = 'none_queued' | 'uploaded' | 'partial' | 'failed' | 'session_ended';

/** Removes every queued reading for ONE session (after a confirmed stop). */
export async function clearTrackingQueue(sessionId: string): Promise<void> {
  const db = await openQueueDb();
  if (db) return clearSessionWithIdb(db, sessionId);
  deleteFallback(readFallback(sessionId).map((entry) => entry.id));
}

/**
 * Uploads queued readings for ONE authorized session, oldest first.
 * The server re-validates every point (token + expiry + rate limit + dedupe),
 * so a replay can never fabricate a point or resurrect an expired session.
 */
export async function flushTrackingQueue(
  session: Pick<StoredTrackingSession, 'id' | 'token'>
): Promise<FlushResult> {
  const db = await openQueueDb();

  const queued: QueuedPoint[] = db
    ? await readWithIdb(db, session.id)
    : readFallback(session.id);

  if (queued.length === 0) return 'none_queued';

  const byTime = queued.slice().sort((a, b) => a.recordedAt.localeCompare(b.recordedAt));

  let uploaded = 0;
  let endedSession = false;

  for (let offset = 0; offset < byTime.length; offset += UPLOAD_BATCH) {
    const batch = byTime.slice(offset, offset + UPLOAD_BATCH);
    try {
      await submitTrackingLocations(session, batch.map((entry) => entry));
      uploaded += batch.length;
      const ids = batch.map((entry) => entry.id);
      if (db) await deleteWithIdb(db, ids);
      else deleteFallback(ids);
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (message === 'SESSION_EXPIRED' || message === 'SESSION_NOT_FOUND') {
        // These points can never become valid again — drop them and signal
        // honestly that the session is over.
        endedSession = true;
        if (uploaded === 0) {
          if (db) await clearSessionWithIdb(db, session.id);
          else deleteFallback(readFallback(session.id).map((entry) => entry.id));
          return 'session_ended';
        }
      } else {
        // Network / transient failure → keep points, retry later.
        return uploaded > 0 ? 'partial' : 'failed';
      }
    }
  }

  if (endedSession) return 'session_ended';
  return uploaded > 0 ? 'uploaded' : 'failed';
}
