import type { WeatherData } from '@/types';

export interface RiskFactors {
  rainfall: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  temperature: number;
  sealAge?: number;
}

export function calculateLeakageRisk(weather: WeatherData, sealAge?: number): number {
  const { rainfall, windSpeed, windDirection, humidity, temperature } = weather;
  
  let risk = 0;
  
  // Rainfall intensity (biggest factor)
  if (rainfall > 10) risk += 35;
  else if (rainfall > 5) risk += 20;
  else if (rainfall > 1) risk += 10;
  else if (rainfall > 0) risk += 5;
  
  // Wind-driven rain (wind pushes water into seals)
  if (windSpeed > 40) risk += 25;
  else if (windSpeed > 25) risk += 15;
  else if (windSpeed > 15) risk += 8;
  else if (windSpeed > 10) risk += 4;
  
  // Humidity (affects seal degradation rate)
  if (humidity > 85) risk += 15;
  else if (humidity > 70) risk += 8;
  else if (humidity > 60) risk += 4;
  
  // Temperature differential (thermal expansion stress)
  if (temperature < 5 || temperature > 35) risk += 10;
  else if (temperature < 10 || temperature > 30) risk += 5;
  
  // Wind direction bonus (south/southwest = driving rain)
  if (windDirection >= 180 && windDirection <= 270) risk += 15;
  else if (windDirection >= 135 && windDirection <= 315) risk += 8;
  
  // Seal age factor
  if (sealAge !== undefined) {
    if (sealAge > 5) risk += 20;
    else if (sealAge > 4) risk += 15;
    else if (sealAge > 3) risk += 10;
    else if (sealAge > 2) risk += 5;
  }
  
  return Math.min(risk, 100);
}

export function getRiskLevel(score: number): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (score >= 70) return 'Critical';
  if (score >= 50) return 'High';
  if (score >= 30) return 'Medium';
  return 'Low';
}

export function getRiskColor(score: number): string {
  if (score >= 70) return '#EF4444';
  if (score >= 50) return '#F59E0B';
  if (score >= 30) return '#F59E0B';
  return '#22C55E';
}

export function formatRiskReason(weather: WeatherData, sealAge?: number): string {
  const reasons: string[] = [];
  
  if (weather.rainfall > 5) {
    reasons.push(`Heavy rain (${weather.rainfall}mm/hr)`);
  } else if (weather.rainfall > 1) {
    reasons.push(`Moderate rain (${weather.rainfall}mm/hr)`);
  }
  
  if (weather.windSpeed > 25) {
    const direction = getWindDirectionLabel(weather.windDirection);
    reasons.push(`Strong ${direction} winds (${weather.windSpeed}km/h)`);
  }
  
  if (weather.humidity > 80) {
    reasons.push(`High humidity (${weather.humidity}%)`);
  }
  
  if (sealAge !== undefined && sealAge > 3) {
    reasons.push(`Seal age ${sealAge.toFixed(1)} years`);
  }
  
  if (reasons.length === 0) {
    return 'Favorable conditions';
  }
  
  return reasons.join(' + ');
}

function getWindDirectionLabel(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}
