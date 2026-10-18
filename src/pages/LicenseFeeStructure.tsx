import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Banknote,
  Calculator,
  CarFront,
  CircleAlert,
  Copy,
  Globe,
  GraduationCap,
  IdCard,
  ListChecks,
  RefreshCw,
  Stethoscope,
  Wallet,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ContactSection } from '../components/ui/ContactSection';
import { useLanguage } from '../hooks/useLanguage';

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

interface FeeRow {
  categoryEn: string;
  categoryUr: string;
  fee?: string;
  pending?: boolean;
}

interface FeeGroup {
  id: string;
  no: string;
  icon: LucideIcon;
  serviceEn: string;
  serviceUr: string;
  rows: FeeRow[];
}

const FEE_GROUPS: FeeGroup[] = [
  {
    id: 'learner-permit',
    no: '01',
    icon: GraduationCap,
    serviceEn: 'Learner Permit',
    serviceUr: 'لرنر پرمٹ',
    rows: [
      { categoryEn: 'Motorcycle Only', categoryUr: 'صرف موٹر سائیکل', fee: 'Rs. 1,000' },
      { categoryEn: 'Motor Car / Jeep', categoryUr: 'موٹر کار / جیپ', pending: true },
      { categoryEn: 'Motorcycle + Motor Car / Jeep', categoryUr: 'موٹر سائیکل + موٹر کار / جیپ', pending: true },
    ],
  },
  {
    id: 'medical',
    no: '02',
    icon: Stethoscope,
    serviceEn: 'Medical Examination',
    serviceUr: 'طبی معائنہ',
    rows: [{ categoryEn: 'As Applicable', categoryUr: 'جیسا لاگو ہو', fee: 'Rs. 150' }],
  },
  {
    id: 'driving-test',
    no: '03',
    icon: CarFront,
    serviceEn: 'Driving Test & E-Test',
    serviceUr: 'ڈرائیونگ ٹیسٹ اور ای ٹیسٹ',
    rows: [{ categoryEn: 'As Applicable', categoryUr: 'جیسا لاگو ہو', fee: 'Rs. 500' }],
  },
  {
    id: 'license-card',
    no: '04',
    icon: IdCard,
    serviceEn: 'Driving License Card',
    serviceUr: 'ڈرائیونگ لائسنس کارڈ',
    rows: [{ categoryEn: 'As Applicable', categoryUr: 'جیسا لاگو ہو', fee: 'Rs. 2,000' }],
  },
  {
    id: 'renewal',
    no: '05',
    icon: RefreshCw,
    serviceEn: 'License Renewal',
    serviceUr: 'لائسنس کی تجدید',
    rows: [
      { categoryEn: 'Within One Month of Expiry', categoryUr: 'میعاد ختم ہونے کے ایک ماہ کے اندر', fee: 'Rs. 2,500' },
      { categoryEn: 'After Three Years of Expiry', categoryUr: 'میعاد ختم ہونے کے تین سال بعد', fee: 'Rs. 5,000' },
    ],
  },
  {
    id: 'duplicate',
    no: '06',
    icon: Copy,
    serviceEn: 'Duplicate Driving License',
    serviceUr: 'ڈپلیکیٹ ڈرائیونگ لائسنس',
    rows: [{ categoryEn: 'As Applicable', categoryUr: 'جیسا لاگو ہو', fee: 'Rs. 2,000' }],
  },
  {
    id: 'international-permit',
    no: '07',
    icon: Globe,
    serviceEn: 'International Driving Permit',
    serviceUr: 'بین الاقوامی ڈرائیونگ پرمٹ',
    rows: [{ categoryEn: 'As Applicable', categoryUr: 'جیسا لاگو ہو', pending: true }],
  },
];

