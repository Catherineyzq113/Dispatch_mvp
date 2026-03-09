import type { WeatherData, ForecastData, Location } from '@/types';
import { RiskGauge } from './RiskGauge';
import { 
  CloudRain, 
  Droplets, 
  Wind, 
  Thermometer,
  Navigation,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { getWindDirectionLabel, formatTemperature, formatWindSpeed } from '@/hooks/useWeather';
import { cn } from '@/lib/utils';

interface WeatherBarProps {
  location: Location;
  weather: WeatherData | null;
  forecast: ForecastData[];
  riskScore: number;
  locations: Location[];
  onLocationChange: (location: Location) => void;
  loading?: boolean;
}

export function WeatherBar({
  location,
  weather,
  forecast,
  riskScore,
  locations,
  onLocationChange,
  loading = false,
}: WeatherBarProps) {
  if (loading || !weather) {
    return (
      <div className="flex items-center justify-center h-16 bg-dispatch-card rounded-xl border border-dispatch-border">
        <div className="flex items-center gap-2 text-dispatch-text-secondary">
          <div className="w-4 h-4 border-2 border-dispatch-text-secondary/30 border-t-dispatch-accent-green rounded-full animate-spin" />
          <span className="text-sm">Loading weather data...</span>
        </div>
      </div>
    );
  }

  const windDirection = getWindDirectionLabel(weather.windDirection);
  const totalForecastRain = forecast.reduce((sum, day) => sum + day.precipitation, 0);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 bg-dispatch-card rounded-xl border border-dispatch-border">
      {/* Location Selector */}
      <div className="flex items-center gap-3 min-w-fit">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dispatch-bg border border-dispatch-border hover:border-dispatch-border-accent transition-colors">
              <MapPin className="w-4 h-4 text-dispatch-accent-green" />
              <span className="text-sm font-medium text-dispatch-text">{location.name}</span>
              <ChevronDown className="w-3 h-3 text-dispatch-text-secondary" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="bg-dispatch-card border-dispatch-border min-w-[180px]"
          >
            {locations.map((loc) => (
              <DropdownMenuItem
                key={loc.name}
                onClick={() => onLocationChange(loc)}
                className={cn(
                  'text-dispatch-text hover:bg-dispatch-card-hover cursor-pointer',
                  location.name === loc.name && 'bg-dispatch-card-hover'
                )}
              >
                <MapPin className="w-4 h-4 mr-2 text-dispatch-text-secondary" />
                {loc.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Weather Conditions */}
      <div className="flex flex-wrap items-center gap-4 lg:gap-6 flex-1">
        {/* Temperature */}
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-dispatch-text-secondary" />
          <span className="text-sm text-dispatch-text font-medium">
            {formatTemperature(weather.temperature)}
          </span>
        </div>

        {/* Rainfall */}
        <div className="flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-dispatch-status-blue" />
          <span className="text-sm text-dispatch-text">
            {weather.rainfall > 0 ? `${weather.rainfall}mm/hr` : 'No rain'}
          </span>
        </div>

        {/* Wind */}
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-dispatch-text-secondary" />
          <span className="text-sm text-dispatch-text">
            {formatWindSpeed(weather.windSpeed)} {windDirection}
          </span>
        </div>

        {/* Humidity */}
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-dispatch-text-secondary" />
          <span className="text-sm text-dispatch-text">
            {weather.humidity}% humidity
          </span>
        </div>

        {/* Forecast Summary */}
        {totalForecastRain > 0 && (
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-dispatch-status-blue/10">
            <Navigation className="w-3 h-3 text-dispatch-status-blue" />
            <span className="text-xs text-dispatch-status-blue">
              {totalForecastRain.toFixed(0)}mm rain next 3 days
            </span>
          </div>
        )}
      </div>

      {/* Risk Gauge */}
      <div className="lg:w-48 w-full">
        <RiskGauge 
          score={riskScore} 
          label="Leakage Risk"
          size="sm"
        />
      </div>
    </div>
  );
}
