import { useState, useEffect, useCallback } from 'react';
import type { WeatherData, ForecastData, Location } from '@/types';

export const defaultLocations: Location[] = [
  { name: 'San Francisco, CA', lat: 37.7749, lon: -122.4194 },
  { name: 'Seattle, WA', lat: 47.6062, lon: -122.3321 },
  { name: 'Miami, FL', lat: 25.7617, lon: -80.1918 },
  { name: 'New York, NY', lat: 40.7128, lon: -74.0060 },
  { name: 'London, UK', lat: 51.5074, lon: -0.1278 },
];

interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    rain: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    precipitation_sum: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export function useWeather(initialLocation: Location = defaultLocations[0]) {
  const [location, setLocation] = useState<Location>(initialLocation);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (loc: Location) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m,wind_direction_10m,weather_code&daily=precipitation_sum,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=3`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data: WeatherResponse = await response.json();
      
      // Map weather code to condition string
      const condition = getWeatherCondition(data.current.weather_code);
      
      setWeather({
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        rainfall: data.current.rain,
        windSpeed: data.current.wind_speed_10m,
        windDirection: data.current.wind_direction_10m,
        condition,
      });
      
      // Process forecast data
      const forecastData: ForecastData[] = data.daily.time.map((date, index) => ({
        date,
        precipitation: data.daily.precipitation_sum[index],
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
      }));
      
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(location);
    
    // Refresh weather every 5 minutes
    const interval = setInterval(() => {
      fetchWeather(location);
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [location, fetchWeather]);

  const changeLocation = useCallback((newLocation: Location) => {
    setLocation(newLocation);
  }, []);

  return {
    location,
    weather,
    forecast,
    loading,
    error,
    changeLocation,
    refresh: () => fetchWeather(location),
  };
}

function getWeatherCondition(code: number): string {
  // WMO Weather interpretation codes
  const conditions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with heavy hail',
  };
  
  return conditions[code] || 'Unknown';
}

export function getWindDirectionLabel(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`;
}

export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed)} km/h`;
}
