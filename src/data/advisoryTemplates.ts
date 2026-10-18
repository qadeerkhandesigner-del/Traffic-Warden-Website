import type { AdvisoryCategory, AdvisoryPriority } from '../types/galiyat';

/**
 * Ready-made advisory templates for the admin dashboard.
 * =====================================================
 *
 * Staff pick a template, adjust the wording, and publish. This is what keeps the
 * common Galiyat situations (snow, landslide, fog, diversion, heavy rain) from
 * being typed out from scratch every time.
 *
 * Everything here is ordinary content — extend or reword freely.
 */
export interface AdvisoryTemplate {
  id: string;
  /** English name shown on the dashboard button. */
  label: string;
  /** Small helper line under the label. */
  hint: string;
  categoryId: AdvisoryCategory;
  priority: AdvisoryPriority;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  actionsEn: string[];
  actionsUr: string[];
}

export const ADVISORY_TEMPLATES: AdvisoryTemplate[] = [
  {
    id: 'snowfall',
    label: 'Snowfall',
    hint: 'Upper Galiyat',
    categoryId: 'snowfall',
    priority: 'high',
    titleEn: 'Snowfall expected — travel only with tyre chains or a 4x4 vehicle',
    titleUr: 'برف باری متوقع — صرف ٹائر چین یا فور وہیل گاڑی کے ساتھ سفر کریں',
    descriptionEn:
      'Fresh snowfall is expected in the upper Galiyat areas. Roads can turn slippery after sunset and black ice may form on shaded bends. Visitors without tyre chains or a 4x4 vehicle should consider postponing their trip.',
    descriptionUr:
      'گلیات کے بالائی علاقوں میں تازہ برف باری متوقع ہے۔ غروبِ آفتاب کے بعد سڑکیں پھسلن والی ہو سکتی ہیں اور سائے والے موڑوں پر کالی برف بن سکتی ہے۔ ٹائر چین یا فور وہیل گاڑی کے بغیر سفر کرنے والے سیاح اپنا سفر مؤخر کرنے پر غور کریں۔',
    actionsEn: [
      'Fit tyre chains before entering the upper Galiyat',
      'Keep headlights on and stay below 20 km/h on snow',
      'Avoid travelling after sunset',
      'Save the Traffic Helpline 1915 number',
    ],
    actionsUr: [
      'بالائی گلیات میں داخل ہونے سے قبل ٹائر چین لگائیں',
      'برف پر ہیڈلائٹ آن رکھیں اور رفتار 20 کلومیٹر فی گھنٹہ سے کم رکھیں',
      'غروبِ آفتاب کے بعد سفر سے گریز کریں',
      'ٹریفک ہیلپ لائن 1915 کا نمبر محفوظ رکھیں',
    ],
  },
  {
    id: 'landslide',
    label: 'Landslide / road closed',
    hint: 'Road blocked',
    categoryId: 'road-closure',
    priority: 'critical',
    titleEn: 'Road blocked by a landslide — use the alternate route',
    titleUr: 'لینڈ سلائیڈنگ کے باعث سڑک بند — متبادل راستہ استعمال کریں',
    descriptionEn:
      'A landslide has blocked the road. Machinery has been moved to the site and clearance work is under way. Until the road reopens, use the alternate route and follow the directions of the traffic staff posted at the diversion point.',
    descriptionUr:
      'لینڈ سلائیڈنگ کے باعث سڑک بند ہو گئی ہے۔ مشینری موقع پر پہنچا دی گئی ہے اور صفائی کا کام جاری ہے۔ سڑک دوبارہ کھلنے تک متبادل راستہ استعمال کریں اور ڈائیورژن پوائنٹ پر تعینات ٹریفک اہلکار کی ہدایات پر عمل کریں۔',
    actionsEn: [
      'Use the alternate route shown by on-duty traffic staff',
      'Do not park on the road near the affected section',
      'Expect delays and start your journey earlier',
      'Report any further blockage on 1915',
    ],
    actionsUr: [
      'ڈیوٹی پر موجود ٹریفک اہلکار کے بتائے گئے متبادل راستے سے جائیں',
      'متاثرہ حصے کے قریب سڑک پر گاڑی پارک نہ کریں',
      'تاخیر متوقع ہے، سفر قبل از وقت شروع کریں',
      'مزید بندش کی اطلاع 1915 پر دیں',
    ],
  },
  {
    id: 'fog',
    label: 'Dense fog',
    hint: 'Low visibility',
    categoryId: 'fog',
    priority: 'medium',
    titleEn: 'Dense fog on the hill road — drive with low beam and fog lamps',
    titleUr: 'پہاڑی سڑک پر گھنی دھند — لائٹ آن رکھیں اور رفتار کم رکھیں',
    descriptionEn:
      'Visibility drops sharply in patches of dense fog along the hill road. Keep a safe distance from the vehicle ahead and avoid overtaking. Where visibility is very low, park at a safe lay-by until the fog clears.',
    descriptionUr:
      'پہاڑی سڑک پر کئی مقامات پر گھنی دھند کے باعث حدِ نظر انتہائی کم ہو جاتی ہے۔ آگے چلنے والی گاڑی سے مناسب فاصلہ رکھیں اور اوور ٹیکنگ سے گریز کریں۔ جہاں حدِ نظر بہت کم ہو وہاں کسی محفوظ جگہ پر رک کر دھند کم ہونے کا انتظار کریں۔',
    actionsEn: [
      'Use fog lamps and keep headlights on low beam',
      'Reduce speed and keep a safe distance',
      'Do not overtake or stop in the middle of the road',
      'Switch on hazard lights only when stopped safely',
    ],
    actionsUr: [
      'فوگ لیمپ اور کم بیم ہیڈلائٹ استعمال کریں',
      'رفتار کم رکھیں اور مناسب فاصلہ برقرار رکھیں',
      'اوور ٹیکنگ نہ کریں اور سڑک کے درمیان رکے نہیں',
      'ہیزل لائٹ صرف محفوظ جگہ رکنے پر آن کریں',
    ],
  },
  {
    id: 'diversion',
    label: 'Traffic diversion',
    hint: 'VIP movement / road work',
    categoryId: 'diversion',
    priority: 'medium',
    titleEn: 'Traffic diversion in place — follow the marked alternate route',
    titleUr: 'ٹریفک ڈائیورژن نافذ — نشان زدہ متبادل راستہ اختیار کریں',
    descriptionEn:
      'Traffic has been diverted from the main route. The diversion is clearly signposted and traffic staff are posted at the turning points. Heavy vehicles should use the bypass instead of the bazaar road.',
    descriptionUr:
      'مرکزی راستے سے ٹریفک کو ڈائیورٹ کر دیا گیا ہے۔ متبادل راستہ نشان زدہ ہے اور موڑوں پر ٹریفک اہلکار تعینات ہیں۔ بھاری گاڑیاں بازار کی سڑک کے بجائے بائی پاس استعمال کریں۔',
    actionsEn: [
      'Follow the diversion signs and staff directions',
      'Heavy vehicles should use the bypass',
      'Avoid the bazaar road during peak hours',
      'Allow extra time for your journey',
    ],
    actionsUr: [
      'ڈائیورژن کے نشانات اور اہلکاروں کی ہدایات پر عمل کریں',
      'بھاری گاڑیاں بائی پاس استعمال کریں',
      'مصروف اوقات میں بازار کی سڑک سے گریز کریں',
      'سفر کے لیے اضافی وقت رکھیں',
    ],
  },
  {
    id: 'heavy-rain',
    label: 'Heavy rain',
    hint: 'Slippery road',
    categoryId: 'weather',
    priority: 'medium',
    titleEn: 'Heavy rain — slippery roads and falling stones possible',
    titleUr: 'تیز بارش — سڑکیں پھسلن والی، پتھر گرنے کا امکان',
    descriptionEn:
      'Heavy rain is expected in the Galiyat area. The road surface becomes slippery on steep sections and small stones may fall from the hillside. Keep both hands on the wheel and avoid abrupt braking on bends.',
    descriptionUr:
      'گلیات کے علاقے میں تیز بارش متوقع ہے۔ ڈھلوان حصوں پر سڑک پھسلن والی ہو جاتی ہے اور پہاڑی سے چھوٹے پتھر گر سکتے ہیں۔ دونوں ہاتھ اسٹیئرنگ پر رکھیں اور موڑوں پر اچانک بریک نہ لگائیں۔',
    actionsEn: [
      'Drive slowly on steep and sloping sections',
      'Do not stop under loose rocks or overhanging slopes',
      'Check your brakes and tyres before the trip',
      'Call 1915 if you need assistance on the road',
    ],
    actionsUr: [
      'ڈھلوان حصوں پر آہستہ ڈرائیو کریں',
      'ڈھیلے پتھروں اور ڈھلوان کے نیچے رکے نہیں',
      'سفر سے قبل بریک اور ٹائر چیک کریں',
      'سڑک پر مدد کی ضرورت ہو تو 1915 پر کال کریں',
    ],
  },
  {
    id: 'all-clear',
    label: 'Roads open (all clear)',
    hint: 'Normal conditions',
    categoryId: 'safety',
    priority: 'low',
    titleEn: 'Roads open — normal traffic conditions in the Galiyat area',
    titleUr: 'سڑکیں کھلی ہیں — گلیات کے علاقے میں ٹریفک معمول کے مطابق',
    descriptionEn:
      'All main routes to the Galiyat area are open and traffic is moving normally. Weather is clear at present, although conditions in the hills can change quickly. Keep to the speed limit and observe the usual safety rules.',
    descriptionUr:
      'گلیات کے علاقے تک تمام مرکزی راستے کھلے ہیں اور ٹریفک معمول کے مطابق چل رہی ہے۔ اس وقت موسم صاف ہے، تاہم پہاڑوں میں صورتحال تیزی سے بدل سکتی ہے۔ رفتار کی حد کی پابندی کریں اور معمول کے حفاظتی قواعد پر عمل کریں۔',
    actionsEn: [
      'Carry warm clothing and drinking water',
      'Keep fuel above half a tank before the climb',
      'Follow the speed limit on bends',
      'Check this page before starting your journey',
    ],
    actionsUr: [
      'گرم کپڑے اور پینے کا پانی ساتھ رکھیں',
      'چڑھائی سے پہلے ایندھن آدھے ٹینک سے زیادہ رکھیں',
      'موڑوں پر رفتار کی حد کی پابندی کریں',
      'سفر شروع کرنے سے قبل یہ صفحہ دیکھیں',
    ],
  },
];

export function findAdvisoryTemplate(id: string): AdvisoryTemplate | undefined {
  return ADVISORY_TEMPLATES.find((template) => template.id === id);
}
