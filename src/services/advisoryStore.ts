import { buildDemoAdvisories } from '../data/galiyatAdvisoryData';
import { isSupabaseConfigured, supabase } from './supabaseClient';
import type {
  AdvisoryCategory,
  AdvisoryPriority,
  GaliyatLocationId,
  TravelAdvisory,
} from '../types/galiyat';

/**
 * Galiyat advisory — persistence layer
 * ====================================
 *
 * The admin dashboard and the public advisory page both read/write through this
 * single interface, so the storage backend can be swapped without touching any
 * component.
 *
 * TWO IMPLEMENTATIONS, chosen automatically:
 *
 *   • `supabaseAdvisoryStore` — used as soon as VITE_SUPABASE_URL and
 *     VITE_SUPABASE_ANON_KEY exist (see `services/supabaseClient.ts` and the
 *     table in `supabase/schema.sql`). Entries are then shared by every visitor
 *     and device.
 *
 *   • `localAdvisoryStore` — browser localStorage fallback, used while Supabase
 *     is not configured. Entries are saved on that device only.
 *
 * The decision is made once, at the bottom of this file. No page or component
 * has to know which one is active.
 */
export interface AdvisoryStore {
  list(): Promise<TravelAdvisory[]>;
  create(advisory: TravelAdvisory): Promise<TravelAdvisory>;
  update(id: string, patch: Partial<TravelAdvisory>): Promise<TravelAdvisory>;
  remove(id: string): Promise<void>;
  createMany(advisories: TravelAdvisory[]): Promise<void>;
  clear(): Promise<void>;
}

/* -------------------------------------------------------------------------- */
/*                          LOCAL STORAGE IMPLEMENTATION                      */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = 'tpa_galiyat_advisories_v1';

