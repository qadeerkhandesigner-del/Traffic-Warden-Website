import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  RefreshCw,
  AlertCircle,
  Clock,
  Layers,
  Calendar,
  Compass,
} from 'lucide-react';
import {
  fetchAllLocationsWeather,
  computeAdvisoryRisks,
} from '../services/weatherService';
import { GALIYAT_LOCATIONS } from '../data/weatherLocations';
import type { LocationWeatherData, WeatherAdvisoryRisk } from '../types/weather';
import { WeatherAtmosphereHero } from '../components/weather/WeatherAtmosphereHero';
import { GaliyatLocationCard } from '../components/weather/GaliyatLocationCard';
import { WeatherHourlyForecast } from '../components/weather/WeatherHourlyForecast';
import { WeatherDailyForecast } from '../components/weather/WeatherDailyForecast';
import { WeatherAdvisorySection } from '../components/weather/WeatherAdvisorySection';

export const WeatherUpdates: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [weatherData, setWeatherData] = useState<Record<string, LocationWeatherData>>({});
  const [selectedLocationId, setSelectedLocationId] = useState<string>('abbottabad');
  const [forecastTab, setForecastTab] = useState<'hourly' | 'daily'>('hourly');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState<boolean>(false);

  const forecastSectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Load weather data on mount
  const loadWeather = async (forceRefresh = false) => {
    if (forceRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const result = await fetchAllLocationsWeather(forceRefresh);
      setWeatherData(result.data);
      setLastUpdated(result.timestamp);
      setIsFromCache(result.isFromCache);
      if (result.error) {
        console.warn(result.error);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to meteorological services. Please verify internet connection.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWeather(false);
  }, []);

  const handleSelectLocation = (locationId: string, scrollToHero = true) => {
    setSelectedLocationId(locationId);
    if (scrollToHero && heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Selected location data for hero & detailed forecast
  const activeWeatherData = weatherData[selectedLocationId] || weatherData['abbottabad'];
  const advisoryRisks: WeatherAdvisoryRisk[] = computeAdvisoryRisks(weatherData);

  // Format last updated time in PKT
  const formattedUpdateTime = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : '';

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Header */}
      <section className="relative bg-[#000080] text-white pt-8 pb-14 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Tourism', labelUrdu: 'سیاحت', path: '/tourism/welcome-abbottabad' },
              { label: 'Weather Updates', labelUrdu: 'موسمی صورتحال' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'موسمیاتی نگرانی' : 'WEATHER MONITORING'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'موسمی صورتحال — ایبٹ آباد اور گلیات' : 'WEATHER UPDATES — ABBOTTABAD & GALIYAT'}
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'ایبٹ آباد اور گلیات کے سیاحتی مقامات میں موجودہ موسمی حالات اور ۷ روزہ پیش گوئی سے باخبر رہیں۔'
                : 'Stay informed about current weather conditions and the 7-day forecast across Abbottabad and Galiyat tourist destinations.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Stats strip */}
      <div className="bg-brand-light-bg border-b border-brand-light-border">
        <PageContainer>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-brand-light-border py-5">
            {[
              { icon: Clock, en: '24/7', ur: '24/7', sub_en: 'Live Updates', sub_ur: 'لائیو اپڈیٹس' },
              { icon: Compass, en: '6+', ur: '۶+', sub_en: 'Galiyat Stations', sub_ur: 'گلیات اسٹیشنز' },
              { icon: RefreshCw, en: 'Auto', ur: 'خودکار', sub_en: 'Auto Refresh', sub_ur: 'خودکار تازہ ترین' },
              { icon: AlertCircle, en: 'Alerts', ur: 'ہدایات', sub_en: 'Safety Advisories', sub_ur: 'حفاظتی ہدایات' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center gap-2 px-4 py-2">
                <s.icon className="w-5 h-5 text-brand-blue shrink-0" />
                <div className="text-center sm:text-left">
                  <div className="text-base font-extrabold text-brand-blue">{language === 'ur' ? s.ur : s.en}</div>
                  <div className="text-xs text-slate-500">{language === 'ur' ? s.sub_ur : s.sub_en}</div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>

      {/* =========================================================================
          MAIN CONTENT AREA (Strict hierarchy as specified)
          ========================================================================= */}
      <PageContainer className="pt-8 sm:pt-10 space-y-12 sm:space-y-16">
        {/* Action Controls: Refresh Button & Update Timestamp */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-light-border">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-6 bg-brand-blue rounded-full" />
            <div>
              <h3 className="text-lg font-bold text-brand-dark">
                {language === 'ur'
                  ? `پیش گوئی: ${activeWeatherData?.location.nameUrdu || 'ایبٹ آباد'}`
                  : `Forecast: ${activeWeatherData?.location.name || 'Abbottabad'}`}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'ur'
                  ? 'موجودہ موسمی حالات اور تفصیلی پیش گوئی۔'
                  : 'Current conditions and detailed forecast.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => loadWeather(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-60 text-white font-bold text-xs transition-all"
              aria-label="Refresh live weather data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>
                {refreshing
                  ? language === 'ur'
                    ? 'تازہ ترین کیا جا رہا ہے...'
                    : 'Refreshing...'
                  : language === 'ur'
                  ? 'موسم تازہ ترین کریں'
                  : 'Refresh Weather'}
              </span>
            </button>

            {formattedUpdateTime && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-brand-lime" />
                <span>
                  {language === 'ur' ? 'آخری ریکارڈ شدہ وقت:' : 'Last Updated:'}{' '}
                  <strong className="text-brand-dark font-semibold">{formattedUpdateTime} PKT</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="space-y-8 animate-pulse">
            <div className="h-96 bg-slate-200/80 rounded-3xl" />
            <div className="h-64 bg-slate-200/80 rounded-2xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-56 bg-slate-200/80 rounded-2xl" />
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-6 sm:p-8 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-lg font-bold text-red-900">
                {language === 'ur' ? 'موسمی ڈیٹا حاصل نہیں ہو سکا' : 'Unable to Retrieve Weather Data'}
              </h3>
              <p className="text-xs sm:text-sm text-red-700">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => loadWeather(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{language === 'ur' ? 'دوبارہ کوشش کریں' : 'Retry Connection'}</span>
            </button>
          </div>
        )}

        {/* Weather Content when loaded */}
        {!loading && Object.keys(weatherData).length > 0 && activeWeatherData && (
          <>
            {/* =====================================================================
                SECTION 1: DYNAMIC WEATHER HERO FOR CURRENTLY SELECTED LOCATION
                ===================================================================== */}
            <section ref={heroRef} aria-label="Dynamic Weather Hero" className="scroll-mt-6">
              <WeatherAtmosphereHero
                data={activeWeatherData}
                selectedLocationId={selectedLocationId}
                onSelectLocation={(id) => handleSelectLocation(id, false)}
                lastUpdatedFormatted={formattedUpdateTime}
                isFromCache={isFromCache}
              />
            </section>

            {/* =====================================================================
                SECTION 2: HOURLY AND 7-DAY FORECAST FOR SELECTED LOCATION
                ===================================================================== */}
            <section ref={forecastSectionRef} aria-labelledby="forecast-section-title" className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-6 bg-brand-blue rounded-full" />
                    <h3
                      id="forecast-section-title"
                      className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight"
                    >
                      {language === 'ur'
                        ? `پیش گوئی: ${activeWeatherData.location.nameUrdu}`
                        : `Forecast Details: ${activeWeatherData.location.name}`}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {language === 'ur'
                      ? '۲۴ گھنٹے کی گھنٹہ وار یا ۷ روزہ تفصیلی پیش گوئی منتخب کریں۔'
                      : 'Switch between 24-hour hourly progression and 7-day outlook.'}
                  </p>
                </div>

                {/* Segmented Control: Hourly vs 7-Day Forecast */}
                <div className="inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300 shrink-0">
                  <button
                    type="button"
                    onClick={() => setForecastTab('hourly')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      forecastTab === 'hourly'
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    aria-pressed={forecastTab === 'hourly'}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{language === 'ur' ? 'گھنٹہ وار (۲۴ گھنٹے)' : 'Hourly Forecast (24h)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForecastTab('daily')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      forecastTab === 'daily'
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    aria-pressed={forecastTab === 'daily'}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{language === 'ur' ? '۷ روزہ پیش گوئی' : '7-Day Forecast'}</span>
                  </button>
                </div>
              </div>

              {/* Render Selected Forecast View */}
              {forecastTab === 'hourly' ? (
                <WeatherHourlyForecast
                  items={activeWeatherData.hourly}
                  locationName={
                    language === 'ur'
                      ? activeWeatherData.location.nameUrdu
                      : activeWeatherData.location.name
                  }
                />
              ) : (
                <WeatherDailyForecast
                  items={activeWeatherData.daily}
                  locationName={
                    language === 'ur'
                      ? activeWeatherData.location.nameUrdu
                      : activeWeatherData.location.name
                  }
                />
              )}
            </section>

            {/* =====================================================================
                SECTION 3: GALIYAT WEATHER FORECAST SECTION
                (6 locations in exact order: Nathia Gali, Ayubia, Thandiani, Hernoi, Dunga Gali, Changla Gali)
                ===================================================================== */}
            <section aria-labelledby="galiyat-section-title" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-6 bg-brand-lime-hover rounded-full" />
                    <h2
                      id="galiyat-section-title"
                      className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight"
                    >
                      {language === 'ur' ? 'گلیات کے موسمی حالات' : 'Galiyat Weather Forecast'}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {language === 'ur'
                      ? 'مری-ایبٹ آباد کوریڈور کے تمام ۶ کلیدی پہاڑی مقامات کے لیے حقیقی موسمی حالات۔'
                      : 'Independent observations across all six Galiyat hill stations. Tap any station to load its dynamic hero.'}
                  </p>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-brand-blue" />
                  <span>
                    {language === 'ur'
                      ? 'کسی بھی کارڈ پر کلک کر کے تفصیلی جائزہ دیکھیں'
                      : 'Click any card to inspect its forecast'}
                  </span>
                </div>
              </div>

              {/* Exact order: Nathia Gali, Ayubia, Thandiani, Hernoi, Dunga Gali, Changla Gali */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {GALIYAT_LOCATIONS.map((location) => {
                  const locData = weatherData[location.id];
                  if (!locData) return null;
                  return (
                    <GaliyatLocationCard
                      key={location.id}
                      data={locData}
                      isSelected={selectedLocationId === location.id}
                      onSelect={() => handleSelectLocation(location.id, true)}
                    />
                  );
                })}
              </div>
            </section>

            {/* =====================================================================
                SECTION 4: WEATHER & TRAFFIC SAFETY ADVISORIES
                ===================================================================== */}
            <section aria-labelledby="advisory-section-title" className="space-y-4 pt-4 pb-12 sm:pb-16">
              <WeatherAdvisorySection risks={advisoryRisks} />
            </section>
          </>
        )}
      </PageContainer>
    </div>
  );
};

export default WeatherUpdates;
