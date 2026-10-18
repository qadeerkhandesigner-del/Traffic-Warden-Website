import { ALL_WEATHER_LOCATIONS } from '../data/weatherLocations';
import type {
  LocationWeatherData,
  CurrentWeather,
  HourlyForecastItem,
  DailyForecastItem,
  WeatherAdvisoryRisk,
  WeatherConditionMeta,
  WeatherFetchResult,
  WeatherAtmosphere,
} from '../types/weather';

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const WEATHER_CACHE_KEY = 'tpa_weather_cache_v2';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache

/**
 * WMO Weather interpretation codes (WW)
 * https://open-meteo.com/en/docs
 */
export function getWeatherConditionMeta(code: number): WeatherConditionMeta {
  switch (code) {
    case 0:
      return { code, label: 'Clear Sky', labelUrdu: 'صاف مطلع', iconName: 'Sun', category: 'clear' };
    case 1:
      return { code, label: 'Mainly Clear', labelUrdu: 'زیادہ تر صاف', iconName: 'SunMedium', category: 'clear' };
    case 2:
      return { code, label: 'Partly Cloudy', labelUrdu: 'جزوی ابر آلود', iconName: 'CloudSun', category: 'cloudy' };
    case 3:
      return { code, label: 'Overcast', labelUrdu: 'مکمل ابر آلود', iconName: 'Cloud', category: 'cloudy' };
    case 45:
      return { code, label: 'Foggy / Mist', labelUrdu: 'دھند و کہرا', iconName: 'CloudFog', category: 'fog' };
    case 48:
      return { code, label: 'Depositing Rime Fog', labelUrdu: 'شدید دھند اور پالا', iconName: 'CloudFog', category: 'fog' };
    case 51:
      return { code, label: 'Light Drizzle', labelUrdu: 'ہلکی بونداباندی', iconName: 'CloudDrizzle', category: 'drizzle' };
    case 53:
      return { code, label: 'Moderate Drizzle', labelUrdu: 'درمیانی بونداباندی', iconName: 'CloudDrizzle', category: 'drizzle' };
    case 55:
      return { code, label: 'Dense Drizzle', labelUrdu: 'تیز بونداباندی', iconName: 'CloudDrizzle', category: 'drizzle' };
    case 56:
    case 57:
      return { code, label: 'Freezing Drizzle', labelUrdu: 'منجمد بونداباندی', iconName: 'CloudSnow', category: 'snow' };
    case 61:
      return { code, label: 'Slight Rain', labelUrdu: 'ہلکی بارش', iconName: 'CloudRain', category: 'rain' };
    case 63:
      return { code, label: 'Moderate Rain', labelUrdu: 'معتدل بارش', iconName: 'CloudRain', category: 'rain' };
    case 65:
      return { code, label: 'Heavy Rain', labelUrdu: 'تیز موسلادھار بارش', iconName: 'CloudRain', category: 'rain' };
    case 66:
    case 67:
      return { code, label: 'Freezing Rain', labelUrdu: 'سرد منجمد بارش', iconName: 'CloudSnow', category: 'snow' };
    case 71:
      return { code, label: 'Slight Snowfall', labelUrdu: 'ہلکی برف باری', iconName: 'CloudSnow', category: 'snow' };
    case 73:
      return { code, label: 'Moderate Snowfall', labelUrdu: 'درمیانی برف باری', iconName: 'CloudSnow', category: 'snow' };
    case 75:
      return { code, label: 'Heavy Snowfall', labelUrdu: 'شدید برف باری', iconName: 'CloudSnow', category: 'snow' };
    case 77:
      return { code, label: 'Snow Grains', labelUrdu: 'برف کے ذرات / گالے', iconName: 'CloudSnow', category: 'snow' };
    case 80:
      return { code, label: 'Slight Rain Showers', labelUrdu: 'ہلکی بارش کے جھونکے', iconName: 'CloudRain', category: 'rain' };
    case 81:
      return { code, label: 'Moderate Showers', labelUrdu: 'معتدل بارش کی پھوار', iconName: 'CloudRain', category: 'rain' };
    case 82:
      return { code, label: 'Violent Showers', labelUrdu: 'شدید طوفانی جھکڑ و بارش', iconName: 'CloudRain', category: 'rain' };
    case 85:
      return { code, label: 'Slight Snow Showers', labelUrdu: 'برف باری کے جھونکے', iconName: 'CloudSnow', category: 'snow' };
    case 86:
      return { code, label: 'Heavy Snow Showers', labelUrdu: 'شدید برفیلے طوفانی جھونکے', iconName: 'CloudSnow', category: 'snow' };
    case 95:
      return { code, label: 'Thunderstorm', labelUrdu: 'گرج چمک کے ساتھ طوفان', iconName: 'CloudLightning', category: 'thunderstorm' };
    case 96:
    case 99:
      return { code, label: 'Thunderstorm with Hail', labelUrdu: 'گرج چمک اور ژالہ باری', iconName: 'CloudLightning', category: 'thunderstorm' };
    default:
      return { code, label: 'Partly Cloudy', labelUrdu: 'ابر آلود', iconName: 'CloudSun', category: 'cloudy' };
  }
}

