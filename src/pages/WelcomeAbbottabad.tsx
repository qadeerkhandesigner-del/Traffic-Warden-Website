import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  CloudSun,
  Compass,
  Map,
  HeartHandshake,
  Info,
  MapPin,
  Maximize2,
  Mountain,
  PhoneCall,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const HERO_IMAGE = '/Welcome to Abbottabd Images/l love abbottabad.jpg';

const HERO_CHIPS = [
  {
    icon: Compass,
    en: 'Gateway to the Northern Areas',
    ur: 'شمالی علاقوں کا دروازہ',
  },
  {
    icon: Mountain,
    en: 'Abbottabad & Galiyat',
    ur: 'ایبٹ آباد اور گلیات',
  },
  {
    icon: HeartHandshake,
    en: 'Tourist Facilitation',
    ur: 'سیاحوں کی سہولت',
  },
];

const WELCOME_FACTS = [
  {
    id: 'gateway',
    icon: Compass,
    en: 'Gateway to the Northern Areas',
    ur: 'شمالی علاقوں کا دروازہ',
  },
  {
    id: 'climate',
    icon: CloudSun,
    en: 'Lush green mountains and a pleasant climate',
    ur: 'سرسبز پہاڑ اور خوشگوار موسم',
  },
  {
    id: 'families',
    icon: HeartHandshake,
    en: 'Unforgettable experiences for tourists and families',
    ur: 'سیاحوں اور خاندانوں کے لیے ناقابل فراموش تجربات',
  },
  {
    id: 'safety',
    icon: ShieldCheck,
    en: 'Committed to safe, smooth and enjoyable journeys',
    ur: 'محفوظ، ہموار اور خوشگوار سفر کا عزم',
  },
];

interface RouteMap {
  id: string;
  image: string;
  titleEn: string;
  titleUr: string;
  descEn: string;
  descUr: string;
  badgeEn: string;
  badgeUr: string;
}

/* Official route maps (images kept in public/Map Images — paths are URL-encoded). */
const ROUTE_MAPS: RouteMap[] = [
  {
    id: 'road-safety-map',
    image: '/Map%20Images/Map%2001.jpg',
    titleEn: 'Galiyat Area Abbottabad — Traffic & Road Safety Map',
    titleUr: 'گلیات ایریا ایبٹ آباد — ٹریفک اور روڈ سیفٹی میپ',
    descEn:
      'Road conditions along the Harno–Barrian route: slipping areas, low-signal zones, toll plaza and important points marked for a safe journey.',
    descUr:
      'ہارنو سے بریان تک روٹ پر سڑک کی صورتحال: پھسلاوٹ والے علاقے، کم سگنل ایریاز، ٹول پلازا اور اہم مقامات محفوظ سفر کے لیے نشان زد۔',
    badgeEn: 'Slipping & Low Signal Areas',
    badgeUr: 'پھسلاوٹ اور کم سگنل ایریاز',
  },
  {
    id: 'tourist-route-map',
    image: '/Map%20Images/Map%2002.jpg',
    titleEn: 'Galiyat Tourist Map — Harno to Barrian',
    titleUr: 'گلیات ٹورسٹ میپ — ہارنو سے بریان',
    descEn:
      'All nine stops on the route with approximate distances and travel times, plus viewpoints, picnic spots and trekking peaks along the way.',
    descUr:
      'روٹ پر تمام نو مقامات فاصلے اور سفر کے وقت کے ساتھ، نیز راستے میں نظارہ جات، پکنک مقامات اور ٹریکنگ چوٹیاں۔',
    badgeEn: 'Distances & Tourist Spots',
    badgeUr: 'فاصلے اور سیاحتی مقامات',
  },
];

interface TravelLeg {
  distanceEn: string;
  distanceUr: string;
  timeEn: string;
  timeUr: string;
}

interface Attraction {
  id: string;
  number: string;
  image: string;
  titleEn: string;
  titleUr: string;
  descEn: string;
  descUr: string;
  fromAbbottabad: TravelLeg;
  fromNathiaGali?: TravelLeg;
  noteEn?: string;
  noteUr?: string;
  popularRouteEn?: string;
  popularRouteUr?: string;
}

