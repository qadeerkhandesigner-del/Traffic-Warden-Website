import { isSupabaseConfigured, supabase } from './supabaseClient';

/**
 * Tourist "Track Your Location" — session service
 * ===============================================
 *
 * Talks to the security-definer RPCs created by
 * `supabase/updates-06-tourist-tracking.sql`:
 *
 *   • create_tracking_session()    → session row (server-decided window)
 *   • record_tracking_locations()  → GPS points (token-verified, rate-limited)
 *   • stop_tracking_session()      → tourist stops their own session
 *
 * SECURITY:
 *   The browser generates a secret token with crypto.getRandomValues(). Only
 *   its SHA-256 hash reaches the database. The raw token is kept in this
 *   browser (localStorage) and is attached to every location write, so a
 *   leaked session UUID alone is worthless without the token.
 *
 *   Tracking runs for as long as the tourist keeps it on — there is NO
 *   tourist-facing duration limit. The server still bounds sessions to the
 *   3-day retention window (after which all their data is auto-deleted), and
 *   the frontend treats that bound purely as a safety net, never as a limit
 *   shown to the tourist.
 */

/* -------------------------------------------------------------------------- */
/*                                  models                                    */
/* -------------------------------------------------------------------------- */

export interface TrackingSessionRecord {
  id: string;
  fullName: string;
  phoneNumber: string;
  /** Optional — e.g. "LEA-1234". Stored so the control room can match the vehicle. */
  vehicleNumber: string | null;
  groupSize: number;
  consentTimestamp: string | null;
  startedAt: string;
  expiresAt: string;
  status: string;
}

/** A session plus the secret token — lives ONLY in this browser's storage. */
export interface StoredTrackingSession extends TrackingSessionRecord {
  token: string;
}

export interface TrackingPoint {
  latitude: number;
  longitude: number;
  accuracyMeters: number | null;
  recordedAt: string;
}

export interface CreateTrackingInput {
  fullName: string;
  phoneNumber: string;
  /** Optional vehicle registration number, e.g. "LEA-1234". */
  vehicleNumber?: string;
  groupSize: number;
  consent: boolean;
}

/* -------------------------------------------------------------------------- */
/*                            configuration knobs                             */
/* -------------------------------------------------------------------------- */

/**
 * Minimum pause between live location uploads. Stored readings are uploaded at
 * most this often; readers that arrive sooner are merged with the last one.
 * Override for testing via localStorage: tpa_tracking_min_interval_ms.
 */
export function minUploadIntervalMs(): number {
  const override = readNumberSetting('tpa_tracking_min_interval_ms');
  return clamp(override ?? 15_000, 1_000, 300_000);
}

/**
 * Minimum movement (metres) before a fresh reading is uploaded with a shorter
 * pause. Override: tpa_tracking_min_distance_m.
 */
export function minUploadDistanceMeters(): number {
  const override = readNumberSetting('tpa_tracking_min_distance_m');
  return clamp(override ?? 25, 5, 5_000);
}

/**
 * Fixes worse than this are too vague to persist AND to show as a live
 * position — they are acknowledged as "searching for a better fix".
 */
export const MAX_ACCEPTABLE_ACCURACY_METERS = 200;

function readNumberSetting(key: string): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const value = Number.parseInt(raw, 10);
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/* -------------------------------------------------------------------------- */
/*                            local session storage                           */
/* -------------------------------------------------------------------------- */

const SESSION_KEY = 'tpa_tracking_active_session';

function persistSession(session: StoredTrackingSession | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (session) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Private mode / storage unavailable — the session still works in memory.
  }
}

/** Returns the locally stored session, cleaned up if it has expired. */
export function getStoredTrackingSession(): StoredTrackingSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredTrackingSession;
    if (!parsed?.id || !parsed?.token || !parsed?.expiresAt) return null;
    if (new Date(parsed.expiresAt).getTime() <= Date.now()) {
      persistSession(null); // expired → drop the token from storage
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearStoredTrackingSession(): void {
  persistSession(null);
}

/* -------------------------------------------------------------------------- */
/*                    local trail (tourist's own travel line)                 */
/* -------------------------------------------------------------------------- */

/**
 * The tourist's own map draws a polyline of the path they travelled. Location
 * history is NOT readable by tourists server-side (RLS — by design), so the
 * trail is kept from the points this browser accepted itself and mirrored in
 * localStorage so it survives a page reload during the same session.
 */
const TRAIL_PREFIX = 'tpa_tracking_trail_';
export const TRAIL_MAX_POINTS = 1000;

function sanitizeTrailPoints(raw: unknown): TrackingPoint[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (entry): entry is TrackingPoint =>
      typeof entry === 'object' &&
      entry !== null &&
      typeof (entry as TrackingPoint).latitude === 'number' &&
      typeof (entry as TrackingPoint).longitude === 'number' &&
      typeof (entry as TrackingPoint).recordedAt === 'string'
  );
}

