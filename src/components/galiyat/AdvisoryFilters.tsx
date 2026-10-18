import React from 'react';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import type { AdvisoryFilterState } from '../../types/galiyat';
import {
  ADVISORY_CATEGORIES,
  ADVISORY_PRIORITIES,
  GALIYAT_LOCATIONS,
} from '../../data/galiyatAdvisoryData';

export interface AdvisoryFiltersProps {
  filters: AdvisoryFilterState;
  onChange: (filters: AdvisoryFilterState) => void;
  onReset: () => void;
  resultCount: number;
  totalCount: number;
  /** Number of filters currently applied (excluding default sorting). */
  activeFilterCount: number;
}

const selectClassName =
  'w-full rounded-lg border border-brand-light-border bg-white px-3 py-2 text-sm text-brand-dark shadow-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-200';

export const AdvisoryFilters: React.FC<AdvisoryFiltersProps> = ({
  filters,
  onChange,
  onReset,
  resultCount,
  totalCount,
  activeFilterCount,
}) => {
  const { t, language } = useLanguage();

  const update = <K extends keyof AdvisoryFilterState>(key: K, value: AdvisoryFilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 sm:p-5 shadow-gov">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-blue" aria-hidden="true" />
          <h3 className="text-sm font-bold text-brand-dark">
            {t('Search & Filter Advisories', 'انتباہات تلاش اور فلٹر کریں')}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-brand-light-muted">
          {t('Showing', 'دکھائے جا رہے ہیں')}{' '}
          <span className="font-semibold text-brand-dark">{resultCount}</span>{' '}
          {t('of', 'کل')} <span className="font-semibold text-brand-dark">{totalCount}</span>{' '}
          {t('active advisories', 'فعال انتباہات')}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="advisory-search" className="mb-1 block text-xs font-semibold text-brand-light-muted">
            {t('Search', 'تلاش')}
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-brand-light-muted ltr:left-3 rtl:right-3"
              aria-hidden="true"
            />
            <input
              id="advisory-search"
              type="search"
              value={filters.search}
              onChange={(event) => update('search', event.target.value)}
              placeholder={t('Title or location…', 'عنوان یا مقام…')}
              className={`${selectClassName} ltr:pl-9 rtl:pr-9`}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="advisory-category" className="mb-1 block text-xs font-semibold text-brand-light-muted">
            {t('Category', 'قسم')}
          </label>
          <select
            id="advisory-category"
            value={filters.categoryId}
            onChange={(event) => update('categoryId', event.target.value as AdvisoryFilterState['categoryId'])}
            className={selectClassName}
          >
            <option value="all">{t('All categories', 'تمام اقسام')}</option>
            {ADVISORY_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {language === 'ur' ? category.labelUrdu : category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="advisory-priority" className="mb-1 block text-xs font-semibold text-brand-light-muted">
            {t('Priority', 'ترجیح')}
          </label>
          <select
            id="advisory-priority"
            value={filters.priority}
            onChange={(event) => update('priority', event.target.value as AdvisoryFilterState['priority'])}
            className={selectClassName}
          >
            <option value="all">{t('All priorities', 'تمام ترجیحات')}</option>
            {ADVISORY_PRIORITIES.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {language === 'ur' ? priority.labelUrdu : priority.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="advisory-location" className="mb-1 block text-xs font-semibold text-brand-light-muted">
            {t('Location', 'مقام')}
          </label>
          <select
            id="advisory-location"
            value={filters.locationId}
            onChange={(event) => update('locationId', event.target.value as AdvisoryFilterState['locationId'])}
            className={selectClassName}
          >
            <option value="all">{t('All Galiyat', 'تمام گلیات')}</option>
            {GALIYAT_LOCATIONS.map((location) => (
              <option key={location.id} value={location.id}>
                {language === 'ur' ? location.nameUrdu : location.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label htmlFor="advisory-sort" className="mb-1 block text-xs font-semibold text-brand-light-muted">
            {t('Sort by', 'ترتیب')}
          </label>
          <select
            id="advisory-sort"
            value={filters.sortBy}
            onChange={(event) => update('sortBy', event.target.value as AdvisoryFilterState['sortBy'])}
            className={selectClassName}
          >
            <option value="newest">{t('Newest first', 'نئے پہلے')}</option>
            <option value="priority">{t('Highest priority', 'سب سے زیادہ ترجیح')}</option>
            <option value="expiry">{t('Expiring soonest', 'جلد ختم ہونے والے')}</option>
          </select>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            disabled={activeFilterCount === 0}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand-light-border bg-white px-3 py-2 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-light-subtle disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t('Reset filters', 'فلٹر ری سیٹ کریں')}
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-brand-blue-100 px-1.5 text-[11px] font-bold text-brand-blue-700">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryFilters;
