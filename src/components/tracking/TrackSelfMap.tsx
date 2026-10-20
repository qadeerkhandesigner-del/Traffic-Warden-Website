import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '../../lib/utils';
import type { TrackingPoint } from '../../services/trackingService';

/**
 * Tourist self-localisation map
 * =============================
 *
 * Lightweight Leaflet map (OpenStreetMap — the same tiles used by the
 * existing Abbottabad tourist map) that shows the tourist where THEY are,
 * with a GPS accuracy circle, plus a polyline of the path they travelled in
 * this session. It never shows anybody else's location: this component runs
 * on the public page and receives only the tourist's own readings.
 */
interface TrackSelfMapProps {
  /** Latest accepted GPS reading (null until the first fix). */
  point: TrackingPoint | null;
  /** Accepted readings in chronological order, drawn as a travel line. */
  trail?: TrackingPoint[];
  className?: string;
}

const ABBOTTABAD_CENTER: L.LatLngExpression = [34.157, 73.221];

const MARKER_ICON = L.divIcon({
  className: 'tpa-self-marker',
  html: '<span class="flex h-6 w-6 items-center justify-center"><span class="absolute h-6 w-6 animate-ping rounded-full bg-brand-blue/40"></span><span class="relative h-4 w-4 rounded-full border-2 border-white bg-brand-blue shadow"></span></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export const TrackSelfMap: React.FC<TrackSelfMapProps> = ({ point, trail, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const accuracyRef = useRef<L.Circle | null>(null);
  const pathLayerRef = useRef<L.LayerGroup | null>(null);

  // Create the map once.
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const map = L.map(containerRef.current, {
      center: ABBOTTABAD_CENTER,
      zoom: 13,
      scrollWheelZoom: false,
      attributionControl: true,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
      accuracyRef.current = null;
      pathLayerRef.current = null;
    };
  }, []);

  /* Travel line: a visible polyline of the path walked so far this session. */
  useEffect(() => {
    const map = mapRef.current;
    const latLngs = (trail ?? [])
      .map((p) => [p.latitude, p.longitude] as L.LatLngExpression);

    if (!map || latLngs.length < 2) {
      pathLayerRef.current?.remove();
      pathLayerRef.current = null;
      return;
    }

    // White casing under the blue line keeps it readable over all roads.
    pathLayerRef.current?.remove();
    pathLayerRef.current = L.layerGroup([
      L.polyline(latLngs, { color: '#ffffff', weight: 6, opacity: 0.8 }),
      L.polyline(latLngs, { color: '#1d4ed8', weight: 3, opacity: 0.9 }),
    ]).addTo(map);
  }, [trail]);

  // Follow the latest fix.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !point) return;
    const latLng: L.LatLngExpression = [point.latitude, point.longitude];

    if (!markerRef.current) {
      markerRef.current = L.marker(latLng, { icon: MARKER_ICON, title: 'Your current location' }).addTo(map);
      accuracyRef.current = L.circle(latLng, {
        radius: point.accuracyMeters ?? 0,
        color: '#1d4ed8',
        weight: 1,
        fillColor: '#1d4ed8',
        fillOpacity: 0.08,
      }).addTo(map);
      map.setView(latLng, 16);
    } else {
      markerRef.current.setLatLng(latLng);
      accuracyRef.current?.setLatLng(latLng);
      accuracyRef.current?.setRadius(point.accuracyMeters ?? 0);
      map.panTo(latLng, { animate: true, duration: 0.8 });
    }
  }, [point]);

  return (
    <div
      className={cn(
        'relative h-[300px] w-full overflow-hidden rounded-lg border border-slate-200 sm:h-[360px]',
        className
      )}
    >
      <div ref={containerRef} className="h-full w-full" role="application" aria-label="Your current location on the map" />
      {!point && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/70">
          <p className="rounded bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
            Waiting for your first GPS fix…
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackSelfMap;
