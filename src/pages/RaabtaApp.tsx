import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ContactSection } from '../components/ui/ContactSection';
import { useLanguage } from '../hooks/useLanguage';
import {
  Smartphone,
  Download,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ShieldCheck,
  TrafficCone,
  IdCard,
  Receipt,
  BadgeCheck,
  BookOpen,
  Signpost,
  Radio,
  Phone,
  Wrench,
  Maximize2,
  X,
  Store,
  Apple,
  Landmark,
  Clock,
  Users,
  Globe,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* App Screenshots (portrait app-store style mockups)                  */
/* ------------------------------------------------------------------ */
const appScreens = [
  {
    src: '/Rabta App Images/00.jpg',
    titleEn: 'Raabta — Connect with KP Traffic Police',
    titleUr: 'رابطہ — کے پی ٹریفک پولیس سے جڑیں',
    descEn: 'The official Raabta App introducing digital traffic services for the citizens of Khyber Pakhtunkhwa.',
    descUr: 'سرکاری رابطہ ایپ جو خیبر پختونخوا کے شہریوں کو ڈیجیٹل ٹریفک سروسز سے روشناس کراتی ہے۔',
  },
  {
    src: '/Rabta App Images/01.jpg',
    titleEn: 'Raabta App Dashboard',
    titleUr: 'رابطہ ایپ ڈیش بورڈ',
    descEn: 'Main dashboard with driving license services, challan verification, license branches and more.',
    descUr: 'مرکزی ڈیش بورڈ جس میں ڈرائیونگ لائسنس سروسز، چالان تصدیق، لائسنس برانچز اور دیگر سہولیات شامل ہیں۔',
  },
  {
    src: '/Rabta App Images/02.jpg',
    titleEn: 'Drive Safe, Stay Connected — Offense List',
    titleUr: 'محفوظ ڈرائیو، جڑے رہیں — خلاف ورزیوں کی فہرست',
    descEn: 'Review violation codes, descriptions and applicable fines for each vehicle category.',
    descUr: 'ہر گاڑی کی قسم کے لیے خلاف ورزی کوڈز، تفصیل اور مقررہ جرمانے ملاحظہ کریں۔',
  },
  {
    src: '/Rabta App Images/03.jpg',
    titleEn: 'Simple Learner Permit Process',
    titleUr: 'آسان لرنر پرمٹ طریقہ کار',
    descEn: 'Eligibility criteria, required documents and step-by-step procedure for a learner permit.',
    descUr: 'لرنر پرمٹ کے لیے اہلیت، مطلوبہ دستاویزات اور مرحلہ وار طریقہ کار۔',
  },
  {
    src: '/Rabta App Images/05.jpg',
    titleEn: 'Verify Challan Instantly',
    titleUr: 'چالان کی فوری تصدیق',
    descEn: 'Verify traffic challan details, ticket status and payment records through the app.',
    descUr: 'ایپ کے ذریعے ٹریفک چالان کی تفصیلات، ٹکٹ اسٹیٹس اور ادائیگی کے ریکارڈ کی تصدیق کریں۔',
  },
];

/* ------------------------------------------------------------------ */
/* Key Features                                                       */
/* ------------------------------------------------------------------ */
const keyFeatures = [
  {
    icon: TrafficCone,
    titleEn: 'Live Traffic Updates',
    titleUr: 'لائیو ٹریفک اپڈیٹس',
    descEn: 'Access available traffic updates and road congestion information to plan your journey more efficiently, and consider alternative routes where information is available.',
    descUr: 'اپنا سفر بہتر انداز میں منصوبہ بند کرنے کے لیے دستیاب ٹریفک اپڈیٹس اور سڑک پر رش کی معلومات حاصل کریں، اور جہاں معلومات دستیاب ہوں متبادل راستوں پر غور کریں۔',
  },
  {
    icon: IdCard,
    titleEn: 'Driving License Services',
    titleUr: 'ڈرائیونگ لائسنس سروسز',
    descEn: 'Access guidance regarding driving license applications, renewal procedures and license verification to help understand the licensing process.',
    descUr: 'ڈرائیونگ لائسنس کی درخواست، تجدید کے طریقہ کار اور لائسنس کی تصدیق سے متعلق رہنمائی حاصل کریں تاکہ لائسنس کا عمل سمجھنا آسان ہو۔',
  },
  {
    icon: Receipt,
    titleEn: 'Traffic Challan Information',
    titleUr: 'ٹریفک چالان کی معلومات',
    descEn: 'Check available traffic challan details and violation records by providing the required information, along with available challan status services.',
    descUr: 'مطلوبہ معلومات فراہم کر کے دستیاب ٹریفک چالان کی تفصیلات اور خلاف ورزی کے ریکارڈ چیک کریں، ساتھ ہی دستیاب چالان اسٹیٹس سروسز بھی۔',
  },
  {
    icon: BadgeCheck,
    titleEn: 'Challan & Payment Verification',
    titleUr: 'چالان اور ادائیگی کی تصدیق',
    descEn: 'Use the available verification facilities to check the status of traffic fines and payment records.',
    descUr: 'ٹریفک جرمانوں کی حیثیت اور ادائیگی کے ریکارڈ کی جانچ کے لیے دستیاب تصدیقی سہولیات استعمال کریں۔',
  },
  {
    icon: BookOpen,
    titleEn: 'Traffic Rules & Road Safety Education',
    titleUr: 'ٹریفک قواعد اور سڑک کی حفاظت کی تعلیم',
    descEn: 'Learn about traffic regulations, responsible driving practices and road safety guidelines for safer roads for motorists and pedestrians.',
    descUr: 'ٹریفک ضوابط، ذمہ دارانہ ڈرائیونگ اور سڑک کی حفاظت کی ہدایات سیکھیں تاکہ موٹر سائیکل سواروں اور پیدل چلنے والوں کے لیے سڑکیں محفوظ ہوں۔',
  },
  {
    icon: Signpost,
    titleEn: 'Traffic Sign Test Preparation',
    titleUr: 'ٹریفک اشاروں کے ٹیسٹ کی تیاری',
    descEn: 'Prepare for your driving test by learning traffic signs, road symbols and their meanings through the app\'s traffic education resources.',
    descUr: 'ایپ کے ٹریفک تعلیمی وسائل کے ذریعے ٹریفک اشارے، سڑک کی علامات اور ان کے مفہوم سیکھ کر اپنے ڈرائیونگ ٹیسٹ کی تیاری کریں۔',
  },
  {
    icon: Radio,
    titleEn: 'Live Traffic Radio',
    titleUr: 'لائیو ٹریفک ریڈیو',
    descEn: 'Listen to the available KP Traffic Police radio stream for traffic announcements, relevant updates and public awareness information.',
    descUr: 'ٹریفک اعلانات، متعلقہ اپڈیٹس اور عوامی آگاہی کی معلومات کے لیے دستیاب کے پی ٹریفک پولیس ریڈیو اسٹریم سنیں۔',
  },
  {
    icon: Phone,
    titleEn: 'Emergency Contact Information',
    titleUr: 'ایمرجنسی رابطہ معلومات',
    descEn: 'Access available helpline numbers and relevant contact information for traffic assistance and emergency situations.',
    descUr: 'ٹریفک معاونت اور ہنگامی حالات کے لیے دستیاب ہیلپ لائن نمبرز اور متعلقہ رابطہ معلومات حاصل کریں۔',
  },
  {
    icon: Wrench,
    titleEn: 'Roadside Assistance Information',
    titleUr: 'سڑک کے کنارے معاونت کی معلومات',
    descEn: 'Find information about nearby mechanics and vehicle repair assistance where the relevant information is available, helping motorists during breakdowns.',
    descUr: 'جہاں متعلقہ معلومات دستیاب ہوں وہاں قریبی مکینک اور گاڑی کی مرمت کی معاونت کی معلومات حاصل کریں، جو گاڑی خراب ہونے پر سفر میں مدد دیتی ہے۔',
  },
];

/* ------------------------------------------------------------------ */
/* Benefits for Citizens                                              */
/* ------------------------------------------------------------------ */
const benefits = [
  {
    icon: Smartphone,
    titleEn: 'Convenient Access',
    titleUr: 'آسان رسائی',
    descEn: 'Find traffic-related information directly from your mobile phone.',
    descUr: 'ٹریفک سے متعلق معلومات براہ راست اپنے موبائل فون سے حاصل کریں۔',
  },
  {
    icon: Clock,
    titleEn: 'Time Saving',
    titleUr: 'وقت کی بچت',
    descEn: 'Access available digital services and licensing guidance without first visiting an office for basic information.',
    descUr: 'بنیادی معلومات کے لیے پہلے دفتر جانے کی ضرورت کے بغیر دستیاب ڈیجیٹل سروسز اور لائسنس کی رہنمائی حاصل کریں۔',
  },
  {
    icon: TrafficCone,
    titleEn: 'Better Journey Planning',
    titleUr: 'بہتر سفر کی منصوبہ بندی',
    descEn: 'Use available traffic updates to make informed travel decisions.',
    descUr: 'معلوماتی سفر کے فیصلے کرنے کے لیے دستیاب ٹریفک اپڈیٹس استعمال کریں۔',
  },
  {
    icon: ShieldCheck,
    titleEn: 'Improved Road Safety',
    titleUr: 'بہتر سڑک کی حفاظت',
    descEn: 'Learn traffic rules and safe driving practices.',
    descUr: 'ٹریفک قواعد اور محفوظ ڈرائیونگ کے طریقے سیکھیں۔',
  },
  {
    icon: Globe,
    titleEn: 'Greater Awareness',
    titleUr: 'زیادہ آگاہی',
    descEn: 'Stay informed about licensing procedures, traffic violations and road regulations.',
    descUr: 'لائسنس کے طریقہ کار، ٹریفک خلاف ورزیوں اور سڑک کے ضوابط سے باخبر رہیں۔',
  },
  {
    icon: Users,
    titleEn: 'Public Facilitation',
    titleUr: 'عوامی سہولت',
    descEn: 'Access relevant traffic services and contact information in one place.',
    descUr: 'متعلقہ ٹریفک سروسز اور رابطہ معلومات ایک ہی جگہ حاصل کریں۔',
  },
];

/* ------------------------------------------------------------------ */
/* How to Get Started                                                 */
/* ------------------------------------------------------------------ */
const startSteps = [
  {
    number: '1',
    icon: Download,
    titleEn: 'Download the Raabta App',
    titleUr: 'رابطہ ایپ ڈاؤن لوڈ کریں',
    descEn: 'Download the Raabta App from the official app store for your device.',
    descUr: 'اپنے ڈیوائس کے سرکاری ایپ اسٹور سے رابطہ ایپ ڈاؤن لوڈ کریں۔',
  },
  {
    number: '2',
    icon: Smartphone,
    titleEn: 'Open & Sign In',
    titleUr: 'ایپ کھولیں اور سائن ان کریں',
    descEn: 'Open the application and follow the available registration or sign-in instructions.',
    descUr: 'ایپلیکیشن کھولیں اور دستیاب رجسٹریشن یا سائن ان ہدایات کی پیروی کریں۔',
  },
  {
    number: '3',
    icon: Sparkles,
    titleEn: 'Explore the Dashboard',
    titleUr: 'ڈیش بورڈ کا جائزہ لیں',
    descEn: 'Explore the dashboard and select the service you need.',
    descUr: 'ڈیش بورڈ کا جائزہ لیں اور اپنی مطلوبہ سروس منتخب کریں۔',
  },
  {
    number: '4',
    icon: IdCard,
    titleEn: 'Enter Your Information',
    titleUr: 'اپنی معلومات درج کریں',
    descEn: 'Enter the required information and follow the instructions displayed in the application.',
    descUr: 'مطلوبہ معلومات درج کریں اور ایپلیکیشن میں ظاہر ہونے والی ہدایات کی پیروی کریں۔',
  },
  {
    number: '5',
    icon: CheckCircle2,
    titleEn: 'Follow Official Instructions',
    titleUr: 'سرکاری ہدایات پر عمل کریں',
    descEn: 'For services that require further verification or in-person processing, follow the instructions issued by the relevant authority.',
    descUr: 'جن سروسز کے لیے مزید تصدیق یا ذاتی حاضری درکار ہو، متعلقہ اتھارٹی کی جاری کردہ ہدایات پر عمل کریں۔',
  },
];

/* ------------------------------------------------------------------ */
/* Page Component                                                     */
/* ------------------------------------------------------------------ */
export const RaabtaApp: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<(typeof appScreens)[number] | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'رابطہ ایپ | ٹریفک وارڈن ایبٹ آباد'
        : 'Raabta App | Traffic Warden Abbottabad';
  }, [language]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const ArrowBack = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* ============================== HERO ============================== */}
      <section className="relative bg-[#000080] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-80 sm:h-80 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />

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
              { label: 'Raabta App', labelUrdu: 'رابطہ ایپ', path: '/services/driving-license/raabta-app' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div className="space-y-4 text-center md:text-start flex flex-col items-center md:items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'کے پی ٹریفک پولیس × کے پی آئی ٹی بی' : 'KP TRAFFIC POLICE × KPITB'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {language === 'ur' ? (
                  <>
                    رابطہ ایپ — <span className="text-brand-lime">آپ کا ڈیجیٹل رابطہ</span>
                  </>
                ) : (
                  <>
                    RAABTA APP — <span className="text-brand-lime">YOUR DIGITAL CONNECTION</span>
                  </>
                )}
              </h1>

              <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl">
                {language === 'ur'
                  ? 'خیبر پختونخوا ٹریفک پولیس کے ساتھ آپ کا ڈیجیٹل رابطہ — ٹریفک سے متعلق معلومات، ڈرائیونگ لائسنس سروسز، سڑک کی حفاظت کی تعلیم اور عوامی سہولت ایک ہی ایپ میں۔'
                  : 'Your digital connection to Khyber Pakhtunkhwa Traffic Police — traffic information, driving license services, road safety education and public facilitation in a single app.'}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1 w-full md:w-auto">
                <a
                  href="https://play.google.com/store/apps/details?id=com.nsd.rabta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-lime hover:bg-brand-lime-hover text-brand-dark font-extrabold text-sm tracking-wide shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'ur' ? 'ایپ ڈاؤن لوڈ کریں' : 'Download the App'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="#key-features"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm tracking-wide transition-all duration-200"
                >
                  <span>{language === 'ur' ? 'اہم خصوصیات دیکھیں' : 'Explore Key Features'}</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Phone mockup showcase */}
            <div className="relative flex justify-center md:justify-end">
              <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[260px] lg:max-w-[280px]">
                <div className="absolute -inset-4 bg-brand-lime/10 rounded-[2.5rem] blur-2xl" />
                <div className="relative rounded-2xl sm:rounded-[2rem] border-2 border-white/20 bg-slate-900/40 p-2 sm:p-2.5 shadow-2xl overflow-hidden">
                  <img
                    src="/Rabta App Images/00.jpg"
                    alt={language === 'ur' ? 'رابطہ ایپ' : 'Raabta App'}
                    className="w-full h-auto rounded-xl sm:rounded-[1.5rem] object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -start-3 sm:-start-6 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-brand-dark shadow-xl border border-brand-light-border">
                  <BadgeCheck className="w-5 h-5 text-brand-blue" />
                  <div className="leading-tight">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {language === 'ur' ? 'سرکاری ایپ' : 'Official App'}
                    </div>
                    <div className="text-xs font-extrabold">KP Traffic Police</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ============================== ABOUT ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-surface border-b border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'رابطہ ایپ کا تعارف' : 'ABOUT THE RAABTA APP'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur'
                ? 'رابطہ ایپ — خیبر پختونخوا ٹریفک پولیس سے ڈیجیٹل رابطہ'
                : 'Raabta App — Your Digital Connection to KP Traffic Police'}
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                {language === 'ur'
                  ? 'رابطہ ایپ ایک ڈیجیٹل ٹریفک معاون ایپلیکیشن ہے جو خیبر پختونخوا کے سڑک استعمال کرنے والوں کی سہولت کے لیے تیار کی گئی ہے۔ یہ ایپ کے پی ٹریفک پولیس اور خیبر پختونخوا انفارمیشن ٹیکنالوجی بورڈ (کے پی آئی ٹی بی) کے تعاون سے تیار کی گئی ہے اور اس کا مقصد ٹریفک سے متعلق معلومات، ڈرائیونگ لائسنس سروسز، سڑک کی حفاظت کی تعلیم اور عوامی سہولت تک رسائی کو بہتر بنانا ہے۔'
                  : 'The Raabta App is a digital traffic assistance application developed to facilitate road users in Khyber Pakhtunkhwa. Developed through collaboration with KP Traffic Police and the Khyber Pakhtunkhwa Information Technology Board (KPITB), the app aims to improve access to traffic-related information, driving license services, road safety education, and public facilitation.'}
              </p>
              <p>
                {language === 'ur'
                  ? 'رابطہ شہریوں کو اپنے موبائل فون کے ذریعے ضروری ٹریفک سروسز اور معلومات تک رسائی فراہم کرتا ہے، جس سے ٹریفک ضوابط کو سمجھنا، دستیاب سروس کی معلومات دیکھنا اور اپنے سفر کی منصوبہ بندی کرنا آسان ہو جاتا ہے۔'
                  : 'Raabta helps citizens access essential traffic services and information through their mobile phones, making it easier to understand traffic regulations, check available service information, and plan their journeys.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="rounded-2xl bg-brand-blue text-white p-4 sm:p-5">
                <Landmark className="w-6 h-6 sm:w-7 sm:h-7 mb-2 text-brand-lime" />
                <div className="text-xs font-bold uppercase tracking-wider text-brand-lime/80">
                  {language === 'ur' ? 'تیار کنندہ' : 'Developed By'}
                </div>
                <div className="text-sm font-bold mt-1">KP Traffic Police &amp; KPITB</div>
              </div>
              <div className="rounded-2xl bg-brand-blue text-white p-4 sm:p-5">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 mb-2 text-brand-lime" />
                <div className="text-xs font-bold uppercase tracking-wider text-brand-lime/80">
                  {language === 'ur' ? 'کے لیے' : 'Designed For'}
                </div>
                <div className="text-sm font-bold mt-1">
                  {language === 'ur' ? 'خیبر پختونخوا کے شہری' : 'Citizens of Khyber Pakhtunkhwa'}
                </div>
              </div>
              <div className="rounded-2xl bg-brand-blue text-white p-4 sm:p-5">
                <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 mb-2 text-brand-lime" />
                <div className="text-xs font-bold uppercase tracking-wider text-brand-lime/80">
                  {language === 'ur' ? 'دستیاب' : 'Available On'}
                </div>
                <div className="text-sm font-bold mt-1">Android &amp; iOS</div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ============================== KEY FEATURES ============================== */}
      <section id="key-features" className="py-12 sm:py-16 lg:py-20 bg-brand-light-bg">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'اہم خصوصیات' : 'KEY FEATURES'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'رابطہ ایپ کی اہم خصوصیات' : 'Key Features of the Raabta App'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'ایک ہی ایپ میں ٹریفک سے متعلق متعدد ڈیجیٹل سہولیات'
                : 'Multiple traffic-related digital facilities available in a single app.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {keyFeatures.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-brand-light-surface border border-brand-light-border p-5 sm:p-6 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3 sm:mb-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-md shrink-0">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-brand-blue-100 leading-none">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-2">
                    {language === 'ur' ? feature.titleUr : feature.titleEn}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === 'ur' ? feature.descUr : feature.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </PageContainer>
      </section>

      {/* ============================== SCREENSHOTS ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-surface border-y border-brand-light-border">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <Smartphone className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'ایپ کے اسکرین شاٹس' : 'APP SCREENSHOTS'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'رابطہ ایپ کا جائزہ' : 'Raabta App in Action'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'ایپ کے مختلف فیچرز — بڑی تصویر دیکھنے کے لیے کلک کریں'
                : 'Explore the app features — click an image to view it in full size.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {appScreens.map((screen, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(screen)}
                className="group relative rounded-2xl overflow-hidden border border-brand-light-border bg-slate-900 shadow-gov hover:shadow-2xl transition-all duration-300 aspect-[9/16] text-start"
              >
                <img
                  src={screen.src}
                  alt={screen.titleEn}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 z-10 text-white space-y-1">
                  <h3 className="font-bold text-xs sm:text-sm leading-snug group-hover:text-brand-lime transition-colors line-clamp-2">
                    {language === 'ur' ? screen.titleUr : screen.titleEn}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-brand-lime opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3" />
                    <span>{language === 'ur' ? 'بڑی تصویر دیکھیں' : 'View Full Size'}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ============================== BENEFITS ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-bg">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'شہریوں کے لیے فوائد' : 'BENEFITS FOR CITIZENS'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'شہریوں کے لیے فوائد' : 'Benefits for Citizens'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-3 sm:gap-4 rounded-3xl bg-brand-light-surface border border-brand-light-border p-5 sm:p-6 hover:border-brand-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-2xl bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-brand-dark text-sm sm:text-base">
                      {language === 'ur' ? benefit.titleUr : benefit.titleEn}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {language === 'ur' ? benefit.descUr : benefit.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </PageContainer>
      </section>

      {/* ============================== HOW TO GET STARTED ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-surface border-y border-brand-light-border">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'شروع کیسے کریں' : 'HOW TO GET STARTED'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'رابطہ ایپ استعمال کرنے کا طریقہ' : 'Getting Started with the Raabta App'}
            </h2>
          </div>

          <div className="space-y-5 sm:space-y-6 max-w-4xl mx-auto">
            {startSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={idx}
                  className="relative group flex gap-4 sm:gap-6 pb-6 sm:pb-8 last:pb-0"
                >
                  <div className="absolute left-[21px] top-0 bottom-0 w-0.5 bg-brand-light-border" aria-hidden="true">
                    {idx < startSteps.length - 1 && (
                      <div className="absolute top-12 h-full w-full bg-brand-lime/30" />
                    )}
                  </div>

                  <div className="relative flex-shrink-0 w-11 h-11 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold z-10 shadow-lg border-4 border-white">
                    {step.number}
                  </div>

                  <div className="flex-1 min-w-0 bg-white rounded-2xl border border-brand-light-border p-4 sm:p-6 hover:border-brand-blue-300 hover:shadow-lg transition-all duration-300 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-brand-dark pt-1.5">
                        {language === 'ur' ? step.titleUr : step.titleEn}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed sm:pl-12">
                      {language === 'ur' ? step.descUr : step.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </PageContainer>
      </section>

      {/* ============================== DOWNLOAD ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-bg">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'ایپ ڈاؤن لوڈ کریں' : 'DOWNLOAD THE APP'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'رابطہ ایپ ڈاؤن لوڈ کریں' : 'Download the Raabta App'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'رابطہ ایپ کے ذریعے ٹریفک معلومات اور دستیاب ڈیجیٹل ٹریفک سروسز تک رسائی حاصل کریں۔'
                : 'Access traffic information and available digital traffic services through the Raabta App.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {/* Android */}
            <div className="rounded-3xl bg-white border border-brand-light-border p-5 sm:p-8 shadow-gov hover:shadow-xl hover:border-brand-blue-300 transition-all duration-300 flex flex-col">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center mb-4 sm:mb-5 shadow-md">
                <Store className="w-6 h-6 sm:w-7 sm:h-7 text-brand-lime" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-brand-dark">
                {language === 'ur' ? 'اینڈرائیڈ صارفین کے لیے' : 'For Android Users'}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed flex-1">
                {language === 'ur'
                  ? 'گوگل پلے اسٹور سے ایپ ڈاؤن لوڈ کریں۔'
                  : 'Download the app from the Google Play Store.'}
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.nsd.rabta"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-blue hover:bg-brand-blue-600 text-white font-bold text-sm tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'ur' ? 'گوگل پلے اسٹور' : 'Google Play Store'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* iOS */}
            <div className="rounded-3xl bg-white border border-brand-light-border p-5 sm:p-8 shadow-gov hover:shadow-xl hover:border-brand-blue-300 transition-all duration-300 flex flex-col">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center mb-4 sm:mb-5 shadow-md">
                <Apple className="w-6 h-6 sm:w-7 sm:h-7 text-brand-lime" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-brand-dark">
                {language === 'ur' ? 'آئی فون اور آئی پیڈ صارفین کے لیے' : 'For iPhone & iPad Users'}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed flex-1">
                {language === 'ur'
                  ? 'ایپل ایپ اسٹور سے ایپ ڈاؤن لوڈ کریں۔'
                  : 'Download the app from the Apple App Store.'}
              </p>
              <a
                href="https://apps.apple.com/pk/app/raabta-kp-traffic/id6744581208"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-dark hover:bg-brand-dark-elevated text-white font-bold text-sm tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'ur' ? 'ایپل ایپ اسٹور' : 'Apple App Store'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-8">
            <div className="rounded-2xl bg-yellow-50 border border-yellow-200 p-5 sm:p-6 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-700 shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800 leading-relaxed">
                {language === 'ur'
                  ? 'ہمیشہ ایپلیکیشن سرکاری اسٹور سے ڈاؤن لوڈ کریں اور انسٹالیشن سے پہلے ایپ کا نام تصدیق کریں۔'
                  : 'Always download the application from the official store and verify the app name before installation.'}
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ============================== CLOSING CTA ============================== */}
      <section className="relative bg-[#000080] text-white py-14 sm:py-20 lg:py-24 border-t border-[#0000aa] overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 sm:w-96 sm:h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-96 sm:h-96 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-extrabold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'ur' ? 'محفوظ سفر' : 'SAFE TRAVEL'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'ur' ? (
                <>
                  ذمہ دارانہ ڈرائیو کریں، <span className="text-brand-lime block sm:inline">باخبر رہیں، محفوظ سفر کریں</span>
                </>
              ) : (
                <>
                  Drive Responsibly. Stay Informed.{' '}
                  <span className="text-brand-lime block sm:inline">Travel Safely.</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto font-normal">
              {language === 'ur'
                ? 'خیبر پختونخوا ٹریفک پولیس تمام سڑک استعمال کرنے والوں کی حوصلہ افزائی کرتی ہے کہ وہ ٹریفک قواعد کی پابندی کریں، محفوظ ڈرائیونگ کریں اور باخبر رہنے کے لیے دستیاب ڈیجیٹل وسائل استعمال کریں۔'
                : 'Khyber Pakhtunkhwa Traffic Police encourages all road users to follow traffic regulations, practise safe driving, and use available digital resources to stay informed.'}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 pt-2 sm:pt-4 w-full">
              <a
                href="https://play.google.com/store/apps/details?id=com.nsd.rabta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-brand-lime hover:bg-brand-lime-hover text-brand-dark font-extrabold text-sm tracking-wide shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Download className="w-5 h-5 shrink-0" />
                <span>{language === 'ur' ? 'رابطہ ایپ ڈاؤن لوڈ کریں' : 'Download Raabta App'}</span>
                <ArrowBack className="w-5 h-5 shrink-0" />
              </a>
              <Link
                to="/services/driving-license"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm tracking-wide transition-all duration-200"
              >
                <IdCard className="w-5 h-5 shrink-0" />
                <span>{language === 'ur' ? 'ڈرائیونگ لائسنس سروسز' : 'Driving License Services'}</span>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================== CONTACT / RAABTA =========================== */}
      <section className="py-14 sm:py-20 bg-brand-light-bg border-t border-brand-light-border">
        <PageContainer>
          <ContactSection />
        </PageContainer>
      </section>

      {/* ============================== LIGHTBOX ============================== */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] sm:max-h-[65vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.titleEn}
                className="w-full h-auto max-h-[60vh] sm:max-h-[65vh] object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 text-white bg-slate-900 space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {language === 'ur' ? selectedImage.titleUr : selectedImage.titleEn}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {language === 'ur' ? selectedImage.descUr : selectedImage.descEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaabtaApp;
