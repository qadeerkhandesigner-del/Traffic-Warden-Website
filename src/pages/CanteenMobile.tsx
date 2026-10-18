import React, { useEffect, useState } from 'react';
import {
  Baby,
  Candy,
  Cookie,
  CupSoda,
  Eye,
  GlassWater,
  HandHeart,
  HeartHandshake,
  MapPin,
  Maximize2,
  Mountain,
  PhoneCall,
  Target,
  Users,
  Utensils,
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
    icon: CupSoda,
    en: 'Seasonal Refreshments',
    ur: 'موسمی تازگی بخش مشروبات',
  },
  {
    icon: HandHeart,
    en: 'Complimentary Treats',
    ur: 'بلا معاوضہ تحائف',
  },
  {
    icon: MapPin,
    en: 'Galiyat Tourist Destinations',
    ur: 'گلیات کے سیاحتی مقامات',
  },
];

const DESTINATIONS = [
  { en: 'Nathia Gali', ur: 'ناتھیا گلی' },
  { en: 'Dunga Gali', ur: 'ڈونگا گلی' },
  { en: 'Ayubia', ur: 'ایوبیہ' },
  { en: 'Other popular tourist locations', ur: 'دیگر مقبول سیاحتی مقامات' },
];

interface Refreshment {
  id: string;
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  en: string;
  ur: string;
}

const REFRESHMENTS: Refreshment[] = [
  {
    id: 'beverages',
    number: '01',
    icon: CupSoda,
    en: 'Beverages according to the weather',
    ur: 'موسم کے مطابق مشروبات',
  },
  {
    id: 'juices',
    number: '02',
    icon: GlassWater,
    en: 'Juices',
    ur: 'جوس',
  },
  {
    id: 'biscuits',
    number: '03',
    icon: Cookie,
    en: 'Biscuits',
    ur: 'بسکٹ',
  },
  {
    id: 'chocolates',
    number: '04',
    icon: Candy,
    en: 'Chocolates',
    ur: 'چاکلیٹس',
  },
  {
    id: 'children-snacks',
    number: '05',
    icon: Baby,
    en: 'Snacks for children',
    ur: 'بچوں کے لیے اسنیکس',
  },
];

const CARE_POINTS = [
  {
    id: 'feel-at-home',
    icon: HandHeart,
    en: 'Helps visitors feel at home',
    ur: 'سیاحوں کو گھر جیسا احساس دلانے میں مدد دیتی ہے',
  },
  {
    id: 'positive-interactions',
    icon: HeartHandshake,
    en: 'Encourages positive interactions with traffic police personnel',
    ur: 'ٹریفک پولیس اہلکاروں کے ساتھ مثبت روابط کی حوصلہ افزائی کرتی ہے',
  },
  {
    id: 'memorable-experience',
    icon: Mountain,
    en: 'Contributes to a more pleasant and memorable experience while exploring the natural beauty of Galiyat',
    ur: 'گلیات کی قدرتی خوبصورتی سے لطف اندوز ہوتے ہوئے زیادہ خوشگوار اور یادگار تجربے میں معاون ہے',
  },
];

