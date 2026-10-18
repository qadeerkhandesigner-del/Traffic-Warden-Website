import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Car,
  Clock,
  ExternalLink,
  GraduationCap,
  Map,
  MapPin,
  Maximize2,
  Monitor,
  PhoneCall,
  Route,
  ShieldCheck,
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
    icon: Monitor,
    en: 'Modern Driving Simulator',
    ur: 'جدید ڈرائیونگ سمیولیٹر',
  },
  {
    icon: Calendar,
    en: '20-Day Structured Course',
    ur: '20 روزہ منظم کورس',
  },
  {
    icon: Route,
    en: 'Simulator + On-Road Training',
    ur: 'سمیولیٹر اور سڑک تربیت',
  },
];

interface SchoolFact {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  en: string;
  ur: string;
}

const SCHOOL_FACTS: SchoolFact[] = [
  {
    id: 'course',
    icon: GraduationCap,
    en: '20-day driving training course in two phases',
    ur: '20 روزہ ڈرائیونگ تربیتی کورس — دو مراحل میں',
  },
  {
    id: 'simulator',
    icon: Monitor,
    en: '6-day training on a modern driving simulator',
    ur: '6 دن جدید ڈرائیونگ سمیولیٹر پر تربیت',
  },
  {
    id: 'on-road',
    icon: Car,
    en: '14-day practical on-road driving sessions',
    ur: '14 دن عملی سڑک پر ڈرائیونگ سیشن',
  },
  {
    id: 'hours',
    icon: Clock,
    en: 'Open Monday to Friday, 8:00 AM – 4:00 PM',
    ur: 'پیر تا جمعہ، صبح 8:00 تا شام 4:00',
  },
];

interface Phase {
  id: string;
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  titleEn: string;
  titleUr: string;
  daysEn: string;
  daysUr: string;
  descEn: string;
  descUr: string;
}

const PHASES: Phase[] = [
  {
    id: 'simulator-phase',
    number: '01',
    icon: Monitor,
    titleEn: 'Simulator Training',
    titleUr: 'سمیولیٹر تربیت',
    daysEn: '6 Days',
    daysUr: '6 دن',
    descEn:
      'Learners receive initial driving instruction through a modern driving simulator, helping them become familiar with basic vehicle controls, steering techniques, and fundamental driving principles in a controlled environment.',
    descUr:
      'شاگرد جدید ڈرائیونگ سمیولیٹر کے ذریعے ابتدائی ڈرائیونگ ہدایات حاصل کرتے ہیں، جس سے وہ ایک کنٹرول شدہ ماحول میں بنیادی گاڑی کنٹرولز، اسٹیئرنگ تکنیک اور بنیادی ڈرائیونگ اصولوں سے واقف ہوتے ہیں۔',
  },
  {
    id: 'on-road-phase',
    number: '02',
    icon: Route,
    titleEn: 'Practical On-Road Training',
    titleUr: 'عملی سڑک تربیت',
    daysEn: '14 Days',
    daysUr: '14 دن',
    descEn:
      'After completing simulator training, learners proceed to practical driving sessions on the road. This phase focuses on vehicle handling, compliance with traffic laws, road awareness, and safe driving practices.',
    descUr:
      'سمیولیٹر تربیت مکمل کرنے کے بعد شاگرد سڑک پر عملی ڈرائیونگ سیشن کی طرف بڑھتے ہیں۔ اس مرحلے میں گاڑی کی ہینڈلنگ، ٹریفک قوانین کی پابندی، سڑک کی آگہی اور محفوظ ڈرائیونگ طریقوں پر زور دیا جاتا ہے۔',
  },
];

