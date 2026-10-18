import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BellRing,
  Car,
  CheckCircle2,
  CloudSun,
  Fuel,
  HeartPulse,
  MapPin,
  Mountain,
  Phone,
  PhoneCall,
  Radio,
  Route as RouteIcon,
  ShieldCheck,
  Shield,
  Snowflake,
  TriangleAlert,
  Users,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import { cn } from '../lib/utils';

const HERO_IMG = '/Winter Travel advisory/hero iamge.jpg';

/* Shared section furniture — mirrors the official board look of the advisory page. */
const eyebrowClass =
  'inline-flex max-w-full items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs';
const sectionTitleClass =
  'mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl';
const sectionIntroClass = 'mt-2 text-sm leading-relaxed text-brand-light-muted sm:text-base';

const cardClass =
  'rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov sm:p-6';

/** One numbered advisory section: numbered badge + icon + title + bullet list. */
interface AdvisorySectionProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  intro?: string;
  bullets: string[];
  className?: string;
}

const AdvisorySection: React.FC<AdvisorySectionProps> = ({
  number,
  icon,
  title,
  intro,
  bullets,
  className,
}) => (
  <section className={cn(cardClass, className)} aria-label={title}>
    <div className="flex items-start gap-3 sm:gap-4">
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#000080] text-sm font-extrabold text-white sm:h-12 sm:w-14 sm:text-base">
        {number}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-brand-blue">{icon}</div>
        <h2 className="mt-1 text-balance text-lg font-bold leading-snug text-brand-dark sm:text-xl">
          {title}
        </h2>
      </div>
    </div>

    {intro && <p className="mt-3 text-sm leading-relaxed text-brand-light-muted">{intro}</p>}

    <ul className="mt-4 space-y-2.5">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-2.5">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue sm:h-[1.15rem] sm:w-[1.15rem]"
            aria-hidden="true"
          />
          <span className="min-w-0 text-sm leading-relaxed text-brand-light-text">{bullet}</span>
        </li>
      ))}
    </ul>
  </section>
);

/* Contact numbers published by Traffic Warden Abbottabad. */
const EMERGENCY_NUMBERS = [
  {
    icon: <PhoneCall className="h-5 w-5" aria-hidden="true" />,
    titleEn: 'Traffic Police Helpline',
    titleUr: 'ٹریفک پولیس ہیلپ لائن',
    number: '1915',
    href: 'tel:1915',
    hintEn: 'Road assistance & traffic information',
    hintUr: 'سڑک پر معاونت اور ٹریفک معلومات',
    accent: 'bg-[#000080] text-white',
    chip: 'bg-brand-lime/20 text-brand-lime',
  },
  {
    icon: <Shield className="h-5 w-5" aria-hidden="true" />,
    titleEn: 'Traffic Headquarters Office',
    titleUr: 'ٹریفک ہیڈ کوارٹر آفس',
    number: '0992-921042',
    href: 'tel:0992921042',
    hintEn: 'Office inquiries & coordination',
    hintUr: 'دفتری سوالات اور رابطہ کاری',
    accent: 'bg-white text-brand-dark',
    chip: 'bg-brand-blue-50 text-brand-blue-700',
  },
  {
    icon: <Radio className="h-5 w-5" aria-hidden="true" />,
    titleEn: 'Abbottabad Police Control',
    titleUr: 'ایبٹ آباد پولیس کنٹرول',
    number: '0992-341785',
    href: 'tel:0992341785',
    hintEn: 'Police control room',
    hintUr: 'پولیس کنٹرول روم',
    accent: 'bg-white text-brand-dark',
    chip: 'bg-brand-blue-50 text-brand-blue-700',
  },
  {
    icon: <HeartPulse className="h-5 w-5" aria-hidden="true" />,
    titleEn: 'Rescue 1122 KP',
    titleUr: 'ریسکیو 1122',
    number: '1122',
    href: 'tel:1122',
    hintEn: 'Medical & rescue emergencies',
    hintUr: 'میڈیکل اور ریسکیو ایمرجنسی',
    accent: 'bg-white text-brand-dark',
    chip: 'bg-red-50 text-red-700',
  },
  {
    icon: <Shield className="h-5 w-5" aria-hidden="true" />,
    titleEn: 'KP Police Emergency',
    titleUr: 'پولیس ایمرجنسی',
    number: '15',
    href: 'tel:15',
    hintEn: 'Police emergency response',
    hintUr: 'پولیس ایمرجنسی ردعمل',
    accent: 'bg-white text-brand-dark',
    chip: 'bg-brand-blue-50 text-brand-blue-700',
  },
];

