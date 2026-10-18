import React from 'react';
import {
  Wind,
  CloudRain,
  ArrowUp,
  ArrowDown,
  Mountain,
  ChevronRight,
  Check,
  Snowflake,
} from 'lucide-react';
import type { LocationWeatherData } from '../../types/weather';
import { getWeatherConditionMeta, getWeatherAtmosphere } from '../../services/weatherService';
import { WeatherIcon } from './WeatherIcon';
import { useLanguage } from '../../hooks/useLanguage';
import { cn } from '../../lib/utils';

interface GaliyatLocationCardProps {
  data: LocationWeatherData;
  isSelected: boolean;
  onSelect: () => void;
}

export const GaliyatLocationCard: React.FC<GaliyatLocationCardProps> = ({
  data,
  isSelected,
  onSelect,
}) => {
  const { language } = useLanguage();
  const current = data.current;
  const meta = getWeatherConditionMeta(current.weatherCode);
  const atmosphere = getWeatherAtmosphere(
    current.weatherCode,
    current.isDay,
    current.snowfall,
    current.precipitation
  );

  // Subtle condition-themed tinting for visual richness
  const getConditionAccent = () => {
    switch (atmosphere) {
      case 'rain':
      case 'rain-night':
        return {
          headerBg: 'bg-gradient-to-r from-blue-900/10 via-sky-900/5 to-slate-900/5 border-b-blue-100',
          badgeText: 'text-blue-700 bg-blue-50 border-blue-200',
        };
      case 'snow':
        return {
          headerBg: 'bg-gradient-to-r from-cyan-900/10 via-sky-900/5 to-slate-900/5 border-b-cyan-100',
          badgeText: 'text-cyan-700 bg-cyan-50 border-cyan-200',
        };
      case 'fog':
        return {
          headerBg: 'bg-gradient-to-r from-slate-800/10 via-slate-700/5 to-slate-900/5 border-b-slate-200',
          badgeText: 'text-slate-700 bg-slate-100 border-slate-300',
        };
      case 'thunderstorm':
        return {
          headerBg: 'bg-gradient-to-r from-amber-900/10 via-indigo-900/5 to-slate-900/5 border-b-amber-100',
          badgeText: 'text-amber-700 bg-amber-50 border-amber-200',
        };
      case 'sunny':
        return {
          headerBg: 'bg-gradient-to-r from-amber-500/10 via-blue-500/5 to-transparent border-b-amber-100',
          badgeText: 'text-amber-700 bg-amber-50 border-amber-200',
        };
      default:
        return {
          headerBg: 'bg-gradient-to-r from-slate-100 via-slate-50 to-white border-b-slate-100',
          badgeText: 'text-slate-700 bg-slate-50 border-slate-200',
        };
    }
  };

  const accent = getConditionAccent();

  return (
    <div
      onClick={onSelect}
      className={cn(
        'group cursor-pointer flex flex-col justify-between rounded-2xl bg-white border shadow-gov transition-all duration-200 overflow-hidden',
        isSelected
          ? 'border-brand-blue ring-2 ring-brand-blue/30 shadow-gov-md -translate-y-1'
          : 'border-slate-200/90 hover:border-brand-blue-300 hover:shadow-gov-md hover:-translate-y-1'
      )}
    >
      {/* Card Header with Elevation, Condition and Location Name */}
      <div className={`p-4 sm:p-5 border-b flex items-start justify-between gap-3 ${accent.headerBg}`}>
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            <Mountain className="w-3.5 h-3.5 text-brand-blue" />
            <span>{data.location.elevationMeters}m ASL</span>
            {current.snowfall > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] bg-cyan-100 text-cyan-800 px-1.5 py-0.2 rounded font-bold">
                <Snowflake className="w-2.5 h-2.5" />
                {language === 'ur' ? 'برف' : 'Snow'}
              </span>
            )}
          </div>
          <h4 className="text-lg font-extrabold text-brand-dark group-hover:text-brand-blue transition-colors">
            {language === 'ur' ? data.location.nameUrdu : data.location.name}
          </h4>
        </div>

        {isSelected ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-dark bg-brand-lime px-2.5 py-1 rounded-full shadow-sm">
            <Check className="w-3 h-3 stroke-[3]" />
            {language === 'ur' ? 'منتخب' : 'Active'}
          </span>
        ) : (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${accent.badgeText}`}>
            {language === 'ur' ? meta.labelUrdu : meta.label}
          </span>
        )}
      </div>

      {/* Main Temp & Weather Condition */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              {current.temperature}°
              <span className="text-xl font-semibold text-slate-400">C</span>
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-1">
              {language === 'ur' ? meta.labelUrdu : meta.label}
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
            <WeatherIcon weatherCode={current.weatherCode} className="w-10 h-10" />
          </div>
        </div>

        {/* Supporting Metrics: Min/Max, Rain%, Wind */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
          {/* Min / Max */}
          <div className="bg-slate-50/80 rounded-xl p-2 text-center border border-slate-100/60">
            <span className="block text-[10px] text-slate-500 font-medium">
              {language === 'ur' ? 'کم / زیادہ' : 'Min / Max'}
            </span>
            <div className="font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
              <span className="text-blue-600 flex items-center">
                <ArrowDown className="w-2.5 h-2.5" />
                {current.tempMinToday}°
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-rose-600 flex items-center">
                <ArrowUp className="w-2.5 h-2.5" />
                {current.tempMaxToday}°
              </span>
            </div>
          </div>

          {/* Rain Probability */}
          <div className="bg-slate-50/80 rounded-xl p-2 text-center border border-slate-100/60">
            <span className="block text-[10px] text-slate-500 font-medium flex items-center justify-center gap-0.5">
              <CloudRain className="w-2.5 h-2.5 text-blue-500" />
              <span>{language === 'ur' ? 'بارش' : 'Rain'}</span>
            </span>
            <div className="font-bold text-slate-800 mt-0.5">
              {current.precipitationProbabilityToday}%
            </div>
          </div>

          {/* Wind Speed */}
          <div className="bg-slate-50/80 rounded-xl p-2 text-center border border-slate-100/60">
            <span className="block text-[10px] text-slate-500 font-medium flex items-center justify-center gap-0.5">
              <Wind className="w-2.5 h-2.5 text-emerald-500" />
              <span>{language === 'ur' ? 'ہوا' : 'Wind'}</span>
            </span>
            <div className="font-bold text-slate-800 mt-0.5">
              {current.windSpeed}{' '}
              <span className="text-[10px] font-normal text-slate-500">km/h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Action Button */}
      <div className="p-3.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
          {language === 'ur' ? 'محسوس:' : 'Feels:'} <strong className="text-slate-700">{current.feelsLike}°C</strong>
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={cn(
            'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
            isSelected
              ? 'bg-brand-blue text-white shadow-sm'
              : 'bg-white text-brand-blue hover:bg-brand-blue hover:text-white border border-slate-200 hover:border-brand-blue'
          )}
          aria-label={`${language === 'ur' ? 'تفصیلی پیش گوئی' : 'View detailed forecast for'} ${data.location.name}`}
        >
          <span>{language === 'ur' ? 'تفصیل دیکھیں' : 'View Forecast'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
