'use client';

import { twMerge } from 'tailwind-merge';

import { hours } from '@/libs/utils/date';
import { useForecastsStore } from '@/stores';

const US_AQI_COLORS = [
  {
    bgColor: 'bg-green-500',
    range: [0, 50],
  },
  {
    bgColor: 'bg-yellow-500',
    range: [51, 100],
  },
  {
    bgColor: 'bg-orange-500',
    range: [101, 150],
  },
  {
    bgColor: 'bg-red-500',
    range: [151, 200],
  },
  {
    bgColor: 'bg-purple-500',
    range: [201, 300],
  },
  {
    bgColor: 'bg-stone-500',
    range: [301, 500],
  },
];
export const ForecastList = () => {
  const { forecasts } = useForecastsStore();

  return (
    <div className="lg:px-10 w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
      {forecasts?.map((item) => {
        const current = item.forecast.current;
        const currentUnits = item.forecast.current_units;
        const currentAirQuality = item.airQuality.current;

        const findUsAqiColor = (usAqi: number) => {
          return US_AQI_COLORS.find((color) => {
            return usAqi >= color.range[0] && usAqi <= color.range[1];
          });
        };

        const color = findUsAqiColor(currentAirQuality.us_aqi);

        return (
          <div
            key={item.geocoding.id}
            className="flex flex-col border-2 shadow-md rounded-md p-2"
          >
            <div>
              <div className="text-base font-semibold">
                {item.geocoding.name},{' '}
                {item.geocoding.admin1 || item.geocoding.admin2}
              </div>
              <div className="text-xs">
                {hours(item.geocoding.timestamp, item.geocoding.timezone)}
              </div>
            </div>
            <div>
              <div>
                <div>Imagem</div>
                <div>
                  {current.temperature_2m}{' '}
                  <span>{currentUnits.temperature_2m}</span>
                </div>
              </div>
              <div>
                <div>Ensolarado</div>
                <div>
                  Sensação Térmica {current.apparent_temperature}
                  {currentUnits.apparent_temperature}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <div>Qualidade do ar</div>
                <div className="flex gap-2 items-center">
                  <div
                    className={twMerge(color?.bgColor, 'w-3 h-3 rounded-full')}
                  />{' '}
                  {currentAirQuality.us_aqi}
                </div>
              </div>
              <div>
                <div>Vento</div>
                <div>
                  {current.wind_speed_10m} {currentUnits.wind_speed_10m}
                </div>
              </div>
              <div>
                <div>Umidade</div>
                <div>
                  {current.relative_humidity_2m}
                  {currentUnits.relative_humidity_2m}
                </div>
              </div>
              <div>
                <div>Visibilidade</div>
                <div>{current.visibility / 1000} km</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