/**
 * Determine the dynamic atmospheric visual theme based on WMO code, day/night state, and precipitation
 */
export function getWeatherAtmosphere(
  weatherCode: number,
  isDay: number,
  snowfall = 0,
  precipitation = 0
): WeatherAtmosphere {
  const meta = getWeatherConditionMeta(weatherCode);

  // Thunderstorm
  if (meta.category === 'thunderstorm') {
    return 'thunderstorm';
  }

  // Snow
  if (meta.category === 'snow' || snowfall > 0) {
    return 'snow';
  }

  // Fog / Mist
  if (meta.category === 'fog') {
    return 'fog';
  }

  // Rain or Drizzle
  if (meta.category === 'rain' || meta.category === 'drizzle' || precipitation > 0.8) {
    return isDay === 1 ? 'rain' : 'rain-night';
  }

  // Overcast (dense cloud cover)
  if (weatherCode === 3) {
    return 'overcast';
  }

  // Partly Cloudy
  if (weatherCode === 2) {
    return isDay === 1 ? 'partly-cloudy-day' : 'partly-cloudy-night';
  }

  // Clear / Mainly clear
  return isDay === 1 ? 'sunny' : 'clear-night';
}

/**
 * Format ISO datetime string to 12-hour AM/PM string in Asia/Karachi time
 */
function formatHourTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return isoString.slice(11, 16);
  }
}

/**
 * Format date string to friendly day labels
 */
function formatDailyDate(dateString: string, index: number): { dayLabel: string; dayLabelUrdu: string; formattedDate: string } {
  try {
    const date = new Date(dateString + 'T00:00:00');
    const dayNamesEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayNamesUr = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];
    const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const month = monthsEn[date.getMonth()];
    
    const dayLabel = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : dayNamesEn[dayOfWeek];
    const dayLabelUrdu = index === 0 ? 'آج' : index === 1 ? 'کل' : dayNamesUr[dayOfWeek];
    const formattedDate = `${dayOfMonth} ${month}`;

    return { dayLabel, dayLabelUrdu, formattedDate };
  } catch {
    return {
      dayLabel: index === 0 ? 'Today' : dateString,
      dayLabelUrdu: index === 0 ? 'آج' : dateString,
      formattedDate: dateString,
    };
  }
}

/**
 * Transform Open-Meteo raw API object to normalized LocationWeatherData
 */