export function readStoredTrail(sessionId: string): TrackingPoint[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(TRAIL_PREFIX + sessionId);
    return raw ? sanitizeTrailPoints(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

export function storeTrail(sessionId: string, points: TrackingPoint[]): void {
  if (typeof window === 'undefined') return;
  try {
    // Mirrors the in-memory rule: first fix + most recent points.
    const capped = points.length > TRAIL_MAX_POINTS
      ? [points[0], ...points.slice(points.length - (TRAIL_MAX_POINTS - 1))]
      : points;
    window.localStorage.setItem(TRAIL_PREFIX + sessionId, JSON.stringify(capped));
  } catch {
    /* storage full/blocked — the in-memory trail keeps working */
  }
}

export function clearStoredTrail(sessionId: string | null): void {
  if (!sessionId || typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(TRAIL_PREFIX + sessionId);
  } catch {
    /* ignore */
  }
}

/* -------------------------------------------------------------------------- */
/*                            secret generation                               */
/* -------------------------------------------------------------------------- */

/** 32 random bytes as hex (128 chars max in the DB is far above this). */
export function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    throw new Error('This browser cannot generate a secure tracking token.');
  }
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/* -------------------------------------------------------------------------- */
/*                             validation helpers                             */
/* -------------------------------------------------------------------------- */

/**
 * Accepts 0300 1234567 / 0300-1234567 / +92 300 1234567 / 00923001234567 /
 * 923001234567 and returns true when it can be normalised to +92 3XXXXXXXXX.
 */
export function isValidPkMobileNumber(raw: string): boolean {
  return normalizePkMobileNumber(raw) !== null;
}

export function normalizePkMobileNumber(raw: string): string | null {
  const digits = raw.replace(/[\s\-().]/g, '');
  const patterns = [
    /^\+92(3\d{9})$/,
    /^0092(3\d{9})$/,
    /^0(3\d{9})$/,
    /^92(3\d{9})$/,
    /^(3\d{9})$/,
  ];
  for (const pattern of patterns) {
    const match = digits.match(pattern);
    if (match) return `+92${match[1]}`;
  }
  return null;
}

export function isValidTrackingName(raw: string): boolean {
  const name = raw.trim().replace(/\s+/g, ' ');
  return name.length >= 2 && name.length <= 80;
}

/* -------------------------------------------------------------------------- */
/*                               dirty error map                              */
/* -------------------------------------------------------------------------- */

export type TrackingErrorCode =
  | 'CONSENT_REQUIRED'
  | 'INVALID_NAME'
  | 'INVALID_PHONE'
  | 'INVALID_GROUP_SIZE'
  | 'INVALID_TOKEN'
  | 'TOO_MANY_ACTIVE_SESSIONS'
  | 'SESSION_NOT_FOUND'
  | 'SESSION_EXPIRED'
  | 'INVALID_POINTS'
  | 'NETWORK'
  | 'UNKNOWN';

export function describeTrackingError(error: unknown): {
  code: TrackingErrorCode;
  message: string;
} {
  const raw = error instanceof Error ? error.message : String(error ?? '');
  const upper = raw.toUpperCase();

  const code = (Object.keys(ERROR_PHRASES) as TrackingErrorCode[]).find((key) =>
    upper.includes(key)
  );

  if (code) return { code, message: ERROR_PHRASES[code] };

  if (isSupabaseConfigured) {
    return { code: 'UNKNOWN', message: raw || 'Something went wrong. Please try again.' };
  }
  return {
    code: 'NETWORK',
    message:
      'The tracking backend is not configured. Add VITE_SUPABASE_URL and ' +
      'VITE_SUPABASE_ANON_KEY to the .env file and rebuild.',
  };
}

const ERROR_PHRASES: Record<TrackingErrorCode, string> = {
  CONSENT_REQUIRED: 'Please tick the consent box before starting — tracking cannot begin without it.',
  INVALID_NAME: 'Please enter your full name (2–80 characters).',
  INVALID_PHONE: 'Please enter a valid Pakistani mobile number, e.g. 0300 1234567 or +923001234567.',
  INVALID_GROUP_SIZE: 'Group size must be a whole number between 1 and 50.',
  INVALID_TOKEN: 'Tracking session security token is invalid. Please start again.',
  TOO_MANY_ACTIVE_SESSIONS:
    'This mobile number already has the maximum number of running tracking sessions. ' +
    'Stop the previous session or wait until it expires.',
  SESSION_NOT_FOUND: 'This tracking session is no longer valid. Please register again.',
  SESSION_EXPIRED:
    'Your tracking session window has ended, so updates are no longer accepted. Your recorded route stays with the control room for 3 days.',
  INVALID_POINTS: 'The location readings could not be uploaded (malformed data).',
  NETWORK: 'Network error — your location readings are saved on this device and will be uploaded automatically when connectivity returns.',
  UNKNOWN: 'Something went wrong. Please try again.',
};

/* -------------------------------------------------------------------------- */
/*                            database operations                             */
/* -------------------------------------------------------------------------- */

function requireClient() {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error('NETWORK');
  }
  return supabase;
}

