import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CloudDownload,
  LocateFixed,
  Map as MapIcon,
  ShieldCheck,
  Snowflake,
  TriangleAlert,
} from 'lucide-react';
import { PageContainer } from '../layout/PageContainer';
import { useLanguage } from '../../hooks/useLanguage';
import { cn } from '../../lib/utils';

const ADVISORY_PATH = '/tourism/galiyat-travel-advisory';
const WINTER_GUIDE_PATH = '/tourism/winter-travel-safety';
const MAP_PATH = '/tourism/abbottabad-map';
const TRACK_PATH = '/track-location';

const navyCardClassName =
  'group relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#000080] p-7 text-white shadow-gov-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 sm:p-8';

const cardTitleClassName = 'relative mt-6 text-2xl font-extrabold tracking-tight text-white';

const cardTextClassName = 'relative mt-2 text-sm leading-relaxed text-white/75';

const chipBaseClassName =
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide';

const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => {
  const { isRTL } = useLanguage();
  return (
    <ArrowRight
      className={cn(
        'h-4 w-4 shrink-0 transition-transform',
        isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1',
        className
      )}
      aria-hidden="true"
    />
  );
};

/**
 * Travel & City Desk — the homepage gateway to the three tourism tools that
 * already exist on the portal: the Galiyat travel advisory, the interactive
 * Abbottabad tourist map and live location sharing.
 *
 * All three cards share one official navy treatment so the section reads as a
 * single service desk rather than three unrelated links.
 *
 * Deliberately link/text based: no map library, geolocation code or advisory
 * fetching is pulled into the eagerly-loaded homepage chunk.
 */
