import React, { useEffect, useState } from 'react';
import {
  Compass,
  Disc3,
  Eye,
  HardHat,
  LifeBuoy,
  Maximize2,
  Mountain,
  PhoneCall,
  ShieldCheck,
  Target,
  ThermometerSun,
  TriangleAlert,
  Users,
  Wrench,
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
    icon: Wrench,
    en: 'On-Road Mechanical Assistance',
    ur: 'سڑک پر مکینیکل معاونت',
  },
  {
    icon: Mountain,
    en: 'Galiyat & Tourist Routes',
    ur: 'گلیات اور سیاحتی راستے',
  },
  {
    icon: ShieldCheck,
    en: 'Tourist Safety & Guidance',
    ur: 'سیاحوں کی حفاظت اور رہنمائی',
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
  warningEn?: string;
  warningUr?: string;
}

const KEY_SERVICES: KeyService[] = [
  {
    id: 'tyre-puncture',
    number: '01',
    icon: Disc3,
    titleEn: 'Flat Tyre and Puncture Assistance',
    titleUr: 'پھٹے ٹائر اور پنکچر میں معاونت',
    descEn:
      'Provides assistance to tourists facing flat tyres or punctures, helping them address tyre-related problems and resume their journey safely.',
    descUr:
      'پھٹے ٹائر یا پنکچر کا سامنا کرنے والے سیاحوں کی معاونت کرتی ہے تاکہ وہ ٹائر سے متعلق مسائل حل کر کے محفوظ طریقے سے اپنا سفر جاری رکھ سکیں۔',
  },
  {
    id: 'brake-overheating',
    number: '02',
    icon: ThermometerSun,
    titleEn: 'Brake Overheating Assistance',
    titleUr: 'بریک کے زیادہ گرم ہونے پر معاونت',
    descEn:
      'Offers guidance to motorists experiencing overheated brakes, particularly after prolonged braking on steep downhill routes. The mechanic can assess the situation and advise on appropriate action.',
    descUr:
      'خصوصاً کھڑی ڈھلوان راستوں پر مسلسل بریک لگانے کے بعد بریک کے زیادہ گرم ہونے کی صورت میں ڈرائیوروں کو رہنمائی فراہم کرتی ہے۔ مکینک صورتحال کا جائزہ لے کر مناسب اقدام کی ہدایت دیتا ہے۔',
    warningEn:
      'Vehicles with suspected brake damage are advised not to continue driving until it is safe to do so.',
    warningUr:
      'بریک میں خرابی کا شبہ ہونے کی صورت میں گاڑی کو محفوظ حالت تک پہنچنے سے پہلے مزید چلانے سے گریز کریں۔',
  },
  {
    id: 'minor-troubleshooting',
    number: '03',
    icon: Wrench,
    titleEn: 'Minor Mechanical Troubleshooting',
    titleUr: 'معمولی مکینیکل خرابیوں کی تشخیص',
    descEn:
      'Assists with common, minor vehicle issues that may arise during travel, helping motorists identify problems and determine the appropriate next steps.',
    descUr:
      'سفر کے دوران پیش آنے والے عام اور معمولی گاڑی کے مسائل میں معاونت کرتی ہے اور ڈرائیوروں کو مسئلے کی نشاندہی اور مناسب اگلے اقدام کے تعین میں مدد دیتی ہے۔',
  },
  {
    id: 'roadside-support',
    number: '04',
    icon: LifeBuoy,
    titleEn: 'Roadside Support During Vehicle Breakdowns',
    titleUr: 'گاڑی خراب ہونے پر سڑک کنارے مدد',
    descEn:
      'Helps tourists facing unexpected vehicle difficulties at tourist destinations and along routes covered by the mobile workshop.',
    descUr:
      'سیاحتی مقامات اور موبائل ورکشاپ کے زیرِ احاطہ راستوں پر گاڑی کی غیر متوقع خرابی کا سامنا کرنے والے سیاحوں کی مدد کرتی ہے۔',
  },
  {
    id: 'tourist-guidance',
    number: '05',
    icon: Compass,
    titleEn: 'Tourist Guidance and Assistance',
    titleUr: 'سیاحوں کی رہنمائی اور معاونت',
    descEn:
      "Provides practical guidance to visitors unfamiliar with Galiyat's mountainous roads, helping them understand basic vehicle safety precautions and the importance of safe driving practices.",
    descUr:
      'گلیات کی پہاڑی سڑکوں سے ناواقف سیاحوں کو عملی رہنمائی فراہم کرتی ہے اور گاڑی کے بنیادی حفاظتی اقدامات اور محفوظ ڈرائیونگ کی اہمیت سمجھنے میں مدد دیتی ہے۔',
  },
];

