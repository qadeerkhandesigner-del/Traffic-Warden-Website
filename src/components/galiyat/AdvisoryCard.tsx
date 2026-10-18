import React, { useEffect, useRef, useState } from 'react';
import { CalendarClock, Check, Copy, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { cn } from '../../lib/utils';
import type { TravelAdvisory } from '../../types/galiyat';
import { ADVISORY_CATEGORIES, ADVISORY_PRIORITIES } from '../../data/galiyatAdvisoryData';
import { getLocationLabel } from '../../services/galiyatAdvisoryService';
import { AdvisoryIcon } from './advisoryDisplay';
import { PRIORITY_STYLES, formatAdvisoryDateTime } from './advisoryFormat';

/** Canonical public URL for an advisory (used by the share buttons). */
const ADVISORY_PAGE_PATH = '/tourism/galiyat-travel-advisory';

export interface AdvisoryCardProps {
  advisory: TravelAdvisory;
  /**
   * Forces the card to render in this language instead of the site toggle.
   * The advisory board is published in Urdu, so the page passes 'ur'.
   */
  forceLanguage?: 'en' | 'ur';
  /** Hides the share row (used by the dashboard preview, which sits in a form). */
  showActions?: boolean;
  className?: string;
}

export const AdvisoryCard: React.FC<AdvisoryCardProps> = ({
  advisory,
  forceLanguage,
  showActions = true,
  className,
}) => {
  const { language: siteLanguage } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    },
    []
  );

  // Advisory content is published in Urdu; fall back to the site language only
  // when the caller does not force one.
  const language = forceLanguage ?? siteLanguage;

  const category = ADVISORY_CATEGORIES.find((item) => item.id === advisory.categoryId);
  const priority = ADVISORY_PRIORITIES.find((item) => item.id === advisory.priority);
  const location = getLocationLabel(advisory.locationId);

  const priorityStyles = PRIORITY_STYLES[advisory.priority];

  const title = language === 'ur' ? advisory.titleUr : advisory.titleEn;
  const description = language === 'ur' ? advisory.descriptionUr : advisory.descriptionEn;
  // Chip and field labels stay in English even though the advisory body is Urdu.
  const categoryLabel = category ? category.label : advisory.categoryId;
  const priorityLabel = priority ? priority.label : advisory.priority;
  const locationLabel = location.name;

  const shareUrl = `${window.location.origin}${ADVISORY_PAGE_PATH}#advisory-${advisory.id}`;
  const whatsappText = `${advisory.titleUr}\n\n${advisory.descriptionUr}\n\n${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article
      id={`advisory-${advisory.id}`}
      className={cn(
        'relative scroll-mt-24 rounded-2xl border border-brand-light-border border-s-4 bg-brand-light-surface shadow-gov',
        priorityStyles.accent,
        className
      )}
    >
      <div className="p-4 sm:p-5 lg:p-6">
        {/* Chips row */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-200 bg-brand-blue-50 px-2.5 py-1 text-xs font-semibold text-brand-blue-700">
            <AdvisoryIcon name={category?.iconName} className="h-3.5 w-3.5" />
            {categoryLabel}
          </span>

          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
              priorityStyles.badge
            )}
          >
            <AdvisoryIcon name={priority?.iconName} className="h-3.5 w-3.5" />
            Priority: {priorityLabel}
          </span>

          <span
            className={cn(
              'ms-auto inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide',
              advisory.isPublished
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                : 'border-amber-300 bg-amber-50 text-amber-800'
            )}
          >
            {/* Status chip stays in English, as requested */}
            {advisory.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Title — Nastaliq faces need extra line height so clusters are not clipped */}
        <h3
          className={cn(
            'text-lg font-bold text-brand-dark sm:text-xl',
            language === 'ur' ? 'font-jameel leading-[2]' : 'leading-snug'
          )}
        >
          {title}
        </h3>

        {/* Location */}
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-light-muted">
          <MapPin className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
          <span>
            Affected area: <span className="text-brand-dark">{locationLabel}</span>
          </span>
        </p>

        {/* Description */}
        <p
          className={cn(
            'mt-3 text-[15px] text-brand-light-text sm:text-[17px]',
            language === 'ur' ? 'font-jameel leading-[2.1]' : 'leading-relaxed'
          )}
        >
          {description}
        </p>

        {/* Dates */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-brand-light-subtle/70 px-3.5 py-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-light-muted">
              Issued
            </span>
            {/* bdi keeps dates/Latin values in correct left-to-right order inside RTL (Urdu) layout */}
            <bdi className="text-xs font-medium text-brand-dark sm:text-sm">
              {formatAdvisoryDateTime(advisory.issuedAt)}
            </bdi>
          </p>

          {advisory.expiresAt && (
            <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-brand-light-subtle/70 px-3.5 py-2.5">
              <CalendarClock className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-light-muted">
                Valid until
              </span>
              <bdi className="text-xs font-medium text-brand-dark sm:text-sm">
                {formatAdvisoryDateTime(advisory.expiresAt)}
              </bdi>
            </p>
          )}
        </div>

        {/* Share — kept LTR so the icon/text order reads the same in Urdu layout */}
        {showActions && (
          <div
            className="mt-4 flex flex-wrap items-center gap-2 border-t border-brand-light-border pt-3.5 print:hidden"
            dir="ltr"
          >
            <a
              href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Share on WhatsApp
            </a>

            <button
              type="button"
              onClick={() => void handleCopyLink()}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-light-border bg-white px-3 py-1.5 text-xs font-semibold text-brand-dark transition-colors hover:bg-brand-light-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-300"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
              {copied ? 'Link copied' : 'Copy link'}
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default AdvisoryCard;
