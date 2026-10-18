import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { cn } from '../../lib/utils';
import { ADVISORY_CATEGORIES } from '../../data/galiyatAdvisoryData';
import { AdvisoryIcon } from './advisoryDisplay';

export interface QuickInfoCardsProps {
  /** Active advisory counts keyed by category id. Derived from records. */
  counts: Record<string, number>;
}

/**
 * Compact single-row overview of active advisories by category.
 * Informational only — the full advisory list below always shows every
 * category by default, so no click/filter interaction is needed here.
 */
export const QuickInfoCards: React.FC<QuickInfoCardsProps> = ({ counts }) => {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
      {ADVISORY_CATEGORIES.map((category) => {
        const count = counts[category.id] ?? 0;
        const hasAdvisories = count > 0;

        return (
          <div
            key={category.id}
            className={cn(
              'flex flex-col items-center rounded-xl border bg-brand-light-surface px-2 py-2.5 text-center shadow-gov sm:px-3 sm:py-3',
              hasAdvisories ? 'border-brand-blue-300' : 'border-brand-light-border'
            )}
          >
            <span
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg sm:h-9 sm:w-9',
                hasAdvisories ? 'bg-brand-blue text-white' : 'bg-brand-blue-50 text-brand-blue'
              )}
            >
              <AdvisoryIcon name={category.iconName} className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem]" />
            </span>

            <h3 className="mt-1.5 text-[11px] font-bold leading-tight text-brand-dark sm:text-xs">
              {language === 'ur' ? category.labelUrdu : category.label}
            </h3>

            <span
              className={cn(
                'mt-1 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-bold leading-none sm:text-[11px]',
                hasAdvisories ? 'bg-brand-dark text-white' : 'bg-brand-light-subtle text-brand-light-muted'
              )}
              aria-label={`${count} active advisories`}
            >
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default QuickInfoCards;
