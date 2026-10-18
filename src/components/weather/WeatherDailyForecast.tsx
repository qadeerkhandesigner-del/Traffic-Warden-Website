import React from 'react';
import {
  Calendar,
  CloudRain,
  Snowflake,
  Wind,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import type { DailyForecastItem } from '../../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { getWeatherConditionMeta } from '../../services/weatherService';
import { useLanguage } from '../../hooks/useLanguage';

interface WeatherDailyForecastProps {
  items: DailyForecastItem[];
  locationName: string;
}

export const WeatherDailyForecast: React.FC<WeatherDailyForecastProps> = ({
  items,
  locationName,
}) => {
  const { language } = useLanguage();

  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        {language === 'ur' ? '۷ روزہ پیش گوئی فی الوقت دستیاب نہیں ہے۔' : '7-Day forecast data is currently unavailable.'}
      </div>
    );
  }

  // Calculate min and max across all days to render relative temperature bars
  const allMins = items.map((i) => i.tempMin);
  const allMaxs = items.map((i) => i.tempMax);
  const minTempAll = Math.min(...allMins);
  const maxTempAll = Math.max(...allMaxs);
  const range = Math.max(1, maxTempAll - minTempAll);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-blue" />
          <h4 className="text-sm sm:text-base font-bold text-brand-dark">
            {language === 'ur'
              ? `${locationName} — آئندہ ۷ دن کی باضابطہ پیش گوئی`
              : `7-Day Outlook: ${locationName}`}
          </h4>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
          {language === 'ur' ? 'روزانہ موسمی تجزیہ' : '7-Day Meteorological Horizon'}
        </span>
      </div>

      {/* 7-Day Compact Visual List */}
      <div className="divide-y divide-slate-100">
        {items.map((item, index) => {
          const meta = getWeatherConditionMeta(item.weatherCode);
          const isToday = index === 0;

          // Bar offset and width percentage
          const barLeftPct = Math.max(0, Math.min(100, ((item.tempMin - minTempAll) / range) * 100));
          const barRightPct = Math.max(0, Math.min(100, ((item.tempMax - minTempAll) / range) * 100));
          const barWidthPct = Math.max(12, barRightPct - barLeftPct);

          const hasSnow = item.snowfallSum > 0;
          const hasHeavyRain = item.precipitationProbabilityMax >= 65 || item.precipitationSum >= 10;

          return (
            <div
              key={item.date}
              className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 transition-colors ${
                isToday
                  ? 'bg-gradient-to-r from-brand-blue-50/60 via-brand-blue-50/20 to-transparent border-l-4 border-l-brand-blue'
                  : hasSnow
                  ? 'bg-gradient-to-r from-cyan-50/40 to-transparent hover:bg-slate-50/80'
                  : hasHeavyRain
                  ? 'bg-gradient-to-r from-blue-50/40 to-transparent hover:bg-slate-50/80'
                  : 'hover:bg-slate-50/80'
              }`}
            >
              {/* Day & Date info */}
              <div className="flex items-center gap-3 min-w-[180px]">
                <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100 shrink-0">
                  <WeatherIcon weatherCode={item.weatherCode} className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm sm:text-base text-brand-dark">
                      {language === 'ur' ? item.dayLabelUrdu : item.dayLabel}
                    </span>
                    {isToday && (
                      <span className="text-[10px] font-black uppercase bg-brand-blue text-white px-2 py-0.5 rounded-full shadow-xs">
                        {language === 'ur' ? 'آج' : 'Today'}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {item.formattedDate}
                  </div>
                </div>
              </div>

              {/* Condition Summary */}
              <div className="min-w-[150px] text-xs font-semibold text-slate-700 flex items-center gap-2">
                <span>{language === 'ur' ? meta.labelUrdu : meta.label}</span>
                {hasSnow && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full border border-cyan-200">
                    <Snowflake className="w-3 h-3 text-cyan-600" />
                    <span>{item.snowfallSum} cm</span>
                  </span>
                )}
              </div>

              {/* Precipitation & Wind badges */}
              <div className="flex items-center gap-3 text-xs min-w-[160px]">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                  item.precipitationProbabilityMax >= 50
                    ? 'bg-blue-50 text-blue-700 border-blue-200 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                  <span>{item.precipitationProbabilityMax}%</span>
                  {item.precipitationSum > 0 && (
                    <span className="text-[10px] text-slate-400">({item.precipitationSum}mm)</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200">
                  <Wind className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-semibold">{item.windSpeedMax} <span className="text-[10px] font-normal">km/h</span></span>
                </div>
              </div>

              {/* Temperature Bar & Min/Max values */}
              <div className="flex items-center gap-3 min-w-[210px] justify-end">
                <span className="text-xs font-bold text-blue-600 flex items-center min-w-[38px]">
                  <ArrowDown className="w-3 h-3 mr-0.5" />
                  {item.tempMin}°
                </span>

                {/* Visual temperature spectrum bar */}
                <div className="w-24 sm:w-28 h-2 bg-slate-100 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 bg-gradient-to-r from-blue-400 via-amber-400 to-rose-500 rounded-full"
                    style={{
                      left: `${barLeftPct}%`,
                      width: `${barWidthPct}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-black text-slate-900 flex items-center min-w-[42px]">
                  <ArrowUp className="w-3 h-3 text-rose-500 mr-0.5" />
                  {item.tempMax}°C
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
