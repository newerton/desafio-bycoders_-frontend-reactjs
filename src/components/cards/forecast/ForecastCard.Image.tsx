import { type VariantProps, cva } from 'class-variance-authority';
import Lottie from 'lottie-react';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';
import { wwoLottie } from '@/libs/utils/open-meteo';

const forecastCardImageVariants = cva('h-14 w-14 lg:h-20 lg:w-20', {
  variants: {},
  defaultVariants: {},
});

export interface ForecastCardImageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof forecastCardImageVariants> {
  weather_code: number;
  is_day: boolean;
}

const ForecastCardImage = forwardRef<HTMLDivElement, ForecastCardImageProps>(
  ({ className, weather_code, is_day, ...props }, ref) => {
    const data = wwoLottie(weather_code, is_day);
    return (
      <div
        className={cn(
          forecastCardImageVariants({
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        <Lottie animationData={data} width={20} height={20} loop />
      </div>
    );
  },
);

ForecastCardImage.displayName = 'ForecastCardImage';

export { ForecastCardImage, forecastCardImageVariants };
