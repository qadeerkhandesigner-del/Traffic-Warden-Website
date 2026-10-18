import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TriangleAlert, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { TravelAdvisory } from '../../types/galiyat';
import { fetchTravelAdvisories, getActiveAdvisories } from '../../services/galiyatAdvisoryService';

const DISMISS_STORAGE_KEY = 'tpa_advisory_alert_dismissed';
const ADVISORY_PAGE_PATH = '/tourism/galiyat-travel-advisory';

/**
 * HighPriorityAlertBanner
 * =======================
 *
 * Slim emergency strip shown on every public page while the advisory board has a
 * High or Critical advisory running. It reuses the same data layer as the
 * advisory page, so publishing from the dashboard is enough — no extra step.
 *
 * Deliberately conservative:
 *   • sample (demo) content never raises a public alert;
 *   • only published, unexpired, already-scheduled advisories count;
 *   • visitors can dismiss it for the rest of their session.
 */
export const HighPriorityAlertBanner: React.FC = () => {
  const [advisories, setAdvisories] = useState<TravelAdvisory[]>([]);
  const [source, setSource] = useState<'demo' | 'live' | null>(null);
  const [dismissedId, setDismissedId] = useState<string | null>(() => {
    try {
      return window.sessionStorage.getItem(DISMISS_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let cancelled = false;

    fetchTravelAdvisories().then((response) => {
      if (cancelled) return;
      setAdvisories(response.advisories);
      setSource(response.source);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const alert = useMemo(() => {
    // Sample content is clearly labelled and must never trigger a public alert.
    if (source !== 'live') return null;

    const urgent = getActiveAdvisories(advisories).filter(
      (advisory) =>
        !advisory.isDemo &&
        (advisory.priority === 'high' || advisory.priority === 'critical')
    );

    if (urgent.length === 0) return null;

    return urgent.sort((a, b) => {
      if (a.priority === b.priority) return 0;
      return a.priority === 'critical' ? -1 : 1;
    })[0];
  }, [advisories, source]);

  if (!alert || alert.id === dismissedId) return null;

  const isCritical = alert.priority === 'critical';

  const handleDismiss = () => {
    setDismissedId(alert.id);
    try {
      window.sessionStorage.setItem(DISMISS_STORAGE_KEY, alert.id);
    } catch {
      // Session storage can be unavailable; dismissing for this render is enough.
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'border-b text-white',
        isCritical ? 'border-red-900 bg-red-700' : 'border-orange-900 bg-orange-600'
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-start gap-2.5">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider">
              {isCritical ? 'Emergency travel advisory — Galiyat' : 'Travel advisory — Galiyat'}
            </p>
            <p dir="rtl" lang="ur" className="mt-0.5 font-arabic text-sm font-semibold leading-snug">
              {alert.titleUr}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:ms-auto">
          <Link
            to={`${ADVISORY_PAGE_PATH}#advisory-${alert.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            View details
            <ArrowRight className="h-3.5 w-3.5 shrink-0 rtl:rotate-180" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss this advisory alert"
            className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighPriorityAlertBanner;
