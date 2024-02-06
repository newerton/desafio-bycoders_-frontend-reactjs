'use server';

import { env } from '@/libs/env';

export type GeocodingListResponse = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  timezone: string;
  population?: number;
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  timestamp: string;
};

export const getGeocodingList = async (
  name: string | null,
): Promise<GeocodingListResponse[] | []> => {
  if (!name) {
    return [];
  }

  const response = await fetch(
    `${env.OPEN_METEO_GEOCODING_URL}/v1/search?name=${name}&count=10&language=en&format=json`,
  );
  const json = await response.json();

  return json.results || [];
};
