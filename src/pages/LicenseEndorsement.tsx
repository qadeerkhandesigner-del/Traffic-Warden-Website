import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Car,
  CreditCard,
  IdCard,
  Info,
  ListChecks,
  Receipt,
  Stethoscope,
  TrafficCone,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ContactSection } from '../components/ui/ContactSection';
import { useLanguage } from '../hooks/useLanguage';

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const REQUIREMENTS = [
  {
    id: 'previous-license',
    no: '01',
    icon: IdCard,
    en: 'Previous Driving License',
    ur: 'سابقہ ڈرائیونگ لائسنس',
  },
  {
    id: 'cnic',
    no: '02',
    icon: CreditCard,
    en: 'Valid CNIC',
    ur: 'درست شناختی کارڈ (CNIC)',
  },
  {
    id: 'learner-permit',
    no: '03',
    icon: CalendarClock,
    en: 'Learner Permit of at least 45 Days',
    ur: 'کم از کم 45 دن کا لرنر پرمٹ',
  },
  {
    id: 'medical',
    no: '04',
    icon: Stethoscope,
    en: 'Medical Certificate (by Authorized Medical Practitioner)',
    ur: 'طبی سرٹیفکیٹ (مجاز طبی پریکٹیشنر سے)',
  },
  {
    id: 'test-voucher',
    no: '05',
    icon: Receipt,
    en: 'Fee Voucher of Rs. 500, for Driving Test',
    ur: 'ڈرائیونگ ٹیسٹ کے لیے 500 روپے کا فیس واؤچر',
  },
];

const TESTS = [
  {
    id: 'traffic-signs',
    icon: TrafficCone,
    en: 'Traffic Signs Test',
    ur: 'ٹریفک علامات کا ٹیسٹ',
  },
  {
    id: 'practical',
    icon: Car,
    en: 'Physical Driving Test',
    ur: 'عملی ڈرائیونگ ٹیسٹ',
  },
];

