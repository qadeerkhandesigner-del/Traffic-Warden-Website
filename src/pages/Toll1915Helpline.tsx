import React, { useEffect } from 'react';
import {
  Clock,
  HeartHandshake,
  Info,
  MapPin,
  MessageSquareWarning,
  Phone,
  PhoneCall,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const HERO_CHIPS = [
  {
    icon: PhoneCall,
    en: 'Toll-Free Helpline',
    ur: 'ٹول فری ہیلپ لائن',
  },
  {
    icon: Clock,
    en: '24/7 Assistance',
    ur: 'چوبیس گھنٹے معاونت',
  },
  {
    icon: MapPin,
    en: 'Abbottabad & Galiyat',
    ur: 'ایبٹ آباد اور گلیات',
  },
];

interface Service {
  id: string;
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  titleEn: string;
  titleUr: string;
  descEn: string;
  descUr: string;
}

const SERVICES: Service[] = [
  {
    id: 'traffic-information',
    number: '01',
    icon: Info,
    titleEn: 'Traffic Information and Guidance',
    titleUr: 'ٹریفک معلومات اور رہنمائی',
    descEn: 'Assistance with traffic-related queries and general road-use guidance.',
    descUr: 'ٹریفک سے متعلق استفسارات اور عام سڑک استعمال کی رہنمائی میں معاونت۔',
  },
  {
    id: 'reporting-issues',
    number: '02',
    icon: MessageSquareWarning,
    titleEn: 'Reporting Traffic Issues',
    titleUr: 'ٹریفک مسائل کی اطلاع',
    descEn:
      'A communication channel for reporting traffic congestion, obstructions, and other road-related concerns.',
    descUr:
      'ٹریفک رش، رکاوٹوں اور سڑک سے متعلق دیگر مسائل کی اطلاع دینے کا ذریعہ۔',
  },
  {
    id: 'tourist-assistance',
    number: '03',
    icon: MapPin,
    titleEn: 'Tourist Assistance',
    titleUr: 'سیاحوں کی معاونت',
    descEn: 'Guidance for visitors travelling through Abbottabad and Galiyat.',
    descUr: 'ایبٹ آباد اور گلیات سے گزرنے والے سیاحوں کے لیے رہنمائی۔',
  },
  {
    id: 'public-facilitation',
    number: '04',
    icon: HeartHandshake,
    titleEn: 'Public Facilitation',
    titleUr: 'عوامی سہولت',
    descEn: 'Improved communication between citizens and Abbottabad Traffic Police.',
    descUr: 'شہریوں اور ایبٹ آباد ٹریفک پولیس کے درمیان بہتر رابطہ۔',
  },
  {
    id: 'safety-awareness',
    number: '05',
    icon: ShieldCheck,
    titleEn: 'Traffic Safety Awareness',
    titleUr: 'ٹریفک سیفٹی آگاہی',
    descEn:
      'Information to encourage responsible driving and compliance with traffic rules.',
    descUr:
      'ذمہ دارانہ ڈرائیونگ اور ٹریفک قوانین کی پاسداری کی ترغیب دینے والی معلومات۔',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const Toll1915Helpline: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ٹول 1915 ہیلپ لائن | ٹریفک وارڈن ایبٹ آباد'
        : 'Toll 1915 Helpline | Traffic Warden Abbottabad';
  }, [language]);

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* ============================== HERO ============================== */}
      <section className="relative bg-[#000080] text-white pt-6 pb-12 border-b border-[#0000aa] overflow-hidden sm:pb-16">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-80 sm:h-80 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', labelUrdu: 'صفحۂ اول', path: '/' },
              { label: 'Initiatives', labelUrdu: 'اقدامات' },
              { label: 'Toll 1915 Helpline', labelUrdu: 'ٹول 1915 ہیلپ لائن' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Hero copy */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('INITIATIVE', 'اقدام')}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t(
                  'ABBOTTABAD TRAFFIC POLICE HELPLINE — 1915',
                  'ایبٹ آباد ٹریفک پولیس ہیلپ لائن — 1915'
                )}
              </h1>

              <p className="text-base font-semibold text-brand-lime sm:text-lg">
                {t('Your Connection to Traffic Assistance', 'ٹریفک معاونت کے لیے آپ کا رابطہ')}
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {HERO_CHIPS.map((chip) => (
                  <span
                    key={chip.en}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white sm:text-sm"
                  >
                    <chip.icon className="h-4 w-4 text-brand-lime" aria-hidden="true" />
                    {t(chip.en, chip.ur)}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="tel:1915"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-lime px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-lime-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime/60"
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  {t('Call 1915 Now', 'ابھی 1915 پر کال کریں')}
                </a>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/85">
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-lime opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-lime" />
                  </span>
                  {t('Helpline active round the clock', 'ہیلپ لائن چوبیس گھنٹے فعال')}
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border-4 border-white/10 bg-brand-dark shadow-2xl">
                <img
                  src="/Toll 1915 Helpline Images/01.jpg"
                  alt={t(
                    'Abbottabad Traffic Police helpline operators attending calls at the 1915 desk',
                    '1915 ڈیسک پر کالز سنبھالتے ایبٹ آباد ٹریفک پولیس ہیلپ لائن اہلکار'
                  )}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-black/45 px-3.5 py-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:px-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-lime text-brand-dark">
                      <PhoneCall className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="leading-tight">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-lime">
                        {t('Helpline Number', 'ہیلپ لائن نمبر')}
                      </div>
                      <div className="font-mono text-xl font-extrabold text-white sm:text-2xl">
                        1915
                      </div>
                    </div>
                  </div>
                  <a
                    href="tel:1915"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-brand-dark transition-colors hover:bg-brand-lime hover:text-brand-dark sm:text-sm"
                  >
                    <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('Call', 'کال کریں')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <div className="space-y-10 py-8 sm:space-y-14 sm:py-12">
          {/* -------------------------------- OVERVIEW ---------------------------- */}
          <section aria-labelledby="overview-heading">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                  {t('Overview', 'تعارف')}
                </div>

                <h2
                  id="overview-heading"
                  className="mt-3 text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
                >
                  {t('Your Connection to Traffic Assistance', 'ٹریفک معاونت کے لیے آپ کا رابطہ')}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'The 1915 Toll-Free Helpline provides a direct communication channel for road users seeking traffic-related assistance, guidance, and information in Abbottabad. It aims to make it easier for citizens, motorists, and tourists to communicate with traffic police regarding traffic concerns and road-related difficulties.',
                    '1915 ٹول فری ہیلپ لائن سڑک استعمال کرنے والوں کے لیے ایک براہ راست رابطے کا ذریعہ فراہم کرتی ہے تاکہ وہ ایبٹ آباد میں ٹریفک سے متعلق معاونت، رہنمائی اور معلومات حاصل کر سکیں۔ اس کا مقصد شہریوں، ڈرائیوروں اور سیاحوں کے لیے ٹریفک پولیس سے ٹریفک مسائل اور سڑک سے متعلق مشکلات پر رابطہ کرنا آسان بنانا ہے۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Whether travelling through the city or exploring the scenic routes of Galiyat, road users can use the helpline to seek guidance and report traffic-related issues through the appropriate channels.',
                    'خواہ آپ شہر سے گزر رہے ہوں یا گلیات کے دلکش راستوں کی سیر کر رہے ہوں، آپ ہیلپ لائن کے ذریعے مناسب چینلز سے رہنمائی حاصل کر سکتے ہیں اور ٹریفک سے متعلق مسائل کی اطلاع دے سکتے ہیں۔'
                  )}
                </p>
              </div>

              {/* Quick dial callout */}
              <div className="lg:col-span-1">
                <div className="flex h-full flex-col justify-center rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-5 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <PhoneCall className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-blue-900/70">
                    {t('Dial the Helpline', 'ہیلپ لائن پر کال کریں')}
                  </p>
                  <p className="mt-1 font-mono text-4xl font-extrabold tracking-tight text-brand-blue-900">
                    1915
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-blue-900/80">
                    {t(
                      'Toll-free traffic assistance for citizens, motorists and tourists in Abbottabad.',
                      'ایبٹ آباد میں شہریوں، ڈرائیوروں اور سیاحوں کے لیے ٹول فری ٹریفک معاونت۔'
                    )}
                  </p>
                  <a
                    href="tel:1915"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
                  >
                    <PhoneCall className="h-4 w-4" aria-hidden="true" />
                    {t('Call 1915', '1915 پر کال کریں')}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------ KEY SERVICES -------------------------- */}
          <section aria-labelledby="services-heading">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                {t('Key Services', 'اہم خدمات')}
              </div>
              <h2
                id="services-heading"
                className="mt-3 text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('How the Helpline Helps You', 'ہیلپ لائن آپ کی کس طرح مدد کرتی ہے')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'A single number for traffic assistance, guidance and public facilitation.',
                  'ٹریفک معاونت، رہنمائی اور عوامی سہولت کے لیے ایک واحد نمبر۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((item) => (
                <article
                  key={item.id}
                  className="flex h-full flex-col rounded-2xl border border-brand-light-border bg-brand-light-surface p-5 shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span
                      className="font-mono text-xl font-bold text-brand-blue-200"
                      aria-hidden="true"
                    >
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold leading-snug text-brand-dark">
                    {t(item.titleEn, item.titleUr)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-light-muted">
                    {t(item.descEn, item.descUr)}
                  </p>
                </article>
              ))}

              {/* Direct-call tile */}
              <article className="flex h-full flex-col justify-center rounded-2xl border border-[#0000aa] bg-[#000080] p-5 text-white">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-lime text-brand-dark">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold leading-snug">
                  {t('Speak to Traffic Police Directly', 'براہ راست ٹریفک پولیس سے بات کریں')}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-blue-100">
                  {t(
                    'Call 1915 to reach Abbottabad Traffic Police for traffic assistance and guidance.',
                    'ٹریفک معاونت اور رہنمائی کے لیے ایبٹ آباد ٹریفک پولیس تک پہنچنے کے لیے 1915 پر کال کریں۔'
                  )}
                </p>
                <a
                  href="tel:1915"
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-lime px-4 py-2.5 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-lime-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime/60"
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  {t('Call 1915', '1915 پر کال کریں')}
                </a>
              </article>
            </div>
          </section>

          {/* ------------------------------ COMMITMENT ---------------------------- */}
          <section aria-labelledby="commitment-heading">
            <div className="relative overflow-hidden rounded-2xl border border-[#0000aa] bg-[#000080] text-white">
              <div
                className="pointer-events-none absolute inset-0 gov-subtle-pattern opacity-10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute end-0 top-0 h-64 w-64 rounded-full bg-brand-blue/30 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative z-10 grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-3 lg:p-10">
                <div className="lg:col-span-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-lime text-brand-dark">
                    <Target className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 id="commitment-heading" className="mt-4 text-xl font-bold sm:text-2xl">
                    {t('Our Commitment', 'ہمارا عزم')}
                  </h2>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-sm leading-relaxed text-brand-blue-100 sm:text-base">
                    {t(
                      'Abbottabad Traffic Police is committed to facilitating road users through accessible communication and responsive public service. The helpline supports this commitment by providing a convenient channel for traffic-related assistance and helping citizens stay informed while travelling.',
                      'ایبٹ آباد ٹریفک پولیس قابلِ رسائی رابطے اور ذمہ دارانہ عوامی خدمت کے ذریعے سڑک استعمال کرنے والوں کی سہولت کے لیے پرعزم ہے۔ ہیلپ لائن اس عزم کو مضبوط بناتی ہے کیونکہ یہ ٹریفک سے متعلق معاونت کا آسان ذریعہ فراہم کرتی ہے اور سفر کے دوران شہریوں کو باخبر رکھنے میں مدد دیتی ہے۔'
                    )}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-white/15 pt-5">
                    <p className="text-sm font-bold text-brand-lime sm:text-base">
                      {t(
                        'Save 1915 — Your Traffic Helpline for Assistance and Guidance.',
                        '1915 محفوظ کریں — معاونت اور رہنمائی کے لیے آپ کی ٹریفک ہیلپ لائن۔'
                      )}
                    </p>
                    <p className="text-sm font-bold text-brand-lime sm:text-base">
                      {t(
                        'Abbottabad Traffic Police — Here to Help You Travel Safely.',
                        'ایبٹ آباد ٹریفک پولیس — محفوظ سفر میں آپ کی مدد کے لیے حاضر۔'
                      )}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 rounded-xl border border-brand-lime/30 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-start gap-2.5 text-sm font-semibold text-white">
                      <PhoneCall
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-lime"
                        aria-hidden="true"
                      />
                      {t(
                        'For traffic assistance, guidance and reporting road issues, call the helpline.',
                        'ٹریفک معاونت، رہنمائی اور سڑک کے مسائل کی اطلاع کے لیے ہیلپ لائن پر کال کریں۔'
                      )}
                    </p>
                    <a
                      href="tel:1915"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-lime px-4 py-2.5 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-lime-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime/60"
                    >
                      <PhoneCall className="h-4 w-4" aria-hidden="true" />
                      {t('Call 1915', '1915 پر کال کریں')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  );
};

export default Toll1915Helpline;
