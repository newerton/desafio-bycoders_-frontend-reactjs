import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { FaLocationArrow } from 'react-icons/fa6';

import { cn } from '@/libs/utils';
import { calculateWindAngle } from '@/libs/utils/math';

const forecastCardWindVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

export interface ForecastCardWindProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof forecastCardWindVariants> {
  value: number;
  unit: string;
}

const ForecastCardWind = forwardRef<HTMLDivElement, ForecastCardWindProps>(
  ({ className, value, unit, ...props }, ref) => {
    return (
      <div
        className={cn(
          forecastCardWindVariants({
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        <div className="text-xs">Wind</div>
        <div className="flex items-center gap-1 whitespace-nowrap text-sm">
          {value} {unit}
          <span
            style={{
              transform: `rotate(${calculateWindAngle(value)}deg)`,
            }}
          >
            <FaLocationArrow className="-rotate-45" />
          </span>
        </div>
      </div>
    );
  },
);

ForecastCardWind.displayName = 'ForecastCardWind';

export { ForecastCardWind, forecastCardWindVariants };
