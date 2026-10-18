import React from 'react';
import {
  Wind,
  Droplets,
  Eye,
  CloudRain,
  Clock,
  Compass,
  ArrowUp,
  ArrowDown,
  Building2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import type { LocationWeatherData } from '../../types/weather';
import { getWeatherConditionMeta } from '../../services/weatherService';
import { WeatherIcon } from './WeatherIcon';
import { useLanguage } from '../../hooks/useLanguage';
import { cn } from '../../lib/utils';

interface AbbottabadWeatherCardProps {
  data: LocationWeatherData;
  isSelected: boolean;
  onSelect: () => void;
  lastUpdatedFormatted?: string;
  isFromCache?: boolean;
}

export const AbbottabadWeatherCard: React.FC<AbbottabadWeatherCardProps> = ({
  data,
  isSelected,
  onSelect,
  lastUpdatedFormatted,
  isFromCache,
}) => {
  const { language } = useLanguage();
  const current = data.current;
  const meta = getWeatherConditionMeta(current.weatherCode);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white border shadow-gov-md transition-all duration-300',
        isSelected
          ? 'border-brand-blue ring-2 ring-brand-blue/20 shadow-lg'
          : 'border-slate-200 hover:border-brand-blue-300 hover:shadow-gov-lg'
      )}
    >
      {/* Top Banner Accent */}
      <div className="bg-[#000066] text-white px-5 sm:px-7 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#000088]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-lime animate-pulse" />
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-brand-lime" />
            {language === 'ur' ? 'مرکزی ضلعی ہیڈکوارٹر' : 'District Headquarters & City Center'}
          </span>
          <span className="text-[11px] font-semibold bg-white/15 text-brand-lime px-2 py-0.5 rounded-full">
            1,220m ASL
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/80">
          <Clock className="w-3.5 h-3.5 text-brand-lime" />
          <span>
            {language === 'ur' ? 'آخری اپڈیٹ:' : 'Updated:'}{' '}
            <strong className="text-white font-medium">
              {lastUpdatedFormatted || new Date(data.fetchedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </strong>
          </span>
          {isFromCache && (
            <span className="text-[10px] bg-white/10 text-brand-lime-light px-1.5 py-0.5 rounded">
              {language === 'ur' ? 'محفوظ شدہ ڈیٹا' : 'Cached'}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-7 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Main Temp & Condition */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                  {language === 'ur' ? data.location.nameUrdu : data.location.name}
                </h3>
                {isSelected && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-brand-blue-50 text-brand-blue border border-brand-blue-200 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-brand-blue" />
                    {language === 'ur' ? 'منتخب کردہ' : 'Active View'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'ur' ? data.location.descriptionUrdu : data.location.description}
              </p>
            </div>

            <div className="flex items-baseline gap-4">
              <div className="flex items-center gap-3">
                <WeatherIcon weatherCode={current.weatherCode} className="w-14 h-14 sm:w-16 sm:h-16" />
                <span className="text-5xl sm:text-6xl font-black text-brand-dark tracking-tighter">
                  {current.temperature}°
                  <span className="text-2xl sm:text-3xl font-bold text-slate-500">C</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue-50 text-brand-blue border border-brand-blue-100">
                {language === 'ur' ? meta.labelUrdu : meta.label}
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {language === 'ur' ? 'محسوس درجہ حرارت:' : 'Feels like:'}{' '}
                <strong className="text-slate-800 font-semibold">{current.feelsLike}°C</strong>
              </span>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600 pl-2 border-l border-slate-200">
                <span className="inline-flex items-center text-red-600 font-semibold">
                  <ArrowUp className="w-3.5 h-3.5" />
                  {current.tempMaxToday}°C
                </span>
                <span className="inline-flex items-center text-blue-600 font-semibold">
                  <ArrowDown className="w-3.5 h-3.5" />
                  {current.tempMinToday}°C
                </span>
              </div>
            </div>
          </div>

          {/* Grid of Key Supporting Weather Metrics */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Humidity */}
              <div className="bg-slate-50 hover:bg-slate-100/80 rounded-xl p-3.5 border border-slate-100 transition-colors">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
                  <Droplets className="w-4 h-4 text-sky-500" />
                  <span>{language === 'ur' ? 'نمی' : 'Humidity'}</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900">
                  {current.relativeHumidity}%
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {current.relativeHumidity > 75 ? (language === 'ur' ? 'زیادہ نمی' : 'High') : (language === 'ur' ? 'معتدل' : 'Normal')}
                </div>
              </div>

              {/* Wind Speed */}
              <div className="bg-slate-50 hover:bg-slate-100/80 rounded-xl p-3.5 border border-slate-100 transition-colors">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
                  <Wind className="w-4 h-4 text-emerald-500" />
                  <span>{language === 'ur' ? 'ہوا کی رفتار' : 'Wind'}</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900">
                  {current.windSpeed}{' '}
                  <span className="text-xs font-normal text-slate-500">km/h</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-slate-400" />
                  <span>{current.windDirection}°</span>
                </div>
              </div>

              {/* Visibility */}
              <div className="bg-slate-50 hover:bg-slate-100/80 rounded-xl p-3.5 border border-slate-100 transition-colors">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
                  <Eye className="w-4 h-4 text-indigo-500" />
                  <span>{language === 'ur' ? 'حد نگاہ' : 'Visibility'}</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900">
                  {current.visibilityKm}{' '}
                  <span className="text-xs font-normal text-slate-500">km</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {current.visibilityKm >= 8 ? (language === 'ur' ? 'صاف' : 'Clear') : (language === 'ur' ? 'محدود' : 'Restricted')}
                </div>
              </div>

              {/* Rain Probability / Precip */}
              <div className="bg-slate-50 hover:bg-slate-100/80 rounded-xl p-3.5 border border-slate-100 transition-colors">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
                  <CloudRain className="w-4 h-4 text-blue-500" />
                  <span>{language === 'ur' ? 'بارش کا امکان' : 'Precipitation'}</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900">
                  {current.precipitationProbabilityToday}%
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {current.precipitation > 0 ? `${current.precipitation} mm` : language === 'ur' ? 'بارش نہیں' : '0.0 mm'}
                </div>
              </div>
            </div>

            {/* Travel context & detailed forecast toggle action */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-slate-600 max-w-md">
                <span className="font-semibold text-slate-700">
                  {language === 'ur' ? 'ٹریفک نوٹ:' : 'Travel Note:'}
                </span>{' '}
                {language === 'ur' ? data.location.travelCautionContextUrdu : data.location.travelCautionContext}
              </p>

              <button
                type="button"
                onClick={onSelect}
                className={cn(
                  'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0',
                  isSelected
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-brand-blue-50 text-brand-blue hover:bg-brand-blue hover:text-white border border-brand-blue-200'
                )}
                aria-pressed={isSelected}
              >
                <span>{language === 'ur' ? 'تفصیلی پیش گوئی دیکھیں' : 'View Detailed Forecast'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
