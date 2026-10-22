import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  Quote,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import officerMsgImg from '/Officer Message Image.jpg';
import digImg from '/DIG Nazeer Jahanzeb Khan updated image.jpg';
import dpoImg from '/DPO Haroon Rasheed Updated.jpg';
import logoImg from '/Traffic-Logo-Updated.png';

export const OfficersMessage: React.FC = () => {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? "افسر کا پیغام | ٹریفک وارڈن ایبٹ آباد"
        : "Officer's Message | Traffic Warden Abbottabad";
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
              { label: "Officer's Message", labelUrdu: 'افسر کا پیغام', path: '/about/officers-message' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
              <span>{language === 'ur' ? 'قیادت کا پیغام' : "LEADERSHIP DISPATCH"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'افسر کا خصوصی پیغام' : "OFFICER'S MESSAGE"}
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'محکمہ ٹریفک وارڈن ایبٹ آباد کی قیادت کی جانب سے عوام الناس، مسافروں اور سیاحوں کے نام پیغام'
                : 'A message on discipline, public facilitation and road safety from the departmental leadership.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Main Editorial Message Section */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Officer Photograph & Official Bio Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="sticky top-24">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-light-border bg-slate-900 group">
                  <div className="aspect-[3.5/4] overflow-hidden">
                    <img
                      src={officerMsgImg}
                      alt="Officer's Message"
                      className="w-full h-full object-cover object-[65%_35%] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Officer Credentials Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-lime text-brand-dark text-[11px] font-extrabold uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{language === 'ur' ? 'قیادت کا پیغام' : 'Leadership Message'}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {language === 'ur' ? 'ٹریفک وارڈن ایبٹ آباد' : 'Traffic Warden Abbottabad'}
                    </h2>
                    <p className="text-xs font-bold text-brand-lime tracking-wide">
                      {language === 'ur' ? 'خیبر پختونخوا پولیس' : 'Khyber Pakhtunkhwa Police'}
                    </p>
                    <p className="text-[11px] text-white/70">
                      {language === 'ur' ? 'سرکاری خطاب' : 'Official Communique'}
                    </p>
                  </div>
                </div>

                {/* Official Departmental Crest & Contact Quick Info */}
                <div className="mt-6 p-5 rounded-2xl bg-brand-light-bg border border-brand-light-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={logoImg}
                      alt="Traffic Warden Abbottabad Crest"
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <div className="text-xs font-bold text-brand-dark">
                        {language === 'ur' ? 'ہیڈکوارٹر ٹریفک پولیس' : 'Traffic Police HQ'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {language === 'ur' ? 'ضلع ایبٹ آباد' : 'District Abbottabad'}
                      </div>
                    </div>
                  </div>
                  <a
                    href="tel:1915"
                    className="px-3.5 py-1.5 rounded-full bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-600 transition-colors flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-brand-lime" />
                    <span>1915</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Letter */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'سرکاری خطاب' : 'OFFICIAL COMMUNIQUE'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight leading-tight">
                {language === 'ur'
                  ? 'سڑکوں پر نظم و ضبط اور انسانی جان کا تحفظ ہماری اولین ترجیح ہے'
                  : 'Fostering Discipline, Civility and Road Safety Across Our Scenic District'}
              </h2>

              {/* Dignified Government Appropriate Letter Body */}
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p className="font-semibold text-slate-900 text-base">
                  {language === 'ur'
                    ? 'محترم شہریوں، سیاحوں اور معزز ڈرائیور حضرات، السلام علیکم!'
                    : 'Dear citizens, commuters, and visitors to District Abbottabad,'}
                </p>

                <p>
                  {language === 'ur'
                    ? 'ایبٹ آباد خیبر پختونخوا کا ایک تاریخی اور جغرافیائی طور پر انتہائی اہم شہر ہے، جو ہزارہ ڈویژن، گلیات اور شاہراہ قراقرم کا گیٹ وے ہے۔ ہر روز ہزاروں مقامی گاڑیاں اور ملک بھر سے لاکھوں سیاح ان شاہراہوں سے گزرتے ہیں، جس کے باعث ٹریفک کو منظم اور محفوظ رکھنا ایک ہمہ وقت چیلنج اور عظیم فریضہ ہے۔'
                    : 'Abbottabad holds a unique place in Khyber Pakhtunkhwa as both a thriving commercial centre and the principal gateway to the scenic valleys of Hazara, Galyat, and the Karakoram Highway. With hundreds of thousands of commuters, commercial vehicles, and visiting tourists traversing our corridors every season, ensuring disciplined and safe transit is our highest calling.'}
                </p>

                <blockquote className="my-6 p-5 sm:p-6 rounded-2xl bg-brand-blue-50 border-l-4 border-brand-blue text-brand-dark italic font-medium text-base sm:text-lg space-y-2">
                  <p>
                    “
                    {language === 'ur'
                      ? 'ٹریفک پولیس کا اصل مقصد صرف چالان کرنا نہیں بلکہ شہریوں کو ٹریفک قوانین کے احترام پر آمادہ کرنا اور قیمتی انسانی جانوں کو حادثات سے بچانا ہے۔'
                      : 'The true purpose of our traffic force is not merely punitive enforcement, but educating citizens, winning their voluntary compliance, and safeguarding precious human lives.'}
                    ”
                  </p>
                  <footer className="text-xs font-bold text-brand-blue not-italic">
                    — SSP Muhammad Suleman, District Traffic Police Abbottabad
                  </footer>
                </blockquote>

                <p>
                  {language === 'ur'
                    ? 'ہماری فورس کا ہر ٹریفک وارڈن سڑک پر حکومت اور قانون کا نمائندہ ہے جس کی بنیادی ڈیوٹی شہریوں کی بلا تفریق مدد کرنا، ٹریفک کے بہاؤ کو رواں رکھنا، اور خوش اخلاقی کے ساتھ قوانین پر عمل درآمد کروانا ہے۔ ہم نے جدید ٹیکنالوجی، سمارٹ مانیٹرنگ اور جدید پیٹرولنگ کے ذریعے ٹریفک مینجمنٹ کو مزید موثر اور شفاف بنایا ہے۔'
                    : 'Every traffic warden in the field represents the authority of the state and the spirit of public service. Our officers are trained to act with courtesy, patience, and firmness. We have embraced modern mobility units, heavy patrol bikes, and digitized routing to make our operations responsive, transparent, and citizen-friendly.'}
                </p>

                <p>
                  {language === 'ur'
                    ? 'میں تمام شہریوں، ڈرائیورز اور خاص طور پر موٹرسائیکل سواروں سے التماس کرتا ہوں کہ وہ ہیلمٹ کا لازمی استعمال کریں، سیٹ بیلٹ باندھیں، اوور اسپیڈنگ سے گریز کریں اور سڑک پر پیدل چلنے والوں کو عزت دیں۔ آپ کا باہمی تعاون ہی ہمارے اس خوبصورت ضلع کو محفوظ اور پرامن بنا سکتا ہے۔'
                    : 'I earnestly urge every driver, rider, and pedestrian to join hands with us. Fasten your seatbelts, wear certified safety helmets, obey lane discipline, and extend courtesy to fellow road users. Road safety is a collective civil duty, and your cooperation is our greatest strength.'}
                </p>
              </div>

              {/* Key Strategic Commitments */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                  {language === 'ur' ? 'ہماری کلیدی ترجیحات' : 'Key Strategic Priorities'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-light-bg border border-brand-light-border">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                    <span className="font-semibold text-slate-800">
                      {language === 'ur' ? 'سیاحتی سیزن میں بلا رکاوٹ روانی' : 'Smooth Tourist Corridor Movement'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-light-bg border border-brand-light-border">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                    <span className="font-semibold text-slate-800">
                      {language === 'ur' ? 'صفر روڈ حادثات کا ہدف' : 'Zero Fatality Prevention Target'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-light-bg border border-brand-light-border">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                    <span className="font-semibold text-slate-800">
                      {language === 'ur' ? 'شفاف اور ڈیجیٹل چالان سسٹم' : 'Fair & Transparent Enforcement'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-light-bg border border-brand-light-border">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                    <span className="font-semibold text-slate-800">
                      {language === 'ur' ? '24/7 فوری ایمرجنسی ریسپانس' : '24/7 Helpline Rapid Action'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Seal and Sign-off */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-serif italic text-lg text-brand-blue font-bold tracking-wide">
                    Muhammad Suleman
                  </div>
                  <div className="text-xs font-bold text-brand-dark">
                    Senior Superintendent of Police (Traffic)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    District Abbottabad, KP Police
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/about/officers"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue text-white font-semibold text-xs hover:bg-brand-blue-600 transition-colors shadow-sm"
                  >
                    <span>{language === 'ur' ? 'تمام افسران سے ملیے' : 'Meet Other Officers'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Senior Leadership Row (Authentic photos from project) */}
      <section className="py-14 bg-brand-light-bg border-t border-brand-light-border">
        <PageContainer>
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-brand-dark">
              {language === 'ur' ? 'ہزارہ رینج و ضلعی پولیس قیادت' : 'Command Leadership Supervision'}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {language === 'ur'
                ? 'خیبر پختونخوا پولیس کی سینئر قیادت کے زیرِ نگرانی'
                : 'Under the guidance and supervision of Khyber Pakhtunkhwa Police senior leadership.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-brand-light-border shadow-sm">
<img
                      src={digImg}
                      alt="DIG Hazara Jahanzaib Nazeer Khan"
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
              <div>
                <div className="text-xs text-brand-blue font-bold uppercase">
                  {language === 'ur' ? 'ڈپٹی انسپکٹر جنرل' : 'Deputy Inspector General'}
                </div>
                <div className="text-sm font-bold text-brand-dark">
                  {language === 'ur' ? 'جہانزیب نزیر خان' : 'Jahanzaib Nazeer Khan'}
                </div>
                <div className="text-xs text-slate-500">
                  {language === 'ur' ? 'ہزارہ رینج پولیس' : 'Hazara Range Police'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-brand-light-border shadow-sm">
<img
                    src={dpoImg}
                    alt="DPO Abbottabad Haroon Rasheed"
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
              <div>
                <div className="text-xs text-brand-blue font-bold uppercase">
                  {language === 'ur' ? 'ڈسٹرکٹ پولیس آفیسر' : 'District Police Officer'}
                </div>
                <div className="text-sm font-bold text-brand-dark">
                  {language === 'ur' ? 'ہارون رشید' : 'Haroon Rasheed'}
                </div>
                <div className="text-xs text-slate-500">
                  {language === 'ur' ? 'ضلع ایبٹ آباد' : 'District Abbottabad'}
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default OfficersMessage;
