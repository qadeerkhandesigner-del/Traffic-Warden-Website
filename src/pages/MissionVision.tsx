import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  Compass,
  Target,
  Award,
  HeartHandshake,
  Scale,
  ShieldCheck,
  ShieldAlert,
  Users,
  CheckCircle2,
  ArrowRight,
  Eye
} from 'lucide-react';
import logoImg from '/Traffic-Logo-Updated.png';

export const MissionVision: React.FC = () => {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'مشن، وژن اور بنیادی اقدار | ٹریفک وارڈن ایبٹ آباد'
        : 'Mission & Vision | Traffic Warden Abbottabad';
  }, [language]);

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative bg-[#000080] text-white pt-8 pb-14 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'About Us', labelUrdu: 'ہمارے متعلق', path: '/about' },
              { label: 'Mission & Vision', labelUrdu: 'مشن اور وژن', path: '/about/mission-vision' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'اسٹریٹجک وژن' : 'STRATEGIC DIRECTION'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'ہمارا مشن، وژن اور اقدار' : 'OUR MISSION & VISION'}
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'ایبٹ آباد کی شاہراہوں کو پرامن، باضابطہ اور محفوظ بنانے کے لیے ہمارے پختہ اہداف اور رہنما اصول۔'
                : 'Strategic pillars guiding our field force in fostering disciplined transit and community safety across Abbottabad.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Mission & Vision Twin Spotlight */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* OUR MISSION CARD */}
            <div className="group rounded-3xl bg-brand-light-bg border-2 border-brand-blue/20 hover:border-brand-blue p-8 sm:p-10 shadow-gov-md hover:shadow-gov-lg transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-md">
                    <Target className="w-7 h-7 text-brand-lime" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100">
                    {language === 'ur' ? 'بنیادی فریضہ' : 'PURPOSE & MANDATE'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight flex items-center gap-3">
                  <img
                    src={logoImg}
                    alt="Traffic Warden Abbottabad"
                    className="w-8 h-8 object-contain"
                  />
                  {language === 'ur' ? 'ہمارا مشن' : 'OUR MISSION'}
                </h2>

                <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium border-l-4 border-brand-blue pl-4 py-1 italic">
                  “
                  {language === 'ur'
                    ? 'موثر ٹریفک ریگولیشن، منصفانہ قانون کے نفاذ، عوامی معاونت اور مسلسل روڈ سیفٹی آگاہی کے ذریعے ایبٹ آباد کی سڑکوں پر محفوظ اور منظم نقل و حرکت کو یقینی بنانا۔'
                    : 'To ensure safe and orderly movement on the roads of Abbottabad through effective traffic regulation, fair enforcement, public assistance and continuous road-safety awareness.'}
                  ”
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'ur'
                    ? 'ہماری اولین ترجیح سڑک پر ہر شہری کا وقار، سلامتی اور ہموار سفر ہے۔ ہمارا فورس ہر لمحہ چوکوں، بازاروں اور سیاحتی شاہراہوں پر مستعد ہے۔'
                    : 'Our field force prioritizes accident prevention, voluntary compliance, and uncompromised civic support at every choke-point and intersection.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="font-semibold text-slate-700">Fair Enforcement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="font-semibold text-slate-700">Public Facilitation</span>
                </div>
              </div>
            </div>

            {/* OUR VISION CARD */}
            <div className="group rounded-3xl bg-brand-light-bg border-2 border-brand-lime/60 hover:border-brand-blue p-8 sm:p-10 shadow-gov-md hover:shadow-gov-lg transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#000080] text-white flex items-center justify-center shadow-md">
                    <Eye className="w-7 h-7 text-brand-lime" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-brand-lime/30 text-brand-dark border border-brand-lime">
                    {language === 'ur' ? 'مستقبل کا وژن' : 'LONG-TERM HORIZON'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight flex items-center gap-3">
                  <img
                    src={logoImg}
                    alt="Traffic Warden Abbottabad"
                    className="w-8 h-8 object-contain"
                  />
                  {language === 'ur' ? 'ہمارا وژن' : 'OUR VISION'}
                </h2>

                <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium border-l-4 border-brand-lime pl-4 py-1 italic">
                  “
                  {language === 'ur'
                    ? 'ایک ایسا محفوظ، باضابطہ اور شہریوں کے لیے دوستانہ سڑک کا ماحول قائم کرنا جہاں ہر ڈرائیور، پیدل چلنے والا اور سیاح مکمل اعتماد اور سکون کے ساتھ سفر کر سکے۔'
                    : 'To build a safer, more disciplined and citizen-friendly road environment where every motorist, pedestrian and visitor can travel with confidence.'}
                  ”
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'ur'
                    ? 'ہم ایبٹ آباد کو خیبر پختونخوا میں جدید اور مثالی ٹریفک کلچر کا مرکز بنانے کے لیے کوشاں ہیں جہاں ٹریفک قوانین کا احترام شہریوں کی روزمرہ عادت بن جائے۔'
                    : 'We envision a model traffic ecosystem driven by smart electronic monitoring, seamless mountain corridor management, and deep community partnership.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-lime-600 shrink-0" />
                  <span className="font-semibold text-slate-700">Citizen Dignity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-lime-600 shrink-0" />
                  <span className="font-semibold text-slate-700">Zero Fatality Goal</span>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* CORE VALUES GRID */}
      <section className="py-16 sm:py-20 bg-brand-light-bg border-t border-brand-light-border">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'رہنما اقدار' : 'ORGANIZATIONAL ETHOS'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'ہمارے 6 بنیادی اقدار' : 'OUR CORE VALUES'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'پیشہ ورانہ دیانت، اخلاص اور عوامی خدمت کے اصول جو ہمارے ہر اقدام کی رہنمائی کرتے ہیں'
                : 'The timeless standards that guide our traffic wardens in every public interaction.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                titleEn: 'Professionalism',
                titleUr: 'پیشہ ورانہ مہارت',
                descEn: 'Trained, disciplined and responsible traffic service across all duties.',
                descUr: 'مکمل تربیت، ضبط اور ذمہ داری کے ساتھ شاہراہوں پر فرائض کی انجام دہی۔',
                icon: Award,
              },
              {
                number: '02',
                titleEn: 'Public Service',
                titleUr: 'عوامی خدمت',
                descEn: 'Helping citizens with respect, patience and courteous conduct at all times.',
                descUr: 'ہر شہری اور مسافر کے ساتھ احترام، تحمل اور خیرخواہی کا برتاؤ۔',
                icon: HeartHandshake,
              },
              {
                number: '03',
                titleEn: 'Fair Enforcement',
                titleUr: 'منصفانہ قانونی نفاذ',
                descEn: 'Traffic laws applied fairly, consistently and without discrimination.',
                descUr: 'قانون کی بالادستی اور بلا امتیاز یکساں ٹریفک ضوابط کا نفاذ۔',
                icon: Scale,
              },
              {
                number: '04',
                titleEn: 'Integrity',
                titleUr: 'دیانت داری و وقار',
                descEn: 'Transparent, upright and accountable conduct in every field action.',
                descUr: 'شفافیت، صداقت اور مکمل محکمانہ جوابدہی کا مظاہرہ۔',
                icon: ShieldCheck,
              },
              {
                number: '05',
                titleEn: 'Road Safety',
                titleUr: 'روڈ سیفٹی ترجیح',
                descEn: 'Protecting lives through education, enforcement and preventive vigilance.',
                descUr: 'انسانی جان کی حرمت، شعور بیداری اور حادثات کی پیشگی روک تھام۔',
                icon: ShieldAlert,
              },
              {
                number: '06',
                titleEn: 'Responsibility',
                titleUr: 'ذمہ داری و احتساب',
                descEn: 'Every traffic warden is accountable for serving the community faithfully.',
                descUr: 'شہریوں کے تحفظ اور سہولت کے لیے انفرادی اور اجتماعی جوابدہی۔',
                icon: Users,
              },
            ].map((val, idx) => {
              const ValIcon = val.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-brand-light-surface border border-brand-light-border p-7 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-brand-blue-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors flex items-center justify-center">
                        <ValIcon className="w-6 h-6" />
                      </div>
                      <span className="text-xl font-black text-slate-300 group-hover:text-brand-blue transition-colors">
                        {val.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                      {language === 'ur' ? val.titleUr : val.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {language === 'ur' ? val.descUr : val.descEn}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-brand-blue font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    <span>{language === 'ur' ? 'محکمانہ پاسداری' : 'Standard Code of Duty'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue text-white font-bold text-xs hover:bg-brand-blue-600 transition-colors shadow-sm"
            >
              <span>{language === 'ur' ? 'مکمل تعارف صفحہ دیکھیں' : 'Return to About Department Overview'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default MissionVision;