const ATTRACTIONS: Attraction[] = [
  {
    id: 'harno-family-park',
    number: '01',
    image: '/Welcome to Abbottabd Images/Harno Abbottabad.jpg',
    titleEn: 'Harno Family Park',
    titleUr: 'ہارنو فیملی پارک',
    descEn:
      'A popular picnic destination surrounded by lush greenery and flowing streams, Harno Family Park offers a refreshing natural setting for families and friends. Its scenic surroundings and peaceful atmosphere make it an ideal spot for a relaxing day outdoors.',
    descUr:
      'ایک مقبول پکنک مقام جو سرسبز و شاداب مناظر اور بہتے چشموں سے گھرا ہوا ہے، ہارنو فیملی پارک خاندانوں اور دوستوں کے لیے تازگی بخش قدرتی ماحول فراہم کرتا ہے۔ اس کے دلکش گرد و نواح اور پُرسکون فضا اسے باہر آرام دہ دن گزارنے کے لیے مثالی جگہ بناتی ہے۔',
    fromAbbottabad: {
      distanceEn: '4 km',
      distanceUr: '۴ کلومیٹر',
      timeEn: 'Approximately 10 minutes',
      timeUr: 'تقریباً ۱۰ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '21.4 km',
      distanceUr: '۲۱.۴ کلومیٹر',
      timeEn: 'Approximately 41 minutes',
      timeUr: 'تقریباً ۴۱ منٹ',
    },
  },
  {
    id: 'namli-waterfall',
    number: '02',
    image: '/Welcome to Abbottabd Images/Namli maira Waterfall.webp',
    titleEn: 'Namli Waterfall',
    titleUr: 'نمل آبشار',
    descEn:
      'Nestled in the scenic hills near Nathia Gali, Namli Waterfall is a refreshing destination, especially during summer. Surrounded by trees, green mountains, and cool flowing water, it offers visitors a peaceful natural escape.',
    descUr:
      'ناتھیا گلی کے قریب دلکش پہاڑوں میں واقع، نمل آبشار بالخصوص گرمیوں میں ایک تازگی بخش مقام ہے۔ درختوں، سرسبز پہاڑوں اور ٹھنڈے بہتے پانی سے گھرا ہوا یہ مقام سیاحوں کو ایک پرسکون قدرتی پناہ گاہ فراہم کرتا ہے۔',
    fromAbbottabad: {
      distanceEn: '33.8 km',
      distanceUr: '۳۳.۸ کلومیٹر',
      timeEn: 'Approximately 1 hour 30 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۳۰ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '6.6 km',
      distanceUr: '۶.۶ کلومیٹر',
      timeEn: 'Approximately 25 minutes',
      timeUr: 'تقریباً ۲۵ منٹ',
    },
  },
  {
    id: 'church-chowk-park',
    number: '03',
    image: '/Welcome to Abbottabd Images/Church Chowk park.jpg',
    titleEn: 'Church Chowk Park',
    titleUr: 'چرچ چوک پارک',
    descEn:
      'Located in the picturesque Nathia Gali region, Church Chowk Park is a pleasant stop for visitors seeking mountain scenery, cool weather, green spaces, and beautiful pine trees. It provides a relaxing atmosphere to enjoy the natural charm of Galiyat.',
    descUr:
      'ناتھیا گلی کے دلکش علاقے میں واقع، چرچ چوک پارک ان سیاحوں کے لیے خوشگوار ٹھہراؤ ہے جو پہاڑی مناظر، ٹھنڈے موسم، سبزے اور خوبصورت دیودار کے درختوں کا لطف لینا چاہتے ہیں۔ یہ گلیات کی قدرتی خوبصورتی سے لطف اندوز ہونے کے لیے ایک پُرسکون ماحول فراہم کرتا ہے۔',
    fromAbbottabad: {
      distanceEn: '37.7 km',
      distanceUr: '۳۷.۷ کلومیٹر',
      timeEn: 'Approximately 1 hour 18 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۱۸ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '1.6 km',
      distanceUr: '۱.۶ کلومیٹر',
      timeEn: 'Approximately 5 minutes',
      timeUr: 'تقریباً ۵ منٹ',
    },
  },
  {
    id: 'kashmir-viewpoint',
    number: '04',
    image: '/Welcome to Abbottabd Images/Kashmir View Point.jpg',
    titleEn: 'Kashmir Viewpoint',
    titleUr: 'کشمیر ویو پوائنٹ',
    descEn:
      'Kashmir Viewpoint offers beautiful mountain scenery and panoramic views of the surrounding hills. It is a popular stop for visitors who want to enjoy the landscape, capture photographs, and spend quality time with family.',
    descUr:
      'کشمیر ویو پوائنٹ خوبصورت پہاڑی مناظر اور گرد و نواح کی پہاڑیوں کے وسیع نظارے پیش کرتا ہے۔ یہ ان سیاحوں کے لیے مقبول مقام ہے جو مناظر سے لطف اندوز ہونا، تصاویر لینا اور خاندان کے ساتھ خوشگوار وقت گزارنا چاہتے ہیں۔',
    fromAbbottabad: {
      distanceEn: '73.5 km',
      distanceUr: '۷۳.۵ کلومیٹر',
      timeEn: 'Approximately 2 hours 33 minutes',
      timeUr: 'تقریباً ۲ گھنٹے ۳۳ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '37.4 km',
      distanceUr: '۳۷.۴ کلومیٹر',
      timeEn: 'Approximately 1 hour 20 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۲۰ منٹ',
    },
  },
  {
    id: 'plaza-park',
    number: '05',
    image: '/Welcome to Abbottabd Images/Plaza Park Nathia Gali.jpg',
    titleEn: 'Plaza Park, Nathia Gali',
    titleUr: 'پلازہ پارک، ناتھیا گلی',
    descEn:
      'Situated in Nathia Gali, Plaza Park is a convenient recreational spot where visitors can relax and enjoy the cool mountain climate. Its location makes it a pleasant stop while exploring the scenic Galiyat region.',
    descUr:
      'ناتھیا گلی میں واقع، پلازہ پارک ایک سہولت بخش تفریحی مقام ہے جہاں سیاح آرام کر سکتے ہیں اور ٹھنڈے پہاڑی موسم کا لطف اٹھا سکتے ہیں۔ اس کا مقام اسے گلیات کے دلکش علاقے کی سیر کے دوران ایک خوشگوار ٹھہراؤ بناتا ہے۔',
    fromAbbottabad: {
      distanceEn: '38 km',
      distanceUr: '۳۸ کلومیٹر',
      timeEn: 'Approximately 1 hour 25 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۲۵ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '2 km',
      distanceUr: '۲ کلومیٹر',
      timeEn: 'Approximately 6 minutes',
      timeUr: 'تقریباً ۶ منٹ',
    },
  },
  {
    id: 'miranjani-top',
    number: '06',
    image: '/Welcome to Abbottabd Images/Miranjani Top.jpg',
    titleEn: 'Miranjani Top — Hiking Trail',
    titleUr: 'میرانجانی ٹاپ — ہائیکنگ ٹریل',
    descEn:
      'Standing at approximately 2,992 metres above sea level, Miranjani is one of the prominent peaks of the Galiyat region. Its hiking trail attracts trekking enthusiasts and adventure seekers looking for forest scenery, fresh mountain air, and rewarding views.',
    descUr:
      'تقریباً ۲,۹۹۲ میٹر بلندی پر واقع، میرانجانی گلیات کے نمایاں پہاڑوں میں سے ایک ہے۔ اس کی ہائیکنگ ٹریل جنگلی مناظر، تازہ پہاڑی ہوا اور شاندار نظاروں کے متلاشی ٹریکنگ کے شوقینوں اور مہم جو افراد کو اپنی طرف کھینچتی ہے۔',
    fromAbbottabad: {
      distanceEn: '40 km',
      distanceUr: '۴۰ کلومیٹر',
      timeEn: 'Approximately 1 hour 39 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۳۹ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '3.4 km',
      distanceUr: '۳.۴ کلومیٹر',
      timeEn: 'Approximately 12 minutes',
      timeUr: 'تقریباً ۱۲ منٹ',
    },
  },
  {
    id: 'mushkpuri-top',
    number: '07',
    image: '/Welcome to Abbottabd Images/Mushkpuri Top.jpg',
    titleEn: 'Mushkpuri Top',
    titleUr: 'مشکپوری ٹاپ',
    descEn:
      'Mushkpuri Top, rising to approximately 2,800 metres above sea level, is a favourite destination for nature lovers and hikers. The trail passes through beautiful forests and opens up to spectacular views of the surrounding mountains and valleys.',
    descUr:
      'تقریباً ۲,۸۰۰ میٹر بلندی پر واقع مشکپوری ٹاپ فطرت سے محبت کرنے والوں اور ہائیکرز کا پسندیدہ مقام ہے۔ یہ ٹریل خوبصورت جنگلات سے گزرتی ہے اور گرد و نواح کے پہاڑوں اور وادیوں کے شاندار نظاروں تک پہنچتی ہے۔',
    fromAbbottabad: {
      distanceEn: '39 km',
      distanceUr: '۳۹ کلومیٹر',
      timeEn: 'Approximately 1 hour 51 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۵۱ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '4.7 km',
      distanceUr: '۴.۷ کلومیٹر',
      timeEn: 'Approximately 11 minutes',
      timeUr: 'تقریباً ۱۱ منٹ',
    },
  },
  {
    id: 'pipeline-track',
    number: '08',
    image: '/Welcome to Abbottabd Images/Pipeline Track .jpg',
    titleEn: 'Pipeline Track — Dunga Gali to Ayubia',
    titleUr: 'پائپ لائن ٹریک — ڈونگا گلی سے ایوبیہ تک',
    descEn:
      'The famous Pipeline Track is a scenic walking trail of approximately 4 km connecting Dunga Gali with Ayubia. Surrounded by dense pine forests and green mountain slopes, it is ideal for leisurely walks, nature photography, and outdoor recreation.',
    descUr:
      'مشہور پائپ لائن ٹریک تقریباً ۴ کلومیٹر طویل ایک دلکش پیدل راستہ ہے جو ڈونگا گلی کو ایوبیہ سے ملاتا ہے۔ گھنے دیودار کے جنگلات اور سرسبز پہاڑی ڈھلوانوں سے گھرا ہوا یہ راستہ آرام دہ واک، فطرت کی عکاسی اور بیرونی تفریح کے لیے مثالی ہے۔',
    fromAbbottabad: {
      distanceEn: '50 km',
      distanceUr: '۵۰ کلومیٹر',
      timeEn: 'Approximately 1 hour 35 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۳۵ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '5.9 km',
      distanceUr: '۵.۹ کلومیٹر',
      timeEn: 'Approximately 14 minutes',
      timeUr: 'تقریباً ۱۴ منٹ',
    },
  },
  {
    id: 'ayubia-wildlife',
    number: '09',
    image: '/Welcome to Abbottabd Images/Ayubia Wild Life.jpg',
    titleEn: 'Ayubia Wildlife & Nature',
    titleUr: 'ایوبیہ وائلڈ لائف اور قدرتی مناظر',
    descEn:
      'The Ayubia region is known for its rich natural environment, forested hills, and diverse wildlife. Visitors can enjoy scenic walks, explore the surrounding landscape, and discover nearby attractions, including the famous Pipeline Track and the chairlift area.',
    descUr:
      'ایوبیہ علاقہ اپنے بھرپور قدرتی ماحول، جنگلاتی پہاڑیوں اور متنوع جنگلی حیات کے لیے جانا جاتا ہے۔ سیاح خوشگوار واک کا لطف اٹھا سکتے ہیں، گرد و نواح کا منظر دیکھ سکتے ہیں اور مشہور پائپ لائن ٹریک اور چیئر لفٹ کے علاقے سمیت قریبی مقامات دریافت کر سکتے ہیں۔',
    fromAbbottabad: {
      distanceEn: '55 km',
      distanceUr: '۵۵ کلومیٹر',
      timeEn: 'Approximately 1 hour 9 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۹ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '35.1 km',
      distanceUr: '۳۵.۱ کلومیٹر',
      timeEn: 'Approximately 1 hour 30 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۳۰ منٹ',
    },
  },
  {
    id: 'ayubia-national-park',
    number: '10',
    image: '/Welcome to Abbottabd Images/Ayubia national park.jpg',
    titleEn: 'Ayubia National Park',
    titleUr: 'ایوبیہ نیشنل پارک',
    descEn:
      'Ayubia National Park is a protected natural area renowned for its forest ecosystems, biodiversity, and scenic mountain landscapes. It offers opportunities for nature walks, wildlife observation, and exploring the beautiful Galiyat region.',
    descUr:
      'ایوبیہ نیشنل پارک ایک محفوظ قدرتی علاقہ ہے جو اپنے جنگلاتی ماحولیاتی نظام، حیاتیاتی تنوع اور دلکش پہاڑی مناظر کے لیے مشہور ہے۔ یہ فطرت کی سیر، جنگلی حیات کے مشاہدے اور گلیات کے خوبصورت علاقے کی دریافت کے مواقع فراہم کرتا ہے۔',
    fromAbbottabad: {
      distanceEn: '55 km',
      distanceUr: '۵۵ کلومیٹر',
      timeEn: 'Approximately 1 hour 9 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۹ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '3.7 km',
      distanceUr: '۳.۷ کلومیٹر',
      timeEn: 'Approximately 9 minutes',
      timeUr: 'تقریباً ۹ منٹ',
    },
  },
  {
    id: 'shimla-hill',
    number: '11',
    image: '/Welcome to Abbottabd Images/shimla Hill.jpg',
    titleEn: 'Shimla Hill',
    titleUr: 'شملہ ہل',
    descEn:
      'Shimla Hill is a beautiful scenic destination in Abbottabad, offering refreshing views of the surrounding hills and natural landscapes. It is an ideal spot for visitors looking to enjoy fresh air, peaceful surroundings, and the natural beauty of the city.',
    descUr:
      'شملہ ہل ایبٹ آباد میں ایک خوبصورت مناظرین مقام ہے جو گرد و نواح کے پہاڑوں اور قدرتی مناظر کے تازہ کرنے والے مناظر پیش کرتا ہے۔ یہ تازہ ہوا، پرسکون ماحول اور شہر کی قدرتی خوبصورتی کا لطف اٹھانے کے خواہش مندzoekers کے لیے مثالی جگہ ہے۔',
    fromAbbottabad: {
      distanceEn: '4 km',
      distanceUr: '۴ کلومیٹر',
      timeEn: 'Approximately 20 minutes',
      timeUr: 'تقریباً ۲۰ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '38 km',
      distanceUr: '۳۸ کلومیٹر',
      timeEn: 'Approximately 1 hour 25 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۲۵ منٹ',
    },
    noteEn: 'Drive carefully on hilly roads and follow traffic signs. Travel time may vary depending on traffic and road conditions.',
    noteUr: 'پہاڑی سڑکوں پر احتیاط سے چلائیں اور ٹریفک کے اشاروں پر عمل کریں۔ ٹریفک اور سڑک کی حالتوں پر منحصر کرتے ہوئے سفر کا وقت muuttuu سکتا ہے۔',
  },
  {
    id: 'sajikot-abshar',
    number: '12',
    image: '/Welcome to Abbottabd Images/sajikot abshar.jpg',
    titleEn: 'Sajikot Abshar (Sajikot Waterfall)',
    titleUr: 'سجی کوٹ آبشار (سجی کوٹ واٹر فال)',
    descEn:
      'Sajikot Abshar is a spectacular natural waterfall located near Havelian in Abbottabad District. Surrounded by lush greenery, rugged hills, and breathtaking mountain scenery, it is a popular destination for nature lovers, photographers, and adventure enthusiasts.',
    descUr:
      'سجی کوٹ آبشار ایبٹ آباد ضلع میں هولیوں کے قریب ایک شاندار قدرتی آبشار ہے۔ سرسبز و شاداب سبزی، ناقابل تسخیر پہاڑیاں اور دلکش پہاڑی مناظر سے گھرا ہوا یہ مقام فطرت کے عاشقوں، فٹوگرافرز اور مہم جو افراد کے لیے مقبول مقصد ہے۔',
    fromAbbottabad: {
      distanceEn: '42 km',
      distanceUr: '۴۲ کلومیٹر',
      timeEn: 'Approximately 1 hour 30 minutes',
      timeUr: 'تقریباً ۱ گھنٹہ ۳۰ منٹ',
    },
    fromNathiaGali: {
      distanceEn: '75 km',
      distanceUr: '۷۵ کلومیٹر',
      timeEn: 'Approximately 2 hours 30 minutes',
      timeUr: 'تقریباً ۲ گھنٹے ۳۰ منٹ',
    },
    noteEn: 'Popular Route: Travel from Abbottabad towards Havelian, then turn onto Sajikot Road and continue towards Sajikot Waterfall. The scenic route offers beautiful views of green landscapes and surrounding hills.',
    noteUr: 'مشہور راستہ: ایبٹ آباد سے هولیوں کی طرف سفر کریں، پھر سجی کوٹ روڈ پر موڑیں اور سجی کوٹ آبشار کی طرف بڑھیں۔ یہ دلکش راستہ سرسبز مناظر اور گرد و نواح کی پہاڑیاں کے خوبصورت مناظر پیش کرتا ہے۔',
  },
];

