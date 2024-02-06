'use server';

import { env } from '@/libs/env';

export type ForecastProps = {
  latitude: string | null;
  longitude: string | null;
};

export type ForecastResponse = {
  current_units: CurrentUnits;
  current: Current;
  elevation: number;
  generationtime_ms: number;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  latitude: number;
  longitude: number;
  timezone_abbreviation: string;
  timezone: string;
  utc_offset_seconds: number;
};

export type Current = {
  apparent_temperature: number;
  interval: number;
  is_day: boolean;
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
  is_day: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  time: string;
  visibility: string;
  weather_code: string;
  wind_direction_10m: string;
  wind_speed_10m: string;
};

export type Hourly = {
  is_day: boolean[];
  relative_humidity_2m: number[];
  temperature_2m: number[];
  time: string[];
  weather_code: number[];
  wind_speed_10m: number[];
};

export type HourlyUnits = {
  is_day: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  time: string;
  weather_code: string;
  wind_speed_10m: string;
};

const current = [
  'apparent_temperature',
  'is_day',
  'relative_humidity_2m',
  'temperature_2m',
  'visibility',
  'weather_code',
  'wind_direction_10m',
  'wind_speed_10m',
];
const hourly = [
  'is_day',
  'relative_humidity_2m',
  'temperature_2m',
  'weather_code',
  'wind_speed_10m',
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
