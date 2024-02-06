'use server';

import { env } from '@/libs/env';

export type ForecastProps = {
  latitude: string | null;
  longitude: string | null;
};

export type ForecastResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  hourly_units: HourlyUnits;
  hourly: Hourly;
};

export type Current = {
  apparent_temperature: number;
  interval: number;
  relative_humidity_2m: number;
  temperature_2m: number;
  time: string;
  visibility: number;
  weather_code: number;
  wind_direction_10m: number;
  wind_speed_10m: number;
};

export type CurrentUnits = {
  apparent_temperature: string;
  interval: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  time: string;
  visibility: string;
  weather_code: string;
  wind_direction_10m: string;
  wind_speed_10m: string;
};

export type Hourly = {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
  weather_code: number[];
};

export type HourlyUnits = {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
  weather_code: string;
};

const current = [
  'apparent_temperature',
  'relative_humidity_2m',
  'temperature_2m',
  'visibility',
  'weather_code',
  'wind_direction_10m',
  'wind_speed_10m',
];
const hourly = [
  'temperature_2m',
  'wind_speed_10m',
  'relative_humidity_2m',
  'weather_code',
];

export const getForecast = async ({
  latitude,
  longitude,
}: ForecastProps): Promise<ForecastResponse> => {
  const response = await fetch(
    `${env.OPEN_METEO_API_URL}/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${current.join(',')}&hourly=${hourly.join(',')}&timezone=auto&format=json`,
  );
  const json = await response.json();
  return json || undefined;
};
