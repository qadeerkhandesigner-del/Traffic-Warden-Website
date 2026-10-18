import React, { useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  BookOpen,
  OctagonAlert,
  TriangleAlert,
  Info,
  ShieldCheck,
  HeartHandshake,
  GraduationCap,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                  CONTENT                                   */
/* -------------------------------------------------------------------------- */

/** The three families of traffic signs, each with its official sign chart
 *  stored in `public/Trafic Education/`. */
const SIGN_SECTIONS = [
  {
    id: 'lazmi-ishary',
    icon: OctagonAlert,
    headingEn: 'Mandatory / Compulsory Signs',
    headingUr: 'لازمی اشارے',
    descEn:
      'These signs are compulsory and must be obeyed at all times. Ignoring a mandatory sign is a legal offence — for example, STOP and NO ENTRY are mandatory signs.',
    descUr:
      'یہ اشارے لازمی ہیں اور ہر حال میں ان پر عمل کرنا ضروری ہے۔ کسی لازمی اشارے کی خلاف ورزی قانونی جرم ہے — مثلاً اسٹاپ اور نو انٹری لازمی اشارے ہیں۔',
    accent: 'bg-red-600',
    soft: 'bg-red-50 text-red-700 border-red-200',
    image: '/Trafic%20Education/Lazmi-Ishary.png',
    altEn: 'Chart of mandatory (compulsory) traffic signs',
    altUr: 'لازمی ٹریفک اشاریوں کا چارٹ',
  },
  {
    id: 'ahteyati-ishary',
    icon: TriangleAlert,
    headingEn: 'Cautionary / Warning Signs',
    headingUr: 'احتیاطی اشارے',
    descEn:
      'These triangular signs warn you about hazards or conditions ahead — a sharp turn, narrow bridge, school zone or crossing — so you can slow down and stay alert.',
    descUr:
      'یہ مثلثی اشارے آگے آنے والے خطرات یا حالات سے آگاہ کرتے ہیں — تیزی سے مڑتی سڑک، تنگ پُل، اسکول زون یا کراسنگ — تاکہ آپ رفتار کم کریں اور ہوشیار رہیں۔',
    accent: 'bg-amber-500',
    soft: 'bg-amber-50 text-amber-700 border-amber-200',
    image: '/Trafic%20Education/Ahteyati-Ishary.png',
    altEn: 'Chart of cautionary (warning) traffic signs',
    altUr: 'احتیاطی ٹریفک اشاریوں کا چارٹ',
  },
  {
    id: 'mahloomati-ishary',
    icon: Info,
    headingEn: 'Informational / Informatory Signs',
    headingUr: 'معلوماتی اشارے',
    descEn:
      'These signs provide guidance and useful information — directions, distances, hospitals, fuel stations, parking and public services — helping you reach your destination safely.',
    descUr:
      'یہ اشارے رہنمائی اور مفید معلومات فراہم کرتے ہیں — سمت، فاصلے، ہسپتال، پٹرول پمپ، پارکنگ اور عوامی خدمات — جو آپ کو محفوظ طریقے سے منزل تک پہنچنے میں مدد دیتے ہیں۔',
    accent: 'bg-sky-600',
    soft: 'bg-sky-50 text-sky-700 border-sky-200',
    image: '/Trafic%20Education/mahloomati-Ishary.png',
    altEn: 'Chart of informational (informatory) traffic signs',
    altUr: 'معلوماتی ٹریفک اشاریوں کا چارٹ',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const TrafficEducation: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ٹریفک اشارے — ٹریفک تعلیم | ٹریفک وارڈن ایبٹ آباد'
        : 'Traffic Signs — Traffic Education | Traffic Warden Abbottabad';
  }, [language]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-light-bg text-brand-dark">
      {/* ---------------------------------- HERO ---------------------------------- */}
      <section className="relative overflow-hidden border-b border-[#0000aa] bg-[#000080] pt-8 pb-12 text-white sm:pt-12 sm:pb-16">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute end-0 top-0 h-56 w-56 rounded-full bg-brand-blue/30 blur-3xl sm:h-80 sm:w-80"
          aria-hidden="true"
        />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Education', labelUrdu: 'تعلیم' },
              { label: 'Traffic Education', labelUrdu: 'ٹریفک تعلیم' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
              <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {t('Education — Traffic Signs', 'تعلیم — ٹریفک اشارے')}
              </span>
            </div>

            <h1 className="text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t('TRAFFIC SIGNS', 'ٹریفک اشارے')}
            </h1>

            <p className="text-lg font-bold text-brand-lime sm:text-xl md:text-2xl">
              {t(
                'Understand the Signs. Follow the Rules. Stay Safe.',
                'اشاریوں کو سمجھیں۔ قوانین پر عمل کریں۔ محفوظ رہیں۔'
              )}
            </p>

            <p className="max-w-3xl text-sm font-medium leading-relaxed text-white/85 sm:text-base">
              {t(
                'Your complete guide to the essential traffic signs — mandatory, cautionary and informational — every road user in Pakistan should know.',
                'لازمی، احتیاطی اور معلوماتی اشاریوں کی مکمل رہنمائی — جو پاکستان کا ہر روڈ یوزر جاننا چاہیے۔'
              )}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <OctagonAlert className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('138 Total Traffic Signs', 'کل 138 ٹریفک اشارے')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <BookOpen className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('60 Essential Signs to Learn', 'سیکھنے کے لیے 60 اہم اشارے')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('3 Types of Signs', '3 قسم کے اشارے')}
              </span>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* --------------------------------- INTRO --------------------------------- */}
      <PageContainer>
        <div className="space-y-10 py-8 sm:space-y-14 sm:py-12 lg:py-16">
          <section aria-labelledby="intro-heading">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                {t('Overview', 'جائزہ')}
              </div>
              <h2
                id="intro-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t(
                  'Understand the Signs. Follow the Rules. Stay Safe.',
                  'اشاریوں کو سمجھیں۔ قوانین پر عمل کریں۔ محفوظ رہیں۔'
                )}
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-4 rounded-2xl border border-brand-light-border bg-white p-5 leading-relaxed text-slate-600 sm:p-6 lg:col-span-2">
                <p className="text-sm sm:text-base">
                  {t(
                    'Understanding traffic signs is essential for every road user. These signs communicate important instructions, warnings, and road conditions, helping drivers recognize what lies ahead and respond safely. For example, a STOP sign indicates that drivers must come to a complete stop before proceeding when it is safe and lawful to do so.',
                    'ہر روڈ یوزر کے لیے ٹریفک اشارے کو سمجھنا نہایت ضروری ہے۔ یہ اشارے اہم ہدایات، انتباہ اور سڑک کی حالتوں کی معلومات فراہم کرتے ہیں اور ڈرائیور کو آگے کی صورتحال پہچاننے اور محفوظ ردعمل دکھانے میں مدد دیتے ہیں۔ مثلاً اسٹاپ بورڈ سے ظاہر ہوتا ہے کہ ڈرائیور کو جب محفوظ اور قانونی طور پر ممکن ہو، آگے بڑھنے سے پہلے مکمل رک جانا چاہیے۔'
                  )}
                </p>
                <p className="text-sm sm:text-base">
                  {t(
                    'There are 138 important traffic signs in total, covering different instructions, warnings, and road information. Among them, certain signs are particularly important for everyday road use. This educational guide highlights 60 essential traffic signs that every driver should learn, understand, and follow.',
                    'مجموعی طور پر 138 اہم ٹریفک اشارے ہیں جو مختلف ہدایات، انتباہات اور سڑکی معلومات پر مشتمل ہیں۔ ان میں کچھ اشارے عام روزمرہ روڈ یوز کے لیے خاص طور پر اہم ہیں۔ یہ تعلیمی گائیڈ 60 بنیادی ٹریفک اشاروں پر روشنی ڈالتی ہے جنہیں ہر ڈرائیور کو سیکھنا، سمجھنا اور ان پر عمل کرنا چاہیے۔'
                  )}
                </p>
                <p className="text-sm sm:text-base">
                  {t(
                    'Traffic signs are designed to communicate vital information at a glance. They help road users identify potential hazards, understand road conditions, and make timely decisions without needing to read lengthy instructions. Their standardized symbols also help people understand road information across different languages and literacy levels.',
                    'ٹریفک اشارے ایک نظر میں اہم معلومات پہنچانے کے لیے بنائے گئے ہیں۔ یہ روڈ یوزرز کو ممکنہ خطرات کی نشاندہی، سڑکی حالات سمجھنے اور طویل ہدایات پڑھے بغیر بروقت فیصلے کرنے میں مدد دیتے ہیں۔ ان کے معیاری علامات مختلف زبانوں اور تعلیمی سطحوں کے لوگوں کے لیے بھی سڑکی معلومات کو آسان بناتے ہیں۔'
                  )}
                </p>
              </div>

              {/* Quick stats card */}
              <div className="flex flex-col justify-center gap-4 rounded-2xl border border-brand-light-border bg-gradient-to-br from-[#000080] to-[#0000aa] p-6 text-white sm:p-8">
                <div>
                  <div className="text-4xl font-extrabold text-brand-lime sm:text-5xl">138</div>
                  <div className="mt-1 text-sm font-semibold text-white/85">
                    {t('Total Traffic Signs', 'کل ٹریفک اشارے')}
                  </div>
                </div>
                <div className="h-px bg-white/20" aria-hidden="true" />
                <div>
                  <div className="text-4xl font-extrabold text-brand-lime sm:text-5xl">60</div>
                  <div className="mt-1 text-sm font-semibold text-white/85">
                    {t('Essential Signs for Every Driver', 'ہر ڈرائیور کے لیے اہم اشارے')}
                  </div>
                </div>
                <div className="h-px bg-white/20" aria-hidden="true" />
                <div>
                  <div className="text-4xl font-extrabold text-brand-lime sm:text-5xl">3</div>
                  <div className="mt-1 text-sm font-semibold text-white/85">
                    {t('Categories of Signs', 'اشاریوں کی اقسام')}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ----------------------- THREE TYPES OF SIGNS ----------------------- */}
          {SIGN_SECTIONS.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider sm:text-xs ${section.soft}`}
                  >
                    <section.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {language === 'ur'
                      ? `${index + 1} قسم ${3} میں سے`
                      : `Type ${index + 1} of 3`}
                  </div>
                  <h2
                    id={`${section.id}-heading`}
                    className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
                  >
                    {t(section.headingEn, section.headingUr)}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                    {t(section.descEn, section.descUr)}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-brand-light-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div className={`h-1 w-full ${section.accent}`} aria-hidden="true" />
                <figure className="p-3 sm:p-5">
                  <img
                    src={section.image}
                    alt={language === 'ur' ? section.altUr : section.altEn}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="mx-auto w-full max-w-4xl rounded-xl object-contain"
                  />
                  <figcaption className="mt-3 text-center text-xs text-slate-500 sm:text-sm">
                    {t(
                      `Official chart — ${section.headingEn.replace(' Signs', '')}`,
                      `سرکاری چارٹ — ${section.headingUr}`
                    )}
                  </figcaption>
                </figure>
              </div>
            </section>
          ))}

          {/* ----------------------------- SAFETY GUIDE ----------------------------- */}
          <section aria-labelledby="safety-guide-heading">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700 sm:text-xs">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {t('Safety Guide', 'سیفٹی گائیڈ')}
              </div>
              <h2
                id="safety-guide-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Road Safety Guide', 'روڈ سیفٹی گائیڈ')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Follow these safety rules in your daily commute — they work together with the traffic signs to keep you and others safe on the road.',
                  'روزمرہ سفر میں ان حفاظتی قواعد پر عمل کریں — یہ ٹریفک اشاروں کے ساتھ مل کر آپ کو اور دیگر کو سڑک پر محفوظ رکھتے ہیں۔'
                )}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-brand-light-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <div className="h-1 w-full bg-emerald-500" aria-hidden="true" />
              <figure className="p-3 sm:p-5">
                <img
                  src="/Trafic%20Education/Traffic-Safety-Rules.png"
                  alt={t(
                    'Road safety rules chart',
                    'روڈ سیفٹی رولز کا چارٹ'
                  )}
                  loading="lazy"
                  className="mx-auto w-full max-w-4xl rounded-xl object-contain"
                />
                <figcaption className="mt-3 text-center text-xs text-slate-500 sm:text-sm">
                  {t(
                    'Official chart — Traffic Safety Rules',
                    'سرکاری چارٹ — ٹریفک سیفٹی رولز'
                  )}
                </figcaption>
              </figure>
            </div>
          </section>

          {/* ------------------------------- REMEMBER ------------------------------- */}
          <section aria-labelledby="remember-heading">
            <div className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-10">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white sm:h-14 sm:w-14">
                  <HeartHandshake className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="remember-heading"
                    className="text-lg font-extrabold uppercase tracking-wide text-amber-700 sm:text-xl"
                  >
                    {t('Remember', 'یاد رکھیں')}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-brand-dark sm:text-base">
                    {t(
                      'Traffic rules and regulations are designed to protect your life and the lives of others. Learn the signs, obey the rules, and drive responsibly.',
                      'ٹریفک قواعد و ضوابط آپ کی جان اور دوسروں کی جانوں کے تحفظ کے لیے بنائے گئے ہیں۔ اشارے سیکھیں، قوانین کی تعمیل کریں، اور ذمہ داری سے ڈرائیو کریں۔'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------ FOOTER NOTE ------------------------------ */}
          <section>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-brand-light-border bg-white p-6 text-center sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue/10">
                <GraduationCap className="h-5 w-5 text-brand-blue" aria-hidden="true" />
              </div>
              <p className="max-w-2xl text-sm font-semibold leading-relaxed text-brand-dark sm:text-base">
                {t(
                  'Traffic Warden Abbottabad — Promoting Road Safety Through Awareness and Education.',
                  'ٹریفک وارڈن ایبٹ آباد — آگاہی اور تعلیم کے ذریعے روڈ سیفٹی کا فروغ۔'
                )}
              </p>
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  );
};

export default TrafficEducation;
