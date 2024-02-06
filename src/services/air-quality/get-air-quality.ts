'use server';

import { env } from '@/libs/env';

export type AirQualityProps = {
  latitude: string | null;
  longitude: string | null;
};

export type AirQualityResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
};

export type CurrentUnits = {
  time: string;
  interval: string;
  us_aqi: string;
};

export type Current = {
  time: string;
  interval: number;
  us_aqi: number;
};

const current = ['us_aqi'];

export const getAirQuality = async ({
  latitude,
  longitude,
}: AirQualityProps): Promise<AirQualityResponse> => {
  const response = await fetch(
    `${env.OPEN_METEO_AIR_QUALITY_API_URL}/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=${current.join(',')}&timezone=auto&format=json`,
  );
  const json = await response.json();
  return json || undefined;
};