function transformRawLocationData(location: typeof ALL_WEATHER_LOCATIONS[0], raw: any, fetchedAt: string): LocationWeatherData {
  const current = raw.current || {};
  const daily = raw.daily || {};
  const hourly = raw.hourly || {};

  // Current conditions
  const tempMaxToday = daily.temperature_2m_max?.[0] ?? current.temperature_2m ?? 0;
  const tempMinToday = daily.temperature_2m_min?.[0] ?? current.temperature_2m ?? 0;
  const precipProbToday = daily.precipitation_probability_max?.[0] ?? 0;

  // Find index in hourly matching current hour or closest future hour
  const nowIsoPrefix = new Date().toISOString().slice(0, 13); // "2026-10-13T14"
  let startHourIdx = 0;
  if (Array.isArray(hourly.time)) {
    const foundIdx = hourly.time.findIndex((t: string) => t.startsWith(nowIsoPrefix));
    if (foundIdx !== -1) {
      startHourIdx = foundIdx;
    }
  }

  // Current visibility from hourly
  const currentVisibilityMeters = hourly.visibility?.[startHourIdx] ?? 10000;
  const visibilityKm = Math.round((currentVisibilityMeters / 1000) * 10) / 10;

  // Determine current day/night state (from current.is_day or fallback to local hour check)
  let isDay = current.is_day;
  if (isDay === undefined) {
    const currentHour = new Date().getHours();
    isDay = currentHour >= 6 && currentHour < 18 ? 1 : 0;
  }

  const currentWeather: CurrentWeather = {
    time: current.time || new Date().toISOString(),
    temperature: Math.round((current.temperature_2m ?? 0) * 10) / 10,
    feelsLike: Math.round((current.apparent_temperature ?? current.temperature_2m ?? 0) * 10) / 10,
    relativeHumidity: Math.round(current.relative_humidity_2m ?? 0),
    precipitation: Math.round((current.precipitation ?? 0) * 10) / 10,
    rain: Math.round((current.rain ?? 0) * 10) / 10,
    snowfall: Math.round((current.snowfall ?? 0) * 10) / 10,
    weatherCode: current.weather_code ?? 0,
    windSpeed: Math.round(current.wind_speed_10m ?? 0),
    windDirection: Math.round(current.wind_direction_10m ?? 0),
    visibilityKm,
    tempMaxToday: Math.round(tempMaxToday * 10) / 10,
    tempMinToday: Math.round(tempMinToday * 10) / 10,
    precipitationProbabilityToday: precipProbToday,
    isDay: isDay === 1 ? 1 : 0,
  };

  // Next 24 hours
  const hourlyItems: HourlyForecastItem[] = [];
  if (Array.isArray(hourly.time)) {
    const totalHours = Math.min(24, hourly.time.length - startHourIdx);
    for (let i = 0; i < totalHours; i++) {
      const idx = startHourIdx + i;
      const t = hourly.time[idx];
      const isToday = i === 0;
      const hourlyIsDay = hourly.is_day?.[idx] ?? (new Date(t).getHours() >= 6 && new Date(t).getHours() < 18 ? 1 : 0);
      hourlyItems.push({
        time: t,
        formattedTime: formatHourTime(t),
        formattedDate: isToday ? 'Now' : i < 12 ? 'Today' : 'Tomorrow',
        temperature: Math.round((hourly.temperature_2m?.[idx] ?? 0) * 10) / 10,
        weatherCode: hourly.weather_code?.[idx] ?? 0,
        precipitationProbability: hourly.precipitation_probability?.[idx] ?? 0,
        precipitation: Math.round((hourly.precipitation?.[idx] ?? 0) * 10) / 10,
        windSpeed: Math.round(hourly.wind_speed_10m?.[idx] ?? 0),
        relativeHumidity: Math.round(hourly.relative_humidity_2m?.[idx] ?? 0),
        visibilityKm: Math.round(((hourly.visibility?.[idx] ?? 10000) / 1000) * 10) / 10,
        isDay: hourlyIsDay === 1 ? 1 : 0,
      });
    }
  }

  // 7-day forecast
  const dailyItems: DailyForecastItem[] = [];
  if (Array.isArray(daily.time)) {
    const daysCount = Math.min(7, daily.time.length);
    for (let i = 0; i < daysCount; i++) {
      const dateStr = daily.time[i];
      const { dayLabel, dayLabelUrdu, formattedDate } = formatDailyDate(dateStr, i);
      dailyItems.push({
        date: dateStr,
        dayLabel,
        dayLabelUrdu,
        formattedDate,
        weatherCode: daily.weather_code?.[i] ?? 0,
        tempMax: Math.round((daily.temperature_2m_max?.[i] ?? 0) * 10) / 10,
        tempMin: Math.round((daily.temperature_2m_min?.[i] ?? 0) * 10) / 10,
        precipitationProbabilityMax: daily.precipitation_probability_max?.[i] ?? 0,
        precipitationSum: Math.round((daily.precipitation_sum?.[i] ?? 0) * 10) / 10,
        snowfallSum: Math.round((daily.snowfall_sum?.[i] ?? 0) * 10) / 10,
        windSpeedMax: Math.round(daily.wind_speed_10m_max?.[i] ?? 0),
      });
    }
  }

  return {
    location,
    current: currentWeather,
    hourly: hourlyItems,
    daily: dailyItems,
    fetchedAt,
    rawElevation: raw.elevation,
  };
}