/* Quick links to related traffic police services. */
const SERVICE_LINKS = [
  {
    labelEn: 'All Traffic Police Services',
    labelUr: 'تمام ٹریفک پولیس خدمات',
    path: '/services',
    icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
  },
  {
    labelEn: 'Driving License Services',
    labelUr: 'ڈرائیونگ لائسنس خدمات',
    path: '/services/driving-license',
    icon: <Car className="h-4 w-4" aria-hidden="true" />,
  },
  {
    labelEn: 'Online Complaint',
    labelUr: 'آن لائن شکایت',
    path: '/online-complaint',
    icon: <BellRing className="h-4 w-4" aria-hidden="true" />,
  },
  {
    labelEn: 'Traffic Facilitation Center',
    labelUr: 'ٹریفک سہولت مرکز',
    path: '/tourism/facilitation-center',
    icon: <MapPin className="h-4 w-4" aria-hidden="true" />,
  },
];

const ADISORY_PAGE_PATH = '/tourism/galiyat-travel-advisory';

const WinterTravelSafety: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = t(
      'Winter Travel Safety Guide | Traffic Warden Abbottabad',
      'سردیوں کے سفری انتباہات | ٹریفک وارڈن ایبٹ آباد'
    );
  }, [t, language]);

  const breadcrumbItems = [
    { label: 'Tourism', labelUrdu: 'سیاحت' },
    { label: 'Winter Travel Safety Guide', labelUrdu: 'سفری حفاظت گائیڈ' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-light-bg text-brand-dark">
      {/* ---------------------------------- HERO ---------------------------------- */}
      <section className="relative overflow-hidden border-b border-[#0000aa] bg-[#000080] text-white">
        {/* Winter photograph with an official navy overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-bottom"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#000080]/80 sm:bg-[#000080]/70" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000080] via-transparent to-[#000080]/40"
          aria-hidden="true"
        />

        <PageContainer className="relative z-10">
          <div className="py-10 sm:py-14 lg:py-20">
            <Breadcrumbs
              items={breadcrumbItems}
              className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
            />

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
                <Snowflake className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">
                  {t('Winter Season · Official Advisory', 'سردیوں کا موسم · سرکاری ایڈوائزری')}
                </span>
              </div>

              <h1 className="text-balance text-2xl font-extrabold uppercase leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                {t('Winter Travel Advisory', 'سردیوں کے سفری انتباہات')}
              </h1>

              <p className="text-sm font-semibold text-brand-lime sm:text-base md:text-lg">
                {t('Traffic Warden Abbottabad', 'ٹریفک وارڈن ایبٹ آباد')}
              </p>

              <p className="max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
                {t(
                  'Public safety guidelines for winter travel in Abbottabad & Galiyat — road status, driving instructions and emergency assistance, all in one place.',
                  'ایبٹ آباد اور گلیات میں سردیوں کے سفر کے لیے عوامی حفاظتی رہنمائی — رستوں کی صورتحال، ڈرائیونگ کی ہدایات اور ایمرجنسی مدد، سب ایک ہی جگہ۔'
                )}
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <div className="space-y-10 py-8 sm:space-y-12 sm:py-12 lg:py-16">
          {/* ------------------------------- WELCOME ------------------------------ */}
          <section
            className={cn(cardClass, 'border-s-4 border-s-[#000080]')}
            aria-label={t('Welcome message', 'خوش آمدید')}
          >
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                <Mountain className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-brand-dark sm:text-xl">
                  {t('Welcome to Abbottabad & Galiyat', 'ایبٹ آباد اور گلیات میں خوش آمدید')}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Traffic Warden Abbottabad welcomes all visitors travelling to Abbottabad and the scenic Galiyat region during the winter season.',
                    'ٹریفک وارڈن ایبٹ آباد سردیوں کے موسم میں ایبٹ آباد اور خوبصورت گلیات کے علاقے کا سفر کرنے والے تمام سیاحوں کو خوش آمدید کہتا ہے۔'
                  )}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-brand-light-muted sm:text-base">
                  {t(
                    'During snowfall, rain, dense fog and extreme cold, road conditions may deteriorate, visibility may decrease, and traffic congestion may occur on mountainous routes. Traffic Warden Abbottabad urges all motorists and tourists to follow official traffic advisories, observe road safety regulations, and cooperate with traffic personnel to ensure safe and smooth journeys.',
                    'برف باری، بارش، گھنی دھند اور شدید سردی کے دوران رستوں کی صورتحال خراب ہو سکتی ہے، حدِ نظر کم ہو سکتی ہے اور پہاڑی رستوں پر ٹریفک کنجسٹن پیدا ہو سکتی ہے۔ ٹریفک وارڈن ایبٹ آباد تمام موٹرسائیکل سواروں اور سیاحوں سے مطالبہ کرتا ہے کہ وہ سرکاری ٹریفک ایڈوائزری پر عمل کریں، سڑک حفاظتی ضابطوں کی پاسداری کریں اور محفوظ و ہموار سفر یقینی بنانے کے لیے ٹریفک اہلکاروں سے تعاون کریں۔'
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* --------------------------- QUICK ACCESS CARDS ----------------------- */}
          <section aria-label={t('Quick access', 'فوری رسائی')}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {/* Current Road Status — live board on the advisory page */}
              <Link
                to={ADISORY_PAGE_PATH}
                className="group rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov transition-all hover:-translate-y-0.5 hover:border-brand-blue-300 hover:shadow-gov-md sm:p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#000080] text-white">
                  <RouteIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-brand-dark sm:text-base">
                  {t('Current Road Status', 'رستوں کی موجودہ صورتحال')}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-brand-light-muted sm:text-sm">
                  {t(
                    'Live open/closed condition of Galiyat routes on the official advisory page.',
                    'سرکاری ایڈوائزری صفحے پر گلیات کے رستوں کی کھلی/بند صورتحال۔'
                  )}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue-700">
                  {t('Open road status board', 'رستوں کا بورڈ دیکھیں')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                </span>
              </Link>

              {/* Weather Updates — existing weather page */}
              <Link
                to="/weather"
                className="group rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov transition-all hover:-translate-y-0.5 hover:border-brand-blue-300 hover:shadow-gov-md sm:p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                  <CloudSun className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-brand-dark sm:text-base">
                  {t('Weather Updates', 'موسمی معلومات')}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-brand-light-muted sm:text-sm">
                  {t(
                    'Location-specific forecasts and current conditions for Abbottabad & Galiyat.',
                    'ایبٹ آباد اور گلیات کے لیے مقامی موسم کی پیش گوئی اور موجودہ صورتحال۔'
                  )}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue-700">
                  {t('Open weather page', 'موسمی صفحہ کھولیں')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                </span>
              </Link>

              {/* Official Traffic Alerts — existing advisory page */}
              <Link
                to={ADISORY_PAGE_PATH}
                className="group rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov transition-all hover:-translate-y-0.5 hover:border-brand-blue-300 hover:shadow-gov-md sm:p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                  <TriangleAlert className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-brand-dark sm:text-base">
                  {t('Official Traffic Alerts', 'سرکاری ٹریفک الرٹس')}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-brand-light-muted sm:text-sm">
                  {t(
                    'Verified road closures, diversions and snowfall-related restrictions.',
                    'تصدیق شدہ سڑک بندشیں، ڈائیورژن اور برف باری سے متعلق پابندیاں۔'
                  )}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue-700">
                  {t('Open advisory board', 'ایڈوائزری بورڈ دیکھیں')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </section>

          {/* ------------------------ ADVISORY SECTIONS 1–3 ----------------------- */}
          <div className="space-y-4 sm:space-y-6">
            <AdvisorySection
              number={1}
              icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
              title={t('Check Road Conditions Before Travelling', 'روانگی سے پہلے رستوں کی صورتحال دیکھیں')}
              bullets={[
                t(
                  'Check the latest traffic advisory and weather updates before starting your journey.',
                  'سفر شروع کرنے سے پہلے تازہ ترین ٹریفک ایڈوائزری اور موسمی معلومات دیکھیں۔'
                ),
                t(
                  'Confirm route accessibility during snowfall and adverse weather conditions.',
                  'برف باری اور خراب موسم کے دوران رستے کی گزرگاہ کی تصدیق کریں۔'
                ),
                t(
                  'Follow official announcements regarding road closures, entry restrictions and traffic diversions.',
                  'سڑک بندش، داخلے کی پابندیوں اور ٹریفک ڈائیورژن سے متعلق سرکاری اعلانات پر عمل کریں۔'
                ),
                t(
                  'Allow additional travel time during peak tourist periods and snowfall.',
                  'سیاحتی مصروف اوقات اور برف باری کے دوران سفر کے لیے اضافی وقت رکھیں۔'
                ),
                t(
                  'Avoid unnecessary travel when authorities advise against travelling.',
                  'جب حکام سفر سے گریز کا مشورہ دیں تو غیر ضروری سفر سے گریز کریں۔'
                ),
              ]}
            />

            <AdvisorySection
              number={2}
              icon={<Car className="h-4 w-4" aria-hidden="true" />}
              title={t('Winter Driving Safety Instructions', 'سردیوں میں ڈرائیونگ کی حفاظتی ہدایات')}
              bullets={[
                t(
                  'Drive at a safe speed according to road and weather conditions.',
                  'سڑک اور موسم کی صورتحال کے مطابق محفوظ رفتار سے ڈرائیو کریں۔'
                ),
                t(
                  'Maintain a safe distance from the vehicle ahead.',
                  'آگے چلنے والی گاڑی سے محفوظ فاصلہ برقرار رکھیں۔'
                ),
                t(
                  'Avoid sudden braking, sharp turns and dangerous overtaking.',
                  'اچانک بریک، تیز موڑ اور خطرناک اوور ٹیکنگ سے گریز کریں۔'
                ),
                t(
                  'Use appropriate lights during fog, rain and reduced visibility.',
                  'دھند، بارش اور کم حدِ نظر کے دوران مناسب لائٹس استعمال کریں۔'
                ),
                t(
                  'Ensure that tyres, brakes, headlights, battery and windscreen wipers are in good condition.',
                  'یقینی بنائیں کہ ٹائر، بریک، ہیڈ لائٹس، بیٹری اور وائپرز درست حالت میں ہوں۔'
                ),
                t(
                  'Use suitable snow chains when required by road conditions or official instructions.',
                  'سڑک کی صورتحال یا سرکاری ہدایات کے مطابق مناسب برف چین لگائیں۔'
                ),
                t(
                  'Park only in designated areas and keep roads clear for emergency vehicles and snow-clearance operations.',
                  'صرف مقرر کردہ جگہوں پر پارکنگ کریں اور ایمرجنسی گاڑیوں اور برف صفائی کی کارروائیوں کے لیے رستے کھلے رکھیں۔'
                ),
              ]}
            />

            <AdvisorySection
              number={3}
              icon={<Snowflake className="h-4 w-4" aria-hidden="true" />}
              title={t('Instructions During Snowfall', 'برف باری کے دوران کی ہدایات')}
              bullets={[
                t(
                  'Follow instructions issued by Traffic Warden Abbottabad and other authorized agencies.',
                  'ٹریفک وارڈن ایبٹ آباد اور دیگر مجاز اداروں کی جاری کردہ ہدایات پر عمل کریں۔'
                ),
                t(
                  'Do not cross barricades or enter roads declared closed or restricted.',
                  'بیریکٹریں عبور نہ کریں اور بند یا پابند رستوں میں داخل نہ ہوں۔'
                ),
                t(
                  'Do not stop vehicles at sharp turns, narrow stretches or other locations that obstruct traffic.',
                  'تیز موڑوں، تنگ حصوں یا دیگر مقامات پر گاڑی نہ روکیں جو ٹریفک میں رکاوٹ بنتی ہیں۔'
                ),
                t(
                  'Avoid travelling on snow-covered or icy roads without suitable vehicle preparation.',
                  'مناسب گاڑی کی تیاری کے بغیر برف سے ڈھکے یا برفیلے رستوں پر سفر سے گریز کریں۔'
                ),
                t(
                  'Cooperate with traffic personnel at checkpoints and designated entry points.',
                  'چیک پوسٹوں اور مقرر کردہ داخلہ مقامات پر ٹریفک اہلکاروں سے تعاون کریں۔'
                ),
                t(
                  'Follow official directions regarding diversions, vehicle restrictions and road reopening.',
                  'ڈائیورژن، گاڑیوں کی پابندیوں اور سڑک دوبارہ کھلنے سے متعلق سرکاری ہدایات پر عمل کریں۔'
                ),
              ]}
            />
          </div>

          {/* ------------------------ ADVISORY SECTIONS 4–5 ----------------------- */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            <AdvisorySection
              number={4}
              icon={<Fuel className="h-4 w-4" aria-hidden="true" />}
              title={t('Vehicle & Emergency Preparedness', 'گاڑی اور ایمرجنسی کی تیاری')}
              intro={t(
                'Before travelling to the Galiyat region, motorists should:',
                'گلیات کے علاقے کے سفر سے پہلے موٹرسائیکل سواروں کو چاہیے:'
              )}
              bullets={[
                t('Keep sufficient fuel in the vehicle.', 'گاڑی میں کافی ایندھن رکھیں۔'),
                t(
                  'Carry warm clothing, blankets, drinking water, essential medicines and a charged mobile phone.',
                  'گرم کپڑے، کمبل، پینے کا پانی، ضروری ادویات اور چارج شدہ موبائل فون ساتھ رکھیں۔'
                ),
                t(
                  'Keep emergency contact details readily accessible.',
                  'ایمرجنسی رابطے کی تفصیلات آسان رسائی میں رکھیں۔'
                ),
                t(
                  'Plan the return journey in advance and check updated road conditions.',
                  'واپسی کے سفر کا پہلے سے منصوبہ بنائیں اور اپ ڈیٹ شدہ رستوں کی صورتحال دیکھیں۔'
                ),
                t(
                  'If stranded, move to a safe location where possible and contact the relevant emergency service.',
                  'اگر راستے میں پھنس جائیں تو ممکن ہو تو محفوظ مقام پر جائیں اور متعلقہ ایمرجنسی سروس سے رابطہ کریں۔'
                ),
              ]}
            />

            <AdvisorySection
              number={5}
              icon={<Users className="h-4 w-4" aria-hidden="true" />}
              title={t('Tourist Safety & Public Cooperation', 'سیاحتی حفاظت اور عوامی تعاون')}
              intro={t(
                'Traffic Warden Abbottabad requests all visitors to:',
                'ٹریفک وارڈن ایبٹ آباد تمام سیاحوں سے درخواست کرتا ہے کہ:'
              )}
              bullets={[
                t(
                  'Follow traffic signs and instructions from authorized personnel.',
                  'ٹریفک سائنوں اور مجاز اہلکاروں کی ہدایات پر عمل کریں۔'
                ),
                t(
                  'Avoid roadside parking that obstructs traffic flow.',
                  'سڑک کی ٹریفک کو روکنے والی کنارے پارکنگ سے گریز کریں۔'
                ),
                t(
                  'Keep intersections, emergency access points and narrow mountain roads clear.',
                  'چوراہے، ایمرجنسی داخلہ مقامات اور تنگ پہاڑی سڑکیں کھلی رکھیں۔'
                ),
                t(
                  'Avoid littering and help preserve the natural environment.',
                  'کچا کچڑا نہ پھینکیں اور قدرتی ماحول کے تحفظ میں مدد کریں۔'
                ),
                t(
                  'Exercise extra caution near slippery roads, steep slopes and crowded tourist locations.',
                  'پھسلن والی سڑکوں، کھڑی ڈھلوانوں اور بھرے ہوئے سیاحتی مقامات پر خصوصی احتیاط کریں۔'
                ),
              ]}
            />
          </div>

          {/* --------------------- SECTION 6 — OFFICIAL UPDATES ------------------- */}
          <AdvisorySection
            number={6}
            icon={<Radio className="h-4 w-4" aria-hidden="true" />}
            title={t('Official Traffic Updates & Assistance', 'سرکاری ٹریفک اپ ڈیٹس اور معاونت')}
            bullets={[
              t(
                'For the latest information regarding road conditions, traffic restrictions, diversions and winter travel advisories, consult the official Traffic Warden Abbottabad website and follow verified announcements issued by the relevant authorities.',
                'رستوں کی صورتحال، ٹریفک پابندیوں، ڈائیورژن اور سردیوں کے سفری انتباہات کی تازہ ترین معلومات کے لیے سرکاری ٹریفک وارڈن ایبٹ آباد ویب سائٹ دیکھیں اور متعلقہ اداروں کی تصدیق شدہ اعلانات پر عمل کریں۔'
              ),
              t(
                'The Current Road Status board and the Official Advisory Board on the Galiyat Travel Advisory page are updated directly by the advisory staff.',
                'گلیات ٹریول ایڈوائزری صفحے پر رستوں کی صورتحال کا بورڈ اور سرکاری ایڈوائزری بورڈ براہِ راست ایڈوائزری عملہ اپ ڈیٹ کرتا ہے۔'
              ),
              t(
                'For emergencies, contact the appropriate emergency service using its verified official number.',
                'ایمرجنسی کی صورت میں متعلقہ ایمرجنسی سروس سے اس کے تصدیق شدہ سرکاری نمبر پر رابطہ کریں۔'
              ),
            ]}
          />

          {/* ------------------------- EMERGENCY CONTACTS ------------------------- */}
          <section aria-labelledby="contacts-heading">
            <div className="max-w-3xl">
              <div className={eyebrowClass}>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                <span>{t('Keep These Numbers Handy', 'یہ نمبر ساتھ رکھیں')}</span>
              </div>
              <h2 id="contacts-heading" className={sectionTitleClass}>
                {t('Emergency & Helpline Numbers', 'ایمرجنسی اور ہیلپ لائن نمبرز')}
              </h2>
              <p className={sectionIntroClass}>
                {t(
                  'Save these official numbers before starting your journey. Tap any card to call.',
                  'سفر شروع کرنے سے پہلے یہ سرکاری نمبر محفوظ کر لیں۔ کال کے لیے کسی بھی کارڈ پر کلک کریں۔'
                )}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EMERGENCY_NUMBERS.map((contact) => {
                const isDarkCard = contact.accent === 'bg-[#000080] text-white';

                return (
                  <a
                    key={contact.titleEn}
                    href={contact.href}
                    className={cn(
                      'group flex items-center gap-4 rounded-2xl border border-brand-light-border p-4 shadow-gov transition-all hover:-translate-y-0.5 hover:shadow-gov-md',
                      contact.accent
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                        contact.chip
                      )}
                    >
                      {contact.icon}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          'text-xs font-bold',
                          isDarkCard ? 'text-white' : 'text-slate-700'
                        )}
                      >
                        {t(contact.titleEn, contact.titleUr)}
                      </p>
                      <p
                        className={cn(
                          'text-xl font-extrabold tabular-nums tracking-tight',
                          isDarkCard ? 'text-white' : 'text-brand-dark'
                        )}
                      >
                        {contact.number}
                      </p>
                      <p
                        className={cn(
                          'text-[11px] font-medium',
                          isDarkCard ? 'text-white/80' : 'text-slate-600'
                        )}
                      >
                        {t(contact.hintEn, contact.hintUr)}
                      </p>
                    </div>
                    <Phone
                      className={cn(
                        'ms-auto h-4 w-4 shrink-0 transition-opacity group-hover:opacity-100',
                        isDarkCard ? 'text-white/60' : 'text-slate-400 group-hover:text-slate-600'
                      )}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </section>

          {/* ----------------------------- SERVICES STRIP ------------------------- */}
          <section aria-label={t('Traffic police services', 'ٹریفک پولیس کی خدمات')}>
            <div className="rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-brand-dark sm:text-base">
                  {t('Traffic Police Services', 'ٹریفک پولیس کی خدمات')}
                </h2>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue-700 hover:text-brand-blue-900"
                >
                  {t('View all services', 'تمام خدمات دیکھیں')}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </div>

              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {SERVICE_LINKS.map((service) => (
                  <li key={service.path}>
                    <Link
                      to={service.path}
                      className="group flex items-center gap-3 rounded-xl border border-brand-light-border bg-white px-3.5 py-3 transition-colors hover:border-brand-blue-300 hover:bg-brand-blue-50/60"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
                        {service.icon}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-semibold text-brand-dark">
                        {t(service.labelEn, service.labelUr)}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-brand-light-muted transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ------------------------------ CLOSING BANNER ------------------------ */}
          <section
            aria-labelledby="safety-priority-heading"
            className="relative overflow-hidden rounded-3xl border border-[#0000aa] bg-[#000080] text-white"
          >
            <div
              className="pointer-events-none absolute bottom-0 start-0 h-56 w-56 rounded-full bg-brand-lime/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 p-5 text-center sm:p-10">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-lime/20 text-brand-lime">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </span>

              <h2
                id="safety-priority-heading"
                className="mt-4 text-balance text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl lg:text-3xl"
              >
                {t('Your Safety is Our Priority', 'آپ کی حفاظت ہماری ترجیح ہے')}
              </h2>
              <p className="mt-2 text-sm font-semibold text-brand-lime sm:text-base">
                {t('Traffic Warden Abbottabad', 'ٹریفک وارڈن ایبٹ آباد')}
              </p>
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                {t(
                  'Promoting safe roads, responsible driving and secure travel throughout Abbottabad & Galiyat.',
                  'ایبٹ آباد اور گلیات بھر میں محفوظ رستے، ذمہ دارانہ ڈرائیونگ اور محفوظ سفر کے فروغ کے لیے۔'
                )}
              </p>

              <div className="mx-auto mt-5 flex max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href="tel:1915"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-lime px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-lime-hover sm:w-auto"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t('Call Traffic Helpline 1915', 'ٹریفک ہیلپ لائن 1915 پر کال کریں')}</span>
                </a>
                <Link
                  to="/weather"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20 sm:w-auto"
                >
                  <CloudSun className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t('Check Weather', 'موسم دیکھیں')}</span>
                </Link>
              </div>
            </div>
          </section>

          {/* --------------------------------- NOTE ------------------------------- */}
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-brand-light-muted">
            {t(
              'Note: Road conditions and access restrictions may change rapidly during adverse weather. All motorists must follow current official instructions. This advisory provides general safety guidance and does not replace specific road-closure orders or official emergency announcements.',
              'نوٹ: خراب موسم کے دوران رستوں کی صورتحال اور آمد و رفت کی پابندیاں تیزی سے بدل سکتی ہیں۔ تمام موٹرسائیکل سواروں کو موجودہ سرکاری ہدایات پر عمل کرنا چاہیے۔ یہ ایڈوائزری عمومی حفاظتی رہنمائی فراہم کرتی ہے اور مخصوص سڑک بندش کے حکموں یا سرکاری ایمرجنسی اعلانات کا متبادل نہیں ہے۔'
            )}
          </p>
        </div>
      </PageContainer>
    </div>
  );
};

export default WinterTravelSafety;
