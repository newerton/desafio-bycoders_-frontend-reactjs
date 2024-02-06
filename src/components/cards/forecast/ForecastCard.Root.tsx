import { type VariantProps, cva } from 'class-variance-authority';
import { ReactNode, forwardRef } from 'react';

import { cn } from '@/libs/utils';

const forecastCardRootVariants = cva(
  'flex flex-col border-2 shadow-md rounded-md p-2 bg-gradient-to-br from-10% via-30% to-60%',
  {
    variants: {
      is_day: {
        false: 'from-blue-200 via-blue-50 to-blue-50',
        true: 'from-yellow-200 via-yellow-50 to-yellow-50',
      },
    },
    defaultVariants: {
      is_day: true,
    },
  },
);

export interface ForecastCardRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof forecastCardRootVariants> {
  children: ReactNode;
  is_day: boolean;
}

const ForecastCardRoot = forwardRef<HTMLDivElement, ForecastCardRootProps>(
  ({ className, children, is_day, ...props }, ref) => {
    return (
      <div
        className={cn(
          forecastCardRootVariants({
            className,
            is_day: Boolean(is_day),
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

ForecastCardRoot.displayName = 'ForecastCardRoot';

export { ForecastCardRoot, forecastCardRootVariants };
