import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  RefreshCw,
  FileText,
  IdCard,
  CreditCard,
  Stethoscope,
  Receipt,
  CalendarClock,
  Calculator,
  AlertTriangle,
  Info,
  ShieldCheck,
  Building,
  Phone,
  Smartphone,
  Download,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const requiredDocuments = [
  {
    id: 1,
    icon: IdCard,
    titleEn: 'Original Previous Driving License',
    titleUr: 'سابقہ اصل ڈرائیونگ لائسنس',
    descEn: '',
    descUr: '',
  },
  {
    id: 2,
    icon: CreditCard,
    titleEn: 'Valid CNIC',
    titleUr: 'درست شناختی کارڈ',
    descEn: 'Computerized National Identity Card.',
    descUr: 'کمپیوٹرائزڈ قومی شناختی کارڈ (CNIC)۔',
  },
  {
    id: 3,
    icon: Stethoscope,
    titleEn: 'Medical Fitness Certificate',
    titleUr: 'طبی فٹنس سرٹیفکیٹ',
    descEn: 'Issued by an Authorized Medical Practitioner.',
    descUr: 'مجاز طبی پریکٹیشنر سے جاری کردہ۔',
  },
];

const feeRows = [
  {
    id: 1,
    periodEn: 'Within One Month of Expiry',
    periodUr: 'میعاد ختم ہونے کے ایک ماہ کے اندر',
    fee: '2,500',
  },
  {
    id: 2,
    periodEn: 'After One Month up to Three Months of Expiry',
    periodUr: 'میعاد ختم ہونے کے ایک ماہ بعد تا تین ماہ',
    fee: '2,000',
  },
  {
    id: 3,
    periodEn: 'After Three Years of Expiry',
    periodUr: 'میعاد ختم ہونے کے تین سال بعد',
    fee: '5,000',
  },
];