const GALLERY = [
  {
    id: 'gallery-1',
    src: '/Canteen Mobile Images/01.jpg',
    titleEn: 'Traffic police personnel offering refreshments to tourists at the Canteen Mobile',
    titleUr: 'کینٹین موبائل پر سیاحوں کو تازگیاں پیش کرتے ٹریفک پولیس اہلکار',
  },
  {
    id: 'gallery-2',
    src: '/Canteen Mobile Images/02.jpg',
    titleEn: 'The Canteen Mobile stationed on a Galiyat tourist route',
    titleUr: 'گلیات کے سیاحتی راستے پر موجود کینٹین موبائل',
  },
  {
    id: 'gallery-3',
    src: '/Canteen Mobile Images/03.jpg',
    titleEn: 'Canteen Mobile and Tourist Facilitation Centre at Nathia Gali',
    titleUr: 'ناتھیا گلی میں کینٹین موبائل اور ٹورسٹ سہولت مرکز',
  },
  {
    id: 'gallery-4',
    src: '/Canteen Mobile Images/04.jpg',
    titleEn: 'Officers offering complimentary refreshments to visitors',
    titleUr: 'سیاحوں کو بلا معاوضہ تازگیاں پیش کرتے اہلکار',
  },
  {
    id: 'gallery-5',
    src: '/Canteen Mobile Images/06.jpg',
    titleEn: 'A young visitor receiving a treat from traffic police personnel',
    titleUr: 'ٹریفک پولیس اہلکاروں سے تحفہ وصول کرتا ننھا مہمان',
  },
  {
    id: 'gallery-6',
    src: '/Canteen Mobile Images/new image.jpg',
    titleEn:
      'Women visitors sharing seasonal refreshments with traffic police personnel at the Canteen Mobile',
    titleUr: 'کینٹین موبائل پر ٹریفک پولیس اہلکاروں کے ساتھ موسمی تازگیاں شیئر کرتی خواتین مہمان',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const CanteenMobile: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY)[number] | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'کینٹین موبائل | ٹریفک وارڈن ایبٹ آباد'
        : 'Canteen Mobile | Traffic Warden Abbottabad';
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
    <div className="min-h-screen overflow-x-hidden bg-brand-light-bg">
      {/* ---------------------------------- HERO ---------------------------------- */}
      {/* Colour treatment matches the Mission & Vision / Mobile Workshop hero:
          solid #000080 with a subtle official pattern and a soft blue glow. */}
      <section className="relative overflow-hidden border-b border-[#0000aa] bg-[#000080] pt-6 pb-10 text-white sm:pt-8 sm:pb-14">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute end-0 top-0 h-56 w-56 rounded-full bg-brand-blue/30 blur-3xl sm:h-80 sm:w-80"
          aria-hidden="true"
        />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Tourism', labelUrdu: 'سیاحت' },
              { label: 'Canteen Mobile', labelUrdu: 'کینٹین موبائل' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
              <Utensils className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {t('Tourism — Tourist Facilitation', 'سیاحت — سیاحوں کی سہولت')}
              </span>
            </div>

            <h1 className="text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t(
                'ABBOTTABAD TRAFFIC POLICE CANTEEN MOBILE',
                'ایبٹ آباد ٹریفک پولیس کینٹین موبائل'
              )}
            </h1>

            <p className="text-sm font-semibold text-brand-lime sm:text-base md:text-lg">
              {t(
                'Seasonal Refreshments and a Warm Welcome for Tourists',
                'موسمی تازگیاں اور سیاحوں کے لیے گرمجوش خیرمقدم'
              )}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {HERO_CHIPS.map((chip) => (
                <span
                  key={chip.en}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm"
                >
                  <chip.icon className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                  {t(chip.en, chip.ur)}
                </span>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <div className="space-y-10 py-8 sm:space-y-14 sm:py-12 lg:py-16">
          {/* -------------------------------- OVERVIEW ---------------------------- */}
          <section aria-labelledby="overview-heading">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                  {t('Overview', 'تعارف')}
                </div>

                <h2
                  id="overview-heading"
                  className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
                >
                  {t(
                    'A Warm Welcome for Tourists Visiting Galiyat',
                    'گلیات آنے والے سیاحوں کے لیے گرمجوش خیرمقدم'
                  )}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'The Abbottabad Traffic Police Canteen Mobile is a tourist facilitation initiative designed to make visitors feel welcomed, comfortable, and valued during their trips to Galiyat. Accompanied by dedicated staff, the mobile canteen operates at key tourist destinations, including Nathia Gali, Dunga Gali, Ayubia, and other popular locations, particularly during peak tourist seasons and major festivals.',
                    'ایبٹ آباد ٹریفک پولیس کینٹین موبائل سیاحوں کی سہولت کا ایک منصوبہ ہے جس کا مقصد گلیات کے سفر کے دوران سیاحوں کو خوش آمدید، آرام دہ اور قدر کی نگاہ سے دیکھے جانے کا احساس دلانا ہے۔ سرشار عملے کے ہمراہ یہ موبائل کینٹین ناتھیا گلی، ڈونگا گلی، ایوبیہ اور دیگر مقبول مقامات پر خدمات انجام دیتی ہے، بالخصوص سیاحت کے عروج کے موسم اور بڑے تہواروں کے دوران۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'The initiative offers seasonal refreshments and complimentary treats to tourists, including beverages according to the weather, juices, biscuits, chocolates, and snacks for children. By providing these thoughtful refreshments and extending a friendly welcome, Abbottabad Traffic Police aims to create a warm and hospitable atmosphere for families and visitors travelling from different parts of the country.',
                    'یہ منصوبہ سیاحوں کو موسمی تازگیاں اور بلا معاوضہ تحائف فراہم کرتا ہے، جن میں موسم کے مطابق مشروبات، جوس، بسکٹ، چاکلیٹس اور بچوں کے لیے اسنیکس شامل ہیں۔ ان خیال رکھنے والی تازگیوں اور دوستانہ خیرمقدم کے ذریعے ایبٹ آباد ٹریفک پولیس ملک کے مختلف حصوں سے آنے والے خاندانوں اور سیاحوں کے لیے گرم اور مہمان نواز ماحول پیدا کرنا چاہتی ہے۔'
                  )}
                </p>
              </div>

              {/* Deployment locations callout */}
              <div className="lg:col-span-1">
                <div className="h-full rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-4 sm:p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-brand-blue-900 sm:text-base">
                    {t('Key Deployment Locations', 'اہم تعیناتی مقامات')}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {DESTINATIONS.map((destination) => (
                      <li
                        key={destination.en}
                        className="flex items-start gap-2 text-sm leading-snug text-brand-blue-900/90"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue"
                          aria-hidden="true"
                        />
                        {t(destination.en, destination.ur)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-brand-blue-200 pt-3 text-xs font-medium leading-relaxed text-brand-blue-900/80">
                    {t(
                      'Particularly during peak tourist seasons and major festivals.',
                      'بالخصوص سیاحت کے عروج کے موسم اور بڑے تہواروں کے دوران۔'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------------- WHAT WE OFFER --------------------------- */}
          <section aria-labelledby="offer-heading">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                {t('What We Offer', 'ہم کیا فراہم کرتے ہیں')}
              </div>
              <h2
                id="offer-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('What the Canteen Mobile Offers', 'کینٹین موبائل کیا فراہم کرتی ہے')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Seasonal refreshments and complimentary treats offered to tourists visiting Galiyat.',
                  'گلیات آنے والے سیاحوں کو موسمی تازگیاں اور بلا معاوضہ تحائف فراہم کیے جاتے ہیں۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {REFRESHMENTS.map((item) => (
                <article
                  key={item.id}
                  className="flex h-full flex-col justify-center rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span
                      className="font-mono text-2xl font-bold text-brand-blue-200"
                      aria-hidden="true"
                    >
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold leading-snug text-brand-dark">
                    {t(item.en, item.ur)}
                  </h3>
                </article>
              ))}

              {/* Dedicated staff tile */}
              <article className="flex h-full flex-col justify-center rounded-2xl border border-[#0000aa] bg-[#000080] p-4 text-white sm:p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-lime text-brand-dark">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold leading-snug">
                  {t('Accompanied by Dedicated Staff', 'سرشار عملے کے ہمراہ')}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-blue-100">
                  {t(
                    'The mobile canteen is accompanied by dedicated staff at key tourist destinations.',
                    'موبائل کینٹین اہم سیاحتی مقامات پر سرشار عملے کے ہمراہ خدمات انجام دیتی ہے۔'
                  )}
                </p>
              </article>
            </div>
          </section>

          {/* -------------------------- TOURIST CARE ------------------------------ */}
          <section aria-labelledby="care-heading">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                {t('Tourist Care', 'سیاحوں کی دیکھ بھال')}
              </div>
              <h2
                id="care-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t(
                  'Beyond Refreshments: A Commitment to Tourist Care',
                  'تازگیوں سے آگے: سیاحوں کی دیکھ بھال کا عزم'
                )}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Beyond refreshments, the Canteen Mobile reflects a commitment to tourist care and public service.',
                  'تازگیوں سے آگے، کینٹین موبائل سیاحوں کی دیکھ بھال اور عوامی خدمت کے عزم کا مظہر ہے۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {CARE_POINTS.map((point) => (
                <article
                  key={point.id}
                  className="flex h-full flex-col rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md sm:p-5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-lime/25 text-brand-blue-900">
                    <point.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-brand-dark sm:text-base">
                    {t(point.en, point.ur)}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* --------------------------------- GALLERY ---------------------------- */}
          <section aria-labelledby="gallery-heading">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                {t('Gallery', 'تصویری جھلکیاں')}
              </div>
              <h2
                id="gallery-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Canteen Mobile in the Field', 'فیلڈ میں کینٹین موبائل')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Photographs from the Canteen Mobile at tourist destinations in Galiyat.',
                  'گلیات کے سیاحتی مقامات پر کینٹین موبائل کی تصاویر۔'
                )}
              </p>
            </div>

            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {GALLERY.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-brand-light-border bg-slate-900 shadow-gov transition-shadow hover:shadow-gov-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
                >
                  <img
                    src={image.src}
                    alt={image.titleEn}
                    loading="lazy"
                    className="w-full object-cover opacity-95 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                    aria-hidden="true"
                  />
                  <span className="absolute inset-x-3 bottom-3 z-10 text-start">
                    <span className="block text-xs font-semibold leading-snug text-white sm:text-sm">
                      {t(image.titleEn, image.titleUr)}
                    </span>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-brand-lime opacity-0 transition-opacity group-hover:opacity-100">
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      {t('View full size', 'بڑی تصویر دیکھیں')}
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
                className="pointer-events-none absolute end-0 top-0 h-48 w-48 rounded-full bg-brand-blue/30 blur-3xl sm:h-64 sm:w-64"
                aria-hidden="true"
              />

              <div className="relative z-10 grid grid-cols-1 gap-6 p-5 sm:p-8 lg:grid-cols-3 lg:p-10">
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
                      'To promote hospitality, strengthen public trust, and enhance the tourist experience through friendly service, seasonal refreshments, and a welcoming environment for visitors of all ages.',
                      'مہمان نوازی کو فروغ دینا، عوامی اعتماد کو مضبوط بنانا اور دوستانہ خدمت، موسمی تازگیوں اور ہر عمر کے سیاحوں کے لیے خوش آئند ماحول کے ذریعے سیاحوں کے تجربے کو بہتر بنانا۔'
                    )}
                  </p>

                  <p className="mt-5 border-t border-white/15 pt-5 text-sm font-bold text-brand-lime sm:text-base">
                    {t(
                      'Abbottabad Traffic Police — Welcoming Tourists with Care, Serving with Hospitality.',
                      'ایبٹ آباد ٹریفک پولیس — خیال کے ساتھ سیاحوں کا خیرمقدم، مہمان نوازی کے ساتھ خدمت۔'
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
                        'For assistance during your visit to Galiyat, call the Traffic Police Helpline 1915.',
                        'گلیات میں اپنے دورے کے دوران معاونت کے لیے ٹریفک پولیس ہیلپ لائن 1915 پر کال کریں۔'
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
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.titleEn}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute end-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-black sm:end-4 sm:top-4 sm:h-10 sm:w-10"
              aria-label={t('Close', 'بند کریں')}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex min-h-0 flex-1 items-center justify-center bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.titleEn}
                className="h-auto max-h-[75vh] w-full object-contain"
              />
            </div>

            <div className="max-h-[25vh] overflow-y-auto bg-slate-900 p-4 text-white sm:p-6">
              <h3 className="text-sm font-bold sm:text-lg">
                {t(selectedImage.titleEn, selectedImage.titleUr)}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanteenMobile;
