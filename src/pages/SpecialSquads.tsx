import React, { useState, useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { useLanguage } from '../hooks/useLanguage';
import {
  Users,
  Shield,
  HeartPulse,
  Video,
  Maximize2,
  X,
} from 'lucide-react';

const galleryImages = [
  {
    src: '/special-squads/special-squad-01.jpg',
    titleEn: 'Special Squads — Team Overview',
    titleUr: 'اسپیشل اسکوڈز — ٹیم کا جائزہ',
    descEn: 'Specialized traffic squads ready for deployment across District Abbottabad.',
    descUr: 'ضلع ایبٹ آباد میں تنصیب کے لیے تیار مخصوص ٹریفک اسکوڈز۔',
  },
  {
    src: '/special-squads/special-squad-02.jpg',
    titleEn: 'Special Squads — Field Operations',
    titleUr: 'اسپیشل اسکوڈز — فیلڈ آپریشنز',
    descEn: 'Special squads coordinating with Command & Control Room for rapid response.',
    descUr: 'کمانڈ اینڈ کنٹرول روم کے ساتھ رابطہ کرتے ہوئے فوری رسپانس کے لیے مخصوص اسکوڈز۔',
  },
];

const squads = [
  {
    id: 'shaheen-squad',
    icon: Shield,
    titleEn: '1. Shaheen Squad',
    titleUr: '1. شاہین اسکوڈ',
    descEn:
      'The Shaheen Squad is deployed at the Traffic Command & Control Room and is dispatched immediately to locations experiencing traffic congestion or other road-related difficulties. The squad assists field staff in managing traffic, resolving disruptions, and maintaining a smooth flow of vehicles. Its rapid-response role helps reduce traffic delays and strengthens coordination between the control room and on-ground personnel.',
    descUr:
      'شاہین اسکوڈ ٹریفک کمانڈ اینڈ کنٹرول روم میں تنصیب ہے اور ایسی جگہوں پر فوری ترسیل کیا جاتا ہے جہاں ٹریفک جام یا دیگر سڑک سے متعلق مشکلات ہوں۔ یہ اسکوڈ فیلڈ اسٹاف کی ٹریفک منظم کرنے، رکاوٹیں دور کرنے اور گاڑیوں کی روانی برقرار رکھنے میں مدد کرتا ہے۔ اس کا فوری رسپانس کا کردار ٹریفک کی تاخیر کم کرتا ہے اور کنٹرول روم اور زمینی اہلکاروں کے درمیان رابطے کو مضبوط بناتا ہے۔',
  },
  {
    id: 'first-aid-squad',
    icon: HeartPulse,
    titleEn: '2. First Aid Squad',
    titleUr: '2. فرسٹ ایڈ اسکوڈ',
    descEn:
      'The First Aid Squad provides immediate first-aid assistance to injured persons on the roads. Its primary role is to offer initial medical support in road accidents and other emergencies until further medical assistance becomes available. This initiative reflects the commitment of Traffic Police to protecting lives and ensuring timely assistance to road users in need.',
    descUr:
      'فرسٹ ایڈ اسکوڈ سڑکوں پر زخمی افراد کو فوری پہلی امداد فراہم کرتا ہے۔ اس کا بنیادی کردار سڑکی حادثات اور دیگر ایمرجنسیوں میںابتدائی طبی امداد فراہم کرنا ہے جب تک مزید طبی امداد دستیاب نہ ہو جائے۔ یہ اقدامہ جانوں کی حفاظت اور ضرورت مند سڑک استعمال کنندگان کو مو موقع امداد یقینی بنانے کے لیے ٹریفک پولیس کے عزم کو ظاہر کرتا ہے۔',
  },
  {
    id: 'bodycam-squad',
    icon: Video,
    titleEn: '3. Bodycam Squad',
    titleUr: '3. بادی کیم اسکوڈ',
    descEn:
      'As part of an experimental initiative, 10 body-worn cameras have been distributed among traffic wardens. These cameras are intended to support transparency, accountability, and professional conduct during traffic enforcement and public interactions. The initiative also provides an opportunity to evaluate the effectiveness of body-worn camera technology in improving operational monitoring and service delivery.',
    descUr:
      'ایک تجربی اقدامے کے طور پر، 10 بادی ورن کیمرے ٹریفک وارڈنز میں تقسیم کیے گئے ہیں۔ یہ کیمرے ٹریفک نفاذ اور عوامی تعاملات کے دوران شفافیت، جواب دہی اور پیشہ ورانہ رویے کی حمایت کے لیے ہیں۔ یہ اقدامہ بادی ورن کیم ٹیکنالوجی کی کارکردگی کا جائزہ لینے کا موقع بھی فراہم کرتا ہے تاکہ آپریشنل نگرانی اور سروس ڈیلیوری بہتر بن سکے۔',
  },
  {
    id: 'respirator-mask-squad',
    icon: Shield,
    titleEn: '4. Respirator Mask Squad',
    titleUr: '4. رسبیرٹر ماسک اسکوڈ',
    descEn:
      'The Respirator Mask Squad is equipped to support traffic wardens performing duties in challenging environmental conditions, particularly during periods of smog and poor air quality. The use of appropriate respiratory protection helps reduce exposure to airborne pollutants while officers regulate traffic and perform their public-service responsibilities. This initiative emphasizes the health, safety, and operational readiness of traffic personnel.',
    descUr:
      'رسبیرٹر ماسک اسکوڈ ٹریفک وارڈNZ کو مشکل ماحولیاتی حالات، خاص طور پر سموگ اور خراب ہوا کی معیار کے دوران ذمہ داریاں انجام دینے میں مدد کرتا ہے۔ مناسب سانس کی حفاظت کا استعمال اہلکاروں کو فضائی الودگی سے محفوظ رکھتا ہے جب وہ ٹریفک کنٹرول کرتے ہیں اور عوامی ذمہ داریاں انجام دیتے ہیں۔ یہ اقدامہ ٹریفک پرسنل کی صحت، حفاظت اور آپریشنل تیاری پر زور دیتا ہے۔',
  },
];

export const SpecialSquads: React.FC = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[number] | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'اسپیشل اسکوڈز | ٹریفک وارڈن ایبٹ آباد'
        : 'Special Squads | Traffic Warden Abbottabad';
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
        <div className="absolute inset-0 bg-[url('/special-squads/special-squad-01.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000090] via-[#000090]/60 to-transparent" />

        <PageContainer className="relative z-10 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-extrabold uppercase tracking-widest">
              <Users className="w-4 h-4" />
              <span>{language === 'ur' ? 'خصوصی اقدامات' : 'INITIATIVES'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {language === 'ur' ? (
                <>
                  مخصوص ٹریفک{' '}
                  <span className="text-brand-lime">اسکوڈز</span>
                </>
              ) : (
                <>
                  SPECIALIZED TRAFFIC{' '}
                  <span className="text-brand-lime">RESPONSE SQUADS</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-3xl mx-auto">
              {language === 'ur'
                ? 'ہمارے مخصوص ٹریفک اسکوڈز فیلڈ آپریشنز کی حمایت کرتے ہیں، روڈ سیفٹی کو بہتر بناتے ہیں اور شہریوں کو مو موقع امداد فراہم کرتے ہیں۔ ہر اسکوڈ ٹریفک کے حالات سے نمٹنے اور ضلع ایبٹ آباد بھر میں محفوظ سڑکی حالات یقینی بنانے میں ایک مخصوص کردار ادا کرتا ہے۔'
                : 'Our specialized traffic squads support field operations, improve road safety, and provide timely assistance to citizens. Each squad performs a dedicated role in managing traffic situations and helping ensure safer road conditions across District Abbottabad.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <Users className="w-4 h-4 text-brand-lime" />
                <span>4 Specialized Squads</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <Shield className="w-4 h-4 text-brand-lime" />
                <span>{language === 'ur' ? 'فوری رسپانس' : 'Rapid Response'}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <HeartPulse className="w-4 h-4 text-brand-lime" />
                <span>Citizen Safety</span>
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
                ? 'مخصوص ٹریفک اسکوڈز کی تعارف'
                : 'Specialized Traffic Squads Overview'}
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                {language === 'ur'
                  ? 'ٹریفک وارڈن ایبٹ آباد نے چار مخصوص اسکوڈز قائم کیے ہیں جو ٹریفک مینجمنٹ کے مختلف پہلوؤں سے نمٹتے ہیں۔ یہ اسکوڈز کمانڈ اینڈ کنٹرول روم اور فیلڈ آپریشنز کے ساتھ مل کر کام کرتے ہیں تاکہ شہریوں کو بہتر سروس فراہم کی جا سکے۔'
                  : 'Traffic Warden Abbottabad has established four specialized squads that address different aspects of traffic management. These squads work in coordination with the Command & Control Room and field operations to provide better services to citizens.'}
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
              {language === 'ur' ? 'اسپیشل اسکوڈز — تصاویر' : 'Special Squads — In Pictures'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'اسپیشل اسکوڈز کی تصاویر'
                : 'A look at the Special Squads in action.'}
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

      {/* Squads Detail Section */}
      <section className="py-16 sm:py-20 bg-brand-light-bg">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'اسکوڈز کی تفصیل' : 'SQUAD DETAILS'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'ہمارے مخصوص اسکوڈز' : 'Our Specialized Squads'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'ہر اسکوڈ کا اپنا مخصوص کردار اور ذمہ داری ہے'
                : 'Each squad has its own dedicated role and responsibility'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {squads.map((squad, idx) => {
              const IconComponent = squad.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-brand-light-surface border border-brand-light-border p-6 sm:p-8 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-md">
                        <IconComponent className="w-6 h-6 text-brand-lime" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-brand-dark">
                        {language === 'ur' ? squad.titleUr : squad.titleEn}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {language === 'ur' ? squad.descUr : squad.descEn}
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

export default SpecialSquads;