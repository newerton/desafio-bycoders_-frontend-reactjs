'use server';

import { env } from '@/libs/env';

export type GeocodingProps = {
  latitude: string | null;
  longitude: string | null;
};

export interface GeocodingResponse {
  address: Address;
  location: Location;
}

export interface Address {
  Match_addr: string;
  LongLabel: string;
  ShortLabel: string;
  Addr_type: string;
  Type: string;
  PlaceName: string;
  AddNum: string;
  Address: string;
  Block: string;
  Sector: string;
  Neighborhood: string;
  District: string;
  City: string;
  MetroArea: string;
  Subregion: string;
  Region: string;
  RegionAbbr: string;
  Territory: string;
  Postal: string;
  PostalExt: string;
  CntryName: string;
  CountryCode: string;
}

export interface Location {
  x: number;
  y: number;
  spatialReference: SpatialReference;
}

export interface SpatialReference {
  wkid: number;
  latestWkid: number;
}

export const getGeocoding = async ({
  latitude,
  longitude,
}: GeocodingProps): Promise<GeocodingResponse> => {
  const response = await fetch(
    `${env.ARCGIS_GEOCODING_API_URL}/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=${longitude},${latitude}&f=json&token=${env.ARCGIS_GEOCODING_API_KEY}`,
  );
  const json = await response.json();

  return json || undefined;
};
