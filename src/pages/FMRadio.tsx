import React, { useEffect, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Eye,
  Maximize2,
  Megaphone,
  Radio,
  RadioTower,
  ShieldCheck,
  Target,
  Users,
  Volume2,
  X,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const AIR_TIME_EN = '11:00 AM – 12:00 PM';
const AIR_TIME_UR = '11:00 بجے دن تا 12:00 بجے دن';

const HERO_CHIPS = [
  {
    icon: RadioTower,
    en: 'Pakhtunkhwa FM Radio 92.4',
    ur: 'پختونخوا ایف ایم ریڈیو 92.4',
  },
  {
    icon: Clock,
    en: 'Mon–Fri 11:00 AM – 12:00 PM',
    ur: 'پیر تا جمعہ 11:00 تا 12:00 بجے دن',
  },
  {
    icon: Users,
    en: 'Community Awareness',
    ur: 'عوامی آگاہی',
  },
];

const STATS = [
  {
    icon: RadioTower,
    labelEn: 'Frequency',
    labelUr: 'فریکوئنسی',
    valueEn: '92.4 FM',
    valueUr: '92.4 ایف ایم',
  },
  {
    icon: Clock,
    labelEn: 'Air Time',
    labelUr: 'نشریاتی وقت',
    valueEn: AIR_TIME_EN,
    valueUr: AIR_TIME_UR,
  },
  {
    icon: CalendarDays,
    labelEn: 'Launched',
    labelUr: 'آغاز',
    valueEn: '2021',
    valueUr: '2021',
  },
];

const OBJECTIVES = [
  {
    icon: ShieldCheck,
    en: 'Promote awareness of traffic laws and road safety.',
    ur: 'ٹریفک قوانین اور روڈ سیفٹی کے بارے میں آگاہی کو فروغ دینا۔',
  },
  {
    icon: Users,
    en: 'Educate motorists, pedestrians, and other road users.',
    ur: 'ڈرائیوروں، پیدل چلنے والوں اور دیگر سڑک استعمال کرنے والوں کو آگاہ کرنا۔',
  },
  {
    icon: Megaphone,
    en: 'Highlight traffic-related public concerns and issues.',
    ur: 'ٹریفک سے متعلق عوامی مسائل اور شکایات کو اجاگر کرنا۔',
  },
  {
    icon: Target,
    en: 'Encourage responsible driving and civic cooperation.',
    ur: 'ذمہ دارانہ ڈرائیونگ اور شہری تعاون کی حوصلہ افزائی کرنا۔',
  },
  {
    icon: Volume2,
    en: 'Strengthen public engagement with Abbottabad Traffic Police.',
    ur: 'ایبٹ آباد ٹریفک پولیس کے ساتھ عوامی رابطے اور شرکت کو مضبوط بنانا۔',
  },
];

const GALLERY = [
  {
    id: 'fm-1',
    src: '/FM 92.4 Images/01.jpg',
    titleEn: 'Live broadcast of “Awaaz-e-Khalq” from the FM 92.4 studio',
    titleUr: 'ایف ایم 92.4 اسٹوڈیو سے ”آوازِ خلق“ کی براہِ راست نشریات',
  },
  {
    id: 'fm-2',
    src: '/FM 92.4 Images/02.jpg',
    titleEn: 'Traffic police officers on air discussing road safety awareness',
    titleUr: 'روڈ سیفٹی آگاہی پر گفتگو کرتے ہوئے ٹریفک پولیس افسران',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const FMRadio: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY)[number] | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'پختونخوا ایف ایم ریڈیو 92.4 | ٹریفک وارڈن ایبٹ آباد'
        : 'Pakhtunkhwa FM Radio 92.4 | Traffic Warden Abbottabad';
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
      {/* Colour treatment matches the official site heroes: solid #000080 with a
          subtle official pattern and a soft blue glow. */}
      <section className="relative overflow-hidden border-b border-[#0000aa] bg-[#000080] pt-8 pb-14 text-white">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute end-0 top-0 h-80 w-80 rounded-full bg-brand-blue/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 start-0 h-64 w-64 rounded-full bg-brand-lime/10 blur-3xl"
          aria-hidden="true"
        />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Initiatives', labelUrdu: 'اقدامات' },
              { label: 'FM Radio 92.4', labelUrdu: 'ایف ایم ریڈیو 92.4' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-lime">
              <Radio className="h-3.5 w-3.5" aria-hidden="true" />
              {t('Initiative — Public Awareness', 'اقدام — عوامی آگاہی')}
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t('PAKHTUNKHWA FM RADIO 92.4', 'پختونخوا ایف ایم ریڈیو 92.4')}
            </h1>

            <p className="text-base font-semibold text-brand-lime sm:text-lg">
              {t(
                '“Awaaz-e-Khalq” with Abbottabad Traffic Police',
                '”آوازِ خلق“ مع ایبٹ آباد ٹریفک پولیس'
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
          {/* --------------------------------- STATS ------------------------------- */}
          <section aria-label={t('Broadcast information', 'نشریاتی معلومات')}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {STATS.map((stat) => (
                <div
                  key={stat.labelEn}
                  className="flex items-center gap-4 rounded-2xl border border-brand-light-border bg-brand-light-surface p-5 shadow-gov"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                    <stat.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-light-muted">
                      {t(stat.labelEn, stat.labelUr)}
                    </p>
                    <p className="text-base font-bold text-brand-dark sm:text-lg">
                      {t(stat.valueEn, stat.valueUr)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

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
                    'A Platform for Public Awareness and Community Engagement',
                    'عوامی آگاہی اور کمیونٹی روابط کا ایک پلیٹ فارم'
                  )}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Launched in 2021 with the support of the Provincial Government, Pakhtunkhwa FM Radio 92.4 provides a valuable platform for public awareness, community engagement, and the dissemination of important information.',
                    '2021 میں صوبائی حکومت کے تعاون سے شروع کیا گیا، پختونخوا ایف ایم ریڈیو 92.4 عوامی آگاہی، کمیونٹی روابط اور اہم معلومات کی ترسیل کے لیے ایک قیمتی پلیٹ فارم فراہم کرتا ہے۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Through this platform, Abbottabad Traffic Police broadcasts its dedicated programme, “Awaaz-e-Khalq with Abbottabad Traffic Police,” which airs Monday to Friday from 11:00 AM to 12:00 PM.',
                    'اس پلیٹ فارم کے ذریعے ایبٹ آباد ٹریفک پولیس اپنا مخصوص پروگرام ”آوازِ خلق مع ایبٹ آباد ٹریفک پولیس“ نشر کرتی ہے، جو پیر تا جمعہ صبح 11:00 بجے سے دوپہر 12:00 بجے تک آن ایئر ہوتا ہے۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'The programme aims to strengthen communication between traffic police and the public by raising awareness about traffic rules, road safety, responsible driving, and traffic-related issues. It also provides an opportunity to highlight public concerns, share useful guidance, and encourage citizens to play an active role in promoting safer roads throughout Abbottabad.',
                    'اس پروگرام کا مقصد ٹریفک قوانین، روڈ سیفٹی، ذمہ دارانہ ڈرائیونگ اور ٹریفک سے متعلق مسائل پر آگاہی بڑھا کر ٹریفک پولیس اور عوام کے درمیان رابطے کو مضبوط بنانا ہے۔ یہ عوامی مسائل کو اجاگر کرنے، مفید رہنمائی فراہم کرنے اور شہریوں کو ایبٹ آباد بھر میں محفوظ سڑکوں کے فروغ میں فعال کردار ادا کرنے کی ترغیب بھی دیتا ہے۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'By using radio as an accessible means of communication, Abbottabad Traffic Police seeks to reach a wider audience, keep road users informed, and build stronger public trust through awareness, guidance, and community interaction.',
                    'ریڈیو کو رابطے کے ایک آسان ذریعے کے طور پر استعمال کرتے ہوئے، ایبٹ آباد ٹریفک پولیس زیادہ سے زیادہ سامعین تک پہنچنے، سڑک استعمال کرنے والوں کو باخبر رکھنے اور آگاہی، رہنمائی اور عوامی روابط کے ذریعے عوامی اعتماد کو مضبوط بنانے کی کوشش کرتی ہے۔'
                  )}
                </p>
              </div>

              {/* Broadcast timings callout */}
              <div className="lg:col-span-1">
                <div className="h-full rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <RadioTower className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-brand-blue-900 sm:text-base">
                    {t('Mon–Fri Broadcast', 'پیر تا جمعہ نشریات')}
                  </h3>
                  <p className="mt-1 text-2xl font-extrabold tracking-tight text-brand-blue-900 sm:text-3xl">
                    11:00 AM – 12:00 PM
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-blue-900/90">
                    {t(
                      'Tune in to Pakhtunkhwa FM Radio 92.4 every Monday to Friday from 11:00 AM to 12:00 PM for “Awaaz-e-Khalq with Abbottabad Traffic Police.”',
                      'پیر تا جمعہ صبح 11:00 بجے سے دوپہر 12:00 بجے تک پختونخوا ایف ایم ریڈیو 92.4 پر ”آوازِ خلق مع ایبٹ آباد ٹریفک پولیس“ ضرور سنیں۔'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------- OBJECTIVES ---------------------------- */}
          <section aria-labelledby="objectives-heading">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                <Target className="h-3.5 w-3.5" aria-hidden="true" />
                {t('Programme Objectives', 'پروگرام کے اہداف')}
              </div>
              <h2
                id="objectives-heading"
                className="mt-3 text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('What “Awaaz-e-Khalq” Sets Out to Achieve', '”آوازِ خلق“ کے بنیادی مقاصد')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'The programme is built around a clear set of goals that put road safety and public trust at the centre.',
                  'یہ پروگرام ایسے واضح اہداف پر مبنی ہے جو روڈ سیفٹی اور عوامی اعتماد کو مرکزی حیثیت دیتے ہیں۔'
                )}
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {OBJECTIVES.map((objective, index) => (
                <li
                  key={objective.en}
                  className="flex h-full items-start gap-3 rounded-2xl border border-brand-light-border bg-brand-light-surface p-5 shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
                    <objective.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-blue-200">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-brand-light-text">
                      {t(objective.en, objective.ur)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
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
                {t('Live from the FM 92.4 Studio', 'ایف ایم 92.4 اسٹوڈیو سے براہِ راست')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Photographs from the recording of “Awaaz-e-Khalq with Abbottabad Traffic Police.”',
                  '”آوازِ خلق مع ایبٹ آباد ٹریفک پولیس“ کی ریکارڈنگ کی تصاویر۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {GALLERY.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-brand-light-border bg-slate-900 shadow-gov transition-shadow hover:shadow-gov-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
                >
                  <img
                    src={image.src}
                    alt={image.titleEn}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover opacity-95 transition-opacity duration-300 group-hover:opacity-100"
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

          {/* --------------------------------- CLOSING ---------------------------- */}
          <section aria-labelledby="closing-heading">
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
                    <Radio className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 id="closing-heading" className="mt-4 text-xl font-bold sm:text-2xl">
                    {t('Tune In Mon–Fri', 'پیر تا جمعہ ضرور سنیں')}
                  </h2>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-sm leading-relaxed text-brand-blue-100 sm:text-base">
                    {t(
                      'Tune in every Monday to Friday from 11:00 AM to 12:00 PM for “Awaaz-e-Khalq with Abbottabad Traffic Police” on Pakhtunkhwa FM Radio 92.4.',
                      'پیر تا جمعہ صبح 11:00 بجے سے دوپہر 12:00 بجے تک پختونخوا ایف ایم ریڈیو 92.4 پر ”آوازِ خلق مع ایبٹ آباد ٹریفک پولیس“ ضرور سنیں۔'
                    )}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {[
                      { icon: Clock, label: AIR_TIME_EN, labelUr: AIR_TIME_UR },
                      { icon: RadioTower, label: 'Pakhtunkhwa FM 92.4', labelUr: 'پختونخوا ایف ایم 92.4' },
                      { icon: CheckCircle2, label: 'Mon–Fri Programme', labelUr: 'پیر تا جمعہ پروگرام' },
                    ].map((chip) => (
                      <span
                        key={chip.label}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold"
                      >
                        <chip.icon className="h-4 w-4 text-brand-lime" aria-hidden="true" />
                        {t(chip.label, chip.labelUr)}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 border-t border-white/15 pt-5 text-sm font-bold text-brand-lime sm:text-base">
                    {t(
                      'Abbottabad Traffic Police — Informing the Public, Promoting Safer Roads.',
                      'ایبٹ آباد ٹریفک پولیس — عوام کو باخبر رکھنا، محفوظ سڑکوں کا فروغ۔'
                    )}
                  </p>
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

export default FMRadio;
