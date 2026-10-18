import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  Network,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  ArrowDown,
  ArrowRight,
} from 'lucide-react';

export const Organization: React.FC = () => {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'تنظیمی ڈھانچہ | ٹریفک وارڈن ایبٹ آباد'
        : 'Our Organization | Traffic Warden Abbottabad';
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
              { label: 'Organization', labelUrdu: 'تنظیمی ڈھانچہ', path: '/about/organization' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <Network className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'محکمہ جاتی نظام' : 'COMMAND ARCHITECTURE'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'ہمارا تنظیمی ڈھانچہ' : 'OUR ORGANIZATION'}
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'ٹریفک وارڈن ایبٹ آباد کے آپریشنل، کمانڈ اور فیلڈ سیکٹر کے نظام کی جامع تفصیل۔'
                : 'The structural framework of Traffic Warden Abbottabad, coordinating supervision, field deployment, and public facilitation.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Visual Hierarchy / Organizational Tree Flowchart */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              {language === 'ur' ? 'سلسلہ کمان' : 'CHAIN OF COMMAND'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight mt-1">
              {language === 'ur' ? 'کمانڈ سٹرکچر اور باہمی رابطہ' : 'Departmental Command Hierarchy'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'صوبائی پولیس ہیڈکوارٹرز سے لے کر سڑک پر موجود فیلڈ وارڈن تک باضابطہ ربط'
                : 'Seamless integration from provincial leadership to on-ground traffic wardens.'}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Level 1: Provincial & Regional Oversight */}
            <div className="p-6 rounded-3xl bg-brand-blue-50 border-2 border-brand-blue-200 text-center relative shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-lime" />
                <span>{language === 'ur' ? 'سطح 1: سینئر قیادت' : 'Level 01: Senior Command Oversight'}</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark">
                {language === 'ur' ? 'خیبر پختونخوا پولیس و ریجنل کمانڈ' : 'Khyber Pakhtunkhwa Police & Regional Command'}
              </h3>
              <p className="text-xs text-slate-600 max-w-xl mx-auto mt-1 leading-relaxed">
                {language === 'ur'
                  ? 'انسپکٹر جنرل آف پولیس (آئی جی پی کے پی)، ڈپٹی انسپکٹر جنرل (ڈی آئی جی ہزارہ رینج) اور ضلعی پولیس آفیسر (ڈی پی او ایبٹ آباد)'
                  : 'Inspector General of Police (IGP KP), Deputy Inspector General (DIG Hazara Range), and District Police Officer (DPO Abbottabad).'}
              </p>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center text-brand-blue" aria-hidden="true">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Level 2: District Traffic Leadership */}
            <div className="p-6 rounded-3xl bg-white border-2 border-brand-blue text-center relative shadow-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5 text-brand-lime" />
                <span>{language === 'ur' ? 'سطح 2: ضلعی ٹریفک کمانڈ' : 'Level 02: District Traffic Headquarters'}</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark">
                {language === 'ur' ? 'سینئر سپرنٹنڈنٹ آف پولیس (ٹریفک) ایبٹ آباد' : 'SSP Traffic Abbottabad & Headquarters Bureau'}
              </h3>
              <p className="text-xs text-slate-600 max-w-xl mx-auto mt-1 leading-relaxed">
                {language === 'ur'
                  ? 'ایس ایس پی ٹریفک اور ڈی ایس پی ہیڈکوارٹرز جو تمام ضلعی پلاننگ، لائسنسنگ برانچ، بجٹ اور ٹریفک لائنز کی نگرانی کرتے ہیں۔'
                  : 'Led by SSP Traffic, supervising administrative branches, licensing coordination, digital challan systems, and operational discipline.'}
              </p>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center text-brand-blue" aria-hidden="true">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Level 3: Field Force & Sector Incharges (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-brand-light-border hover:border-brand-blue-300 shadow-sm transition-all space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue mx-auto flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark">
                  {language === 'ur' ? 'انچارج ٹریفک ایڈمنسٹریشن' : 'Incharge Traffic Administration'}
                </h4>
                <p className="text-xs text-slate-500 leading-snug">
                  {language === 'ur'
                    ? 'ہیڈکوارٹرز، لائسنسنگ، بجٹ، اور ضلعی پلاننگ کی نگرانی'
                    : 'Overseeing HQ operations, licensing branch, budget, and district planning.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-brand-light-border hover:border-brand-blue-300 shadow-sm transition-all space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue mx-auto flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark">
                  {language === 'ur' ? 'انچارج منڈیان سرکل' : 'Incharge Mandian Circle'}
                </h4>
                <p className="text-xs text-slate-500 leading-snug">
                  {language === 'ur'
                    ? 'شاہراہ قراقرم، سپلائی چوک، اور ایوب میڈیکل کمپلیکس ریلڈ ٹریفک'
                    : 'Karakoram Highway, Supply Chowk, and Ayub Medical Complex traffic management.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-brand-light-border hover:border-brand-blue-300 shadow-sm transition-all space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue mx-auto flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark">
                  {language === 'ur' ? 'انچارج حویلیاں اینڈ گلیات سرکل' : 'Incharge Havalian & Galliyat Circle'}
                </h4>
                <p className="text-xs text-slate-500 leading-snug">
                  {language === 'ur'
                    ? 'مری روڈ، حویلیاں، اور گلیات سیاحتی کوریڈور پر فیلڈ آپریشنز'
                    : 'Field operations on Murree Road, Havalian, and Galiyat tourist corridor.'}
                </p>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center text-brand-blue" aria-hidden="true">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Level 4: Specialized Support Units */}
            <div className="p-6 rounded-3xl bg-brand-lime-50 border-2 border-brand-lime text-center shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5 text-brand-lime" />
                <span>{language === 'ur' ? 'سطح 4: پبلک سروس و سپیشل یونٹس' : 'Level 04: Public Facilitation & Special Units'}</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark">
                {language === 'ur' ? 'عوامی خدمات، ایجوکیشن و ایمرجنسی ہیلپ لائن' : 'Public Guidance, Traffic Education & 1915 Helpline'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-brand-lime/60 font-semibold text-slate-700">
                  {language === 'ur' ? 'کمانڈ اینڈ کنٹرول' : 'Command & Control'}
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-brand-lime/60 font-semibold text-slate-700">
                  {language === 'ur' ? 'لائسنسنگ برانچ' : 'Licensing Branch'}
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-brand-lime/60 font-semibold text-slate-700">
                  {language === 'ur' ? 'فیلڈ آپریشنز' : 'Field Operations'}
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-brand-lime/60 font-semibold text-slate-700">
                  {language === 'ur' ? 'ٹریفک ایجوکیشن' : 'Traffic Education'}
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Operational Methodology Section */}
      <section className="py-14 bg-brand-light-bg border-t border-brand-light-border">
        <PageContainer>
          <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-brand-light-border p-8 shadow-sm text-center space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-brand-dark">
              {language === 'ur' ? 'پیشہ ورانہ فیلڈ کارکردگی کا عزم' : 'Operational Readiness Commitment'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'ur'
                ? 'ٹریفک وارڈن ایبٹ آباد کی تنظیمی ساخت کو اس طرح ترتیب دیا گیا ہے کہ ہنگامی حالات، حادثات یا سیاحتی دباؤ کی صورت میں فوری رسپانس دیا جا سکے اور عوام کو ہر ممکن مدد فراہم ہو۔'
                : 'The organizational design balances authoritative enforcement with responsive public service, ensuring rapid escalation, real-time choke point clearance, and continuous communication across District Abbottabad.'}
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link
                to="/about/officers"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-600 transition-colors"
              >
                <span>{language === 'ur' ? 'افسران کی مکمل ڈائرکٹری' : 'View Officers Directory'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default Organization;
