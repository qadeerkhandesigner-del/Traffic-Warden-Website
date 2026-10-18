import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ClipboardList,
  CreditCard,
  FileCheck,
  IdCard,
  Info,
  ListChecks,
  Receipt,
  Stethoscope,
  Users,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ContactSection } from '../components/ui/ContactSection';
import { useLanguage } from '../hooks/useLanguage';

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const LEARNER_PERMIT = [
  {
    id: 'afghan-card-learner',
    icon: CreditCard,
    en: 'Valid Afghan Citizen Card (issued by NADRA)',
    ur: 'درست افغان سٹیزن کارڈ (نادرا کی جانب سے جاری کردہ)',
  },
  {
    id: 'medical-learner',
    icon: Stethoscope,
    en: 'Medical Certificate (by Authorized Medical Practitioner)',
    ur: 'طبی سرٹیفکیٹ (مجاز طبی پریکٹیشنر سے)',
  },
  {
    id: 'tif-learner',
    icon: ClipboardList,
    en: 'Tenant Information Form (TIF) of concerned police station along with CNIC copy of house owner',
    ur: 'متعلقہ پولیس اسٹیشن کا ٹیننٹ انفارمیشن فارم (TIF) کے ساتھ مالکِ مکان کے شناختی کارڈ کی کاپی',
  },
  {
    id: 'noc-learner',
    icon: FileCheck,
    en: 'Copy of NOC from Afghan Refugees Commissionerate (ARC)',
    ur: 'افغان ریفیوجیز کمشنریٹ (ARC) سے این او سی کی کاپی',
  },
  {
    id: 'fee-learner',
    icon: Receipt,
    en: 'Fee Voucher of Rs. 250, from a designated bank',
    ur: 'نامزد بینک سے 250 روپے کا فیس واؤچر',
  },
];

const DRIVING_LICENSE = [
  {
    id: 'learner-45',
    icon: CalendarClock,
    en: 'Learner Permit of at least 45 Days',
    ur: 'کم از کم 45 دن کا لرنر پرمٹ',
  },
  {
    id: 'afghan-card-dl',
    icon: CreditCard,
    en: 'Valid Afghan Citizen Card (issued by NADRA)',
    ur: 'درست افغان سٹیزن کارڈ (نادرا کی جانب سے جاری کردہ)',
  },
  {
    id: 'medical-dl',
    icon: Stethoscope,
    en: 'Medical Certificate (by Authorized Medical Practitioner)',
    ur: 'طبی سرٹیفکیٹ (مجاز طبی پریکٹیشنر سے)',
  },
  {
    id: 'tif-dl',
    icon: ClipboardList,
    en: 'Tenant Information Form (TIF) of concerned police station along with CNIC copy of house owner',
    ur: 'متعلقہ پولیس اسٹیشن کا ٹیننٹ انفارمیشن فارم (TIF) کے ساتھ مالکِ مکان کے شناختی کارڈ کی کاپی',
  },
  {
    id: 'noc-dl',
    icon: FileCheck,
    en: 'Original NOC from Afghan Refugees Commissionerate (ARC)',
    ur: 'افغان ریفیوجیز کمشنریٹ (ARC) سے اصل این او سی',
  },
  {
    id: 'test-fee-dl',
    icon: Receipt,
    en: 'Fee Voucher of Rs. 250, for the Driving Test',
    ur: 'ڈرائیونگ ٹیسٹ کے لیے 250 روپے کا فیس واؤچر',
  },
  {
    id: 'card-fee-dl',
    icon: IdCard,
    en: 'Fee Voucher of Rs. 1000, for a Driving License card (validity 1 Year)',
    ur: 'ڈرائیونگ لائسنس کارڈ کے لیے 1000 روپے کا فیس واؤچر (کارڈ کی مدت 1 سال)',
  },
];

