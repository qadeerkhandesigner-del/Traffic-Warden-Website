import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import logoImg from '/Traffic-Logo-Updated.png';
import {
  ArrowRight,
  ArrowLeft,
  Ban,
  BookOpen,
  Building,
  Car,
  CheckCircle2,
  CircleAlert,
  FileText,
  Gauge,
  GraduationCap,
  HeartHandshake,
  IdCard,
  Info,
  KeyRound,
  Lightbulb,
  ListChecks,
  MapPin,
  OctagonAlert,
  Phone,
  ScrollText,
  ShieldCheck,
  Smartphone,
  Siren,
  TriangleAlert,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

/** Sign charts served from `public/Trafic Education/`. */
const SIGN_IMAGES = [
  {
    id: 'lazmi',
    icon: OctagonAlert,
    en: 'Regulatory / Mandatory Signs',
    ur: 'لازمی / ریگولیٹری اشارے',
    image: '/Trafic%20Education/Lazmi-Ishary.png',
    altEn: 'Chart of regulatory (mandatory) traffic signs',
    altUr: 'لازمی ٹریفک اشاریوں کا چارٹ',
  },
  {
    id: 'ahteyati',
    icon: TriangleAlert,
    en: 'Warning Signs',
    ur: 'انتباہی اشارے',
    image: '/Trafic%20Education/Ahteyati-Ishary.png',
    altEn: 'Chart of warning traffic signs',
    altUr: 'انتباہی ٹریفک اشاریوں کا چارٹ',
  },
  {
    id: 'mahloomati',
    icon: Info,
    en: 'Informatory Signs',
    ur: 'معلوماتی اشارے',
    image: '/Trafic%20Education/mahloomati-Ishary.png',
    altEn: 'Chart of informatory traffic signs',
    altUr: 'معلوماتی ٹریفک اشاریوں کا چارٹ',
  },
];

const ROAD_SIGN_TOPICS = [
  {
    id: 'regulatory',
    icon: OctagonAlert,
    en: 'Regulatory Signs — restrictions, prohibitions, and mandatory instructions.',
    ur: 'لازمی اشارے — پابندیاں، منع کرنے والی ہدایات اور لازمی احکام۔',
  },
  {
    id: 'warning',
    icon: TriangleAlert,
    en: 'Warning Signs — potential hazards and changes in road conditions.',
    ur: 'انتباہی اشارے — ممکنہ خطرات اور سڑک کی حالتوں میں تبدیلی۔',
  },
  {
    id: 'informatory',
    icon: Info,
    en: 'Informatory Signs — directions, destinations, facilities, and other useful information.',
    ur: 'معلوماتی اشارے — سمت، منازل، سہولیات اور دیگر مفید معلومات۔',
  },
  {
    id: 'markings',
    icon: MapPin,
    en: 'Road Markings — lane lines, stop lines, pedestrian crossings, and other markings.',
    ur: 'سڑک کی نشان دہی — لین کی لکیریں، اسٹاپ لائن، پیدل چلنے والوں کی کراسنگ اور دیگر نشان۔',
  },
];

const TRAFFIC_RULES = [
  {
    id: 'speed',
    icon: Gauge,
    en: 'Follow posted speed limits and adjust your speed to road and weather conditions.',
    ur: 'مقررہ رفتار کی حد پر عمل کریں اور سڑک اور موسم کے حالات کے مطابق رفتار کم یا زیادہ کریں۔',
  },
  {
    id: 'signals',
    icon: Siren,
    en: 'Obey traffic signals, road signs, and instructions from authorized traffic personnel.',
    ur: 'ٹریفک سگنل، سڑک کے اشارے اور مجاز ٹریفک اہلکاروں کی ہدایات کی تعمیل کریں۔',
  },
  {
    id: 'seat-belt',
    icon: ShieldCheck,
    en: 'Wear a seat belt and ensure that passengers use appropriate safety restraints.',
    ur: 'سیٹ بیلٹ باندھیں اور یقین بنائیں کہ مسافر مناسب تحفظی سامان استعمال کریں۔',
  },
  {
    id: 'helmet',
    icon: ShieldCheck,
    en: 'Wear a properly fastened helmet when riding a motorcycle.',
    ur: 'موٹر سائیکل سوار ہوتے وقت مناسب طور پر بند کیا ہوا ہیلمٹ لگائیں۔',
  },
  {
    id: 'indicators',
    icon: Car,
    en: 'Use indicators before turning, changing lanes, or moving away from the roadside.',
    ur: 'جھکاؤ، لین تبدیل کرنے یا سڑک کنارے سے نکلنے سے پہلے اشاریہ (انڈیکیٹر) استعمال کریں۔',
  },
  {
    id: 'distance',
    icon: Gauge,
    en: 'Maintain a safe following distance from the vehicle ahead.',
    ur: 'آگے والی گاڑی سے محفوظ فاصلہ برقرار رکھیں۔',
  },
  {
    id: 'pedestrians',
    icon: HeartHandshake,
    en: 'Give way to pedestrians at designated crossings.',
    ur: 'مقررہ کراسنگ پر پیدل چلنے والوں کو قانوناً راستہ دیں۔',
  },
  {
    id: 'mobile',
    icon: Ban,
    en: 'Never use a mobile phone in a way that distracts you while driving.',
    ur: 'ڈرائیو کے دوران موبائل فون کا ایسا استعمال نہ کریں جو آپ کی توجہ منحرک کرے۔',
  },
  {
    id: 'influence',
    icon: Ban,
    en: 'Never drive under the influence of alcohol or impairing substances.',
    ur: 'شراب یا حواس کمزور کرنے والی اشیاء کے زیر اثر گاڑی کبھی نہ چلائیں۔',
  },
  {
    id: 'overtaking',
    icon: Ban,
    en: 'Avoid dangerous overtaking and never overtake where prohibited.',
    ur: 'خطرناک اوورٹیکنگ سے پرہیز کریں اور جہاں پابندی ہو وہاں کبھی اوور ٹیک نہ کریں۔',
  },
  {
    id: 'lanes',
    icon: MapPin,
    en: 'Keep to the appropriate lane and follow road markings.',
    ur: 'درست لین میں رہیں اور سڑک کی نشان دہی پر عمل کریں۔',
  },
  {
    id: 'emergency',
    icon: Siren,
    en: 'Give way to emergency vehicles as required by traffic rules.',
    ur: 'ٹریفک ضابطوں کے مطابق ایمرجنسی گاڑیوں کو راستہ دیں۔',
  },
];

const VEHICLE_CHECKS = [
  {
    id: 'seat',
    icon: Car,
    en: 'Adjust the driving seat and steering position.',
    ur: 'ڈرائیونگ سیٹ اور اسٹیرنگ کی پوزیشن ایڈجسٹ کریں۔',
  },
  {
    id: 'mirrors',
    icon: Car,
    en: 'Adjust the rear-view and side mirrors.',
    ur: 'ریئر ویو اور سائیڈ مرر ایڈجسٹ کریں۔',
  },
  {
    id: 'belt',
    icon: ShieldCheck,
    en: 'Fasten your seat belt or secure your motorcycle helmet.',
    ur: 'سیٹ بیلٹ باندھیں یا موٹر سائیکل کا ہیلمٹ محفوظ کریں۔',
  },
  {
    id: 'doors',
    icon: Car,
    en: 'Check that the doors are properly closed.',
    ur: 'دروازے اچھی طرح بند ہیں یہ چیک کریں۔',
  },
  {
    id: 'controls',
    icon: KeyRound,
    en: 'Familiarize yourself with the accelerator, brake, clutch (where applicable), gear selector, and parking brake.',
    ur: 'ایکسیلریٹر، بریک، کلچ (جہاں ہو)، گیئر سلیکٹر اور پارکنگ بریک کے بارے میں مکمل واقفیت حاصل کریں۔',
  },
  {
    id: 'lights',
    icon: Lightbulb,
    en: 'Check the indicators, brake lights, headlights, and tyres.',
    ur: 'انڈیکیٹر، بریک لائٹس، ہیڈ لائٹس اور ٹائیروں کا چیک کریں۔',
  },
  {
    id: 'condition',
    icon: ShieldCheck,
    en: 'Ensure that the vehicle is in a safe condition for driving.',
    ur: 'یقین بنائیں کہ گاڑی ڈرائیو کے لیے محفوظ حالت میں ہے۔',
  },
];

const PRACTICAL_SKILLS = [
  {
    id: 'start-stop',
    icon: Car,
    en: 'Starting and Stopping',
    ur: 'چلانا اور روکنا',
    detailEn:
      'Start the vehicle safely, check your surroundings, and move off only when it is safe. Stop smoothly at designated stop lines and where traffic conditions require.',
    detailUr:
      'گاڑی محفوظ طریقے سے چلائیں، آس پاس کا جائزہ لیں اور صرف محفوظ ہونے پر آگے بڑھیں۔ سٹاپ لائن اور جہاں ٹریفک کی ضرورت ہو وہاں نرمی سے رکیں۔',
  },
  {
    id: 'steering',
    icon: Car,
    en: 'Steering and Vehicle Control',
    ur: 'اسٹیرنگ اور گاڑی پر قبضہ',
    detailEn:
      'Maintain proper steering control and keep the vehicle stable within the appropriate lane. Avoid sudden or unnecessary movements.',
    detailUr:
      'درست اسٹیرنگ کنٹرول برقرار رکھیں اور گاڑی کو درست لین میں مستحکم رکھیں۔ اچانک یا غیر ضروری حرکت سے پرہیز کریں۔',
  },
  {
    id: 'turning',
    icon: Car,
    en: 'Turning and Lane Changing',
    ur: 'مڑنا اور لین تبدیل کرنا',
    detailEn:
      'Check mirrors, signal in advance, observe blind spots where applicable, and move only when the manoeuvre is safe.',
    detailUr:
      'مرر دیکھیں، پہلے انڈیکیٹر دکھائیں، جہاں لاگو ہو بلائنڈ اسپاٹ بھی دیکھیں اور اسی صورت میں حرکت کریں جب مینوور محفوظ ہو۔',
  },
  {
    id: 'reversing',
    icon: Car,
    en: 'Reversing',
    ur: 'پچھلے قدم',
    detailEn:
      'Reverse slowly and under control. Check all around the vehicle and do not rely solely on mirrors or a reversing camera.',
    detailUr:
      'آہستہ اور قابو میں ریورس کریں۔ گاڑی کے چاروں اطراف کو دیکھیں اور صرف مرر یا ریورسنگ کیمرے پر انحصار نہ کریں۔',
  },
  {
    id: 'parking',
    icon: MapPin,
    en: 'Parking',
    ur: 'پارکنگ',
    detailEn:
      'Practice safe parking, including parallel or reverse parking where required. Avoid obstructing traffic, pedestrian paths, entrances, or emergency access.',
    detailUr:
      'محفوظ پارکنگ کی مشق کریں، بشمول پیرالل اور ریورس پارکنگ جہاں ضروری ہو۔ ٹریفک، پیدل راستوں، داخلوں یا ایمرجنسی رسائی میں رکاوٹ نہ بنیں۔',
  },
  {
    id: 'intersections',
    icon: Siren,
    en: 'Intersections and Roundabouts',
    ur: 'چوراہے اور راؤنڈ ابیوٹ',
    detailEn:
      'Reduce speed as appropriate, observe signs and signals, select the correct lane, and give way according to applicable traffic rules.',
    detailUr:
      'مناسب رفتار کم کریں، اشارے و سگنل دیکھیں، درست لین منتخب کریں اور ٹریفک ضابطوں کے مطابق راستہ دیں۔',
  },
];

const TEST_CHECKLIST = [
  {
    id: 'signs',
    en: 'Review the meanings of important road signs.',
    ur: 'اہم سڑک کے اشاروں کے معنی دوبارہ دیکھ لیں۔',
  },
  {
    id: 'rules',
    en: 'Study traffic signals, road markings, and right-of-way rules.',
    ur: 'ٹریفک سگنل، سڑک کی نشان دہی اور راستہ دینے کے قواعد پڑھیں۔',
  },
  {
    id: 'practice',
    en: 'Practice starting, stopping, turning, reversing, and parking.',
    ur: 'گاڑی چلانے، روکنے، مڑنے، ریورس اور پارکنگ کی مشق کریں۔',
  },
  {
    id: 'mirrors',
    en: 'Learn to use mirrors and indicators correctly.',
    ur: 'مرر اور انڈیکیٹر کے درست استعمال سیکھیں۔',
  },
  {
    id: 'speed',
    en: 'Practice maintaining a safe speed and following distance.',
    ur: 'محفوظ رفتار اور آگے کے فاصلے کو برقرار رکھنے کی مشق کریں۔',
  },
  {
    id: 'vehicle',
    en: 'Familiarize yourself with the vehicle you will use for the test.',
    ur: 'جس گاڑی پر ٹیسٹ دینا ہے اس سے پہلے سے واقفیت حاصل کریں۔',
  },
  {
    id: 'documents',
    en: 'Carry your original CNIC, learner permit, and any other documents required by the licensing authority.',
    ur: 'اصل شناختی کارڈ، لرنر پرمٹ اور لائسنس اہلکاروں کی مطلوبہ دیگر دستاویزات ساتھ لائیں۔',
  },
  {
    id: 'confirm',
    en: 'Confirm your test date, reporting time, fees, and current requirements with the relevant Driving Licence Branch.',
    ur: 'اپنی ٹیسٹ تاریخ، وقت، فیس اور تازہ تقاضوں کی تصدیق متعلقہ ڈرائیونگ لائسنس برانچ سے کریں۔',
  },
];

const COMMON_MISTAKES = [
  {
    id: 'mirrors',
    en: 'Failing to observe mirrors and surrounding traffic.',
    ur: 'مرر اور اطراف ٹریفک نہ دیکھنا۔',
  },
  {
    id: 'indicators',
    en: 'Forgetting to use indicators.',
    ur: 'انڈیکیٹر استعمال کرنا بھول جانا۔',
  },
  {
    id: 'signs',
    en: 'Ignoring traffic signs, signals, or road markings.',
    ur: 'ٹریفک اشارے، سگنل یا سڑک کی نشان دہی نظر انداز کرنا۔',
  },
  {
    id: 'stop-line',
    en: 'Crossing a stop line or failing to stop when required.',
    ur: 'اسٹاپ لائن پار کرنا یا ضرورت پڑنے پر رک نہ جانا۔',
  },
  {
    id: 'reversing',
    en: 'Losing control while reversing or parking.',
    ur: 'ریورس یا پارکنگ کے دوران کنٹرول کھو دینا۔',
  },
  {
    id: 'unsafe-turns',
    en: 'Making unsafe turns or lane changes.',
    ur: 'غیر محفوظ مڑنے یا لین تبدیل کرنا۔',
  },
  {
    id: 'speed',
    en: 'Driving too fast for the road conditions.',
    ur: 'سڑک کی حالت کے مطابق رفتار بہت زیادہ رکھنا۔',
  },
  {
    id: 'give-way',
    en: 'Failing to give way when required.',
    ur: 'ضرورت پڑنے پر راستہ نہ دینا۔',
  },
  {
    id: 'checks',
    en: 'Starting the vehicle without completing basic safety checks.',
    ur: 'بنیادی حفاظتی چیک مکمل کیے بغیر گاڑی چلانا۔',
  },
  {
    id: 'panic',
    en: 'Panicking and making sudden, unsafe movements.',
    ur: 'گھبرا کر اچانک اور غیر محفوظ حرکت کرنا۔',
  },
];

const RELATED_LINKS = [
  {
    id: 'traffic-signs',
    icon: BookOpen,
    en: 'Traffic Signs Guide',
    ur: 'ٹریفک اشارے کی گائیڈ',
    path: '/traffic-education',
  },
  {
    id: 'learner-permit',
    icon: FileText,
    en: 'Learner Permit',
    ur: 'لرنر پرمٹ',
    path: '/services/driving-license/learner-permit',
  },
  {
    id: 'new-license',
    icon: IdCard,
    en: 'New Driving License',
    ur: 'نیا ڈرائیونگ لائسنس',
    path: '/services/driving-license/new',
  },
  {
    id: 'driving-school',
    icon: GraduationCap,
    en: 'Traffic Police Driving School',
    ur: 'ٹریفک پولیس ڈرائیونگ سکول',
    path: '/services/driving-school',
  },
  {
    id: 'offense-list',
    icon: ScrollText,
    en: 'Offense List',
    ur: 'خلاف ورزیوں کی فہرست',
    path: '/traffic-education/offense-list',
  },
  {
    id: 'raabta-app',
    icon: Smartphone,
    en: 'Raabta App Traffic Police',
    ur: 'رابطہ ایپ ٹریفک پولیس',
    path: '/services/driving-license/raabta-app',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const DrivingTestGuide: React.FC = () => {
  const { t, language, isRTL } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ڈرائیونگ ٹیسٹ گائیڈ | ٹریفک وارڈن ایبٹ آباد'
        : 'Driving Test Guide | Traffic Warden Abbottabad';
  }, [language]);

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  /* Shared section header */
  const SectionBadge: React.FC<{
    id: string;
    icon: React.ElementType;
    en: string;
    ur: string;
    tone?: 'blue' | 'green' | 'red';
  }> = ({ id, icon: Icon, en, ur, tone = 'blue' }) => {
    const tones = {
      blue: 'border-brand-blue-100 bg-brand-blue-50 text-brand-blue',
      green: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      red: 'border-red-200 bg-red-50 text-red-600',
    } as const;
    return (
      <div
        id={id}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider sm:text-xs ${tones[tone]}`}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate">{t(en, ur)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-light-bg text-brand-dark">
      {/* ---------------------------------- HERO ---------------------------------- */}
      <section className="relative overflow-hidden border-b border-[#0000aa] bg-[#000080] pt-8 pb-12 text-white sm:pt-12 sm:pb-16">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute end-0 top-0 h-56 w-56 rounded-full bg-brand-blue/30 blur-3xl sm:h-80 sm:w-80"
          aria-hidden="true"
        />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Education', labelUrdu: 'تعلیم' },
              { label: 'Driving Test Guide', labelUrdu: 'ڈرائیونگ ٹیسٹ گائیڈ' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
              <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {t('Education — Driving Test Guide', 'تعلیم — ڈرائیونگ ٹیسٹ گائیڈ')}
              </span>
            </div>

            <h1 className="text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t('DRIVING TEST GUIDE', 'ڈرائیونگ ٹیسٹ گائیڈ')}
            </h1>

            <p className="text-lg font-bold text-brand-lime sm:text-xl md:text-2xl">
              {t(
                'Learn the Rules. Practice Safe Driving. Drive with Confidence.',
                'قوانین سیکھیں۔ محفوظ ڈرائیونگ کی مشق کریں۔ اعتماد سے ڈرائیو کریں۔'
              )}
            </p>

            <p className="max-w-3xl text-sm font-medium leading-relaxed text-white/85 sm:text-base">
              {t(
                'Welcome to the Driving Test Guide of Traffic Warden Abbottabad. This guide is designed to help learner drivers understand essential traffic rules, recognize road signs, develop safe driving habits, and prepare for their driving licence test.',
                'ٹریفک وارڈن ایبٹ آباد کی ڈرائیونگ ٹیسٹ گائیڈ میں خوش آمدید۔ یہ گائیڈ لرنر ڈرائیورز کو بنیادی ٹریفک قواعد سمجھنے، سڑک کے اشارے پہچاننے، محفوظ ڈرائیونگ کی عادات بنانے اور ڈرائیونگ لائسنس ٹیسٹ کی تیاری میں مدد کے لیے ترتیب دی گئی ہے۔'
              )}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <BookOpen className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Road Signs', 'سڑک کے اشارے')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <Car className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Vehicle Control', 'گاڑی پر کنٹرول')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <ListChecks className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Tips & Checklist', 'مشورے اور چیک لسٹ')}
              </span>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* --------------------------------- BODY --------------------------------- */}
      <PageContainer>
        <div className="space-y-10 py-8 sm:space-y-14 sm:py-12 lg:py-16">
          {/* -------------------------------- INTRO -------------------------------- */}
          <section aria-labelledby="intro-heading">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-4 rounded-2xl border border-brand-light-border bg-white p-5 leading-relaxed text-slate-600 sm:p-6 lg:col-span-2">
                <p className="text-sm sm:text-base">
                  {t(
                    'Whether you are applying for your first driving licence or improving your driving skills, understanding road signs, traffic regulations, and vehicle control is essential for becoming a responsible driver.',
                    'چاہے آپ پہلا ڈرائیونگ لائسنس بنوا رہے ہو یا اپنی ڈرائیونگ صلاحتیں بہتر کر رہے ہو، ذمہ دار ڈرائیور بننے کے لیے سڑک کے اشاروں، ٹریفک ضابطوں اور گاڑی پر کنٹرول کو سمجھنا ضروری ہے۔'
                  )}
                </p>
              </div>

              {/* Remember card */}
              <div className="flex flex-col justify-center rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white sm:h-11 sm:w-11">
                    <CircleAlert className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2
                    id="intro-heading"
                    className="text-base font-extrabold uppercase tracking-wide text-amber-700 sm:text-lg"
                  >
                    {t('Remember', 'یاد رکھیں')}
                  </h2>
                </div>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-brand-dark sm:text-base">
                  {t(
                    'Safe driving is not just about passing a test — it is about protecting lives.',
                    'محفوظ ڈرائیونگ صرف ٹیسٹ پاس کرنے کا نام نہیں — یہ جانوں کی حفاظت کا نام ہے۔'
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* ----------------------- 1. UNDERSTAND ROAD SIGNS ---------------------- */}
          <section aria-labelledby="signs-heading">
            <div className="mb-5">
              <SectionBadge
                id="signs-badge"
                icon={BookOpen}
                en="Step 1 — Understand Road Signs"
                ur="مرحلہ 1 — سڑک کے اشارے سمجھیں"
              />
              <h2
                id="signs-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Understand Road Signs', 'سڑک کے اشارے سمجھیں')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Road signs provide important information, warnings, and instructions to road users. Learning to recognize and understand these signs is an essential part of driving test preparation. Study the road sign images provided in our Traffic Signs section and understand the meaning of each sign before appearing for your test.',
                  'سڑک کے اشارے روڈ یوزرز کو اہم معلومات، انتباہات اور ہدایات فراہم کرتے ہیں۔ ان اشاروں کو پہچاننا اور سمجھنا ٹیسٹ کی تیاری کا بنیادی حصہ ہے۔ ہمارے ٹریفک اشاروں کے حصے میں دی گئی تصاویر کا مطالعہ کریں اور ٹیسٹ سے پہلے ہر اشارے کا مطلب سمجھ لیں۔'
                )}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-5">
              {/* Attention list */}
              <div className="space-y-3 lg:col-span-2">
                <div className="space-y-2.5">
                  {ROAD_SIGN_TOPICS.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 rounded-2xl border border-brand-light-border bg-white p-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {t(item.en, item.ur)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Preparation tip */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                      <Lightbulb className="h-4.5 w-4.5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold uppercase tracking-wide text-amber-700">
                        {t('Preparation Tip', 'تیاری کا مشورہ')}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-slate-700">
                        {t(
                          'Do not memorize the appearance of a sign alone. Understand what action you must take when you encounter it on the road.',
                          'صرف اشارے کی شکل یاد کر ہی نہ رہیں۔ یہ سمجھیں کہ سڑک پر اس کے سامنے آنے پر آپ کو کیا کرنا چاہیے۔'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sign images — all three side by side */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-3 sm:grid-cols-3">
                {SIGN_IMAGES.map((sign) => (
                  <div
                    key={sign.id}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-light-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
                  >
                    <figure className="flex h-full flex-col p-3 sm:p-4">
                      {/* Caption on top */}
                      <figcaption className="mb-2 flex items-center justify-center gap-2 text-center text-xs font-semibold text-white sm:text-sm">
                        <span
                          className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 ${
                            sign.id === 'lazmi'
                              ? 'bg-red-600'
                              : sign.id === 'ahteyati'
                                ? 'bg-amber-500 text-amber-950'
                                : 'bg-sky-600'
                          }`}
                        >
                          <sign.icon
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          {t(sign.en, sign.ur)}
                        </span>
                      </figcaption>
                      {/* Image below caption */}
                      <div className="flex flex-1 items-center justify-center rounded-xl border border-brand-light-border bg-slate-50 p-2">
                        <img
                          src={sign.image}
                          alt={language === 'ur' ? sign.altUr : sign.altEn}
                          loading="lazy"
                          className="w-full rounded-lg object-contain"
                        />
                      </div>
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ----------------------- 2. ESSENTIAL TRAFFIC RULES -------------------- */}
          <section aria-labelledby="rules-heading">
            <div className="mb-5">
              <SectionBadge
                id="rules-badge"
                icon={ShieldCheck}
                en="Step 2 — Essential Traffic Rules"
                ur="مرحلہ 2 — بنیادی ٹریفک قواعد"
              />
              <h2
                id="rules-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Essential Traffic Rules', 'بنیادی ٹریفک قواعد')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Every driver must understand and follow traffic rules to ensure the safety of all road users.',
                  'تمام روڈ یوزرز کی حفاظت کے لیے ہر ڈرائیور کو ٹریفک قواعد سمجھنے اور ان پر عمل کرنا ضروری ہے۔'
                )}
              </p>
            </div>

            <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {TRAFFIC_RULES.map((rule, index) => (
                <li
                  key={rule.id}
                  className="flex items-start gap-3 rounded-2xl border border-brand-light-border bg-white p-4 transition-all duration-300 hover:border-brand-blue-300 hover:shadow-md"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700">{t(rule.en, rule.ur)}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ------------------ 3. VEHICLE FAMILIARIZATION & CHECKS ---------------- */}
          <section aria-labelledby="vehicle-heading">
            <div className="mb-5">
              <SectionBadge
                id="vehicle-badge"
                icon={Car}
                en="Step 3 — Vehicle Familiarization"
                ur="مرحلہ 3 — گاڑی سے واقفیت"
              />
              <h2
                id="vehicle-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Vehicle Familiarization and Safety Checks', 'گاڑی سے واقفیت اور حفاظتی چیک')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Before starting a vehicle, make sure you understand its basic controls and safety features.',
                  'گاڑی چلانے سے پہلے یقین بنائیں کہ آپ اس کے بنیادی کنٹرول اور حفاظتی خصوصیات سمجھتے ہیں۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {VEHICLE_CHECKS.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 rounded-2xl border border-brand-light-border bg-white p-4 transition-all duration-300 hover:border-brand-blue-300 hover:shadow-md ${
                    VEHICLE_CHECKS.length % 2 === 1 && index === VEHICLE_CHECKS.length - 1
                      ? 'sm:col-span-2'
                      : ''
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                    <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">{t(item.en, item.ur)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ------------------------ 4. PRACTICAL DRIVING SKILLS ------------------ */}
          <section aria-labelledby="skills-heading">
            <div className="mb-5">
              <SectionBadge
                id="skills-badge"
                icon={Car}
                en="Step 4 — Practical Driving Skills"
                ur="مرحلہ 4 — عملی ڈرائیونگ مہارتیں"
              />
              <h2
                id="skills-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Practical Driving Skills', 'عملی ڈرائیونگ مہارتیں')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'During driving practice, focus on developing smooth vehicle control, proper observation, and safe decision-making.',
                  'ڈرائیونگ کی مشق کے دوران نرم گاڑی کنٹرول، بھرپور مشاہدہ اور محفوظ فیصلہ سازی پر توجہ دیں۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRACTICAL_SKILLS.map((skill) => (
                <div
                  key={skill.id}
                  className="flex h-full flex-col rounded-2xl border border-brand-light-border bg-white p-5 transition-all duration-300 hover:border-brand-blue-300 hover:shadow-lg"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <skill.icon className="h-5 w-5 text-brand-lime" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-brand-dark sm:text-base">
                    {t(skill.en, skill.ur)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {t(skill.detailEn, skill.detailUr)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* --------------------- 5 & 6. CHECKLIST / MISTAKES -------------------- */}
          <section
            aria-labelledby="checklist-heading"
            className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
          >
            {/* Preparation checklist */}
            <div className="space-y-4">
              <h2
                id="checklist-heading"
                className="flex items-center gap-2 text-lg font-bold text-brand-dark sm:text-xl"
              >
                <ListChecks className="h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
                {t('How to Prepare for Your Driving Test', 'ٹیسٹ کے لیے تیاری کیسے کریں')}
              </h2>

              <div className="space-y-3">
                {TEST_CHECKLIST.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50 p-4"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-relaxed text-slate-700">{t(item.en, item.ur)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common mistakes */}
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-bold text-brand-dark sm:text-xl">
                <CircleAlert className="h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
                {t('Common Driving Test Mistakes to Avoid', 'ٹیسٹ کی عام غلطیاں جن سے بچیں')}
              </h2>

              <div className="space-y-3">
                {COMMON_MISTAKES.map((mistake, index) => (
                  <div
                    key={mistake.id}
                    className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {t(mistake.en, mistake.ur)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* -------------------- 7. RESPONSIBLE DRIVING STARTS -------------------- */}
          <section aria-labelledby="responsible-heading">
            <div className="rounded-3xl bg-brand-blue p-6 text-white sm:p-10">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 sm:h-16 sm:w-16">
                  <HeartHandshake className="h-7 w-7 text-brand-lime" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h2
                    id="responsible-heading"
                    className="text-lg font-extrabold sm:text-xl lg:text-2xl"
                  >
                    {t('Responsible Driving Starts with You', 'ذمہ دار ڈرائیونگ کا آغاز آپ سے ہے')}
                  </h2>
                  <p className="max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
                    {t(
                      'A driving licence comes with responsibility. Every road user deserves consideration, patience, and protection. Always remain alert, respect other road users, follow traffic regulations, and make safety your first priority.',
                      'ڈرائیونگ لائسنس ذمہ داری کے ساتھ آتا ہے۔ ہر روڈ یوزر کو احترام، صبر اور تحفظ کا مستحق ہے۔ ہمیشہ ہوشیار رہیں، دوسرے روڈ یوزرز کا احترام کریں، ٹریفک ضابطے کی تعمیل کریں اور سیفٹی کو پہلی ترجیح بنائیں۔'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------ RELATED SERVICES ----------------------------- */}
          <section aria-labelledby="related-heading">
            <div className="mb-5">
              <SectionBadge
                id="related-badge"
                icon={ListChecks}
                en="Related"
                ur="متعلقہ"
              />
              <h2
                id="related-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Related Services & Information', 'متعلقہ خدمات اور معلومات')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {RELATED_LINKS.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className="group flex h-full items-center gap-3 rounded-2xl border border-brand-light-border bg-white p-4 transition-all duration-300 hover:border-brand-blue-300 hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-brand-lime">
                    <link.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-brand-dark sm:text-base">
                    {t(link.en, link.ur)}
                  </span>
                  <ForwardArrow
                    className="h-4 w-4 shrink-0 text-brand-blue transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>

          {/* -------------------------------- CONTACT / HELP ----------------------------- */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex gap-3 rounded-3xl border border-brand-light-border bg-white p-4 sm:gap-4 sm:p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-blue text-white sm:h-11 sm:w-11">
                <Building className="h-5 w-5 text-brand-lime" aria-hidden="true" />
              </div>
              <div className="min-w-0 space-y-1">
                <h3 className="text-sm font-bold text-brand-dark sm:text-base">
                  {t('License Branch', 'لائسنس برانچ')}
                </h3>
                <p className="break-words text-sm leading-relaxed text-slate-600">
                  {t(
                    'Driving License Branch, Infront of GPO Office Near ADC General Office, Abbottabad.',
                    'ڈرائیونگ لائسنس برانچ، جی پی او آفس کے سامنے، اے ڈی سی جنرل آفس کے قریب، ایبٹ آباد۔'
                  )}
                </p>
              </div>
            </div>

            <a
              href="tel:1915"
              className="flex gap-3 rounded-3xl border border-brand-light-border bg-white p-4 transition-all duration-300 hover:border-brand-blue-300 hover:shadow-lg sm:gap-4 sm:p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-blue text-white sm:h-11 sm:w-11">
                <Phone className="h-5 w-5 text-brand-lime" aria-hidden="true" />
              </div>
              <div className="min-w-0 space-y-1">
                <h3 className="text-sm font-bold text-brand-dark sm:text-base">
                  {t('Helpline', 'ہیلپ لائن')}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {t(
                    'Dial 1915 for emergencies and guidance.',
                    'ایمرجنسی اور رہنمائی کے لیے 1915 ڈائل کریں۔'
                  )}
                </p>
              </div>
            </a>
          </section>

          {/* ---------------------------------- ACTIONS --------------------------------- */}
          <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
            <Link
              to="/services/driving-license/learner-permit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-sm font-bold tracking-wide text-white transition-all duration-200 hover:scale-[1.03] hover:bg-brand-blue-600 active:scale-95"
            >
              <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t('Apply for Learner Permit', 'لرنر پرمٹ کے لیے اپلائی کریں')}</span>
              <ForwardArrow className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>

            <Link
              to="/traffic-education"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-light-border bg-white px-6 py-3.5 text-sm font-bold tracking-wide text-brand-dark transition-all duration-200 hover:border-brand-blue-300 hover:shadow-lg"
            >
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
              <span>{t('Traffic Signs Guide', 'ٹریفک اشارے کی گائیڈ')}</span>
            </Link>
          </div>

          {/* ------------------------------ FOOTER BRAND LINE ----------------------------- */}
          <section>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-brand-light-border bg-white p-6 text-center sm:p-8">
              <img
                src={logoImg}
                alt={
                  language === 'ur'
                    ? 'ٹریفک وارڈن ایبٹ آباد — سرکاری چینہ'
                    : 'Traffic Warden Abbottabad — Official Traffic Police Crest'
                }
                className="h-14 w-14 rounded-full border border-brand-light-border bg-white object-contain p-1 sm:h-16 sm:w-16"
              />
              <p className="max-w-2xl text-sm font-semibold leading-relaxed text-brand-dark sm:text-base">
                {t('Traffic Warden Abbottabad', 'ٹریفک وارڈن ایبٹ آباد')}
              </p>
              <p className="max-w-2xl text-xs font-medium italic leading-relaxed text-slate-500 sm:text-sm">
                {t(
                  'Disciplined Roads. Safer Journeys. A Better Tomorrow.',
                  'منظم سڑکیں۔ محفوظ سفر۔ روشن کل۔'
                )}
              </p>
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  );
};

export default DrivingTestGuide;
