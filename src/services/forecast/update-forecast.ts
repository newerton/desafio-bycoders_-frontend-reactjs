'use server';

import { ForecastResponse, getForecast } from '.';

export type UpdateForecastProps = {
  id: string;
  latitude: string;
  longitude: string;
};

export const updateForecast = async ({
  id,
  latitude,
  longitude,
}: UpdateForecastProps): Promise<ForecastResponse> => {
  return getForecast({ latitude, longitude });
};
