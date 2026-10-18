import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  Globe,
  FileText,
  IdCard,
  CreditCard,
  Stethoscope,
  BookOpen,
  Plane,
  Receipt,
  CalendarCheck,
  RefreshCw,
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

export const InternationalPermit: React.FC = () => {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'بین الاقوامی ڈرائیونگ پرمٹ | ٹریفک وارڈن ایبٹ آباد'
        : 'International Driving Permit | Traffic Warden Abbottabad';
  }, [language]);

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const requiredDocuments = [
    {
      id: 1,
      icon: IdCard,
      titleEn: 'Valid Driving License',
      titleUr: 'درست ڈرائیونگ لائسنس',
      descEn: 'Issued by the concerned district.',
      descUr: 'متعلقہ ضلع سے جاری کردہ۔',
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
      titleEn: 'Medical Certificate',
      titleUr: 'طبی سرٹیفکیٹ',
      descEn: 'Issued by an Authorized Medical Practitioner.',
      descUr: 'مجاز طبی پریکٹیشنر سے جاری کردہ۔',
    },
    {
      id: 4,
      icon: BookOpen,
      titleEn: 'Valid Passport',
      titleUr: 'درست پاسپورٹ',
      descEn: '',
      descUr: '',
    },
    {
      id: 5,
      icon: Plane,
      titleEn: 'Valid Visa',
      titleUr: 'درست ویزا',
      descEn: '',
      descUr: '',
    },
    {
      id: 6,
      icon: Receipt,
      titleEn: 'Fee Voucher',
      titleUr: 'فیس واؤچر',
      descEn: 'Rs. 1,000 for the International Driving Permit card.',
      descUr: 'بین الاقوامی ڈرائیونگ پرمٹ کارڈ کے لیے 1,000 روپے۔',
    },
  ];

  const importantInstructions = [
    {
      textEn: 'Ensure that all required documents are valid and complete before submitting your application.',
      textUr: 'درخواست جمع کرانے سے پہلے یقینی بنائیں کہ تمام مطلوبہ دستاویزات درست اور مکمل ہوں۔',
    },
    {
      textEn: 'Applicants must verify the applicable fee and requirements with the concerned Driving License Branch before applying.',
      textUr: 'درخواست دینے سے پہلے درخواست دہندگان لازمی طور پر متعلقہ ڈرائیونگ لائسنس برانچ سے لاگو فیس اور ضروریات کی تصدیق کریں۔',
    },
  ];

  const renewalDocuments = [
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
      descEn: '',
      descUr: '',
    },
    {
      id: 3,
      icon: Stethoscope,
      titleEn: 'Medical Certificate',
      titleUr: 'طبی سرٹیفکیٹ',
      descEn: 'Issued by an Authorized Medical Practitioner.',
      descUr: 'مجاز طبی پریکٹیشنر سے جاری کردہ۔',
    },
    {
      id: 4,
      icon: Receipt,
      titleEn: 'Fee Voucher',
      titleUr: 'فیس واؤچر',
      descEn: 'Rs. 2,500 for the Driving License Card, if renewed within one month of expiry.',
      descUr: 'میعاد ختم ہونے کے ایک ماہ کے اندر تجدید کرانے پر ڈرائیونگ لائسنس کارڈ کے لیے 2,500 روپے۔',
    },
    {
      id: 5,
      icon: Receipt,
      titleEn: 'Fee Voucher',
      titleUr: 'فیس واؤچر',
      descEn: 'Rs. 5,000 after three years of expiry.',
      descUr: 'میعاد ختم ہونے کے تین سال بعد 5,000 روپے۔',
    },
  ];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* ============================== HERO ============================== */}
      <section className="relative bg-[#000080] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
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
                label: 'International Driving Permit',
                labelUrdu: 'بین الاقوامی ڈرائیونگ پرمٹ',
                path: '/services/driving-license/international-permit',
              },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'بین الاقوامی پرمٹ' : 'INTERNATIONAL PERMIT'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'بین الاقوامی ڈرائیونگ پرمٹ' : 'INTERNATIONAL DRIVING PERMIT'}
            </h1>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'پاکستان سے باہر سفر کے لیے بین الاقوامی ڈرائیونگ پرمٹ کے لیے درکار دستاویزات، مدت اور ہدایات۔'
                : 'Required documents, validity and instructions for applying for an International Driving Permit.'}
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
                  ? 'بین الاقوامی ڈرائیونگ پرمٹ کے لیے درخواست دینے کے لیے درج ذیل دستاویزات فراہم کرنا لازمی ہے۔'
                  : 'Applicants must provide the following documents to apply for an International Driving Permit.'}
              </p>
            </div>

            {/* Documents List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requiredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-start gap-3 sm:gap-5 bg-white rounded-2xl border border-brand-light-border p-4 sm:p-6 hover:border-brand-blue-300 hover:shadow-lg transition-all duration-300"
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

            {/* Permit Validity */}
            <div className="flex items-center gap-4 rounded-2xl bg-brand-blue text-white p-5 sm:p-6">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-brand-lime" />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-sm sm:text-base">
                  {language === 'ur' ? 'پرمٹ کی مدت' : 'Permit Validity'}
                </h3>
                <p className="text-brand-lime font-extrabold text-lg sm:text-xl leading-tight">
                  {language === 'ur' ? '1 سال' : '1 Year'}
                </p>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-semibold uppercase tracking-wider">
                <Info className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'اہم ہدایات' : 'IMPORTANT INSTRUCTIONS'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {importantInstructions.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl bg-yellow-50 border border-yellow-200 p-4 sm:p-5 text-yellow-800"
                  >
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">
                      {language === 'ur' ? instruction.textUr : instruction.textEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ============================== RENEWAL AFTER EXPIRY ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-bg border-t border-brand-light-border">
        <PageContainer>
          <div className="max-w-3xl lg:max-w-5xl mx-auto space-y-8 sm:space-y-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'تجدیدِ لائسنس' : 'LICENSE RENEWAL'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur'
                  ? 'میعاد ختم ہونے کے بعد ڈرائیونگ لائسنس کی تجدید'
                  : 'Driving License Renewal After Expiry'}
              </h2>
            </div>

            {/* Required Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-blue" />
                {language === 'ur' ? 'مطلوبہ دستاویزات' : 'Required Documents'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renewalDocuments.map((doc, index) => (
                  <div
                    key={doc.id}
                    className={`flex items-start gap-3 sm:gap-5 bg-white rounded-2xl border border-brand-light-border p-4 sm:p-6 hover:border-brand-blue-300 hover:shadow-lg transition-all duration-300${
                      renewalDocuments.length % 2 === 1 && index === renewalDocuments.length - 1
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

            {/* Important Note */}
            <div className="flex items-start gap-3 rounded-2xl bg-yellow-50 border border-yellow-200 p-5 sm:p-6 text-yellow-800">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">
                <span className="font-bold">
                  {language === 'ur' ? 'اہم نوٹ: ' : 'Important Note: '}
                </span>
                {language === 'ur'
                  ? 'براہ کرم لاگو تجدید فیس اور اہلیت کی شرائط کی متعلقہ ڈرائیونگ لائسنس برانچ سے تصدیق کر لیں۔'
                  : 'Please confirm the applicable renewal fee and eligibility requirements with the concerned Driving License Branch.'}
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
                      ? 'ابھی رابطہ ایپ ڈاؤن لوڈ کریں اور بین الاقوامی ڈرائیونگ پرمٹ سمیت دیگر ڈرائیونگ لائسنس سروسز کے لیے ایپ کے ذریعے اپلائی کریں۔'
                      : 'Download the Raabta App now and apply for an International Driving Permit and other driving license services through the app.'}
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

export default InternationalPermit;
