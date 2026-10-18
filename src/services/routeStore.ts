import { isSupabaseConfigured, supabase } from './supabaseClient';
import type { GaliyatRoute, RouteStatus } from '../types/galiyat';

/**
 * Galiyat route status — persistence layer
 * ========================================
 *
 * Mirrors `advisoryStore.ts`: the admin dashboard and the public route board
 * both read/write through this single interface.
 *
 *   • `supabaseRouteStore` — used as soon as VITE_SUPABASE_URL and
 *     VITE_SUPABASE_ANON_KEY exist (table created by
 *     `supabase/updates-03-route-status.sql`).
 *
 *   • `localRouteStore` — browser localStorage fallback, used while Supabase
 *     is not configured. Entries are saved on that device only.
 */
export interface RouteStore {
  list(): Promise<GaliyatRoute[]>;
  create(route: GaliyatRoute): Promise<GaliyatRoute>;
  update(id: string, patch: Partial<GaliyatRoute>): Promise<GaliyatRoute>;
  remove(id: string): Promise<void>;
}

/* -------------------------------------------------------------------------- */
/*                          LOCAL STORAGE IMPLEMENTATION                      */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = 'tpa_galiyat_routes_v1';

const WRITE_LATENCY_MS = 140;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function readStorage(): GaliyatRoute[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as GaliyatRoute[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(routes: GaliyatRoute[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
  } catch {
    throw new Error('Routes could not be saved in this browser storage.');
  }
}

export const localRouteStore: RouteStore = {
  async list() {
    return readStorage();
  },

  async create(route) {
    writeStorage([route, ...readStorage()]);
    await wait(WRITE_LATENCY_MS);
    return route;
  },

  async update(id, patch) {
    const all = readStorage();
    const index = all.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('This route no longer exists. Reload the list and try again.');
    }

    const next: GaliyatRoute = {
      ...all[index],
      ...patch,
      id,
      updatedAt: new Date().toISOString(),
    };

    all[index] = next;
    writeStorage(all);
    await wait(WRITE_LATENCY_MS);
    return next;
  },

  async remove(id) {
    writeStorage(readStorage().filter((item) => item.id !== id));
    await wait(WRITE_LATENCY_MS);
  },
};

/* -------------------------------------------------------------------------- */
/*                           SUPABASE IMPLEMENTATION                          */
/* -------------------------------------------------------------------------- */

const TABLE = 'galiyat_routes';

/** GaliyatRoute field -> database column. */
const COLUMN_BY_FIELD: Record<keyof GaliyatRoute, string> = {
  id: 'id',
  nameEn: 'name_en',
  nameUr: 'name_ur',
  status: 'status',
  noteEn: 'note_en',
  noteUr: 'note_ur',
  updatedBy: 'updated_by',
  updatedAt: 'updated_at',
};

/** A row as stored in the `galiyat_routes` table. */
interface RouteRow {
  id: string;
  name_en: string;
  name_ur: string | null;
  status: string;
  note_en: string | null;
  note_ur: string | null;
  updated_by: string | null;
  updated_at: string;
}

/** Partial route -> database row (only the fields that were provided). */
function toRow(route: Partial<GaliyatRoute>): Record<string, unknown> {
  const row: Record<string, unknown> = {};

  (Object.keys(COLUMN_BY_FIELD) as (keyof GaliyatRoute)[]).forEach((field) => {
    const value = route[field];
    if (value !== undefined) {
      row[COLUMN_BY_FIELD[field]] = value;
    }
  });

  return row;
}

function fromRow(row: RouteRow): GaliyatRoute {
  return {
    id: row.id,
    nameEn: row.name_en,
    nameUr: row.name_ur ?? '',
    status: row.status as RouteStatus,
    noteEn: row.note_en,
    noteUr: row.note_ur,
    updatedBy: row.updated_by,
    updatedAt: row.updated_at,
  };
}

function client() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
    );
  }
  return supabase;
}

type WriteError = { message?: string; code?: string } | null;

/** Turns raw Postgres/Supabase messages into something staff can act on. */
function friendlyError(error: WriteError, fallback: string): string {
  const message = (error?.message ?? '').trim();
  if (!message) return fallback;

  const lower = message.toLowerCase();

  if (lower.includes('row-level security') || lower.includes('permission denied')) {
    return 'This account does not have permission to change routes. If staff-only access has been enabled in Supabase, add this email address to the public.advisory_staff table.';
  }
  if (lower.includes('jwt') || lower.includes('not authenticated')) {
    return 'Your sign-in session has expired. Please sign out and sign in again.';
  }
  if (lower.includes('relation') && lower.includes('does not exist')) {
    return 'The routes table does not exist yet. In the Supabase SQL editor, run supabase/updates-03-route-status.sql.';
  }

  return message;
}

export const supabaseRouteStore: RouteStore = {
  async list() {
    const { data, error } = await client()
      .from(TABLE)
      .select('*')
      .order('name_en', { ascending: true });

    if (error) throw new Error(friendlyError(error, 'Routes could not be loaded.'));
    return ((data ?? []) as RouteRow[]).map(fromRow);
  },

  async create(route) {
    const { data, error } = await client()
      .from(TABLE)
      .insert(toRow(route))
      .select()
      .single();

    if (error) throw new Error(friendlyError(error, 'The route could not be saved.'));
    if (!data) throw new Error('The route could not be saved.');
    return fromRow(data as RouteRow);
  },

  async update(id, patch) {
    const payload = { ...toRow(patch), updated_at: new Date().toISOString() };

    const { data, error } = await client()
      .from(TABLE)
      .update(payload)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw new Error(friendlyError(error, 'The route could not be updated.'));
    if (!data) {
      throw new Error('This route no longer exists. Reload the list and try again.');
    }
    return fromRow(data as RouteRow);
  },

  async remove(id) {
    const { error } = await client().from(TABLE).delete().eq('id', id);
    if (error) throw new Error(friendlyError(error, 'The route could not be deleted.'));
  },
};

/* -------------------------------------------------------------------------- */
/*                                 ACTIVE STORE                               */
/* -------------------------------------------------------------------------- */

/**
 * Supabase as soon as it is configured, localStorage otherwise.
 * This is the single switch between the two backends.
 */
export const routeStore: RouteStore = isSupabaseConfigured
  ? supabaseRouteStore
  : localRouteStore;

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

export function generateRouteId(): string {
  return `gly-route-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** A blank route used when the dashboard starts a new entry. */
export function createEmptyRoute(): GaliyatRoute {
  return {
    id: generateRouteId(),
    nameEn: '',
    nameUr: '',
    status: 'open',
    noteEn: null,
    noteUr: null,
    updatedBy: null,
    updatedAt: new Date().toISOString(),
  };
}
