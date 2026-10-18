import React, { useState, useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { useLanguage } from '../hooks/useLanguage';
import {
  HardHat,
  Bike,
  ShieldCheck,
  Eye,
  HeartHandshake,
  Users,
  Maximize2,
  X,
} from 'lucide-react';

const galleryImages = [
  {
    src: '/free-helmet/free-helmet-01.jpg',
    titleEn: 'Free Helmet Distribution Ceremony',
    titleUr: 'مفت ہیلمیٹ تقسیم کی تقریب',
    descEn: 'Traffic Wardens distributing free safety helmets to motorcyclists in Abbottabad.',
    descUr: 'ٹریفک وارڈنز ایبٹ آباد میں موٹرسائیکل سواروں کو مفت حفاظتی ہیلمیٹ تقسیم کرتے ہوئے۔',
  },
  {
    src: '/free-helmet/free-helmet-02.jpg',
    titleEn: 'Road Safety Awareness Drive',
    titleUr: 'روڈ سیفٹی آگاہی مہم',
    descEn: 'Promoting the use of helmets and side mirrors to prevent road accidents and save lives.',
    descUr: 'سڑکی حادثات کو روکنے اور جانوں کے تحفظ کے لیے ہیلمیٹ اور سائیڈ مرر کے استعمال کو فروغ دیتے ہوئے۔',
  },
];

const features = [
  {
    icon: HardHat,
    titleEn: 'Free Safety Helmets',
    titleUr: 'مفت حفاظتی ہیلمیٹ',
    descEn:
      'Certified safety helmets are distributed free of cost to motorcyclists, particularly those who cannot afford proper protective gear. A helmet is the single most effective protection against head injuries in a motorcycle accident, and this initiative helps ensure that no rider is left without this basic safety equipment.',
    descUr:
      'تصدیق شدہ حفاظتی ہیلمیٹ موٹرسائیکل سواروں کو مفت فراہم کیے جاتے ہیں، خاص طور پر ان کو جو مناسب حفاظتی سامان خریدنے کی استطاعت نہیں رکھتے۔ ہیلمیٹ موٹرسائیکل حادثے میں سر کی چوٹ سے بچاؤ کا سب سے مؤثر ذریعہ ہے، اور یہ اقدام اس بات کو یقینی بناتا ہے کہ کوئی سوار اس بنیادی حفاظتی سامان سے محروم نہ رہے۔',
  },
  {
    icon: Bike,
    titleEn: 'Free Side Mirrors',
    titleUr: 'مفت سائیڈ مرر',
    descEn:
      'Side mirrors are provided to riders whose motorcycles lack proper rear-view mirrors. Mirrors are essential for observing traffic behind and beside the vehicle, allowing riders to change lanes, overtake, and turn safely. By supplying side mirrors, the initiative directly helps reduce blind-spot accidents and improves overall road discipline.',
    descUr:
      'ایسے سواروں کو سائیڈ مرر فراہم کیے جاتے ہیں جن کی موٹرسائیکلوں میں مناسب پیچھے دیکھنے والے آئینے نہیں ہوتے۔ آئینے گاڑی کے پیچھے اور پہلو کی ٹریفک دیکھنے کے لیے ضروری ہیں، جس سے سوار محفوظ طریقے سے لین تبدیل کر سکتے ہیں، اوور ٹیک کر سکتے ہیں اور مڑ سکتے ہیں۔ سائیڈ مرر فراہم کر کے یہ اقدام براہ راست بلائنڈ اسپاٹ حادثات کو کم کرنے اور مجموعی روڈ ڈسپلن بہتر بنانے میں مدد کرتا ہے۔',
  },
  {
    icon: ShieldCheck,
    titleEn: 'Accident Prevention',
    titleUr: 'حادثات کی روک تھام',
    descEn:
      'Motorcyclists are among the most vulnerable road users, and head injuries are the leading cause of death in two-wheeler accidents. By encouraging the consistent use of helmets and mirrors, this initiative aims to reduce the number and severity of road accidents, protect precious lives, and lessen the burden on emergency and medical services across the district.',
    descUr:
      'موٹرسائیکل سوار سڑک استعمال کرنے والوں میں سب سے زیادہ خطرے سے دوچار ہوتے ہیں، اور دو پہیہ گاڑیوں کے حادثات میں سر کی چوٹ موت کی سب سے بڑی وجہ ہے۔ ہیلمیٹ اور آئینوں کے مسلسل استعمال کی حوصلہ افزائی کے ذریعے یہ اقدام ضلع بھر میں سڑکی حادثات کی تعداد اور شدت کم کرنے، قیمتی جانوں کے تحفظ اور ایمرجنسی و طبی خدمات پر بوجھ کم کرنے کا ہدف رکھتا ہے۔',
  },
  {
    icon: Users,
    titleEn: 'Awareness & Community Engagement',
    titleUr: 'آگاہی اور عوامی شرکت',
    descEn:
      'Along with distribution, the drive includes road-safety awareness sessions for riders, students, and commercial motorcyclists. Traffic Wardens explain the correct way to wear a helmet, the importance of adjusting mirrors, and the wider benefits of responsible riding. Community engagement helps build lasting habits and encourages a culture of safety on the roads of Abbottabad.',
    descUr:
      'تقسیم کے ساتھ ساتھ اس مہم میں سواروں، طلبہ اور تجارتی موٹرسائیکل سواروں کے لیے روڈ سیفٹی آگاہی سیشنز شامل ہیں۔ ٹریفک وارڈنز ہیلمیٹ پہننے کا درست طریقہ، آئینے درست کرنے کی اہمیت اور ذمہ دارانہ سواری کے وسیع فوائد بیان کرتے ہیں۔ عوامی شرکت پائیدار عادات بنانے اور ایبٹ آباد کی سڑکوں پر حفاظت کی ثقافت کو فروغ دینے میں مدد کرتی ہے۔',
  },
  {
    icon: Eye,
    titleEn: 'Improved Visibility & Discipline',
    titleUr: 'بہتر نظر اور نظم و ضبط',
    descEn:
      'Proper mirrors significantly improve a rider\'s field of vision and awareness of surrounding traffic, which is a core part of disciplined riding. This initiative supports lane discipline, safer overtaking, and better compliance with traffic rules, contributing to smoother and more orderly traffic movement throughout the district.',
    descUr:
      'مناسب آئینے سوار کے میدانِ نظر اور ارد گرد کی ٹریفک کے علم کو نمایاں طور پر بہتر بناتے ہیں، جو منظم سواری کا بنیادی حصہ ہے۔ یہ اقدام لین ڈسپلن، محفوظ اوور ٹیکنگ اور ٹریفک قوانین کی بہتر پاسداری میں مدد کرتا ہے، جس سے ضلع بھر میں ٹریفک کی روانی ہموار اور منظم ہوتی ہے۔',
  },
  {
    icon: HeartHandshake,
    titleEn: 'Citizen-Friendly Policing',
    titleUr: 'عوام دوست پولیسنگ',
    descEn:
      'The Free Helmet & Side Mirror Distribution initiative reflects the citizen-friendly and welfare-oriented approach of the Abbottabad Traffic Police. Rather than relying on enforcement alone, the department works to support and facilitate road users, especially the most vulnerable, and to build trust between the police and the public.',
    descUr:
      'مفت ہیلمیٹ اور سائیڈ مرر کی تقسیم کا اقدام ایبٹ آباد ٹریفک پولیس کے عوام دوست اور فلاحی نقطہ نظر کا عکاس ہے۔ محض نفاذ پر انحصار کرنے کے بجائے محکمہ سڑک استعمال کرنے والوں کی مدد اور سہولت فراہم کرتا ہے، خاص طور پر سب سے زیادہ خطرے سے دوچار افراد کی، اور پولیس اور عوام کے درمیان اعتماد قائم کرتا ہے۔',
  },
];

export const FreeHelmetDistribution: React.FC = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[number] | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'مفت ہیلمیٹ اور سائیڈ مرر تقسیم | ٹریفک وارڈن ایبٹ آباد'
        : 'Free Helmet & Side Mirror Distribution | Traffic Warden Abbottabad';
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
        <div className="absolute inset-0 bg-[url('/free-helmet/free-helmet-01.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000090] via-[#000090]/60 to-transparent" />

        <PageContainer className="relative z-10 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-extrabold uppercase tracking-widest">
              <HardHat className="w-4 h-4" />
              <span>{language === 'ur' ? 'خصوصی اقدامات' : 'INITIATIVES'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {language === 'ur' ? (
                <>
                  مفت ہیلمیٹ اور{' '}
                  <span className="text-brand-lime">سائیڈ مرر تقسیم</span>
                </>
              ) : (
                <>
                  FREE HELMET &{' '}
                  <span className="text-brand-lime">SIDE MIRROR DISTRIBUTION</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-3xl mx-auto">
              {language === 'ur'
                ? 'ایبٹ آباد ٹریفک پولیس نے سڑکی حادثات کو کم کرنے اور موٹرسائیکل سواروں کی حفاظت کے لیے مفت ہیلمیٹ اور سائیڈ مرر تقسیم کرنے کی مہم کا آغاز کیا ہے۔'
                : 'Abbottabad Traffic Police has launched a free helmet and side mirror distribution drive to reduce road accidents and protect motorcyclists across the district.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <HardHat className="w-4 h-4 text-brand-lime" />
                <span>{language === 'ur' ? 'مفت ہیلمیٹ' : 'Free Helmets'}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <Bike className="w-4 h-4 text-brand-lime" />
                <span>{language === 'ur' ? 'سائیڈ مرر' : 'Side Mirrors'}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-brand-lime" />
                <span>{language === 'ur' ? 'روڈ سیفٹی' : 'Road Safety'}</span>
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
                ? 'موٹرسائیکل سواروں کی حفاظت کے لیے ایک فلاحی اقدام'
                : 'A Welfare Initiative for the Safety of Motorcyclists'}
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                {language === 'ur'
                  ? 'موٹرسائیکل سوار سڑک استعمال کرنے والوں میں سب سے زیادہ خطرے سے دوچار طبقہ ہیں۔ سر کی چوٹ اور مناسب نظر کی کمی اکثر سنگین حادثات کا باعث بنتی ہے۔ اس صورتحال کو مدنظر رکھتے ہوئے ٹریفک وارڈن ایبٹ آباد نے مفت ہیلمیٹ اور سائیڈ مرر تقسیم کرنے کی مہم شروع کی ہے تاکہ ہر سوار کو بنیادی حفاظتی سامان میسر ہو۔'
                  : 'Motorcyclists are among the most vulnerable road users, and head injuries along with poor visibility frequently lead to serious accidents. Keeping this in view, Traffic Warden Abbottabad has launched a free helmet and side mirror distribution drive so that every rider has access to basic protective equipment.'}
              </p>
              <p>
                {language === 'ur'
                  ? 'یہ مہم محکمہ کے عوام دوست اور فلاحی نقطہ نظر کا مظہر ہے، جس کا مقصد صرف خلاف ورزیوں پر کارروائی نہیں بلکہ سڑک استعمال کرنے والوں کی حفاظت اور مدد ہے۔'
                  : 'This drive reflects the citizen-friendly and welfare-oriented approach of the department, whose aim is not only to act against violations but also to protect and support road users.'}
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
              {language === 'ur'
                ? 'مفت ہیلمیٹ اور سائیڈ مرر تقسیم — تصاویر'
                : 'Free Helmet & Side Mirror Distribution — In Pictures'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'تقسیم اور آگاہی مہم کی جھلکیاں'
                : 'Glimpses from the distribution and awareness drive.'}
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
              {language === 'ur'
                ? 'مفت ہیلمیٹ اور سائیڈ مرر مہم کی خصوصیات'
                : 'Highlights of the Free Helmet & Side Mirror Drive'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full mx-auto">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-brand-light-surface border border-brand-light-border p-6 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-md mb-4">
                    <IconComponent className="w-7 h-7 text-brand-lime" />
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
    </div>
  );
};

export default FreeHelmetDistribution;
