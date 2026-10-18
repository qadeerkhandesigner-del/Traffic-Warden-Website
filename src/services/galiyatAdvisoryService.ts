import { buildDemoAdvisories } from '../data/galiyatAdvisoryData';
import { advisoryStore } from './advisoryStore';
import type {
  AdvisoryFilterState,
  AdvisoryPriorityMeta,
  GaliyatAdvisoriesResult,
  TravelAdvisory,
} from '../types/galiyat';
import { ADVISORY_PRIORITIES, GALIYAT_LOCATIONS } from '../data/galiyatAdvisoryData';

/**
 * Galiyat Travel Advisory — data access layer
 * ===========================================
 *
 * The UI only ever talks to the functions in this file, so the data source can
 * be replaced without touching any component.
 *
 * CURRENT STATE: advisories entered in the admin dashboard
 * (`/admin/galiyat-advisory`) are read through `services/advisoryStore.ts`.
 * While no entry has been added yet, the labelled sample set is shown instead so
 * the public page is never empty.
 *
 * TO CONNECT SUPABASE: implement `AdvisoryStore` with Supabase calls in
 * `services/advisoryStore.ts`. Nothing in this file, or in any component, changes.
 */

/** Simulated network latency so loading states are exercised in development. */
const SIMULATED_LATENCY_MS = 260;

const PRIORITY_WEIGHT: Record<string, number> = ADVISORY_PRIORITIES.reduce(
  (acc, meta: AdvisoryPriorityMeta) => {
    acc[meta.id] = meta.weight;
    return acc;
  },
  {} as Record<string, number>
);

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

export function isAdvisoryExpired(advisory: TravelAdvisory, now: Date = new Date()): boolean {
  if (!advisory.expiresAt) return false;
  const expiry = new Date(advisory.expiresAt).getTime();
  if (Number.isNaN(expiry)) return false;
  return expiry <= now.getTime();
}

/**
 * True when publication is scheduled for a future time that has not arrived yet.
 * Such advisories stay hidden from the public list (see `isAdvisoryActive`).
 */
export function isAdvisoryScheduled(advisory: TravelAdvisory, now: Date = new Date()): boolean {
  if (!advisory.publishAt) return false;
  const publishTime = new Date(advisory.publishAt).getTime();
  if (Number.isNaN(publishTime)) return false;
  return publishTime > now.getTime();
}

/**
 * An advisory is active when it is published, its scheduled publication time
 * has arrived, and it has not passed its expiry.
 */
export function isAdvisoryActive(advisory: TravelAdvisory, now: Date = new Date()): boolean {
  return (
    advisory.isPublished && !isAdvisoryScheduled(advisory, now) && !isAdvisoryExpired(advisory, now)
  );
}

export function getActiveAdvisories(
  advisories: TravelAdvisory[],
  now: Date = new Date()
): TravelAdvisory[] {
  return advisories.filter((advisory) => isAdvisoryActive(advisory, now));
}

export function getExpiredAdvisories(
  advisories: TravelAdvisory[],
  now: Date = new Date()
): TravelAdvisory[] {
  return advisories.filter(
    (advisory) => advisory.isPublished && isAdvisoryExpired(advisory, now)
  );
}

/**
 * Counts of published, non-expired advisories per category.
 * Counts are always derived from records — never hardcoded.
 */
export function getCategoryCounts(
  advisories: TravelAdvisory[],
  now: Date = new Date()
): Record<string, number> {
  return getActiveAdvisories(advisories, now).reduce<Record<string, number>>((acc, advisory) => {
    acc[advisory.categoryId] = (acc[advisory.categoryId] ?? 0) + 1;
    return acc;
  }, {});
}

export function getLocationLabel(locationId: string): { name: string; nameUrdu: string } {
  if (locationId === 'all') {
    return { name: 'All Galiyat', nameUrdu: 'تمام گلیات' };
  }
  const match = GALIYAT_LOCATIONS.find((location) => location.id === locationId);
  return match ? { name: match.name, nameUrdu: match.nameUrdu } : { name: locationId, nameUrdu: locationId };
}