const PARK_NOTICE = {
  en: 'Please follow park regulations, stay on designated trails, and avoid disturbing wildlife.',
  ur: 'براہِ کرم پارک کے ضوابط پر عمل کریں، مقررہ راستوں پر رہیں اور جنگلی حیات کو تنگ نہ کریں۔',
};

const SAFETY_TIPS = [
  {
    id: 'advisories',
    en: 'Check the latest road and weather advisories before travelling.',
    ur: 'سفر سے قبل سڑک اور موسم کی تازہ ایڈوائزری چیک کریں۔',
  },
  {
    id: 'extra-time',
    en: 'Allow extra time for mountain roads, traffic congestion, and changing weather conditions.',
    ur: 'پہاڑی سڑکوں، ٹریفک کے رش اور بدلتے موسمی حالات کے لیے اضافی وقت رکھیں۔',
  },
  {
    id: 'signs',
    en: 'Follow traffic signs, observe speed limits, and drive carefully on winding roads.',
    ur: 'ٹریفک اشاروں پر عمل کریں، رفتار کی حدود کا خیال رکھیں اور گھماؤ دار سڑکوں پر احتیاط سے ڈرائیو کریں۔',
  },
  {
    id: 'parking',
    en: 'Use designated parking areas and keep tourist destinations clean.',
    ur: 'مقررہ پارکنگ مقامات استعمال کریں اور سیاحتی مقامات کو صاف رکھیں۔',
  },
  {
    id: 'local-instructions',
    en: 'Follow local safety instructions and respect protected natural areas.',
    ur: 'مقامی حفاظتی ہدایات پر عمل کریں اور محفوظ قدرتی علاقوں کا احترام کریں۔',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const WelcomeAbbottabad: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<Attraction | null>(null);

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'خوش آمدید ایبٹ آباد | ٹریفک وارڈن ایبٹ آباد'
        : 'Welcome to Abbottabad | Traffic Warden Abbottabad';
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
      <section className="relative overflow-hidden border-b border-[#0000aa] bg-[#000080] pt-6 pb-8 text-white sm:pt-10 sm:pb-12 md:pt-14 md:pb-16 lg:pt-20 lg:pb-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#000080] via-[#000080]/90 to-[#000080]/70"
          aria-hidden="true"
        />
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute end-0 top-0 h-40 w-40 rounded-full bg-brand-blue/30 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-96 lg:w-96"
          aria-hidden="true"
        />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Tourism', labelUrdu: 'سیاحت' },
              { label: 'Welcome to Abbottabad', labelUrdu: 'خوش آمدید ایبٹ آباد' },
            ]}
            className="mb-3 sm:mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3 sm:space-y-4">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-lime sm:text-[11px] md:text-xs">
              <Sparkles className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
              <span className="truncate">
                {t('Tourism — Explore Galiyat', 'سیاحت — گلیات کی سیر')}
              </span>
            </div>

            <h1 className="text-balance text-2xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {t('WELCOME TO ABBOTTABAD', 'خوش آمدید ایبٹ آباد')}
            </h1>

            <p className="text-sm font-semibold text-brand-lime sm:text-base md:text-lg lg:text-xl">
              {t('Gateway to the Northern Areas', 'شمالی علاقوں کا دروازہ')}
            </p>

            <div className="flex flex-wrap gap-2 pt-2 sm:pt-3">
              {HERO_CHIPS.map((chip) => (
                <span
                  key={chip.en}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1.5 text-[10px] font-medium text-white sm:px-3 sm:py-2 sm:text-[11px] md:text-xs"
                >
                  <chip.icon className="h-3.5 w-3.5 shrink-0 text-brand-lime" aria-hidden="true" />
                  {t(chip.en, chip.ur)}
                </span>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <div className="space-y-8 py-6 sm:space-y-10 sm:py-8 md:space-y-12 md:py-10 lg:space-y-14 lg:py-12 xl:space-y-16 xl:py-16">
          {/* ------------------------- WARM WELCOME MESSAGE ----------------------- */}
          <section aria-labelledby="welcome-heading">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                  <HeartHandshake className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('Warm Welcome', 'گرمجوش خیرمقدم')}
                </div>

                <h2
                  id="welcome-heading"
                  className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
                >
                  {t(
                    'A Warm Welcome from Traffic Warden Abbottabad',
                    'ٹریفک وارڈن ایبٹ آباد کی جانب سے گرمجوش خیرمقدم'
                  )}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'Traffic Warden Abbottabad warmly welcomes you to the beautiful city of Abbottabad and the breathtaking Galiyat region. Known for its lush green mountains, pleasant climate, and scenic landscapes, this region offers unforgettable experiences for tourists and families alike.',
                    'ٹریفک وارڈن ایبٹ آباد آپ کو ایبٹ آباد کے خوبصورت شہر اور دلکش علاقے گلیات میں گرمجوش خیرمقدم کرتا ہے۔ سرسبز پہاڑوں، خوشگوار موسم اور دلکش مناظر کے لیے مشہور یہ علاقہ سیاحوں اور خاندانوں کے لیے ناقابل فراموش تجربات پیش کرتا ہے۔'
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-brand-light-text sm:text-base">
                  {t(
                    'We are committed to making your journey safe, smooth, and enjoyable. Explore the region’s beautiful tourist attractions, follow traffic guidelines, and travel responsibly as you discover the natural beauty of Abbottabad and Galiyat.',
                    'ہم آپ کے سفر کو محفوظ، ہموار اور خوشگوار بنانے کے لیے پُرعزم ہیں۔ علاقے کے خوبصورت سیاحتی مقامات کی سیر کریں، ٹریفک ہدایات پر عمل کریں اور ذمہ داری کے ساتھ سفر کرتے ہوئے ایبٹ آباد اور گلیات کی قدرتی خوبصورتی دریافت کریں۔'
                  )}
                </p>

                {/* Tagline + call to action */}
                <div className="mt-6 rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-4 sm:p-5">
                  <p className="text-sm font-bold leading-relaxed text-brand-blue-900 sm:text-base">
                    {t(
                      'Your Safety, Our Priority. Your Journey, Our Responsibility.',
                      'آپ کی حفاظت، ہماری ترجیح۔ آپ کا سفر، ہماری ذمہ داری۔'
                    )}
                  </p>
                  <a
                    href="#attractions"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
                  >
                    <Mountain className="h-4 w-4" aria-hidden="true" />
                    {t('Explore Tourist Attractions', 'سیاحتی مقامات دیکھیں')}
                  </a>
                </div>
              </div>

              {/* Welcome-side facts */}
              <div className="lg:col-span-1">
                <div className="h-full overflow-hidden rounded-2xl border border-brand-light-border bg-brand-light-surface shadow-gov">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src={HERO_IMAGE}
                      alt={t('Welcome to Abbottabad', 'خوش آمدید ایبٹ آباد')}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute inset-x-3 bottom-3 text-xs font-bold text-white sm:text-sm">
                      {t('Welcome to Abbottabad', 'خوش آمدید ایبٹ آباد')}
                    </span>
                  </div>

                  <ul className="space-y-2.5 p-3.5 sm:p-4 md:p-5">
                    {WELCOME_FACTS.map((fact) => (
                      <li key={fact.id} className="flex items-start gap-2 sm:gap-2.5">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue sm:h-7 sm:w-7">
                          <fact.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
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

          {/* ------------------------------ ATTRACTIONS --------------------------- */}
          <section id="attractions" aria-labelledby="attractions-heading" className="scroll-mt-20 sm:scroll-mt-24">
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-blue sm:text-[11px]">
                <Compass className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                {t('Tourist Attractions', 'سیاحتی مقامات')}
              </div>
              <h2
                id="attractions-heading"
                className="mt-2 text-balance text-lg font-bold text-brand-dark sm:text-xl md:text-2xl lg:text-3xl"
              >
                {t(
                  'Discover the Beauty of Abbottabad & Galiyat',
                  'ایبٹ آباد اور گلیات کی خوبصورتی دریافت کریں'
                )}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'From refreshing waterfalls and scenic viewpoints to lush forests and adventurous hiking trails, explore some of the most popular tourist attractions in and around Abbottabad and Galiyat.',
                  'تازگی بخش آبشاروں اور دلکش نظاروں سے لے کر سرسبز جنگلات اور مہم جو ہائیکنگ ٹریلز تک، ایبٹ آباد اور گلیات کے اندر اور آس پاس کے کچھ مقبول ترین سیاحتی مقامات دریافت کریں۔'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {ATTRACTIONS.map((attraction) => (
                <article
                  key={attraction.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-light-border bg-brand-light-surface shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedImage(attraction)}
                    className="group relative block aspect-[4/3] w-full overflow-hidden bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
                    aria-label={t(
                      `View ${attraction.titleEn}`,
                      `${attraction.titleUr} دیکھیں`
                    )}
                  >
                    <img
                      src={attraction.image}
                      alt={attraction.titleEn}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute start-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-lime font-mono text-sm font-bold text-brand-dark shadow-gov-md">
                      {attraction.number}
                    </span>
                    <span className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <Maximize2 className="h-3 w-3" aria-hidden="true" />
                      {t('View photo', 'تصویر دیکھیں')}
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
                    <h3 className="text-sm font-bold leading-snug text-brand-dark sm:text-base md:text-lg">
                      {t(attraction.titleEn, attraction.titleUr)}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-brand-light-muted sm:text-sm">
                      {t(attraction.descEn, attraction.descUr)}
                    </p>

                    {/* Distance & travel time */}
                    <div className="mt-3 rounded-xl border border-brand-blue-100 bg-brand-blue-50 p-3 sm:p-3.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-blue sm:text-[11px]">
                        <Route className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                        {t('Distance & Travel Time', 'فاصلہ اور سفر کا وقت')}
                      </div>

                      <dl className="mt-2.5 space-y-2.5 sm:space-y-3">
                        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-2 sm:gap-3">
                          <dt className="flex items-center gap-1.5 text-xs font-semibold text-brand-blue-900">
                            <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" aria-hidden="true" />
                            {t('From Abbottabad', 'ایبٹ آباد سے')}
                          </dt>
                          <dd className="text-end text-xs text-brand-blue-900/90 sm:text-sm">
                            <span className="block font-bold">
                              {t(
                                attraction.fromAbbottabad.distanceEn,
                                attraction.fromAbbottabad.distanceUr
                              )}
                            </span>
                            <span className="text-brand-blue-900/70">
                              {t(
                                attraction.fromAbbottabad.timeEn,
                                attraction.fromAbbottabad.timeUr
                              )}
                            </span>
                          </dd>
                        </div>

                        {attraction.fromNathiaGali && (
                        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-2 sm:gap-3 border-t border-brand-blue-200 pt-2.5 sm:pt-3">
                          <dt className="flex items-center gap-1.5 text-xs font-semibold text-brand-blue-900">
                            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" aria-hidden="true" />
                            {t('From Nathia Gali', 'ناتھیا گلی سے')}
                          </dt>
                          <dd className="text-end text-xs text-brand-blue-900/90 sm:text-sm">
                            <span className="block font-bold">
                              {t(
                                attraction.fromNathiaGali.distanceEn,
                                attraction.fromNathiaGali.distanceUr
                              )}
                            </span>
                            <span className="text-brand-blue-900/70">
                              {t(
                                attraction.fromNathiaGali.timeEn,
                                attraction.fromNathiaGali.timeUr
                              )}
                            </span>
                          </dd>
                        </div>
                      )}
                      </dl>
                    </div>

                    {attraction.noteEn && (
                      <p className="mt-2.5 flex items-start gap-1.5 sm:gap-2 rounded-lg border border-amber-200 bg-amber-50 p-2.5 sm:p-3 text-[10px] leading-relaxed text-amber-900 sm:text-xs">
                        <Info className="mt-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" aria-hidden="true" />
                        {t(attraction.noteEn, attraction.noteUr ?? attraction.noteEn)}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-4 flex flex-col sm:flex-row items-start gap-2 rounded-xl border border-brand-blue-100 bg-brand-blue-50 p-3 sm:p-3.5 text-xs font-medium leading-relaxed text-brand-blue-900 sm:text-sm">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
              {t(PARK_NOTICE.en, PARK_NOTICE.ur)}
            </p>
          </section>

          {/* ------------------------------ ROUTE MAPS ---------------------------- */}
          <section id="route-maps" aria-labelledby="route-maps-heading" className="scroll-mt-20 sm:scroll-mt-24">
            <div className="mb-4 sm:mb-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-blue sm:text-[11px]">
                <Map className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                {t('Route Maps', 'سفری نقشے')}
              </div>
              <h2
                id="route-maps-heading"
                className="mt-2 text-balance text-lg font-bold text-brand-dark sm:text-xl md:text-2xl lg:text-3xl"
              >
                {t(
                  'Galiyat Route Maps — Harno to Barrian',
                  'گلیات کے سفری نقشے — ہارنو سے بریان'
                )}
              </h2>
              <p className="mx-auto mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  'Official route maps by Traffic Police Abbottabad covering road safety conditions and tourist spots across the Galiyat belt.',
                  'ٹریفک پولیس ایبٹ آباد کی جانب سے باضابطہ سفری نقشے، جن میں گلیات کی سڑکوں کی صورتحال اور سیاحتی مقامات شامل ہیں۔'
                )}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {ROUTE_MAPS.map((routeMap, index) => (
                <article
                  key={routeMap.id}
                  className="overflow-hidden rounded-2xl border border-brand-light-border bg-brand-light-surface shadow-gov transition-all hover:border-brand-blue-300 hover:shadow-gov-md"
                >
                  <img
                    src={routeMap.image}
                    alt={routeMap.titleEn}
                    loading="lazy"
                    className={
                      index === 1
                        ? 'mx-auto h-auto w-full max-w-[1210px]'
                        : 'h-auto w-full'
                    }
                  />
                  <div className="flex flex-col gap-2.5 border-t border-brand-light-border p-3 sm:p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-sm font-bold leading-snug text-brand-dark sm:text-base">
                        {t(routeMap.titleEn, routeMap.titleUr)}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-brand-light-muted sm:text-sm">
                        {t(routeMap.descEn, routeMap.descUr)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-[11px] font-bold sm:text-xs ${
                        index === 0
                          ? 'border border-red-200 bg-red-50 text-red-700'
                          : 'border border-brand-blue-100 bg-brand-blue-50 text-brand-blue'
                      }`}
                    >
                      {index === 0 ? (
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <Route className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      )}
                      {t(routeMap.badgeEn, routeMap.badgeUr)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* --------------------------- TRAVEL SMART / SAFE ---------------------- */}
          <section aria-labelledby="safety-heading">
            <div className="relative overflow-hidden rounded-2xl border border-[#0000aa] bg-[#000080] text-white">
              <div
                className="pointer-events-none absolute inset-0 gov-subtle-pattern opacity-10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute end-0 top-0 h-40 w-40 rounded-full bg-brand-blue/30 blur-3xl sm:h-48 sm:w-48 md:h-64 md:w-64"
                aria-hidden="true"
              />

              <div className="relative z-10 grid grid-cols-1 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 lg:grid-cols-3 lg:p-10">
                <div className="lg:col-span-1 space-y-3 sm:space-y-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-lime text-brand-dark sm:h-12 sm:w-12">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </span>
                  <h2 id="safety-heading" className="text-lg font-bold sm:text-xl md:text-2xl">
                    {t('Travel Smart. Travel Safe.', 'سمجھداری سے سفر کریں۔ محفوظ سفر کریں۔')}
                  </h2>
                  <p className="text-sm leading-relaxed text-brand-blue-100 sm:text-base">
                    {t(
                      'Your journey through Abbottabad and Galiyat should be safe, comfortable, and memorable.',
                      'ایبٹ آباد اور گلیات کا آپ کا سفر محفوظ، آرام دہ اور یادگار ہونا چاہیے۔'
                    )}
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <ul className="space-y-2.5 sm:space-y-3">
                    {SAFETY_TIPS.map((tip) => (
                      <li
                        key={tip.id}
                        className="flex items-start gap-2.5 sm:gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-3.5"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand-lime sm:h-5 sm:w-5"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-relaxed text-white">
                          {t(tip.en, tip.ur)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-col gap-3 rounded-xl border border-brand-lime/30 bg-white/5 p-3.5 sm:p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-start gap-2 sm:gap-2.5 text-sm font-semibold text-white">
                      <PhoneCall
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-lime"
                        aria-hidden="true"
                      />
                      {t(
                        'For the latest traffic updates and travel guidance, stay connected with Traffic Warden Abbottabad.',
                        'تازہ ترین ٹریفک اپڈیٹس اور سفری رہنمائی کے لیے ٹریفک وارڈن ایبٹ آباد سے جُڑے رہیں۔'
                      )}
                    </p>
                    <a
                      href="tel:1915"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-lime px-4 py-2 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-lime-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime/60 sm:px-4 sm:py-2.5"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-3 md:p-4 lg:p-6 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.titleEn}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute end-2 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-colors hover:bg-black/90 sm:end-3 sm:top-3 sm:h-11 sm:w-11"
              aria-label={t('Close', 'بند کریں')}
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </button>

            <div className="flex min-h-0 flex-1 items-center justify-center bg-black p-2 sm:p-4">
              <img
                src={selectedImage.image}
                alt={selectedImage.titleEn}
                className="h-auto max-h-[80vh] sm:max-h-[75vh] w-full object-contain"
              />
            </div>

            <div className="max-h-[25vh] overflow-y-auto bg-slate-900 p-3 sm:p-4 md:p-6 text-white">
              <h3 className="text-base font-bold sm:text-lg md:text-xl">
                {t(selectedImage.titleEn, selectedImage.titleUr)}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeAbbottabad;
