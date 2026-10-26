/**
 * Central route metadata + head management for the official portal.
 *
 * Pages keep ownership of `document.title` (bilingual, set per page).
 * This module owns everything else in <head>: meta description, canonical,
 * robots, Open Graph / Twitter mirrors and JSON-LD structured data.
 *
 * Facts used below (address, email, helpline 1915, Facebook page) are taken
 * verbatim from the public Footer component — nothing is invented.
 */

export const SITE_URL = 'https://abbottabadtrafficwarden.com';

export interface RouteMeta {
  /** Short page name (mirrors the visible page H1/hero) — used for og:title. */
  title: string;
  /** Unique English meta description for the route. */
  description: string;
  /** Canonical URL path — set when multiple paths render the same page. */
  canonicalPath?: string;
}

/** Intermediate breadcrumb labels (same as navigation labels). */
const SEGMENT_LABELS: Record<string, string> = {
  about: 'About Us',
  services: 'Services',
  'driving-license': 'Driving Licence',
  initiatives: 'Initiatives',
  'traffic-education': 'Traffic Education',
  tourism: 'Tourism',
};

/**
 * One entry per canonical public route. Alias paths are listed separately in
 * ROUTE_ALIASES below so exactly one canonical exists per page.
 */
export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Traffic Warden Abbottabad | Official Citizen Portal',
    description:
      'Official citizen information and guidance portal for Traffic Warden Abbottabad, Khyber Pakhtunkhwa Police. Licensing guidance, traffic safety regulations, route advisories, and helpline 1915.',
  },
  '/about': {
    title: 'About Traffic Warden Abbottabad',
    description:
      'About Traffic Warden Abbottabad, Khyber Pakhtunkhwa Police — officers leadership, mission and vision, organizational structure, achievements and the district Shuhada memorial.',
  },
  '/about/officers-message': {
    title: 'Officers’ Messages',
    description:
      'Messages from the commanding officers of Traffic Warden Abbottabad on road discipline, tourist facilitation and citizen service.',
  },
  '/about/officers': {
    title: 'District Police Officers',
    description:
      'Directory of police officers serving District Abbottabad, Khyber Pakhtunkhwa Police, with their current portfolios.',
  },
  '/about/shuhada': {
    title: 'Shuhada Memorial',
    description:
      'Memorial honoring the martyred (Shuhada) personnel of District Police Abbottabad, Khyber Pakhtunkhwa Police.',
  },
  '/about/mission-vision': {
    title: 'Mission & Vision',
    description:
      'Mission and vision of Traffic Warden Abbottabad for safer, organized and citizen-friendly roads across District Abbottabad.',
  },
  '/about/organization': {
    title: 'Organization Structure',
    description:
      'Organizational structure of Traffic Police Abbottabad — formations, units and management hierarchy of the district traffic police.',
  },
  '/about/achievements': {
    title: 'Achievements',
    description:
      'Achievements and community initiatives of Traffic Warden Abbottabad in road safety, tourism facilitation and public service.',
  },
  '/services': {
    title: 'Citizen Services',
    description:
      'Citizen services of Traffic Police Abbottabad — driving licence guidance, driving school and traffic facilitation services.',
  },
  '/services/driving-license': {
    title: 'Driving Licence Services',
    description:
      'Driving licence services in District Abbottabad — new licences, learner permits, renewals, duplicates, international permits and fee structure.',
  },
  '/services/driving-license/new': {
    title: 'New Driving Licence',
    description:
      'How to apply for a new driving licence in District Abbottabad — requirements, documents, fees and the step-by-step process.',
  },
  '/services/driving-license/learner-permit': {
    title: 'Learner Permit',
    description:
      'How to obtain a learner permit in District Abbottabad — eligibility, required documents and application steps.',
  },
  '/services/driving-license/duplicate': {
    title: 'Duplicate Driving Licence',
    description:
      'Process for obtaining a duplicate driving licence copy in District Abbottabad after loss or damage of the original.',
  },
  '/services/driving-license/renewal': {
    title: 'Driving Licence Renewal',
    description:
      'How to renew an expiring driving licence in District Abbottabad — requirements, fees and renewal process.',
  },
  '/services/driving-license/raabta-app': {
    title: 'Raabta App Licence Services',
    description:
      'Driving licence services through the Raabta App for Traffic Police Abbottabad citizens.',
  },
  '/services/driving-license/e-license': {
    title: 'E-Licence',
    description:
      'E-licence (digital driving licence) guidance for citizens of District Abbottabad, Khyber Pakhtunkhwa Police.',
  },
  '/services/driving-license/international-permit': {
    title: 'International Driving Permit',
    description:
      'How to apply for an international driving permit in District Abbottabad — requirements and application process.',
  },
  '/services/driving-license/for-afghans': {
    title: 'Licence for Afghan Nationals',
    description:
      'Driving licence guidance for Afghan nationals applying in District Abbottabad — requirements and process.',
  },
  '/services/driving-license/diplomats': {
    title: 'Licence for Diplomats',
    description:
      'Driving licence guidance for diplomats and foreign mission staff stationed in District Abbottabad.',
  },
  '/services/driving-license/conversion': {
    title: 'Licence Conversion',
    description:
      'Converting an existing driving licence issued elsewhere or for another vehicle class in District Abbottabad.',
  },
  '/services/driving-license/endorsement': {
    title: 'Licence Endorsement',
    description:
      'Driving licence endorsement information for District Abbottabad — when endorsements apply and how the record is maintained.',
  },
  '/services/driving-license/fee-structure': {
    title: 'Driving Licence Fee Structure',
    description:
      'Official driving licence fee structure for District Abbottabad — licence, permit and service fees as notified.',
  },
  '/services/driving-school': {
    title: 'Traffic Police Driving School',
    description:
      'Traffic Police Driving School Abbottabad — practical driving lessons, road-safety training and simulator-based instruction.',
  },
  '/initiatives/command-control-room': {
    title: 'Command & Control Room',
    description:
      'Command & Control Room of Traffic Police Abbottabad — 24/7 road monitoring and coordinated emergency response.',
  },
  '/initiatives/special-squads': {
    title: 'Special Squads',
    description:
      'Specialized traffic squads of Abbottabad including Shaheen Squad, First Aid Squad, Bodycam Squad and Respirator Mask Squad.',
  },
  '/initiatives/toll-1915-helpline': {
    title: 'Toll 1915 Helpline',
    description:
      'Toll-free 1915 helpline of Traffic Warden Abbottabad for on-road emergencies, assistance and citizen guidance.',
  },
  '/initiatives/fm-radio': {
    title: 'Traffic FM Radio',
    description:
      'Traffic FM radio programming of Traffic Police Abbottabad and its road-safety awareness broadcasts for citizens.',
  },
  '/initiatives/pahchan-app': {
    title: 'Pehchaan TVS',
    description:
      'Pehchaan initiative of Traffic Police Abbottabad — citizen identity and trust-building programs.',
  },
  '/initiatives/helmet-mirror-distribution': {
    title: 'Free Helmet & Side Mirror Distribution',
    description:
      'Free helmet and side-mirror distribution initiative of Abbottabad Traffic Police for vulnerable road users.',
  },
  '/traffic-education': {
    title: 'Traffic Education',
    description:
      'Traffic education and awareness programs of Traffic Warden Abbottabad — road safety learning resources for citizens.',
  },
  '/traffic-education/offense-list': {
    title: 'Offense List & Penalties',
    description:
      'List of traffic offenses and applicable penalties enforced by Traffic Police Abbottabad, Khyber Pakhtunkhwa.',
  },
  '/traffic-education/driving-test-guide': {
    title: 'Driving Test Guide',
    description:
      'Step-by-step guide and tips to prepare for the driving test in District Abbottabad — traffic rules, signs and test format.',
  },
  '/tourism/welcome-abbottabad': {
    title: 'Welcome to Abbottabad',
    description:
      'Tourist information for Abbottabad and the Galiyat region — scenic points, parks, trails and travel guidance from Traffic Police.',
  },
  '/tourism/galiyat-travel-advisory': {
    title: 'Galiyat Travel Advisory',
    description:
      'Official Galiyat hill-region travel advisory from Traffic Police Abbottabad — route status, snowfall updates and safety guidance.',
  },
  '/tourism/winter-travel-safety': {
    title: 'Winter Travel Safety',
    description:
      'Winter travel safety guidance for Abbottabad and Galiyat routes — chain requirements, driving in snow and safe-route information.',
  },
  '/tourism/abbottabad-map': {
    title: 'Interactive Traffic Map',
    description:
      'Interactive map of District Abbottabad showing traffic-relevant locations, routes and landmarks for travellers.',
  },
  '/tourism/mobile-workshop': {
    title: 'Mobile Workshop',
    description:
      'Mobile workshop service of Traffic Police Abbottabad — roadside vehicle assistance for travellers.',
  },
  '/tourism/first-aid': {
    title: 'First Aid Squad',
    description:
      'First Aid Squad of Traffic Police Abbottabad — on-road emergency medical assistance for accident response.',
  },
  '/tourism/canteen-mobile': {
    title: 'Canteen Mobile Service',
    description:
      'Canteen mobile service of Traffic Police Abbottabad for travellers on the Galiyat and city routes.',
  },
  '/tourism/facilitation-center': {
    title: 'Traffic Facilitation Centers',
    description:
      'Traffic facilitation centers of Abbottabad — locations and citizen services available at each center.',
  },
  '/weather': {
    title: 'Weather Updates',
    description:
      'Weather updates for District Abbottabad and the Galiyat hills from Traffic Police Abbottabad — conditions relevant to safe travel.',
  },
  '/traffic-safety': {
    title: 'Traffic Safety',
    description:
      'Traffic safety information for road users in District Abbottabad — helmet, seatbelt and safe-driving guidance.',
  },
  '/abbottabad-traffic': {
    title: 'Abbottabad Traffic',
    description:
      'Abbottabad traffic information — city roads, traffic management and current updates from Traffic Police Abbottabad.',
  },
  '/public-information': {
    title: 'Public Information',
    description:
      'Public traffic information and reference material from Traffic Warden Abbottabad, Khyber Pakhtunkhwa Police.',
  },
  '/media-news': {
    title: 'Media & News',
    description:
      'Media coverage and news from Traffic Warden Abbottabad — events, public notices and district traffic updates.',
  },
  '/contact': {
    title: 'Contact Us',
    description:
      'Contact Traffic Warden Abbottabad — helplines, headquarters contact numbers and communication channels.',
  },
  '/online-complaint': {
    title: 'Online Complaint',
    description:
      'Submit an online traffic complaint to Traffic Police Abbottabad — report violations, disputes and road incidents.',
  },
};