export const TravelDesk: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section
      id="travel-desk"
      className="relative overflow-hidden border-t border-brand-light-border bg-brand-light-surface py-16 sm:py-20"
    >
      {/* Soft decorative wash behind the section heading */}
      <div
        className="pointer-events-none absolute -end-24 -top-10 h-72 w-72 rounded-full bg-brand-blue-50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -start-24 bottom-0 h-64 w-64 rounded-full bg-brand-lime-50 blur-3xl"
        aria-hidden="true"
      />

      <PageContainer className="relative">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              <span>{language === 'ur' ? 'سفر و سیاحت ڈیسک' : 'TRAVEL & TOURISM DESK'}</span>
            </div>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl lg:text-4xl">
              {language === 'ur'
                ? 'ایبٹ آباد اور گلیات کے سفر کی منصوبہ بندی کریں'
                : 'Plan Your Journey Through Abbottabad & Galiyat'}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-brand-light-muted sm:text-base">
              {language === 'ur'
                ? 'سفری ایڈوائزری، انٹرایکٹو سیاحتی نقشہ اور لائیو لوکیشن شیئرنگ — تینوں سہولیات ایک ہی جگہ سے حاصل کریں۔'
                : 'Travel advisories, the interactive tourist map and live location sharing — all three tourism tools in one place.'}
            </p>
          </div>

          <Link
            to={WINTER_GUIDE_PATH}
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-brand-light-border bg-brand-light-surface px-5 py-3 text-xs font-bold text-brand-dark shadow-gov transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue-200 hover:bg-brand-blue-50 hover:text-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            <Snowflake className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
            <span>{language === 'ur' ? 'سردیوں کی سفری رہنمائی' : 'Winter Travel Guidance'}</span>
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ------------------------- 1. Travel Advisory ------------------------- */}
          <Link to={ADVISORY_PATH} className={navyCardClassName}>
            <div className="pointer-events-none absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -end-20 -top-20 h-56 w-56 rounded-full bg-brand-blue/30 blur-3xl"
              aria-hidden="true"
            />
            <TriangleAlert
              className="pointer-events-none absolute -bottom-5 -end-4 h-40 w-40 rotate-12 text-white/5"
              aria-hidden="true"
            />

            <div className="relative flex items-start justify-between gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-lime text-brand-dark shadow-lg">
                <TriangleAlert className="h-6 w-6" aria-hidden="true" />
              </span>

              <span className={cn(chipBaseClassName, 'border-brand-lime/30 bg-brand-lime/10 text-brand-lime')}>
                <ShieldCheck className="h-3 w-3 shrink-0" aria-hidden="true" />
                {language === 'ur' ? 'سرکاری' : 'Official'}
              </span>
            </div>

            <h3 className={cardTitleClassName}>
              {language === 'ur' ? 'سفری ایڈوائزری' : 'Travel Advisory'}
            </h3>
            <p className={cardTextClassName}>
              {language === 'ur'
                ? 'گلیات کے راستوں کی صورتحال، سڑک بندش، ڈائیورژن اور حفاظتی ہدایات ایک جگہ دیکھیں۔'
                : 'Check road conditions, closures, diversions and safety notices for the Galiyat routes in one place.'}
            </p>

            <ul className="relative mt-5 space-y-2 text-sm text-white/85">
              {[
                { en: 'Road closures & diversions', ur: 'سڑک بندش اور ڈائیورژن' },
                { en: 'Weather & safety notices', ur: 'موسم اور حفاظتی ہدایات' },
                { en: 'Live route status board', ur: 'راستوں کی تازہ صورتحال' },
              ].map((item) => (
                <li key={item.en} className="flex items-start gap-2.5">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-lime"
                    aria-hidden="true"
                  />
                  <span>{language === 'ur' ? item.ur : item.en}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-auto pt-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-lime px-5 py-2.5 text-xs font-bold text-brand-dark transition-colors group-hover:bg-brand-lime-hover">
                <span>{language === 'ur' ? 'ایڈوائزری دیکھیں' : 'View Travel Advisory'}</span>
                <ArrowIcon />
              </span>

              <p className="mt-4 text-[11px] text-white/60">
                {language === 'ur'
                  ? 'ٹریفک پولیس کی جانب سے باقاعدگی سے اپڈیٹ کی جاتی ہے'
                  : 'Published and updated by Traffic Police'}
              </p>
            </div>
          </Link>

          {/* --------------------------- 2. Tourist Map --------------------------- */}
          <Link to={MAP_PATH} className={navyCardClassName}>
            <div className="pointer-events-none absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -end-20 -top-20 h-56 w-56 rounded-full bg-brand-blue/30 blur-3xl"
              aria-hidden="true"
            />
            <MapIcon
              className="pointer-events-none absolute -bottom-5 -end-4 h-40 w-40 rotate-12 text-white/5"
              aria-hidden="true"
            />

            <div className="relative flex items-start justify-between gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-lime text-brand-dark shadow-lg">
                <MapIcon className="h-6 w-6" aria-hidden="true" />
              </span>

              <span className={cn(chipBaseClassName, 'border-white/20 bg-white/10 text-white/80')}>
                <CloudDownload className="h-3 w-3 shrink-0" aria-hidden="true" />
                {language === 'ur' ? 'آف لائن' : 'Offline'}
              </span>
            </div>

            <h3 className={cardTitleClassName}>
              {language === 'ur' ? 'ایبٹ آباد سیاحتی نقشہ' : 'Abbottabad Tourist Map'}
            </h3>
            <p className={cardTextClassName}>
              {language === 'ur'
                ? 'سیاحتی مقامات، ہوٹل، ریسٹورنٹ، پٹرول پمپ، پولیس معاونت اور ٹریکنگ راستے ایک انٹرایکٹو نقشے پر تلاش کریں۔'
                : 'Find attractions, hotels, restaurants, fuel stations, police assistance points and hiking trails on one interactive map.'}
            </p>

            <div className="relative mt-5 flex flex-wrap gap-1.5">
              {[
                { en: 'Attractions', ur: 'سیاحتی مقامات' },
                { en: 'Hotels', ur: 'ہوٹل' },
                { en: 'Fuel', ur: 'پٹرول پمپ' },
                { en: 'Trails', ur: 'ٹریکنگ' },
              ].map((tag) => (
                <span
                  key={tag.en}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/80"
                >
                  {language === 'ur' ? tag.ur : tag.en}
                </span>
              ))}
            </div>

            <div className="relative mt-auto pt-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-lime px-5 py-2.5 text-xs font-bold text-brand-dark transition-colors group-hover:bg-brand-lime-hover">
                <span>{language === 'ur' ? 'نقشہ کھولیں' : 'Open Interactive Map'}</span>
                <ArrowIcon />
              </span>

              <p className="mt-4 text-[11px] text-white/60">
                {language === 'ur'
                  ? 'ایک بار ڈاؤن لوڈ کریں، بعد میں آف لائن بھی دیکھیں'
                  : 'Download once, then browse it offline'}
              </p>
            </div>
          </Link>

          {/* ------------------------ 3. Track Your Location ---------------------- */}
          <Link to={TRACK_PATH} className={navyCardClassName}>
            <div className="pointer-events-none absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -end-20 -top-20 h-56 w-56 rounded-full bg-brand-blue/30 blur-3xl"
              aria-hidden="true"
            />
            <LocateFixed
              className="pointer-events-none absolute -bottom-5 -end-4 h-40 w-40 rotate-12 text-white/5"
              aria-hidden="true"
            />

            <div className="relative flex items-start justify-between gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-lime text-brand-dark shadow-lg">
                <LocateFixed className="h-6 w-6" aria-hidden="true" />
              </span>

              <span className={cn(chipBaseClassName, 'border-brand-lime/30 bg-brand-lime/10 text-brand-lime')}>
                <ShieldCheck className="h-3 w-3 shrink-0" aria-hidden="true" />
                {language === 'ur' ? 'محفوظ' : 'Private'}
              </span>
            </div>

            <h3 className={cardTitleClassName}>
              {language === 'ur' ? 'اپنی لوکیشن شیئر کریں' : 'Track Your Location'}
            </h3>
            <p className={cardTextClassName}>
              {language === 'ur'
                ? 'سفر کے دوران اپنی لائیو جی پی ایس لوکیشن ٹریفک پولیس کے ساتھ شیئر کریں تاکہ ہنگامی حالت میں فوری مدد مل سکے۔'
                : 'Share your live GPS location with Traffic Police while travelling, so help can reach you quickly in an emergency.'}
            </p>

            <div className="relative mt-5 flex items-start gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
              <p className="text-[11px] leading-relaxed text-white/80">
                {language === 'ur'
                  ? 'شیئرنگ صرف اسی وقت تک جاری رہتی ہے جب تک آپ ٹریکنگ آن رکھیں — کنٹرول آپ کے پاس ہے۔'
                  : 'Sharing stays on only while you keep tracking enabled — you stay in control.'}
              </p>
            </div>

            <div className="relative mt-auto pt-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-lime px-5 py-2.5 text-xs font-bold text-brand-dark transition-colors group-hover:bg-brand-lime-hover">
                <span>{language === 'ur' ? 'لائیو لوکیشن شیئر کریں' : 'Share Live Location'}</span>
                <ArrowIcon />
              </span>

              <p className="mt-4 text-[11px] text-white/60">
                {language === 'ur'
                  ? 'آپ خود طے کرتے ہیں کہ شیئرنگ کب شروع اور کب بند ہو'
                  : 'You decide when sharing starts and stops'}
              </p>
            </div>
          </Link>
        </div>
      </PageContainer>
    </section>
  );
};

export default TravelDesk;
