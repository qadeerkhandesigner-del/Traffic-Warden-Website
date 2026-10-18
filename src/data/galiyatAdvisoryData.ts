import type {
  AdvisoryCategoryMeta,
  AdvisoryPriorityMeta,
  GaliyatLocation,
  TravelAdvisory,
} from '../types/galiyat';

/**
 * Galiyat Traffic & Travel Advisory — reference data & DEMO content
 * =================================================================
 *
 * IMPORTANT — DEMO DATA
 * ---------------------
 * Everything inside `buildDemoAdvisories()` is SAMPLE content used to design and
 * demonstrate the interface. It must never be presented as a real government
 * announcement, a verified road closure, or a live weather warning.
 *
 * When a real backend is connected (Supabase table, REST endpoint or CMS), the
 * live records should be returned from `src/services/galiyatAdvisoryService.ts`
 * and this demo generator should be switched off. Demo records are also flagged
 * with `isDemo: true` so the UI can label them clearly.
 */

/**
 * Locations supported by the advisory filters.
 * To add a new location, append an entry here, add its id to
 * `GaliyatLocationId` in `src/types/galiyat.ts`, and add the label used in the
 * filter dropdown (the dropdown is generated from this array).
 */
export const GALIYAT_LOCATIONS: GaliyatLocation[] = [
  {
    id: 'nathia-gali',
    name: 'Nathia Gali',
    nameUrdu: 'نتھیا گلی',
    elevationMeters: 2501,
  },
  {
    id: 'ayubia',
    name: 'Ayubia',
    nameUrdu: 'ایوبیہ',
    elevationMeters: 2400,
  },
  {
    id: 'dunga-gali',
    name: 'Dunga Gali',
    nameUrdu: 'ڈونگا گلی',
    elevationMeters: 2587,
  },
  {
    id: 'thandiani',
    name: 'Thandiani',
    nameUrdu: 'ٹھنڈیانی',
    elevationMeters: 2700,
  },
];

/** Label used for advisories that apply to the whole Galiyat region. */
export const ALL_GALIYAT_LABEL = { name: 'All Galiyat', nameUrdu: 'تمام گلیات' };

/** The five advisory categories shown as quick-information cards and filters. */
export const ADVISORY_CATEGORIES: AdvisoryCategoryMeta[] = [
  {
    id: 'weather',
    label: 'Weather Alerts',
    labelUrdu: 'موسمی انتباہات',
    description: 'Rain, snowfall and storm related travel alerts.',
    descriptionUrdu: 'بارش، برف باری اور طوفان سے متعلق سفری انتباہات۔',
    iconName: 'CloudSnow',
  },
  {
    id: 'snowfall',
    label: 'Snowfall Alert',
    labelUrdu: 'برف باری الرٹ',
    description: 'Snowfall alerts, icy roads and chain requirements.',
    descriptionUrdu: 'برف باری کے الرٹس، برفیلے سڑکوں اور چین لگانے کی ہدایات۔',
    iconName: 'Snowflake',
  },
  {
    id: 'road-closure',
    label: 'Road Closures',
    labelUrdu: 'سڑک بندش',
    description: 'Closures, maintenance work and blocked sections.',
    descriptionUrdu: 'بندش، مرمت کا کام اور مسدود حصے۔',
    iconName: 'Construction',
  },
  {
    id: 'diversion',
    label: 'Traffic Diversions',
    labelUrdu: 'ٹریفک ڈائیورژن',
    description: 'Alternative routes and one-way movement arrangements.',
    descriptionUrdu: 'متبادل راستے اور یک طرفہ گزر کے انتظامات۔',
    iconName: 'Signpost',
  },
  {
    id: 'fog',
    label: 'Fog & Low Visibility',
    labelUrdu: 'دھند اور کم رویت',
    description: 'Fog patches and reduced visibility on hill roads.',
    descriptionUrdu: 'پہاڑی سڑکوں پر دھند کے جھونکے اور کم رویت۔',
    iconName: 'CloudFog',
  },
  {
    id: 'safety',
    label: 'Travel Safety',
    labelUrdu: 'سفری حفاظت',
    description: 'General safety guidance for visitors to Galiyat.',
    descriptionUrdu: 'گلیات آنے والے سیاحوں کے لیے عمومی حفاظتی رہنمائی۔',
    iconName: 'ShieldCheck',
  },
];

