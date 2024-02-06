import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/libs/utils';

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

const forecastCardAirQualityVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

export interface ForecastCardAirQualityProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof forecastCardAirQualityVariants> {
  us_aqi: number;
}

const findUsAqiColor = (usAqi: number) => {
  return US_AQI_COLORS.find((color) => {
    return usAqi >= color.range[0] && usAqi <= color.range[1];
  });
};

const ForecastCardAirQuality = forwardRef<
  HTMLDivElement,
  ForecastCardAirQualityProps
>(({ className, us_aqi, ...props }, ref) => {
  const color = findUsAqiColor(us_aqi);

  return (
    <div
      className={cn(
        forecastCardAirQualityVariants({
          className,
        }),
      )}
      ref={ref}
      {...props}
    >
      <div className="text-xs">Air Quality</div>
      <div className="flex gap-1 items-center text-sm">
        <div className={twMerge(color?.bgColor, 'w-2 h-2 rounded-full')} />
        {us_aqi}
      </div>
    </div>
  );
});

ForecastCardAirQuality.displayName = 'ForecastCardAirQuality';

export { ForecastCardAirQuality, forecastCardAirQualityVariants };
