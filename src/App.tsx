import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { PageContainer } from './components/layout/PageContainer';
import { Button } from './components/ui/Button';
import { FloatingActionButtons } from './components/ui/FloatingActionButtons';
import { SeoManager } from './components/seo/SeoManager';
import { HighPriorityAlertBanner } from './components/galiyat/HighPriorityAlertBanner';

// Homepage: eager — it is the most common entry page (its hero is the LCP).
import { Home } from './pages/Home';

/**
 * Route-level code splitting: every non-home page gets its own lazy chunk so
 * the initial bundle stays small. Named exports are resolved, falling back to
 * `default` for pages that export one.
 */
const lazyPage = (
  name: string,
  loader: () => Promise<Record<string, unknown>>
): React.LazyExoticComponent<React.ComponentType> =>
  lazy(() =>
    loader().then((module) => ({
      default: (module[name] ?? module.default) as React.ComponentType,
    }))
  );

const About = lazyPage('About', () => import('./pages/About'));
const OfficersMessage = lazyPage('OfficersMessage', () => import('./pages/OfficersMessage'));
const Officers = lazyPage('Officers', () => import('./pages/Officers'));
const Shuhada = lazyPage('Shuhada', () => import('./pages/Shuhada'));
const MissionVision = lazyPage('MissionVision', () => import('./pages/MissionVision'));
const Organization = lazyPage('Organization', () => import('./pages/Organization'));
const Achievements = lazyPage('Achievements', () => import('./pages/Achievements'));
const Services = lazyPage('Services', () => import('./pages/Services'));
const DrivingLicenseServices = lazyPage('DrivingLicenseServices', () => import('./pages/DrivingLicenseServices'));
const NewDrivingLicense = lazyPage('NewDrivingLicense', () => import('./pages/NewDrivingLicense'));
const LearnerPermit = lazyPage('LearnerPermit', () => import('./pages/LearnerPermit'));
const DuplicateDrivingLicense = lazyPage('DuplicateDrivingLicense', () => import('./pages/DuplicateDrivingLicense'));
const LicenseRenewal = lazyPage('LicenseRenewal', () => import('./pages/LicenseRenewal'));
const RaabtaApp = lazyPage('RaabtaApp', () => import('./pages/RaabtaApp'));
const ELicense = lazyPage('ELicense', () => import('./pages/ELicense'));
const InternationalPermit = lazyPage('InternationalPermit', () => import('./pages/InternationalPermit'));
const LicenseForAfghans = lazyPage('LicenseForAfghans', () => import('./pages/LicenseForAfghans'));
const LicenseForDiplomats = lazyPage('LicenseForDiplomats', () => import('./pages/LicenseForDiplomats'));
const ConversionOfLicense = lazyPage('ConversionOfLicense', () => import('./pages/ConversionOfLicense'));
const LicenseEndorsement = lazyPage('LicenseEndorsement', () => import('./pages/LicenseEndorsement'));
const LicenseFeeStructure = lazyPage('LicenseFeeStructure', () => import('./pages/LicenseFeeStructure'));
const CommandControlRoom = lazyPage('CommandControlRoom', () => import('./pages/CommandControlRoom'));
const SpecialSquads = lazyPage('SpecialSquads', () => import('./pages/SpecialSquads'));
const Toll1915Helpline = lazyPage('Toll1915Helpline', () => import('./pages/Toll1915Helpline'));
const FMRadio = lazyPage('FMRadio', () => import('./pages/FMRadio'));
const PehchaanTVS = lazyPage('PehchaanTVS', () => import('./pages/PehchaanTVS'));
const FreeHelmetDistribution = lazyPage('FreeHelmetDistribution', () => import('./pages/FreeHelmetDistribution'));
const WelcomeAbbottabad = lazyPage('WelcomeAbbottabad', () => import('./pages/WelcomeAbbottabad'));
const DrivingSchool = lazyPage('DrivingSchool', () => import('./pages/DrivingSchool'));
const TrafficEducation = lazyPage('TrafficEducation', () => import('./pages/TrafficEducation'));
const AbbottabadTraffic = lazyPage('AbbottabadTraffic', () => import('./pages/AbbottabadTraffic'));
const PublicInformation = lazyPage('PublicInformation', () => import('./pages/PublicInformation'));
const Contact = lazyPage('Contact', () => import('./pages/Contact'));
const MediaNews = lazyPage('MediaNews', () => import('./pages/MediaNews'));
const WeatherUpdates = lazyPage('WeatherUpdates', () => import('./pages/WeatherUpdates'));
const GaliyatTravelAdvisory = lazyPage('GaliyatTravelAdvisory', () => import('./pages/GaliyatTravelAdvisory'));
const MobileWorkshop = lazyPage('MobileWorkshop', () => import('./pages/MobileWorkshop'));
const CanteenMobile = lazyPage('CanteenMobile', () => import('./pages/CanteenMobile'));
const TrafficFacilitationCenter = lazyPage('TrafficFacilitationCenter', () => import('./pages/TrafficFacilitationCenter'));
const FirstAid = lazyPage('FirstAid', () => import('./pages/FirstAid'));
const OffenseList = lazyPage('OffenseList', () => import('./pages/OffenseList'));
const DrivingTestGuide = lazyPage('DrivingTestGuide', () => import('./pages/DrivingTestGuide'));
const OnlineComplaint = lazyPage('OnlineComplaint', () => import('./pages/OnlineComplaint'));
const GaliyatAdvisoryAdmin = lazyPage('GaliyatAdvisoryAdmin', () => import('./pages/admin/GaliyatAdvisoryAdmin'));
const WinterTravelSafety = lazyPage('WinterTravelSafety', () => import('./pages/WinterTravelSafety'));
const TrafficSafety = lazyPage('TrafficSafety', () => import('./pages/TrafficSafety'));

