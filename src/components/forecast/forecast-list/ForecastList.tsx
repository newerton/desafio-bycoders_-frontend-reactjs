'use client';

import { useCallback } from 'react';

import { TransitionAndIntersection } from '@/components/animations/transition-and-intersection';
import { ForecastCard } from '@/components/cards/forecast';
import { Button } from '@/components/ui/button';
import { useForecastsStore } from '@/stores';

export const ForecastList = () => {
  const { forecasts, clearForecast } = useForecastsStore();

  const handleClearForecast = useCallback(() => {
    clearForecast();
  }, [clearForecast]);

  return (
    <>
      {forecasts.length > 0 && (
        <div className="lg:px-10 w-full mb-4">
          <Button color="red" onClick={handleClearForecast}>
            Remove all
          </Button>
        </div>
      )}
      <div className="lg:px-10 w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 mb-10 cursor-default select-none">
        {forecasts?.map((item, index) => {
          const current = item.forecast.current;
          const currentUnits = item.forecast.current_units;
          const currentAirQuality = item.airQuality.current;

          return (
            <TransitionAndIntersection
              key={item.geocoding.id}
              valueInitial="opacity-0 translate-y-28"
              valueFinal="opacity-100 translate-y-0"
              duration={(index * 100 + 300).toString()}
            >
              <ForecastCard.Root is_day={current.is_day}>
                <ForecastCard.Header className="flex justify-between">
                  <ForecastCard.Name
                    geocoding_id={item.geocoding.id}
                    city={item.geocoding.city}
                    state={item.geocoding.state}
                    country_code={item.geocoding.country_code}
                    timestamp={item.geocoding.timestamp}
                    timezone={item.geocoding.timezone}
                    className="p-2"
                  />
                  <ForecastCard.ButtonsActions
                    geocoding_id={item.geocoding.id}
                  />
                </ForecastCard.Header>
                <ForecastCard.Content>
                  <div className="flex items-center">
                    <ForecastCard.Image
                      weather_code={current.weather_code}
                      is_day={Boolean(current.is_day)}
                    />
                    <ForecastCard.Temperature
                      temperature={current.temperature_2m}
                      temperature_unit={currentUnits.temperature_2m}
                    />
                  </div>
                  <ForecastCard.Description
                    weather_code={current.weather_code}
                    apparent_temperature={current.apparent_temperature}
                    apparent_temperature_unit={
                      currentUnits.apparent_temperature
                    }
                  />
                </ForecastCard.Content>
                <div className="grid grid-cols-2 lg:grid-cols-4 p-2 gap-2">
                  <ForecastCard.AirQuality us_aqi={currentAirQuality.us_aqi} />
                  <ForecastCard.Wind
                    title="Wind"
                    value={current.wind_speed_10m}
                    unit={currentUnits.wind_speed_10m}
                  />
                  <ForecastCard.Info
                    title="Humidity"
                    value={current.relative_humidity_2m}
                    unit={currentUnits.relative_humidity_2m}
                  />
                  <ForecastCard.Info
                    title="Visibility"
                    value={current.visibility / 1000}
                    unit="km"
                  />
                </div>
              </ForecastCard.Root>
            </TransitionAndIntersection>
          );
        })}
      </div>
    </>
  );
};
