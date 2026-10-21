import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  AlertTriangle,
  Car,
  ChevronRight,
  Clock,
  CloudOff,
  Gauge,
  Hash,
  List,
  LoaderCircle,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  RefreshCw,
  Route,
  Timer,
  Trash2,
  TriangleAlert,
  User,
  Users,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../services/supabaseClient';
import { cn } from '../../lib/utils';
import type { AdminSession } from '../../services/adminAuth';

/**
 * Tourist Location Tracking — admin section
 * =========================================
 *
 * Live map + session list for the "Track Your Location" service, shown to
 * authorized officers inside the existing /admin dashboard (same sign-in gate
 * as the advisory console). Officers read SESSIONS and LOCATIONS directly —
 * the database only answers to accounts listed in `public.advisory_staff`.
 *
 * Refresh strategy: polling every 15 s (suspended while the tab is hidden,
 * immediate catch-up when it becomes visible). "Last updated" is always shown.
 *
 * Status honesty rules:
 *   • "Live"      → session active, not expired, and a fresh fix ≤ 10 min old.
 *   • "Stale"     → session still in its window but NO fix in the last 10 min
 *                   (device offline / browser closed / GPS lost) — never
 *                   reported as live.
 *   • "Expired"   → past `expires_at` (the server-set retention window, now
 *                   3 days — there is no shorter tourist-facing cap).
 *   • "Stopped"   → the tourist pressed Stop.
 */

/* -------------------------------------------------------------------------- */
/*                                  models                                    */
/* -------------------------------------------------------------------------- */

interface SessionRow {
  id: string;
  full_name: string;
  phone_number: string;
  vehicle_number: string | null;
  group_size: number;
  consent_timestamp: string | null;
  started_at: string;
  expires_at: string;
  stopped_at: string | null;
  status: string;
  created_at: string;
}

interface LocationRow {
  session_id: string;
  latitude: number;
  longitude: number;
  accuracy_meters: number | null;
  recorded_at: string;
}

type SessionStatus = 'live' | 'stale' | 'stopped' | 'expired' | 'no_fix';

interface SessionView {
  id: string;
  fullName: string;
  phoneNumber: string;
  vehicleNumber: string | null;
  groupSize: number;
  startedAt: string;
  expiresAt: string;
  stoppedAt: string | null;
  status: string;
  latest: LocationRow | null;
  pointCount: number;
  computed: SessionStatus;
}

const STALE_AFTER_MS = 10 * 60 * 1000;
const POLL_MS = 15_000;
const MAX_SESSIONS = 300;
const MAX_ROUTE_POINTS = 2_000;

/* -------------------------------------------------------------------------- */
/*                          status + presentation                             */
/* -------------------------------------------------------------------------- */

function effectiveStatus(row: SessionRow, latest: LocationRow | null): SessionStatus {
  if (row.status === 'stopped') return 'stopped';
  if (new Date(row.expires_at).getTime() <= Date.now()) return 'expired';

  if (!latest) {
    // In its window but never uploaded a fix → cannot honestly say "live".
    return new Date(row.started_at).getTime() <= Date.now() - STALE_AFTER_MS ? 'stale' : 'live';
  }
  const age = Date.now() - new Date(latest.recorded_at).getTime();
  return age <= STALE_AFTER_MS ? 'live' : 'stale';
}

const STATUS_META: Record<SessionStatus, { label: string; dot: string; chip: string; color: string }> = {
  live: {
    label: 'Live',
    dot: 'bg-emerald-500',
    chip: 'border-emerald-300 bg-emerald-50 text-emerald-700',
    color: '#059669',
  },
  stale: {
    label: 'Stale / Offline',
    dot: 'bg-amber-500',
    chip: 'border-amber-300 bg-amber-50 text-amber-800',
    color: '#d97706',
  },
  stopped: {
    label: 'Stopped',
    dot: 'bg-slate-400',
    chip: 'border-slate-300 bg-slate-100 text-slate-600',
    color: '#475569',
  },
  expired: {
    label: 'Expired',
    dot: 'bg-red-400',
    chip: 'border-red-300 bg-red-50 text-red-700',
    color: '#b91c1c',
  },
  no_fix: {
    label: 'No fix yet',
    dot: 'bg-amber-400',
    chip: 'border-amber-300 bg-amber-50 text-amber-800',
    color: '#f59e0b',
  },
};