/** Priority metadata. Each level has text + icon so colour is never the only cue. */
export const ADVISORY_PRIORITIES: AdvisoryPriorityMeta[] = [
  {
    id: 'low',
    label: 'Low',
    labelUrdu: 'کم',
    weight: 1,
    iconName: 'Info',
  },
  {
    id: 'medium',
    label: 'Medium',
    labelUrdu: 'درمیانہ',
    weight: 2,
    iconName: 'CircleAlert',
  },
  {
    id: 'high',
    label: 'High',
    labelUrdu: 'زیادہ',
    weight: 3,
    iconName: 'TriangleAlert',
  },
  {
    id: 'critical',
    label: 'Critical',
    labelUrdu: 'انتہائی نازک',
    weight: 4,
    iconName: 'TrafficCone',
  },
];

/** Travel safety guidelines rendered in the "Travel Safety Guidelines" section. */
export const TRAVEL_SAFETY_GUIDELINES = [
  {
    id: 'follow-personnel',
    iconName: 'ShieldCheck',
    titleEn: 'Follow traffic police instructions',
    titleUr: 'ٹریفک پولیس کی ہدایات پر عمل کریں',
    descriptionEn:
      'On the spot instructions issued by authorized traffic personnel always take precedence over general guidance.',
    descriptionUr:
      'موقع پر موجود مجاز ٹریفک اہلکار کی ہدایات کو ہمیشہ عمومی رہنمائی پر ترجیح دیں۔',
  },
  {
    id: 'check-before-departure',
    iconName: 'CalendarClock',
    titleEn: 'Check weather and road information before departure',
    titleUr: 'روانگی سے پہلے موسم اور سڑک کی معلومات دیکھیں',
    descriptionEn:
      'Hill road conditions change quickly. Confirm the forecast and route situation before starting your journey.',
    descriptionUr:
      'پہاڑی سڑکوں کی صورتحال تیزی سے بدلتی ہے۔ سفر شروع کرنے سے پہلے پیش گوئی اور راستے کی صورتحال کی تصدیق کریں۔',
  },
  {
    id: 'drive-slowly',
    iconName: 'Snowflake',
    titleEn: 'Drive slowly in fog, rain or snowfall',
    titleUr: 'دھند، بارش یا برف باری میں آہستہ چلائیں',
    descriptionEn:
      'Reduce speed well before bends, keep the headlights on, and avoid sudden braking on wet or icy surfaces.',
    descriptionUr:
      'موڑ سے پہلے رفتار کم کریں، ہیڈ لائٹس روشن رکھیں اور گیلے یا برفیلے حصوں پر اچانک بریک لگانے سے گریز کریں۔',
  },
  {
    id: 'safe-distance',
    iconName: 'Route',
    titleEn: 'Keep a safe distance and avoid dangerous overtaking',
    titleUr: 'محفوظ فاصلہ رکھیں اور خطرناک اوور ٹیکنگ سے بچیں',
    descriptionEn:
      'Maintain a generous gap from the vehicle ahead and never overtake on blind curves, slopes or narrow sections.',
    descriptionUr:
      'آگے چلنے والی گاڑی سے مناسب فاصلہ رکھیں اور اندھے موڑ، ڈھلوان یا تنگ حصوں پر ہرگز اوور ٹیک نہ کریں۔',
  },
  {
    id: 'follow-diversions',
    iconName: 'Signpost',
    titleEn: 'Follow official diversions and parking restrictions',
    titleUr: 'سرکاری ڈائیورژن اور پارکنگ پابندیوں کی پاسداری کریں',
    descriptionEn:
      'Use designated parking areas only. Unauthorized roadside parking causes congestion on narrow hill roads.',
    descriptionUr:
      'صرف مقرر کردہ پارکنگ مقامات استعمال کریں۔ غیر مجاز سڑک کنارے پارکنگ تنگ پہاڑی سڑکوں پر رش پیدا کرتی ہے۔',
  },
];