const importantInstructions = [
  {
    id: 1,
    textEn: 'Bring the original previous driving license and a valid CNIC.',
    textUr: 'اصل سابقہ ڈرائیونگ لائسنس اور درست شناختی کارڈ ساتھ لائیں۔',
  },
  {
    id: 2,
    textEn: 'Ensure that the medical fitness certificate meets the applicable requirements.',
    textUr: 'یقینی بنائیں کہ طبی فٹنس سرٹیفکیٹ لاگو ضروریات کے مطابق ہو۔',
  },
  {
    id: 3,
    textEn:
      'Confirm the applicable renewal fee and any additional requirements with the concerned Driving License Branch before submitting your application.',
    textUr:
      'درخواست جمع کرانے سے پہلے متعلقہ ڈرائیونگ لائسنس برانچ سے لاگو تجدید فیس اور اضافی ضروریات کی تصدیق کر لیں۔',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const LicenseRenewal: React.FC = () => {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'میعاد ختم شدہ ڈرائیونگ لائسنس کی تجدید | ٹریفک وارڈن ایبٹ آباد'
        : 'Renewal of Expired Driving License | Traffic Warden Abbottabad';
  }, [language]);

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* ============================== HERO ============================== */}
      <section className="relative bg-[#000080] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-60 h-60 sm:w-80 sm:h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', labelUrdu: 'صفحۂ اول', path: '/' },
              { label: 'Services', labelUrdu: 'خدمات', path: '/services' },
              {
                label: 'Driving License Services',
                labelUrdu: 'ڈرائیونگ لائسنس سروسز',
                path: '/services/driving-license',
              },
              {
                label: 'License Renewal',
                labelUrdu: 'لائسنس تجدید',
                path: '/services/driving-license/renewal',
              },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'لائسنس کی تجدید' : 'LICENSE RENEWAL'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur'
                ? 'میعاد ختم شدہ ڈرائیونگ لائسنس کی تجدید'
                : 'RENEWAL OF EXPIRED DRIVING LICENSE'}
            </h1>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'مطلوبہ دستاویزات جمع کرا کر اور لاگو تجدید فیس ادا کر کے متعلقہ ڈرائیونگ لائسنس برانچ سے اپنے میعاد ختم شدہ ڈرائیونگ لائسنس کی تجدید کرائیں۔'
                : 'Renew your expired driving license by submitting the required documents and paying the applicable renewal fee at the concerned Driving License Branch.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* ============================== REQUIRED DOCUMENTS ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="max-w-3xl lg:max-w-5xl mx-auto space-y-8 sm:space-y-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'مطلوبہ دستاویزات' : 'REQUIRED DOCUMENTS'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur' ? 'مطلوبہ دستاویزات' : 'Required Documents'}
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
                {language === 'ur'
                  ? 'درخواست دہندگان کو درج ذیل دستاویزات فراہم کرنا لازمی ہے:'
                  : 'Applicants must provide the following documents:'}
              </p>
            </div>

            {/* Documents List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requiredDocuments.map((doc, index) => (
                <div
                  key={doc.id}
                  className={`flex items-start gap-3 sm:gap-5 bg-white rounded-2xl border border-brand-light-border p-4 sm:p-6 hover:border-brand-blue-300 hover:shadow-lg transition-all duration-300${
                    requiredDocuments.length % 2 === 1 && index === requiredDocuments.length - 1
                      ? ' md:col-span-2'
                      : ''
                  }`}
                >
                  <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm sm:text-lg shadow-md">
                    {doc.id}
                  </div>
                  <div className="flex-1 min-w-0 flex items-start gap-3 sm:pt-1.5">
                    <div className="hidden sm:flex w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue items-center justify-center shrink-0">
                      <doc.icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      <span className="font-bold text-brand-dark">
                        {language === 'ur' ? doc.titleUr : doc.titleEn}
                      </span>
                      {(language === 'ur' ? doc.descUr : doc.descEn) && (
                        <>
                          {': '}
                          {language === 'ur' ? doc.descUr : doc.descEn}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ============================== RENEWAL FEE STRUCTURE ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-bg border-t border-brand-light-border">
        <PageContainer>
          <div className="max-w-3xl lg:max-w-5xl mx-auto space-y-8 sm:space-y-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
                <Calculator className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'فیس کا ڈھانچہ' : 'FEE STRUCTURE'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur' ? 'تجدید فیس کا ڈھانچہ' : 'Renewal Fee Structure'}
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
                {language === 'ur'
                  ? 'میعاد ختم ہونے کی مدت کے مطابق لاگو تجدید فیس:'
                  : 'Applicable renewal fee according to the period of expiry:'}
              </p>
            </div>

            {/* ------------------ Desktop / Tablet table ------------------ */}
            <div className="hidden overflow-hidden rounded-2xl border border-brand-light-border bg-white shadow-gov-md md:block">
              <table className="w-full border-collapse text-start">
                <caption className="sr-only">
                  {language === 'ur'
                    ? 'ڈرائیونگ لائسنس تجدید فیس کا جدول'
                    : 'Driving license renewal fee table'}
                </caption>
                <thead className="bg-[#000080] text-white">
                  <tr>
                    <th
                      scope="col"
                      className="w-20 px-4 py-3.5 text-start text-[11px] font-bold uppercase tracking-wider"
                    >
                      {language === 'ur' ? 'نمبر شمار' : 'S. No.'}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-start text-[11px] font-bold uppercase tracking-wider"
                    >
                      {language === 'ur' ? 'تجدید کی مدت' : 'Renewal Period'}
                    </th>
                    <th
                      scope="col"
                      className="w-40 px-4 py-3.5 text-end text-[11px] font-bold uppercase tracking-wider"
                    >
                      {language === 'ur' ? 'فیس (روپے)' : 'Fee (PKR)'}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-brand-light-border">
                  {feeRows.map((row) => (
                    <tr key={row.id} className="transition-colors hover:bg-brand-blue-50/50">
                      <td className="px-4 py-4 text-start font-mono text-sm font-bold text-brand-blue-200">
                        {row.id}
                      </td>
                      <td className="break-words px-4 py-4 text-start text-sm leading-relaxed text-slate-700 sm:text-base">
                        {language === 'ur' ? row.periodUr : row.periodEn}
                      </td>
                      <td className="px-4 py-4 text-end">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-blue-50 px-3 py-1.5 font-mono text-sm font-extrabold text-brand-blue">
                          <Receipt className="h-3.5 w-3.5" aria-hidden="true" />
                          Rs. {row.fee}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ---------------------- Mobile cards ---------------------- */}
            <div className="space-y-4 md:hidden">
              {feeRows.map((row) => (
                <article
                  key={row.id}
                  className="overflow-hidden rounded-2xl border border-brand-light-border bg-white shadow-gov-md"
                >
                  <header className="flex items-center gap-3 border-b border-brand-light-border bg-brand-blue-50 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue font-mono text-sm font-bold text-white">
                      {row.id}
                    </span>
                    <h3 className="break-words text-sm font-bold leading-snug text-brand-dark">
                      {language === 'ur' ? row.periodUr : row.periodEn}
                    </h3>
                  </header>
                  <div className="flex items-center justify-between gap-3 p-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {language === 'ur' ? 'فیس (روپے)' : 'Fee (PKR)'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-blue-50 px-3 py-1.5 font-mono text-sm font-extrabold text-brand-blue">
                      <Receipt className="h-3.5 w-3.5" aria-hidden="true" />
                      Rs. {row.fee}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Fee note */}
            <div className="flex items-start gap-3 rounded-2xl bg-brand-blue-50 border border-brand-blue-100 p-5 sm:p-6 text-brand-blue-900">
              <CalendarClock className="w-5 h-5 shrink-0 mt-0.5 text-brand-blue" aria-hidden="true" />
              <p className="text-sm leading-relaxed">
                {language === 'ur'
                  ? 'جتنی دیر تجدید میں تاخیر ہو گی، فیس اور طریقہ کار اسی لحاظ سے تبدیل ہو سکتا ہے۔ براہ کرم لاگو فیس کی تصدیق لائسنس برانچ سے کر لیں۔'
                  : 'The longer the renewal is delayed, the fee and procedure may change accordingly. Please confirm the applicable fee with the License Branch.'}
              </p>
            </div>

            {/* Important Instructions */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-semibold uppercase tracking-wider">
                <Info className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'اہم ہدایات' : 'IMPORTANT INSTRUCTIONS'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {importantInstructions.map((instruction) => (
                  <div
                    key={instruction.id}
                    className="flex items-start gap-3 rounded-2xl bg-yellow-50 border border-yellow-200 p-4 sm:p-5 text-yellow-800"
                  >
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm leading-relaxed">
                      {language === 'ur' ? instruction.textUr : instruction.textEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Please Note */}
            <div className="flex items-start gap-3 rounded-2xl bg-amber-50 border border-amber-200 p-5 sm:p-6 text-amber-900">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm leading-relaxed">
                <span className="font-bold">
                  {language === 'ur' ? 'براہ کرم نوٹ کریں: ' : 'Please Note: '}
                </span>
                {language === 'ur'
                  ? 'تجدید فیس اور اہلیت کی شرائط لاگو سرکاری قواعد و فیس شیڈول کے تابع ہیں۔'
                  : 'The renewal fee and eligibility requirements are subject to the applicable official rules and fee schedule.'}
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ============================== CONTACT / RAABTA / BACK ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-surface border-t border-brand-light-border">
        <PageContainer>
          <div className="max-w-3xl lg:max-w-5xl mx-auto space-y-8 sm:space-y-10">
            {/* Contact / Help Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3 sm:gap-4 rounded-3xl bg-white border border-brand-light-border p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-brand-blue text-white flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5 text-brand-lime" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="font-bold text-brand-dark text-sm sm:text-base">
                    {language === 'ur' ? 'لائسنس برانچ' : 'License Branch'}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed break-words">
                    {language === 'ur'
                      ? 'ڈرائیونگ لائسنس برانچ، جی پی او آفس کے سامنے، اے ڈی سی جنرل آفس کے قریب، ایبٹ آباد۔'
                      : 'Driving License Branch, Infront of GPO Office Near ADC General Office, Abbottabad.'}
                  </p>
                </div>
              </div>

              <a
                href="tel:1915"
                className="flex gap-3 sm:gap-4 rounded-3xl bg-white border border-brand-light-border p-4 sm:p-6 hover:border-brand-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-brand-blue text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-lime" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="font-bold text-brand-dark text-sm sm:text-base">
                    {language === 'ur' ? 'ہیلپ لائن' : 'Helpline'}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === 'ur'
                      ? 'ایمرجنسی اور رہنمائی کے لیے 1915 ڈائل کریں۔'
                      : 'Dial 1915 for emergencies and guidance.'}
                  </p>
                </div>
              </a>
            </div>

            {/* Apply Through Raabta App */}
            <div className="rounded-3xl bg-brand-blue text-white p-5 sm:p-8 space-y-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-brand-lime" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold">
                    {language === 'ur' ? 'رابطہ ایپ کے ذریعے اپلائی کریں' : 'Apply Through the Raabta App'}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed">
                    {language === 'ur'
                      ? 'ابھی رابطہ ایپ ڈاؤن لوڈ کریں اور ڈرائیونگ لائسنس کی تجدید سمیت دیگر ڈرائیونگ لائسنس سروسز کے لیے ایپ کے ذریعے اپلائی کریں۔'
                      : 'Download the Raabta App now and apply for driving license renewal and other driving license services through the app.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.nsd.rabta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-lime hover:bg-brand-lime-hover text-brand-dark font-extrabold text-sm tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>{language === 'ur' ? 'رابطہ ایپ ڈاؤن لوڈ کریں' : 'Download Raabta App'}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>

                <Link
                  to="/services/driving-license/raabta-app"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm tracking-wide transition-all duration-200"
                >
                  <Smartphone className="w-4 h-4 shrink-0" />
                  <span>{language === 'ur' ? 'رابطہ ایپ کے بارے میں' : 'About the Raabta App'}</span>
                </Link>
              </div>
            </div>

            {/* Back Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/services/driving-license"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-blue hover:bg-brand-blue-600 text-white font-bold text-sm tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{language === 'ur' ? 'تمام لائسنس سروسز' : 'All License Services'}</span>
                <ForwardArrow className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default LicenseRenewal;
