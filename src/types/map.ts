/**
 * Abbottabad Tourist & Traffic Map — domain types.
 *
 * Mirrors the `map_locations` Supabase table shape so the UI does not need to
 * change when the live table is activated.
 */

/** Marker categories available on the map. */
export type MapCategory =
  | 'tourist'
  | 'hotel'
  | 'restaurant'
  | 'fuel'
  | 'police'
  | 'facilitation'
  | 'trail';

/** A single map location record. */
export interface MapLocation {
  id: string;
  name: string;
  category: MapCategory;
  latitude: number;
  longitude: number;
  description: string | null;
  address: string | null;
  /** Public helpline / office number. Only populated when verified. */
  contactNumber: string | null;
  imageUrl?: string | null;
  googleMapsUrl?: string | null;
  /** True only when the position/disclaimer has actually been checked by staff. */
  isVerified: boolean;
  lastVerifiedAt?: string | null;
  /** True for the built-in starter set shipped with the website (approximate). */
  isStarter?: boolean;
  /** Published rows are readable by the public website (enforced by RLS). */
  isPublished: boolean;
  /** Audit trail — staff email that created / last saved the record. */
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt?: string;
}

/** Display metadata for a map category. */
export interface MapCategoryMeta {
  id: MapCategory;
  label: string;
  labelUrdu: string;
  /** Tailwind-safe marker + legend colour (hex). */
  color: string;
  iconName: string;
}

/** Result envelope returned by the map data source. */
export interface MapLocationsResult {
  locations: MapLocation[];
  source: 'starter' | 'live';
  error: string | null;
}
