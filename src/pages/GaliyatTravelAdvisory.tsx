import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarClock,
  ClipboardCheck,
  LoaderCircle,
  Mountain,
  Phone,
  Printer,
  RefreshCw,
  ShieldCheck,
  TreePine,
  TriangleAlert,
  WifiOff,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { AdvisoryCard } from '../components/galiyat/AdvisoryCard';
import { QuickInfoCards } from '../components/galiyat/QuickInfoCards';
import { RouteStatusBoard } from '../components/galiyat/RouteStatusBoard';
import {
  BOARD_FRAME,
  BOARD_HEADER,
  BOARD_TITLE,
  COUNT_CHIP,
} from '../components/galiyat/RouteStatusBoard';
import { AdvisoryIcon } from '../components/galiyat/advisoryDisplay';
import { formatAdvisoryDateTime } from '../components/galiyat/advisoryFormat';
import { useLanguage } from '../hooks/useLanguage';
import { cn } from '../lib/utils';
import type {
  AdvisoryFilterState,
  GaliyatAdvisoriesResult,
} from '../types/galiyat';
import {
  BEFORE_YOU_TRAVEL_CHECKLIST,
  CHANGING_CONDITIONS_NOTE,
  TRAVEL_SAFETY_GUIDELINES,
} from '../data/galiyatAdvisoryData';
import {
  DEFAULT_ADVISORY_FILTERS,
  fetchTravelAdvisories,
  filterAndSortAdvisories,
  getActiveAdvisories,
  getCategoryCounts,
  getLatestUpdatedAt,
} from '../services/galiyatAdvisoryService';
import { routeStore } from '../services/routeStore';
import type { GaliyatRoute } from '../types/galiyat';

type LoadStatus = 'loading' | 'ready' | 'error';

/** Repeated house patterns kept in one place so every section reads the same. */
const eyebrowClassName =
  'inline-flex max-w-full items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs';
const sectionTitleClassName =
  'mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl';
const sectionIntroClassName = 'mt-2 text-sm leading-relaxed text-brand-light-muted sm:text-base';

