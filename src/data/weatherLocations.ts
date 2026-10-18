import type { WeatherLocation } from '../types/weather';

/**
 * Verified Geographic Coordinates & Metadata for Abbottabad & Galiyat Locations
 * 
 * Geographic Verification Sources:
 * - Survey of Pakistan / National Cartographic references
 * - OpenStreetMap & GeoNames Geodetic Database
 * - District Administration Abbottabad & Galiyat Development Authority (GDA) jurisdictional maps
 */

export const ABBOTTABAD_LOCATION: WeatherLocation = {
  id: 'abbottabad',
  name: 'Abbottabad City',
  nameUrdu: 'ایبٹ آباد شہر',
  region: 'Abbottabad City',
  latitude: 34.1495,
  longitude: 73.2196,
  elevationMeters: 1220,
  description: 'District Headquarters, Karakoram Highway (N-35) & Central Traffic Command',
  descriptionUrdu: 'ضلعی ہیڈکوارٹر، قراقرم ہائی وے اور مرکزی ٹریفک کمانڈ',
  travelCautionContext: 'Main urban transit artery connecting Hazara Motorway (M-15) and Murree Road.',
  travelCautionContextUrdu: 'ہزارہ موٹروے اور مری روڈ کو ملانے والی مرکزی شہری شاہراہ۔',
};

export const GALIYAT_LOCATIONS: WeatherLocation[] = [
  {
    id: 'nathia-gali',
    name: 'Nathia Gali',
    nameUrdu: 'نتھیا گلی',
    region: 'Galiyat',
    latitude: 34.0683,
    longitude: 73.3853,
    elevationMeters: 2410,
    description: 'Central Galiyat resort hub, Governor House & Miranjani base (2,410m)',
    descriptionUrdu: 'مرکزی گلیات سیاحتی مرکز، گورنر ہاؤس اور میرانجانی بیس',
    travelCautionContext: 'Steep winding ascents; high risk of black ice during sub-zero nights and dense cloud cover.',
    travelCautionContextUrdu: 'کھڑی موڑ دار چڑھائیاں، رات کے وقت پھسلن اور شدید کہرا۔',
  },
  {
    id: 'ayubia',
    name: 'Ayubia',
    nameUrdu: 'ایوبیہ',
    region: 'Galiyat',
    latitude: 34.0305,
    longitude: 73.4022,
    elevationMeters: 2400,
    description: 'Ayubia National Park, Pipeline Track terminus & Chairlift station (2,400m)',
    descriptionUrdu: 'ایوبیہ نیشنل پارک، پائپ لائن ٹریک اور چیئر لفٹ اسٹیشن',
    travelCautionContext: 'High elevation curves; snow chains strictly advised during winter snowfall alerts.',
    travelCautionContextUrdu: 'بلند پہاڑی موڑ، برف باری کی صورت میں سنو چینز لازمی رکھیں۔',
  },
  {
    id: 'thandiani',
    name: 'Thandiani',
    nameUrdu: 'ٹھنڈیانی',
    region: 'Galiyat',
    latitude: 34.2286,
    longitude: 73.3486,
    elevationMeters: 2750,
    description: 'Highest alpine ridge viewpoint in Abbottabad district (2,750m / 9,000ft)',
    descriptionUrdu: 'ضلع ایبٹ آباد کا بلند ترین پہاڑی سلسلہ (۲،۷۵۰ میٹر)',
    travelCautionContext: 'Narrow ridge road with sudden heavy mist, fierce winds and rapid freeze cycles.',
    travelCautionContextUrdu: 'تنگ پہاڑی سڑک، اچانک شدید دھند اور تیز ہوائیں، محتاط ڈرائیونگ کریں۔',
  },
  {
    id: 'hernoi',
    name: 'Hernoi',
    nameUrdu: 'ہرنوئی',
    region: 'Galiyat',
    latitude: 34.1550,
    longitude: 73.2870,
    elevationMeters: 1350,
    description: 'Scenic riverside tourist stop on Murree-Abbottabad Highway (1,350m)',
    descriptionUrdu: 'ایبٹ آباد-مری شاہراہ پر قدرتی ندی اور سیاحتی تفریح گاہ',
    travelCautionContext: 'Valley stream crossing area; beware of flash mountain runoff during heavy monsoonal rain.',
    travelCautionContextUrdu: 'پہاڑی ندی کا علاقہ، تیز بارش میں طغیانی کے پیش نظر ندی کنارے گاڑی نہ کھڑی کریں۔',
  },
  {
    id: 'dunga-gali',
    name: 'Dunga Gali',
    nameUrdu: 'ڈونگا گلی',
    region: 'Galiyat',
    latitude: 34.0583,
    longitude: 73.4167,
    elevationMeters: 2500,
    description: 'Historic hill hamlet, Mukshpuri Peak trailhead & water reservoirs (2,500m)',
    descriptionUrdu: 'تاریخی بستی، مکشپوری ٹریک کا آغاز اور پرسکون قدرتی ماحول',
    travelCautionContext: 'Heavy snowfall zone; single-lane traffic bottlenecks during weekend peak hours.',
    travelCautionContextUrdu: 'شدید برف باری کا زون، ویک اینڈز پر موڑ پر اوور ٹیکنگ سے گریز کریں۔',
  },
  {
    id: 'changla-gali',
    name: 'Changla Gali',
    nameUrdu: 'چانگلہ گلی',
    region: 'Galiyat',
    latitude: 33.9967,
    longitude: 73.3828,
    elevationMeters: 2560,
    description: 'Highest elevation pass on Abbottabad-Murree connecting corridor (2,560m)',
    descriptionUrdu: 'ایبٹ آباد-مری رابطہ راہداری کا بلند ترین پہاڑی پاس',
    travelCautionContext: 'Exposed high-altitude pass; strong winds and early snowfall accumulation zone.',
    travelCautionContextUrdu: 'بلند ترین پاس، تیز جھکڑ اور سڑک پر برف کی تہہ جمنے کا زیادہ امکان۔',
  },
];

/**
 * Combined list of all 7 monitored locations
 */
export const ALL_WEATHER_LOCATIONS: WeatherLocation[] = [
  ABBOTTABAD_LOCATION,
  ...GALIYAT_LOCATIONS,
];