/**
 * Fetch weather data for all 7 locations using Open-Meteo multi-coordinate batch request
 */
export async function fetchAllLocationsWeather(forceRefresh = false): Promise<WeatherFetchResult> {
  // Check local cache if not forcing refresh
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const rawCache = localStorage.getItem(WEATHER_CACHE_KEY);
      if (rawCache) {
        const parsed = JSON.parse(rawCache);
        const age = Date.now() - new Date(parsed.timestamp).getTime();
        if (age < CACHE_TTL_MS && parsed.data && Object.keys(parsed.data).length === ALL_WEATHER_LOCATIONS.length) {
          return {
            data: parsed.data,
            timestamp: parsed.timestamp,
            isFromCache: true,
          };
        }
      }
    } catch {
      // Ignore cache read failures
    }
  }

  const lats = ALL_WEATHER_LOCATIONS.map((loc) => loc.latitude).join(',');
  const lons = ALL_WEATHER_LOCATIONS.map((loc) => loc.longitude).join(',');

  const queryParams = new URLSearchParams({
    latitude: lats,
    longitude: lons,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,wind_speed_10m,wind_direction_10m,is_day',
    hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,visibility,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,snowfall_sum,wind_speed_10m_max',
    timezone: 'Asia/Karachi',
    forecast_days: '7',
  });

  const url = `${OPEN_METEO_BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Open-Meteo API returned status: ${response.status}`);
    }

    const json = await response.json();
    const fetchedAt = new Date().toISOString();
    const results: Record<string, LocationWeatherData> = {};

    // When multiple coordinates are requested, Open-Meteo returns an Array corresponding to the order
    const rawList = Array.isArray(json) ? json : [json];

    ALL_WEATHER_LOCATIONS.forEach((location, index) => {
      const rawData = rawList[index] || rawList[0];
      results[location.id] = transformRawLocationData(location, rawData, fetchedAt);
    });

    // Save to cache
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          WEATHER_CACHE_KEY,
          JSON.stringify({
            data: results,
            timestamp: fetchedAt,
          })
        );
      } catch {
        // Ignore cache write quota errors
      }
    }

    return {
      data: results,
      timestamp: fetchedAt,
      isFromCache: false,
    };
  } catch (error) {
    // If network fails, attempt to return cached data even if expired
    if (typeof window !== 'undefined') {
      try {
        const rawCache = localStorage.getItem(WEATHER_CACHE_KEY);
        if (rawCache) {
          const parsed = JSON.parse(rawCache);
          if (parsed.data && Object.keys(parsed.data).length > 0) {
            return {
              data: parsed.data,
              timestamp: parsed.timestamp,
              isFromCache: true,
              error: 'Real-time update failed; displaying last recorded meteorological data.',
            };
          }
        }
      } catch {
        // ignore
      }
    }

    throw new Error(
      error instanceof Error
        ? `Unable to retrieve meteorological updates: ${error.message}`
        : 'Weather service connection failed.'
    );
  }
}

/**
 * Dynamically evaluate potential weather-based hazards across all monitored points
 */