const GALLERY = [
  {
    id: 'gallery-building',
    src: '/Driving School/Driving School building.jpg',
    titleEn:
      'Traffic Police Abbottabad Driving School — Old DPO Office, Kacheri Compound, Abbottabad',
    titleUr:
      'ٹریفک پولیس ایبٹ آباد ڈرائیونگ اسکول — پرانا ڈی پی او آفس، کچہری کمپاؤنڈ، ایبٹ آباد',
  },
  {
    id: 'gallery-simulator-1',
    src: '/Driving School/simulator 01.jpg',
    titleEn:
      'Phase 1 training begins on the modern driving simulator, in a safe and controlled environment',
    titleUr:
      'مرحلہ اول کی تربیت جدید ڈرائیونگ سمیولیٹر پر محفوظ اور کنٹرول شدہ ماحول میں شروع ہوتی ہے',
  },
  {
    id: 'gallery-simulator-2',
    src: '/Driving School/Simulator 02.jpg',
    titleEn:
      'Learners practise vehicle controls and steering techniques on the driving simulator',
    titleUr:
      'شاگرد ڈرائیونگ سمیولیٹر پر گاڑی کے کنٹرولز اور اسٹیئرنگ تکنیک کی مشق کرتے ہیں',
  },
  {
    id: 'gallery-teaching',
    src: '/Driving School/teaching .jpg',
    titleEn:
      'Instruction on basic driving principles and traffic law compliance before on-road sessions',
    titleUr:
      'سڑک پر سیشن سے پہلے بنیادی ڈرائیونگ اصولوں اور ٹریفک قوانین کی تعلیم',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const DrivingSchool: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY)[number] | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ٹریفک پولیس ڈرائیونگ اسکول | ٹریفک وارڈن ایبٹ آباد'
        : 'Traffic Police Abbottabad Driving School | Traffic Warden Abbottabad';
  }, [language]);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-light-bg">
      {/* ---------------------------------- HERO ---------------------------------- */}
      <section className="relative overflow-hidden border-b border-[#0000aa] bg-[#000080] pt-8 pb-12 text-white sm:pb-14">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute end-0 top-0 h-80 w-80 rounded-full bg-brand-blue/30 blur-3xl"
          aria-hidden="true"
        />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Services', labelUrdu: 'خدمات', path: '/services' },
              { label: 'Driving School', labelUrdu: 'ڈرائیونگ اسکول', path: '/services/driving-school' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-lime">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
              {t('Services — Driving Education', 'خدمات — ڈرائیونگ تعلیم')}
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t(
                'TRAFFIC POLICE ABBOTTABAD DRIVING SCHOOL',
                'ٹریفک پولیس ایبٹ آباد ڈرائیونگ اسکول'
              )}
            </h1>

            <p className="text-base font-semibold text-brand-lime sm:text-lg">
              {t(
                'Safe Driving. Better Training. Responsible Citizens.',
                'محفوظ ڈرائیونگ۔ بہتر تربیت۔ باوقار شہری۔'
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
                    'Quality Driving Education for Safe, Confident Drivers',
                    'محفوظ اور پُراعتماد ڈرائیوروں کے لیے معیاری ڈرائیونگ تعلیم'
                  )}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'The Traffic Police Abbottabad Driving School is committed to providing citizens with quality driving education to promote safe, responsible, and confident driving.',
                    'ٹریفک پولیس ایبٹ آباد ڈرائیونگ اسکول شہریوں کو معیاری ڈرائیونگ تعلیم فراہم کرنے کے عہدے سے مکلف ہے تاکہ محفوظ، ذمہ دار اور پُراعتماد ڈرائیونگ کو فروغ دیا جا سکے۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Equipped with a modern driving simulator, the school enables learners to develop essential driving skills and understand basic driving principles before progressing to practical on-road training.',
                    'جدید ڈرائیونگ سمیولیٹر سے لیس یہ اسکول شاگردوں کو عملی سڑک تربیت کی طرف بڑھنے سے پہلے ضروری ڈرائیونگ مہارتیں پیدا کرنے اور بنیادی ڈرائیونگ اصولوں کو سمجھنے کے قابل بناتا ہے۔'
                  )}
                </p>

                {/* Operating hours + location */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-brand-dark">
                        {t('Operating Hours', 'اوقات کار')}
                      </h3>
                      <p className="mt-0.5 text-sm text-brand-light-muted">
                        {t('Monday to Friday', 'پیر تا جمعہ')}
                      </p>
                      <p className="text-sm font-semibold text-brand-blue-800">
                        8:00 AM – 4:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-brand-light-border bg-brand-light-surface p-4 shadow-gov">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-brand-dark">
                        {t('Location', 'مقام')}
                      </h3>
                      <p className="mt-0.5 text-sm leading-snug text-brand-light-muted">
                        {t(
                          'Old DPO Office, Kacheri Compound, Abbottabad.',
                          'پرانا ڈی پی او آفس، کچہری کمپاؤنڈ، ایبٹ آباد۔'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* School at a glance */}
              <div className="lg:col-span-1">
                <div className="h-full rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-brand-blue-900 sm:text-base">
                    {t('School at a Glance', 'ایک نظر میں اسکول')}
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {SCHOOL_FACTS.map((fact) => (
                      <li key={fact.id} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-brand-blue">
                          <fact.icon className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span className="text-sm leading-snug text-brand-blue-900/90">
                          {t(fact.en, fact.ur)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* --------------------------------- COURSE ----------------------------- */}
          <section aria-labelledby="course-heading">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                {t('Training Program', 'تربیتی پروگرام')}
              </div>
              <h2
                id="course-heading"
                className="mt-3 text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('20-Day Driving Training Course', '20 روزہ ڈرائیونگ تربیتی کورس')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'The training program is divided into two phases to provide learners with a structured learning experience.',
                  'تربیتی پروگرام دو مراحل میں تقسیم کیا گیا ہے تاکہ شاگردوں کو ایک منظم تعلیمی تجربہ فراہم کیا جا سکے۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {PHASES.map((phase) => (
                <article
                  key={phase.id}
                  className="flex h-full flex-col rounded-2xl border border-brand-light-border bg-brand-light-surface p-6 shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                      <phase.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-brand-blue px-3 py-1 text-xs font-bold text-white">
                        {t(phase.daysEn, phase.daysUr)}
                      </span>
                      <span
                        className="font-mono text-xl font-bold text-brand-blue-200"
                        aria-hidden="true"
                      >
                        {phase.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-bold leading-snug text-brand-dark">
                    {t(
                      `Phase ${phase.number === '01' ? '1' : '2'}: ${phase.titleEn}`,
                      `مرحلہ ${phase.number === '01' ? '1' : '2'}: ${phase.titleUr}`
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-light-muted">
                    {t(phase.descEn, phase.descUr)}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* --------------------------------- GALLERY ---------------------------- */}
          <section aria-labelledby="gallery-heading">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                {t('Gallery', 'تصویری جھلکیاں')}
              </div>
              <h2
                id="gallery-heading"
                className="mt-3 text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Inside the Driving School', 'ڈرائیونگ اسکول کی جھلکیاں')}
              </h2>
              <p className="mx-auto mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'The school building, simulator sessions and classroom instruction at the Traffic Police Driving School.',
                  'ٹریفک پولیس ڈرائیونگ اسکول کی عمارت، سمیولیٹر سیشنز اور کلاس روم تعلیم۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {GALLERY.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group relative block overflow-hidden rounded-2xl border border-brand-light-border bg-slate-900 shadow-gov transition-shadow hover:shadow-gov-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
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

          {/* --------------------------------- MISSION ---------------------------- */}
          <section aria-labelledby="mission-heading">
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
                    <Car className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 id="mission-heading" className="mt-4 text-xl font-bold sm:text-2xl">
                    {t('Learn to Drive the Right Way', 'صحیح طریقے سے ڈرائیونگ سیکھیں')}
                  </h2>

                  {/* Hours + location summary */}
                  <ul className="mt-5 space-y-3 text-sm">
                    <li className="flex items-start gap-2.5">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                      <span className="text-brand-blue-100">
                        {t('Monday to Friday', 'پیر تا جمعہ')}: 8:00 AM – 4:00 PM
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                      <span className="text-brand-blue-100">
                        {t(
                          'Old DPO Office, Kacheri Compound, Abbottabad.',
                          'پرانا ڈی پی او آفس، کچہری کمپاؤنڈ، ایبٹ آباد۔'
                        )}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Map className="mt-0.5 h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Traffic+Police+Driving+School+Kacheri+Compound+Abbottabad"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-brand-lime hover:underline"
                      >
                        {t('Find on Google Maps', 'Google Maps پر دیکھیں')}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-sm leading-relaxed text-brand-blue-100 sm:text-base">
                    {t(
                      'The Driving School gives citizens a structured path to safer driving — starting with supervised simulator sessions that build vehicle control and road sense in a risk-free environment, then moving to guided on-road practice that turns classroom rules into real driving habits. Training at the school supports the Abbottabad Traffic Police mission of reducing accidents and producing responsible, law-abiding drivers.',
                      'ڈرائیونگ اسکول شہریوں کو محفوظ ڈرائیونگ کی ایک منظم راہ دکھاتا ہے — پہلے نگرانی میں سمیولیٹر سیشنز جو بغیر کسی خطرے کے ماحول میں گاڑی کنٹرول اور سڑک کی سمجھ پیدا کرتے ہیں، پھر رہنمائی میں سڑک پر مشق جو کلاس روم کے اصولوں کو حقیقی ڈرائیونگ عادات میں بدلتی ہے۔ اسکول کی یہ تربیت حادثات کم کرنے اور ذمہ دار، قانون کے پابند ڈرائیوروں کو تیار کرنے کے ایبٹ آباد ٹریفک پولیس مشن کی حامی ہے۔'
                    )}
                  </p>

                  <p className="mt-5 border-t border-white/15 pt-5 text-sm font-bold text-brand-lime sm:text-base">
                    {t(
                      'Traffic Police Abbottabad — Safer Roads. Responsible Drivers. A Better Future.',
                      'ٹریفک پولیس ایبٹ آباد — زیادہ محفوظ سڑکیں۔ ذمہ دار ڈرائیور۔ بہتر مستقبل۔'
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
                        'For registration and course details, contact the Traffic Police Helpline 1915.',
                        'رجسٹریشن اور کورس کی تفصیل کے لیے ٹریفک پولیس ہیلپ لائن 1915 پر رابطہ کریں۔'
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
          aria-label={t('Image viewer', 'تصویر دیکھنے کا تناظر')}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label={t('Close image', 'تصویر بند کریں')}
            className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <figure
            className="max-h-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.titleEn}
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-xs text-white/85 sm:text-sm">
              {t(selectedImage.titleEn, selectedImage.titleUr)}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};

export default DrivingSchool;
