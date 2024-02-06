import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AirQualityResponse } from '@/services/air-quality';
import { ForecastResponse } from '@/services/forecast';

export type GeoCodingStore = {
  id: string;
  city: string;
  state: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  timezone: string;
};

export type ForecastsProps = {
  geocoding: GeoCodingStore;
  forecast: ForecastResponse;
  airQuality: AirQualityResponse;
};

type UseForecastsProps = {
  forecasts: ForecastsProps[];
  addForecast: (forecast: ForecastsProps) => void;
  removeForecast: (id: string) => void;
  updateForecast: (id: string, forecast: ForecastResponse) => void;
  findForecast: (id: string) => ForecastsProps | undefined;
  clearForecast: () => void;
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
      removeForecast: (id: string) =>
        set((state) => ({
          forecasts: state.forecasts.filter(
            (forecast) => forecast.geocoding.id !== id,
          ),
        })),
      updateForecast: (id: string, forecast: ForecastResponse) =>
        set((state) => {
          const index = state.forecasts.findIndex((f) => f.geocoding.id === id);
          if (index === -1) {
            return state;
          }
          const updatedForecasts = [...state.forecasts];
          updatedForecasts[index].forecast = forecast;
          updatedForecasts[index].geocoding.timestamp =
            new Date().toISOString();
          return { forecasts: updatedForecasts };
        }),
      findForecast: (id: string) =>
        get().forecasts.find((forecast) => forecast.geocoding.id === id),
      clearForecast: () => set({ forecasts: [] }),
    }),
    {
      name: 'forecasts-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
