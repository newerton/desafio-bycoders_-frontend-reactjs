import { type VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import { forwardRef } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

import { cn } from '@/libs/utils';
import { hours, isExpired } from '@/libs/utils/date';

const forecastCardNameVariants = cva('p-2', {
  variants: {},
  defaultVariants: {},
});

export interface ForecastCardNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof forecastCardNameVariants> {
  geocoding_id: string;
  country_code: string;
  city: string;
  state: string;
  timestamp: string;
  timezone: string;
}

const ForecastCardName = forwardRef<HTMLDivElement, ForecastCardNameProps>(
  (
    {
      className,
      geocoding_id,
      country_code,
      city,
      state,
      timestamp,
      timezone,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          forecastCardNameVariants({
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-2 mb-1">
          <Image
            src={`https://open-meteo.com/images/country-flags/${country_code.toLocaleLowerCase()}.svg`}
            alt={country_code}
            width={22}
            height={22}
            onError={(e) => {
              e.currentTarget.src = '/images/broken-image.png';
            }}
          />
          <div className=" text-base font-semibold whitespace-nowrap">
            {city}
            {state ? `, ${state}` : ''}
          </div>
        </div>
        <div className="text-xs flex gap-1 items-center">
          {hours(timestamp, 'America/Sao_Paulo')}{' '}
          {isExpired(timestamp) && (
            <FaExclamationTriangle title="Outdated data" color="red" />
          )}
        </div>
      </div>
    );
  },
);

ForecastCardName.displayName = 'ForecastCardName';

export { ForecastCardName, forecastCardNameVariants };
