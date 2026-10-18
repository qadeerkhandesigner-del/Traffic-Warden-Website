import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  Download,
  ExternalLink,
  IdCard,
  ListChecks,
  ScanLine,
  ShieldCheck,
  Smartphone,
  UserCheck,
  QrCode,
  Save,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ContactSection } from '../components/ui/ContactSection';
import { useLanguage } from '../hooks/useLanguage';

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.nsd.rabta&hl=en_GB';

interface StepDetails {
  en: string;
  ur: string;
}

interface Step {
  id: string;
  no: string;
  icon: LucideIcon;
  titleEn: string;
  titleUr: string;
  descEn: string;
  descUr: string;
  details?: StepDetails[];
  action?: 'download';
}

const STEPS: Step[] = [
  {
    id: 'download',
    no: '01',
    icon: Download,
    titleEn: 'Download the Raabta App',
    titleUr: 'رابطہ ایپ ڈاؤن لوڈ کریں',
    descEn: 'Download and install the RAABTA App from the Google Play Store or Apple App Store.',
    descUr: 'گوگل پلے اسٹور یا ایپل ایپ اسٹور سے RAABTA ایپ ڈاؤن لوڈ اور انسٹال کریں۔',
    action: 'download',
  },
  {
    id: 'open',
    no: '02',
    icon: Smartphone,
    titleEn: 'Open the App',
    titleUr: 'ایپ کھولیں',
    descEn: 'Launch the Raabta App and tap the E-License icon on the main dashboard.',
    descUr: 'رابطہ ایپ لانچ کریں اور مرکزی ڈیش بورڈ پر ای-لائسنس آئیکن پر ٹیپ کریں۔',
  },
  {
    id: 'details',
    no: '03',
    icon: UserCheck,
    titleEn: 'Enter Your Details',
    titleUr: 'اپنی تفصیلات درج کریں',
    descEn: 'Enter the following information accurately:',
    descUr: 'درج ذیل معلومات درست طریقے سے درج کریں:',
    details: [
      {
        en: 'CNIC Number: Enter your CNIC without dashes.',
        ur: 'شناختی کارڈ نمبر: اپنا شناختی کارڈ نمبر بغیر ڈیش کے درج کریں۔',
      },
      {
        en: 'Driving License Number: Enter your valid driving license number.',
        ur: 'ڈرائیونگ لائسنس نمبر: اپنا درست ڈرائیونگ لائسنس نمبر درج کریں۔',
      },
    ],
  },
  {
    id: 'view',
    no: '04',
    icon: QrCode,
    titleEn: 'View Your E-License',
    titleUr: 'اپنا ای-لائسنس دیکھیں',
    descEn:
      'Submit your details. Your digital driving license should appear on the screen, displaying your photograph and license validity.',
    descUr:
      'اپنی تفصیلات جمع کریں۔ آپ کا ڈیجیٹل ڈرائیونگ لائسنس اسکرین پر ظاہر ہوگا، جس میں آپ کی تصویر اور لائسنس کی مدت درج ہوگی۔',
  },
  {
    id: 'save',
    no: '05',
    icon: Save,
    titleEn: 'Save Your Digital License',
    titleUr: 'اپنا ڈیجیٹل لائسنس محفوظ کریں',
    descEn:
      'Take a screenshot or use the available save or download option to keep a copy on your mobile phone.',
    descUr:
      'اسکرین شاٹ لیں یا دستیاب سیو یا ڈاؤن لوڈ آپشن استعمال کریں تاکہ ایک کاپی آپ کے موبائل فون میں محفوظ رہے۔',
  },
];

const IMPORTANT_NOTES = [
  {
    id: 'eligible',
    en: 'This service is intended for holders of valid, regular KP driving licenses.',
    ur: 'یہ سروس صرف درست اور باقاعدہ کے پی ڈرائیونگ لائسنس رکھنے والوں کے لیے ہے۔',
  },
  {
    id: 'accurate',
    en: 'Make sure your CNIC and driving license details are entered correctly.',
    ur: 'یقینی بنائیں کہ آپ کا شناختی کارڈ نمبر اور ڈرائیونگ لائسنس کی تفصیلات درست درج کی گئی ہیں۔',
  },
  {
    id: 'assistance',
    en: 'If your license does not appear, verify your information and contact the concerned Driving License Branch for assistance.',
    ur: 'اگر آپ کا لائسنس ظاہر نہ ہو تو اپنی معلومات کی تصدیق کریں اور مدد کے لیے متعلقہ ڈرائیونگ لائسنس برانچ سے رابطہ کریں۔',
  },
];