/** "Before You Travel" checklist items. */
export const BEFORE_YOU_TRAVEL_CHECKLIST = [
  {
    id: 'checklist-forecast',
    en: 'Check the latest weather forecast for your route',
    ur: 'اپنے راستے کے لیے تازہ ترین موسمی پیش گوئی دیکھیں',
  },
  {
    id: 'checklist-conditions',
    en: 'Confirm road and traffic conditions before departure',
    ur: 'روانگی سے پہلے سڑک اور ٹریفک کی صورتحال کی تصدیق کریں',
  },
  {
    id: 'checklist-vehicle',
    en: 'Make sure brakes, tyres, lights and wipers are in good condition',
    ur: 'بریک، ٹائر، لائٹس اور وائپرز کا درست حالت میں ہونا یقینی بنائیں',
  },
  {
    id: 'checklist-supplies',
    en: 'Carry warm clothing, drinking water and basic medicines',
    ur: 'گرم کپڑے، پینے کا پانی اور بنیادی ادویات ساتھ رکھیں',
  },
  {
    id: 'checklist-fuel',
    en: 'Keep the fuel tank reasonably full before climbing the hills',
    ur: 'پہاڑی علاقے میں جانے سے پہلے ایندھن کا ٹینک مناسب حد تک بھرا رکھیں',
  },
  {
    id: 'checklist-contact',
    en: 'Keep a charged mobile phone and inform family of your route',
    ur: 'موبائل فون چارج رکھیں اور اہل خانہ کو اپنے راستے سے آگاہ کریں',
  },
  {
    id: 'checklist-daylight',
    en: 'Avoid travelling on hill roads after dark wherever possible',
    ur: 'جہاں ممکن ہو، اندھیرے کے بعد پہاڑی سڑکوں پر سفر سے گریز کریں',
  },
  {
    id: 'checklist-parking',
    en: 'Use designated parking areas and follow parking restrictions',
    ur: 'مقرر کردہ پارکنگ مقامات استعمال کریں اور پارکنگ پابندیوں کی پاسداری کریں',
  },
];

/** Notice shown while the page is displaying demo content. */
export const DEMO_DATA_NOTICE = {
  titleEn: 'Demo content — illustrative advisories only',
  titleUr: 'نمونہ مواد — صرف مثال کے طور پر انتباہات',
  bodyEn:
    'The advisories shown on this page are clearly labelled DEMO sample records used to design and demonstrate this interface. They are not official warnings, verified weather conditions, or actual road closures.',
  bodyUr:
    'اس صفحے پر دکھائے گئے انتباہات واضح طور پر ڈیمو (نمونہ) ریکارڈ ہیں جو اس انٹرفیس کی تیاری اور مظاہرے کے لیے استعمال کیے گئے ہیں۔ یہ سرکاری انتباہ، تصدیق شدہ موسمی صورتحال یا حقیقی سڑک بندش نہیں ہیں۔',
};

export const ADVISORY_VERIFICATION_NOTE = {
  titleEn: 'Verify through authorized official channels',
  titleUr: 'مجاز سرکاری ذرائع سے تصدیق کریں',
  bodyEn:
    'Advisories on this page are published for public information only and should be verified through authorized official channels before you travel. This page does not display live road status until a verified real-time data source is connected.',
  bodyUr:
    'اس صفحے پر دیے گئے انتباہات صرف عوامی معلومات کے لیے ہیں اور سفر سے قبل مجاز سرکاری ذرائع سے ان کی تصدیق کرنی چاہیے۔ جب تک تصدیق شدہ حقیقی وقت کا ڈیٹا منسلک نہ ہو، یہ صفحہ براہ راست سڑک کی صورتحال نہیں دکھاتا۔',
};

