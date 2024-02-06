import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';

const forecastCardTemperatureVariants = cva(
  'text-3xl lg:text-5xl font-normal flex items-start',
  {
    variants: {},
    defaultVariants: {},
  },
);

export interface ForecastCardTemperatureProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof forecastCardTemperatureVariants> {
  temperature: number;
  temperature_unit: string;
}

const ForecastCardTemperature = forwardRef<
  HTMLDivElement,
  ForecastCardTemperatureProps
>(({ className, temperature, temperature_unit, ...props }, ref) => {
  return (
    <div
      className={cn(
        forecastCardTemperatureVariants({
          className,
        }),
      )}
      ref={ref}
      {...props}
    >
      {temperature}
      <span className="text-lg">{temperature_unit}</span>
    </div>
  );
});

ForecastCardTemperature.displayName = 'ForecastCardTemperature';

export { ForecastCardTemperature, forecastCardTemperatureVariants };
