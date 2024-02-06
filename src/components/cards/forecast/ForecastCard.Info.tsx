import { type VariantProps, cva } from 'class-variance-authority';
import { ReactNode, forwardRef } from 'react';

import { cn } from '@/libs/utils';

const forecastCardInfoVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

export interface ForecastCardInfoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof forecastCardInfoVariants> {
  title: string;
  value: string | number;
  unit: string | ReactNode;
}

const ForecastCardInfo = forwardRef<HTMLDivElement, ForecastCardInfoProps>(
  ({ className, title, value, unit, ...props }, ref) => {
    return (
      <div
        className={cn(
          forecastCardInfoVariants({
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        <div className="text-xs">{title}</div>
        <div className="flex items-center gap-1 whitespace-nowrap text-sm">
          {value} {unit}
        </div>
      </div>
    );
  },
);

ForecastCardInfo.displayName = 'ForecastCardInfo';

export { ForecastCardInfo, forecastCardInfoVariants };
