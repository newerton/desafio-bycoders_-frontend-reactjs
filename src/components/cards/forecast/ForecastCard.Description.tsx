import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';
import { wwoDescription } from '@/libs/utils/open-meteo';

const forecastCardDescriptionVariants = cva(
  'flex justify-center flex-col pr-2',
  {
    variants: {},
    defaultVariants: {},
  },
);

export interface ForecastCardDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof forecastCardDescriptionVariants> {
  weather_code: number;
  apparent_temperature: number;
  apparent_temperature_unit: string;
}

const ForecastCardDescription = forwardRef<
  HTMLDivElement,
  ForecastCardDescriptionProps
>(
  (
    {
      className,
      weather_code,
      apparent_temperature,
      apparent_temperature_unit,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          forecastCardDescriptionVariants({
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        <div className="line-clamp-2">{wwoDescription(weather_code)}</div>
        <div className="text-xs">
          Thermal Sensation {apparent_temperature}
          {apparent_temperature_unit}
        </div>
      </div>
    );
  },
);

ForecastCardDescription.displayName = 'ForecastCardDescription';

export { ForecastCardDescription, forecastCardDescriptionVariants };
