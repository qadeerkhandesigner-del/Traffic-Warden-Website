import React, { useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  Eye,
  Wind,
  CloudRain,
  Clock,
  Sun,
  Moon,
} from 'lucide-react';
import type { HourlyForecastItem } from '../../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { getWeatherConditionMeta } from '../../services/weatherService';
import { useLanguage } from '../../hooks/useLanguage';

interface WeatherHourlyForecastProps {
  items: HourlyForecastItem[];
  locationName: string;
}

export const WeatherHourlyForecast: React.FC<WeatherHourlyForecastProps> = ({
  items,
  locationName,
}) => {
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        {language === 'ur' ? 'گھنٹہ وار پیش گوئی فی الوقت دستیاب نہیں ہے۔' : 'Hourly forecast data is currently unavailable.'}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
      {/* Header with Navigation Arrows & Timezone notice */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-blue" />
          <h4 className="text-sm sm:text-base font-bold text-brand-dark">
            {language === 'ur'
              ? `${locationName} — اگلے ۲۴ گھنٹوں کی تفصیلی پیش گوئی`
              : `24-Hour Timeline: ${locationName}`}
          </h4>
          <span className="text-[11px] font-semibold bg-brand-blue-50 text-brand-blue px-2 py-0.5 rounded-full border border-brand-blue-100">
            PKT (UTC+5)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:inline">
            {language === 'ur' ? 'دن / رات کی علامت دیکھیں' : 'Scroll timeline'}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-label="Scroll hourly forecast left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-label="Scroll hourly forecast right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Touch-Friendly Horizontal Scroll Strip */}
      <div
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label="24-Hour Hourly Weather Scroll Strip"
        className="flex items-stretch overflow-x-auto p-4 sm:p-6 gap-3 sm:gap-4 scroll-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue select-none"
        style={{ scrollbarWidth: 'thin' }}
      >
        {items.map((item, index) => {
          const meta = getWeatherConditionMeta(item.weatherCode);
          const isFirst = index === 0;
          const isNight = item.isDay === 0;

          return (
            <div
              key={item.time}
              className={`flex-none w-[135px] sm:w-[150px] flex flex-col justify-between rounded-2xl p-3.5 sm:p-4 border transition-all text-center relative overflow-hidden ${
                isFirst
                  ? 'bg-gradient-to-b from-brand-blue-50 to-white border-brand-blue-300 ring-2 ring-brand-blue/20 shadow-sm'
                  : isNight
                  ? 'bg-gradient-to-b from-slate-900/[0.04] to-slate-50 border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
                  : 'bg-gradient-to-b from-amber-500/[0.03] to-white border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Day / Night subtle indicator top icon */}
              <div className="absolute top-2.5 right-2.5 text-slate-400">
                {isNight ? (
                  <Moon className="w-3 h-3 text-indigo-400" />
                ) : (
                  <Sun className="w-3 h-3 text-amber-400" />
                )}
              </div>

              {/* Time Label */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {isFirst ? (
                    <span className="text-brand-blue font-extrabold">
                      {language === 'ur' ? 'ابھی' : 'Now'}
                    </span>
                  ) : (
                    item.formattedDate
                  )}
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-brand-dark mt-0.5">
                  {item.formattedTime}
                </div>
              </div>

              {/* Weather Icon & Temperature */}
              <div className="my-3 py-1 flex flex-col items-center">
                <WeatherIcon weatherCode={item.weatherCode} className="w-9 h-9 sm:w-10 sm:h-10 mb-1" />
                <div className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight">
                  {item.temperature}°<span className="text-xs font-semibold text-slate-400">C</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-600 line-clamp-1 mt-0.5">
                  {language === 'ur' ? meta.labelUrdu : meta.label}
                </div>
              </div>

              {/* Supporting Metrics: Rain%, Wind, Humidity, Visibility */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
                {/* Rain Probability */}
                <div className="flex items-center justify-between gap-1">
                  <span className="flex items-center gap-1 text-slate-500">
                    <CloudRain className="w-3 h-3 text-blue-500" />
                    <span>{language === 'ur' ? 'امکان' : 'Rain'}</span>
                  </span>
                  <span className={`font-bold ${item.precipitationProbability >= 40 ? 'text-blue-600' : 'text-slate-800'}`}>
                    {item.precipitationProbability}%
                  </span>
                </div>

                {/* Wind */}
                <div className="flex items-center justify-between gap-1">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Wind className="w-3 h-3 text-emerald-500" />
                    <span>{language === 'ur' ? 'ہوا' : 'Wind'}</span>
                  </span>
                  <span className="font-semibold text-slate-800">
                    {item.windSpeed} <span className="text-[9px]">km/h</span>
                  </span>
                </div>

                {/* Humidity */}
                <div className="flex items-center justify-between gap-1">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Droplets className="w-3 h-3 text-sky-500" />
                    <span>{language === 'ur' ? 'نمی' : 'Hum'}</span>
                  </span>
                  <span className="font-semibold text-slate-800">
                    {item.relativeHumidity}%
                  </span>
                </div>

                {/* Visibility */}
                <div className="flex items-center justify-between gap-1">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Eye className="w-3 h-3 text-indigo-500" />
                    <span>{language === 'ur' ? 'بصارت' : 'Vis'}</span>
                  </span>
                  <span className="font-semibold text-slate-800">
                    {item.visibilityKm} <span className="text-[9px]">km</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
