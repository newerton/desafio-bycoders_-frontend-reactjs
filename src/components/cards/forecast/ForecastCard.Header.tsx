import { type VariantProps, cva } from 'class-variance-authority';
import { ReactNode, forwardRef } from 'react';

import { cn } from '@/libs/utils';

const forecastCardHeaderVariants = cva('flex justify-between', {
  variants: {},
  defaultVariants: {},
});

export interface ForecastCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof forecastCardHeaderVariants> {
  children: ReactNode;
}

const ForecastCardHeader = forwardRef<HTMLDivElement, ForecastCardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          forecastCardHeaderVariants({
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ForecastCardHeader.displayName = 'ForecastCardHeader';

export { ForecastCardHeader, forecastCardHeaderVariants };
