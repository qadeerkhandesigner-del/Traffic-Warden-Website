import type { AdvisoryPriority } from '../../types/galiyat';

/**
 * Styling + formatting helpers for the Galiyat advisory UI.
 * Kept separate from the icon component file so both can be imported freely.
 */

/**
 * Priority styling. These classes are combined with a visible text label and
 * an icon in every usage so priority is never communicated by colour alone.
 */
export const PRIORITY_STYLES: Record<
  AdvisoryPriority,
  { badge: string; accent: string }
> = {
  low: {
    badge: 'bg-slate-100 text-slate-700 border-slate-300',
    accent: 'border-s-slate-400',
  },
  medium: {
    badge: 'bg-amber-50 text-amber-800 border-amber-300',
    accent: 'border-s-amber-400',
  },
  high: {
    badge: 'bg-orange-50 text-orange-800 border-orange-300',
    accent: 'border-s-orange-500',
  },
  critical: {
    badge: 'bg-red-50 text-red-800 border-red-300',
    accent: 'border-s-red-600',
  },
};

/**
 * Formats an ISO timestamp consistently in English numerals for both
 * languages, matching how dates are shown elsewhere on the portal.
 */
export function formatAdvisoryDateTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';

  try {
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return date.toISOString();
  }
}
