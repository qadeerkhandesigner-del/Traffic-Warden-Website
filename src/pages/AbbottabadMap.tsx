import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import {
  Building,
  ExternalLink,
  Footprints,
  Fuel,
  Hotel,
  Loader2,
  MapPin,
  Navigation,
  RotateCcw,
  ShieldCheck,
  Star,
  Utensils,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import { cn } from '../lib/utils';
import { mapLocationStore } from '../services/mapLocationStore';
import {
  MAP_BOUNDS,
  MAP_CATEGORIES,
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  getMapCategoryMeta,
} from '../data/mapLocations';
import type { Feature as GeoJsonFeature, GeoJsonObject } from 'geojson';
import type { MapCategory, MapLocation } from '../types/map';

/* -------------------------------------------------------------------------- */
/*                              STATIC MARKER ART                             */
/* -------------------------------------------------------------------------- */

const CATEGORY_ICONS: Record<MapCategory, React.ReactNode> = {
  tourist: <Star className="h-3.5 w-3.5" aria-hidden="true" />,
  hotel: <Hotel className="h-3.5 w-3.5" aria-hidden="true" />,
  restaurant: <Utensils className="h-3.5 w-3.5" aria-hidden="true" />,
  fuel: <Fuel className="h-3.5 w-3.5" aria-hidden="true" />,
  police: <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />,
  facilitation: <Building className="h-3.5 w-3.5" aria-hidden="true" />,
  trail: <Footprints className="h-3.5 w-3.5" aria-hidden="true" />,
};

/** Compact white glyphs embedded into the Leaflet markers (regular HTML). */
const MARKER_GLYPHS: Record<MapCategory, string> = {
  tourist:
    '<polygon points="12,2.5 14.9,8.6 21.5,9.2 16.6,13.8 18,20.4 12,17.1 6,20.4 7.4,13.8 2.5,9.2 9.1,8.6" fill="currentColor" stroke="none"/>',
  hotel:
    '<path d="M4 21V4.5A1.5 1.5 0 0 1 5.5 3h9A1.5 1.5 0 0 1 16 4.5V21"/><path d="M16 8h2.5A1.5 1.5 0 0 1 20 9.5V21"/><path d="M2.5 21h19"/><path d="M7.5 7.5h1M11.5 7.5h1M7.5 11h1M11.5 11h1M10 21v-4h1.5v4"/>',
  restaurant:
    '<path d="M6.5 3v7"/><path d="M4 3v4.5a2.5 2.5 0 0 0 5 0V3"/><path d="M6.5 10.5V21"/><path d="M16.5 21V3c-2.2.8-3.5 3.4-3.5 6.5h3.5"/>',
  fuel:
    '<path d="M4.5 21V5.5A2.5 2.5 0 0 1 7 3h5a2.5 2.5 0 0 1 2.5 2.5V21"/><path d="M3 21h13"/><path d="M14.5 8.5H17a2 2 0 0 1 2 2V17a1.8 1.8 0 1 0 3.6 0v-6"/><path d="M7 7h5v4H7z"/>',
  police:
    '<path d="M12 2.5 20 5.6v6.2c0 5.4-3.6 8.9-8 10.7-4.4-1.8-8-5.3-8-10.7V5.6z" fill="currentColor" stroke="none"/>',
  facilitation:
    '<path d="M4 21V4.5A1.5 1.5 0 0 1 5.5 3h13A1.5 1.5 0 0 1 20 4.5V21"/><path d="M2.5 21h19"/><path d="M8 7.5h1.5M14.5 7.5H16M8 11.5h1.5M14.5 11.5H16"/><path d="M10 21v-4.5h4V21"/>',
  trail:
    '<path d="M2.5 20.5 9 7l4.6 9.3L16 12.5l5.5 8z" fill="currentColor" stroke="none"/>',
};

function createCategoryIcon(category: MapCategory, verified: boolean): L.DivIcon {
  const meta = getMapCategoryMeta(category);
  const ring = verified ? '0 0 0 2px #ffffff, 0 0 0 4.5px rgba(37,109,210,.4)' : '0 0 0 2px #ffffff';
  return L.divIcon({
    className: 'tpa-marker',
    html: `<span style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:9999px;background:${meta.color};box-shadow:${ring},0 3px 8px rgba(15,23,42,.35);color:#ffffff"><svg viewBox="0 0 24 24" style="width:13px;height:13px" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${MARKER_GLYPHS[category]}</svg></span>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -15],
  });
}

function createUserIcon(): L.DivIcon {
  return L.divIcon({
    className: 'tpa-user-marker',
    html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:#256dd2;box-shadow:0 0 0 3px #ffffff,0 0 0 5.5px rgba(37,109,210,.35)"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

/* -------------------------------------------------------------------------- */
/*                                 POPUP HTML                                 */
/* -------------------------------------------------------------------------- */

function escapeHtml(value: string | null | undefined): string {
  return (value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Only allow safe URL schemes in href/src attributes, even when the value is
 * stored by staff. Blocks javascript:, data:, vbscript: and relatives that
 * resolve to odd schemes. Returns undefined when the value should be ignored.
 */
function safeWebUrl(value: string | null | undefined): string | undefined {
  const trimmed = (value ?? '').trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : undefined;
}

/** Only allow a digits/+, -, (, ), space string as a tel: target. */
function safeTelHref(value: string | null | undefined): string | undefined {
  const trimmed = (value ?? '').trim();
  return /^[+0-9().\- ]{3,20}$/.test(trimmed) ? encodeURIComponent(trimmed) : undefined;
}

function buildLocationPopupHtml(location: MapLocation, isUrdu: boolean): string {
  const meta = getMapCategoryMeta(location.category);
  const categoryLabel = isUrdu ? meta.labelUrdu : meta.label;
  const verifiedBadge = location.isVerified
    ? `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;background:rgba(37,109,210,.12);color:#1d4ed8;font-size:10px;font-weight:700">${isUrdu ? 'تصدیق شدہ' : 'Verified'}</span>`
    : `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;background:#fef3c7;color:#92400e;font-size:10px;font-weight:700">${isUrdu ? 'تخمینی مقام' : 'Approximate'}</span>`;

  const safeImageUrl = safeWebUrl(location.imageUrl);
  const safeMapsUrl = safeWebUrl(location.googleMapsUrl);
  const safeContact = safeTelHref(location.contactNumber);

  const image = safeImageUrl
    ? `<img src="${escapeHtml(safeImageUrl)}" alt="" loading="lazy" style="margin:8px 0 0;display:block;width:100%;max-height:120px;object-fit:cover;border-radius:10px" />`
    : '';
  const mapsLink = safeMapsUrl
    ? `<p style="margin:8px 0 0"><a href="${escapeHtml(safeMapsUrl)}" target="_blank" rel="noreferrer" style="color:#256dd2;font-weight:600;font-size:12px">${isUrdu ? 'Google Maps پر دیکھیں' : 'View on Google Maps'} ↗</a></p>`
    : '';
  const contact = safeContact
    ? `<p style="margin:6px 0 0;font-size:12px"><a href="tel:${safeContact}" style="color:#256dd2;font-weight:600">${escapeHtml(location.contactNumber)}</a></p>`
    : '';
  const description = location.description
    ? `<p style="margin:6px 0 0;font-size:12px;color:#475569">${escapeHtml(location.description)}</p>`
    : '';
  const address = location.address
    ? `<p style="margin:6px 0 0;font-size:12px;color:#64748b">${escapeHtml(location.address)}</p>`
    : '';

  return [
    `<p style="margin:0 0 2px;font-size:11px;font-weight:600;color:${meta.color}">${escapeHtml(categoryLabel)}</p>`,
    `<p style="margin:0;font-size:14px;font-weight:700;color:#0f172a">${escapeHtml(location.name)}</p>`,
    `<p style="margin:6px 0 0">${verifiedBadge}</p>`,
    image,
    description,
    address,
    contact,
    mapsLink,
  ]
    .filter(Boolean)
    .join('');
}

/* -------------------------------------------------------------------------- */
/*                              SERVICE TYPES                                 */
/* -------------------------------------------------------------------------- */

interface OsrmResponse {
  code: string;
  routes?: Array<{
    distance: number;
    duration: number;
    geometry: { coordinates: Array<[number, number]> };
  }>;
}

interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

/** The map location currently selected on the map. */
type Selection = { kind: 'location'; location: MapLocation };

/**
 * Abbottabad District boundary (geoBoundaries gbOpen, Public Domain).
 * Cached at module level so the GeoJSON is fetched at most once per page load,
 * even across React remounts.
 */
let districtBoundaryCache: GeoJsonFeature | null | undefined;

/* -------------------------------------------------------------------------- */
/*                              SMALL UI PIECES                               */
/* -------------------------------------------------------------------------- */

const cardClass = 'rounded-2xl border border-brand-light-border bg-brand-light-surface shadow-gov';

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

const AbbottabadMap: React.FC = () => {
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';

  /* ------------------------------ data states ----------------------------- */
  const [dbLocations, setDbLocations] = useState<MapLocation[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [dbError, setDbError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  /* ------------------------------ UI states ------------------------------- */
  const [activeCategories, setActiveCategories] = useState<MapCategory[]>(() =>
    MAP_CATEGORIES.map((categoryMeta) => categoryMeta.id)
  );
  const [selection, setSelection] = useState<Selection | null>(null);

  /* geolocation + routing */
  const [locating, setLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [userLocError, setUserLocError] = useState<string | null>(null);
  const [routeState, setRouteState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [routeInfo, setRouteInfo] = useState<{ distanceKm: number; minutes: number } | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);

  /* ------------------------------ leaflet refs ---------------------------- */
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const userLayerRef = useRef<L.LayerGroup | null>(null);
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map());
  const boundaryLayerRef = useRef<L.GeoJSON | null>(null);
  const boundaryBoundsRef = useRef<L.LatLngBounds | null>(null);

  /* ------------------------------ derived data ---------------------------- */
  const allLocations = useMemo(() => dbLocations, [dbLocations]);

  const filteredLocations = useMemo(
    () => allLocations.filter((location) => activeCategories.includes(location.category)),
    [allLocations, activeCategories]
  );

  const toggleCategory = useCallback((categoryId: MapCategory) => {
    setActiveCategories((previous) =>
      previous.includes(categoryId)
        ? previous.filter((existing) => existing !== categoryId)
        : [...previous, categoryId]
    );
  }, []);

  const resetCategories = useCallback(() => {
    setActiveCategories(MAP_CATEGORIES.map((categoryMeta) => categoryMeta.id));
  }, []);

  /* --------------------------- page title effect -------------------------- */
  useEffect(() => {
    document.title = t(
      'Abbottabad Tourist Map | Traffic Warden Abbottabad',
      'ایبٹ آباد سیاحتی نقشہ | ٹریفک وارڈن ایبٹ آباد'
    );
  }, [t, language]);

  /* ------------------------- load map locations --------------------------- */
  useEffect(() => {
    let cancelled = false;
    setLoadState('loading');

    (async () => {
      let error: string | null = null;
      let locations: MapLocation[] = [];

      try {
        const result = await mapLocationStore.listPublished();
        locations = result.locations;
        if (result.error) error = result.error;
      } catch {
        error = 'Map locations could not be loaded.';
      }

      if (cancelled) return;
      setDbLocations(locations);
      setDbError(error);
      setLoadState('ready');
    })();

    return () => {
      cancelled = true;
    };
  }, [retryToken]);

  /* --------------------------- map initialisation ------------------------- */
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const map = L.map(container, {
      center: MAP_DEFAULT_CENTER,
      zoom: MAP_DEFAULT_ZOOM,
      maxBounds: L.latLngBounds(MAP_BOUNDS),
      maxBoundsViscosity: 0.8,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    const clusterGroup = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 45,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        return L.divIcon({
          className: 'tpa-cluster',
          html: `<span style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:9999px;background:#256dd2;color:#ffffff;font-size:12px;font-weight:700;box-shadow:0 0 0 2px #ffffff,0 3px 10px rgba(15,23,42,.4)">${count}</span>`,
          iconSize: [38, 38],
          iconAnchor: [19, 19],
        });
      },
    });
    map.addLayer(clusterGroup);

    clusterRef.current = clusterGroup;
    routeLayerRef.current = L.layerGroup().addTo(map);
    userLayerRef.current = L.layerGroup().addTo(map);

    const resize = () => map.invalidateSize();
    map.on('resize', resize);
    window.addEventListener('resize', resize);

    mapRef.current = map;

    return () => {
      window.removeEventListener('resize', resize);
      map.remove();
      mapRef.current = null;
      clusterRef.current = null;
      routeLayerRef.current = null;
      userLayerRef.current = null;
      boundaryLayerRef.current = null;
      boundaryBoundsRef.current = null;
      markersMapRef.current.clear();
    };
  }, []);

  /* ----------------------------- selection flow --------------------------- */
  /** Opens the "Selected place" actions card when a marker is clicked. */
  const openLocationActions = useCallback((location: MapLocation) => {
    setSelection({ kind: 'location', location });
  }, []);

  /* ----------------------------- marker rendering ------------------------- */
  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;

    cluster.clearLayers();
    markersMapRef.current.clear();

    filteredLocations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude], {
        icon: createCategoryIcon(location.category, location.isVerified),
        title: location.name,
      });
      marker.bindPopup(buildLocationPopupHtml(location, isUrdu), { maxWidth: 260 });
      marker.on('click', () => openLocationActions(location));
      markersMapRef.current.set(location.id, marker);
      cluster.addLayer(marker);
    });
  }, [filteredLocations, isUrdu, openLocationActions]);

  /* ------------------------ district boundary layer ----------------------- */
  useEffect(() => {
    let cancelled = false;

    /** Renders the cached/loaded GeoJSON once the map exists. */
    const renderBoundary = (geojson: GeoJsonFeature): boolean => {
      const map = mapRef.current;
      if (!map) return false;

      const layer = L.geoJSON(geojson as GeoJsonObject, {
        style: () => ({
          color: '#256dd2',
          weight: 3,
          fillColor: '#256dd2',
          fillOpacity: 0.3,
        }),
        /* Decorative layer — never intercepts marker clicks or popups. */
        interactive: false,
      });

      const bounds = layer.getBounds();
      if (!bounds.isValid()) return false;

      boundaryLayerRef.current?.remove();
      boundaryLayerRef.current = layer.addTo(map);
      boundaryBoundsRef.current = bounds;
      /* Fit the whole district, with comfortable padding, exactly once. */
      map.fitBounds(bounds, { padding: [28, 28] });
      return true;
    };

    /* Served from cache after a React remount — no repeat fetch. */
    if (districtBoundaryCache !== undefined) {
      if (districtBoundaryCache) renderBoundary(districtBoundaryCache);
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      try {
        /* `v=` bumps the data version and `cache: 'no-store'` bypasses the
           browser HTTP cache entirely, so a stale cached boundary can never
           render after the file is regenerated. */
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/abbottabad-district.geojson?v=4`,
          { cache: 'no-store' }
        );
        if (!response.ok) throw new Error(`boundary-http-${response.status}`);
        const data = (await response.json()) as GeoJsonFeature;

        /* Fail on anything that is not the actual Abbottabad District feature. */
        const shapeName = (data.properties as { shapeName?: string } | undefined)?.shapeName;
        const geometryType = (data.geometry as { type?: string } | undefined)?.type ?? '';
        const validGeometry = geometryType === 'Polygon' || geometryType === 'MultiPolygon';
        if (!data || data.type !== 'Feature' || shapeName !== 'Abbottabad' || !validGeometry) {
          throw new Error('boundary-invalid');
        }

        if (cancelled) return;
        districtBoundaryCache = data;
        renderBoundary(data);
      } catch (error) {
        /* Missing/invalid/unavailable boundary is non-blocking: the map keeps
           the default Abbottabad view. No invented polygon is used. */
        console.warn('[AbbottabadMap] District boundary unavailable:', error);
        if (!cancelled) districtBoundaryCache = null;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* --------------------------- geolocation ("My Location") ---------------- */
  const locateUser = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setUserLocError(
        t('Location services are not available in this browser.', 'اس براؤزر میں لوکیشن سروس دستیاب نہیں۔')
      );
      return;
    }
    setLocating(true);
    setUserLocError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setUserLocation({ latitude, longitude, accuracy });
        setLocating(false);

        const map = mapRef.current;
        if (map) {
          userLayerRef.current?.clearLayers();
          userLayerRef.current?.addLayer(
            L.circle([latitude, longitude], {
              radius: Math.max(accuracy, 30),
              color: '#256dd2',
              weight: 1,
              opacity: 0.4,
              fillColor: '#256dd2',
              fillOpacity: 0.12,
            })
          );
          userLayerRef.current?.addLayer(
            L.marker([latitude, longitude], { icon: createUserIcon() })
          );
          map.flyTo([latitude, longitude], 14);
        }
      },
      (error) => {
        setLocating(false);
        setUserLocError(
          error.code === error.PERMISSION_DENIED
            ? t('Location permission was denied. You can still explore the map.', 'لوکیشن کی اجازت نہیں ملی۔ نقشہ دیکھنا جاری رکھ سکتے ہیں۔')
            : t('Your location could not be determined. Please try again.', 'آپ کا مقام معلوم نہیں ہو سکا۔ دوبارہ کوشش کریں۔')
        );
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }, [t]);

  /* ---------------------------- route preview ----------------------------- */
  const destination = useMemo(() => {
    if (!selection) return null;
    return {
      name: selection.location.name,
      latitude: selection.location.latitude,
      longitude: selection.location.longitude,
    };
  }, [selection]);

  const showRoute = useCallback(async () => {
    if (!destination) return;
    setRouteState('loading');
    setRouteInfo(null);
    setRouteError(null);

    /* Default origin: Abbottabad city centre (or the user's shared location). */
    const origin = userLocation ?? {
      latitude: MAP_DEFAULT_CENTER[0],
      longitude: MAP_DEFAULT_CENTER[1],
    };

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('osrm-failed');
      const data = (await response.json()) as OsrmResponse;
      const route = data.routes?.[0];
      if (data.code !== 'Ok' || !route) throw new Error('no-route');

      const latLngs = route.geometry.coordinates.map(
        ([lng, lat]) => [lat, lng] as [number, number]
      );
      routeLayerRef.current?.clearLayers();
      routeLayerRef.current?.addLayer(
        L.polyline(latLngs, { color: '#b3fa16', weight: 9, opacity: 0.35 })
      );
      const line = L.polyline(latLngs, { color: '#256dd2', weight: 5, opacity: 0.95 });
      routeLayerRef.current?.addLayer(line);
      mapRef.current?.fitBounds(line.getBounds(), { padding: [40, 40] });

      setRouteInfo({
        distanceKm: route.distance / 1000,
        minutes: route.duration / 60,
      });
      setRouteState('ready');
    } catch {
      setRouteState('error');
      setRouteError(
        t(
          'The routing service is temporarily unavailable. Please try the Google Maps button instead.',
          'روٹنگ سروس عارضی طور پر دستیاب نہیں۔ براہِ راست Google Maps کا بٹن استعمال کریں۔'
        )
      );
    }
  }, [destination, userLocation, t]);

  /* ------------------------------- reset view ----------------------------- */
  const resetView = useCallback(() => {
    /* Prefer the full district outline; fall back to the default centre view. */
    const bounds = boundaryBoundsRef.current;
    if (bounds && bounds.isValid()) {
      mapRef.current?.fitBounds(bounds, { padding: [28, 28] });
    } else {
      mapRef.current?.flyTo(MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM);
    }
    routeLayerRef.current?.clearLayers();
    setSelection(null);
    setRouteInfo(null);
    setRouteState('idle');
    setRouteError(null);
  }, []);

  /* --------------------------- google maps link --------------------------- */
  const googleMapsHref = useMemo(() => {
    if (!destination) return null;
    const params = new URLSearchParams({
      api: '1',
      destination: `${destination.latitude},${destination.longitude}`,
      travelmode: 'driving',
    });
    if (userLocation) {
      params.set('origin', `${userLocation.latitude},${userLocation.longitude}`);
    }
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }, [destination, userLocation]);

  /* -------------------------------- render -------------------------------- */
  const retryLoad = useCallback(() => setRetryToken((token) => token + 1), []);
  const breadcrumbItems = [
    { label: 'Tourism', labelUrdu: 'سیاحت' },
    { label: 'Abbottabad Tourist Map', labelUrdu: 'ایبٹ آباد سیاحتی نقشہ' },
  ];

  const allCategoriesActive = activeCategories.length === MAP_CATEGORIES.length;

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-light-bg text-brand-dark">
      {/* --------------------------------- HERO -------------------------------- */}
      <section className="border-b border-brand-blue-100 bg-[#000080] text-white">
        <PageContainer>
          <div className="py-8 sm:py-10">
            <Breadcrumbs
              items={breadcrumbItems}
              className="[&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
            />
            <div className="mt-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{t('Official Interactive Map', 'سرکاری انٹرایکٹو نقشہ')}</span>
              </div>
              <h1 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {t('Abbottabad Tourist Map', 'ایبٹ آباد سیاحتی نقشہ')}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-white/90 sm:text-base">
                {t(
                  'Explore tourist attractions, hotels, restaurants, fuel stations, police assistance points, facilitation centers and hiking trails — and preview driving routes, all from one official interface.',
                  'سیاحتی مقامات، ہوٹل، ریسٹورنٹ، پیٹرول پمپ، پولیس معاونت پوائنٹس، سہولت مراکز اور ٹریکنگ راستے دیکھیں اور سواری کے رستوں کا جائزہ لیں — سب کچھ ایک سرکاری انٹرفیس سے۔'
                )}
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <div className="space-y-5 py-6 sm:py-8 lg:py-10">

          {/* ------------------------------ LAYOUT ----------------------------- */}
          <div className="space-y-3">
              {/* Category filter chips */}
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t('Category filters', 'کیٹیگری فلٹرز')}>
                {MAP_CATEGORIES.map((categoryMeta) => {
                  const isActive = activeCategories.includes(categoryMeta.id);
                  return (
                    <button
                      key={categoryMeta.id}
                      type="button"
                      onClick={() => toggleCategory(categoryMeta.id)}
                      aria-pressed={isActive}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:text-[13px]',
                        isActive
                          ? 'border-transparent text-white shadow-gov'
                          : 'border-brand-light-border bg-white text-slate-600 hover:bg-slate-50'
                      )}
                      style={isActive ? { backgroundColor: categoryMeta.color } : undefined}
                    >
                      {CATEGORY_ICONS[categoryMeta.id]}
                      <span>{t(categoryMeta.label, categoryMeta.labelUrdu)}</span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={resetCategories}
                  disabled={allCategoriesActive}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:text-[13px]',
                    allCategoriesActive
                      ? 'cursor-not-allowed border-brand-light-border bg-slate-100 text-slate-400'
                      : 'border-brand-light-border bg-white text-brand-blue-700 hover:bg-brand-blue-50'
                  )}
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('Reset Filters', 'فلٹرز ری سیٹ')}
                </button>
              </div>

              {/* Map frame */}
              <div
                className={cn(
                  cardClass,
                  'relative z-0 isolate overflow-hidden'
                )}
                style={{ borderColor: 'rgba(37,109,210,.25)' }}
              >
                <div className="relative h-[68vh] min-h-[460px] sm:h-[72vh] lg:h-[720px]">
                  <div ref={mapContainerRef} className="relative z-0 h-full w-full" aria-label={t('Interactive map', 'انٹرایکٹو نقشہ')} role="application" />

                  {/* Floating map controls */}
                  <div className="absolute end-3 top-3 z-[520] flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={locateUser}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-brand-light-border bg-white px-3 py-2 text-xs font-bold text-brand-dark shadow-gov hover:bg-brand-blue-50"
                      aria-label={t('My Location', 'میرا مقام')}
                    >
                      {locating ? (
                        <Loader2 className="h-4 w-4 animate-spin text-brand-blue" aria-hidden="true" />
                      ) : (
                        <Navigation className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                      )}
                      <span>{t('My Location', 'میرا مقام')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetView}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-brand-light-border bg-white px-3 py-2 text-xs font-bold text-brand-dark shadow-gov hover:bg-brand-blue-50"
                      aria-label={t('Reset Map View', 'نقشہ ری سیٹ کریں')}
                    >
                      <RotateCcw className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                      <span>{t('Reset Map View', 'نقشہ ری سیٹ')}</span>
                    </button>
                  </div>

                  {/* Category legend (compact) */}
                  <div className="absolute bottom-3 start-3 z-[520] hidden max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5 rounded-xl border border-brand-light-border bg-white/95 p-2.5 shadow-gov sm:flex">
                    {MAP_CATEGORIES.map((categoryMeta) => (
                      <span key={categoryMeta.id} className="inline-flex items-center gap-1.5 px-1 text-[10px] font-semibold text-slate-600">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: categoryMeta.color }}
                          aria-hidden="true"
                        />
                        {t(categoryMeta.label, categoryMeta.labelUrdu)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected place actions — compact card below the map */}
              {destination && selection && (
                <section
                  aria-label={t('Selected place actions', 'منتخب مقام کے آپشنز')}
                  className={cn(cardClass, 'p-4 sm:p-5')}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ backgroundColor: getMapCategoryMeta(selection.location.category).color }}>
                              <span>{t(getMapCategoryMeta(selection.location.category).label, getMapCategoryMeta(selection.location.category).labelUrdu)}</span>
                            </span>
                            {selection.location.isVerified ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue-50 px-2.5 py-1 text-[10px] font-bold text-brand-blue-800">
                                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                                {t('Verified', 'تصدیق شدہ')}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                                <MapPin className="h-3 w-3" aria-hidden="true" />
                                {t('Approximate location', 'تخمینی مقام')}
                              </span>
                            )}
                          </div>
                          <h3 className="mt-2 text-sm font-bold text-brand-dark sm:text-base">
                            {selection.location.name}
                          </h3>
                          {selection.location.imageUrl && (
                            <img
                              src={selection.location.imageUrl}
                              alt={selection.location.name}
                              loading="lazy"
                              className="mt-2 h-32 w-full max-w-sm rounded-xl border border-brand-light-border object-cover sm:h-28"
                            />
                          )}
                          {selection.location.description && (
                            <p className="mt-2 text-xs leading-relaxed text-brand-light-muted sm:text-[13px]">
                              {selection.location.description}
                            </p>
                          )}
                          {selection.location.address && (
                            <p className="mt-2 text-xs text-brand-light-muted">
                              <span className="font-semibold">{t('Address', 'پتہ')}:</span>{' '}
                              {selection.location.address}
                            </p>
                          )}
                          {selection.location.contactNumber && safeTelHref(selection.location.contactNumber) && (
                            <a
                              href={`tel:${safeTelHref(selection.location.contactNumber)}`}
                              className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue"
                            >
                              {t('Contact', 'رابطہ')}: {selection.location.contactNumber}
                            </a>
                          )}
                          {safeWebUrl(selection.location.googleMapsUrl) && (
                            <a
                              href={safeWebUrl(selection.location.googleMapsUrl)}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue"
                            >
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              {t('Open in Google Maps', 'Google Maps پر کھولیں')}
                            </a>
                          )}
                          {selection.location.isVerified && selection.location.lastVerifiedAt && (
                            <p className="mt-1.5 text-[11px] text-slate-500">
                              {t('Last verified', 'آخری تصدیق')}:{' '}
                              {new Date(selection.location.lastVerifiedAt).toLocaleDateString('en-GB', {
                                dateStyle: 'medium',
                              })}
                            </p>
                          )}
                        </>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-2 sm:w-64 sm:shrink-0">
                      <button
                        type="button"
                        onClick={showRoute}
                        disabled={routeState === 'loading'}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#256dd2] px-4 py-2.5 text-xs font-bold text-white shadow-gov transition-colors hover:bg-[#1e5fbf] disabled:opacity-60"
                      >
                        {routeState === 'loading' ? (
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <Navigation className="h-4 w-4" aria-hidden="true" />
                        )}
                        {t('Show Route Preview', 'روٹ کا جائزہ دکھائیں')}
                      </button>
                      {googleMapsHref && (
                        <a
                          href={googleMapsHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-light-border bg-white px-4 py-2.5 text-xs font-bold text-brand-dark shadow-gov transition-colors hover:bg-brand-blue-50"
                        >
                          <ExternalLink className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                          {t('Navigate with Google Maps', 'Google Maps سے راستہ دیکھیں')}
                        </a>
                      )}
                      {(routeState === 'ready' || routeState === 'error') && (
                        <p
                          className={cn(
                            'text-xs font-semibold',
                            routeState === 'ready' ? 'text-brand-blue-800' : 'text-red-600'
                          )}
                        >
                          {routeState === 'ready' && routeInfo
                            ? `${t('Distance', 'فاصلہ')}: ${routeInfo.distanceKm.toFixed(1)} km · ${t('Estimated', 'اندازاً')} ~${Math.round(routeInfo.minutes)} min`
                            : routeError}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 border-t border-brand-light-border pt-2 text-[11px] leading-relaxed text-slate-500">
                    {t(
                      'Previews use the OSRM road network and may differ from actual conditions. Check the Travel Advisory board for closures.',
                      'جائزہ OSRM کی سڑکوں کے نیٹ ورک پر مبنی ہے اور اصل صورتحال سے مختلف ہو سکتا ہے۔ بندشوں کے لیے ٹریول ایڈوائزری بورڈ دیکھیں۔'
                    )}
                  </p>
                </section>
              )}

              <div className="space-y-2">
                {userLocError && (
                  <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
                    {userLocError}
                  </p>
                )}
                <p className="px-1 text-[11px] leading-relaxed text-slate-500">
                  {t(
                    'Map data © OpenStreetMap contributors · Route previews © OSRM · District boundary © geoBoundaries (gbOpen, Public Domain) — the north-east (Galiyat belt) edge is adjusted for display to include Galiyat tourist areas. Route previews are illustrative only — they do not show live traffic or closures. For current road status, check the Travel Advisory board.',
                    'نقشے کا ڈیٹا © OpenStreetMap نے دیا · روٹ جائزہ © OSRM · ضلع کی حد © geoBoundaries (gbOpen، پبلک ڈومین) — شمال مشرق (گلیات) کی سرحد سیاحتی مقامات کو شامل کرنے کے لیے ڈسپلے کے مطابق کی گئی ہے۔ روٹ جائزہ صرف اندازاً ہے — اس میں لائیو ٹریفک یا بندشیں نہیں دکھائی جاتیں۔ موجودہ سڑک کی صورتحال کے لیے ٹریول ایڈوائزری بورڈ دیکھیں۔'
                  )}
                </p>
              </div>
            </div>

          {/* --------------------------- DATA STATUS ---------------------------- */}
          {loadState === 'error' ||
          (dbError && dbError !== 'MAP_TABLE_MISSING' && dbLocations.length === 0) ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
              {t('Map locations could not be loaded.', 'نقشے کے مقامات لوڈ نہیں ہو سکے۔')}{' '}
              <button type="button" onClick={retryLoad} className="underline">
                {t('Retry', 'دوبارہ کوشش')}
              </button>
            </p>
          ) : dbError === 'MAP_TABLE_MISSING' ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium leading-relaxed text-amber-800">
              {t(
                'The map database is not set up yet. An administrator can create the table by running supabase/updates-04-map-locations.sql in the Supabase SQL editor.',
                'نقشے کا ڈیٹا بیس ابھی ترتیب نہیں دیا گیا۔ ایڈمن سپاپا بیس ایس کیو ایڈیٹر میں supabase/updates-04-map-locations.sql چلا کر ٹیبل بنا سکتا ہے۔'
              )}
            </p>
          ) : loadState === 'ready' && !dbError && dbLocations.length === 0 ? (
            <p className="rounded-xl border border-brand-blue-100 bg-brand-blue-50 px-3 py-2 text-xs font-medium leading-relaxed text-brand-blue-800">
              {t(
                'No locations have been added yet — an administrator can add them from the Map Locations tab in the dashboard. Only published entries appear on this map.',
                'ابھی کوئی مقام شامل نہیں کیا گیا — ایڈمن ڈیش بورڈ کے Map Locations ٹیب سے شامل کر سکتا ہے۔ صرف published اندراج اس نقشے پر نظر آتے ہیں۔'
              )}
            </p>
          ) : null}

        </div>
      </PageContainer>
    </div>
  );
};

export default AbbottabadMap;