const HIGHLIGHTS = [
  { id: 'steps', icon: ListChecks, en: '5 Simple Steps', ur: '5 آسان مراحل' },
  { id: 'license', icon: IdCard, en: 'Valid KP License Required', ur: 'درست کے پی لائسنس لازمی' },
  { id: 'free', icon: Smartphone, en: 'Available on Play & App Store', ur: 'پلے اور ایپ اسٹور پر دستیاب' },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const ELicense: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'رابطہ ایپ پر ای-لائسنس | ٹریفک وارڈن ایبٹ آباد'
        : 'E-License on the Raabta App | Traffic Warden Abbottabad';
  }, [language]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-light-bg text-brand-dark">
      {/* ---------------------------------- HERO ---------------------------------- */}
      <section className="relative overflow-hidden border-b border-[#0000aa] bg-[#000080] pt-6 pb-10 text-white sm:pt-8 sm:pb-14">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute end-0 top-0 h-56 w-56 rounded-full bg-brand-blue/30 blur-3xl sm:h-80 sm:w-80"
          aria-hidden="true"
        />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Services', labelUrdu: 'خدمات', path: '/services' },
              {
                label: 'Driving License Services',
                labelUrdu: 'ڈرائیونگ لائسنس سروسز',
                path: '/services/driving-license',
              },
              { label: 'E-License', labelUrdu: 'ای-لائسنس' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
              <QrCode className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {t('Digital Driving License', 'ڈیجیٹل ڈرائیونگ لائسنس')}
              </span>
            </div>

            <h1 className="text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t(
                'How to Get Your E-License on the Raabta App',
                'رابطہ ایپ پر ای-لائسنس کیسے حاصل کریں'
              )}
            </h1>

            <p className="text-sm font-semibold text-brand-lime sm:text-base md:text-lg">
              {t(
                'Your Digital Driving License in 5 Easy Steps',
                '5 آسان مراحل میں آپ کا ڈیجیٹل ڈرائیونگ لائسنس'
              )}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {HIGHLIGHTS.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                  {t(item.en, item.ur)}
                </span>
              ))}
            </div>

            <div className="pt-3">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-lime px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-lime/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t('Download Raabta App', 'رابطہ ایپ ڈاؤن لوڈ کریں')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <div className="space-y-10 py-8 sm:space-y-14 sm:py-12 lg:py-16">
          {/* -------------------------------- OVERVIEW ----------------------------- */}
          <section aria-labelledby="overview-heading">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                  {t('Overview', 'تعارف')}
                </div>

                <h2
                  id="overview-heading"
                  className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
                >
                  {t('Your License, Now on Your Phone', 'آپ کا لائسنس، اب آپ کے موبائل پر')}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Already have a valid, regular Khyber Pakhtunkhwa (KP) driving license? You can access your digital driving license through the Raabta App by following these simple steps.',
                    'کیا آپ کے پاس پہلے سے درست اور باقاعدہ خیبر پختونخوا (KP) ڈرائیونگ لائسنس موجود ہے؟ درج ذیل آسان مراحل پر عمل کر کے آپ رابطہ ایپ کے ذریعے اپنا ڈیجیٹل ڈرائیونگ لائسنس حاصل کر سکتے ہیں۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'The E-License displays your photograph and license validity, so you can carry your driving license digitally at all times.',
                    'ای-لائسنس میں آپ کی تصویر اور لائسنس کی مدت درج ہوتی ہے، اس لیے آپ اپنا ڈرائیونگ لائسنس ہر وقت ڈیجیٹل طور پر ساتھ رکھ سکتے ہیں۔'
                  )}
                </p>
              </div>

              {/* At-a-glance callout */}
              <div className="lg:col-span-1">
                <div className="h-full rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-4 sm:p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-brand-blue-900 sm:text-base">
                    {t('What You Need', 'آپ کو کیا درکار ہے')}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    <li className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {t('A valid, regular KP driving license', 'درست اور باقاعدہ کے پی ڈرائیونگ لائسنس')}
                    </li>
                    <li className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {t('Your CNIC number (without dashes)', 'آپ کا شناختی کارڈ نمبر (بغیر ڈیش)')}
                    </li>
                    <li className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {t('Your driving license number', 'آپ کا ڈرائیونگ لائسنس نمبر')}
                    </li>
                    <li className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {t('The Raabta App on your mobile phone', 'آپ کے موبائل فون پر رابطہ ایپ')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------ STEP BY STEP --------------------------- */}
          <section aria-labelledby="steps-heading">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
                {t('Step-by-Step Guide', 'مرحلہ وار رہنمائی')}
              </div>
              <h2
                id="steps-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Get Your E-License in 5 Steps', '5 مراحل میں اپنا ای-لائسنس حاصل کریں')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Follow the steps below in order, using the Raabta App on your mobile phone.',
                  'اپنے موبائل فون پر رابطہ ایپ استعمال کرتے ہوئے نیچے دیے گئے مراحل ترتیب سے مکمل کریں۔'
                )}
              </p>
            </div>

            <ol className="space-y-4 sm:space-y-5">
              {STEPS.map((step) => (
                <li
                  key={step.id}
                  className="group relative overflow-hidden rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                    {/* Number + icon */}
                    <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-blue text-brand-lime sm:h-14 sm:w-14">
                        <step.icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-sm font-extrabold text-brand-blue-200 sm:text-base">
                        {step.no}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="min-w-0 flex-1 space-y-2">
                      <h3 className="break-words text-base font-bold text-brand-dark sm:text-lg">
                        {t(step.titleEn, step.titleUr)}
                      </h3>
                      <p className="break-words text-sm leading-relaxed text-brand-light-text sm:text-base">
                        {t(step.descEn, step.descUr)}
                      </p>

                      {step.details && (
                        <ul className="mt-3 space-y-2">
                          {step.details.map((detail) => (
                            <li
                              key={detail.en}
                              className="flex items-start gap-2.5 rounded-xl border border-brand-blue-100 bg-brand-blue-50 p-3"
                            >
                              <BadgeCheck
                                className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue"
                                aria-hidden="true"
                              />
                              <span className="break-words text-sm leading-relaxed text-brand-blue-900/90">
                                {t(detail.en, detail.ur)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {step.action === 'download' && (
                        <div className="mt-3">
                          <a
                            href={PLAY_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400 sm:w-auto"
                          >
                            <Download className="h-4 w-4" aria-hidden="true" />
                            {t('Download from Google Play', 'گوگل پلے سے ڈاؤن لوڈ کریں')}
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {/* Tap the E-License icon hint */}
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-4 sm:p-5">
              <ScanLine className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
              <p className="break-words text-sm leading-relaxed text-brand-blue-900/90">
                {t(
                  'Tip: On the Raabta App dashboard, look for the "E-License" icon — it opens the digital driving license screen.',
                  'مشورہ: رابطہ ایپ کے ڈیش بورڈ پر "ای-لائسنس" آئیکن تلاش کریں — یہ ڈیجیٹل ڈرائیونگ لائسنس کی اسکرین کھولتا ہے۔'
                )}
              </p>
            </div>
          </section>

          {/* ---------------------------- IMPORTANT INFO --------------------------- */}
          <section aria-labelledby="important-heading">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <CircleAlert className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 id="important-heading" className="text-base font-bold text-amber-900 sm:text-lg">
                  {t('Important Information', 'اہم معلومات')}
                </h2>
              </div>

              <ul className="mt-4 space-y-2.5 sm:mt-5">
                {IMPORTANT_NOTES.map((note) => (
                  <li key={note.id} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                      aria-hidden="true"
                    />
                    <p className="break-words text-sm leading-relaxed text-amber-900/90">
                      {t(note.en, note.ur)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* -------------------------------- CONTACT ------------------------------ */}
          <ContactSection>
            <Link
              to="/services/driving-license"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime sm:w-auto"
            >
              <IdCard className="h-4 w-4" aria-hidden="true" />
              {t('All License Services', 'تمام لائسنس سروسز')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </ContactSection>
        </div>
      </PageContainer>
    </div>
  );
};

export default ELicense;
