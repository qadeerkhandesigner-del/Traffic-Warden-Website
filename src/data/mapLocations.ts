import type { GaliyatLocationId } from '../types/galiyat';
import type { MapCategory, MapCategoryMeta, MapLocation } from '../types/map';

/* -------------------------------------------------------------------------- */
/*                              CATEGORY METADATA                              */
/* -------------------------------------------------------------------------- */

/**
 * Category colours follow the website palette (navy/blue primary, plus a
 * distinct hue per marker family so the legend reads at a glance).
 */
export const MAP_CATEGORIES: MapCategoryMeta[] = [
  {
    id: 'tourist',
    label: 'Tourist Attractions',
    labelUrdu: 'سیاحتی مقامات',
    color: '#d97706',
    iconName: 'Star',
  },
  {
    id: 'hotel',
    label: 'Hotels',
    labelUrdu: 'ہوٹل',
    color: '#6d28d9',
    iconName: 'Hotel',
  },
  {
    id: 'restaurant',
    label: 'Restaurants',
    labelUrdu: 'ریسٹورنٹ',
    color: '#be185d',
    iconName: 'Utensils',
  },
  {
    id: 'fuel',
    label: 'Fuel Stations',
    labelUrdu: 'پیٹرول پمپ',
    color: '#b91c1c',
    iconName: 'Fuel',
  },
  {
    id: 'police',
    label: 'Police Assistance',
    labelUrdu: 'پولیس معاونت',
    color: '#1e3a8a',
    iconName: 'ShieldCheck',
  },
  {
    id: 'facilitation',
    label: 'Facilitation Centers',
    labelUrdu: 'سہولت مرکز',
    color: '#256dd2',
    iconName: 'Building',
  },
  {
    id: 'trail',
    label: 'Hiking Trails',
    labelUrdu: 'ٹریکنگ راستے',
    color: '#047857',
    iconName: 'Footprints',
  },
];

export const MAP_CATEGORY_OPTIONS = MAP_CATEGORIES as ReadonlyArray<
  MapCategoryMeta & { id: MapCategory }
>;

export function getMapCategoryMeta(category: MapCategory): MapCategoryMeta {
  return MAP_CATEGORIES.find((categoryMeta) => categoryMeta.id === category) ?? MAP_CATEGORIES[0];
}

/* -------------------------------------------------------------------------- */
/*                              DEFAULT MAP VIEW                              */
/* -------------------------------------------------------------------------- */

/** Default view: Abbottabad city with the wider Galiyat plateau approachable. */
export const MAP_DEFAULT_CENTER: [number, number] = [34.1688, 73.2215];
export const MAP_DEFAULT_ZOOM = 11;
/** Matches the outer bounds of the mini map frame on the Reset control. */
export const MAP_BOUNDS: [number, number][] = [
  [33.75, 72.5],
  [34.85, 74.25],
];

/* -------------------------------------------------------------------------- */
/*                       STARTER LOCATIONS (APPROXIMATE)                       */
/* -------------------------------------------------------------------------- */

/**
 * Starter set shipped with the website.
 *
 * Coordinates are widely published approximations of the named places — they
 * are marked `isVerified: false` and displayed with an "approximate" notice.
 * Traffic Police staff re-verify and publish official records through
 * Supabase, which then replace/augment these entries.
 */
