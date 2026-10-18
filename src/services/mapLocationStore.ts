import { isSupabaseConfigured, supabase } from './supabaseClient';
import type { MapLocation } from '../types/map';

/**
 * Persistence for the Abbottabad Tourist & Traffic Map.
 *
 * Public visitors may only read *published* rows (enforced by RLS on the
 * `map_locations` table). Records are managed from the admin console by
 * advisory staff, exactly like the advisory/route stores.
 */

/** Envelope for the public (fail-soft) list. */
export interface PublishedMapLocations {
  locations: MapLocation[];
  error: string | null;
}

export interface MapLocationStore {
  /** Staff: every record, regardless of publication state. */
  list(): Promise<MapLocation[]>;
  /** Public website: published-only list. Fails soft — error envelope. */
  listPublished(): Promise<PublishedMapLocations>;
  create(location: MapLocation): Promise<MapLocation>;
  update(id: string, patch: Partial<MapLocation>): Promise<MapLocation>;
  remove(id: string): Promise<void>;
}

const TABLE = 'map_locations';

const PROJECTION = [
  'id',
  'name',
  'category',
  'latitude',
  'longitude',
  'description',
  'address',
  'contact_number',
  'image_url',
  'google_maps_url',
  'is_verified',
  'last_verified_at',
  'is_published',
  'created_by',
  'updated_by',
  'created_at',
].join(',');

interface MapLocationRow {
  id: string;
  name: string;
  category: MapLocation['category'];
  latitude: number;
  longitude: number;
  description: string | null;
  address: string | null;
  contact_number: string | null;
  image_url: string | null;
  google_maps_url: string | null;
  is_verified: boolean;
  last_verified_at: string | null;
  is_published: boolean;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
}

function fromRow(row: MapLocationRow): MapLocation {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    latitude: row.latitude,
    longitude: row.longitude,
    description: row.description,
    address: row.address,
    contactNumber: row.contact_number,
    imageUrl: row.image_url,
    googleMapsUrl: row.google_maps_url,
    isVerified: row.is_verified,
    lastVerifiedAt: row.last_verified_at,
    isPublished: row.is_published,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    createdAt: row.created_at,
  };
}

function toRow(location: Partial<MapLocation>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (location.id !== undefined) row.id = location.id;
  if (location.name !== undefined) row.name = location.name;
  if (location.category !== undefined) row.category = location.category;
  if (location.latitude !== undefined) row.latitude = location.latitude;
  if (location.longitude !== undefined) row.longitude = location.longitude;
  if (location.description !== undefined) row.description = location.description;
  if (location.address !== undefined) row.address = location.address;
  if (location.contactNumber !== undefined) row.contact_number = location.contactNumber;
  if (location.imageUrl !== undefined) row.image_url = location.imageUrl;
  if (location.googleMapsUrl !== undefined) row.google_maps_url = location.googleMapsUrl;
  if (location.isVerified !== undefined) {
    row.is_verified = location.isVerified;
    row.last_verified_at = location.isVerified
      ? (location.lastVerifiedAt !== undefined
        ? location.lastVerifiedAt
        : new Date().toISOString())
      : null;
  }
  if (location.isPublished !== undefined) row.is_published = location.isPublished;
  if (location.createdBy !== undefined) row.created_by = location.createdBy;
  if (location.updatedBy !== undefined) row.updated_by = location.updatedBy;
  return row;
}

type WriteError = { message?: string; code?: string } | null;