const FEES = [
  {
    id: 'test-fee',
    icon: Receipt,
    amount: 'Rs. 500',
    en: 'Driving Test',
    ur: 'ڈرائیونگ ٹیسٹ',
    detailEn: 'Fee voucher for the driving test.',
    detailUr: 'ڈرائیونگ ٹیسٹ کے لیے فیس واؤچر۔',
  },
  {
    id: 'card-fee',
    icon: CreditCard,
    amount: 'Rs. 2,000',
    en: 'Driving License Card',
    ur: 'ڈرائیونگ لائسنس کارڈ',
    detailEn: 'Fee voucher for the driving license card.',
    detailUr: 'ڈرائیونگ لائسنس کارڈ کے لیے فیس واؤچر۔',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const LicenseEndorsement: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'لائسنس کی اینڈورسمینٹ | ٹریفک وارڈن ایبٹ آباد'
        : 'License Endorsement | Traffic Warden Abbottabad';
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
              { label: 'License Endorsement', labelUrdu: 'لائسنس کی اینڈورسمینٹ' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {t('Driving License Service', 'ڈرائیونگ لائسنس سروس')}
              </span>
            </div>

            <h1 className="text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t('Endorsement of Driving License', 'ڈرائیونگ لائسنس کی اینڈورسمینٹ')}
            </h1>

            <p className="text-sm font-semibold text-brand-lime sm:text-base md:text-lg">
              {t('Add a New Vehicle Category to Your License', 'اپنے لائسنس میں نئی گاڑی کی قسم شامل کریں')}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <ListChecks className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Document Checklist', 'دستاویزات کی فہرست')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <TrafficCone className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Test Required', 'ٹیسٹ لازمی')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <Receipt className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Fee Vouchers', 'فیس واؤچرز')}
              </span>
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
                  {t('How Endorsement Works', 'اینڈورسمینٹ کیسے کام کرتی ہے')}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Endorsement means adding a new vehicle category to an existing driving license. To endorse a new category, the applicant must meet the required eligibility conditions, submit the prescribed documents, pay the applicable fee vouchers and pass the driving test.',
                    'اینڈورسمینٹ سے مراد موجودہ ڈرائیونگ لائسنس میں نئی گاڑی کی قسم شامل کرنا ہے۔ نئی قسم شامل کرنے کے لیے درخواست دہندہ کو مطلوبہ شرائط پوری کرنا، مقررہ دستاویزات جمع کرانا، متعلقہ فیس واؤچر ادا کرنا اور ڈرائیونگ ٹیسٹ پاس کرنا ہوگا۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'The applications are processed at the Abbottabad Driving License Branch. Please bring the original documents listed below along with the required fee vouchers.',
                    'درخواستوں پر کارروائی ایبٹ آباد ڈرائیونگ لائسنس برانچ میں کی جاتی ہے۔ براہ کرم نیچے درج اصل دستاویزات کے ہمراہ مطلوبہ فیس واؤچرز ضرور ساتھ لائیں۔'
                  )}
                </p>
              </div>

              {/* At-a-glance callout */}
              <div className="lg:col-span-1">
                <div className="h-full rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-4 sm:p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-brand-blue-900 sm:text-base">
                    {t('At a Glance', 'ایک نظر میں')}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    <li className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {t('5 requirements to submit', 'جمع کرانے کے لیے 5 شرائط')}
                    </li>
                    <li className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {t('Learner permit of at least 45 days', 'کم از کم 45 دن کا لرنر پرمٹ')}
                    </li>
                    <li className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {t('Traffic signs and physical driving tests', 'ٹریفک علامات اور عملی ڈرائیونگ ٹیسٹ')}
                    </li>
                    <li className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {t('Fee vouchers of Rs. 500 and Rs. 2,000', '500 اور 2,000 روپے کے فیس واؤچرز')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------ REQUIREMENTS --------------------------- */}
          <section aria-labelledby="requirements-heading">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
                {t('Required Documents', 'مطلوبہ دستاویزات')}
              </div>
              <h2
                id="requirements-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('What You Need to Submit', 'آپ کو کیا جمع کرانا ہوگا')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'The following documents and conditions are required for endorsement of a driving license.',
                  'ڈرائیونگ لائسنس کی اینڈورسمینٹ کے لیے درج ذیل دستاویزات اور شرائط درکار ہیں۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {REQUIREMENTS.map((item) => (
                <article
                  key={item.id}
                  className="flex h-full items-start gap-4 rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md sm:p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span
                      className="font-mono text-xs font-bold text-brand-blue-200"
                      aria-hidden="true"
                    >
                      {item.no}
                    </span>
                    <p className="break-words text-sm font-semibold leading-snug text-brand-dark sm:text-base">
                      {t(item.en, item.ur)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ------------------------------ DRIVING TEST --------------------------- */}
          <section aria-labelledby="test-heading">
            <div className="relative overflow-hidden rounded-2xl border border-[#0000aa] bg-[#000080] text-white">
              <div
                className="pointer-events-none absolute inset-0 gov-subtle-pattern opacity-10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute end-0 top-0 h-48 w-48 rounded-full bg-brand-blue/30 blur-3xl sm:h-64 sm:w-64"
                aria-hidden="true"
              />

              <div className="relative z-10 grid grid-cols-1 gap-6 p-5 sm:p-8 lg:grid-cols-3 lg:p-10">
                <div className="lg:col-span-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-lime text-brand-dark">
                    <Car className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 id="test-heading" className="mt-4 text-xl font-bold sm:text-2xl">
                    {t('Driving Test', 'ڈرائیونگ ٹیسٹ')}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-blue-100 sm:text-base">
                    {t(
                      'An applicant shall pass the traffic signs test and physical driving tests.',
                      'درخواست دہندہ کو ٹریفک علامات کا ٹیسٹ اور عملی ڈرائیونگ ٹیسٹ پاس کرنا ہوگا۔'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
                  {TESTS.map((test) => (
                    <div
                      key={test.id}
                      className="flex items-center gap-3.5 rounded-xl border border-white/15 bg-white/5 p-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-lime text-brand-dark">
                        <test.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <p className="text-sm font-bold leading-snug text-white sm:text-base">
                        {t(test.en, test.ur)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------------------- FEES ------------------------------- */}
          <section aria-labelledby="fees-heading">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                <Receipt className="h-3.5 w-3.5" aria-hidden="true" />
                {t('Fees', 'فیس')}
              </div>
              <h2
                id="fees-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Prescribed Fee Vouchers', 'مقررہ فیس واؤچرز')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'The following fee vouchers are required for the endorsement process.',
                  'اینڈورسمینٹ کے عمل کے لیے درج ذیل فیس واؤچرز درکار ہیں۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {FEES.map((fee) => (
                <article
                  key={fee.id}
                  className="flex h-full flex-col rounded-2xl border border-brand-light-border bg-brand-light-surface p-5 shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                      <fee.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-brand-lime/25 px-3 py-1 font-mono text-sm font-extrabold text-brand-blue-900 sm:text-base">
                      {fee.amount}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-brand-dark sm:text-lg">
                    {t(fee.en, fee.ur)}
                  </h3>
                  <p className="mt-1.5 break-words text-sm leading-relaxed text-brand-light-muted">
                    {t(fee.detailEn, fee.detailUr)}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-brand-blue-200 bg-brand-blue-50 p-3.5 text-xs leading-relaxed text-brand-blue-900/90 sm:text-sm">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
              {t(
                'Fee amounts are as per the prescribed schedule. Please confirm the latest fee and procedure at the Abbottabad Driving License Branch before applying.',
                'فیس کی رقوم مقررہ شیڈول کے مطابق ہیں۔ درخواست دینے سے قبل براہ کرم ایبٹ آباد ڈرائیونگ لائسنس برانچ سے تازہ ترین فیس اور طریقہ کار کی تصدیق کر لیں۔'
              )}
            </p>
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

export default LicenseEndorsement;
