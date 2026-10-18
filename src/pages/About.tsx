import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { useLanguage } from '../hooks/useLanguage';
import {
  ShieldCheck,
  Phone,
  ArrowRight,
  Scale,
  HelpCircle,
  MapPin,
  BookOpen,
  Radio,
  Navigation
} from 'lucide-react';

// Authentic Abbottabad Traffic Police Assets
import heroOfficerImg from '/About Us Section Image.jpg';
import logoImg from '/Traffic-Logo-Updated.png';

export const About: React.FC = () => {
  const { language, isRTL } = useLanguage();
  // Set document title for SEO & official standards
  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ہمارے متعلق | ٹریفک وارڈن ایبٹ آباد — خیبر پختونخوا پولیس'
        : 'About Traffic Warden Abbottabad | Khyber Pakhtunkhwa Police';
  }, [language]);

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg overflow-x-hidden">
      {/* =========================================================================
          02 — ABOUT / OVERVIEW
          ========================================================================= */}
      <section id="overview" className="py-16 sm:py-20 bg-brand-light-surface scroll-mt-20">
        <PageContainer>
          <div className="space-y-10">
            {/* Top: Professional Photographic Composition - Full Width */}
            <div className="relative">
              <div className="relative w-full">
                {/* Main Featured Photo */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-light-border bg-slate-900 aspect-[15/7]">
                  <img
                    src={heroOfficerImg}
                    alt="Traffic Warden Abbottabad officer in uniform on mountain highway"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* Experience / Service Circular Badge */}
                <div className="absolute -top-3 -left-3 w-24 h-24 rounded-full bg-brand-blue text-white flex flex-col items-center justify-center text-center shadow-xl border-4 border-white z-20 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-brand-lime mb-0.5" />
                  <span className="text-xs font-black tracking-tight leading-none">24/7</span>
                  <span className="text-[9px] font-bold uppercase text-brand-lime-light">Service</span>
                </div>
              </div>
            </div>

            {/* Bottom: Content Column - Full Width */}
            <div className="space-y-5 text-center sm:ltr:text-left sm:rtl:text-right">
              {/* Official Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mx-auto sm:mx-0">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>{language === 'ur' ? 'ہمارے متعلق' : 'ABOUT TRAFFIC WARDEN ABBOTTABAD'}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
                {language === 'ur'
                  ? 'ڈسٹرکٹ ایبٹ آباد میں محفوظ، منظم اور باوقار ٹریفک کا علمبردار'
                  : 'Dedicated to Disciplined Traffic & Citizen Safety Across Abbottabad'}
              </h2>

              {/* Core Paragraphs (Matching exact specification) */}
              <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  {language === 'ur'
                    ? 'ٹریفک وارڈن ایبٹ آباد ضلع ایبٹ آباد بھر میں محفوظ، منظم اور موثر ٹریفک کی نقل و حرکت کو برقرار رکھنے کے لیے ہمہ وقت پرعزم ہے۔ خیبر پختونخوا پولیس کے تحت کام کرتے ہوئے، ٹریفک وارڈن نظام ٹریفک کو ریگولیٹ کرنے، روڈ سیفٹی کو فروغ دینے، سڑک استعمال کرنے والوں کی مدد کرنے، اور ضلع بھر میں موٹر سائیکل سواروں، پیدل چلنے والوں اور سیاحوں کی ہموار نقل و حرکت کو یقینی بنانے میں اہم کردار ادا کرتا ہے۔'
                    : 'Traffic Warden Abbottabad is committed to maintaining safe, disciplined, and orderly roads across District Abbottabad. Working under the Khyber Pakhtunkhwa Police, the Traffic Warden system plays an important role in regulating traffic, promoting road safety, assisting road users, and ensuring smooth movement of motorists, pedestrians, and tourists throughout the district.'}
                </p>
                <p>
                  {language === 'ur'
                    ? 'ایبٹ آباد، ہزارہ کے دلکش سیاحتی مقامات کا اہم گیٹ وے اور سیاحوں اور روزانہ مسافروں کے لیے اہم راستہ ہونے کے باعث، موثر ٹریفک مینجمنٹ عوام کی سلامت اور سہولت کے لیے انتہائی ضروری ہے۔ ٹریفک وارڈن ضلع بھر میں تعینات رہ کر ٹریفک کے بہاؤ کو منظم کرتے ہیں، ٹریفک قوانین نافذ کرتے ہیں، سڑک کی صورتحال پر ردعمل ظاہر کرتے ہیں، اور جہاں بھی مدد کی ضرورت ہو شہریوں کی رہنمائی کرتے ہیں۔'
                    : 'With Abbottabad serving as an important gateway to the scenic Hazara region and a major route for tourists and commuters, effective traffic management is essential for the safety and convenience of the public. Traffic Wardens remain deployed across the district to manage traffic flow, enforce traffic laws, respond to road situations, and guide citizens wherever assistance is required.'}
                </p>
                <p>
                  {language === 'ur'
                    ? 'ٹریفک وارڈن ایبٹ آباد ٹریفک نافذ کرنے کے پیشہ ورانہ اور شہریوں کے دوستانہ طریقے پر توجہ دیتا ہے۔ ٹریفک ضابطوں کی پاسداری یقینی بنانے کے ساتھ ساتھ، افسر ذمہ دارانہ ڈرائیونگ، پیدل چلنے والوں کی حفاظت، ہیلمٹ اور سیٹ بیلٹ کا استعمال، لائن انضباط، پارکنگ ضابطے، اور دیگر ضروری روڈ سیفٹی ممارمات کے بارے میں آگاہی پیدا کرنے کے لیے کام کرتے ہیں۔'
                    : 'Traffic Warden Abbottabad focuses on a professional and citizen-friendly approach to traffic enforcement. Along with ensuring compliance with traffic regulations, officers work to create greater awareness about responsible driving, pedestrian safety, helmet and seat-belt use, lane discipline, parking regulations, and other essential road-safety practices.'}
                </p>
                <p>
                  {language === 'ur'
                    ? 'محکمہ بہتر فیلڈ آپریشنز، عوامی آگاہی، ٹیکنالوجی کی مدد سے سروسز، اور متعلقہ قانون نافذ کرنے والے اور شہری اداروں کے ساتھ مشترکہ کوششیں کے ذریعے جدید ٹریفک مینجمنٹ کو مضبوط بنانے کے لیے پرعزم ہے۔ ان کوششیں کا مقصد ایبٹ آباد کی سڑکوں کو رہائشیوں، زائرین اور سیاحوں کے لیے زیادہ محفوظ، منظم اور قابل رسائی بنانا ہے۔'
                    : 'The department is committed to strengthening modern traffic management through improved field operations, public awareness, technology-enabled services, and coordinated efforts with relevant law-enforcement and civic authorities. These efforts are aimed at making Abbottabad\'s roads safer, more organized, and more accessible for residents, visitors, and tourists.'}
                </p>
                <p className="font-medium text-slate-900">
                  {language === 'ur'
                    ? 'انضباط، پیشہ ورانہ رویے اور عوامی خدمت کے ذریعے، ٹریفک وارڈن ایبٹ آباد ضلع بھر میں ایک محفوظ سڑکی ماحول کی طرف کام کرنا جاری رکھے ہوئے ہے۔ ہمارا مقصد صرف ٹریفک کو ریگولیٹ کرنا نہیں، بلکہ ذمہ دارانہ سڑک استعمال کی ثقافت بنانا ہے جہاں ہر موٹر سائیکل سوار، پیدل چلنے والا اور زائر زیادہ محفوظی اور اعتماد کے ساتھ سفر کر سکے۔'
                    : 'Through discipline, professionalism, and public service, Traffic Warden Abbottabad continues to work towards a safer road environment across the district. Our goal is not only to regulate traffic, but also to build a culture of responsible road use where every motorist, pedestrian, and visitor can travel with greater safety and confidence.'}
                </p>
              </div>

              {/* CTA Row */}
              <div className="pt-2 flex flex-wrap items-center gap-3 justify-center sm:ltr:justify-start sm:rtl:justify-end">
                <Link
                  to="/about/mission-vision"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue hover:bg-brand-blue-600 text-white font-bold text-xs shadow-sm transition-all duration-200"
                >
                  <span>{language === 'ur' ? 'ہمارا مشن و وژن' : 'Explore Our Mission & Vision'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-light-bg hover:bg-brand-light-subtle text-slate-700 font-semibold text-xs border border-brand-light-border transition-colors"
                >
                  <span>{language === 'ur' ? 'شہری خدمات' : 'Citizen Services'}</span>
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          06 — WHAT WE DO (OUR KEY FUNCTIONS)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-brand-light-bg">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'اہم ذمہ داریاں' : 'OPERATIONAL ROLES'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'ہماری بنیادی خدمات اور فرائض' : 'OUR KEY FUNCTIONS'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'ایبٹ آباد میں ٹریفک کی روانی اور عوام کے تحفظ کے لیے ہماری 6 کلیدی فیلڈ سروسز'
                : 'Core services rendered daily across intersections, highways, and commercial hubs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                titleEn: 'Traffic Regulation',
                titleUr: 'ٹریفک ریگولیشن',
                descEn: 'Managing traffic flow and congestion while maintaining orderly movement.',
                descUr: 'ٹریفک کے بہاؤ اور جام کو منظم کرتے ہوئے منظم حرکت کو برقرار رکھنا۔',
                icon: Navigation,
                tagEn: 'Order',
                tagUr: 'نظم',
              },
              {
                titleEn: 'Law Enforcement',
                titleUr: 'قانون نافذ کرنے',
                descEn: 'Ensuring compliance with traffic laws and addressing violations.',
                descUr: 'ٹریفک قوانین کی پابندی یقینی بنانا اور خلاف ورزیوں کا حل کرنا۔',
                icon: Scale,
                tagEn: 'Enforcement',
                tagUr: 'نفاذ',
              },
              {
                titleEn: 'Road Safety',
                titleUr: 'روڈ سیفٹی',
                descEn: 'Promoting helmet, seat-belt and responsible driving practices.',
                descUr: 'ہیلمٹ، سیٹ بیلٹ اور ذمہ دارانہ ڈرائیونگ کی ترویج۔',
                icon: ShieldCheck,
                tagEn: 'Safety',
                tagUr: 'حفاظت',
              },
              {
                titleEn: 'Public Assistance',
                titleUr: 'عوامی معاونت',
                descEn: 'Guiding and assisting motorists, pedestrians and visitors.',
                descUr: 'موٹر سائیکل سواروں، پیدل چلنے والوں اور زائرین کی رہنمائی اور مدد کرنا۔',
                icon: HelpCircle,
                tagEn: 'Guidance',
                tagUr: 'رہنمائی',
              },
              {
                titleEn: 'Traffic Awareness',
                titleUr: 'ٹریفک آگاہی',
                descEn: 'Promoting road-safety education and responsible road use.',
                descUr: 'سکولوں، کالجوں اور کمیونٹی سطح پر روڈ سیفٹی تعلیم اور ذمہ دارانہ سڑک استعمال کی ترویج۔',
                icon: BookOpen,
                tagEn: 'Education',
                tagUr: 'تعلیم',
              },
              {
                titleEn: 'Special Traffic Management',
                titleUr: 'خصوصی ٹریفک مینجمنٹ',
                descEn: 'Managing traffic during events, incidents and high-traffic situations.',
                descUr: 'تقریبات، واقعات اور زیادہ ٹریفک کی صورتحال میں ٹریفک منظم کرنا۔',
                icon: Radio,
                tagEn: 'Special Ops',
                tagUr: 'خصوصی آپریشن',
              },
            ].map((func, idx) => {
              const IconComponent = func.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-brand-light-surface border border-brand-light-border p-7 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6 text-brand-lime" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {language === 'ur' ? func.tagUr : func.tagEn}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                      {language === 'ur' ? func.titleUr : func.titleEn}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {language === 'ur' ? func.descUr : func.descEn}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-brand-blue font-bold">
                    <span>{language === 'ur' ? 'اہم ذمہ داریاں' : 'Core Service'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          12 — COMMITMENT SECTION (Full-Width Dark/Blue Closing Section)
          ========================================================================= */}
      <section className="relative bg-[#000080] text-white py-16 sm:py-24 border-t border-[#0000aa] overflow-hidden">
        {/* Tactical pattern overlay */}
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-lime/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <PageContainer className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-extrabold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-brand-lime" />
              <span>{language === 'ur' ? 'ہمارا پختہ عزم' : 'OUR COMMITMENT'}</span>
            </div>

            {/* Subtitle / Big Motto */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {language === 'ur' ? (
                  <>
                    ہر سفر اہم ہے۔{' '}
                    <span className="text-brand-lime block sm:inline">
                      آپ کی حفاظت، ہمارا فخر!
                    </span>
                  </>
                ) : (
                  <>
                    Every journey matters.{' '}
                    <span className="text-brand-lime block sm:inline">
                      Your safety is our priority.
                    </span>
                  </>
                )}
              </h2>

              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto font-normal">
                {language === 'ur'
                  ? 'ٹریفک وارڈن ایبٹ آباد محفوظ سڑکوں، منظم ٹریفک اور بہتر عوامی خدمت کے لیے پرعزم ہے۔ پیشہ ورانہ نفاذ، عوامی آگاہی اور کمیونٹی کے باہمی تعاون کے ذریعے ہمارا مقصد ایبٹ آباد بھر میں ہر سفر کو زیادہ محفوظ اور منظم بنانا ہے۔'
                  : 'Traffic Warden Abbottabad remains committed to safer roads, disciplined traffic and better public service. Through professional enforcement, public awareness and community cooperation, we aim to make every journey across Abbottabad safer and more orderly.'}
              </p>
            </div>

            {/* Helpline & Action Callout Box */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white/10 border-2 border-white/20 backdrop-blur-md max-w-2xl mx-auto shadow-2xl space-y-6">
              <div className="space-y-2">
                <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-brand-lime">
                  {language === 'ur' ? 'کیا آپ کو ٹریفک معاونت درکار ہے؟' : 'NEED TRAFFIC ASSISTANCE?'}
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3">
                  <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-brand-lime animate-bounce" />
                  <a href="tel:1915" className="hover:text-brand-lime transition-colors">
                    Call 1915
                  </a>
                </div>
                <div className="text-xs text-white/80">
                  {language === 'ur'
                    ? 'یا کنٹرول روم سے رابطہ کریں: 0992-921042'
                    : 'Or District Control Room: 0992-921042 (24/7 Response)'}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-lime hover:bg-brand-lime-hover text-brand-dark font-extrabold text-sm tracking-wide shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-brand-dark" />
                  <span>{language === 'ur' ? 'ٹریفک وارڈن سے رابطہ کریں' : 'Contact Traffic Warden'}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>

                <a
                  href="tel:1915"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/30 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{language === 'ur' ? 'فوری کال 1915' : 'Dial Helpline Now'}</span>
                </a>
              </div>
            </div>

            {/* Official Attribution Stamp */}
            <div className="pt-4 flex items-center justify-center gap-3 text-xs text-white/70">
              <img
                src={logoImg}
                alt="Traffic Warden Abbottabad Crest"
                className="w-8 h-8 object-contain"
              />
              <span>
                {language === 'ur'
                  ? 'ٹریفک وارڈن ایبٹ آباد — خیبر پختونخوا پولیس، حکومت خیبر پختونخوا'
                  : 'Traffic Warden Abbottabad — Khyber Pakhtunkhwa Police, Government of KP'}
              </span>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default About;