const FEES = [
  {
    id: 'learner-fee',
    icon: Receipt,
    amount: 'Rs. 250',
    en: 'Learner Permit',
    ur: 'لرنر پرمٹ',
    detailEn: 'Fee voucher from a designated bank.',
    detailUr: 'نامزد بینک سے فیس واؤچر۔',
  },
  {
    id: 'test-fee',
    icon: Receipt,
    amount: 'Rs. 250',
    en: 'Driving Test',
    ur: 'ڈرائیونگ ٹیسٹ',
    detailEn: 'Fee voucher for the driving test.',
    detailUr: 'ڈرائیونگ ٹیسٹ کے لیے فیس واؤچر۔',
  },
  {
    id: 'card-fee',
    icon: IdCard,
    amount: 'Rs. 1,000',
    en: 'Driving License Card',
    ur: 'ڈرائیونگ لائسنس کارڈ',
    detailEn: 'Fee voucher for the license card (validity 1 year).',
    detailUr: 'لائسنس کارڈ کے لیے فیس واؤچر (کارڈ کی مدت 1 سال)۔',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

interface RequirementListProps {
  step: string;
  titleEn: string;
  titleUr: string;
  items: typeof LEARNER_PERMIT;
  accent?: boolean;
}

const RequirementList: React.FC<RequirementListProps> = ({
  step,
  titleEn,
  titleUr,
  items,
  accent = false,
}) => {
  const { t } = useLanguage();

  return (
    <article className="overflow-hidden rounded-2xl border border-brand-light-border bg-brand-light-surface shadow-gov">
      {/* Header */}
      <header
        className={
          accent
            ? 'relative overflow-hidden border-b border-[#0000aa] bg-[#000080] p-4 text-white sm:p-6'
            : 'border-b border-brand-light-border bg-brand-blue-50 p-4 sm:p-6'
        }
      >
        {accent && (
          <div
            className="pointer-events-none absolute inset-0 gov-subtle-pattern opacity-10"
            aria-hidden="true"
          />
        )}

        <div className="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-3">
          <span
            className={
              accent
                ? 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-lime text-brand-dark'
                : 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue text-white'
            }
          >
            {accent ? (
              <IdCard className="h-6 w-6" aria-hidden="true" />
            ) : (
              <CalendarClock className="h-6 w-6" aria-hidden="true" />
            )}
          </span>

          <div className="min-w-0 flex-1">
            <span
              className={
                accent
                  ? 'inline-flex rounded-full border border-brand-lime/30 bg-brand-lime/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-lime sm:text-[11px]'
                  : 'inline-flex rounded-full border border-brand-blue-200 bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-blue sm:text-[11px]'
              }
            >
              {t(`Step ${step}`, `مرحلہ ${step}`)}
            </span>
            <h2
              className={
                accent
                  ? 'mt-1.5 text-balance text-lg font-bold text-white sm:text-xl lg:text-2xl'
                  : 'mt-1.5 text-balance text-lg font-bold text-brand-dark sm:text-xl lg:text-2xl'
              }
            >
              {t(titleEn, titleUr)}
            </h2>
          </div>

          <span
            className={
              accent
                ? 'shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white sm:text-xs'
                : 'shrink-0 rounded-full border border-brand-blue-200 bg-white px-3 py-1 text-[11px] font-semibold text-brand-blue sm:text-xs'
            }
          >
            {t(`${items.length} requirements`, `${items.length} شرائط`)}
          </span>
        </div>
      </header>

      {/* Items */}
      <ul className="divide-y divide-brand-light-border">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex items-start gap-3.5 p-4 transition-colors hover:bg-brand-blue-50/40 sm:gap-4 sm:p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue sm:h-11 sm:w-11">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <span
                className="font-mono text-[11px] font-bold text-brand-blue-200"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="break-words text-sm font-semibold leading-snug text-brand-dark sm:text-base">
                {t(item.en, item.ur)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export const LicenseForAfghans: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'افغان شہریوں کے لیے ڈرائیونگ لائسنس | ٹریفک وارڈن ایبٹ آباد'
        : 'Driving License for Afghan Nationals | Traffic Warden Abbottabad';
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
              { label: 'For Afghan Nationals', labelUrdu: 'افغان شہریوں کے لیے' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
              <Users className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {t('Driving License Service', 'ڈرائیونگ لائسنس سروس')}
              </span>
            </div>

            <h1 className="text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t('Driving License for Afghan Nationals', 'افغان شہریوں کے لیے ڈرائیونگ لائسنس')}
            </h1>

            <p className="text-sm font-semibold text-brand-lime sm:text-base md:text-lg">
              {t(
                'Learner Permit & Driving License — Complete Requirements',
                'لرنر پرمٹ اور ڈرائیونگ لائسنس — مکمل شرائط'
              )}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <CalendarClock className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Learner Permit', 'لرنر پرمٹ')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <IdCard className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Driving License', 'ڈرائیونگ لائسنس')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <FileCheck className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('ARC NOC Required', 'ARC این او سی لازمی')}
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
                  {t('Applying as an Afghan National', 'افغان شہری کی حیثیت سے درخواست')}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Afghan nationals can obtain a learner permit and a driving license in Khyber Pakhtunkhwa under the prescribed procedure. A valid Afghan Citizen Card issued by NADRA is mandatory, along with a No Objection Certificate (NOC) from the Afghan Refugees Commissionerate (ARC).',
                    'افغان شہری مقررہ طریقہ کار کے تحت خیبر پختونخوا میں لرنر پرمٹ اور ڈرائیونگ لائسنس حاصل کر سکتے ہیں۔ نادرا کی جانب سے جاری کردہ درست افغان سٹیزن کارڈ لازمی ہے، اس کے ساتھ افغان ریفیوجیز کمشنریٹ (ARC) سے این او سی بھی ضروری ہے۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'The process is completed in two stages: first a learner permit, and after at least 45 days a driving license can be applied for. Applications are processed at the Abbottabad Driving License Branch.',
                    'یہ عمل دو مراحل میں مکمل ہوتا ہے: پہلے لرنر پرمٹ، اور کم از کم 45 دن بعد ڈرائیونگ لائسنس کے لیے درخواست دی جا سکتی ہے۔ درخواستوں پر کارروائی ایبٹ آباد ڈرائیونگ لائسنس برانچ میں کی جاتی ہے۔'
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
                      {t('2 stages: Learner Permit & License', 'دو مراحل: لرنر پرمٹ اور لائسنس')}
                    </li>
                    <li className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {t('Valid Afghan Citizen Card (NADRA) required', 'درست افغان سٹیزن کارڈ (نادرا) لازمی')}
                    </li>
                    <li className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {t('NOC from ARC and Tenant Information Form', 'ARC این او سی اور ٹیننٹ انفارمیشن فارم')}
                    </li>
                    <li className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {t('Fee vouchers of Rs. 250, Rs. 250 and Rs. 1,000', '250، 250 اور 1,000 روپے کے فیس واؤچرز')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* --------------------------------- STEPS ------------------------------- */}
          <section aria-labelledby="steps-heading">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
                {t('Procedure', 'طریقہ کار')}
              </div>
              <h2
                id="steps-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Requirements in Two Stages', 'دو مراحل میں شرائط')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Complete the learner permit stage first, then apply for the driving license after at least 45 days.',
                  'پہلے لرنر پرمٹ کا مرحلہ مکمل کریں، پھر کم از کم 45 دن بعد ڈرائیونگ لائسنس کے لیے درخواست دیں۔'
                )}
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <RequirementList
                step="01"
                titleEn="Learner Permit"
                titleUr="لرنر پرمٹ"
                items={LEARNER_PERMIT}
              />
              <RequirementList
                step="02"
                titleEn="Driving License"
                titleUr="ڈرائیونگ لائسنس"
                items={DRIVING_LICENSE}
                accent
              />
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
                {t('Fee Vouchers at a Glance', 'فیس واؤچرز ایک نظر میں')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'The following fee vouchers are required at each stage.',
                  'ہر مرحلے پر درج ذیل فیس واؤچرز درکار ہیں۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {FEES.map((fee) => (
                <article
                  key={fee.id}
                  className="flex h-full flex-col rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md sm:p-6"
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

export default LicenseForAfghans;
