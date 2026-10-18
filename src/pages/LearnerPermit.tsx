import React, { useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ContactSection } from '../components/ui/ContactSection';
import { useLanguage } from '../hooks/useLanguage';
import {
  Smartphone,
  UserPlus,
  FileText,
  CreditCard,
  CheckCircle2,
  Building2,
  AlertTriangle,
  Download,
  ShieldCheck,
  Car,
  BookOpen,
  Radio,
  Phone,
  ExternalLink,
  IdCard,
} from 'lucide-react';

export const LearnerPermit: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'آن لائن لرنر پرمٹ | ٹریفک وارڈن ایبٹ آباد'
        : 'Online Learner Permit | Traffic Warden Abbottabad';
  }, [language]);

  const raabtaAppImages = [
    '/Rabta App Images/00.jpg',
    '/Rabta App Images/01.jpg',
    '/Rabta App Images/02.jpg',
    '/Rabta App Images/03.jpg',
    '/Rabta App Images/05.jpg',
  ];

  const steps = [
    {
      number: 1,
      icon: Smartphone,
      titleEn: 'Download the Raabta App',
      titleUr: 'رابطہ ایپ ڈاؤن لوڈ کریں',
      descEn: 'Open the Google Play Store on your mobile phone and download the Raabta App for Khyber Pakhtunkhwa Police.',
      descUr: 'اپنے موبائل فون پر گوگل پلی اسٹور کھولیں اور خیبر پختونخوا پولیس کے لیے رابطہ ایپ ڈاؤن لوڈ کریں۔',
    },
    {
      number: 2,
      icon: UserPlus,
      titleEn: 'Sign In to the App',
      titleUr: 'ایپ میں سائن ان کریں',
      descEn: 'Open the application and sign in using the available method. Once signed in, the application dashboard will appear.',
      descUr: 'ایپلیکیشن کھولیں اور دستیاب طریقے کا استعمال کرتے ہوئے سائن ان کریں۔ سائن ان ہونے پر، ایپلیکیشن ڈیش بورڈ ظاہر ہوگا۔',
    },
    {
      number: 3,
      icon: FileText,
      titleEn: 'Select the Learning Permit Option',
      titleUr: 'لرنر پرمٹ آپشن منتخب کریں',
      descEn: 'Locate and select the Learning Permit or Learning Slip option on the dashboard to begin your application.',
      descUr: 'ڈیش بورڈ پر لرنر پرمٹ یا لرنر سلپ کے آپشن کو تلاش کریں اور منتخب کریں تاہم اپنا درخواست آغاز کریں۔',
    },
    {
      number: 4,
      icon: UserPlus,
      titleEn: 'Enter Your Information',
      titleUr: 'اپنی معلومات درج کریں',
      descEn: 'Provide the required personal details and upload your photograph according to the instructions provided in the application. Carefully review your information before submitting it.',
      descUr: 'ایپلیکیشن میں فراہم ہدایات کے مطابق مطلوبہ ذاتی تفصیلات فراہم کریں اور اپنی فوٹو اپ لوڈ کریں۔ جمع کرنے سے پہلے اپنی معلومات کا احتیاط سے جائزہ لیں۔',
    },
    {
      number: 5,
      icon: CreditCard,
      titleEn: 'Pay the Prescribed Fee',
      titleUr: 'مقررہ فیس ادا کریں',
      descEn: 'Once your application is completed, follow the payment instructions and use the issued fee token or payment reference. Pay through officially available methods such as Easypaisa or other supported platforms.',
      descUr: 'آپ کی درخواست مکمل ہونے پر، ادائیگی کی ہدایات کی پیروی کریں اور جاری فیس ٹوکن یا ادائیگی ريفرنس استعمال کریں۔ سرکاری طور پر دستیاب طریقوں جیسے ایزی پیسہ یا دیگر مزید پلیٹ فارم کے ذریعے فیس ادا کریں۔',
    },
    {
      number: 6,
      icon: CheckCircle2,
      titleEn: 'Receive Your Learning Permit',
      titleUr: 'اپنا لرنر پرمٹ حاصل کریں',
      descEn: 'After payment and successful verification, follow the instructions in the app to obtain or download your learning permit.',
      descUr: 'ادائیگی اور کامیاب تصدیق کے بعد، ایپ میں دی گئی ہدایات کی پیروی کرتے ہوئے اپنا لرنر پرمٹ حاصل یا ڈاؤن لوڈ کریں۔',
    },
    {
      number: 7,
      icon: Building2,
      titleEn: 'Visit the Driving License Branch',
      titleUr: 'ڈرائیونگ لائسنس برانچ آئیں',
      descEn: 'After completing the prescribed learning period, visit the relevant Driving License Branch to complete formalities, documentation, and driving tests for your permanent license.',
      descUr: 'مقررہ لرننگ پوریڈ مکمل ہونے پر، متعلقہ ڈرائیونگ لائسنس برانچ آکر ضروری فارمائلٹیز، دستاویزات، اور ڈرائیونگ ٹیسٹز پوری کریں تاکہ آپ کو مستقل لائسنس مل سکے۔',
    },
  ];

  const additionalServices = [
    {
      icon: FileText,
      titleEn: 'Traffic Challan Information',
      titleUr: 'ٹریفک چالان کی معلومات',
      descEn: 'Check available traffic challan details and status.',
      descUr: 'دستیاب ٹریفک چالان کی تفصیلات اور حیثیت چیک کریں۔',
    },
    {
      icon: IdCard,
      titleEn: 'Driving License Information',
      titleUr: 'ڈرائیونگ لائسنس کی معلومات',
      descEn: 'Access guidance regarding new licenses, renewals, and license verification.',
      descUr: 'نئے لائسنس، تجدید، اور لائسنس تصدیق کے بارے میں رہنمائی حاصل کریں۔',
    },
    {
      icon: ShieldCheck,
      titleEn: 'Traffic Rules & Road Safety',
      titleUr: 'ٹریفک قواعد اور سڑک کی حفاظت',
      descEn: 'Learn about traffic regulations, safe driving practices, and road safety guidelines.',
      descUr: 'ٹریفک ضابطوں، محفوظ ڈرائیونگ عمل، اور سڑک کی حفاظت کی ہدایات کے بارے میں جانیں۔',
    },
    {
      icon: BookOpen,
      titleEn: 'Driving Test Preparation',
      titleUr: 'ڈرائیونگ ٹیسٹ کی تیاری',
      descEn: 'Learn traffic signs and their meanings to prepare for driving tests.',
      descUr: 'ٹریفک اشارے اور ان کے مفہوم سیکھیں تاکہ ڈرائیونگ ٹیسٹ کی تیاری ہو سکے۔',
    },
    {
      icon: Car,
      titleEn: 'Traffic Updates',
      titleUr: 'ٹریفک اپڈیٹس',
      descEn: 'Access available traffic updates to help plan your journey.',
      descUr: 'دستیاب ٹریفک اپڈیٹس تک رسائی حاصل کریں تاکہ اپنا سفر پلان کر سکیں۔',
    },
    {
      icon: Radio,
      titleEn: 'Live Traffic Radio',
      titleUr: 'لائیو ٹریفک ریڈیو',
      descEn: 'Listen to traffic announcements and related updates through the available radio service.',
      descUr: 'دستیاب ریڈیو سروس کے ذریعے ٹریفک اعلانات اور متعلقہ اپڈیٹس سنیں۔',
    },
    {
      icon: Phone,
      titleEn: 'Emergency Contacts',
      titleUr: 'ایمرجنسی رابطے',
      descEn: 'Access available helplines and relevant contact numbers when assistance is required.',
      descUr: 'مدد کی ضرورت ہونے پر دستیاب ہیلپ لائنز اور متعلقہ رابطہ نمبرز تک رسائی حاصل کریں۔',
    },
  ];

  const importantInstructions = [
    {
      icon: FileText,
      textEn: 'Provide accurate and complete information when submitting your application.',
      textUr: 'اپنی درخواست جمع کرتے وقت درست اور مکمل معلومات فراہم کریں۔',
    },
    {
      icon: CreditCard,
      textEn: 'Verify the fee token and payment details before making a payment.',
      textUr: 'ادائیگی کرنے سے پہلے فیس ٹوکن اور ادائیگی کی تفصیلات کی تصدیق کریں۔',
    },
    {
      icon: CheckCircle2,
      textEn: 'Keep your payment receipt or transaction reference for future use.',
      textUr: 'مستقبل کے لیے اپنی ادائیگی کی رسید یا ٹرانزیکشن ريفرنس محفوظ رکھیں۔',
    },
    {
      icon: Building2,
      textEn: 'Follow instructions issued by the Driving License Branch regarding documents, eligibility, and visit requirements.',
      textUr: 'ڈرائیونگ لائسنس برانچ کی جانب سے جاری ہدایات کی پیروی کریں جو دستاویزات، اہلیت، اور آئندہ ضروریات سے متعلق ہوں۔',
    },
    {
      icon: ShieldCheck,
      textEn: 'Always comply with traffic laws and prioritize the safety of yourself and other road users.',
      textUr: 'ہمیشہ ٹریفک قوانین کی پابندی کریں اور اپنی اور دیگر راستہ چلانے والوں کی حفاظت کو ترجیح دیں۔',
    },
  ];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative bg-[#000080] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', labelUrdu: 'صفحۂ اول', path: '/' },
              { label: 'Services', labelUrdu: 'خدمات', path: '/services' },
              { label: 'Driving License Services', labelUrdu: 'ڈرائیونگ لائسنس سروسز', path: '/services/driving-license' },
              { label: 'Learner Permit', labelUrdu: 'لرنر پرمٹ', path: '/services/driving-license/learner-permit' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'آن لائن لرنر پرمٹ' : 'ONLINE LEARNER PERMIT'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'آن لائن لرنر پرمٹ اور ڈرائیونگ لائسنس سروسز' : 'ONLINE LEARNING PERMIT & DRIVING LICENSE SERVICES'}
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'ایبٹ آباد ٹریفک وارڈن پولیس شہریوں کو ڈرائیونگ لائسنس سروسز اور ٹریفک سے متعلق معلومات آسانی سے فراہم کرنے کا مقصد رکھتی ہے۔'
                : 'Abbottabad Traffic Warden Police aims to make driving license services and traffic-related information easily accessible to citizens.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Intro Section */}
      <section className="py-12 bg-brand-light-surface border-b border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-brand-light-border p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark mb-4">
                {language === 'ur' ? 'رابطہ ایپ کے ذریعے سروسز' : 'Services Through Raabta App'}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {language === 'ur' ? (
                  <>
                    خیبر پختونخوا پولیس کی جانب سے فراہم کردہ{' '}
                    <strong className="font-bold text-brand-dark">رابطہ ایپ</strong> کے ذریعے شہری
                    لرنر پرمٹ، ڈرائیونگ لائسنس تجدید اور تصدیق، ٹریفک چالان، ٹریفک قواعد، اور سڑک کی
                    حفاظت کے بارے میں معلومات حاصل کر سکتے ہیں۔
                  </>
                ) : (
                  <>
                    Through the{' '}
                    <strong className="font-bold text-brand-dark">Raabta App</strong>, provided by
                    Khyber Pakhtunkhwa Police, citizens can access information about learning
                    permits, driving license renewal and verification, traffic challans, traffic
                    rules, and road safety.
                  </>
                )}
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.nsd.rabta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-blue hover:bg-brand-blue-600 text-white font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 sm:w-auto"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'ur' ? 'گوگل پلی اسٹور سے ڈاؤن لوڈ کریں' : 'Download from Google Play Store'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Raabta App Screenshots Gallery */}
      <section className="py-12 bg-brand-light-bg border-b border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
                <Smartphone className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'رابطہ ایپ کے اسکرین شاٹس' : 'RAABTA APP SCREENSHOTS'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur' ? 'رابطہ ایپ کا جائزہ' : 'Raabta App Overview'}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {raabtaAppImages.map((img, index) => (
                <div key={index} className="relative group rounded-xl overflow-hidden border border-brand-light-border hover:shadow-xl transition-all duration-300 aspect-[9/16]">
                  <img
                    src={img}
                    alt={`${language === 'ur' ? 'رابطہ ایپ اسکرین شاٹ' : 'Raabta App Screenshot'} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-xs font-medium text-center w-full">
                      {language === 'ur' ? `رابطہ ایپ اسکرین ${index + 1}` : `Raabta App Screen ${index + 1}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* How to Apply Steps */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>{language === 'ur' ? 'آن لائن لرنر پرمٹ کا طریقہ کار' : 'HOW TO APPLY ONLINE'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur' ? 'آن لائن لرنر پرمٹ کے لیے کیسے اپلائی کریں' : 'How to Apply for an Online Learning Permit'}
              </h2>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative group flex gap-5 sm:gap-6 pb-8 last:pb-0"
                >
                  {/* Timeline Line */}
                  <div className="absolute start-[19px] top-0 bottom-0 w-0.5 bg-brand-light-border" aria-hidden="true">
                    {index < steps.length - 1 && (
                      <div className="absolute top-10 h-full w-full bg-brand-lime/30" />
                    )}
                  </div>

                  {/* Step Number Circle */}
                  <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg z-10 shadow-lg border-4 border-white">
                    {step.number}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 bg-white rounded-2xl border border-brand-light-border p-5 sm:p-6 hover:border-brand-blue-300 hover:shadow-lg transition-all duration-300 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-brand-dark">
                          {language === 'ur' ? step.titleUr : step.titleEn}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed sm:ps-[3.25rem]">
                      {language === 'ur' ? step.descUr : step.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Important Note */}
      <section className="py-12 bg-brand-light-bg border-y border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">
                    {language === 'ur' ? 'اہم نوٹ' : 'Important Note'}
                  </h3>
                  <p className="text-sm text-yellow-700 leading-relaxed">
                    {language === 'ur'
                      ? 'اہلیت کی شرائط، فیس، ادائیگی کے طریقے، اور مقررہ انتظار کا وقت تبدیل ہو سکتا ہے۔ براہ کرم نئی ضروریات کی تصدیق رابطہ ایپ یا متعلقہ ڈرائیونگ لائسنس برانچ سے کرنے سے پہلے کر لیں۔'
                      : 'Eligibility requirements, fees, payment methods, and the prescribed waiting period may change. Please confirm the latest requirements through the Raabta App or the relevant Driving License Branch before applying.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Additional Services */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>{language === 'ur' ? 'اضافی سروسز' : 'ADDITIONAL SERVICES'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur' ? 'رابطہ ایپ کے ذریعے دستیاب دیگر سروسز' : 'Additional Services Available Through Raabta App'}
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
                {language === 'ur'
                  ? 'رابطہ ایپ مختلف ٹریفک سے متعلق سروسز اور معلومات تک رسائی فراہم کرتا ہے، جن میں شامل ہیں:'
                  : 'The Raabta App provides access to various traffic-related services and information, including:'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {additionalServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-brand-light-border p-5 hover:border-brand-blue-300 hover:shadow-md transition-all duration-300 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                    <service.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-brand-dark text-sm">
                      {language === 'ur' ? service.titleUr : service.titleEn}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {language === 'ur' ? service.descUr : service.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Important Instructions */}
      <section className="py-16 sm:py-20 bg-brand-light-bg border-t border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-xs font-semibold uppercase tracking-wider mb-3">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'اہم ہدایات' : 'IMPORTANT INSTRUCTIONS'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur' ? 'شہریوں کے لیے اہم ہدایات' : 'Important Instructions for Citizens'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {importantInstructions.map((instruction, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-brand-light-border p-5 hover:border-red-200 hover:shadow-md transition-all duration-300 flex gap-4"
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
        </PageContainer>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[#000080] border-t border-[#0000aa]">
        <PageContainer>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'آن لائن سہولت' : 'APPLY ONLINE WITH EASE'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {language === 'ur' ? 'آسانی سے آن لائن اپلائی کریں' : 'Apply Online with Ease'}
            </h2>
            <p className="text-white/85 text-base leading-relaxed">
              {language === 'ur'
                ? 'رابطہ ایپ ڈاؤن لوڈ کریں تاکہ درایونگ لائسنس سروسز اور ٹریفک سے متعلق معلومات آپ کے موبائل فون سے آسانی سے دستیاب ہوں۔'
                : 'Download the Raabta App to access available driving license services and traffic-related information conveniently from your mobile phone.'}
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.nsd.rabta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-lime hover:bg-brand-lime-hover text-brand-dark font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>{language === 'ur' ? 'رابطہ ایپ ڈاؤن لوڈ کریں' : 'Download Raabta App'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </PageContainer>
      </section>

      {/* Raabta / Contact Section */}
      <section className="py-16 sm:py-20 bg-brand-light-bg border-t border-brand-light-border">
        <PageContainer>
          <ContactSection />
        </PageContainer>
      </section>
    </div>
  );
};

export default LearnerPermit;