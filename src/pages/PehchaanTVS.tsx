import React, { useState, useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { useLanguage } from '../hooks/useLanguage';
import {
  Smartphone,
  ShieldCheck,
  BadgeCheck,
  Search,
  FileText,
  Clock,
  Calendar,
  Users,
  Award,
  Maximize2,
  X,
  ArrowRight,
} from 'lucide-react';

const galleryImages = [
  {
    src: '/pahchaan-tvs/pahchaan-tvs-02.jpg',
    titleEn: 'Pehchaan TVS Inauguration Ceremony',
    titleUr: 'پہچان ٹی وی ایس افتتاح تقریب',
    descEn: 'Official inauguration of Pehchaan Taxi Verification System at Abbottabad Police Lines.',
    descUr: 'ایبٹ آباد پولیس لائنز میں پہچان ٹیکسی تصدیق نظام کی سرکاری افتتاح۔',
  },
  {
    src: '/pahchaan-tvs/pahchaan-tvs-01.jpg',
    titleEn: 'Pehchaan TVS Main Interface',
    titleUr: 'پہچان ٹی وی ایس مرکزی انٹرفیس',
    descEn: 'Main dashboard of the Taxi Verification System within Pehchaan app.',
    descUr: 'پہچان ایپ کے اندر ٹیکسی تصدیق نظام کا مرکزی ڈیش بورڈ۔',
  },
  {
    src: '/pahchaan-tvs/pahchaan-tvs-03.jpg',
    titleEn: 'DPO Haroon Rasheed Khan at Inauguration',
    titleUr: 'ڈی پی او ہارون رشید خان افتتاحی تقریب میں',
    descEn: 'District Police Officer unveiling the Pehchaan TVS plaque.',
    descUr: 'ضلع پولیس افسر پہچان ٹی وی ایس کی پلاک کا انکشاف کرتے ہوئے۔',
  },
];

const steps = [
  {
    number: '1',
    titleEn: 'Open Pehchaan App',
    titleUr: 'پہچان ایپ کھولیں',
    descEn: 'Sign in with your registered account on the Pehchaan mobile application.',
    descUr: 'پہچان موبائل ایپلیکیشن پر اپنے رجسٹرڈ اکاؤنٹ سے سائن ان کریں۔',
  },
  {
    number: '2',
    titleEn: 'Navigate to TVS',
    titleUr: 'TVS پر جائیں',
    descEn: 'Go to the TVS section from the main services menu inside the app.',
    descUr: 'ایپ کے اندر مین سروسز مینو سے TVS سیکشن پر جائیں۔',
  },
  {
    number: '3',
    titleEn: 'Search & Verify',
    titleUr: 'تلاش اور تصدیق کریں',
    descEn: 'Search by vehicle registration number or driver CNIC to verify credentials.',
    descUr: 'گاڑی کی رجسٹریشن نمبر یا ڈرائیور کے سی این آئی سی سے تلاش کر کے تصدیق کریں۔',
  },
  {
    number: '4',
    titleEn: 'Register Vehicle',
    titleUr: 'گاڑی رجسٹر کریں',
    descEn: 'For taxi owners: complete the vehicle registration form with required documents.',
    descUr: 'ٹیکسی مالکین کے لیے: ضروری دستاویزات کے ساتھ گاڑی کی رجسٹریشن فارم مکمل کریں۔',
  },
  {
    number: '5',
    titleEn: 'Track Status',
    titleUr: 'استیٹس درج کریں',
    descEn: 'Submit your request and track status updates directly inside the app.',
    descUr: 'اپنی درخواست جمع کرائیں اور ایپ کے اندر براہ راست استیٹس اپڈیٹس ٹریک کریں۔',
  },
];

const features = [
  {
    icon: BadgeCheck,
    titleEn: 'Vehicle Registration',
    titleUr: 'گاڑی کی رجسٹریشن',
    descEn: 'Registers taxis and ride-hailing vehicles with verified owner details.',
    descUr: 'ٹیکسی اور رائیڈ ہیلنگ گاڑیوں کو تصدیق شدہ مالک کی تفصیلات کے ساتھ رجسٹر کرتا ہے۔',
  },
  {
    icon: Search,
    titleEn: 'Instant Verification',
    titleUr: 'فوری تصدیق',
    descEn: 'Allows citizens to instantly verify a driver\'s credentials before boarding.',
    descUr: 'شہریوں کو سواری پر چڑھنے سے پہلے ڈرائیور کی صلاحیتوں کو فوری طور پر تصدیق کرنے کی اجازت دیتا ہے۔',
  },
  {
    icon: ShieldCheck,
    titleEn: 'Police Dashboard',
    titleUr: 'پولیس ڈیش بورڈ',
    descEn: 'Provides police a centralised dashboard for rapid field verification.',
    descUr: 'پولیس کو فوری فیلڈ تصدیق کے لیے مرکزی ڈیش بورڈ فراہم کرتا ہے۔',
  },
  {
    icon: FileText,
    titleEn: 'Complaint Integration',
    titleUr: 'شکوہات کے ساتھ یکجہتی',
    descEn: 'Links vehicle records to the broader Pehchaan complaint ecosystem.',
    descUr: 'گاڑی کے ریکارڈ کو وسیع پہچان شکوہات کے ماحول سے جوڑتا ہے۔',
  },
  {
    icon: Users,
    titleEn: 'Reduces Illegal Operations',
    titleUr: 'غیر قانونی آپریشنز میں کمی',
    descEn: 'Reduces the risk of illegal or unregistered transport operations.',
    descUr: 'غیر قانونی یا غیر رجسٹرڈ ٹرانسپورٹ آپریشنز کے خطرے کو کم کرتا ہے۔',
  },
  {
    icon: Clock,
    titleEn: '24/7 Monitoring',
    titleUr: '24/7 نگرانی',
    descEn: 'Round-the-clock monitoring of registered vehicles for enhanced public safety.',
    descUr: 'رجسٹرڈ گاڑیوں کی گھڑیوں بھر نگرانی عوامی حفاظت کے لیے۔',
  },
];

export const PehchaanTVS: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[number] | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'پہچان ٹی وی ایس | ٹریفک وارڈن ایبٹ آباد'
        : 'Pehchaan TVS | Traffic Warden Abbottabad';
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

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#000090] via-[#000077] to-[#000055] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pahchaan-tvs/pahchaan-tvs-02.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000090] via-[#000090]/60 to-transparent" />

        <PageContainer className="relative z-10 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-extrabold uppercase tracking-widest">
              <Smartphone className="w-4 h-4" />
              <span>{language === 'ur' ? 'ڈجٹل اقدامات' : 'DIGITAL INITIATIVES'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {language === 'ur' ? (
                <>
                  پہچان ٹی وی ایس —{' '}
                  <span className="text-brand-lime">ٹیکسی تصدیق نظام</span>
                </>
              ) : (
                <>
                  PEHCHAAN TVS —{' '}
                  <span className="text-brand-lime">TAXI VERIFICATION SYSTEM</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-3xl mx-auto">
              {language === 'ur'
                ? 'ڈیجیٹل پلیٹ فارم جس نے ٹیکسی اور رائیڈ ہیلنگ سروسز کی تصدیق کو آساں بنایا۔'
                : 'Digital platform streamlining taxi and ride-hailing verification for citizens and law enforcement.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <Calendar className="w-4 h-4 text-brand-lime" />
                <span>14 April 2026</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <Award className="w-4 h-4 text-brand-lime" />
                <span>Inaugurated by DPO Haroon Rasheed Khan</span>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Inauguration Details Section */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'افتتاحی تفصیلات' : 'INAUGURATION DETAILS'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur'
                ? 'سرکاری افتتاح ضلع پولیس افسر ہارون رشید خان کی جانب سے'
                : 'Officially Inaugurated by DPO Haroon Rasheed Khan'}
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                {language === 'ur'
                  ? '14 اپریل 2026 کو، پہچان ٹیکسی تصدیق نظام (TVS) کا ایبٹ آباد پولیس لائنز میں ایک یقومной تقریب میں سرکاری افتتاح کیا گیا۔ پلاک کا انکشاف ڈی پی او ہارون رشید خان، ضلع پولیس افسر ایبٹ آباد، کے ساتھ ساتھ محمد اشتیاق، ایس ایس پی ٹریفک وارڈن ہزارہ علاقہ، ایبٹ آباد نے مل کر کیا۔ یہ تقریب ہزارہ ڈویزن میں پلیسنگ کی ڈیجیٹل تبدیلی کی سمت میں ایک تاریخی قدم تھی — جس نے پہچان کی صلاحیتوں کو موبائل ڈیوائس ٹریکنگ سے آگے بڑھایا تاکہ اب ٹیکسی اور رائیڈ ہیلنگ سروسز کی تصدیق اور رجسٹریشن ضلع بھر میں شامل ہو سکیں۔'
                  : 'On 14 April 2026, the Pehchaan Taxi Verification System (TVS) was officially inaugurated at Abbottabad Police Lines in a landmark ceremony. The honour of unveiling the plaque was performed by DPO Haroon Rasheed Khan, District Police Officer Abbottabad, alongside Mr. Mohammad Ishtiaq, SSP Traffic Warden Hazara Region, Abbottabad. The event marked a historic step in the digital transformation of policing in the Hazara Division — extending Pehchaan\'s capabilities beyond mobile device tracking to now encompass the verification and registration of taxi and ride-hailing services across the district.'}
              </p>
            </div>

            {/* Inauguration Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="rounded-2xl bg-brand-blue text-white p-5 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-brand-lime" />
                <div className="text-xs font-bold uppercase tracking-wider text-brand-lime/80">
                  {language === 'ur' ? 'تاریخ' : 'Date'}
                </div>
                <div className="text-lg font-bold mt-1">14 April 2026</div>
              </div>
              <div className="rounded-2xl bg-brand-blue text-white p-5 text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-brand-lime" />
                <div className="text-xs font-bold uppercase tracking-wider text-brand-lime/80">
                  {language === 'ur' ? 'افتتاح کیا' : 'Inaugurated By'}
                </div>
                <div className="text-lg font-bold mt-1">DPO Haroon Rasheed Khan</div>
              </div>
              <div className="rounded-2xl bg-brand-blue text-white p-5 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-brand-lime" />
                <div className="text-xs font-bold uppercase tracking-wider text-brand-lime/80">
                  {language === 'ur' ? 'بھی موجود تھے' : 'Also Present'}
                </div>
                <div className="text-sm font-medium mt-1">SSP Traffic Warden Hazara Region & Senior Officers</div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* What is TVS Section */}
      <section className="py-16 sm:py-20 bg-brand-light-bg">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'TVS کیا ہے؟' : 'WHAT IS TVS?'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'ٹیکسی تصدیق نظام (TVS) کا تعارف' : 'What is the Taxi Verification System?'}
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto text-slate-700 text-sm sm:text-base leading-relaxed mb-10">
            <p>
              {language === 'ur'
                ? 'ٹیکسی تصدیق نظام (TVS) پہچان پلیٹ فارم کا ایک ڈیجیٹل ماڈیول ہے جسے ایبٹ آباد ضلع میں آپریٹ ہونے والی ٹیکسیوں اور رائیڈ ہیلنگ گاڑیوں کو رجسٹر، تصدیق اور نگرانی کرنے کے لیے ڈیزائن کیا گیا ہے۔ یہ شہریوں کو ڈرائیور اور گاڑی کی صلاحیتوں تک براہ راست رسائی فراہم کرتا ہے، جبکہ قانون نافذ کرنے والے اداروں کو فوری چیکنگ کے لیے ایک مرکزی ڈیٹا بیس فراہم کرتا ہے۔'
                : 'The Taxi Verification System (TVS) is a digital module within the Pehchaan platform designed to register, verify, and monitor taxis and ride-hailing vehicles operating in Abbottabad district. It gives citizens real-time access to driver and vehicle credentials, while equipping law enforcement with a centralised database for rapid checks.'}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-brand-light-surface border border-brand-light-border p-6 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-md mb-4">
                    <IconComponent className="w-6 h-6 text-brand-lime" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">
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

      {/* Image Gallery Section */}
      <section className="py-16 sm:py-20 bg-brand-light-surface border-t border-brand-light-border">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'تصویری جھلکیاں' : 'GALLERY'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'پہچان ٹی وی ایس — تصاویر' : 'Pehchaan TVS — In Pictures'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'افتتاحی تقریب اور سسٹم کی تصاویر'
                : 'Photos from the inauguration ceremony and system interface.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-brand-light-border shadow-gov-md hover:shadow-2xl cursor-pointer transition-all duration-300 aspect-[4/3]"
              >
                <img
                  src={img.src}
                  alt={img.titleEn}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
                  <h3 className="font-bold text-sm sm:text-base leading-snug group-hover:text-brand-lime transition-colors">
                    {language === 'ur' ? img.titleUr : img.titleEn}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2">
                    {language === 'ur' ? img.descUr : img.descEn}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-brand-lime opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{language === 'ur' ? 'بڑی تصویر دیکھیں' : 'Click to View Full Size'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-black">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.titleEn}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>

                <div className="p-6 text-white bg-slate-900 space-y-2">
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
        </PageContainer>
      </section>

      {/* How to Use TVS Section */}
      <section className="py-16 sm:py-20 bg-brand-light-bg">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'TVS کو کیسے استعمال کریں' : 'HOW TO USE TVS'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'پہچان ٹی وی ایس استعمال کرنے کا طریقہ' : 'Step-by-Step Guide to Using TVS'}
            </h2>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row gap-6 rounded-3xl bg-brand-light-surface border border-brand-light-border p-6 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-blue text-white font-extrabold text-2xl shadow-md">
                  {step.number}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-brand-dark">
                    {language === 'ur' ? step.titleUr : step.titleEn}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === 'ur' ? step.descUr : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Closing CTA Section */}
      <section className="relative bg-[#000080] text-white py-16 sm:py-24 border-t border-[#0000aa] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-lime/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <PageContainer className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-extrabold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-brand-lime" />
              <span>{language === 'ur' ? 'محفوظ سفر' : 'SAFE TRAVEL'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'ur' ? (
                <>
                  پہچان ٹی وی ایس سے{' '}
                  <span className="text-brand-lime block sm:inline">محفوظ سواری</span>
                </>
              ) : (
                <>
                  Verify Your Ride With{' '}
                  <span className="text-brand-lime block sm:inline">Pehchaan TVS</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto font-normal">
              {language === 'ur'
                ? 'اپنی اگلی سواری سے پہلے ڈرائیور اور گاڑی کی تصدیق کریں۔ آپ کی حفاظت ہمارا عہد ہے۔'
                : 'Verify your driver and vehicle before every ride. Your safety is our commitment.'}
            </p>

            <div className="pt-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.comsats.edevice&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-lime hover:bg-brand-lime-hover text-brand-dark font-extrabold text-sm tracking-wide shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Smartphone className="w-5 h-5 text-brand-dark" />
                <span>{language === 'ur' ? 'پہچان ایپ ڈاؤن لوڈ کریں' : 'Download Pehchaan App'}</span>
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </a>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default PehchaanTVS;