/** Note about rapidly changing road conditions. */
export const CHANGING_CONDITIONS_NOTE = {
  titleEn: 'Road conditions can change rapidly',
  titleUr: 'سڑک کی صورتحال تیزی سے بدل سکتی ہے',
  bodyEn:
    'Weather in the Galiyat region can change within hours. A route that is open in the morning may become unsafe later in the day due to snowfall, fog, landsliding or falling stones. Always plan for an alternative route and time.',
  bodyUr:
    'گلیات کے علاقے میں موسم چند گھنٹوں میں بدل سکتا ہے۔ صبح کھلا ہوا راستہ دوپہر کے بعد برف باری، دھند، لینڈ سلائیڈنگ یا پتھر گرنے کے باعث غیر محفوظ ہو سکتا ہے۔ ہمیشہ متبادل راستے اور وقت کا منصوبہ رکھیں۔',
};

/* -------------------------------------------------------------------------- */
/*                              DEMO ADVISORY RECORDS                          */
/* -------------------------------------------------------------------------- */

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const iso = (base: number, offsetMs: number) =>
  new Date(base + offsetMs).toISOString();

/**
 * Builds the DEMO advisory set.
 *
 * Dates are generated relative to `now` so the sample records stay realistic
 * (and keep exercising the active/expired logic) instead of silently expiring
 * as time passes. Every record is marked `isDemo: true` and carries a
 * `DEMO-` reference prefix so it can never be mistaken for live data.
 */
