import React, { useState, useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { useLanguage } from '../hooks/useLanguage';
import {
  Monitor,
  Cctv,
  Clock,
  Zap,
  Maximize2,
  X,
} from 'lucide-react';

const galleryImages = [
  {
    src: '/command-control/command-control-01.jpg',
    titleEn: 'Command & Control Room — Overview',
    titleUr: 'کمانڈ اینڈ کنٹرول روم — جائزہ',
    descEn: 'Centralized hub for real-time traffic monitoring across District Abbottabad.',
    descUr: 'ضلع ایبٹ آباد بھر میں ٹریفک کی براہ راست نگرانی کا مرکزی مرکز۔',
  },
  {
    src: '/command-control/command-control-02.jpg',
    titleEn: 'CCTV Surveillance System',
    titleUr: 'سی سی ٹی وی نگرانی نظام',
    descEn: 'Live CCTV feeds from 18 key locations displayed on the monitoring wall.',
    descUr: '18 اہم مقامات سے حاصل کی گئی سی سی ٹی وی فیڈز مانیٹرنگ وال پر منظرِ عام۔',
  },
  {
    src: '/command-control/command-control-03.jpg',
    titleEn: 'Shaheen Squad Coordination',
    titleUr: 'شاہین اسکوڈ کا رابطہ',
    descEn: 'Real-time dispatch and coordination of the Shaheen Squad for rapid response.',
    descUr: 'فوری رسپانس کے لیے شاہین اسکوڈ کی براہ راست ترسیل اور رابطہ۔',
  },
  {
    src: '/command-control/command-control-04.jpg',
    titleEn: 'Dedicated Monitoring Team',
    titleUr: 'اختصاصی نگرانی ٹیم',
    descEn: 'Trained staff operating the Command & Control Room 24 hours a day, seven days a week.',
    descUr: 'تربیت یافتہ اسٹاف جو 24 گھنٹے سات دن کمانڈ اینڈ کنٹرول روم چلاتا ہے۔',
  },
];

export const CommandControlRoom: React.FC = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[number] | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'کمانڈ اینڈ کنٹرول روم | ٹریفک وارڈن ایبٹ آباد'
        : 'Command & Control Room | Traffic Warden Abbottabad';
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

  const features = [
    {
      icon: Cctv,
      titleEn: 'CCTV-Based Traffic Monitoring',
      titleUr: 'سی سی ٹی وی مبنی ٹریفک نگرانی',
      descEn:
        'CCTV cameras have been installed at 18 important locations to support traffic surveillance and help identify congestion, traffic violations, and potential disruptions. This monitoring system enables the team to maintain better awareness of road conditions and respond more effectively to emerging traffic situations.',
      descUr:
        '18 اہم مقامات پر سی سی ٹی وی کیمرے لگائے گئے ہیں تاکہ ٹریفک کی نگرانی میں مدد ملے اور جام، ٹریفک خلاف ورزیوں اور ممکنہ رکاوٹوں کی نشاندہی کی جا سکے۔ یہ نگرانی نظام ٹیم کو سڑکوں کی صورتحال کے بہتر علم فراہم کرتا ہے اور نئی ٹریفک صورتحال کے مؤثر جواب میں مدد کرتا ہے۔',
    },
    {
      icon: Clock,
      titleEn: '24/7 Monitoring and Coordination',
      titleUr: '24/7 نگرانی اور رابطہ',
      descEn:
        'A dedicated team remains on duty at the Command & Control Room 24 hours a day, seven days a week. The staff monitors traffic conditions, observes developing situations, and coordinates with field personnel to support timely action and improve traffic management across the district.',
      descUr:
        'ایک اختصاصی ٹیم کمانڈ اینڈ کنٹرول روم میں 24 گھنٹے سات دن فرض پر رہتی ہے۔ اسٹاف ٹریفک کی صورتحال کی نگرانی کرتا ہے، بننے والے حالات پر نظر رکھتا ہے اور ضلع بھر میں ٹریفک مینجمنٹ بہتر بنانے کے لیے فیلڈ اہلکاروں کے ساتھ رابطہ کرتا ہے۔',
    },
    {
      icon: Zap,
      titleEn: 'Rapid Response Through Shaheen Squad',
      titleUr: 'شاہین اسکوڈ کے ذریعے فوری رسپانس',
      descEn:
        'The Shaheen Squad is dispatched promptly to locations experiencing traffic congestion or other traffic-related difficulties. The squad assists field staff in managing traffic, addressing road disruptions, and restoring the smooth flow of vehicles. This rapid-response approach helps improve coordination, reduce delays, and provide better assistance to road users.',
      descUr:
        'شاہین اسکوڈ کو جن مقامات پر ٹریفک جام یا دیگر ٹریفک سے متعلق مشکلات کا سامنا ہے ان پر فوری طور پر بھیجا جاتا ہے۔ یہ اسکوڈ فیلڈ اسٹاف کی ٹریفک منظم کرنے، سڑکوں پر رکاوٹوں کے حل اور گاڑیوں کی روانی بحال کرنے میں مدد کرتا ہے۔ یہ فوری رسپانس طریقہ کار رابطے کو بہتر بناتا ہے، تاخیر کم کرتا ہے اور سڑک استعمال کرنے والوں کو بہتر مدد فراہم کرتا ہے۔',
    },
  ];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#000090] via-[#000077] to-[#000055] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/command-control/command-control-01.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000090] via-[#000090]/60 to-transparent" />

        <PageContainer className="relative z-10 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-extrabold uppercase tracking-widest">
              <Monitor className="w-4 h-4" />
              <span>{language === 'ur' ? 'خصوصی اقدامات' : 'INITIATIVES'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {language === 'ur' ? (
                <>
                  کمانڈ اینڈ{' '}
                  <span className="text-brand-lime">کنٹرول روم</span>
                </>
              ) : (
                <>
                  TRAFFIC COMMAND &{' '}
                  <span className="text-brand-lime">CONTROL ROOM</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-3xl mx-auto">
              {language === 'ur'
                ? 'ٹریفک کی نگرانی کو مضبوط کرنے، روڈ مینجمنٹ بہتر بنانے اور ایبٹ آباد بھر میں زیادہ محفوظ اور ہموار ٹریفک کے بہاؤ کو یقینی بنانے کے لیے کمانڈ اینڈ کنٹرول روم قائم کیا گیا ہے۔'
                : 'The Traffic Command & Control Room has been established to strengthen traffic monitoring, improve road management, and ensure a safer and smoother traffic flow across Abbottabad.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <Cctv className="w-4 h-4 text-brand-lime" />
                <span>18 CCTV Locations</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <Clock className="w-4 h-4 text-brand-lime" />
                <span>24/7 Monitoring</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <Zap className="w-4 h-4 text-brand-lime" />
                <span>{language === 'ur' ? 'شاہین اسکوڈ' : 'Shaheen Squad'}</span>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Introduction Section */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'تعارف' : 'OVERVIEW'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur'
                ? 'جدید ٹریفک مینجمنٹ کی طرف ایک اہم قدم'
                : 'An Important Step Towards Modern Traffic Management'}
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                {language === 'ur'
                  ? 'ٹریفک کمانڈ اینڈ کنٹرول روم کا افتتاح معزز ریجنل پولیس آفیسر ہزارہ نے مارچ 2026 میں کیا۔ یہ ٹیکنالوجی اور منظم فیلڈ آپریشنز کے ذریعے ٹریفک مینجمنٹ کو جدید بنانے کی سمت میں ایک اہم قدم ہے۔'
                  : 'The facility was inaugurated by the Worthy Regional Police Officer, Hazara, in March 2026, marking an important step towards modernizing traffic management through technology and coordinated field operations.'}
              </p>
            </div>
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
              {language === 'ur' ? 'کمانڈ اینڈ کنٹرول روم — تصاویر' : 'Command & Control Room — In Pictures'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'کمانڈ اینڈ کنٹرول روم کے اندر سے تصاویر'
                : 'A look inside the Command & Control Room facility.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
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

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-brand-light-bg">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'بنیادی خصوصیات' : 'KEY FEATURES'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'کمانڈ اینڈ کنٹرول روم کی صلاحیتیں' : 'Command & Control Room Capabilities'}
            </h2>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-brand-light-surface border border-brand-light-border p-7 sm:p-9 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-md">
                        <IconComponent className="w-7 h-7 text-brand-lime" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold text-brand-dark">
                        {language === 'ur' ? feature.titleUr : feature.titleEn}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {language === 'ur' ? feature.descUr : feature.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default CommandControlRoom;
