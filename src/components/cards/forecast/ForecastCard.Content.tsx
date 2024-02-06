import { type VariantProps, cva } from 'class-variance-authority';
import { ReactNode, forwardRef } from 'react';

import { cn } from '@/libs/utils';

const forecastCardContentVariants = cva('flex gap-4 mb-3', {
  variants: {},
  defaultVariants: {},
});

export interface ForecastCardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof forecastCardContentVariants> {
  children: ReactNode;
}

const ForecastCardContent = forwardRef<
  HTMLDivElement,
  ForecastCardContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        forecastCardContentVariants({
          className,
        }),
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

ForecastCardContent.displayName = 'ForecastCardContent';

export { ForecastCardContent, forecastCardContentVariants };