const IMPORTANT_NOTES = [
  {
    id: 'pkr',
    en: 'All fees are listed in Pakistani Rupees (PKR).',
    ur: 'تمام فیسیں پاکستانی روپے (PKR) میں درج ہیں۔',
  },
  {
    id: 'confirm',
    en: 'Applicants should confirm the applicable fee for their license category before submitting the application.',
    ur: 'درخواست جمع کرانے سے قبل درخواست دہندہ اپنے لائسنس کی قسم سے متعلق لاگو فیس کی تصدیق کر لیں۔',
  },
  {
    id: 'additional',
    en: 'Additional requirements or charges may apply according to the relevant rules.',
    ur: 'متعلقہ قواعد کے مطابق اضافی شرائط یا چارجز لاگو ہو سکتے ہیں۔',
  },
  {
    id: 'notification',
    en: 'Fees and requirements are subject to official notification and may change.',
    ur: 'فیسیں اور شرائط سرکاری نوٹیفکیشن سے مشروط ہیں اور تبدیل ہو سکتی ہیں۔',
  },
];

const QUICK_STATS = [
  { id: 'services', value: '07', en: 'Services Listed', ur: 'درج سروسز' },
  { id: 'currency', value: 'PKR', en: 'Currency', ur: 'کرنسی' },
  { id: 'branch', value: '01', en: 'License Branch', ur: 'لائسنس برانچ' },
];

/* -------------------------------------------------------------------------- */
/*                                 SUB-COMPONENTS                             */
/* -------------------------------------------------------------------------- */