type StatusFilter = 'all' | SessionStatus;

const FILTERS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live' },
  { id: 'stale', label: 'Stale / Offline' },
  { id: 'stopped', label: 'Stopped' },
  { id: 'expired', label: 'Expired' },
];

const STATUS_ORDER: Record<SessionStatus, number> = {
  live: 0,
  stale: 1,
  stopped: 2,
  no_fix: 3,
  expired: 4,
};

function fmtTime(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function fmtClock(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

/* -------------------------------------------------------------------------- */
/*                              map marker icon                               */
/* -------------------------------------------------------------------------- */

function touristIcon(initials: string, color: string, isSelected: boolean): L.DivIcon {
  const size = isSelected ? 34 : 28;
  return L.divIcon({
    className: 'tpa-tourist-marker',
    html:
      `<span style="display:flex;align-items:center;justify-content:center;">` +
      `<span style="width:${size}px;height:${size}px;border-radius:9999px;background:${color};` +
      `border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.4);color:#fff;` +
      `display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;` +
      `font-family:sans-serif;">${initials}</span></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

/* -------------------------------------------------------------------------- */
/*                                component                                   */
/* -------------------------------------------------------------------------- */

export const TouristTrackingAdmin: React.FC<{ session: AdminSession }> = () => {
  const [sessions, setSessions] = useState<SessionView[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [filter, setFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [routePoints, setRoutePoints] = useState<LocationRow[] | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRefsRef = useRef<Map<string, L.Marker>>(new Map());
  const sessionsRef = useRef<SessionView[]>([]);

  /* ------------------------------- data loading ---------------------------- */

  const load = useCallback(async () => {
    if (!supabase) return;
    setRefreshing(true);
    try {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      const [sessionsResult, locationsResult] = await Promise.all([
        supabase
          .from('tracking_sessions')
          .select('*')
          .order('started_at', { ascending: false })
          .limit(MAX_SESSIONS),
        supabase
          .from('location_history')
          .select('session_id, latitude, longitude, accuracy_meters, recorded_at')
          .gte('recorded_at', since)
          .order('recorded_at', { ascending: false })
          .limit(5_000),
      ]);

      if (sessionsResult.error) throw sessionsResult.error;
      if (locationsResult.error) throw locationsResult.error;

      const rows = (sessionsResult.data ?? []) as SessionRow[];
      const locs = (locationsResult.data ?? []) as LocationRow[];

      const latestBy = new Map<string, LocationRow>();
      const countBy = new Map<string, number>();
      locs.forEach((loc) => {
        countBy.set(loc.session_id, (countBy.get(loc.session_id) ?? 0) + 1);
        if (!latestBy.has(loc.session_id)) latestBy.set(loc.session_id, loc); // desc order → first is newest
      });

      const views: SessionView[] = rows.map((row) => {
        const latest = latestBy.get(row.id) ?? null;
        let computed = effectiveStatus(row, latest);
        if (computed === 'live' && !latest) computed = 'no_fix';
        return {
          id: row.id,
          fullName: row.full_name,
          phoneNumber: row.phone_number,
          vehicleNumber: row.vehicle_number ?? null,
          groupSize: row.group_size,
          startedAt: row.started_at,
          expiresAt: row.expires_at,
          stoppedAt: row.stopped_at,
          status: row.status,
          latest,
          pointCount: countBy.get(row.id) ?? 0,
          computed,
        };
      });

      sessionsRef.current = views;
      setSessions(views);
      setLastUpdated(new Date().toISOString());
      setLoadError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Tracking data could not be loaded.';
      if (message.toLowerCase().includes('row-level security') || message.toLowerCase().includes('permission')) {
        setLoadError(
          'Access denied. This account is not in the advisory staff list. In Supabase, add the email to public.advisory_staff (see supabase/README.md).'
        );
      } else {
        setLoadError(message);
      }
      setSessions((current) => current ?? []); // keep prior data visible alongside the error
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') void load();
    }, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible') void load();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [load]);

  /* ------------------------------- helpers -------------------------------- */

  function statusHtmlLabel(s: SessionView): string {
    if (s.computed === 'live') return `Live · accuracy ±${Math.round(s.latest?.accuracy_meters ?? 0)} m`;
    if (s.computed === 'no_fix') return 'Waiting for first fix';
    if (s.computed === 'stale') return 'Stale — no fix in the last 10 minutes';
    return STATUS_META[s.computed].label;
  }

  function escapeHtml(text: string): string {
    return text.replace(/[&<>"']/g, (ch) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] ?? ch
    ));
  }

  function hashOffset(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash * 31 + seed.charCodeAt(i)) % 997;
    }
    return ((hash % 100) - 50) / 1000; // tiny deterministic jitter around the city centre
  }

  /* ----------------------------- derived lists ----------------------------- */

  const counts = useMemo(() => {
    const base: Record<StatusFilter, number> = { all: 0, live: 0, stale: 0, stopped: 0, expired: 0, no_fix: 0 };
    (sessions ?? []).forEach((s) => {
      base.all += 1;
      if (s.computed === 'no_fix') base.live += 1;
      else base[s.computed] += 1;
    });
    return base;
  }, [sessions]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (sessions ?? [])
      .filter((s) => {
        if (filter !== 'all') {
          if (filter === 'live') return s.computed === 'live' || s.computed === 'no_fix';
          return s.computed === filter;
        }
        return true;
      })
      .filter((s) => {
        if (!query) return true;
        return (
          s.fullName.toLowerCase().includes(query) ||
          s.phoneNumber.includes(query) ||
          s.id.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        const byStatus = STATUS_ORDER[a.computed] - STATUS_ORDER[b.computed];
        if (byStatus !== 0) return byStatus;
        return b.startedAt.localeCompare(a.startedAt);
      });
  }, [sessions, filter, search]);

  const selected = useMemo(
    () => (sessions ?? []).find((s) => s.id === selectedId) ?? null,
    [sessions, selectedId]
  );

  /* --------------------------- route history load -------------------------- */

  const selectedRouteId = selected?.id ?? null;

  useEffect(() => {
    setRoutePoints(null);
    setRouteError(null);
    if (!selectedRouteId || !supabase) return;
    let cancelled = false;
    setRouteLoading(true);

    /* Two-part fetch so the line ALWAYS spans start → end, no matter how many
       points the session has (Supabase caps queries at ~1000 rows silently).
       Part A: oldest points ascending; Part B: newest points, fetched
       descending then reversed to ascending. */
    const fields = 'session_id, latitude, longitude, accuracy_meters, recorded_at';
    void Promise.all([
      supabase.from('location_history').select(fields).eq('session_id', selectedRouteId)
        .order('recorded_at', { ascending: true }).limit(MAX_ROUTE_POINTS / 2),
      supabase.from('location_history').select(fields).eq('session_id', selectedRouteId)
        .order('recorded_at', { ascending: false }).limit(MAX_ROUTE_POINTS / 2),
    ]).then(([startRes, endRes]) => {
      if (cancelled) return;
      setRouteLoading(false);
      if (startRes.error) setRouteError(startRes.error.message);
      else if (endRes.error) setRouteError(endRes.error.message);
      else {
        const oldest = (startRes.data ?? []) as LocationRow[]; // ascending
        const newest = ((endRes.data ?? []) as LocationRow[]).slice().reverse(); // → ascending
        if (oldest.length < MAX_ROUTE_POINTS / 2) {
          // Short session: the two halves are the same rows — the oldest slice
          // alone already spans start → end (it IS the whole route).
          setRoutePoints(oldest);
          return;
        }
        // Merge, dropping duplicates where the halves overlap.
        const seen = new Set<string>();
        const merged: LocationRow[] = [];
        for (const p of [...oldest, ...newest]) {
          const key = `${p.recorded_at}|${p.latitude}|${p.longitude}`;
          if (seen.has(key)) continue;
          seen.add(key);
          merged.push(p);
        }
        setRoutePoints(merged);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [selectedRouteId]);

  /* --------------------------- session deletion ----------------------------- */

  const [confirmId, setConfirmId] = useState<string | null>(null);

  /* In-UI two-step confirm (some preview browsers silently block window.confirm,
     which made the delete button look dead). First click arms, second deletes. */
  useEffect(() => {
    if (!confirmId) return;
    const timer = setTimeout(() => setConfirmId(null), 5_000);
    return () => clearTimeout(timer);
  }, [confirmId]);

  const deleteSession = useCallback(async (target: SessionView) => {
    if (!supabase || deletingId) return;
    setConfirmId(null);
    setDeleteError(null);

    setDeletingId(target.id);
    const { error } = await supabase
      .from('tracking_sessions')
      .delete({ count: 'exact' })
      .eq('id', target.id);

    if (error) {
      setDeletingId(null);
      const message = error.message.toLowerCase();
      setDeleteError(
        message.includes('row-level security') || message.includes('permission')
          ? 'Delete denied by the database. Run supabase/updates-08-staff-delete-tracking.sql in the Supabase SQL editor, then refresh this page.'
          : `Session could not be deleted: ${error.message}`
      );
      return;
    }

    // RLS quirk: with no DELETE policy the database reports success but
    // deletes nothing (0 rows). Detect that honestly through a re-read.
    const { data: stillThere, error: recheckError } = await supabase
      .from('tracking_sessions')
      .select('id')
      .eq('id', target.id)
      .limit(1);
    setDeletingId(null);

    if (recheckError) {
      setDeleteError(`Delete could not be confirmed: ${recheckError.message}`);
      return;
    }
    if (stillThere && stillThere.length > 0) {
      setDeleteError(
        'The database accepted the request but the session still exists — the staff DELETE policy is missing. Run supabase/updates-08-staff-delete-tracking.sql in the Supabase SQL editor, then refresh and try again.'
      );
      return;
    }

    setSelectedId((current) => (current === target.id ? null : current));
    await load();
  }, [deletingId, load]);

  /* --------------------------------- the map -------------------------------- */

  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const didFitRef = useRef(false);

  useEffect(() => {
    if (mapRef.current || !mapDivRef.current) return;
    const map = L.map(mapDivRef.current, {
      center: [34.157, 73.221], // Abbottabad
      zoom: 11,
      scrollWheelZoom: true,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    routeLayerRef.current = L.layerGroup().addTo(map); // routes render under markers
    markerLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      routeLayerRef.current = null;
      markerRefsRef.current = new Map();
    };
  }, []);

  /* Rebuild markers whenever sessions change. */
  useEffect(() => {
    const layer = markerLayerRef.current;
    const map = mapRef.current;
    if (!layer || !map) return;
    layer.clearLayers();
    markerRefsRef.current = new Map();

    (sessions ?? []).forEach((s) => {
      const position: L.LatLngExpression = s.latest
        ? [s.latest.latitude, s.latest.longitude]
        : [34.157 + hashOffset(s.id), 73.221 + hashOffset(s.id.split('').reverse().join(''))];
      const isSelected = s.id === selectedId;
      const meta = STATUS_META[s.computed];
      const initials = s.fullName.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';

      const marker = L.marker(position as L.LatLngExpression, {
        icon: touristIcon(initials, meta.color, isSelected),
        title: `${s.fullName} — ${meta.label}`,
        opacity: isSelected ? 1 : 0.9,
      });
      marker.bindPopup(
        `<div style="font-family:inherit;min-width:180px">` +
          `<div style="font-weight:800;color:#111">${escapeHtml(s.fullName)}</div>` +
          `<div style="font-size:11px;color:#444;margin-top:2px">${escapeHtml(statusHtmlLabel(s))}</div>` +
          `<div style="font-size:11px;color:#444">Last fix: ${escapeHtml(fmtTime(s.latest?.recorded_at ?? null))}</div>` +
        `</div>`
      );
      marker.on('click', () => {
        setSelectedId(s.id);
      });
      marker.addTo(layer);
      markerRefsRef.current.set(s.id, marker);
    });

    // Frame all markers the first time data arrives; afterwards keep the view
    // exactly where officers left it (no auto-rezoom while polling).
    const points = (sessions ?? [])
      .filter((s) => s.latest)
      .map((s) => [s.latest!.latitude, s.latest!.longitude] as L.LatLngExpression);
    if (points.length > 0 && !didFitRef.current) {
      didFitRef.current = true;
      if (points.length === 1) map.setView(points[0], 15);
      else map.fitBounds(L.latLngBounds(points).pad(0.25));
    }
  }, [sessions, selectedId]);

  /* Selected session's namesake pops open. */
  useEffect(() => {
    if (!selectedId) return;
    markerRefsRef.current.get(selectedId)?.openPopup();
  }, [selectedId, sessions]);

  /* Route polyline. */
  useEffect(() => {
    const layer = routeLayerRef.current;
    if (!layer) return;
    layer.clearLayers();
    if (!routePoints || routePoints.length === 0) return;
    const latLngs = routePoints.map((p) => [p.latitude, p.longitude] as L.LatLngExpression);
    // White casing under the blue line so the travel path stays readable
    // over roads, terrain and other session colours.
    L.polyline(latLngs, { color: '#ffffff', weight: 6, opacity: 0.8 }).addTo(layer);
    L.polyline(latLngs, { color: '#1d4ed8', weight: 3, opacity: 0.9 }).addTo(layer);
    // Explicit start-of-route marker (the latest position already has the
    // session's coloured marker, so line's other end stays clear).
    L.circleMarker(latLngs[0] as L.LatLngTuple, {
      radius: 6,
      color: '#ffffff',
      weight: 2,
      fillColor: '#059669',
      fillOpacity: 1,
    }).bindTooltip('Start of route', { direction: 'top', offset: [0, -8] }).addTo(layer);
    const map = mapRef.current;
    if (map && selectedId) {
      map.fitBounds(L.latLngBounds(latLngs).pad(0.25));
    }
  }, [routePoints, selectedId]);

  /* --------------------------------- render -------------------------------- */

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-brand-light-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold uppercase tracking-tight text-brand-dark sm:text-2xl">
            Tourist Location Tracking
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-brand-light-muted">
            Authorized live view of "Track Your Location" tourism-safety sessions. Personal data is shown only to
            officers in the staff list and auto-deletes after 3 days.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-xs text-brand-light-muted">
            Last updated: <span className="font-semibold text-brand-dark">{lastUpdated ? fmtClock(lastUpdated) : '—'}</span>
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => void load()}
            disabled={refreshing}
            leftIcon={refreshing ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <RefreshCw className="h-4 w-4" aria-hidden="true" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {loadError && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{loadError}</span>
        </div>
      )}

      {deleteError && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          <Trash2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{deleteError}</span>
        </div>
      )}

      {/* Summary chips */}
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors',
              filter === f.id
                ? 'border-brand-blue bg-[#000080] text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-brand-blue-300 hover:text-brand-dark'
            )}
          >
            <span className={cn('h-2 w-2 rounded-full', f.id === 'all' ? 'bg-slate-400' : STATUS_META[f.id as SessionStatus].dot)} />
            {f.label}
            <span className="tabular-nums opacity-70">{counts[f.id]}</span>
          </button>
        ))}
      </div>

      {/* Full-width live map on top */}
      <div>
        <div className="relative h-[420px] overflow-hidden rounded-xl border border-slate-200 shadow-gov md:h-[560px] lg:h-[700px]">
          <div ref={mapDivRef} className="h-full w-full" role="application" aria-label="Tourist tracking map" />
          {sessions === null && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/85">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Loading sessions…
              </div>
            </div>
          )}
          {sessions !== null && sessions.length === 0 && !loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/85">
              <div className="max-w-xs text-center">
                <MapPin className="mx-auto mb-2 h-8 w-8 text-slate-300" aria-hidden="true" />
                <p className="text-sm font-bold text-brand-dark">No tracking sessions yet</p>
                <p className="mt-1 text-xs text-slate-500">
                  Tourist sessions appear here automatically once registered on the public page.
                </p>
              </div>
            </div>
          )}
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
          Markers show the newest GPS fix per session. A marker is never shown as live while its readings are
          older than 10 minutes — those sessions are listed as Stale/Offline.
        </p>
      </div>

      {/* Search + session list + details below the map */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone or session ID…"
            aria-label="Search tracking sessions"
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <div className="max-h-[340px] space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-gov">
          {sessions !== null && filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-slate-500">
              {search ? 'No sessions match this search.' : 'No sessions in this filter.'}
            </p>
          )}
          {filtered.map((s) => (
            <div
              key={s.id}
              className={cn(
                'flex items-stretch gap-1.5 rounded-lg border transition-colors',
                s.id === selectedId
                  ? 'border-brand-blue bg-brand-blue-50'
                  : 'border-slate-200 bg-white hover:border-brand-blue-300 hover:bg-slate-50'
              )}
            >
              <button
                type="button"
                onClick={() => setSelectedId(s.id)}
                className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-start"
              >
                <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', STATUS_META[s.computed].dot)} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-brand-dark">{s.fullName}</span>
                  <span className="block truncate text-xs text-slate-500">
                    {s.phoneNumber} · {s.groupSize} {s.groupSize === 1 ? 'person' : 'people'}
                  </span>
                </span>
                <span className="shrink-0 text-end">
                  <span className={cn('inline-block rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide', STATUS_META[s.computed].chip)}>
                    {s.computed === 'no_fix' ? 'No fix' : STATUS_META[s.computed].label}
                  </span>
                  <span className="block text-[10px] text-slate-400">{fmtTime(s.latest?.recorded_at ?? null)}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => (confirmId === s.id ? void deleteSession(s) : setConfirmId(s.id))}
                disabled={deletingId === s.id}
                title={confirmId === s.id ? 'Click again to permanently delete' : 'Delete this session (removes its GPS history too)'}
                aria-label={
                  confirmId === s.id
                    ? `Click again to permanently delete the session for ${s.fullName}`
                    : `Delete session for ${s.fullName}`
                }
                className={
                  cn(
                    'my-1.5 mr-1.5 flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-bold transition-colors',
                    confirmId === s.id
                      ? 'border-red-300 bg-red-100 text-red-700'
                      : 'border-transparent px-2 text-slate-300 hover:bg-red-50 hover:text-red-600',
                    'disabled:cursor-wait disabled:opacity-50'
                  )
                }
              >
                {deletingId === s.id ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : confirmId === s.id ? (
                  <>Sure?</>
                ) : (
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Selected tourist detail panel */}
        {selected && (
          <section aria-label="Selected tourist details" className="rounded-xl border border-brand-blue-200 bg-white p-4 shadow-gov">
          <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-base font-extrabold text-brand-dark">
              <User className="h-4 w-4 text-brand-blue" aria-hidden="true" />
              {selected.fullName}
            </h2>
            <div className="flex items-center gap-2">
              <span className={cn('rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', STATUS_META[selected.computed].chip)}>
                {selected.computed === 'no_fix' ? 'No fix yet' : STATUS_META[selected.computed].label}
              </span>
              <button
                type="button"
                onClick={() => (confirmId === selected.id ? void deleteSession(selected) : setConfirmId(selected.id))}
                disabled={deletingId === selected.id}
                title={confirmId === selected.id ? 'Click again to permanently delete' : 'Delete this session (removes its GPS history too)'}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-bold transition-colors',
                  confirmId === selected.id
                    ? 'border-red-400 bg-red-600 text-white hover:bg-red-700'
                    : 'border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700',
                  'disabled:cursor-wait disabled:opacity-50'
                )}
              >
                {deletingId === selected.id ? (
                  <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {confirmId === selected.id ? 'Sure? Click again' : 'Delete'}
              </button>
            </div>
          </header>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:grid-cols-3 lg:grid-cols-4">
            <Detail icon={<Phone className="h-3.5 w-3.5" />} label="Mobile number">
              <span dir="ltr" className="tabular-nums">{selected.phoneNumber}</span>
            </Detail>
            <Detail icon={<Car className="h-3.5 w-3.5" />} label="Vehicle">
              <span dir="ltr" className="tabular-nums">{selected.vehicleNumber ?? '—'}</span>
            </Detail>
            <Detail icon={<Users className="h-3.5 w-3.5" />} label="Group size">
              {selected.groupSize} {selected.groupSize === 1 ? 'person' : 'people'}
            </Detail>
            <Detail icon={<Hash className="h-3.5 w-3.5" />} label="Session ID">
              <span className="break-all font-mono text-[10px]">{selected.id}</span>
            </Detail>
            <Detail icon={<Clock className="h-3.5 w-3.5" />} label="Started">
              {fmtTime(selected.startedAt)}
            </Detail>
            <Detail icon={<Timer className="h-3.5 w-3.5" />} label={selected.computed === 'stopped' ? 'Stopped' : 'Expiry'}>
              {fmtTime(selected.computed === 'stopped' ? selected.stoppedAt : selected.expiresAt)}
            </Detail>
            <Detail icon={<LocateFixed className="h-3.5 w-3.5" />} label="Last GPS update">
              {fmtClock(selected.latest?.recorded_at ?? null)}
            </Detail>
            <Detail icon={<Gauge className="h-3.5 w-3.5" />} label="GPS accuracy">
              {selected.latest?.accuracy_meters != null ? `± ${Math.round(selected.latest.accuracy_meters)} m` : '—'}
            </Detail>
            <Detail icon={<MapPin className="h-3.5 w-3.5" />} label="Last coordinates">
              {selected.latest
                ? <span className="tabular-nums">{selected.latest.latitude.toFixed(5)}, {selected.latest.longitude.toFixed(5)}</span>
                : '—'}
            </Detail>
            <Detail icon={<Route className="h-3.5 w-3.5" />} label="Points stored (24h)">
              {selected.pointCount}
            </Detail>
            <Detail icon={selected.computed === 'stale' ? <CloudOff className="h-3.5 w-3.5" /> : <Navigation className="h-3.5 w-3.5" />} label="Status note">
              {selected.computed === 'stale'
                ? 'No fix in ≥ 10 min — device may be offline'
                : selected.computed === 'expired'
                  ? 'Session window ended'
                  : selected.computed === 'stopped'
                    ? 'Tourist stopped sharing'
                    : selected.computed === 'no_fix'
                      ? 'No fix received yet in this window'
                      : 'Receiving updates'}
            </Detail>
          </dl>

          {selected.computed === 'stale' && (
            <p className="mt-3 flex items-start gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Shown as stale, not live: the tourist's device may be offline, the browser closed, or GPS blocked. If urgent, call the tourist.
            </p>
          )}

          <div className="mt-4 border-t border-slate-100 pt-3">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-brand-dark">
              <Route className="h-3.5 w-3.5" aria-hidden="true" /> Recorded route history
            </p>
            {routeLoading && (
              <p className="flex items-center gap-2 text-xs text-slate-500">
                <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Loading route…
              </p>
            )}
            {routeError && (
              <p className="text-xs text-red-600">{routeError}</p>
            )}
            {!routeLoading && !routeError && routePoints !== null && routePoints.length === 0 && (
              <p className="text-xs text-slate-500">
                No route recorded yet for this session (it has not uploaded any GPS point in its current window).
              </p>
            )}
            {!routeLoading && !routeError && routePoints !== null && routePoints.length > 0 && (
              <p className="text-xs text-slate-500">
                {routePoints.length} point{routePoints.length === 1 ? '' : 's'} drawn on the map ({fmtTime(routePoints[0]?.recorded_at ?? null)} → {fmtTime(routePoints[routePoints.length - 1]?.recorded_at ?? null)}).
              </p>
            )}
          </div>
        </section>
      )}

      {!selected && sessions !== null && filtered.length > 0 && (
        <p className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-xs text-slate-500">
          <List className="h-4 w-4" aria-hidden="true" /> Select a session above (or a marker on the map) to view its details and route history.
        </p>
      )}
      </div>
    </>
  );
};

/* ------------------------------ small pieces ------------------------------- */

const Detail: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode }> = ({ icon, label, children }) => (
  <div className="min-w-0">
    <dt className="flex items-center gap-1.5 font-bold uppercase tracking-wide text-slate-400">
      {icon} {label}
    </dt>
    <dd className="mt-0.5 break-words text-brand-dark">{children}</dd>
  </div>
);

export default TouristTrackingAdmin;