export function computeAdvisoryRisks(data: Record<string, LocationWeatherData>): WeatherAdvisoryRisk[] {
  const risks: WeatherAdvisoryRisk[] = [];
  const locations = Object.values(data);

  if (locations.length === 0) return risks;

  // 1. Snowfall or Black Ice Alert
  const snowOrFreezing = locations.filter(
    (loc) =>
      loc.current.snowfall > 0 ||
      loc.daily.some((d) => d.snowfallSum > 0.5) ||
      loc.current.temperature <= 2
  );

  if (snowOrFreezing.length > 0) {
    risks.push({
      id: 'snow-black-ice',
      level: 'warning',
      parameter: 'snow',
      title: 'Freezing Conditions & Slippery Alpine Surfaces',
      titleUrdu: 'منجمد درجہ حرارت اور پہاڑی راستوں پر ممکنہ پھسلن',
      description: `Near-freezing or sub-zero temperatures observed at high elevations (${snowOrFreezing
        .map((l) => l.location.name)
        .join(', ')}). Risk of black ice formation and morning frost. Motorists are urged to inspect tire treads and carry snow chains during night journeys.`,
      descriptionUrdu: `بلند پہاڑی مقامات (${snowOrFreezing
        .map((l) => l.location.nameUrdu)
        .join('، ')}) پر سردی اور منجمد درجہ حرارت۔ سڑکوں پر پھسلن اور کہرا ہو سکتا ہے۔ ڈرائیورز محتاط رہیں اور سنو چینز پاس رکھیں۔`,
      affectedLocations: snowOrFreezing.map((l) => l.location.name),
    });
  }

  // 2. Heavy Rainfall / Landslide Risk
  const heavyRain = locations.filter(
    (loc) =>
      loc.current.precipitation > 5 ||
      loc.daily.some((d) => d.precipitationProbabilityMax >= 75 || d.precipitationSum >= 15)
  );

  if (heavyRain.length > 0) {
    risks.push({
      id: 'heavy-rain-landslide',
      level: 'caution',
      parameter: 'rain',
      title: 'Precipitation & Mountain Runoff Advisory',
      titleUrdu: 'بارش اور پہاڑی موڑوں پر بہاؤ کا انتباہ',
      description: `Elevated probability of rainfall forecasted across ${heavyRain
        .map((l) => l.location.name)
        .join(', ')}. Heavy showers in mountainous terrain can trigger rockfall and surface water pooling. Maintain safe braking distances.`,
      descriptionUrdu: `${heavyRain
        .map((l) => l.location.nameUrdu)
        .join('، ')} میں بارش کا امکان۔ پہاڑی علاقوں میں لینڈ سلائیڈنگ اور پانی جمع ہونے کے خدشے کے پیش نظر اگلی گاڑی سے مناسب فاصلہ رکھیں۔`,
      affectedLocations: heavyRain.map((l) => l.location.name),
    });
  }

  // 3. Dense Fog / Low Visibility
  const lowVisibility = locations.filter(
    (loc) => loc.current.visibilityKm <= 2.5 || loc.current.weatherCode === 45 || loc.current.weatherCode === 48
  );

  if (lowVisibility.length > 0) {
    risks.push({
      id: 'low-visibility-fog',
      level: 'caution',
      parameter: 'fog',
      title: 'Reduced Atmospheric Visibility',
      titleUrdu: 'کم بصارت و کہرے کا انتباہ',
      description: `Dense mountain mist and cloud cover reducing road visibility to under 2.5 km in ${lowVisibility
        .map((l) => l.location.name)
        .join(', ')}. Turn on low-beam fog lights and avoid overtaking on blind curves.`,
      descriptionUrdu: `${lowVisibility
        .map((l) => l.location.nameUrdu)
        .join('، ')} میں کہرے اور بادلوں کے باعث حد نگاہ متاثر۔ فوگ لائٹس استعمال کریں اور اندھے موڑ پر اوور ٹیکنگ نہ کریں۔`,
      affectedLocations: lowVisibility.map((l) => l.location.name),
    });
  }

  // 4. Strong Winds / Gusts
  const highWind = locations.filter(
    (loc) => loc.current.windSpeed >= 35 || loc.daily.some((d) => d.windSpeedMax >= 45)
  );

  if (highWind.length > 0) {
    risks.push({
      id: 'strong-winds',
      level: 'info',
      parameter: 'wind',
      title: 'High-Altitude Wind Gusts',
      titleUrdu: 'بلند مقامات پر تیز ہوائیں',
      description: `Strong gusts reported along high passes (${highWind
        .map((l) => l.location.name)
        .join(', ')}). Motorcyclists and high-sided passenger vehicles should exercise heightened steering caution.`,
      descriptionUrdu: `بلند پہاڑی سلسلوں (${highWind
        .map((l) => l.location.nameUrdu)
        .join('، ')}) پر تیز ہواؤں کے جھکڑ۔ موٹر سائیکل سوار اور بڑی گاڑیاں خاص طور پر محتاط رہیں۔`,
      affectedLocations: highWind.map((l) => l.location.name),
    });
  }

  return risks;
}