export const STARTER_MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'starter-shimla-hill',
    name: 'Shimla Hill View Point',
    category: 'tourist',
    latitude: 34.1725,
    longitude: 73.2385,
    description:
      'Hill viewpoint on the eastern edge of Abbottabad city with a panoramic view of the valley.',
    address: 'Abbottabad, Khyber Pakhtunkhwa',
    contactNumber: null,
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-harno-park',
    name: 'Harno Family Park',
    category: 'tourist',
    latitude: 34.2233,
    longitude: 73.1828,
    description:
      'Family park and picnic point along the Harno road, a popular day trip from Abbottabad.',
    address: 'Harno, Abbottabad',
    contactNumber: null,
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-namli-waterfall',
    name: 'Namli Maira Waterfall',
    category: 'tourist',
    latitude: 34.3123,
    longitude: 73.3835,
    description: 'Seasonal waterfall near Namli Maira village, short trek from the roadside stop.',
    address: 'Namli Maira, Abbottabad',
    contactNumber: null,
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-sajikot-waterfall',
    name: 'Sajikot Waterfall',
    category: 'tourist',
    latitude: 34.3312,
    longitude: 73.3568,
    description: 'Popular waterfall near Sajikot village on the Havelian side of the Galiyat belt.',
    address: 'Sajikot, Abbottabad',
    contactNumber: null,
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-nathia-gali',
    name: 'Nathia Gali',
    category: 'tourist',
    latitude: 34.3819,
    longitude: 73.4271,
    description:
      'Main hill station of the Galiyat region — markets, walks and the Doddington Point viewpoint.',
    address: 'Nathia Gali, Abbottabad',
    contactNumber: null,
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-ayubia-park',
    name: 'Ayubia National Park',
    category: 'tourist',
    latitude: 34.3252,
    longitude: 73.4033,
    description: 'National park with chairlift, walking tracks and picnic areas at Ayubia.',
    address: 'Ayubia, Abbottabad',
    contactNumber: null,
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-thandiani',
    name: 'Thandiani',
    category: 'tourist',
    latitude: 34.279,
    longitude: 73.2741,
    description: 'High plateau resort north-east of Abbottabad with wide valley views.',
    address: 'Thandiani, Abbottabad',
    contactNumber: null,
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-dunga-gali',
    name: 'Dunga Gali',
    category: 'tourist',
    latitude: 34.3326,
    longitude: 73.433,
    description: 'Trailhead village for the Pipeline Track on the Murree–Abbottabad road.',
    address: 'Dunga Gali, Abbottabad',
    contactNumber: null,
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-pipeline-track',
    name: 'Pipeline Track (Dunga Gali – Ayubia)',
    category: 'trail',
    latitude: 34.3332,
    longitude: 73.4342,
    description:
      'Trek trailhead — approximate start position. Track geometry is not verified in-app; follow signposted route.',
    address: 'Dunga Gali, Abbottabad',
    contactNumber: null,
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-mushkpuri',
    name: 'Mushkpuri Top (summit)',
    category: 'trail',
    latitude: 34.3358,
    longitude: 73.4663,
    description: 'Second highest summit of the Galiyat belt. Approximate summit position.',
    address: 'Mushkpuri, Abbottabad',
    contactNumber: null,
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-miranjani',
    name: 'Miranjani Top (summit)',
    category: 'trail',
    latitude: 34.3553,
    longitude: 73.4394,
    description:
      'Highest summit of the Nathia Gali area. Approximate summit position — track starts near Namli Maira.',
    address: 'Miranjani, Abbottabad',
    contactNumber: null,
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-twc-larri-adda',
    name: 'Traffic Facilitation Centre — Larri Adda',
    category: 'facilitation',
    latitude: 34.187,
    longitude: 73.228,
    description:
      'Public facilitation centre of Traffic Warden Abbottabad. Approximate position — confirm locally.',
    address: 'Larri Adda, Abbottabad',
    contactNumber: '1915',
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-twc-harno',
    name: 'Traffic Facilitation Centre — Harno',
    category: 'facilitation',
    latitude: 34.224,
    longitude: 73.1832,
    description:
      'Public facilitation centre on the Harno route. Approximate position — confirm locally.',
    address: 'Harno, Abbottabad',
    contactNumber: '1915',
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-twc-nathia-gali',
    name: 'Traffic Facilitation Centre — Nathia Gali',
    category: 'facilitation',
    latitude: 34.3817,
    longitude: 73.4266,
    description:
      'Winter-season facilitation point in the Galiyat belt. Approximate position — confirm locally.',
    address: 'Nathia Gali, Abbottabad',
    contactNumber: '1915',
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-barrian-entry',
    name: 'Barrian Entry Point',
    category: 'facilitation',
    latitude: 34.2955,
    longitude: 73.3405,
    description:
      'Entry point en-route to the Galiyat belt where traffic guidance is provided. Approximate position.',
    address: 'Barrian, Abbottabad',
    contactNumber: '1915',
    isVerified: false,
    isPublished: true,
    isStarter: true,
  },
];

/* -------------------------------------------------------------------------- */
/*                    ADVISORY LOCATION → COORDINATE MAPPING                   */
/* -------------------------------------------------------------------------- */

/**
 * Connects the existing Road Advisory system's location scopes to the map so
 * advisory markers can be placed at the matching destination.
 */
export const ADVISORY_LOCATION_COORDS: Record<
  Exclude<GaliyatLocationId, 'all'>,
  [number, number]
> = {
  'nathia-gali': [34.3819, 73.4271],
  ayubia: [34.3252, 73.4033],
  'dunga-gali': [34.3326, 73.433],
  thandiani: [34.279, 73.2741],
};

/** Advisory updates older than this are shown as "possibly outdated". */
export const ADVISORY_STALE_MS = 12 * 60 * 60 * 1000;