export function buildDemoAdvisories(now: Date = new Date()): TravelAdvisory[] {
  const base = now.getTime();

  return [
    {
      id: 'demo-advisory-snowfall-nathia-gali',
      reference: 'DEMO-GLY-ADV-2026-014',
      categoryId: 'snowfall',
      priority: 'critical',
      titleEn: 'Heavy Snowfall — Drive with Caution',
      titleUr: 'شدید برف باری — احتیاط سے ڈرائیو کریں',
      descriptionEn:
        'Intermittent heavy snowfall has been reported along the Nathia Gali–Dunga Gali corridor. The road surface may become slippery and visibility can drop sharply on exposed bends.',
      descriptionUr:
        'نتھیا گلی تا ڈونگا گلی راستے پر وقفے وقفے سے شدید برف باری کی اطلاع ہے۔ سڑک پھسلن والی ہو سکتی ہے اور کھلے موڑوں پر رویت اچانک کم ہو سکتی ہے۔',
      actionsEn: [
        'Reduce speed and keep headlights on',
        'Keep a safe distance from the vehicle ahead',
        'Avoid unnecessary travel after sunset',
        'Follow the diversions directed by traffic personnel',
      ],
      actionsUr: [
        'رفتار کم رکھیں اور ہیڈ لائٹس روشن رکھیں',
        'آگے چلنے والی گاڑی سے محفوظ فاصلہ رکھیں',
        'غروب آفتاب کے بعد غیر ضروری سفر سے گریز کریں',
        'ٹریفک اہلکار کے بتائے ہوئے راستوں پر چلیں',
      ],
      locationId: 'nathia-gali',
      issuedAt: iso(base, -6 * HOUR_MS),
      updatedAt: iso(base, -45 * 60 * 1000),
      expiresAt: iso(base, 2 * DAY_MS),
      isPublished: true,
      isDemo: true,
    },
    {
      id: 'demo-advisory-fog-ayubia',
      reference: 'DEMO-GLY-ADV-2026-013',
      categoryId: 'fog',
      priority: 'high',
      titleEn: 'Fog and Reduced Visibility — Reduce Speed',
      titleUr: 'دھند اور کم رویت — رفتار کم رکھیں',
      descriptionEn:
        'Dense fog patches are affecting the Ayubia chairlift road and adjoining sections. Visibility in some places may fall considerably within a short distance.',
      descriptionUr:
        'ایوبیہ چیئر لفٹ روڈ اور ملحقہ حصوں پر گہری دھند کے جھونکے ہیں۔ بعض مقامات پر تھوڑے فاصلے میں رویت نمایاں طور پر کم ہو سکتی ہے۔',
      actionsEn: [
        'Use low beam headlights instead of high beam',
        'Avoid overtaking and lane changing',
        'Indicate early before every turn',
        'Sound the horn gently on blind curves',
      ],
      actionsUr: [
        'ہائی بیم کے بجائے لو بیم ہیڈ لائٹس استعمال کریں',
        'اوور ٹیکنگ اور لین تبدیل کرنے سے گریز کریں',
        'ہر موڑ سے پہلے بروقت انڈیکیٹر دیں',
        'اندھے موڑوں پر آہستہ ہارن بجائیں',
      ],
      locationId: 'ayubia',
      issuedAt: iso(base, -1 * DAY_MS),
      updatedAt: iso(base, -3 * HOUR_MS),
      expiresAt: iso(base, 1 * DAY_MS),
      isPublished: true,
      isDemo: true,
    },
    {
      id: 'demo-advisory-maintenance-dunga-gali',
      reference: 'DEMO-GLY-ADV-2026-012',
      categoryId: 'road-closure',
      priority: 'medium',
      titleEn: 'Road Maintenance — Possible Traffic Delay',
      titleUr: 'سڑک کی مرمت — ٹریفک میں تاخیر ممکن',
      descriptionEn:
        'Routine road maintenance is scheduled on the Dunga Gali section. Single-lane movement may cause short delays during peak tourist hours.',
      descriptionUr:
        'ڈونگا گلی کے حصے پر معمول کی سڑک مرمت کا کام مقرر ہے۔ ایک طرفہ گزر کی وجہ سے سیاحتی مصروف اوقات میں معمولی تاخیر ممکن ہے۔',
      actionsEn: [
        'Allow extra time for your journey',
        'Follow parking restrictions near the work area',
        'Cooperate with staff directing traffic on site',
      ],
      actionsUr: [
        'سفر کے لیے اضافی وقت رکھیں',
        'کام کے مقام کے قریب پارکنگ پابندیوں کی پاسداری کریں',
        'موقع پر ٹریفک کنٹرول کرنے والے عملے کے ساتھ تعاون کریں',
      ],
      locationId: 'dunga-gali',
      issuedAt: iso(base, -2 * DAY_MS),
      updatedAt: iso(base, -8 * HOUR_MS),
      expiresAt: iso(base, 5 * DAY_MS),
      isPublished: true,
      isDemo: true,
    },
    {
      id: 'demo-advisory-safety-all-galiyat',
      reference: 'DEMO-GLY-ADV-2026-011',
      categoryId: 'safety',
      priority: 'low',
      titleEn: 'Tourist Travel Safety Advisory — Check Conditions Before Departure',
      titleUr: 'سیاحوں کے لیے سفری حفاظتی ہدایت — روانگی سے پہلے صورتحال دیکھیں',
      descriptionEn:
        'Visitors planning a trip to Galiyat are advised to confirm current weather and road conditions before departure and to carry warm clothing and basic supplies.',
      descriptionUr:
        'گلیات کے سفر کا ارادہ رکھنے والے سیاحوں کو مشورہ ہے کہ روانگی سے پہلے موجودہ موسمی اور سڑک کی صورتحال کی تصدیق کریں اور گرم کپڑے اور بنیادی سامان ساتھ رکھیں۔',
      actionsEn: [
        'Plan the journey in daylight hours',
        'Keep the vehicle serviced, especially brakes and tyres',
        'Avoid parking on the road shoulder',
        'Keep warm clothing and drinking water with you',
      ],
      actionsUr: [
        'سفر دن کی روشنی میں طے کریں',
        'گاڑی کی دیکھ بھال مکمل رکھیں، خصوصاً بریک اور ٹائر',
        'سڑک کے کنارے پارکنگ سے گریز کریں',
        'گرم کپڑے اور پینے کا پانی ساتھ رکھیں',
      ],
      locationId: 'all',
      issuedAt: iso(base, -4 * DAY_MS),
      updatedAt: iso(base, -2 * DAY_MS),
      expiresAt: null,
      isPublished: true,
      isDemo: true,
    },
    {
      id: 'demo-advisory-rain-thandiani',
      reference: 'DEMO-GLY-ADV-2026-010',
      categoryId: 'weather',
      priority: 'medium',
      titleEn: 'Rain and Slippery Roads — Maintain Safe Distance',
      titleUr: 'بارش اور پھسلن والی سڑکیں — محفوظ فاصلہ رکھیں',
      descriptionEn:
        'Recent rainfall has left parts of the Thandiani ridge road wet and slippery. Loose gravel and steep gradients increase the risk of skidding.',
      descriptionUr:
        'حالیہ بارش کے باعث ٹھنڈیانی کی پہاڑی سڑک کے کچھ حصے گیلی اور پھسلن والے ہیں۔ ڈھیلی بجری اور کھڑی ڈھلوان پھسلنے کا خطرہ بڑھاتی ہے۔',
      actionsEn: [
        'Drive in a lower gear on descending slopes',
        'Avoid hard braking and sharp steering',
        'Keep well clear of the vehicle in front',
        'Do not overtake on bends or narrow sections',
      ],
      actionsUr: [
        'ڈھلوان پر کم گیئر میں گاڑی چلائیں',
        'اچانک بریک اور تیز اسٹیئرنگ سے گریز کریں',
        'آگے والی گاڑی سے کافی فاصلہ رکھیں',
        'موڑ یا تنگ حصوں پر اوور ٹیک نہ کریں',
      ],
      locationId: 'thandiani',
      issuedAt: iso(base, -3 * DAY_MS),
      updatedAt: iso(base, -20 * HOUR_MS),
      expiresAt: iso(base, 3 * DAY_MS),
      isPublished: true,
      isDemo: true,
    },
    {
      // Expired sample — demonstrates expiry handling in the UI.
      id: 'demo-advisory-maintenance-completed-dunga-gali',
      reference: 'DEMO-GLY-ADV-2026-009',
      categoryId: 'road-closure',
      priority: 'low',
      titleEn: 'Road Maintenance Completed — Normal Traffic Restored',
      titleUr: 'سڑک کی مرمت مکمل — معمول کی ٹریفک بحال',
      descriptionEn:
        'Maintenance work on the Dunga Gali section has been completed and normal two-way traffic has been restored on both lanes.',
      descriptionUr:
        'ڈونگا گلی کے حصے پر مرمت کا کام مکمل ہو گیا ہے اور دونوں لینوں پر معمول کی دو طرفہ ٹریفک بحال کر دی گئی ہے۔',
      actionsEn: ['Observe normal traffic rules', 'Watch for residual gravel near the work area'],
      actionsUr: ['معمول کے ٹریفک قوانین پر عمل کریں', 'کام کے مقام کے قریب بچی ہوئی بجری کا خیال رکھیں'],
      locationId: 'dunga-gali',
      issuedAt: iso(base, -5 * DAY_MS),
      updatedAt: iso(base, -5 * HOUR_MS),
      expiresAt: iso(base, -5 * HOUR_MS),
      isPublished: true,
      isDemo: true,
    },
  ];
}