/** Turns raw Postgres/Supabase messages into something staff can act on. */
function friendlyError(error: WriteError, fallback: string): string {
  const message = (error?.message ?? '').trim();
  if (!message) return fallback;

  const lower = message.toLowerCase();

  if (lower.includes('row-level security') || lower.includes('permission denied')) {
    return 'This account does not have permission to manage map locations. If staff-only access is enabled in Supabase, add this email address to the public.advisory_staff table.';
  }
  if (lower.includes('jwt') || lower.includes('not authenticated')) {
    return 'Your sign-in session has expired. Please sign out and sign in again.';
  }
  if (lower.includes('relation') && lower.includes('does not exist')) {
    return 'The map locations table does not exist yet. In the Supabase SQL editor, run supabase/updates-04-map-locations.sql.';
  }
  if (lower.includes('map_locations_category_check')) {
    return 'The selected category is not recognised. Please pick one of the listed categories.';
  }

  return message;
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
/*                              SUPABASE STORE                                */
/* -------------------------------------------------------------------------- */

export const supabaseMapLocationStore: MapLocationStore = {
  async list() {
    const { data, error } = await client()
      .from(TABLE)
      .select(PROJECTION)
      .order('name', { ascending: true });

    if (error) throw new Error(friendlyError(error, 'Map locations could not be loaded.'));
    return ((data ?? []) as unknown as MapLocationRow[]).map(fromRow);
  },

  async listPublished() {
    if (!supabase) {
      return { locations: [], error: 'Supabase is not configured.' };
    }

    const { data, error } = await supabase
      .from(TABLE)
      .select(PROJECTION)
      .eq('is_published', true)
      .order('name', { ascending: true });

    if (error) {
      if (error.code === '42P01' || /relation .* does not exist/i.test(error.message)) {
        return { locations: [], error: 'MAP_TABLE_MISSING' };
      }
      return {
        locations: [],
        error: error.message || 'Map locations could not be loaded.',
      };
    }

    return {
      locations: ((data ?? []) as unknown as MapLocationRow[]).map(fromRow),
      error: null,
    };
  },

  async create(location) {
    const { data, error } = await client()
      .from(TABLE)
      .insert(toRow(location))
      .select()
      .single();

    if (error) throw new Error(friendlyError(error, 'The map location could not be saved.'));
    if (!data) throw new Error('The map location could not be saved.');
    return fromRow(data as unknown as MapLocationRow);
  },

  async update(id, patch) {
    const payload = { ...toRow(patch) };

    const { data, error } = await client()
      .from(TABLE)
      .update(payload)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw new Error(friendlyError(error, 'The map location could not be updated.'));
    if (!data) {
      throw new Error('This map location no longer exists. Reload the list and try again.');
    }
    return fromRow(data as unknown as MapLocationRow);
  },

  async remove(id) {
    const { error } = await client().from(TABLE).delete().eq('id', id);
    if (error) throw new Error(friendlyError(error, 'The map location could not be deleted.'));
  },
};

/* -------------------------------------------------------------------------- */
/*                              LOCAL FALLBACK                                */
/* -------------------------------------------------------------------------- */

const LOCAL_KEY = 'tpa_map_locations_v1';

function readLocal(): MapLocation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as MapLocation[];
  } catch {
    return [];
  }
}

function writeLocal(locations: MapLocation[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(locations));
}

export const localMapLocationStore: MapLocationStore = {
  async list() {
    return readLocal().sort((a, b) => a.name.localeCompare(b.name));
  },

  /* No local seed for the map — the starter set lives in data/mapLocations.ts. */
  async listPublished() {
    return { locations: [], error: null };
  },

  async create(location) {
    writeLocal([location, ...readLocal()]);
    return location;
  },

  async update(id, patch) {
    const next = readLocal().map((location) =>
      location.id === id ? { ...location, ...patch } : location
    );
    writeLocal(next);
    return next.find((location) => location.id === id) as MapLocation;
  },

  async remove(id) {
    const next = readLocal().filter((location) => location.id !== id);
    writeLocal(next);
  },
};

/* -------------------------------------------------------------------------- */
/*                                 ACTIVE STORE                                */
/* -------------------------------------------------------------------------- */

/** Supabase as soon as it is configured, localStorage otherwise. */
export const mapLocationStore: MapLocationStore = isSupabaseConfigured
  ? supabaseMapLocationStore
  : localMapLocationStore;

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                    */
/* -------------------------------------------------------------------------- */

export function generateMapLocationId(): string {
  return `abd-map-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** A blank map location used when the dashboard starts a new entry. */
export function createEmptyMapLocation(): MapLocation {
  return {
    id: generateMapLocationId(),
    name: '',
    category: 'tourist',
    latitude: 34.1688,
    longitude: 73.2215,
    description: null,
    address: null,
    contactNumber: null,
    imageUrl: null,
    googleMapsUrl: null,
    isVerified: false,
    lastVerifiedAt: null,
    isPublished: true,
    createdBy: null,
    updatedBy: null,
  };
}
