import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AirQualityResponse } from '@/services/air-quality';
import { ForecastResponse } from '@/services/forecast';
import { GeocodingListResponse } from '@/services/gecoding';

export type ForecastsProps = {
  geocoding: GeocodingListResponse;
  forecast: ForecastResponse;
  airQuality: AirQualityResponse;
};

type UseForecastsProps = {
  forecasts: ForecastsProps[];
  addForecast: (forecast: ForecastsProps) => void;
  removeForecast: (id: number) => void;
  findForecast: (id: number) => ForecastsProps | undefined;
};

export const useForecastsStore = create(
  persist<UseForecastsProps>(
    (set, get) => ({
      forecasts: [],
      addForecast: (forecast: ForecastsProps) =>
        set((state) => {
          if (
            state.forecasts.some(
              (f) => f.geocoding.id === forecast.geocoding.id,
            )
          ) {
            return state;
          }
          const date = new Date();
          forecast.geocoding.timestamp = new Date().toISOString();

          return { forecasts: [...state.forecasts, forecast] };
        }),
      removeForecast: (id: number) =>
        set((state) => ({
          forecasts: state.forecasts.filter(
            (forecast) => forecast.geocoding.id !== id,
          ),
        })),
      findForecast: (id: number) =>
        get().forecasts.find((forecast) => forecast.geocoding.id === id),
    }),
    {
      name: 'forecasts-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
