import React, { useEffect, useState } from 'react';
import {
  Building,
  Compass,
  Eye,
  FileText,
  HandHeart,
  HeartHandshake,
  MapPin,
  Maximize2,
  PhoneCall,
  Signpost,
  Target,
  Users,
  X,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const HERO_CHIPS = [
  {
    icon: Building,
    en: 'Five Facilitation Centres',
    ur: 'پانچ سہولت مراکز',
  },
  {
    icon: Compass,
    en: 'Route and Destination Guidance',
    ur: 'راستوں اور مقامات کی رہنمائی',
  },
  {
    icon: FileText,
    en: 'Informational Pamphlets',
    ur: 'معلوماتی پمفلٹس',
  },
];

const CALLOUT_POINTS = [
  {
    en: 'Direct guidance from dedicated staff',
    ur: 'سرشار عملے سے براہِ راست رہنمائی',
  },
  {
    en: 'Informational pamphlets and awareness materials',
    ur: 'معلوماتی پمفلٹس اور آگاہی مواد',
  },
  {
    en: 'Assistance with routes, destinations and local road conditions',
    ur: 'راستوں، منازل اور مقامی سڑکوں کی صورتحال میں معاونت',
  },
];

interface KeyService {
  id: string;
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  titleEn: string;
  titleUr: string;
  descEn: string;
  descUr: string;
}

const KEY_SERVICES: KeyService[] = [
  {
    id: 'route-guidance',
    number: '01',
    icon: Compass,
    titleEn: 'Route Guidance and Navigation',
    titleUr: 'راستوں کی رہنمائی اور نیویگیشن',
    descEn:
      'Assists tourists in identifying appropriate routes to their intended destinations and provides guidance for travelling through Abbottabad and Galiyat.',
    descUr:
      'سیاحوں کو اُن کی مطلوبہ منزل کے لیے موزوں راستوں کی نشاندہی اور ایبٹ آباد اور گلیات سے گزرنے کے لیے رہنمائی فراہم کرتی ہے۔',
  },
  {
    id: 'destination-information',
    number: '02',
    icon: MapPin,
    titleEn: 'Tourist Destination Information',
    titleUr: 'سیاحتی مقامات کی معلومات',
    descEn:
      'Provides information about popular tourist attractions, nearby destinations, and places of interest to help visitors plan their trips.',
    descUr:
      'مقبول سیاحتی مقامات، قریبی منازل اور دلچسپی کے مقامات کے بارے میں معلومات فراہم کرتی ہے تاکہ سیاح اپنے سفر کی منصوبہ بندی کر سکیں۔',
  },
  {
    id: 'road-travel-guidance',
    number: '03',
    icon: Signpost,
    titleEn: 'Road and Travel Guidance',
    titleUr: 'سڑک اور سفر کی رہنمائی',
    descEn:
      'Offers general guidance to motorists regarding local roads, travel arrangements, and relevant traffic instructions.',
    descUr:
      'ڈرائیوروں کو مقامی سڑکوں، سفری انتظامات اور متعلقہ ٹریفک ہدایات کے بارے میں عام رہنمائی فراہم کرتی ہے۔',
  },
  {
    id: 'awareness-information',
    number: '04',
    icon: FileText,
    titleEn: 'Tourist Awareness and Information',
    titleUr: 'سیاحوں کی آگاہی اور معلومات',
    descEn:
      'Distributes informational pamphlets and awareness materials to help tourists understand routes, destinations, and important travel precautions.',
    descUr:
      'سیاحوں کو راستوں، منازل اور اہم سفری احتیاطوں کو سمجھنے میں مدد کے لیے معلوماتی پمفلٹس اور آگاہی مواد تقسیم کرتی ہے۔',
  },
  {
    id: 'public-facilitation',
    number: '05',
    icon: HeartHandshake,
    titleEn: 'Public Facilitation and Support',
    titleUr: 'عوامی سہولت اور معاونت',
    descEn:
      'Provides a convenient point of contact where tourists can seek assistance and guidance during their visit to the region.',
    descUr:
      'ایک آسان نقطۂ رابطہ فراہم کرتی ہے جہاں سیاح علاقے کے دورے کے دوران معاونت اور رہنمائی حاصل کر سکتے ہیں۔',
  },
];

interface Centre {
  id: string;
  src: string;
  en: string;
  ur: string;
}

const CENTRES: Centre[] = [
  {
    id: 'havelian',
    src: '/Facilitation Center Images/Center Havalian.jpg',
    en: 'Havelian Interchange',
    ur: 'ہویلیاں انٹرچینج',
  },
  {
    id: 'lari-adda',
    src: '/Facilitation Center Images/Faciliation Center Larri Adda Abbottabad.jpg',
    en: 'Lari Adda Abbottabad',
    ur: 'لاری اڈہ ایبٹ آباد',
  },
  {
    id: 'harno-bazar',
    src: '/Facilitation Center Images/Facilitation Center Harno.jpg',
    en: 'Harno Bazar',
    ur: 'ہرنو بازار',
  },
  {
    id: 'nathia-gali',
    src: '/Facilitation Center Images/Facilitation Center Nathigali.jpg',
    en: 'Nathia Gali',
    ur: 'ناتھیا گلی',
  },
  {
    id: 'barrian-entrance',
    src: '/Facilitation Center Images/Barrian Entrance.jpg',
    en: 'Barrian Entrance',
    ur: 'بریاں انٹرینس',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const TrafficFacilitationCenter: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCentre, setSelectedCentre] = useState<Centre | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ٹریفک سہولت مراکز | ٹریفک وارڈن ایبٹ آباد'
        : 'Facilitation Centres | Traffic Warden Abbottabad';
  }, [language]);

  useEffect(() => {
    if (selectedCentre) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCentre]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-light-bg">
      {/* ---------------------------------- HERO ---------------------------------- */}
      {/* Colour treatment matches the Mission & Vision / Mobile Workshop / Canteen
          Mobile hero: solid #000080 with a subtle pattern and a soft blue glow. */}
      <section className="relative overflow-hidden border-b border-[#0000aa] bg-[#000080] pt-8 pb-12 text-white sm:pb-14">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute end-0 top-0 h-80 w-80 rounded-full bg-brand-blue/30 blur-3xl"
          aria-hidden="true"
        />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Tourism', labelUrdu: 'سیاحت' },
              { label: 'Traffic Facilitation Center', labelUrdu: 'ٹریفک سہولت مرکز' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-lime">
              <Building className="h-3.5 w-3.5" aria-hidden="true" />
              {t('Tourism — Tourist Guidance', 'سیاحت — سیاحوں کی رہنمائی')}
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t(
                'ABBOTTABAD TRAFFIC POLICE FACILITATION CENTRES',
                'ایبٹ آباد ٹریفک پولیس سہولت مراکز'
              )}
            </h1>

            <p className="text-base font-semibold text-brand-lime sm:text-lg">
              {t(
                'Tourist Guidance and Facilitation Across Abbottabad and Galiyat',
                'ایبٹ آباد اور گلیات بھر میں سیاحوں کی رہنمائی و سہولت'
              )}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
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
                  {t(
                    'Guiding Tourists Towards Safe and Convenient Journeys',
                    'سیاحوں کی رہنمائی برائے محفوظ اور آسان سفر'
                  )}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Abbottabad Traffic Police has established five Tourist Facilitation Centres at key locations across Abbottabad and Galiyat to assist, guide, and facilitate tourists visiting the region. These centres are strategically located at Havelian Interchange, Lari Adda Abbottabad, Harno Bazar, Nathia Gali, and Barrian Entrance to provide visitors with useful travel information and guidance throughout their journeys.',
                    'ایبٹ آباد ٹریفک پولیس نے علاقے کا سفر کرنے والے سیاحوں کی معاونت، رہنمائی اور سہولت کے لیے ایبٹ آباد اور گلیات کے اہم مقامات پر پانچ ٹورسٹ سہولت مراکز قائم کیے ہیں۔ یہ مراکز حکمت عملی کے مطابق ہویلیاں انٹرچینج، لاری اڈہ ایبٹ آباد، ہرنو بازار، ناتھیا گلی اور بریاں انٹرینس پر واقع ہیں تاکہ سیاحوں کو اُن کے پورے سفر کے دوران مفید سفری معلومات اور رہنمائی فراہم کی جا سکے۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Dedicated staff members are available at these facilitation centres to help tourists identify suitable routes, obtain information about popular tourist destinations, and better understand local road conditions and travel arrangements. Through direct guidance, informational pamphlets, and other public awareness materials, the staff help visitors plan their journeys and explore the region with greater confidence.',
                    'ان سہولت مراکز میں سرشار عملہ موجود ہے جو سیاحوں کو موزوں راستوں کی نشاندہی، مقبول سیاحتی مقامات کی معلومات حاصل کرنے اور مقامی سڑکوں کی صورتحال اور سفری انتظامات کو بہتر طور پر سمجھنے میں مدد دیتا ہے۔ براہِ راست رہنمائی، معلوماتی پمفلٹس اور دیگر عوامی آگاہی مواد کے ذریعے عملہ سیاحوں کو اپنے سفر کی منصوبہ بندی اور زیادہ اعتماد کے ساتھ علاقے کی سیر کرنے میں مدد دیتا ہے۔'
                  )}
                </p>
              </div>

              {/* Facilitation callout */}
              <div className="lg:col-span-1">
                <div className="h-full rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <Building className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold leading-none text-brand-blue">
                      05
                    </span>
                    <h3 className="text-sm font-bold text-brand-blue-900 sm:text-base">
                      {t('Tourist Facilitation Centres', 'ٹورسٹ سہولت مراکز')}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-brand-blue-900/90">
                    {t(
                      'Strategically located across Abbottabad and Galiyat to assist visitors throughout their journeys.',
                      'سیاحوں کو اُن کے پورے سفر میں معاونت کے لیے ایبٹ آباد اور گلیات بھر میں حکمت عملی کے مطابق واقع۔'
                    )}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-brand-blue-200 pt-4">
                    {CALLOUT_POINTS.map((point) => (
                      <li
                        key={point.en}
                        className="flex items-start gap-2 text-xs leading-relaxed text-brand-blue-900/90 sm:text-sm"
                      >
                        <HandHeart
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue"
                          aria-hidden="true"
                        />
                        {t(point.en, point.ur)}
                      </li>
                    ))}
                  </ul>
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
                {t('What the Facilitation Centres Offer', 'سہولت مراکز کیا سہولت دیتے ہیں')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Guidance and information provided to tourists at each facilitation centre.',
                  'ہر سہولت مرکز پر سیاحوں کو فراہم کی جانے والی رہنمائی اور معلومات۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {KEY_SERVICES.map((service) => (
                <article
                  key={service.id}
                  className="flex h-full flex-col rounded-2xl border border-brand-light-border bg-brand-light-surface p-5 shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                      <service.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-2xl font-bold text-brand-blue-200">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold leading-snug text-brand-dark">
                    {t(service.titleEn, service.titleUr)}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-brand-light-text">
                    {t(service.descEn, service.descUr)}
                  </p>
                </article>
              ))}

              {/* Dedicated staff tile */}
              <article className="flex h-full flex-col justify-center rounded-2xl border border-[#0000aa] bg-[#000080] p-5 text-white">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-lime text-brand-dark">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold leading-snug">
                  {t('Dedicated Staff On Site', 'موقع پر سرشار عملہ')}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-blue-100">
                  {t(
                    'Dedicated staff members are available at these centres to help tourists identify suitable routes and understand local road conditions.',
                    'ان مراکز میں سرشار عملہ موجود ہے جو سیاحوں کو موزوں راستوں کی نشاندہی اور مقامی سڑکوں کی صورتحال سمجھنے میں مدد دیتا ہے۔'
                  )}
                </p>
              </article>
            </div>
          </section>

          {/* ---------------------------- FIVE CENTRES ---------------------------- */}
          <section aria-labelledby="centres-heading">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                {t('Our Centres', 'ہمارے مراکز')}
              </div>
              <h2
                id="centres-heading"
                className="mt-3 text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Our Five Tourist Facilitation Centres', 'ہمارے پانچ ٹورسٹ سہولت مراکز')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Established at key locations across Abbottabad and Galiyat.',
                  'ایبٹ آباد اور گلیات کے اہم مقامات پر قائم کیے گئے۔'
                )}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
              {CENTRES.map((centre) => (
                <button
                  key={centre.id}
                  type="button"
                  onClick={() => setSelectedCentre(centre)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-brand-light-border bg-slate-900 text-start shadow-gov transition-shadow hover:shadow-gov-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400 sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
                >
                  <img
                    src={centre.src}
                    alt={t(
                      `Tourist Facilitation Centre — ${centre.en}`,
                      `ٹورسٹ سہولت مرکز — ${centre.ur}`
                    )}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover opacity-95 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95"
                    aria-hidden="true"
                  />
                  <span className="absolute inset-x-4 bottom-4 z-10">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                      <span className="text-sm font-bold text-white sm:text-base">
                        {t(centre.en, centre.ur)}
                      </span>
                    </span>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-brand-lime opacity-0 transition-opacity group-hover:opacity-100">
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      {t('View photo', 'تصویر دیکھیں')}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* --------------------------------- MISSION ---------------------------- */}
          <section aria-labelledby="mission-heading">
            {/* Background colour matches the hero (#000080). */}
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
                  <h2 id="mission-heading" className="mt-4 text-xl font-bold sm:text-2xl">
                    {t('Our Mission', 'ہمارا مشن')}
                  </h2>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-sm leading-relaxed text-brand-blue-100 sm:text-base">
                    {t(
                      'The primary objective of these facilitation centres is to make travelling through Abbottabad and Galiyat easier, safer, and more convenient for visitors. By providing accessible information, route guidance, and friendly assistance, Abbottabad Traffic Police aims to enhance the tourist experience and promote safe, well-informed journeys across the region.',
                      'ان سہولت مراکز کا بنیادی مقصد ایبٹ آباد اور گلیات کے سفر کو سیاحوں کے لیے آسان، محفوظ اور زیادہ سہل بنانا ہے۔ قابلِ رسائی معلومات، راستوں کی رہنمائی اور دوستانہ معاونت کے ذریعے ایبٹ آباد ٹریفک پولیس سیاحوں کے تجربے کو بہتر بنانے اور علاقے بھر میں محفوظ اور باخبر سفر کو فروغ دینے کی کوشش کرتی ہے۔'
                    )}
                  </p>

                  <p className="mt-5 border-t border-white/15 pt-5 text-sm font-bold text-brand-lime sm:text-base">
                    {t(
                      'Abbottabad Traffic Police — Guiding Tourists, Facilitating Journeys, and Promoting Safer Roads.',
                      'ایبٹ آباد ٹریفک پولیس — سیاحوں کی رہنمائی، سفر کی سہولت اور محفوظ سڑکوں کا فروغ۔'
                    )}
                  </p>

                  {/* Helpline call to action */}
                  <div className="mt-5 flex flex-col gap-3 rounded-xl border border-brand-lime/30 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-start gap-2.5 text-sm font-semibold text-white">
                      <PhoneCall
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-lime"
                        aria-hidden="true"
                      />
                      {t(
                        'For assistance during your journey, call the Traffic Police Helpline 1915.',
                        'سفر کے دوران معاونت کے لیے ٹریفک پولیس ہیلپ لائن 1915 پر کال کریں۔'
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

      {/* -------------------------------- LIGHTBOX -------------------------------- */}
      {selectedCentre && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6"
          onClick={() => setSelectedCentre(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCentre.en}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCentre(null)}
              className="absolute end-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-black"
              aria-label={t('Close', 'بند کریں')}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex max-h-[70vh] items-center justify-center bg-black">
              <img
                src={selectedCentre.src}
                alt={selectedCentre.en}
                className="h-auto max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="bg-slate-900 p-5 text-white sm:p-6">
              <h3 className="text-base font-bold sm:text-lg">
                {t(
                  `Tourist Facilitation Centre — ${selectedCentre.en}`,
                  `ٹورسٹ سہولت مرکز — ${selectedCentre.ur}`
                )}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficFacilitationCenter;