/** Small delay so the dashboard exercises its loading and saving states. */
const WRITE_LATENCY_MS = 140;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function readStorage(): TravelAdvisory[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as TravelAdvisory[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(advisories: TravelAdvisory[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(advisories));
  } catch {
    // Storage can be unavailable (private mode / quota). The caller shows the error.
    throw new Error('Entries could not be saved in this browser storage.');
  }
}

export const localAdvisoryStore: AdvisoryStore = {
  async list() {
    return readStorage();
  },

  async create(advisory) {
    writeStorage([advisory, ...readStorage()]);
    await wait(WRITE_LATENCY_MS);
    return advisory;
  },

  async update(id, patch) {
    const all = readStorage();
    const index = all.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('This advisory no longer exists. Reload the list and try again.');
    }

    const next: TravelAdvisory = {
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

  async createMany(advisories) {
    writeStorage([...advisories, ...readStorage()]);
    await wait(WRITE_LATENCY_MS);
  },

  async clear() {
    writeStorage([]);
    await wait(WRITE_LATENCY_MS);
  },
};

/* -------------------------------------------------------------------------- */
/*                           SUPABASE IMPLEMENTATION                          */
/* -------------------------------------------------------------------------- */

const TABLE = 'galiyat_advisories';

/** TravelAdvisory field -> database column. Keeps create and update in sync. */
const COLUMN_BY_FIELD: Record<keyof TravelAdvisory, string> = {
  id: 'id',
  reference: 'reference',
  categoryId: 'category_id',
  priority: 'priority',
  titleEn: 'title_en',
  titleUr: 'title_ur',
  descriptionEn: 'description_en',
  descriptionUr: 'description_ur',
  actionsEn: 'actions_en',
  actionsUr: 'actions_ur',
  locationId: 'location_id',
  issuedAt: 'issued_at',
  updatedAt: 'updated_at',
  expiresAt: 'expires_at',
  publishAt: 'publish_at',
  createdBy: 'created_by',
  updatedBy: 'updated_by',
  isPublished: 'is_published',
  isDemo: 'is_demo',
};

/** A row as stored in the `galiyat_advisories` table. */
interface AdvisoryRow {
  id: string;
  reference: string;
  category_id: string;
  priority: string;
  title_en: string;
  title_ur: string;
  description_en: string;
  description_ur: string;
  actions_en: string[] | null;
  actions_ur: string[] | null;
  location_id: string;
  issued_at: string;
  updated_at: string;
  expires_at: string | null;
  publish_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  is_published: boolean;
  is_demo: boolean;
}

/** Partial advisory -> database row (only the fields that were provided). */
function toRow(advisory: Partial<TravelAdvisory>): Record<string, unknown> {
  const row: Record<string, unknown> = {};

  (Object.keys(COLUMN_BY_FIELD) as (keyof TravelAdvisory)[]).forEach((field) => {
    const value = advisory[field];
    if (value !== undefined) {
      row[COLUMN_BY_FIELD[field]] = value;
    }
  });

  return row;
}

function fromRow(row: AdvisoryRow): TravelAdvisory {
  return {
    id: row.id,
    reference: row.reference,
    categoryId: row.category_id as AdvisoryCategory,
    priority: row.priority as AdvisoryPriority,
    titleEn: row.title_en,
    titleUr: row.title_ur,
    descriptionEn: row.description_en,
    descriptionUr: row.description_ur,
    actionsEn: row.actions_en ?? [],
    actionsUr: row.actions_ur ?? [],
    locationId: row.location_id as GaliyatLocationId,
    issuedAt: row.issued_at,
    updatedAt: row.updated_at,
    expiresAt: row.expires_at,
    publishAt: row.publish_at ?? null,
    createdBy: row.created_by ?? null,
    updatedBy: row.updated_by ?? null,
    isPublished: row.is_published,
    isDemo: row.is_demo,
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

/* -------------------------------------------------------------------------- */
/*                     OPTIONAL COLUMN / FRIENDLY ERROR HANDLING              */
/* -------------------------------------------------------------------------- */

/**
 * Columns added by `supabase/updates-01-staff-access.sql` (scheduling + audit).
 * They are an optional extra: a project that has not run that update yet must
 * still be able to save advisories, so a write that fails *only* because one of
 * these columns is missing is retried once without them.
 */
const OPTIONAL_COLUMNS = ['publish_at', 'created_by', 'updated_by'] as const;

let optionalColumnsSupported = true;

type WriteError = { message?: string; code?: string } | null;
type WriteResult<T> = { data: T | null; error: WriteError };

function stripOptionalColumns<P>(payload: P): P {
  const strip = (row: Record<string, unknown>) => {
    const next = { ...row };
    OPTIONAL_COLUMNS.forEach((column) => {
      delete next[column];
    });
    return next;
  };

  if (Array.isArray(payload)) return payload.map(strip) as P;
  return strip(payload as Record<string, unknown>) as P;
}

function isMissingOptionalColumnError(error: WriteError): boolean {
  if (!error) return false;
  if (error.code === 'PGRST204' || error.code === '42703') return true;

  const message = (error.message ?? '').toLowerCase();
  return OPTIONAL_COLUMNS.some((column) => message.includes(`'${column}'`) || message.includes(column));
}

/**
 * Runs a write, falling back to a version without the optional columns when the
 * database has not had the optional update applied.
 */
async function writeWithOptionalColumns<P, T>(
  payload: P,
  run: (payload: P) => Promise<WriteResult<T>>
): Promise<WriteResult<T>> {
  const first = await run(payload);
  if (!first.error || !optionalColumnsSupported) return first;
  if (!isMissingOptionalColumnError(first.error)) return first;

  optionalColumnsSupported = false;
  return run(stripOptionalColumns(payload));
}

/** Turns raw Postgres/Supabase messages into something staff can act on. */
function friendlyError(error: WriteError, fallback: string): string {
  const message = (error?.message ?? '').trim();
  if (!message) return fallback;

  const lower = message.toLowerCase();

  if (lower.includes('row-level security') || lower.includes('permission denied')) {
    return 'This account does not have permission to change advisories. If staff-only access has been enabled in Supabase, add this email address to the public.advisory_staff table.';
  }
  if (lower.includes('jwt') || lower.includes('not authenticated')) {
    return 'Your sign-in session has expired. Please sign out and sign in again.';
  }
  if (lower.includes('duplicate key')) {
    return 'An advisory with this reference already exists. Use a different reference number.';
  }
  if (lower.includes('check constraint') && lower.includes('category_id')) {
    return 'The database does not accept the selected category yet. In the Supabase SQL editor, run supabase/updates-02-snowfall-category.sql to allow it.';
  }

  return message;
}

export const supabaseAdvisoryStore: AdvisoryStore = {
  async list() {
    const { data, error } = await client()
      .from(TABLE)
      .select('*')
      .order('issued_at', { ascending: false });

    if (error) throw new Error(friendlyError(error, 'Advisories could not be loaded.'));
    return ((data ?? []) as AdvisoryRow[]).map(fromRow);
  },

  async create(advisory) {
    const { data, error } = await writeWithOptionalColumns<Record<string, unknown>, AdvisoryRow>(
      toRow(advisory),
      (payload) =>
        client()
          .from(TABLE)
          .insert(payload)
          .select()
          .single() as unknown as Promise<WriteResult<AdvisoryRow>>
    );

    if (error) throw new Error(friendlyError(error, 'The advisory could not be saved.'));
    if (!data) throw new Error('The advisory could not be saved.');
    return fromRow(data);
  },

  async update(id, patch) {
    const payload = { ...toRow(patch), updated_at: new Date().toISOString() };

    const { data, error } = await writeWithOptionalColumns<Record<string, unknown>, AdvisoryRow>(
      payload,
      (body) =>
        client()
          .from(TABLE)
          .update(body)
          .eq('id', id)
          .select()
          .maybeSingle() as unknown as Promise<WriteResult<AdvisoryRow>>
    );

    if (error) throw new Error(friendlyError(error, 'The advisory could not be updated.'));
    if (!data) {
      throw new Error('This advisory no longer exists. Reload the list and try again.');
    }
    return fromRow(data);
  },

  async remove(id) {
    const { error } = await client().from(TABLE).delete().eq('id', id);
    if (error) throw new Error(friendlyError(error, 'The advisory could not be deleted.'));
  },

  async createMany(advisories) {
    if (advisories.length === 0) return;

    const rows = advisories.map((advisory) => toRow(advisory));

    const { error } = await writeWithOptionalColumns<Record<string, unknown>[], null>(rows, (body) =>
      client()
        .from(TABLE)
        .insert(body) as unknown as Promise<WriteResult<null>>
    );

    if (error) throw new Error(friendlyError(error, 'The entries could not be saved.'));
  },

  async clear() {
    const { error } = await client().from(TABLE).delete().neq('id', '');
    if (error) throw new Error(friendlyError(error, 'The entries could not be deleted.'));
  },
};

/* -------------------------------------------------------------------------- */
/*                                 ACTIVE STORE                               */
/* -------------------------------------------------------------------------- */

/**
 * Supabase as soon as it is configured, localStorage otherwise.
 * This is the single switch between the two backends.
 */
export const advisoryStore: AdvisoryStore = isSupabaseConfigured
  ? supabaseAdvisoryStore
  : localAdvisoryStore;

/* -------------------------------------------------------------------------- */
/*                       STAFF ACCESS & LOCAL MIGRATION                       */
/* -------------------------------------------------------------------------- */

/**
 * True when the signed-in account is listed in the `advisory_staff` table
 * (created by `supabase/updates-01-staff-access.sql`).
 *
 * Returns `null` when Supabase is not configured or the check cannot run, so the
 * dashboard simply skips the warning instead of showing a false alarm.
 */
export async function checkAdvisoryStaffAccess(): Promise<boolean | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc('is_advisory_staff');
  if (error) return null;
  return Boolean(data);
}

/**
 * Copies entries that were saved in this browser (the localStorage fallback)
 * into the active store. Used once, after Supabase is connected, so earlier work
 * is not lost. Returns the number of entries imported.
 */
export async function importLocalAdvisories(createdBy: string): Promise<number> {
  const local = await localAdvisoryStore.list();
  if (local.length === 0) return 0;

  const existing = await advisoryStore.list();
  const existingIds = new Set(existing.map((advisory) => advisory.id));
  const now = new Date().toISOString();

  const toImport = local
    .filter((advisory) => !existingIds.has(advisory.id))
    .map<TravelAdvisory>((advisory) => ({
      ...advisory,
      isDemo: false,
      createdBy: advisory.createdBy ?? createdBy,
      updatedBy: createdBy,
      updatedAt: now,
    }));

  if (toImport.length === 0) return 0;

  await advisoryStore.createMany(toImport);
  return toImport.length;
}

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

export function generateAdvisoryId(): string {
  return `gly-adv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** A blank advisory used when the dashboard starts a new entry. */
export function createEmptyAdvisory(): TravelAdvisory {
  const now = new Date().toISOString();
  return {
    id: generateAdvisoryId(),
    reference: '',
    categoryId: 'weather',
    priority: 'medium',
    titleEn: '',
    titleUr: '',
    descriptionEn: '',
    descriptionUr: '',
    actionsEn: [],
    actionsUr: [],
    locationId: 'all',
    issuedAt: now,
    updatedAt: now,
    expiresAt: null,
    isPublished: false,
    isDemo: false,
  };
}

/** Suggests the next reference number, e.g. GLY-ADV-2026-015. */
export function suggestAdvisoryReference(
  existing: TravelAdvisory[],
  year: number = new Date().getFullYear()
): string {
  const prefix = `GLY-ADV-${year}-`;

  const highest = existing.reduce((max, advisory) => {
    if (!advisory.reference || !advisory.reference.startsWith(prefix)) return max;
    const value = Number.parseInt(advisory.reference.slice(prefix.length), 10);
    return Number.isNaN(value) ? max : Math.max(max, value);
  }, 0);

  return `${prefix}${String(highest + 1).padStart(3, '0')}`;
}

/** The labelled sample advisories, offered as a starting point in the dashboard. */
export function buildSampleAdvisories(): TravelAdvisory[] {
  return buildDemoAdvisories(new Date());
}

/** Downloads the current entries as JSON — handy for loading them into Supabase later. */
export function exportAdvisoriesAsJson(advisories: TravelAdvisory[]): void {
  const blob = new Blob([JSON.stringify(advisories, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `galiyat-advisories-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
