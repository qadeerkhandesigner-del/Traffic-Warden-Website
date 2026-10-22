import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { useLanguage } from '../hooks/useLanguage';
import {
  PhoneCall,
  Phone,
  ArrowRight,
  ShieldCheck,
  MessageSquareWarning,
} from 'lucide-react';
import overviewImg1 from '../assets/images/overview-1.jpg';
import overviewImg2 from '../assets/images/overview-2.jpg';
import heroSlide1 from '../assets/images/hero-slide-1.jpg';
import heroSlide2 from '../assets/images/hero-slide-2.jpg';
import heroSlide3 from '../assets/images/hero-slide-3.jpg';
import serviceLicense from '../assets/images/service-license.jpg';
import serviceMahran from '../assets/images/service-mahran.jpg';
import logoImg from '/Traffic-Logo-Updated.png';

export const Home: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [slideIndex, setSlideIndex] = React.useState(0);

  const heroSlides = [heroSlide1, heroSlide2, heroSlide3];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-0">
      {/* =========================================================================
          HERO SECTION (Light theme with blue-tinted white background)
          ========================================================================= */}
      <section className="relative bg-brand-light-bg text-brand-dark pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-brand-light-border">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 z-10">
              {/* Reference-style pill badge */}
              <div className="text-xs font-semibold text-black uppercase tracking-wider">
                {language === 'ur'
                  ? 'ٹریفک وارڈن ایبٹ آباد — سرکاری پورٹل'
                  : 'WELCOME TO TRAFFIC WARDEN ABBOTTABAD'}
              </div>

              {/* Main Headline (Bold, impactful typography matching reference) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-black leading-[1.15]">
                {language === 'ur' ? (
                  <>
                    محفوظ اور منظم شاہراہیں، ہر سفر کے لیے{' '}
                    <span className="text-[#000080] block sm:inline">
                      ہماری پہلی ترجیح!
                    </span>
                  </>
                ) : (
                  <>
                    DISCIPLINE ON ROADS  SAFETY FOR EVERY{' '}
                    <span className="text-[#000080]">JOURNEY</span>
                  </>
                )}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
                {language === 'ur'
                  ? 'ٹریفک وارڈن ایبٹ آباد، خیبر پختونخوا پولیس، شہر کی سڑکوں اور سیاحتی راستوں کو محفوظ، منظم اور قابل رسائی بنانے کے لیے نظامِ ترافک، فوری امداد اور ذمہ دارانہ رہنمائی کے ذریعے پرعزم ہے۔'
                  : 'Traffic Warden Abbottabad, Khyber Pakhtunkhwa Police, is dedicated to keeping the city\'s roads and tourist routes safe, organized and accessible through disciplined traffic management, responsive assistance and responsible road-use guidance.'}
              </p>

              {/* CTA Row matching reference: Trust metric on left + Pill Button on right */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-5">
                {/* 24/7 Service Button */}
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-blue hover:bg-brand-blue-600 text-white font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <span>{language === 'ur' ? '24/7 سروس' : '24/7 Service'}</span>
                  <div className="w-6 h-6 rounded-full bg-brand-dark text-white flex items-center justify-center ml-1">
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </Link>

                {/* Primary Action Button (Reference Lime Pill) */}
                <a
                  href="tel:1915"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-lime hover:bg-brand-lime-hover text-brand-dark font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 text-brand-dark" />
                  <span>{language === 'ur' ? 'ہیلپ لائن 1915 پر کال کریں' : 'Dial Helpline 1915'}</span>
                  <div className="w-6 h-6 rounded-full bg-brand-dark text-white flex items-center justify-center ml-1">
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </a>
              </div>
            </div>

            {/* Right Photographic Visual Column */}
            <div className="lg:col-span-5 relative z-10 flex justify-center">
              <div className="relative max-w-md w-full">
                {/* Decorative border frame matching modern layout */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-light-border bg-brand-light-surface aspect-[4/3] sm:aspect-[4/3.8] lg:aspect-[4/4.5]">
                  <div className="absolute inset-0">
                    {heroSlides.map((slide, index) => (
                      <img
                        key={index}
                        src={slide}
                        alt={`Traffic Police Abbottabad Hero Slide ${index + 1}`}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                          index === slideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        } ${index === 1 ? 'object-right' : index === 2 ? 'object-bottom' : 'object-top'}`}
                      />
                    ))}
                  </div>
                  {/* Subtle dark gradient overlay at base for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-light-bg/90 via-transparent to-transparent" />

                  {/* Slide indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSlideIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          index === slideIndex
                            ? 'bg-brand-lime w-8'
                            : 'bg-white/60 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Floating floating card badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-brand-light-surface/90 backdrop-blur-md border border-brand-light-border flex items-center justify-between">
<div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-brand-lime flex items-center justify-center text-brand-dark shrink-0 font-bold">
                          <ShieldCheck className="w-5 h-5 text-brand-dark" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-brand-dark">
                            {language === 'ur' ? 'عوامی حفاظت پٹرول' : 'Public Safety Patrol'}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {language === 'ur' ? 'ایبٹ آباد و گلیات شاہراہ' : 'Abbottabad & Hazara Corridor'}
                          </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-brand-lime px-2.5 py-1 rounded-full bg-brand-light-subtle border border-brand-light-border">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          BATTENBURG MARKINGS (Police checkerboard pattern - 1.5x wider, 4x taller)
          ========================================================================= */}
      <section className="h-14 sm:h-16 overflow-hidden select-none shadow-md" aria-hidden="true">
        <div className="flex h-full w-full">
          {Array.from({ length: 27 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 flex"
              style={{ backgroundColor: i % 2 === 0 ? 'rgb(179 250 22)' : 'rgb(37 109 210)' }}
            >
              {Array.from({ length: 2 }).map((_, row) => (
                <div
                  key={row}
                  className="w-full"
                  style={{
                    backgroundColor: (i + row) % 2 === 0 ? 'rgb(179 250 22)' : 'rgb(37 109 210)'
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          ABOUT SECTION (Dual curved photos + circular badge + 2 feature boxes)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Dual Pill/Oval Photos & Circular Badge (Reference layout) */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative flex items-center justify-center gap-4 max-w-lg w-full">
                {/* Stadium / Arch shape 1 */}
                <div className="w-1/2 h-[340px] sm:h-[400px] rounded-full overflow-hidden border-4 border-brand-light-border shadow-xl relative">
                  <img
                    src={overviewImg1}
                    alt="Abbottabad traffic overview"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stadium / Arch shape 2 */}
                <div className="w-1/2 h-[380px] sm:h-[440px] rounded-full overflow-hidden border-4 border-brand-light-border shadow-xl relative mt-8">
                  <img
                    src={overviewImg2}
                    alt="Traffic officer on duty"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Circular Badge (like the "25+ Years" green circle in reference) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-brand-lime text-brand-dark p-2 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-brand-light-surface z-20">
                  <span className="text-xl sm:text-2xl font-black leading-none">1915</span>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-tight mt-1">
                    Emergency
                  </span>
                  <span className="text-[9px] font-semibold opacity-80">
                    24/7 Response
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Content, 2 Feature Cards, Officer Signature */}
            <div className="lg:col-span-6 space-y-6">
              {/* Overview Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>{language === 'ur' ? 'جائزہ' : 'OVERVIEW'}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight mt-2">
                {language === 'ur' ? 'ہمارے محکمے کا تعارف' : 'About Our Department'}
              </h2>

{/* Description */}
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
                  {language === 'ur'
                    ? 'ٹریفک پولیس ایبٹ آباد ضلع ایبٹ آباد کی سڑکوں کو سب کے لیے محفوظ، منظم اور آسانی سے قابلِ استعمال بنانے کے لیے پرعزم ہے۔ ہماری ذمہ داری صرف ٹریفک کنٹرول تک محدود نہیں؛ ہم روڈ سیفٹی، آگاہی، انضباط اور ذمہ دارانہ ڈرائیونگ کو فروغ دینے کے لیے بھی کام کرتے ہیں۔'
                    : 'Traffic Police Abbottabad is committed to making the roads of District Abbottabad safer, more organized, and easier to use for everyone. Our responsibility is not limited to controlling traffic; we also work to promote road safety, awareness, discipline, and responsible driving among all road users.'}
                </p>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
                  {language === 'ur'
                    ? 'ہمارے ٹریفک وارڈن ضلع بھر میں ٹریفک کے بہاؤ کو منظم کرتے ہیں، ٹریفک قوانین نافذ کرتے ہیں، موٹرسٹس کی مدد کرتے ہیں، اور پیدل چلنے والوں اور سیاحوں کی رہنمائی کرتے ہیں۔ ہمارا خیال ہے کہ مؤثر ٹریفک انتظامی کے لیے انضباط اور بااحترام عوامی سروس دونوں درکار ہیں۔'
                    : 'Our traffic wardens work across the district to manage traffic flow, enforce traffic rules, assist motorists, and help pedestrians and tourists. We believe that effective traffic management requires both discipline and respectful public service.'}
                </p>
              </div>

              {/* Leadership / Attribution & Action Button */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-brand-light-border">
                <div className="flex items-center gap-3">
                  <img
                    src={logoImg}
                    alt="Traffic Warden Abbottabad Crest"
                    className="w-11 h-11 object-contain"
                  />
                  <div>
                    <div className="text-sm font-bold text-brand-dark">
                      {language === 'ur' ? 'ڈسٹرکٹ ٹریفک پولیس' : 'Traffic Warden Abbottabad'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {language === 'ur' ? 'خیبر پختونخوا پولیس' : 'Khyber Pakhtunkhwa Police'}
                    </div>
                  </div>
                </div>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-blue text-white font-semibold text-xs hover:bg-brand-blue-600 transition-colors shadow-sm"
                >
                  <span>{language === 'ur' ? 'مزید جانیے' : 'More About Us'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          LEADERSHIP TEAM SECTION (4 Officers with names)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-brand-light-surface border-y border-brand-light-border">
        <PageContainer>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'پیشوائے قیادت' : 'LEADERSHIP TEAM'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur'
                ? 'ہمارے افسران سے ملیے'
                : 'Meet Our Senior Officers'}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
              {language === 'ur'
                ? 'ڈسٹرکٹ ایبٹ آباد میں ٹریفک انتظامی کو یقینی بنانے والے تجربہ کار افسران۔'
                : 'Experienced officers ensuring traffic management excellence across District Abbottabad.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                nameEn: 'IGP Zulfiqar Hameed',
                nameUr: 'آئی جی پی ذوالفقار حمید',
                rankEn: 'Inspector General of Police, KP',
                rankUr: 'انسپکٹر جنرل آف پولیس، کے پی',
                image: '/IGP POLICE Zulfiqar Hameed.jpg',
              },
              {
                nameEn: 'DIG Hazara Jahanzaib Nazeer Khan',
                nameUr: 'ڈی آئی جی ہزارہ جہانزیب نزیر خان',
                rankEn: 'Deputy Inspector General, Hazara Range',
                rankUr: 'ڈپٹی انسپکٹر جنرل، ہزارہ رینج',
                image: '/DIG Nazeer Jahanzeb Khan updated image.jpg',
              },
              {
                nameEn: 'DPO Abbottabad Haroon Rasheed',
                nameUr: 'ڈی پی او ایبٹ آباد ہارون رشید',
                rankEn: 'District Police Officer, Abbottabad',
                rankUr: 'ضلعی پولیس افسر، ایبٹ آباد',
                image: '/DPO Haroon Rasheed Updated.jpg',
              },
              {
                nameEn: 'SSP Traffic Muhammad Suleman',
                nameUr: 'ایم ایس پی ٹریفک محمد سلیمان',
                rankEn: 'Senior Superintendent of Police, Traffic',
                rankUr: 'سینئر سپرنٹنڈنٹ آف پولیس، ٹریفک',
                image: '/SSP Traffic .jpg',
              },
            ].map((officer, index) => (
              <div
                key={index}
                className="group bg-brand-light-surface border border-brand-light-border rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-brand-blue-200 hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={officer.image}
                    alt={language === 'ur' ? officer.nameUr : officer.nameEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5 text-center space-y-1.5">
                  <h3 className="font-bold text-lg text-brand-dark">
                    {language === 'ur' ? officer.nameUr : officer.nameEn}
                  </h3>
                  <p className="text-sm text-brand-blue font-semibold">
                    {language === 'ur' ? officer.rankUr : officer.rankEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          EMERGENCY HELPLINE STRIP (After Leadership Team)
          ========================================================================= */}
      <section className="bg-[#000080] border-y border-[#0000aa]">
        <div className="bg-[#00006a] py-6">
          <PageContainer>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-brand-lime/10 text-brand-lime border border-brand-lime/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm sm:text-base">
                    {language === 'ur'
                      ? '24/7 ایبٹ آباد ٹریفک ایمرجنسی و رہنمائی ہیلپ لائن 1915'
                      : '24/7 Abbottabad Traffic Emergency & Guidance Helpline 1915'}
                  </h4>
                  <p className="text-xs text-white">
                    {language === 'ur'
                      ? 'شاہراہ قراقرم، ایبٹ آباد شہر، شیروان روڈ، مری روڈ اور گلیات روٹس پر فوری ٹریفک امداد'
                      : 'Rapid on-road assistance across Karakoram Highway, Abbottabad City, Sharwan Road, Murree Road & Galyat corridors'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="tel:1915"
                  className="px-6 py-2.5 rounded-full bg-brand-lime text-brand-dark font-bold text-sm hover:bg-brand-lime-hover transition-all duration-200 inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{language === 'ur' ? 'کال کریں 1915' : 'Dial 1915'}</span>
                </a>
                <a
                  href="tel:0992921042"
                  className="px-4 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
                >
                  0992-921042
                </a>
              </div>
            </div>
          </PageContainer>
        </div>
      </section>

      {/* =========================================================================
          ONLINE COMPLAINT PORTAL CTA SECTION
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-brand-light-surface border-y border-brand-light-border">
        <PageContainer>
          <div className="rounded-3xl bg-[#000080] text-white p-6 sm:p-10 lg:p-14 overflow-hidden relative">
            <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              {/* Left Content Column */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left lg:rtl:text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-brand-lime text-xs font-bold uppercase tracking-wider mb-4 mx-auto lg:mx-0">
                  <MessageSquareWarning className="w-3.5 h-3.5" />
                  <span>{language === 'ur' ? 'آن لائن پورٹل' : 'ONLINE PORTAL'}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
                  {language === 'ur' ? 'آن لائن شکایت پورٹل' : 'Online Complaint Portal'}
                </h2>
                <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                  {language === 'ur'
                    ? 'ٹریفک مسائل، غیر قانونی پارکنگ، سڑک کے خطرات یا کسی بھی ٹریفک متعلقہ شکایت کو آن لائن رجسٹر کریں۔ آپ کی شکایت پر 24 تا 48 گھنٹے میں کارروائی کی جائے گی۔'
                    : 'Report traffic issues, illegal parking, road hazards, or any traffic-related complaint online. Your complaint will be reviewed and action taken within 24–48 hours.'}
                </p>
                <div className="flex justify-center lg:ltr:justify-start lg:rtl:justify-end">
                  <Link
                    to="/online-complaint"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-lime hover:bg-brand-lime-hover text-brand-dark font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <span>{language === 'ur' ? 'شکایت درج کریں' : 'Register Your Complaint'}</span>
                    <div className="w-6 h-6 rounded-full bg-brand-dark text-white flex items-center justify-center ml-1">
                      <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Right Image Column - small image with white border */}
              <div className="md:col-span-5 relative z-10 flex justify-end hidden md:block">
                <div className="relative w-[200px] h-[240px] sm:w-[240px] sm:h-[288px]">
                  <img
                    src="/complaint imge.jpg"
                    alt="Online Complaint Portal"
                    className="w-full h-full object-cover scale-x-[-1] rounded-xl border-4 border-white shadow-lg"
                  />
                </div>
              </div>

              {/* Mobile Image - centered */}
              <div className="lg:hidden relative z-10 flex justify-center mt-8">
                <div className="relative w-[180px] h-[220px]">
                  <img
                    src="/complaint imge.jpg"
                    alt="Online Complaint Portal"
                    className="w-full h-full object-cover scale-x-[-1] rounded-xl border-4 border-white shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          SERVICES SECTION (Professional cards with images)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-brand-light-bg border-t border-brand-light-border">
        <PageContainer>
          {/* Header row with Title and Right Action Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>{language === 'ur' ? 'ہماری خدمات' : 'PUBLIC SERVICES'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur'
                  ? 'عوامی سہولیات اور ٹریفک رہنمائی گائیڈ'
                  : 'Our Range of Public Guidance & Citizen Services'}
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                {language === 'ur'
                  ? 'ڈرائیونگ لائسنسنگ، روٹ پلان، چالان ادائیگی، اور روڈ سیفٹی سے متعلق تمام سرکاری معلومات۔'
                  : 'Official procedures, essential documents, and step-by-step guidance for citizens of Abbottabad.'}
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-lime text-brand-dark font-bold text-xs hover:bg-brand-lime-hover shadow-sm transition-all duration-200 shrink-0"
            >
              <span>{language === 'ur' ? 'تمام خدمات دیکھیں' : 'View All Services'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {/* 3 Public Service Cards (mirrors navbar "Services" menu) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{[
                {
                  id: 'online-complaint',
                  titleEn: 'Online Complaint',
                  titleUr: 'آن لائن شکایت',
                  descEn: 'Report traffic issues, illegal parking, and road hazards online.',
                  descUr: 'ٹریفک کے مسائل، غیر قانونی پارکنگ اور روڈ خطرات آن لائن رپورٹ کریں۔',
                  image: '/complaint imge.jpg',
                  link: '/online-complaint',
                },
                {
                  id: 'driving-license',
                  titleEn: 'Driving License Services',
                  titleUr: 'ڈرائیونگ لائسنس سروسز',
                  descEn: 'New license, learner permit, renewal and duplicate.',
                  descUr: 'نئے لائسنس، لرنر پرمٹ، تجدید اور ڈپلی کیٹ سمیت مکمل سروسز۔',
                  image: serviceLicense,
                  link: '/services/driving-license',
                },
                {
                  id: 'driving-school',
                  titleEn: 'Traffic Police Driving School',
                  titleUr: 'ٹریفک پولیس ڈرائیونگ اسکول',
                  descEn: 'Professional driving training and road safety education.',
                  descUr: 'پیشہ ورانہ ڈرائیونگ کی تربیت اور روڈ سیفٹی تعلیم۔',
                  image: serviceMahran,
                  link: '/services/driving-school',
                },
              ].map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="group block rounded-3xl overflow-hidden bg-brand-light-surface border border-brand-light-border hover:shadow-xl hover:border-brand-blue-200 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={language === 'ur' ? item.titleUr : item.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-lime text-brand-dark">
                      {language === 'ur' ? 'خدمات' : 'Service'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold leading-tight text-brand-dark">
                    {language === 'ur' ? item.titleUr : item.titleEn}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-600">
                    {language === 'ur' ? item.descUr : item.descEn}
                  </p>

                  <div className="pt-4 border-t border-brand-light-border/40 flex items-center justify-between">
                    <span className="text-sm font-bold text-brand-blue group-hover:underline transition-colors">
                      {language === 'ur' ? 'تفصیلات دیکھیں' : 'Read More'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>
    </div>
  );
};