/**
 * Alias paths that render an existing page. They get the page's metadata but
 * resolve to the canonical path for canonical/og:url.
 */
export const ROUTE_ALIASES: Record<string, string> = {
  '/weather-updates': '/weather',
  '/tourism/weather-updates': '/weather',
};

/** Resolve metadata for a pathname (alias-aware, unknown routes tolerated). */
export function resolveRouteMeta(pathname: string): {
  meta: RouteMeta | null;
  canonicalPath: string | null;
} {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const aliased = ROUTE_ALIASES[clean];
  if (aliased) return { meta: ROUTE_META[aliased], canonicalPath: aliased };
  if (Object.prototype.hasOwnProperty.call(ROUTE_META, clean)) {
    return { meta: ROUTE_META[clean], canonicalPath: clean };
  }
  return { meta: null, canonicalPath: null };
}

/** Breadcrumb chain: [{Home}, section…, leaf] for a canonical path. */
export function buildBreadcrumbs(pathname: string): Array<{ name: string; path: string }> {
  const crumbs: Array<{ name: string; path: string }> = [{ name: 'Home', path: '/' }];
  const clean = pathname.replace(/\/+$/, '');
  if (clean === '/' || clean === '') return crumbs;
  const segments = clean.split('/').filter(Boolean);
  let acc = '';
  segments.forEach((segment, index) => {
    acc += `/${segment}`;
    const isLeaf = index === segments.length - 1;
    if (isLeaf) {
      // Leaf always resolves through the alias-aware name of the entry itself
      const { meta, canonicalPath } = resolveRouteMeta(clean);
      if (meta) crumbs.push({ name: meta.title, path: canonicalPath ?? acc });
    } else {
      crumbs.push({ name: SEGMENT_LABELS[segment] ?? segment, path: acc });
    }
  });
  return crumbs;
}

/* ==========================================================================
   Site-wide JSON-LD (facts verbatim from the public Footer — nothing invented)
   ========================================================================== */

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentOrganization',
  name: 'Traffic Warden Abbottabad',
  alternateName: 'Traffic Warden Abbottabad, Khyber Pakhtunkhwa Police',
  url: SITE_URL + '/',
  logo: `${SITE_URL}/Traffic-Logo-Updated.png`,
  email: 'trafficwardenatd@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Opposite District Police Line Abbottabad',
    addressRegion: 'Khyber Pakhtunkhwa',
    addressCountry: 'PK',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '1915',
    contactType: 'Traffic Helpline',
    availableLanguage: ['ur', 'en'],
  },
  parentOrganization: {
    '@type': 'GovernmentOrganization',
    name: 'Abbottabad Police',
    url: 'https://www.abbottabadpolice.kp.gov.pk/',
  },
  sameAs: ['https://www.facebook.com/TrafficWardenAbbottabad'],
};

const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Traffic Warden Abbottabad',
  url: SITE_URL + '/',
};

export { ORG_JSONLD, WEBSITE_JSONLD };
