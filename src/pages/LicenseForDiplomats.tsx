import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  Landmark,
  FileText,
  Mail,
  CreditCard,
  BookOpen,
  Stamp,
  Stethoscope,
  Receipt,
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

export const LicenseForDiplomats: React.FC = () => {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ڈپلومیٹس اور سفیروں کے لیے ڈرائیونگ لائسنس | ٹریفک وارڈن ایبٹ آباد'
        : 'Driving License for Diplomats & Embassy Officers | Traffic Warden Abbottabad';
  }, [language]);

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const sections = [
    {
      id: 'learner-permit',
      badgeEn: 'SECTION 1',
      badgeUr: 'حصہ 1',
      icon: FileText,
      titleEn: 'Learner Permit',
      titleUr: 'لرنر پرمٹ',
      subtitleEn: 'Applicants must provide the following documents:',
      subtitleUr: 'درخواست دہندگان کو درج ذیل دستاویزات فراہم کرنا لازمی ہیں:',
      documents: [
        {
          id: 1,
          icon: Mail,
          titleEn: 'Ministry of Foreign Affairs (MOFA) Letter',
          titleUr: 'وزارت خارجہ (MOFA) کا خط',
          textEn:
            'A letter from MOFA along with an official letter from the concerned embassy, addressed to the concerned DPO/CTO (MLAs), for the issuance or renewal of a driving license.',
          textUr:
            'وزارت خارجہ کا خط اور متعلقہ سفارت خانے کا سرکاری خط، جو متعلقہ ڈی پی او/سی ٹی او (ایم ایل اے) کے نام ڈرائیونگ لائسنس کے اجرا یا تجدید کے لیے ہو۔',
        },
        {
          id: 2,
          icon: CreditCard,
          titleEn: 'Diplomatic / Non-Diplomatic Card',
          titleUr: 'ڈپلومیٹک / غیر ڈپلومیٹک کارڈ',
          textEn: 'Photocopy of the card issued by MOFA.',
          textUr: 'MOFA کی جانب سے جاری کردہ کارڈ کی فوٹوکاپی۔',
        },
        {
          id: 3,
          icon: BookOpen,
          titleEn: 'Passport',
          titleUr: 'پاسپورٹ',
          textEn: 'Photocopy of a valid passport.',
          textUr: 'درست پاسپورٹ کی فوٹوکاپی۔',
        },
        {
          id: 4,
          icon: Stamp,
          titleEn: 'Valid Visa',
          titleUr: 'درست ویزا',
          textEn: 'The visa must have at least six months of validity on the date of application.',
          textUr: 'درخواست کی تاریخ پر ویزا کم از کم چھ ماہ کے لیے کارآمد ہونا چاہیے۔',
        },
        {
          id: 5,
          icon: Stethoscope,
          titleEn: 'Medical Certificate',
          titleUr: 'میڈیکل سرٹیفکیٹ',
          textEn: 'Issued by an Authorized Medical Practitioner.',
          textUr: 'مجاز طبی پریکٹیشنر کی جانب سے جاری کردہ۔',
        },
        {
          id: 6,
          icon: ShieldCheck,
          titleEn: 'Original Passport',
          titleUr: 'اصل پاسپورٹ',
          textEn: 'Must be presented at the time of processing.',
          textUr: 'کارروائی کے وقت پیش کرنا لازمی ہے۔',
        },
        {
          id: 7,
          icon: Receipt,
          titleEn: 'Fee Voucher',
          titleUr: 'فیس واؤچر',
          textEn: 'Rs. 250, payable through a designated bank.',
          textUr: '250 روپے، جو کسی مقررہ بینک کے ذریعے ادا کیے جائیں۔',
        },
      ],
    },
    {
      id: 'driving-license',
      badgeEn: 'SECTION 2',
      badgeUr: 'حصہ 2',
      icon: Landmark,
      titleEn: 'Driving License',
      titleUr: 'ڈرائیونگ لائسنس',
      subtitleEn: 'Applicants must provide the following documents:',
      subtitleUr: 'درخواست دہندگان کو درج ذیل دستاویزات فراہم کرنا لازمی ہیں:',
      documents: [
        {
          id: 1,
          icon: FileText,
          titleEn: 'Learner Permit',
          titleUr: 'لرنر پرمٹ',
          textEn: 'Must have been held for at least 45 days.',
          textUr: 'کم از کم 45 دن تک برقرار رہا ہو۔',
        },
        {
          id: 2,
          icon: Mail,
          titleEn: 'MOFA and Embassy Letters',
          titleUr: 'MOFA اور سفارت خانے کے خطوط',
          textEn:
            'A letter from MOFA along with an official letter from the concerned embassy, addressed to the concerned DPO/CTO (MLAs), for the issuance or renewal of a driving license.',
          textUr:
            'وزارت خارجہ کا خط اور متعلقہ سفارت خانے کا سرکاری خط، جو متعلقہ ڈی پی او/سی ٹی او (ایم ایل اے) کے نام ڈرائیونگ لائسنس کے اجرا یا تجدید کے لیے ہو۔',
        },
        {
          id: 3,
          icon: CreditCard,
          titleEn: 'Diplomatic / Non-Diplomatic Card',
          titleUr: 'ڈپلومیٹک / غیر ڈپلومیٹک کارڈ',
          textEn: 'Photocopy of the card issued by MOFA.',
          textUr: 'MOFA کی جانب سے جاری کردہ کارڈ کی فوٹوکاپی۔',
        },
        {
          id: 4,
          icon: BookOpen,
          titleEn: 'Passport',
          titleUr: 'پاسپورٹ',
          textEn: 'Photocopy of a valid passport.',
          textUr: 'درست پاسپورٹ کی فوٹوکاپی۔',
        },
        {
          id: 5,
          icon: Stamp,
          titleEn: 'Valid Visa',
          titleUr: 'درست ویزا',
          textEn: 'The visa must have at least six months of validity on the date of application.',
          textUr: 'درخواست کی تاریخ پر ویزا کم از کم چھ ماہ کے لیے کارآمد ہونا چاہیے۔',
        },
        {
          id: 6,
          icon: Stethoscope,
          titleEn: 'Medical Certificate',
          titleUr: 'میڈیکل سرٹیفکیٹ',
          textEn: 'Issued by an Authorized Medical Practitioner.',
          textUr: 'مجاز طبی پریکٹیشنر کی جانب سے جاری کردہ۔',
        },
        {
          id: 7,
          icon: ShieldCheck,
          titleEn: 'Original Passport',
          titleUr: 'اصل پاسپورٹ',
          textEn: 'Must be presented at the time of processing.',
          textUr: 'کارروائی کے وقت پیش کرنا لازمی ہے۔',
        },
        {
          id: 8,
          icon: Receipt,
          titleEn: 'Driving Test Fee Voucher',
          titleUr: 'ڈرائیونگ ٹیسٹ فیس واؤچر',
          textEn: 'Rs. 250.',
          textUr: '250 روپے۔',
        },
        {
          id: 9,
          icon: Banknote,
          titleEn: 'Driving License Card Fee Voucher',
          titleUr: 'ڈرائیونگ لائسنس کارڈ فیس واؤچر',
          textEn: 'Rs. 1,000.',
          textUr: '1,000 روپے۔',
        },
      ],
    },
  ];

  const importantInstructions = [
    {
      icon: FileText,
      textEn: 'Ensure that all required documents are complete before visiting the Driving License Branch.',
      textUr: 'ڈرائیونگ لائسنس برانچ تشریف لانے سے پہلے یقینی بنائیں کہ تمام مطلوبہ دستاویزات مکمل ہوں۔',
    },
    {
      icon: ShieldCheck,
      textEn: 'Original documents must be presented wherever required for verification.',
      textUr: 'توثیق کے لیے جہاں بھی ضروری ہو، اصل دستاویزات پیش کرنا لازمی ہے۔',
    },
    {
      icon: AlertTriangle,
      textEn: 'Confirm the current fee schedule and applicable requirements with the concerned Driving License Branch before applying.',
      textUr: 'درخواست دینے سے پہلے متعلقہ ڈرائیونگ لائسنس برانچ سے موجودہ فیس کی تفصیل اور قابل اطلاق تقاضوں کی تصدیق کر لیں۔',
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
                label: 'Driving License for Diplomats',
                labelUrdu: 'ڈپلومیٹس کے لیے ڈرائیونگ لائسنس',
                path: '/services/driving-license/diplomats',
              },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'ڈپلومیٹس اور سفیر' : 'DIPLOMATS & EMBASSY OFFICERS'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur'
                ? 'ڈپلومیٹس اور سفارتی عملے کے لیے ڈرائیونگ لائسنس'
                : 'DRIVING LICENSE FOR DIPLOMATS & EMBASSY OFFICERS'}
            </h1>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'یہ سیکشن ان سفیروں اور سفارت خانے کے افسران کے لیے دستاویزات اور درخواست کے تقاضوں کا خاکہ پیش کرتا ہے جو لرنر پرمٹ یا ڈرائیونگ لائسنس کے لیے درخواست دیتے ہیں۔'
                : 'This section outlines the documentation and application requirements for diplomats and embassy officers applying for a Learner Permit or Driving License.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* ============================== SECTIONS ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="max-w-3xl lg:max-w-5xl mx-auto space-y-14 sm:space-y-16">
            {sections.map((section) => (
              <div key={section.id} className="space-y-6">
                {/* Section Header */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
                    <section.icon className="w-3.5 h-3.5" />
                    <span>{language === 'ur' ? section.badgeUr : section.badgeEn}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                    {language === 'ur' ? section.titleUr : section.titleEn}
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
                    {language === 'ur' ? section.subtitleUr : section.subtitleEn}
                  </p>
                </div>

                {/* Documents List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.documents.map((doc, index) => (
                    <div
                      key={doc.id}
                      className={`flex items-start gap-3 sm:gap-5 bg-white rounded-2xl border border-brand-light-border p-4 sm:p-6 hover:border-brand-blue-300 hover:shadow-lg transition-all duration-300${
                        section.documents.length % 2 === 1 &&
                        index === section.documents.length - 1
                          ? ' md:col-span-2'
                          : ''
                      }`}
                    >
                      <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm sm:text-lg shadow-md">
                        {doc.id}
                      </div>
                      <div className="flex-1 min-w-0 flex items-start gap-3 sm:pt-0.5">
                        <div className="hidden sm:flex w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue items-center justify-center shrink-0">
                          <doc.icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 space-y-1">
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
            ))}

            {/* License Validity */}
            <div className="rounded-3xl bg-brand-blue text-white p-5 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5 sm:w-7 sm:h-7 text-brand-lime" />
                </div>
                <div className="min-w-0 space-y-1">
                  <h3 className="text-lg sm:text-xl font-extrabold">
                    {language === 'ur' ? 'لائسنس کے اعتبار کی مدت' : 'License Validity'}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed">
                    {language === 'ur'
                      ? 'ڈرائیونگ لائسنس کی مدت درخواست دہندہ کے ویزا کی مدت کے مطابق ہوگی۔'
                      : "The validity of the driving license shall correspond to the validity period of the applicant's visa."}
                  </p>
                </div>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="space-y-5">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-xs font-semibold uppercase tracking-wider mb-3">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{language === 'ur' ? 'اہم ہدایات' : 'IMPORTANT INSTRUCTIONS'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                  {language === 'ur' ? 'اہم ہدایات' : 'Important Instructions'}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {importantInstructions.map((instruction, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-brand-light-border p-5 hover:border-red-200 hover:shadow-md transition-all duration-300 flex gap-4 sm:last:col-span-2"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <instruction.icon className="w-5 h-5" />
                    </div>
                    <p className="min-w-0 flex-1 break-words text-sm text-slate-700 leading-relaxed">
                      {language === 'ur' ? instruction.textUr : instruction.textEn}
                    </p>
                  </div>
                ))}
              </div>
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
                      ? 'ابھی رابطہ ایپ ڈاؤن لوڈ کریں اور ڈپلومیٹس کے لیے ڈرائیونگ لائسنس سمیت دیگر ڈرائیونگ لائسنس سروسز کے لیے ایپ کے ذریعے اپلائی کریں۔'
                      : 'Download the Raabta App now and apply for a driving license for diplomats and other driving license services through the app.'}
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

export default LicenseForDiplomats;