export const GaliyatTravelAdvisory: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'گلیات ٹریفک اور سفری ایڈوائزری | ٹریفک وارڈن ایبٹ آباد'
        : 'Galiyat Traffic & Travel Advisory | Traffic Warden Abbottabad';
  }, [language]);

  const [status, setStatus] = useState<LoadStatus>('loading');
  const [result, setResult] = useState<GaliyatAdvisoriesResult | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<AdvisoryFilterState>(DEFAULT_ADVISORY_FILTERS);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Route status board — same store the dashboard writes to.
  const [routes, setRoutes] = useState<GaliyatRoute[]>([]);
  const [routesStatus, setRoutesStatus] = useState<LoadStatus>('loading');

  const listRef = useRef<HTMLElement | null>(null);

  /** `silent` keeps the current list on screen while fresh data is fetched. */
  const loadAdvisories = useCallback(async (silent = false) => {
    if (silent) setRefreshing(true);

    const response = await fetchTravelAdvisories();
    setResult(response);
    setStatus(response.error ? 'error' : 'ready');
    setRefreshing(false);
  }, []);

  const loadRoutes = useCallback(async () => {
    try {
      const rows = await routeStore.list();
      setRoutes(rows);
      setRoutesStatus('ready');
    } catch {
      // The board stays quiet on failure — advisories are the primary content.
      setRoutesStatus('error');
    }
  }, []);

  useEffect(() => {
    void loadAdvisories();
  }, [loadAdvisories]);

  useEffect(() => {
    void loadRoutes();
  }, [loadRoutes]);

  // Keep the board current: re-check every 90 seconds, and whenever the tab
  // regains focus, so a newly published advisory appears without a reload.
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === 'visible') {
        void loadAdvisories(true);
        void loadRoutes();
      }
    };

    const interval = window.setInterval(refresh, 90_000);
    window.addEventListener('focus', refresh);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', refresh);
    };
  }, [loadAdvisories, loadRoutes]);

  const advisories = useMemo(() => result?.advisories ?? [], [result]);

  const allActiveAdvisories = useMemo(() => getActiveAdvisories(advisories), [advisories]);

  /**
   * Labelled sample advisories are only ever shown while nothing real has been
   * published. As soon as one official advisory exists the samples disappear,
   * so the two can never be confused on the public page.
   */
  const hasRealAdvisory = useMemo(
    () => allActiveAdvisories.some((advisory) => !advisory.isDemo),
    [allActiveAdvisories]
  );

  const activeAdvisories = useMemo(
    () =>
      hasRealAdvisory
        ? allActiveAdvisories.filter((advisory) => !advisory.isDemo)
        : allActiveAdvisories,
    [allActiveAdvisories, hasRealAdvisory]
  );

  /** True when the list on screen is made up of sample notices only. */
  const showingSamplesOnly =
    !hasRealAdvisory && activeAdvisories.some((advisory) => advisory.isDemo);

  const categoryCounts = useMemo(() => getCategoryCounts(activeAdvisories), [activeAdvisories]);

  const lastUpdated = useMemo(
    () => getLatestUpdatedAt(activeAdvisories) ?? result?.fetchedAt ?? null,
    [activeAdvisories, result]
  );

  const visibleAdvisories = useMemo(
    () => filterAndSortAdvisories(activeAdvisories, filters, language),
    [activeAdvisories, filters, language]
  );

  const isLoading = status === 'loading';
  const hasError = status === 'error' || Boolean(result?.error);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_ADVISORY_FILTERS);
  }, []);

  const handleRetry = useCallback(() => {
    setStatus('loading');
    void loadAdvisories();
  }, [loadAdvisories]);

  const handleManualRefresh = useCallback(() => {
    void loadAdvisories(true);
  }, [loadAdvisories]);

  const toggleCheckedItem = useCallback((id: string) => {
    setCheckedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }, []);

  const breadcrumbItems = [
    { label: 'Tourism', labelUrdu: 'سیاحت' },
    { label: 'Galiyat Traffic Advisory', labelUrdu: 'گلیات ٹریفک ایڈوائزری' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-light-bg text-brand-dark">
      {/* ---------------------------------- HERO ---------------------------------- */}
      <section className="relative overflow-hidden border-b border-[#0000aa] bg-[#000080] pt-6 pb-10 text-white sm:pt-8 sm:pb-14">
        <div className="pointer-events-none absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute end-0 top-0 h-56 w-56 rounded-full bg-brand-blue/30 blur-3xl sm:h-80 sm:w-80"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 start-0 h-48 w-48 rounded-full bg-brand-lime/10 blur-3xl sm:h-64 sm:w-64"
          aria-hidden="true"
        />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={breadcrumbItems}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
              <Mountain className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{t('Tourism — Galiyat Region', 'سیاحت — علاقہ گلیات')}</span>
            </div>

            <h1 className="text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t('GALIYAT TRAFFIC & TRAVEL ADVISORY', 'گلیات ٹریفک اور سفری ایڈوائزری')}
            </h1>

            <p className="text-sm font-semibold text-brand-lime sm:text-base md:text-lg">
              {t(
                'Road conditions, travel guidance & safety advisories',
                'سڑکوں کی صورتحال، سفری رہنمائی اور حفاظتی ایڈوائزری'
              )}
            </p>

            <p className="max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
              {t(
                'Official travel information for visitors travelling to and within the Galiyat region.',
                'گلیات کے علاقے میں آنے اور وہاں سفر کرنے والے سیاحوں کے لیے سرکاری سفری معلومات۔'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <CalendarClock className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Last updated', 'آخری اپ ڈیٹ')}:{' '}
                <span className="font-semibold">
                  {isLoading ? (
                    t('Loading…', 'لوڈ ہو رہا ہے…')
                  ) : (
                    /* bdi keeps the date in correct order inside RTL (Urdu) layout */
                    <bdi>{formatAdvisoryDateTime(lastUpdated)}</bdi>
                  )}
                </span>
              </span>

              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <TreePine className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Galiyat Development Area', 'گلیات ڈویلپمنٹ ایریا')}
              </span>

              <button
                type="button"
                onClick={handleManualRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-white/20 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime print:hidden sm:text-xs md:text-sm"
              >
                <RefreshCw
                  className={cn('h-4 w-4 shrink-0 text-brand-lime', refreshing && 'animate-spin')}
                  aria-hidden="true"
                />
                {refreshing ? t('Refreshing…', 'تازہ ہو رہا ہے…') : t('Refresh', 'تازہ کریں')}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime print:hidden sm:text-xs md:text-sm"
              >
                <Printer className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Print / Save PDF', 'پرنٹ / پی ڈی ایف')}
              </button>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <div className="space-y-10 py-8 sm:space-y-14 sm:py-12 lg:py-16">
          {/* --------------------------- QUICK INFORMATION -------------------------- */}
          <section aria-labelledby="quick-info-heading">
            <div className="max-w-3xl">
              <div className={eyebrowClassName}>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                <span>{t('Advisory Summary', 'انتباہات کا خلاصہ')}</span>
              </div>
              <h2 id="quick-info-heading" className={sectionTitleClassName}>
                {t('Quick Information', 'فوری معلومات')}
              </h2>
              <p className={sectionIntroClassName}>
                {t(
                  'Active advisories by category. Select a category to filter the advisory list below.',
                  'اقسام کے مطابق فعال انتباہات۔ نیچے دی گئی فہرست کو فلٹر کرنے کے لیے کوئی قسم منتخب کریں۔'
                )}
              </p>
            </div>

            <div className="mt-6 print:hidden">
              <QuickInfoCards counts={categoryCounts} />
            </div>
          </section>

          {/* ----------------------------- ROUTE STATUS --------------------------- */}
          <section aria-labelledby="route-status-heading">
            <div className="max-w-3xl">
              <div className={eyebrowClassName}>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                <span>{t('Roads & Routes', 'رستے اور سڑکیں')}</span>
              </div>
              <h2 id="route-status-heading" className={sectionTitleClassName}>
                {t('Route Status', 'رستوں کی صورتحال')}
              </h2>
              <p className={sectionIntroClassName}>
                {t(
                  'Current open/closed condition of the main Galiyat routes, maintained by the advisory board.',
                  'گلیات کے مرکزی رستوں کی موجودہ کھلی/بند صورتحال، جسے ایڈوائزری بورڈ برقرار رکھتا ہے۔'
                )}
              </p>
            </div>

            <div className="mt-6">
              {routesStatus === 'error' ? (
                <p className="font-jameel text-sm text-brand-light-muted">
                  رستوں کی معلومات اس وقت دستیاب نہیں۔
                </p>
              ) : (
                <RouteStatusBoard routes={routes} isLoading={routesStatus === 'loading'} />
              )}
            </div>
          </section>

          {/* ------------------------------ ADVISORY LIST ------------------------- */}
          {/* Header LTR (Roads & Routes jaisa) — sirf cards RTL/Urdu hain */}
          <section
            aria-labelledby="advisories-heading"
            ref={listRef}
            className="scroll-mt-24"
          >
            <div className="max-w-3xl">
              <div className={eyebrowClassName}>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                <span>Advisory Board</span>
              </div>
              <h2 id="advisories-heading" className={sectionTitleClassName}>
                Current Travel Advisories
              </h2>
              <p className={sectionIntroClassName}>
                The latest updates appear here first — please keep visiting this page for more
                updates.
              </p>
            </div>

            <div className="mt-6" lang="ur" dir="rtl">
              <div className={BOARD_FRAME}>
                {/* Board header — live badge + counts (Route Status Board jaisa) */}
                <div className={BOARD_HEADER}>
                  <span className={BOARD_TITLE}>
                    <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-lime opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-lime" />
                    </span>
                    Advisory Board · انتباہات
                  </span>

                  <span className="flex items-center gap-2">
                    {showingSamplesOnly && (
                      <span className={COUNT_CHIP}>نمونہ Sample</span>
                    )}
                    <span className={COUNT_CHIP}>{activeAdvisories.length} Active</span>
                  </span>
                </div>

                <div className="p-3 sm:p-4 lg:p-5">
              {/* Loading state */}
              {isLoading && (
                <div className="space-y-4" role="status" aria-live="polite">
                  <p className="flex items-center gap-2 font-jameel text-sm font-medium text-brand-light-muted">
                    <LoaderCircle className="h-4 w-4 animate-spin text-brand-blue" aria-hidden="true" />
                    انتباہات لوڈ ہو رہے ہیں…
                  </p>
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className="animate-pulse rounded-2xl border border-brand-light-border bg-brand-light-surface p-5"
                    >
                      <div className="h-4 w-32 rounded bg-brand-light-subtle" />
                      <div className="mt-3 h-5 w-3/4 rounded bg-brand-light-subtle" />
                      <div className="mt-3 h-3 w-full rounded bg-brand-light-subtle" />
                      <div className="mt-2 h-3 w-5/6 rounded bg-brand-light-subtle" />
                      <div className="mt-4 h-16 w-full rounded-xl bg-brand-light-subtle" />
                    </div>
                  ))}
                </div>
              )}

              {/* Error state */}
              {!isLoading && hasError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6" role="alert">
                  <div className="flex items-start gap-3">
                    <WifiOff className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                    <div className="min-w-0">
                      <h3 className="font-jameel text-base font-bold text-red-900">
                        انتباہات لوڈ نہیں ہو سکے
                      </h3>
                      <p className="mt-1 font-jameel text-sm leading-loose text-red-800">
                        انتباہی ڈیٹا حاصل نہیں ہو سکا۔ براہ کرم دوبارہ کوشش کریں۔
                      </p>
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                      >
                        <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        دوبارہ کوشش کریں
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sample-data notice — the list below is not an official notice */}
              {!isLoading && !hasError && showingSamplesOnly && (
                <div
                  className="mb-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 sm:p-5"
                  role="status"
                >
                  <div className="flex items-start gap-3">
                    <TriangleAlert
                      className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <h3 className="font-jameel text-base font-bold text-amber-900">
                        نمونہ انتباہات — سرکاری نوٹس نہیں
                      </h3>
                      <p className="mt-1 font-jameel text-sm leading-loose text-amber-900">
                        ایڈوائزری بورڈ نے ابھی تک کوئی سفری انتباہ شائع نہیں کیا۔ نیچے دیے گئے اندراجات نمونے کے
                        طور پر دکھائے گئے ہیں تاکہ ترتیب کا جائزہ لیا جا سکے۔ پہلا سرکاری انتباہ شائع ہونے پر یہ
                        خودبخود ہٹ جائیں گے۔
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Clean empty state — no published advisories at all */}
              {!isLoading && !hasError && activeAdvisories.length === 0 && (
                <div className="rounded-2xl border border-brand-light-border bg-brand-light-surface p-8 text-center shadow-gov">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue-50">
                    <ShieldCheck className="h-6 w-6 text-brand-blue" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-jameel text-base font-bold text-brand-dark">
                    کوئی فعال سفری انتباہ موجود نہیں
                  </h3>
                  <p className="mx-auto mt-2 max-w-xl font-jameel text-sm leading-loose text-brand-light-muted">
                    اس وقت گلیات کے لیے کوئی شائع شدہ انتباہ موجود نہیں۔ براہ کرم معمول کے ٹریفک قوانین اور سڑک
                    پر موجود ٹریفک اہلکار کی ہدایات پر عمل جاری رکھیں۔
                  </p>
                </div>
              )}

              {/* No results for the current filters */}
              {!isLoading &&
                !hasError &&
                activeAdvisories.length > 0 &&
                visibleAdvisories.length === 0 && (
                  <div className="rounded-2xl border border-brand-light-border bg-brand-light-surface p-8 text-center shadow-gov">
                    <h3 className="font-jameel text-base font-bold text-brand-dark">
                      آپ کے فلٹرز سے کوئی انتباہ مطابقت نہیں رکھتا
                    </h3>
                    <p className="mx-auto mt-2 max-w-xl font-jameel text-sm leading-loose text-brand-light-muted">
                      کوئی مختلف قسم، ترجیح یا مقام منتخب کریں، یا تمام فعال انتباہات دیکھنے کے لیے فلٹرز ری
                      سیٹ کریں۔
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-brand-blue-200 bg-white px-3.5 py-2 text-sm font-semibold text-brand-blue-700 transition-colors hover:bg-brand-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
                    >
                      <RefreshCw className="h-4 w-4" aria-hidden="true" />
                      فلٹر ری سیٹ کریں
                    </button>
                  </div>
                )}

              {/* Active advisory list */}
              {!isLoading && !hasError && visibleAdvisories.length > 0 && (
                <ul className="space-y-4">
                  {visibleAdvisories.map((advisory) => (
                    <li key={advisory.id}>
                      <AdvisoryCard advisory={advisory} forceLanguage="ur" />
                    </li>
                  ))}
                </ul>
              )}
                </div>
              </div>
            </div>
          </section>

          {/* --------------------------- SAFETY GUIDELINES ------------------------- */}
          <section aria-labelledby="safety-heading">
            <div className="max-w-3xl">
              <div className={eyebrowClassName}>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                <span>{t('Safety Guidance', 'حفاظتی رہنمائی')}</span>
              </div>
              <h2 id="safety-heading" className={sectionTitleClassName}>
                {t('Travel Safety Guidelines', 'سفری حفاظتی ہدایات')}
              </h2>
              <p className={sectionIntroClassName}>
                {t(
                  'Please observe the following guidance while travelling to and within the Galiyat region.',
                  'گلیات کے علاقے میں سفر کے دوران براہ کرم درج ذیل ہدایات پر عمل کریں۔'
                )}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TRAVEL_SAFETY_GUIDELINES.map((guideline) => (
                <div
                  key={guideline.id}
                  className="rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov sm:p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                    <AdvisoryIcon name={guideline.iconName} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold leading-snug text-brand-dark sm:text-base">
                    {language === 'ur' ? guideline.titleUr : guideline.titleEn}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-light-muted">
                    {language === 'ur' ? guideline.descriptionUr : guideline.descriptionEn}
                  </p>
                </div>
              ))}

              {/* Rapidly changing conditions note */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <TriangleAlert className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-sm font-bold leading-snug text-amber-900 sm:text-base">
                  {t(CHANGING_CONDITIONS_NOTE.titleEn, CHANGING_CONDITIONS_NOTE.titleUr)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-amber-900">
                  {t(CHANGING_CONDITIONS_NOTE.bodyEn, CHANGING_CONDITIONS_NOTE.bodyUr)}
                </p>
              </div>
            </div>
          </section>

          {/* ------------------------ BEFORE YOU TRAVEL CHECKLIST ------------------ */}
          <section aria-labelledby="checklist-heading">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-1">
                <div className={eyebrowClassName}>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                  <span>{t('Travel Checklist', 'سفری چیک لسٹ')}</span>
                </div>
                <h2 id="checklist-heading" className={sectionTitleClassName}>
                  {t('Before You Travel', 'سفر سے پہلے')}
                </h2>
                <p className={sectionIntroClassName}>
                  {t(
                    'A short checklist for visitors planning a trip to the Galiyat hills. Tick the items as you prepare.',
                    'گلیات کی پہاڑیوں کے سفر کا ارادہ رکھنے والے سیاحوں کے لیے مختصر چیک لسٹ۔ تیاری کے دوران آئٹمز پر نشان لگائیں۔'
                  )}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand-light-border bg-brand-light-subtle px-3 py-2 text-xs font-semibold text-brand-light-muted">
                  <ClipboardCheck className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                  {t(
                    `${checkedItems.length} of ${BEFORE_YOU_TRAVEL_CHECKLIST.length} completed`,
                    `${BEFORE_YOU_TRAVEL_CHECKLIST.length} میں سے ${checkedItems.length} مکمل`
                  )}
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-2">
                {BEFORE_YOU_TRAVEL_CHECKLIST.map((item) => {
                  const isChecked = checkedItems.includes(item.id);
                  return (
                    <li key={item.id}>
                      <label
                        className={cn(
                          'flex h-full cursor-pointer items-start gap-3 rounded-2xl border bg-brand-light-surface p-4 shadow-gov transition-colors',
                          isChecked
                            ? 'border-brand-blue-300 bg-brand-blue-50/60'
                            : 'border-brand-light-border hover:border-brand-blue-200'
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCheckedItem(item.id)}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-light-border accent-brand-blue"
                        />
                        <span
                          className={cn(
                            'min-w-0 text-sm leading-relaxed',
                            isChecked ? 'font-medium text-brand-dark' : 'text-brand-light-text'
                          )}
                        >
                          {language === 'ur' ? item.ur : item.en}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* ------------------------------ HELPLINE CTA -------------------------- */}
          <section
            aria-labelledby="helpline-heading"
            className="relative overflow-hidden rounded-3xl border border-[#0000aa] bg-[#000080] text-white"
          >
            <div className="pointer-events-none absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
            <div
              className="pointer-events-none absolute end-0 top-0 h-56 w-56 rounded-full bg-brand-blue/30 blur-3xl sm:h-72 sm:w-72"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute bottom-0 start-0 h-56 w-56 rounded-full bg-brand-lime/10 blur-3xl sm:h-72 sm:w-72"
              aria-hidden="true"
            />

            <div className="relative z-10 space-y-5 p-5 sm:p-8 lg:p-10">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{t('Emergency & Guidance', 'ایمرجنسی اور رہنمائی')}</span>
                </div>
                <h2
                  id="helpline-heading"
                  className="text-balance text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
                >
                  {t('Traffic Helpline & Updates', 'ٹریفک ہیلپ لائن اور اپ ڈیٹس')}
                </h2>
                <p className="text-sm leading-relaxed text-brand-blue-100 sm:text-base">
                  {t(
                    'For immediate on-road traffic assistance in Abbottabad and Galiyat, dial the Traffic Police helpline 1915. Check the weather information before starting your journey.',
                    'ایبٹ آباد اور گلیات میں سڑک پر فوری ٹریفک معاونت کے لیے ٹریفک پولیس ہیلپ لائن 1915 ڈائل کریں۔ سفر شروع کرنے سے قبل موسمی معلومات ضرور دیکھیں۔'
                  )}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="tel:1915"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-lime px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-lime-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime focus-visible:ring-offset-2 focus-visible:ring-offset-[#000080] sm:w-auto"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t('Call 1915', '1915 پر کال کریں')}</span>
                </a>

                <Link
                  to="/weather"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-auto"
                >
                  <span>{t('Weather Updates', 'موسمی معلومات')}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  );
};

export default GaliyatTravelAdvisory;
