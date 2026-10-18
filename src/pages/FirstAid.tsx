import React, { useEffect, useState } from 'react';
import {
  Ambulance,
  Bike,
  Droplets,
  Eye,
  HeartPulse,
  Maximize2,
  PhoneCall,
  ShieldCheck,
  Siren,
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
    icon: Users,
    en: 'Five Trained Riders',
    ur: 'پانچ تربیت یافتہ رائیڈرز',
  },
  {
    icon: Siren,
    en: 'Rapid Emergency Response',
    ur: 'فوری ہنگامی ردعمل',
  },
  {
    icon: HeartPulse,
    en: 'Immediate First Aid',
    ur: 'فوری فرسٹ ایڈ',
  },
];

interface SquadFact {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  en: string;
  ur: string;
}

const SQUAD_FACTS: SquadFact[] = [
  {
    id: 'trained-riders',
    icon: Users,
    en: 'Five trained riders with comprehensive medical training',
    ur: 'جامع طبی تربیت یافتہ پانچ رائیڈرز',
  },
  {
    id: 'deployment',
    icon: Bike,
    en: 'Deployed at different locations across Abbottabad',
    ur: 'ایبٹ آباد بھر میں مختلف مقامات پر تعینات',
  },
  {
    id: 'response',
    icon: Siren,
    en: 'Aimed at reaching injured persons as quickly as possible',
    ur: 'زخمی افراد تک حتیٰ الامکان جلد پہنچنے کا ہدف',
  },
  {
    id: 'support',
    icon: Ambulance,
    en: 'Immediate assistance while awaiting an ambulance',
    ur: 'ایمبولینس کے انتظار کے دوران فوری امداد',
  },
];

interface Responsibility {
  id: string;
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  titleEn: string;
  titleUr: string;
  descEn: string;
  descUr: string;
}

const RESPONSIBILITIES: Responsibility[] = [
  {
    id: 'rapid-response',
    number: '01',
    icon: Siren,
    titleEn: 'Rapid Response to Road Accidents',
    titleUr: 'سڑک حادثات پر فوری ردعمل',
    descEn:
      'The First Aid Squad responds promptly to reported road accidents, helping ensure that injured individuals receive initial medical attention without unnecessary delay.',
    descUr:
      'فرسٹ ایڈ اسکواڈ اطلاع ملنے پر فوری طور پر سڑک حادثات کے مقام پر پہنچتا ہے تاکہ زخمی افراد کو بلا ضروری تاخیر ابتدائی طبی توجہ مل سکے۔',
  },
  {
    id: 'immediate-first-aid',
    number: '02',
    icon: HeartPulse,
    titleEn: 'Immediate First Aid',
    titleUr: 'فوری فرسٹ ایڈ',
    descEn:
      'Trained riders provide appropriate initial assistance based on their training, helping manage injuries and support the condition of injured persons until professional medical teams arrive.',
    descUr:
      'تربیت یافتہ رائیڈرز اپنی تربیت کی بنیاد پر مناسب ابتدائی امداد فراہم کرتے ہیں، زخموں کے انتظام اور زخمی افراد کی حالت سنبھالنے میں مدد کرتے ہیں تاکہ پیشہ ور طبی ٹیمیں پہنچ سکیں۔',
  },
  {
    id: 'bleeding-control',
    number: '03',
    icon: Droplets,
    titleEn: 'Bleeding Control',
    titleUr: 'خون کا بہاؤ روکنا',
    descEn:
      'Where appropriate and within their training, squad members help control severe bleeding through suitable first-aid techniques, reducing the risk of further blood loss while awaiting emergency medical assistance.',
    descUr:
      'جہاں مناسب ہو اور اپنی تربیت کے مطابق، اسکواڈ کے ارکان موزوں فرسٹ ایڈ تکنیک کے ذریعے شدید خون کے بہاؤ کو روکنے میں مدد کرتے ہیں، جس سے ہنگامی طبی امداد کے انتظار میں مزید خون ضائع ہونے کا خطرہ کم ہوتا ہے۔',
  },
  {
    id: 'ambulance-support',
    number: '04',
    icon: Ambulance,
    titleEn: 'Support Until Ambulance Arrival',
    titleUr: 'ایمبولینس آنے تک معاونت',
    descEn:
      'The squad bridges the critical gap between an accident occurring and the arrival of an ambulance, helping ensure that injured persons are not left without initial assistance.',
    descUr:
      'یہ اسکواڈ حادثے کے وقوع پذیر ہونے اور ایمبولینس کی آمد کے درمیانی نازک وقفے کو پُر کرتا ہے، تاکہ زخمی افراد ابتدائی امداد سے محروم نہ رہیں۔',
  },
  {
    id: 'coordination',
    number: '05',
    icon: ShieldCheck,
    titleEn: 'Coordination at Accident Scenes',
    titleUr: 'حادثے کے مقام پر رابطہ کاری',
    descEn:
      'First Aid Squad members can assist in coordinating with emergency responders and traffic personnel to facilitate access to injured individuals and help maintain safety around the accident scene.',
    descUr:
      'فرسٹ ایڈ اسکواڈ کے ارکان ہنگامی ریسپانڈرز اور ٹریفک اہلکاروں کے ساتھ رابطہ کاری میں مدد کر سکتے ہیں تاکہ زخمی افراد تک رسائی آسان ہو اور حادثے کے مقام کے گرد حفاظت برقرار رہے۔',
  },
];