/**
 * Creates the session in Supabase. The database decides `expires_at`
 * (start + the server-set retention window); the returned row is the source
 * of truth.
 */
export async function createTrackingSession(
  input: CreateTrackingInput
): Promise<StoredTrackingSession> {
  const token = generateSessionToken();
  const client = requireClient();

  /* Vehicle number is optional; normalize the client-side copy the same way
     the SQL function does so the persisted session matches the database. */
  const vehicleNumber = input.vehicleNumber
    ? input.vehicleNumber.toUpperCase().replace(/\s+/g, ' ').trim().slice(0, 15)
    : '';

  const { data, error } = await client.rpc('create_tracking_session', {
    p_full_name: input.fullName.trim().replace(/\s+/g, ' '),
    p_phone_number: input.phoneNumber,
    p_vehicle_number: vehicleNumber || null,
    p_group_size: input.groupSize,
    p_consent_given: input.consent === true,
    p_token: token,
  });

  if (error) {
    throw new Error(describeTrackingError(error).code);
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.session_id || !row?.started_at || !row?.expires_at) {
    throw new Error('UNKNOWN');
  }

  const session: StoredTrackingSession = {
    id: row.session_id as string,
    token,
    fullName: input.fullName.trim().replace(/\s+/g, ' '),
    phoneNumber: normalizePkMobileNumber(input.phoneNumber) ?? input.phoneNumber,
    vehicleNumber: vehicleNumber || null,
    groupSize: input.groupSize,
    consentTimestamp: new Date().toISOString(),
    startedAt: row.started_at as string,
    expiresAt: row.expires_at as string,
    status: 'active',
  };

  persistSession(session);
  return session;
}

/**
 * Uploads 1..200 points for an authorized session. Returns the number of
 * points the server actually stored (duplicates get skipped).
 */
export async function submitTrackingLocations(
  session: Pick<StoredTrackingSession, 'id' | 'token'>,
  points: TrackingPoint[]
): Promise<number | null> {
  const client = requireClient();
  const { data, error } = await client.rpc('record_tracking_locations', {
    p_session_id: session.id,
    p_token: session.token,
    p_points: points.map((point) => ({
      latitude: point.latitude,
      longitude: point.longitude,
      accuracy_meters: point.accuracyMeters,
      recorded_at: point.recordedAt,
    })),
  });

  if (error) {
    throw new Error(describeTrackingError(error).code);
  }
  return typeof data === 'number' ? data : null;
}

/** Stops the tourist's own session. Requires the secret token. */
export async function stopTrackingSession(
  session: Pick<StoredTrackingSession, 'id' | 'token'>
): Promise<boolean> {
  const client = requireClient();
  const { data, error } = await client.rpc('stop_tracking_session', {
    p_session_id: session.id,
    p_token: session.token,
  });

  if (error) {
    throw new Error(describeTrackingError(error).code);
  }
  return data === true;
}

/** True once the server-set session window has passed (safety net). */
export function isSessionExpired(session: Pick<StoredTrackingSession, 'expiresAt'>): boolean {
  return new Date(session.expiresAt).getTime() <= Date.now();
}
