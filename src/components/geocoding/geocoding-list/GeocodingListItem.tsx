'use client';

import { useMutation } from '@tanstack/react-query';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/libs/utils';
import { AirQualityResponse, getAirQuality } from '@/services/air-quality';
import {
  ForecastProps,
  ForecastResponse,
  getForecast,
} from '@/services/forecast';
import { GeocodingListResponse } from '@/services/gecoding';
import { useForecastsStore } from '@/stores';

const geocodingListItemVariants = cva(
  'flex hover:bg-stone-100 p-3 rounded-md justify-between items-center',
  {
    variants: {
      cursor: {
        pointer: 'cursor-pointer',
        'not-allowed': 'cursor-not-allowed',
      },
    },
    defaultVariants: {},
  },
);

export interface GeocodingListItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof geocodingListItemVariants> {
  children: React.ReactNode;
  item: GeocodingListResponse;
}

const GeocodingListItem = forwardRef<HTMLDivElement, GeocodingListItemProps>(
  ({ className, children, item, ...props }, ref) => {
    const [geocoding, setGeocoding] = useState<GeocodingListResponse | null>(
      null,
    );

    const [added, setAdded] = useState<boolean>(false);

    const { addForecast, findForecast } = useForecastsStore();

    const mutation = useMutation({
      mutationFn: (data: ForecastProps) => {
        const forecastResult = getForecast(data);
        const airQualityResult = getAirQuality(data);

        return Promise.all([forecastResult, airQualityResult]);
      },
      onSuccess: async ([forecastData, airQualityData]: [
        ForecastResponse,
        AirQualityResponse,
      ]) => {
        if (!geocoding) {
          return null;
        }

        setAdded(true);
        addForecast({
          geocoding,
          forecast: forecastData,
          airQuality: airQualityData,
        });
      },
    });

    const handleAdd = useCallback(
      (item: GeocodingListResponse) => {
        if (!added) {
          setGeocoding(item);
          mutation.mutate({
            latitude: item.latitude.toString(),
            longitude: item.longitude.toString(),
          });
        }
      },
      [added, mutation],
    );

    useEffect(() => {
      if (item.id) {
        const itemAdded = findForecast(item.id);
        setAdded(!!itemAdded);
      }
    }, [item.id, findForecast]);

    return (
      <div
        className={cn(
          geocodingListItemVariants({
            className,
            cursor: added ? 'not-allowed' : 'pointer',
          }),
        )}
        ref={ref}
        onClick={() => handleAdd(item)}
        {...props}
      >
        {children}
        <div>
          {added && <FaRegCircleCheck size={20} />}
          {!added && !mutation.isPending && 'Add'}
          {mutation.isPending && 'Adding...'}
        </div>
      </div>
    );
  },
);
GeocodingListItem.displayName = 'GeocodingListItem';

export { GeocodingListItem, geocodingListItemVariants };
