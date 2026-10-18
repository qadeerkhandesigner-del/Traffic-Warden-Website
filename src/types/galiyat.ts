/**
 * Galiyat Traffic & Travel Advisory — domain types.
 *
 * These types intentionally mirror the shape a server/API would return so the
 * presentation layer does not need to change when a live data source (a REST
 * endpoint, Supabase table, or an internal CMS) is connected later.
 */

/** Advisory categories displayed as quick-information cards and filters. */
export type AdvisoryCategory =
  | 'weather'
  | 'snowfall'
  | 'road-closure'
  | 'diversion'
  | 'fog'
  | 'safety';

/** Advisory priority. Never communicated through colour alone in the UI. */
export type AdvisoryPriority = 'low' | 'medium' | 'high' | 'critical';

/** Location scope of an advisory. 'all' means the whole Galiyat region. */
export type GaliyatLocationId =
  | 'all'
  | 'nathia-gali'
  | 'ayubia'
  | 'dunga-gali'
  | 'thandiani';

/** A location that advisories can be scoped to. Extend the list to add more. */
export interface GaliyatLocation {
  id: Exclude<GaliyatLocationId, 'all'>;
  name: string;
  nameUrdu: string;
  /** Approximate elevation in metres (GDA / Survey of Pakistan references). */
  elevationMeters: number;
}

/** Display metadata for an advisory category. */
export interface AdvisoryCategoryMeta {
  id: AdvisoryCategory;
  label: string;
  labelUrdu: string;
  description: string;
  descriptionUrdu: string;
  /** Maps to the icon resolver in components/galiyat/advisoryDisplay.tsx */
  iconName: string;
}

/** Display metadata for a priority level. */
export interface AdvisoryPriorityMeta {
  id: AdvisoryPriority;
  label: string;
  labelUrdu: string;
  /** Higher number = more severe. Used for priority sorting. */
  weight: number;
  iconName: string;
}

/** A single published travel advisory. */
export interface TravelAdvisory {
  id: string;
  /** Official-style reference number, e.g. GLY-ADV-2026-014. */
  reference: string;
  categoryId: AdvisoryCategory;
  priority: AdvisoryPriority;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  /** Recommended actions shown in the expanded "Read Details" view. */
  actionsEn: string[];
  actionsUr: string[];
  locationId: GaliyatLocationId;
  issuedAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  /** null / undefined = no expiry announced. */
  expiresAt?: string | null;
  /**
   * Optional future time (ISO 8601) for automatic publication.
   * When set and still in the future, the advisory stays hidden from the public
   * list even though `isPublished` is true. null / undefined = publish now.
   */
  publishAt?: string | null;
  /** Audit trail — staff email that created the record. */
  createdBy?: string | null;
  /** Audit trail — staff email that last saved the record. */
  updatedBy?: string | null;
  isPublished: boolean;
  /** True for clearly-labelled sample content. Never rendered as official. */
  isDemo: boolean;
}

/** Result envelope returned by the advisory data source. */
export interface GaliyatAdvisoriesResult {
  advisories: TravelAdvisory[];
  fetchedAt: string; // ISO 8601
  source: 'demo' | 'live';
  error: string | null;
}

export type AdvisorySortOption = 'newest' | 'priority' | 'expiry';

/** Route status shown on the public route board. */
export type RouteStatus = 'open' | 'closed';

/**
 * A Galiyat route whose open/closed condition is managed from the admin
 * dashboard and shown on the public advisory page.
 */
export interface GaliyatRoute {
  id: string;
  nameEn: string;
  nameUr: string;
  status: RouteStatus;
  /** Optional short note, e.g. "Chain required after Barrian". */
  noteEn?: string | null;
  noteUr?: string | null;
  /** Audit trail — staff email that last saved the route. */
  updatedBy?: string | null;
  updatedAt: string; // ISO 8601
}

/** UI filter state for the advisory list. */
export interface AdvisoryFilterState {
  search: string;
  categoryId: AdvisoryCategory | 'all';
  priority: AdvisoryPriority | 'all';
  locationId: GaliyatLocationId;
  sortBy: AdvisorySortOption;
}