const GALLERY = [
  {
    id: 'gallery-1',
    src: '/First Aid/01.jpg',
    titleEn:
      'The Abbottabad Traffic Police accident response unit equipped for rapid first aid on the roads',
    titleUr:
      'سڑکوں پر فوری فرسٹ ایڈ کے لیے لیس ایبٹ آباد ٹریفک پولیس کا حادثہ جواب عمل یونٹ',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const FirstAid: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY)[number] | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'فرسٹ ایڈ اسکواڈ | ٹریفک وارڈن ایبٹ آباد'
        : 'First Aid Squad | Traffic Warden Abbottabad';
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
              { label: 'First Aid', labelUrdu: 'فرسٹ ایڈ' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-lime">
              <HeartPulse className="h-3.5 w-3.5" aria-hidden="true" />
              {t('Tourism — Emergency Response', 'سیاحت — ہنگامی ردعمل')}
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t(
                'ABBOTTABAD TRAFFIC POLICE FIRST AID SQUAD',
                'ایبٹ آباد ٹریفک پولیس فرسٹ ایڈ اسکواڈ'
              )}
            </h1>

            <p className="text-base font-semibold text-brand-lime sm:text-lg">
              {t(
                'Rapid Emergency Response and Immediate First Aid',
                'فوری ہنگامی ردعمل اور ابتدائی طبی امداد'
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
                    'A Dedicated First Aid Squad for Road Emergencies',
                    'سڑک کی ہنگامی حالات کے لیے ایک خصوصی فرسٹ ایڈ اسکواڈ'
                  )}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Abbottabad Traffic Police has recently launched a dedicated First Aid Squad to provide timely initial medical assistance to people injured in road traffic accidents and other road emergencies across Abbottabad.',
                    'ایبٹ آباد ٹریفک پولیس نے حال ہی میں ایک خصوصی فرسٹ ایڈ اسکواڈ کا آغاز کیا ہے تاکہ ایبٹ آباد بھر میں سڑک حادثات اور دیگر ہنگامی حالات میں زخمی افراد کو بروقت ابتدائی طبی امداد فراہم کی جا سکے۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'The squad comprises five trained riders, all of whom have received comprehensive medical training to help them respond promptly and provide appropriate first aid at accident scenes. Deployed at different locations, these riders aim to reach injured persons as quickly as possible and provide immediate assistance while waiting for an ambulance or other emergency medical services to arrive.',
                    'یہ اسکواڈ پانچ تربیت یافتہ رائیڈرز پر مشتمل ہے، جن سب نے جامع طبی تربیت حاصل کی ہے تاکہ وہ حادثے کے مقام پر فوری پہنچ کر مناسب فرسٹ ایڈ فراہم کر سکیں۔ مختلف مقامات پر تعینات یہ رائیڈرز زخمی افراد تک حتیٰ الامکان جلد پہنچنے اور ایمبولینس یا دیگر ہنگامی طبی خدمات کے آنے تک فوری امداد فراہم کرنے کا ہدف رکھتے ہیں۔'
                  )}
                </p>
              </div>

              {/* Squad at a glance */}
              <div className="lg:col-span-1">
                <div className="h-full rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <Users className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-brand-blue-900 sm:text-base">
                    {t('Squad at a Glance', 'ایک نظر میں اسکواڈ')}
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {SQUAD_FACTS.map((fact) => (
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

          {/* ---------------------------- RESPONSIBILITIES ------------------------ */}
          <section aria-labelledby="responsibilities-heading">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                {t('Key Responsibilities', 'اہم ذمہ داریاں')}
              </div>
              <h2
                id="responsibilities-heading"
                className="mt-3 text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('What the First Aid Squad Does', 'فرسٹ ایڈ اسکواڈ کیا کرتا ہے')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'The core responsibilities of the squad at accident scenes and road emergencies.',
                  'حادثے کے مقامات اور سڑک کی ہنگامی حالات میں اسکواڈ کی بنیادی ذمہ داریاں۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {RESPONSIBILITIES.map((item) => (
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
            </div>
          </section>

          {/* --------------------------------- GALLERY ---------------------------- */}
          <section aria-labelledby="gallery-heading">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                {t('Gallery', 'تصویری جھلکیاں')}
              </div>
              <h2
                id="gallery-heading"
                className="mt-3 text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('The First Aid Squad in the Field', 'فیلڈ میں فرسٹ ایڈ اسکواڈ')}
              </h2>
              <p className="mx-auto mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'The response unit prepared to deliver immediate first aid on Abbottabad roads.',
                  'ایبٹ آباد کی سڑکوں پر فوری فرسٹ ایڈ فراہم کرنے کے لیے تیار ریسپانس یونٹ۔'
                )}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {GALLERY.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group relative block w-full max-w-xl overflow-hidden rounded-2xl border border-brand-light-border bg-slate-900 shadow-gov transition-shadow hover:shadow-gov-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
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
                      'The primary objective of the Abbottabad Traffic Police First Aid Squad is to improve the initial response to road accidents, reduce delays in receiving first aid, and contribute to the protection of human life. Through trained personnel and rapid deployment, the squad supports a safer road environment and strengthens emergency assistance for the public.',
                      'ایبٹ آباد ٹریفک پولیس فرسٹ ایڈ اسکواڈ کا بنیادی مقصد سڑک حادثات پر ابتدائی ردعمل کو بہتر بنانا، فرسٹ ایڈ ملنے میں تاخیر کو کم کرنا اور انسانی زندگی کے تحفظ میں حصہ ڈالنا ہے۔ تربیت یافتہ عملہ اور فوری تعیناتی کے ذریعے یہ اسکواڈ ایک محفوظ سڑک ماحول کو فروغ دیتا ہے اور عوامی ہنگامی امداد کو مضبوط بناتا ہے۔'
                    )}
                  </p>

                  <p className="mt-5 border-t border-white/15 pt-5 text-sm font-bold text-brand-lime sm:text-base">
                    {t(
                      'Abbottabad Traffic Police — Responding Quickly, Providing First Aid, Protecting Lives.',
                      'ایبٹ آباد ٹریفک پولیس — فوری ردعمل، فرسٹ ایڈ اور زندگیوں کا تحفظ۔'
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
                        'In a road emergency, call the Traffic Police Helpline 1915 for immediate assistance.',
                        'سڑک کی کسی ہنگامی صورت میں فوری مدد کے لیے ٹریفک پولیس ہیلپ لائن 1915 پر کال کریں۔'
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

export default FirstAid;
