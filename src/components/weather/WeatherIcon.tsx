import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  HelpCircle,
} from 'lucide-react';
import { getWeatherConditionMeta } from '../../services/weatherService';

interface WeatherIconProps {
  weatherCode: number;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  weatherCode,
  className = 'w-6 h-6',
  size,
}) => {
  const meta = getWeatherConditionMeta(weatherCode);

  const iconProps = {
    className,
    size,
    'aria-label': meta.label,
    role: 'img',
  };

  switch (meta.iconName) {
    case 'Sun':
      return <Sun {...iconProps} className={`${className} text-amber-500`} />;
    case 'SunMedium':
      return <SunMedium {...iconProps} className={`${className} text-amber-500`} />;
    case 'CloudSun':
      return <CloudSun {...iconProps} className={`${className} text-sky-500`} />;
    case 'Cloud':
      return <Cloud {...iconProps} className={`${className} text-slate-400`} />;
    case 'CloudFog':
      return <CloudFog {...iconProps} className={`${className} text-slate-400`} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...iconProps} className={`${className} text-blue-400`} />;
    case 'CloudRain':
      return <CloudRain {...iconProps} className={`${className} text-blue-500`} />;
    case 'CloudSnow':
      return <CloudSnow {...iconProps} className={`${className} text-cyan-400`} />;
    case 'CloudLightning':
      return <CloudLightning {...iconProps} className={`${className} text-amber-600`} />;
    default:
      return <HelpCircle {...iconProps} className={`${className} text-slate-400`} />;
  }
};
