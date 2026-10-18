import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  ArrowLeftRight,
  FileText,
  IdCard,
  Car,
  ScrollText,
  Stethoscope,
  Banknote,
  CalendarClock,
  AlertTriangle,
  ShieldCheck,
  Building,
  Phone,
  Smartphone,
  Download,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export const ConversionOfLicense: React.FC = () => {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'لائسنس کی تبدیلی | ٹریفک وارڈن ایبٹ آباد'
        : 'Driving License Conversion | Traffic Warden Abbottabad';
  }, [language]);

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const requiredDocuments = [
    {
      id: 1,
      icon: IdCard,
      titleEn: 'Valid CNIC',
      titleUr: 'درست شناختی کارڈ',
      textEn: 'Original Computerized National Identity Card.',
      textUr: 'اصل کمپیوٹرائزڈ قومی شناختی کارڈ۔',
    },
    {
      id: 2,
      icon: Car,
      titleEn: 'Previous Driving License',
      titleUr: 'سابقہ ڈرائیونگ لائسنس',
      textEn: 'Original Motorcycle and/or Motor Car & Jeep driving license.',
      textUr: 'اصل موٹر سائیکل اور/یا موٹر کار و جیپ ڈرائیونگ لائسنس۔',
    },
    {
      id: 3,
      icon: ScrollText,
      titleEn: 'No Objection Certificate (NOC)',
      titleUr: 'عدم اعتراض سرٹیفکیٹ (NOC)',
      textEn: 'Issued by the authority that originally issued the driving license.',
      textUr: 'اس اتھارٹی کی جانب سے جاری کردہ جس نے اصل میں ڈرائیونگ لائسنس جاری کیا تھا۔',
    },
    {
      id: 4,
      icon: Stethoscope,
      titleEn: 'Medical Certificate',
      titleUr: 'میڈیکل سرٹیفکیٹ',
      textEn: 'Issued by an authorized medical practitioner.',
      textUr: 'مجاز طبی پریکٹیشنر کی جانب سے جاری کردہ۔',
    },
  ];

  const feeDetails = [
    {
      icon: Banknote,
      labelEn: 'Purpose',
      labelUr: 'مقصد',
      valueEn: 'Driving License Card',
      valueUr: 'ڈرائیونگ لائسنس کارڈ',
    },
    {
      icon: CalendarClock,
      labelEn: 'Validity',
      labelUr: 'اعتبار',
      valueEn: '5 Years',
      valueUr: '5 سال',
    },
  ];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* ============================== HERO ============================== */}
      <section className="relative bg-[#000080] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

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
                label: 'Conversion of License',
                labelUrdu: 'لائسنس کی تبدیلی',
                path: '/services/driving-license/conversion',
              },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'لائسنس کی تبدیلی' : 'LICENSE CONVERSION'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'ڈرائیونگ لائسنس کی تبدیلی' : 'DRIVING LICENSE CONVERSION'}
            </h1>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'غیر ملکی یا دوسرے صوبے کے جاری کردہ ڈرائیونگ لائسنس کو خیبر پختونخوا کے ڈرائیونگ لائسنس میں تبدیل کرانے کے لیے درکار دستاویزات اور فیس۔'
                : 'Required documents and fee for converting an existing (foreign or other-province) driving license to a Khyber Pakhtunkhwa driving license.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* ============================== REQUIRED DOCUMENTS & FEE ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="max-w-3xl lg:max-w-5xl mx-auto space-y-8 sm:space-y-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'مطلوبہ دستاویزات اور فیس' : 'REQUIRED DOCUMENTS & FEE'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur' ? 'مطلوبہ دستاویزات اور فیس' : 'Required Documents & Fee'}
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
                {language === 'ur'
                  ? 'موجودہ ڈرائیونگ لائسنس کی تبدیلی کے لیے درخواست دینے والے درخواست دہندگان کو درج ذیل دستاویزات اور فیس فراہم کرنا ہوگی۔'
                  : 'Applicants applying for the conversion of an existing driving license must provide the following documents and fee.'}
              </p>
            </div>

            {/* Required Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-dark tracking-tight">
                {language === 'ur' ? 'مطلوبہ دستاویزات' : 'Required Documents'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requiredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-start gap-3 sm:gap-5 bg-white rounded-2xl border border-brand-light-border p-4 sm:p-6 hover:border-brand-blue-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm sm:text-lg shadow-md">
                      {doc.id}
                    </div>
                    <div className="flex-1 min-w-0 flex items-start gap-3 sm:pt-0.5">
                      <div className="hidden sm:flex w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue items-center justify-center shrink-0">
                        <doc.icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm sm:text-base font-bold text-brand-dark">
                          {language === 'ur' ? doc.titleUr : doc.titleEn}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {language === 'ur' ? doc.textUr : doc.textEn}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* License Fee */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-dark tracking-tight">
                {language === 'ur' ? 'لائسنس فیس' : 'License Fee'}
              </h3>

              <div className="rounded-3xl bg-brand-blue text-white p-5 sm:p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <Banknote className="w-6 h-6 sm:w-7 sm:h-7 text-brand-lime" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-lime">
                      {language === 'ur' ? 'کل فیس' : 'TOTAL FEE'}
                    </p>
                    <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      {language === 'ur' ? '2,500 روپے' : 'Rs. 2,500'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {feeDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-2xl bg-white/10 border border-white/15 p-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <detail.icon className="w-5 h-5 text-brand-lime" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                          {language === 'ur' ? detail.labelUr : detail.labelEn}
                        </p>
                        <p className="text-sm sm:text-base font-bold text-white">
                          {language === 'ur' ? detail.valueUr : detail.valueEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="flex items-start gap-3 rounded-2xl bg-yellow-50 border border-yellow-200 p-5 sm:p-6 text-yellow-800">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">
                <span className="font-bold">
                  {language === 'ur' ? 'اہم نوٹ: ' : 'Important Note: '}
                </span>
                {language === 'ur'
                  ? 'براہ کرم ڈرائیونگ لائسنس برانچ تشریف لانے سے پہلے یقینی بنائیں کہ تمام مطلوبہ دستاویزات مکمل اور درست ہیں۔ قابل اطلاق ضروریات اور فیس کی تصدیق کے لیے متعلقہ لائسنسنگ اتھارٹی سے رابطہ کریں۔'
                  : 'Please ensure that all required documents are complete and valid before visiting the Driving License Branch. For confirmation of the applicable requirements and fee, contact the relevant licensing authority.'}
              </p>
            </div>

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
                      ? 'ابھی رابطہ ایپ ڈاؤن لوڈ کریں اور ڈرائیونگ لائسنس کی تبدیلی سمیت دیگر ڈرائیونگ لائسنس سروسز کے لیے ایپ کے ذریعے اپلائی کریں۔'
                      : 'Download the Raabta App now and apply for driving license conversion and other driving license services through the app.'}
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

export default ConversionOfLicense;