const GALLERY = [
  {
    id: 'gallery-1',
    src: '/Mobile Workshop Images/1792147893756.jpg',
    titleEn: 'Roadside assistance on a snow-covered Galiyat road',
    titleUr: 'برف سے ڈھکی گلیات سڑک پر سڑک کنارے معاونت',
  },
  {
    id: 'gallery-2',
    src: '/Mobile Workshop Images/1792147914620.jpg',
    titleEn: 'Mobile workshop van assisting a stranded tourist vehicle',
    titleUr: 'موبائل ورکشاپ وین خراب گاڑی کی مدد کرتے ہوئے',
  },
  {
    id: 'gallery-3',
    src: '/Mobile Workshop Images/1792147934970.jpg',
    titleEn: 'Mechanic inspecting and repairing a vehicle engine',
    titleUr: 'مکینک گاڑی کے انجن کا معائنہ اور مرمت کرتے ہوئے',
  },
  {
    id: 'gallery-4',
    src: '/Mobile Workshop Images/1792147960278.jpg',
    titleEn: 'Wheel and tyre assistance on a wet mountain road',
    titleUr: 'گیلی پہاڑی سڑک پر پہیے اور ٹائر میں معاونت',
  },
  {
    id: 'gallery-5',
    src: '/Mobile Workshop Images/1792147976798.jpg',
    titleEn: 'Recovering a vehicle stuck in snow with a tow rope',
    titleUr: 'ٹو رسی کی مدد سے برف میں پھنسی گاڑی کو نکالا جا رہا ہے',
  },
  {
    id: 'gallery-6',
    src: '/Mobile Workshop Images/1792147997591.jpg',
    titleEn: 'Traffic personnel managing a snowbound tourist route',
    titleUr: 'برف بند سیاحتی راستے پر ٹریفک اہلکاروں کا انتظام',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const MobileWorkshop: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY)[number] | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'موبائل ورکشاپ | ٹریفک وارڈن ایبٹ آباد'
        : 'Mobile Workshop | Traffic Warden Abbottabad';
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
      {/* Colour treatment matches the Mission & Vision hero: solid #000080 with a
          subtle official pattern and a soft blue glow. */}
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
              { label: 'Mobile Workshop', labelUrdu: 'موبائل ورکشاپ' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-lime">
              <HardHat className="h-3.5 w-3.5" aria-hidden="true" />
              {t('Tourism — Tourist Assistance', 'سیاحت — سیاحوں کی معاونت')}
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t(
                'ABBOTTABAD TRAFFIC POLICE MOBILE WORKSHOP',
                'ایبٹ آباد ٹریفک پولیس موبائل ورکشاپ'
              )}
            </h1>

            <p className="text-base font-semibold text-brand-lime sm:text-lg">
              {t(
                'On-Road Mechanical Assistance for Tourists',
                'سیاحوں کے لیے سڑک پر مکینیکل معاونت'
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
                    'Roadside Mechanical Support Across Galiyat',
                    'گلیات بھر میں سڑک کنارے مکینیکل معاونت'
                  )}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'The Abbottabad Traffic Police Mobile Workshop provides on-road mechanical assistance and guidance to tourists travelling to Galiyat and its surrounding tourist destinations. Staffed by a mechanic and deployed at various tourist locations, the mobile workshop helps visitors, particularly those travelling from other cities, deal with unexpected vehicle breakdowns and minor mechanical issues during their journeys.',
                    'ایبٹ آباد ٹریفک پولیس موبائل ورکشاپ گلیات اور اس کے گرد و نواح کے سیاحتی مقامات کا سفر کرنے والے سیاحوں کو سڑک پر مکینیکل معاونت اور رہنمائی فراہم کرتی ہے۔ ایک مکینک پر مشتمل یہ ورکشاپ مختلف سیاحتی مقامات پر تعینات رہتی ہے اور سیاحوں، بالخصوص دیگر شہروں سے آنے والوں، کو سفر کے دوران پیش آنے والی گاڑی کی غیر متوقع خرابیوں اور معمولی مکینیکل مسائل سے نمٹنے میں مدد دیتی ہے۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    "Galiyat's mountainous terrain, steep roads, sharp turns, and prolonged downhill driving can place additional stress on vehicles. To help motorists travel more safely and conveniently, the mobile workshop remains available to assist tourists with common vehicle problems and provide timely roadside support.",
                    'گلیات کا پہاڑی علاقہ، کھڑی سڑکیں، تیز موڑ اور طویل ڈھلوان پر گاڑی چلانا گاڑی پر اضافی دباؤ ڈالتا ہے۔ مسافروں کے محفوظ اور آسان سفر میں معاونت کے لیے موبائل ورکشاپ سیاحوں کو عام گاڑی کے مسائل میں مدد اور بروقت سڑک کنارے معاونت فراہم کرتی رہتی ہے۔'
                  )}
                </p>
              </div>

              {/* Mountain terrain callout */}
              <div className="lg:col-span-1">
                <div className="h-full rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <Mountain className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-brand-blue-900 sm:text-base">
                    {t('Why vehicles need extra care here', 'یہاں گاڑیوں کو اضافی توجہ کیوں درکار ہے')}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-blue-900/90">
                    {t(
                      "Galiyat's mountainous terrain, steep roads, sharp turns and prolonged downhill driving place additional stress on brakes, tyres and engines. The mobile workshop helps motorists deal with common vehicle problems and provides timely roadside support.",
                      'گلیات کا پہاڑی علاقہ، کھڑی سڑکیں، تیز موڑ اور طویل ڈھلوان پر گاڑی چلانا بریک، ٹائر اور انجن پر اضافی دباؤ ڈالتا ہے۔ موبائل ورکشاپ ڈرائیوروں کو عام گاڑی کے مسائل سے نمٹنے اور بروقت سڑک کنارے معاونت فراہم کرتی ہے۔'
                    )}
                  </p>
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
                {t('What the Mobile Workshop Offers', 'موبائل ورکشاپ کیا سہولت دیتی ہے')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Assistance covers the common mechanical difficulties tourists most often face on the roads of Galiyat.',
                  'یہ معاونت گلیات کی سڑکوں پر سیاحوں کو اکثر پیش آنے والی عام مکینیکل مشکلات پر محیط ہے۔'
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

                  {service.warningEn && (
                    <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
                      <TriangleAlert
                        className="mt-0.5 h-4 w-4 shrink-0 text-amber-700"
                        aria-hidden="true"
                      />
                      <p className="text-xs font-medium leading-relaxed text-amber-900">
                        {t(service.warningEn, service.warningUr ?? service.warningEn)}
                      </p>
                    </div>
                  )}
                </article>
              ))}

              {/* Mechanic deployment tile */}
              <article className="flex h-full flex-col justify-center rounded-2xl border border-[#0000aa] bg-[#000080] p-5 text-white">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-lime text-brand-dark">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold leading-snug">
                  {t('Staffed by a Mechanic', 'مکینک پر مشتمل عملہ')}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-blue-100">
                  {t(
                    'The workshop is staffed by a mechanic and deployed at various tourist locations across the region.',
                    'یہ ورکشاپ ایک مکینک پر مشتمل ہے اور علاقے کے مختلف سیاحتی مقامات پر تعینات رہتی ہے۔'
                  )}
                </p>
              </article>
            </div>
          </section>

          {/* --------------------------------- GALLERY ---------------------------- */}
          <section aria-labelledby="gallery-heading">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                {t('Gallery', 'تصویری جھلکیاں')}
              </div>
              <h2
                id="gallery-heading"
                className="mt-3 text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Mobile Workshop in the Field', 'فیلڈ میں موبائل ورکشاپ')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Photographs from on-road assistance provided to visitors on the tourist routes of Galiyat.',
                  'گلیات کے سیاحتی راستوں پر سیاحوں کو فراہم کی گئی سڑک کنارے معاونت کی تصاویر۔'
                )}
              </p>
            </div>

            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {GALLERY.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-brand-light-border bg-slate-900 shadow-gov transition-shadow hover:shadow-gov-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
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
                className="pointer-events-none absolute end-0 top-0 h-64 w-64 rounded-full bg-brand-blue/30 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative z-10 grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-3 lg:p-10">
                <div className="lg:col-span-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-lime text-brand-dark">
                    <Target className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2
                    id="mission-heading"
                    className="mt-4 text-xl font-bold sm:text-2xl"
                  >
                    {t('Our Mission', 'ہمارا مشن')}
                  </h2>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-sm leading-relaxed text-brand-blue-100 sm:text-base">
                    {t(
                      'The primary objective of the Abbottabad Traffic Police Mobile Workshop is to facilitate tourists, reduce inconvenience caused by minor vehicle problems, and promote safer journeys throughout Galiyat. By providing timely roadside assistance and practical guidance, the service supports a safer and more comfortable travel experience for visitors exploring the region.',
                      'ایبٹ آباد ٹریفک پولیس موبائل ورکشاپ کا بنیادی مقصد سیاحوں کی سہولت، معمولی گاڑی کے مسائل سے ہونے والی زحمت میں کمی اور گلیات بھر میں محفوظ سفر کو فروغ دینا ہے۔ بروقت سڑک کنارے معاونت اور عملی رہنمائی کے ذریعے یہ خدمت علاقے کی سیر کرنے والے سیاحوں کے لیے محفوظ اور آرام دہ سفری تجربے میں معاون ہے۔'
                    )}
                  </p>

                  <p className="mt-5 border-t border-white/15 pt-5 text-sm font-bold text-brand-lime sm:text-base">
                    {t(
                      'Abbottabad Traffic Police — Supporting Tourists, Assisting Motorists, and Promoting Safer Journeys.',
                      'ایبٹ آباد ٹریفک پولیس — سیاحوں کی معاونت، ڈرائیوروں کی مدد اور محفوظ سفر کا فروغ۔'
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
                        'If you need vehicle-related assistance while travelling, call the Traffic Police Helpline 1915.',
                        'سفر کے دوران اگر آپ کو گاڑی سے متعلق معاونت درکار ہو تو ٹریفک پولیس ہیلپ لائن 1915 پر کال کریں۔'
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.titleEn}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute end-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-black"
              aria-label={t('Close', 'بند کریں')}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex max-h-[70vh] items-center justify-center bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.titleEn}
                className="h-auto max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="bg-slate-900 p-5 text-white sm:p-6">
              <h3 className="text-base font-bold sm:text-lg">
                {t(selectedImage.titleEn, selectedImage.titleUr)}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileWorkshop;