const FeeValue: React.FC<{ row: FeeRow }> = ({ row }) => {
  const { t } = useLanguage();

  if (row.pending) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 sm:text-xs">
        <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {t('To Be Confirmed', 'تصدیق ہونا باقی')}
      </span>
    );
  }

  return (
    <span className="whitespace-nowrap font-mono text-sm font-extrabold text-brand-blue-900 sm:text-base">
      {row.fee}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const LicenseFeeStructure: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ڈرائیونگ لائسنس فیس کا ڈھانچہ | ٹریفک وارڈن ایبٹ آباد'
        : 'Driving License Fee Structure | Traffic Warden Abbottabad';
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
              { label: 'Fee Structure', labelUrdu: 'فیس کا ڈھانچہ' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
              <Banknote className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {t('Abbottabad Driving License Branch', 'ایبٹ آباد ڈرائیونگ لائسنس برانچ')}
              </span>
            </div>

            <h1 className="text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t('Driving License Fee Structure', 'ڈرائیونگ لائسنس فیس کا ڈھانچہ')}
            </h1>

            <p className="text-sm font-semibold text-brand-lime sm:text-base md:text-lg">
              {t(
                'Learner Permits, Tests, Licenses, Renewals & Permits',
                'لرنر پرمٹ، ٹیسٹ، لائسنس، تجدید اور پرمٹ'
              )}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <ListChecks className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('7 Services', '7 سروسز')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <Calculator className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Official Fees', 'سرکاری فیسیں')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <Wallet className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Fees in PKR', 'فیس روپے میں')}
              </span>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <div className="space-y-10 py-8 sm:space-y-14 sm:py-12 lg:py-16">
          {/* -------------------------------- OVERVIEW ----------------------------- */}
          <section aria-labelledby="overview-heading">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
              {t('Overview', 'تعارف')}
            </div>

            <h2
              id="overview-heading"
              className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
            >
              {t('Fee Structure Overview', 'فیس کے ڈھانچے کا جائزہ')}
            </h2>

            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-brand-light-text sm:text-base">
              {t(
                'The following fee structure provides an overview of the charges for learner permits, driving tests, driving licenses, renewals, duplicate licenses, and International Driving Permits.',
                'درج ذیل فیس کا ڈھانچہ لرنر پرمٹ، ڈرائیونگ ٹیسٹ، ڈرائیونگ لائسنس، تجدید، ڈپلیکیٹ لائسنس اور بین الاقوامی ڈرائیونگ پرمٹ کے چارجز کا جائزہ فراہم کرتا ہے۔'
              )}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
              {QUICK_STATS.map((stat) => (
                <div
                  key={stat.id}
                  className="rounded-2xl border border-brand-light-border bg-brand-light-surface p-3 text-center shadow-gov sm:p-4"
                >
                  <p className="font-mono text-lg font-extrabold text-brand-blue sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold leading-tight text-brand-light-muted sm:text-xs">
                    {t(stat.en, stat.ur)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* -------------------------------- FEE TABLE ---------------------------- */}
          <section aria-labelledby="fees-heading">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
                {t('Driving License Fees', 'ڈرائیونگ لائسنس فیسیں')}
              </div>
              <h2
                id="fees-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Schedule of Fees', 'فیسوں کا شیڈول')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Service-wise fees applicable at the Abbottabad Driving License Branch.',
                  'ایبٹ آباد ڈرائیونگ لائسنس برانچ پر لاگو سروس کے حساب سے فیسیں۔'
                )}
              </p>
            </div>

            {/* ------------------ Desktop / Tablet table ------------------ */}
            <div className="hidden overflow-hidden rounded-2xl border border-brand-light-border bg-brand-light-surface shadow-gov md:block">
              <table className="w-full border-collapse text-start">
                <caption className="sr-only">
                  {t('Driving license fee structure table', 'ڈرائیونگ لائسنس فیس کے ڈھانچے کا جدول')}
                </caption>
                <thead className="bg-[#000080] text-white">
                  <tr>
                    <th scope="col" className="w-16 px-4 py-3.5 text-start text-[11px] font-bold uppercase tracking-wider">
                      {t('S. No.', 'نمبر')}
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-start text-[11px] font-bold uppercase tracking-wider">
                      {t('Service', 'سروس')}
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-start text-[11px] font-bold uppercase tracking-wider">
                      {t('Category / Details', 'قسم / تفصیلات')}
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-end text-[11px] font-bold uppercase tracking-wider">
                      {t('Fee (PKR)', 'فیس (روپے)')}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-brand-light-border">
                  {FEE_GROUPS.map((group) =>
                    group.rows.map((row, rowIndex) => (
                      <tr
                        key={`${group.id}-${rowIndex}`}
                        className="align-top transition-colors hover:bg-brand-blue-50/50"
                      >
                        {rowIndex === 0 && (
                          <>
                            <td
                              rowSpan={group.rows.length}
                              className="border-e border-brand-light-border px-4 py-4 text-start font-mono text-sm font-bold text-brand-blue-200"
                            >
                              {group.no}
                            </td>
                            <td
                              rowSpan={group.rows.length}
                              className="border-e border-brand-light-border px-4 py-4 text-start"
                            >
                              <div className="flex items-start gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
                                  <group.icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <span className="break-words text-sm font-bold leading-snug text-brand-dark">
                                  {t(group.serviceEn, group.serviceUr)}
                                </span>
                              </div>
                            </td>
                          </>
                        )}

                        <td className="break-words px-4 py-4 text-start text-sm leading-relaxed text-brand-light-text">
                          {t(row.categoryEn, row.categoryUr)}
                        </td>
                        <td className="px-4 py-4 text-end">
                          <FeeValue row={row} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* ---------------------- Mobile cards ---------------------- */}
            <div className="space-y-4 md:hidden">
              {FEE_GROUPS.map((group) => (
                <article
                  key={group.id}
                  className="overflow-hidden rounded-2xl border border-brand-light-border bg-brand-light-surface shadow-gov"
                >
                  <header className="flex items-center gap-3 border-b border-brand-light-border bg-brand-blue-50 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue text-white">
                      <group.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] font-bold text-brand-blue-200" aria-hidden="true">
                        {group.no}
                      </span>
                      <h3 className="break-words text-sm font-bold leading-snug text-brand-dark">
                        {t(group.serviceEn, group.serviceUr)}
                      </h3>
                    </div>
                  </header>

                  <ul className="divide-y divide-brand-light-border">
                    {group.rows.map((row, rowIndex) => (
                      <li
                        key={`${group.id}-m-${rowIndex}`}
                        className="flex items-start justify-between gap-3 p-4"
                      >
                        <p className="min-w-0 break-words text-sm leading-relaxed text-brand-light-text">
                          {t(row.categoryEn, row.categoryUr)}
                        </p>
                        <span className="shrink-0">
                          <FeeValue row={row} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
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

              <p className="mt-4 border-t border-amber-200 pt-4 text-sm font-semibold leading-relaxed text-amber-900">
                {t(
                  'For the latest fee details, please contact the Abbottabad Driving License Branch before making payment.',
                  'تازہ ترین فیس کی تفصیلات کے لیے، ادائیگی سے قبل براہ کرم ایبٹ آباد ڈرائیونگ لائسنس برانچ سے رابطہ کریں۔'
                )}
              </p>
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

export default LicenseFeeStructure;