/* The interactive map bundles Leaflet — keep it out of the main chunk so the
   rest of the website stays lightweight. */
const AbbottabadMap = lazy(() =>
  import('./pages/AbbottabadMap').then((module) => ({ default: module.default }))
);

// 404 Fallback
const NotFound: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    document.title = 'Page Not Found | Traffic Warden Abbottabad';
  }, []);
  return (
    <div className="py-20 text-center">
      <PageContainer size="narrow">
        <div className="space-y-4">
          <div className="text-6xl font-extrabold text-brand-blue">404</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark">Page Not Found</h1>
          <p className="text-sm text-slate-600">
            The page you are looking for does not exist or has been relocated within the official portal.
          </p>
          <div className="pt-2">
            <Button variant="primary" onClick={() => navigate('/')}>
              Return to Homepage
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

/**
 * Route-level loading fallback (matches the map's spinner language).
 */
const RouteFallback: React.FC = () => {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        Loading…
      </div>
    </div>
  );
};

/**
 * Public portal shell. The hidden admin area (/admin/...) renders without the
 * public header, footer and floating buttons.
 */
const AppShell: React.FC = () => {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith('/admin');
  // The advisory page shows the same notices in full, so the strip is redundant there.
  const isAdvisoryPage = location.pathname.startsWith('/tourism/galiyat-travel-advisory');
  const showAdvisoryAlert = !isAdminArea && !isAdvisoryPage;

  return (
    <div className="min-h-screen flex flex-col bg-brand-light-bg text-brand-light-text selection:bg-brand-lime selection:text-brand-dark">
      {/* Head metadata manager (SEO + structured data) */}
      <SeoManager />

      {/* Official Portal Header */}
      {!isAdminArea && <Header />}

      {/* Emergency strip: only appears when the advisory board has a High/Critical notice */}
      {showAdvisoryAlert && <HighPriorityAlertBanner />}

      {/* Main Content Area with Routing */}
      <main className="flex-1 w-full" id="main-content">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/officers-message" element={<OfficersMessage />} />
            <Route path="/about/officers" element={<Officers />} />
            <Route path="/about/shuhada" element={<Shuhada />} />
            <Route path="/about/mission-vision" element={<MissionVision />} />
            <Route path="/about/organization" element={<Organization />} />
            <Route path="/about/achievements" element={<Achievements />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/driving-license/new" element={<NewDrivingLicense />} />
            <Route path="/services/driving-license/learner-permit" element={<LearnerPermit />} />
            <Route path="/services/driving-license/duplicate" element={<DuplicateDrivingLicense />} />
            <Route path="/services/driving-license/renewal" element={<LicenseRenewal />} />
            <Route path="/services/driving-license/raabta-app" element={<RaabtaApp />} />
            <Route path="/services/driving-license/e-license" element={<ELicense />} />
            <Route path="/services/driving-license/international-permit" element={<InternationalPermit />} />
            <Route path="/services/driving-license/for-afghans" element={<LicenseForAfghans />} />
            <Route path="/services/driving-license/diplomats" element={<LicenseForDiplomats />} />
            <Route path="/services/driving-license/conversion" element={<ConversionOfLicense />} />
            <Route path="/services/driving-license/endorsement" element={<LicenseEndorsement />} />
            <Route path="/services/driving-license/fee-structure" element={<LicenseFeeStructure />} />
            <Route path="/services/driving-license" element={<DrivingLicenseServices />} />
            <Route path="/services/driving-school" element={<DrivingSchool />} />
            <Route path="/initiatives/command-control-room" element={<CommandControlRoom />} />
            <Route path="/initiatives/special-squads" element={<SpecialSquads />} />
            <Route path="/initiatives/toll-1915-helpline" element={<Toll1915Helpline />} />
            <Route path="/initiatives/fm-radio" element={<FMRadio />} />
            <Route path="/initiatives/pahchan-app" element={<PehchaanTVS />} />
            <Route path="/initiatives/helmet-mirror-distribution" element={<FreeHelmetDistribution />} />
            <Route path="/traffic-education" element={<TrafficEducation />} />
            <Route path="/traffic-education/offense-list" element={<OffenseList />} />
            <Route path="/traffic-education/driving-test-guide" element={<DrivingTestGuide />} />
            <Route path="/tourism/welcome-abbottabad" element={<WelcomeAbbottabad />} />
            <Route path="/tourism/galiyat-travel-advisory" element={<GaliyatTravelAdvisory />} />
            <Route path="/tourism/winter-travel-safety" element={<WinterTravelSafety />} />
            <Route path="/tourism/abbottabad-map" element={<AbbottabadMap />} />
            <Route path="/tourism/mobile-workshop" element={<MobileWorkshop />} />
            <Route path="/tourism/first-aid" element={<FirstAid />} />
            <Route path="/tourism/canteen-mobile" element={<CanteenMobile />} />
            <Route path="/tourism/facilitation-center" element={<TrafficFacilitationCenter />} />
            <Route path="/weather" element={<WeatherUpdates />} />
            <Route path="/weather-updates" element={<WeatherUpdates />} />
            <Route path="/tourism/weather-updates" element={<WeatherUpdates />} />
            <Route path="/traffic-safety" element={<TrafficSafety />} />
            <Route path="/abbottabad-traffic" element={<AbbottabadTraffic />} />
            <Route path="/public-information" element={<PublicInformation />} />
            <Route path="/media-news" element={<MediaNews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/online-complaint" element={<OnlineComplaint />} />

            {/* Hidden advisory admin area — no public chrome, sign-in required */}
            <Route path="/admin" element={<GaliyatAdvisoryAdmin />} />
            <Route path="/admin/galiyat-advisory" element={<GaliyatAdvisoryAdmin />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Official Portal Footer */}
      {!isAdminArea && <Footer />}

      {/* Scroll to Top Manager & Floating Trigger */}
      {!isAdminArea && <ScrollToTop />}

      {/* Floating Action Buttons */}
      {!isAdminArea && <FloatingActionButtons />}
    </div>
  );
};

// Shared alert banner component (tiny, part of the eager shell)

export function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
