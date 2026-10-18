import React, { useCallback, useEffect, useState } from 'react';
import {
  BadgeCheck,
  Building,
  Eye,
  EyeOff,
  Globe,
  LoaderCircle,
  MapPin,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  TriangleAlert,
  WifiOff,
  X,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import {
  createEmptyMapLocation,
  generateMapLocationId,
  mapLocationStore,
} from '../../services/mapLocationStore';
import { formatAdvisoryDateTime } from '../galiyat/advisoryFormat';
import type { AdminSession } from '../../services/adminAuth';
import type { MapCategory, MapLocation } from '../../types/map';

/* Shared console styling — mirrors RouteStatusAdmin. */
const inputClass =
  'w-full rounded-lg border border-brand-light-border bg-white px-3 py-2 text-sm text-brand-dark placeholder:text-brand-light-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue-200';

const labelClass = 'mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-brand-light-muted';

const iconButtonClass =
  'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-100 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue';

const dangerIconButtonClass = cn(
  iconButtonClass,
  'hover:border-red-200 hover:bg-red-50 hover:text-red-600'
);

const CATEGORY_OPTIONS: { value: MapCategory; label: string }[] = [
  { value: 'tourist', label: 'Tourist Attraction' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'fuel', label: 'Fuel Station' },
  { value: 'police', label: 'Police Assistance' },
  { value: 'facilitation', label: 'Facilitation Center' },
  { value: 'trail', label: 'Hiking Trail' },
];

/** Draft row used by the add + inline-edit forms. */
interface MapLocationDraft {
  name: string;
  category: MapCategory;
  latitude: string;
  longitude: string;
  description: string;
  address: string;
  contactNumber: string;
  imageUrl: string;
  googleMapsUrl: string;
  isVerified: boolean;
  isPublished: boolean;
}

function draftFromLocation(location: MapLocation): MapLocationDraft {
  return {
    name: location.name,
    category: location.category,
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    description: location.description ?? '',
    address: location.address ?? '',
    contactNumber: location.contactNumber ?? '',
    imageUrl: location.imageUrl ?? '',
    googleMapsUrl: location.googleMapsUrl ?? '',
    isVerified: location.isVerified,
    isPublished: location.isPublished,
  };
}

function emptyDraft(): MapLocationDraft {
  const blank = createEmptyMapLocation();
  return {
    ...draftFromLocation(blank),
    name: '',
    latitude: '',
    longitude: '',
  };
}

function parseCoordinate(value: string): number | null {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

function draftToLocation(draft: MapLocationDraft, email: string, existingId?: string): MapLocation {
  const nowIso = new Date().toISOString();
  const verifiedAt = draft.isVerified ? nowIso : null;

  return {
    ...createEmptyMapLocation(),
    id: existingId ?? generateMapLocationId(),
    name: draft.name.trim(),
    category: draft.category,
    latitude: parseCoordinate(draft.latitude) ?? 0,
    longitude: parseCoordinate(draft.longitude) ?? 0,
    description: draft.description.trim() || null,
    address: draft.address.trim() || null,
    contactNumber: draft.contactNumber.trim() || null,
    imageUrl: draft.imageUrl.trim() || null,
    googleMapsUrl: draft.googleMapsUrl.trim() || null,
    isVerified: draft.isVerified,
    lastVerifiedAt: verifiedAt,
    isPublished: draft.isPublished,
    createdBy: existingId ? undefined : email,
    updatedBy: email,
  };
}

/**
 * Map Locations management panel for the advisory dashboard.
 * Staff add/verify Abbottabad map locations manually; published records are
 * read by the public Tourist & Traffic Map page.
 */
export const MapLocationsAdmin: React.FC<{ session: AdminSession }> = ({ session }) => {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  // Add form
  const [draft, setDraft] = useState<MapLocationDraft>(emptyDraft);
  const [adding, setAdding] = useState(false);

  // Inline edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<MapLocationDraft>(emptyDraft);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await mapLocationStore.list();
      setLocations(rows);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Map locations could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 7000);
    return () => clearTimeout(timer);
  }, [notice]);

  /* ------------------------------- ACTIONS -------------------------------- */

  const patchDraft = (patch: Partial<MapLocationDraft>) => setDraft({ ...draft, ...patch });
  const patchEditDraft = (patch: Partial<MapLocationDraft>) => setEditDraft({ ...editDraft, ...patch });

  const validateDraft = (candidate: MapLocationDraft): string | null => {
    if (!candidate.name.trim()) return 'Place name is required.';
    if (parseCoordinate(candidate.latitude) === null || parseCoordinate(candidate.longitude) === null) {
      return 'Latitude and longitude must be valid numbers (e.g. 34.1688 and 73.2215).';
    }
    return null;
  };

  const handleAdd = async () => {
    const invalid = validateDraft(draft);
    if (invalid) {
      setError(invalid);
      return;
    }

    setAdding(true);
    setError(null);

    const location = draftToLocation(draft, session.email);

    try {
      await mapLocationStore.create(location);
      setNotice(
        `"${location.name}" added — ${location.isPublished ? 'visible on the map' : 'saved as draft (not yet published)'}.`
      );
      setDraft(emptyDraft());
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The map location could not be added.');
    } finally {
      setAdding(false);
    }
  };

  const openEdit = (location: MapLocation) => {
    setEditingId(location.id);
    setEditDraft(draftFromLocation(location));
  };

  const saveEdit = async (location: MapLocation) => {
    const invalid = validateDraft(editDraft);
    if (invalid) {
      setError(invalid);
      return;
    }

    setBusyId(location.id);
    setError(null);

    const updated = draftToLocation(editDraft, session.email, location.id);
    try {
      await mapLocationStore.update(location.id, {
        name: updated.name,
        category: updated.category,
        latitude: updated.latitude,
        longitude: updated.longitude,
        description: updated.description,
        address: updated.address,
        contactNumber: updated.contactNumber,
        imageUrl: updated.imageUrl,
        googleMapsUrl: updated.googleMapsUrl,
        isVerified: updated.isVerified,
        lastVerifiedAt: updated.lastVerifiedAt,
        isPublished: updated.isPublished,
        updatedBy: session.email,
      });
      setEditingId(null);
      setNotice(`"${updated.name}" updated.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The map location could not be updated.');
    } finally {
      setBusyId(null);
    }
  };

  const togglePublished = async (location: MapLocation) => {
    setBusyId(location.id);
    setError(null);
    try {
      await mapLocationStore.update(location.id, {
        isPublished: !location.isPublished,
        updatedBy: session.email,
      });
      setNotice(
        `"${location.name}" ${location.isPublished ? 'removed from the public map' : 'published on the public map'}.`
      );
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The map location could not be updated.');
    } finally {
      setBusyId(null);
    }
  };

  const removeLocation = async (id: string) => {
    setBusyId(id);
    setError(null);
    try {
      await mapLocationStore.remove(id);
      setPendingDelete(null);
      setNotice('Map location deleted.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The map location could not be deleted.');
    } finally {
      setBusyId(null);
    }
  };

  const publishedCount = locations.filter((location) => location.isPublished).length;
  const verifiedCount = locations.filter((location) => location.isVerified).length;

  /* -------------------- SHARED FORM FIELDS (add + edit) ------------------- */

  const renderDraftFields = (
    value: MapLocationDraft,
    onChange: (patch: Partial<MapLocationDraft>) => void
  ) => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <label className="block">
        <span className={labelClass}>Place name *</span>
        <input
          type="text"
          value={value.name}
          onChange={(event) => onChange({ name: event.target.value })}
          placeholder="e.g. Harno Family Park"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Category *</span>
        <select
          value={value.category}
          onChange={(event) => onChange({ category: event.target.value as MapCategory })}
          className={inputClass}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelClass}>Latitude *</span>
        <input
          type="text"
          inputMode="decimal"
          value={value.latitude}
          onChange={(event) => onChange({ latitude: event.target.value })}
          placeholder="e.g. 34.2233"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Longitude *</span>
        <input
          type="text"
          inputMode="decimal"
          value={value.longitude}
          onChange={(event) => onChange({ longitude: event.target.value })}
          placeholder="e.g. 73.1828"
          className={inputClass}
        />
      </label>

      <label className="block sm:col-span-2">
        <span className={labelClass}>Description</span>
        <input
          type="text"
          value={value.description}
          onChange={(event) => onChange({ description: event.target.value })}
          placeholder="Short public description of the place"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Address / locality</span>
        <input
          type="text"
          value={value.address}
          onChange={(event) => onChange({ address: event.target.value })}
          placeholder="e.g. Harno, Abbottabad"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Contact number (only if verified)</span>
        <input
          type="text"
          value={value.contactNumber}
          onChange={(event) => onChange({ contactNumber: event.target.value })}
          placeholder="e.g. 1915"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Image URL</span>
        <input
          type="text"
          value={value.imageUrl}
          onChange={(event) => onChange({ imageUrl: event.target.value })}
          placeholder="https://…"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Google Maps URL</span>
        <input
          type="text"
          value={value.googleMapsUrl}
          onChange={(event) => onChange({ googleMapsUrl: event.target.value })}
          placeholder="https://maps.google.com/…"
          className={inputClass}
        />
      </label>

      <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
        <label className="flex items-center gap-2 text-sm text-brand-dark">
          <input
            type="checkbox"
            checked={value.isVerified}
            onChange={(event) => onChange({ isVerified: event.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
          />
          <span className="font-semibold">Verified by Traffic Police</span>
          <span className="text-xs text-brand-light-muted">(coordinates checked first-hand)</span>
        </label>

        <label className="flex items-center gap-2 text-sm text-brand-dark">
          <input
            type="checkbox"
            checked={value.isPublished}
            onChange={(event) => onChange({ isPublished: event.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
          />
          <span className="font-semibold">Published on the public map</span>
        </label>
      </div>
    </div>
  );

  const renderFormActions = (
    primaryLabel: string,
    onPrimary: () => void,
    busy: boolean,
    onCancel?: () => void
  ) => (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <Button variant="primary" onClick={onPrimary} disabled={busy}>
        {primaryLabel}
      </Button>
      {onCancel && (
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={busy}>
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Cancel
        </Button>
      )}
      <p className="flex items-center gap-1 text-[11px] text-brand-light-muted">
        <MapPin className="h-3 w-3" aria-hidden="true" />
        Tip: pick coordinates from Google Maps (right-click → copy coordinates: lat, lng).
      </p>
    </div>
  );

  /* -------------------------------- RENDER -------------------------------- */

  return (
    <>
      {/* Page heading */}
      <div className="flex flex-col gap-4 border-b border-brand-light-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold uppercase tracking-tight text-brand-dark sm:text-2xl">
            Map Locations
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-brand-light-muted">
            Add places for the Abbottabad Tourist &amp; Traffic Map — attractions, hotels, fuel
            stations, facilitation centers and trails. Only published records appear on the public
            map; verified ones show a blue confirmation ring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-xs text-brand-light-muted">
            {locations.length} records · {publishedCount} published · {verifiedCount} verified
          </span>
          <Button
            variant="secondary"
            onClick={() => void load()}
            disabled={loading}
            leftIcon={
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} aria-hidden="true" />
            }
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-lg border border-red-200 border-s-4 border-s-red-500 bg-red-50 p-3.5"
        >
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
          <p className="min-w-0 break-words text-sm text-red-800">{error}</p>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="mt-5 rounded-lg border border-emerald-200 border-s-4 border-s-emerald-500 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-900"
        >
          {notice}
        </div>
      )}

      {!isSupabaseConfigured && (
        <div className="mt-5 flex items-center gap-3 rounded-lg border border-amber-200 border-s-4 border-s-amber-500 bg-amber-50 p-3.5">
          <WifiOff className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="text-sm text-amber-900">
            Supabase is not configured — map locations are saved in this browser only.
          </p>
        </div>
      )}

      {/* Add location */}
      <section
        className="mt-6 rounded-lg border border-brand-light-border bg-white shadow-sm"
        aria-label="Add a map location"
      >
        <div className="p-4 sm:p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-dark">
            <Plus className="h-4 w-4 text-brand-blue" aria-hidden="true" />
            Add a map location
          </h2>
          <div className="mt-4">{renderDraftFields(draft, patchDraft)}</div>
          {renderFormActions('Add location', () => void handleAdd(), adding)}
        </div>
      </section>

      {/* Records list */}
      <section className="mt-6" aria-label="Map location records">
        <h2 className="text-sm font-bold uppercase tracking-wider text-brand-dark">Location records</h2>
        <p className="mt-0.5 text-xs text-brand-light-muted">
          {loading
            ? 'Loading…'
            : locations.length === 0
              ? 'No map locations yet — add the first one above.'
              : `${locations.length} record${locations.length === 1 ? '' : 's'} · changes appear on the public map after save.`}
        </p>

        {loading && locations.length === 0 && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-brand-light-border bg-white p-4 text-sm text-brand-light-muted">
            <LoaderCircle className="h-4 w-4 animate-spin text-brand-blue" aria-hidden="true" />
            Loading map locations…
          </div>
        )}

        <ul className="mt-3 space-y-3">
          {locations.map((location) => {
            const isBusy = busyId === location.id;
            const isEditing = editingId === location.id;

            return (
              <li
                key={location.id}
                className={cn(
                  'rounded-lg border border-brand-light-border bg-white p-4 shadow-sm',
                  !location.isPublished && 'border-s-4 border-s-slate-400 opacity-90',
                  location.isPublished && location.isVerified && 'border-s-4 border-s-brand-blue-600',
                  location.isPublished && !location.isVerified && 'border-s-4 border-s-amber-500'
                )}
              >
                {isEditing ? (
                  /* ------------------------------ EDIT MODE ------------------------------ */
                  <div>
                    {renderDraftFields(editDraft, patchEditDraft)}
                    {renderFormActions(
                      'Save changes',
                      () => void saveEdit(location),
                      isBusy,
                      () => setEditingId(null)
                    )}
                  </div>
                ) : (
                  /* ------------------------------ READ MODE ------------------------------ */
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-brand-dark">
                        <Building className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                        <span>{location.name}</span>
                        {location.isVerified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue-50 px-2 py-0.5 text-[10px] font-bold text-brand-blue-700">
                            <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                            Verified
                          </span>
                        )}
                        {!location.isPublished && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                            Draft (not published)
                          </span>
                        )}
                        {location.isPublished && !location.isVerified && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                            Approximate
                          </span>
                        )}
                      </p>

                      <p className="mt-1 text-xs text-brand-light-muted">
                        {CATEGORY_OPTIONS.find((option) => option.value === location.category)?.label} ·{' '}
                        <span className="tabular-nums">
                          {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
                        </span>
                      </p>

                      {location.description && (
                        <p className="mt-1 text-xs text-brand-light-muted">{location.description}</p>
                      )}

                      {location.contactNumber && (
                        <p className="mt-1 text-xs text-brand-light-muted">
                          Contact: {location.contactNumber}
                        </p>
                      )}

                      {location.googleMapsUrl && (
                        <a
                          href={location.googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue"
                        >
                          <Globe className="h-3 w-3" aria-hidden="true" />
                          Google Maps link
                        </a>
                      )}

                      <p className="mt-1 text-[11px] text-brand-light-muted">
                        {location.lastVerifiedAt ? (
                          <bdi>Verified {formatAdvisoryDateTime(location.lastVerifiedAt)}</bdi>
                        ) : (
                          'Not verified yet'
                        )}
                        {location.updatedBy ? ` · ${location.updatedBy}` : ''}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2 ms-auto">
                      {isBusy && (
                        <LoaderCircle className="h-4 w-4 animate-spin text-brand-blue" aria-hidden="true" />
                      )}

                      <button
                        type="button"
                        onClick={() => void togglePublished(location)}
                        title={location.isPublished ? 'Unpublish' : 'Publish'}
                        aria-label={location.isPublished ? `Unpublish ${location.name}` : `Publish ${location.name}`}
                        className={iconButtonClass}
                      >
                        {location.isPublished ? (
                          <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => openEdit(location)}
                        title="Edit location"
                        aria-label={`Edit ${location.name}`}
                        className={iconButtonClass}
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>

                      {pendingDelete === location.id ? (
                        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5">
                          <span className="text-[11px] font-bold text-red-800">Delete?</span>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => void removeLocation(location.id)}
                            className="text-[11px] font-bold text-red-700 underline underline-offset-2 hover:text-red-900"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingDelete(null)}
                            className="text-[11px] font-semibold text-slate-500 hover:text-slate-700"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPendingDelete(location.id)}
                          title="Delete location"
                          aria-label={`Delete ${location.name}`}
                          className={dangerIconButtonClass}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default MapLocationsAdmin;
