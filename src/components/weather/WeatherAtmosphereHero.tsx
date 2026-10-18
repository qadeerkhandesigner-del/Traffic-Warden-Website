import React, { useState } from 'react';
import {
  Wind,
  Droplets,
  Eye,
  CloudRain,
  Clock,
  Compass,
  ArrowUp,
  ArrowDown,
  Mountain,
  Snowflake,
  Sparkles,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import type { LocationWeatherData, WeatherAtmosphere } from '../../types/weather';
import { getWeatherConditionMeta, getWeatherAtmosphere } from '../../services/weatherService';
import { WeatherIcon } from './WeatherIcon';
import { ALL_WEATHER_LOCATIONS } from '../../data/weatherLocations';
import { useLanguage } from '../../hooks/useLanguage';

interface WeatherAtmosphereHeroProps {
  data: LocationWeatherData;
  selectedLocationId: string;
  onSelectLocation: (id: string) => void;
  lastUpdatedFormatted?: string;
  isFromCache?: boolean;
}

export const WeatherAtmosphereHero: React.FC<WeatherAtmosphereHeroProps> = ({
  data,
  selectedLocationId,
  onSelectLocation,
  lastUpdatedFormatted,
  isFromCache,
}) => {
  const { language } = useLanguage();
  const current = data.current;
  const meta = getWeatherConditionMeta(current.weatherCode);

  // Controlled test simulator state for checking conditions (defaults to 'auto' for real live API data)
  const [simulatedAtmosphere, setSimulatedAtmosphere] = useState<'auto' | WeatherAtmosphere>('auto');
  const [showSimControls, setShowSimControls] = useState<boolean>(false);

  // Active atmospheric theme (real API unless simulator active)
  const realAtmosphere = getWeatherAtmosphere(
    current.weatherCode,
    current.isDay,
    current.snowfall,
    current.precipitation
  );
  const activeAtmosphere: WeatherAtmosphere =
    simulatedAtmosphere === 'auto' ? realAtmosphere : simulatedAtmosphere;

  // Visual gradients and themes per condition
  const getAtmosphereTheme = (atm: WeatherAtmosphere) => {
    switch (atm) {
      case 'sunny':
        return {
          bgGradient: 'bg-gradient-to-br from-[#1b5cb8] via-[#2573d4] to-[#17468a]',
          bannerBg: 'bg-[#133c75]/80 border-[#2a68bb]',
          cardGlass: 'bg-[#0f2d59]/40 border-white/15',
          accentText: 'text-amber-300',
          badgeBg: 'bg-amber-400/20 text-amber-200 border-amber-300/30',
        };
      case 'clear-night':
        return {
          bgGradient: 'bg-gradient-to-br from-[#060e1f] via-[#0d1d3d] to-[#040914]',
          bannerBg: 'bg-[#081329]/90 border-[#1a2d54]',
          cardGlass: 'bg-[#0a1836]/40 border-white/10',
          accentText: 'text-indigo-200',
          badgeBg: 'bg-indigo-400/20 text-indigo-200 border-indigo-400/30',
        };
      case 'partly-cloudy-day':
        return {
          bgGradient: 'bg-gradient-to-br from-[#1d4b85] via-[#2a5d9e] to-[#163863]',
          bannerBg: 'bg-[#143257]/80 border-[#2b5991]',
          cardGlass: 'bg-[#0f2744]/40 border-white/15',
          accentText: 'text-sky-200',
          badgeBg: 'bg-sky-400/20 text-sky-200 border-sky-400/30',
        };
      case 'partly-cloudy-night':
        return {
          bgGradient: 'bg-gradient-to-br from-[#091326] via-[#112344] to-[#060d1b]',
          bannerBg: 'bg-[#0b172e]/90 border-[#1c3057]',
          cardGlass: 'bg-[#0d1c3a]/40 border-white/10',
          accentText: 'text-indigo-200',
          badgeBg: 'bg-indigo-400/20 text-indigo-200 border-indigo-400/30',
        };
      case 'overcast':
        return {
          bgGradient: 'bg-gradient-to-br from-[#1e2e42] via-[#2c3f56] to-[#172435]',
          bannerBg: 'bg-[#152130]/90 border-[#2d415a]',
          cardGlass: 'bg-[#131d2b]/45 border-white/15',
          accentText: 'text-slate-200',
          badgeBg: 'bg-slate-400/20 text-slate-200 border-slate-400/30',
        };
      case 'rain':
        return {
          bgGradient: 'bg-gradient-to-br from-[#10233b] via-[#1a3556] to-[#0b192b]',
          bannerBg: 'bg-[#0d1c30]/90 border-[#224063]',
          cardGlass: 'bg-[#0b1726]/50 border-white/15',
          accentText: 'text-cyan-200',
          badgeBg: 'bg-cyan-400/20 text-cyan-200 border-cyan-400/30',
        };
      case 'rain-night':
        return {
          bgGradient: 'bg-gradient-to-br from-[#071324] via-[#0d2038] to-[#040b17]',
          bannerBg: 'bg-[#071321]/90 border-[#162e4f]',
          cardGlass: 'bg-[#05101f]/50 border-white/10',
          accentText: 'text-cyan-200',
          badgeBg: 'bg-cyan-400/20 text-cyan-200 border-cyan-400/30',
        };
      case 'fog':
        return {
          bgGradient: 'bg-gradient-to-br from-[#243342] via-[#334657] to-[#1c2834]',
          bannerBg: 'bg-[#19242f]/90 border-[#384b5c]',
          cardGlass: 'bg-[#17212b]/50 border-white/15',
          accentText: 'text-slate-200',
          badgeBg: 'bg-slate-300/20 text-slate-200 border-slate-300/30',
        };
      case 'snow':
        return {
          bgGradient: 'bg-gradient-to-br from-[#152c47] via-[#224369] to-[#102236]',
          bannerBg: 'bg-[#102033]/90 border-[#2c517c]',
          cardGlass: 'bg-[#0d1b2b]/50 border-white/20',
          accentText: 'text-cyan-100',
          badgeBg: 'bg-cyan-300/20 text-cyan-100 border-cyan-300/40',
        };
      case 'thunderstorm':
        return {
          bgGradient: 'bg-gradient-to-br from-[#0a1222] via-[#141f36] to-[#060a14]',
          bannerBg: 'bg-[#080e1b]/95 border-[#1d2b49]',
          cardGlass: 'bg-[#070e1c]/50 border-white/15',
          accentText: 'text-amber-300',
          badgeBg: 'bg-amber-400/20 text-amber-200 border-amber-400/40',
        };
    }
  };

  const theme = getAtmosphereTheme(activeAtmosphere);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${theme.bgGradient} text-white shadow-2xl transition-all duration-700 border border-white/20`}
    >
      {/* =========================================================================
          ATMOSPHERIC ANIMATED BACKGROUND LAYERS (Data-reactive, pointer-events-none)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Thunderstorm Flash */}
        {activeAtmosphere === 'thunderstorm' && (
          <div className="absolute inset-0 bg-indigo-200/20 animate-thunder-flash" />
        )}

        {/* Sunny Glow & Rays */}
        {activeAtmosphere === 'sunny' && (
          <>
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-300/25 blur-3xl animate-sun-glow" />
            <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-yellow-200/15 blur-2xl" />
            {/* Soft atmospheric angled light beam */}
            <div className="absolute top-0 right-10 w-48 h-full bg-gradient-to-b from-white/10 via-amber-200/5 to-transparent rotate-12 transform origin-top-right blur-xl opacity-70" />
          </>
        )}

        {/* Clear Night Stars & Moon Glow */}
        {(activeAtmosphere === 'clear-night' || activeAtmosphere === 'partly-cloudy-night') && (
          <>
            <div className="absolute top-6 right-16 w-40 h-40 rounded-full bg-indigo-300/15 blur-2xl animate-sun-glow" />
            {/* Twinkling star field */}
            {[
              { top: '15%', left: '12%', delay: '0s', size: 'w-1 h-1' },
              { top: '25%', left: '35%', delay: '1s', size: 'w-1.5 h-1.5' },
              { top: '10%', left: '70%', delay: '0.5s', size: 'w-1 h-1' },
              { top: '45%', left: '85%', delay: '1.8s', size: 'w-1.5 h-1.5' },
              { top: '65%', left: '20%', delay: '2.2s', size: 'w-1 h-1' },
              { top: '80%', left: '60%', delay: '1.4s', size: 'w-1 h-1' },
              { top: '30%', left: '55%', delay: '0.8s', size: 'w-1 h-1' },
              { top: '75%', left: '88%', delay: '2.5s', size: 'w-1 h-1' },
            ].map((star, i) => (
              <div
                key={i}
                className={`absolute rounded-full bg-white animate-star-twinkle ${star.size}`}
                style={{ top: star.top, left: star.left, animationDelay: star.delay }}
              />
            ))}
          </>
        )}

        {/* Rain Streaks (Rain, Rain-Night, Thunderstorm) */}
        {(activeAtmosphere === 'rain' || activeAtmosphere === 'rain-night' || activeAtmosphere === 'thunderstorm') && (
          <div className="absolute inset-0">
            {/* Multiple animated raindrop streaks */}
            {[
              { left: '8%', height: '28px', delay: '0s', duration: '0.9s' },
              { left: '18%', height: '36px', delay: '0.2s', duration: '1.1s' },
              { left: '28%', height: '24px', delay: '0.5s', duration: '0.8s' },
              { left: '38%', height: '32px', delay: '0.1s', duration: '1.0s' },
              { left: '48%', height: '30px', delay: '0.6s', duration: '1.2s' },
              { left: '58%', height: '26px', delay: '0.3s', duration: '0.9s' },
              { left: '68%', height: '34px', delay: '0.7s', duration: '1.0s' },
              { left: '78%', height: '28px', delay: '0.15s', duration: '0.85s' },
              { left: '88%', height: '32px', delay: '0.45s', duration: '1.15s' },
              { left: '95%', height: '25px', delay: '0.25s', duration: '0.95s' },
            ].map((drop, i) => (
              <div
                key={i}
                className="absolute w-[1.5px] rounded-full bg-gradient-to-b from-transparent via-cyan-200/70 to-white/90 animate-rain"
                style={{
                  left: drop.left,
                  height: drop.height,
                  animationDelay: drop.delay,
                  animationDuration: drop.duration,
                  top: '-40px',
                }}
              />
            ))}
            {/* Atmospheric ground mist reflection */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-cyan-950/40 via-cyan-900/10 to-transparent blur-md" />
          </div>
        )}

        {/* Snowflakes (Snow condition) */}
        {activeAtmosphere === 'snow' && (
          <div className="absolute inset-0">
            {[
              { left: '10%', size: 'w-2 h-2', delay: '0s', duration: '4s' },
              { left: '22%', size: 'w-1.5 h-1.5', delay: '1.2s', duration: '5s' },
              { left: '35%', size: 'w-2.5 h-2.5', delay: '0.5s', duration: '4.2s' },
              { left: '48%', size: 'w-1.5 h-1.5', delay: '2s', duration: '4.8s' },
              { left: '60%', size: 'w-2 h-2', delay: '1s', duration: '3.8s' },
              { left: '74%', size: 'w-2.5 h-2.5', delay: '2.5s', duration: '5.2s' },
              { left: '86%', size: 'w-1.5 h-1.5', delay: '0.8s', duration: '4.5s' },
              { left: '94%', size: 'w-2 h-2', delay: '1.8s', duration: '4.1s' },
            ].map((flake, i) => (
              <div
                key={i}
                className={`absolute rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)] animate-snow ${flake.size}`}
                style={{
                  left: flake.left,
                  animationDelay: flake.delay,
                  animationDuration: flake.duration,
                  top: '-20px',
                }}
              />
            ))}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-blue-950/40 via-blue-900/10 to-transparent blur-md" />
          </div>
        )}

        {/* Cloudy / Overcast / Partly Cloudy Drifts */}
        {(activeAtmosphere === 'overcast' ||
          activeAtmosphere === 'partly-cloudy-day' ||
          activeAtmosphere === 'partly-cloudy-night') && (
          <>
            <div className="absolute -top-10 left-10 w-96 h-40 rounded-full bg-white/10 blur-3xl animate-cloud-float" />
            <div
              className="absolute top-16 right-10 w-[420px] h-48 rounded-full bg-slate-300/10 blur-3xl animate-cloud-float"
              style={{ animationDelay: '4s' }}
            />
          </>
        )}

        {/* Fog / Mist Layers */}
        {activeAtmosphere === 'fog' && (
          <>
            <div className="absolute inset-x-0 top-1/4 h-36 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-2xl animate-mist" />
            <div
              className="absolute inset-x-0 top-1/2 h-44 bg-gradient-to-r from-transparent via-slate-200/20 to-transparent blur-3xl animate-mist"
              style={{ animationDelay: '3s' }}
            />
          </>
        )}

        {/* Subtle official watermark crest */}
        <div className="absolute -bottom-16 -right-16 w-80 h-80 opacity-5 pointer-events-none rounded-full bg-white/20 blur-xl" />
      </div>

      {/* =========================================================================
          HERO TOP BAR: Station Selector Pills & Freshness Timestamp
          ========================================================================= */}
      <div className={`px-5 sm:px-7 py-3.5 border-b backdrop-blur-md flex flex-wrap items-center justify-between gap-3 ${theme.bannerBg}`}>
        {/* Monitored Locations Quick Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5" style={{ scrollbarWidth: 'none' }}>
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/70 mr-1 shrink-0 flex items-center gap-1">
            <Mountain className="w-3.5 h-3.5 text-brand-lime" />
            {language === 'ur' ? 'مقام منتخب کریں:' : 'Station:'}
          </span>
          {ALL_WEATHER_LOCATIONS.map((loc) => {
            const isStationActive = selectedLocationId === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => onSelectLocation(loc.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime ${
                  isStationActive
                    ? 'bg-brand-lime text-brand-dark shadow-md scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
                aria-pressed={isStationActive}
              >
                {isStationActive && <Check className="w-3 h-3 stroke-[3]" />}
                <span>{language === 'ur' ? loc.nameUrdu : loc.name}</span>
              </button>
            );
          })}
        </div>

        {/* Freshness Badge & Simulator toggle */}
        <div className="flex items-center gap-3 text-xs text-white/80 shrink-0 ml-auto">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-lime" />
            <span>
              {language === 'ur' ? 'ریکارڈ شدہ:' : 'Observed:'}{' '}
              <strong className="text-white font-semibold">
                {lastUpdatedFormatted ||
                  new Date(data.fetchedAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                PKT
              </strong>
            </span>
          </div>

          {isFromCache && (
            <span className="text-[10px] bg-white/15 text-brand-lime-light px-2 py-0.5 rounded-full font-semibold border border-white/20">
              {language === 'ur' ? 'کیش شدہ' : 'Cached'}
            </span>
          )}

          {/* Atmospheric Testing Trigger */}
          <button
            type="button"
            onClick={() => setShowSimControls((p) => !p)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            title="Inspect atmosphere states"
            aria-label="Toggle atmospheric simulator"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-lime" />
          </button>
        </div>
      </div>

      {/* Simulator Strip (collapsible, for verifying states required by prompt) */}
      {showSimControls && (
        <div className="bg-black/60 backdrop-blur-md px-5 py-2.5 border-b border-white/20 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-brand-lime font-bold">Atmosphere Preview:</span>
          {(
            [
              ['auto', 'Live Data'],
              ['sunny', 'Sunny Day'],
              ['clear-night', 'Clear Night'],
              ['rain', 'Rain / Showers'],
              ['overcast', 'Overcast Cloud'],
              ['fog', 'Mountain Fog'],
              ['snow', 'Alpine Snow'],
              ['thunderstorm', 'Thunderstorm'],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setSimulatedAtmosphere(val)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                simulatedAtmosphere === val
                  ? 'bg-brand-lime text-brand-dark font-bold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* =========================================================================
          HERO MAIN CONTENT: Commanding Temperature, Condition & Supporting Metrics
          ========================================================================= */}
      <div className="relative z-10 p-5 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Location Identity & Prominent Temperature */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/25">
                  <Mountain className="w-3.5 h-3.5 text-brand-lime" />
                  <span>{data.location.elevationMeters}m ASL</span>
                </span>

                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${theme.badgeBg}`}>
                  <Sparkles className="w-3 h-3" />
                  <span>{language === 'ur' ? meta.labelUrdu : meta.label}</span>
                </span>

                {current.snowfall > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-200 border border-cyan-300/30">
                    <Snowflake className="w-3 h-3" />
                    <span>{current.snowfall} cm snow</span>
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-sm">
                {language === 'ur' ? data.location.nameUrdu : data.location.name}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-md font-medium">
                {language === 'ur' ? data.location.descriptionUrdu : data.location.description}
              </p>
            </div>

            {/* Commanding Hero Temperature Display */}
            <div className="flex items-center gap-5 pt-1">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
                <WeatherIcon weatherCode={current.weatherCode} className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>

              <div>
                <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none flex items-start">
                  <span>{current.temperature}</span>
                  <span className="text-3xl sm:text-4xl font-light text-white/70 ml-1">°C</span>
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs sm:text-sm text-white/90 font-medium">
                  <span>
                    {language === 'ur' ? 'محسوس درجہ حرارت:' : 'Feels like:'}{' '}
                    <strong className="text-white font-bold">{current.feelsLike}°C</strong>
                  </span>
                  <div className="flex items-center gap-2 pl-2 border-l border-white/25">
                    <span className="inline-flex items-center text-rose-300 font-bold">
                      <ArrowUp className="w-3.5 h-3.5 mr-0.5" />
                      {current.tempMaxToday}°
                    </span>
                    <span className="inline-flex items-center text-sky-300 font-bold">
                      <ArrowDown className="w-3.5 h-3.5 mr-0.5" />
                      {current.tempMinToday}°
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Meteorological Supporting Metrics Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Humidity */}
              <div className={`p-4 rounded-2xl border backdrop-blur-md ${theme.cardGlass} transition-all hover:bg-white/15`}>
                <div className="flex items-center gap-2 text-white/75 text-xs font-semibold mb-1">
                  <Droplets className="w-4 h-4 text-sky-300" />
                  <span>{language === 'ur' ? 'ہوا میں نمی' : 'Humidity'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {current.relativeHumidity}%
                </div>
                <div className="text-[11px] text-white/70 mt-1">
                  {current.relativeHumidity >= 75
                    ? language === 'ur' ? 'زیادہ نمی' : 'High moisture'
                    : language === 'ur' ? 'معتدل' : 'Normal range'}
                </div>
              </div>

              {/* Wind Speed & Compass Direction */}
              <div className={`p-4 rounded-2xl border backdrop-blur-md ${theme.cardGlass} transition-all hover:bg-white/15`}>
                <div className="flex items-center gap-2 text-white/75 text-xs font-semibold mb-1">
                  <Wind className="w-4 h-4 text-emerald-300" />
                  <span>{language === 'ur' ? 'ہوا کی رفتار' : 'Wind Speed'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {current.windSpeed}{' '}
                  <span className="text-xs font-normal text-white/70">km/h</span>
                </div>
                <div className="text-[11px] text-white/70 mt-1 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-white/60" />
                  <span>{current.windDirection}° Azimuth</span>
                </div>
              </div>

              {/* Atmospheric Visibility */}
              <div className={`p-4 rounded-2xl border backdrop-blur-md ${theme.cardGlass} transition-all hover:bg-white/15`}>
                <div className="flex items-center gap-2 text-white/75 text-xs font-semibold mb-1">
                  <Eye className="w-4 h-4 text-indigo-300" />
                  <span>{language === 'ur' ? 'حد نگاہ' : 'Visibility'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {current.visibilityKm}{' '}
                  <span className="text-xs font-normal text-white/70">km</span>
                </div>
                <div className="text-[11px] text-white/70 mt-1">
                  {current.visibilityKm >= 7
                    ? language === 'ur' ? 'واضح بصارت' : 'Clear horizon'
                    : language === 'ur' ? 'محدود بصارت' : 'Restricted'}
                </div>
              </div>

              {/* Rain Probability / Precip Volume */}
              <div className={`p-4 rounded-2xl border backdrop-blur-md ${theme.cardGlass} transition-all hover:bg-white/15`}>
                <div className="flex items-center gap-2 text-white/75 text-xs font-semibold mb-1">
                  <CloudRain className="w-4 h-4 text-cyan-300" />
                  <span>{language === 'ur' ? 'بارش امکان' : 'Rain Prob'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {current.precipitationProbabilityToday}%
                </div>
                <div className="text-[11px] text-white/70 mt-1">
                  {current.precipitation > 0 ? `${current.precipitation} mm` : language === 'ur' ? 'بارش نہیں' : '0.0 mm'}
                </div>
              </div>
            </div>

            {/* Station Travel Caution Context */}
            <div className="mt-4 p-3.5 rounded-xl bg-black/25 backdrop-blur-md border border-white/15 flex items-start gap-2.5">
              <span className="text-brand-lime font-bold text-xs uppercase tracking-wide shrink-0">
                {language === 'ur' ? 'سفری ہدایت:' : 'Travel Caution:'}
              </span>
              <p className="text-xs text-white/90 leading-relaxed">
                {language === 'ur'
                  ? data.location.travelCautionContextUrdu
                  : data.location.travelCautionContext}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