/** Latest `updatedAt` ISO string across the supplied advisories, or null. */
export function getLatestUpdatedAt(advisories: TravelAdvisory[]): string | null {
  return advisories.reduce<string | null>((latest, advisory) => {
    if (!latest) return advisory.updatedAt;
    return new Date(advisory.updatedAt) > new Date(latest) ? advisory.updatedAt : latest;
  }, null);
}

/* -------------------------------------------------------------------------- */
/*                            FILTERING / SORTING                             */
/* -------------------------------------------------------------------------- */

export const DEFAULT_ADVISORY_FILTERS: AdvisoryFilterState = {
  search: '',
  categoryId: 'all',
  priority: 'all',
  locationId: 'all',
  sortBy: 'newest',
};

export function hasActiveFilters(filters: AdvisoryFilterState): boolean {
  return (
    filters.search.trim() !== '' ||
    filters.categoryId !== 'all' ||
    filters.priority !== 'all' ||
    filters.locationId !== 'all' ||
    filters.sortBy !== 'newest'
  );
}

export function filterAndSortAdvisories(
  advisories: TravelAdvisory[],
  filters: AdvisoryFilterState,
  language: 'en' | 'ur'
): TravelAdvisory[] {
  const term = filters.search.trim().toLowerCase();

  const filtered = advisories.filter((advisory) => {
    if (filters.categoryId !== 'all' && advisory.categoryId !== filters.categoryId) return false;
    if (filters.priority !== 'all' && advisory.priority !== filters.priority) return false;

    // An advisory scoped to 'all' matches every location filter.
    if (filters.locationId !== 'all') {
      if (advisory.locationId !== 'all' && advisory.locationId !== filters.locationId) return false;
    }

    if (term) {
      const location = getLocationLabel(advisory.locationId);
      const haystack = [
        advisory.titleEn,
        advisory.titleUr,
        advisory.descriptionEn,
        advisory.descriptionUr,
        advisory.reference,
        location.name,
        location.nameUrdu,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(term)) return false;
    }

    return true;
  });

  const sorted = [...filtered];

  if (filters.sortBy === 'priority') {
    sorted.sort((a, b) => {
      const weightDiff = (PRIORITY_WEIGHT[b.priority] ?? 0) - (PRIORITY_WEIGHT[a.priority] ?? 0);
      if (weightDiff !== 0) return weightDiff;
      return new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime();
    });
  } else if (filters.sortBy === 'expiry') {
    sorted.sort((a, b) => {
      const aExpiry = a.expiresAt ? new Date(a.expiresAt).getTime() : Number.POSITIVE_INFINITY;
      const bExpiry = b.expiresAt ? new Date(b.expiresAt).getTime() : Number.POSITIVE_INFINITY;
      return aExpiry - bExpiry;
    });
  } else {
    // Default: newest first.
    sorted.sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
  }

  // Keep the language argument meaningful for future locale-aware search.
  void language;

  return sorted;
}

/* -------------------------------------------------------------------------- */
/*                                 DATA SOURCE                                */
/* -------------------------------------------------------------------------- */

/**
 * Returns the advisories entered in the admin dashboard.
 * Falls back to the labelled sample set while no entry has been added, so the
 * public page shows a useful list before the first real advisory is published.
 */
async function loadAdvisoriesFromSource(): Promise<TravelAdvisory[]> {
  return advisoryStore.list();
}

/**
 * Fetches advisories. Never throws — failures are returned in the result
 * envelope so the UI can render a dedicated error state.
 */
export async function fetchTravelAdvisories(): Promise<GaliyatAdvisoriesResult> {
  const fetchedAt = new Date().toISOString();

  try {
    const stored = await loadAdvisoriesFromSource();

    if (stored.length > 0) {
      return { advisories: stored, fetchedAt, source: 'live', error: null };
    }

    await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
    const advisories = buildDemoAdvisories(new Date());
    return { advisories, fetchedAt, source: 'demo', error: null };
  } catch (error) {
    return {
      advisories: [],
      fetchedAt,
      source: 'live',
      error:
        error instanceof Error
          ? error.message
          : 'Advisory data could not be loaded. Please try again.',
    };
  }
}
