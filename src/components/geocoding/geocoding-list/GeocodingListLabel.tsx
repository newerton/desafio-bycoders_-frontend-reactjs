import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';

const geocodingListNameVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

export interface GeocodingListLabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof geocodingListNameVariants> {
  city: string;
  state: string;
  country: string;
}

const GeocodingListLabel = forwardRef<HTMLDivElement, GeocodingListLabelProps>(
  ({ className, city, state, country, ...props }, ref) => {
    return (
      <div
        className={cn(
          geocodingListNameVariants({
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        {city}, {state ? `${state},` : ''} {country}
      </div>
    );
  },
);
GeocodingListLabel.displayName = 'GeocodingListLabel';

export { GeocodingListLabel, geocodingListNameVariants };
