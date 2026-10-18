export interface WeatherLocation {
  id: string;
  name: string;
  nameUrdu: string;
  region: 'Abbottabad City' | 'Galiyat';
  latitude: number;
  longitude: number;
  elevationMeters: number;
  description: string;
  descriptionUrdu: string;
  travelCautionContext: string;
  travelCautionContextUrdu: string;
}

export type WeatherCategory =
  | 'clear'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunderstorm';

export type WeatherAtmosphere =
  | 'sunny'
  | 'clear-night'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'overcast'
  | 'rain'
  | 'rain-night'
  | 'fog'
  | 'snow'
  | 'thunderstorm';

export interface WeatherConditionMeta {
  code: number;
  label: string;
  labelUrdu: string;
  iconName: string;
  category: WeatherCategory;
}

export interface CurrentWeather {
  time: string; // ISO string
  temperature: number; // Celsius
  feelsLike: number; // Celsius
  relativeHumidity: number; // %
  precipitation: number; // mm
  rain: number; // mm
  snowfall: number; // cm
  weatherCode: number;
  windSpeed: number; // km/h
  windDirection: number; // degrees
  visibilityKm: number; // km
  tempMaxToday: number;
  tempMinToday: number;
  precipitationProbabilityToday: number;
  isDay: number; // 1 = day, 0 = night
}

export interface HourlyForecastItem {
  time: string; // ISO string
  formattedTime: string; // e.g. "02:00 PM"
  formattedDate: string; // e.g. "Today" or "Tue, Oct 14"
  temperature: number; // °C
  weatherCode: number;
  precipitationProbability: number; // %
  precipitation: number; // mm
  windSpeed: number; // km/h
  relativeHumidity: number; // %
  visibilityKm: number; // km
  isDay: number; // 1 = day, 0 = night
}

export interface DailyForecastItem {
  date: string; // YYYY-MM-DD
  dayLabel: string; // e.g. "Today", "Wednesday"
  dayLabelUrdu: string;
  formattedDate: string; // e.g. "14 Oct"
  weatherCode: number;
  tempMax: number; // °C
  tempMin: number; // °C
  precipitationProbabilityMax: number; // %
  precipitationSum: number; // mm
  snowfallSum: number; // cm
  windSpeedMax: number; // km/h
}

export interface LocationWeatherData {
  location: WeatherLocation;
  current: CurrentWeather;
  hourly: HourlyForecastItem[]; // Next 24 hours
  daily: DailyForecastItem[]; // 7 days
  fetchedAt: string; // ISO string
  rawElevation?: number;
}

export interface WeatherAdvisoryRisk {
  id: string;
  level: 'info' | 'caution' | 'warning';
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  affectedLocations: string[];
  parameter: 'rain' | 'snow' | 'fog' | 'wind' | 'cold';
}

export interface WeatherFetchResult {
  data: Record<string, LocationWeatherData>;
  timestamp: string; // ISO formatted
  isFromCache: boolean;
  error?: string | null;
}
