import { type VariantProps, cva } from 'class-variance-authority';
import { ReactNode, forwardRef } from 'react';

import { cn } from '@/libs/utils';

const geocodintListRootVariants = cva(
  'flex flex-col text-left w-full border-2 border-stone-100 shadow-md p-3 gap-3',
  {
    variants: {},
    defaultVariants: {},
  },
);

export interface GeocodingListRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof geocodintListRootVariants> {
  children: ReactNode;
}

const GeocodingListRoot = forwardRef<HTMLDivElement, GeocodingListRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          geocodintListRootVariants({
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
GeocodingListRoot.displayName = 'GeocodingListRoot';

export { GeocodingListRoot, geocodintListRootVariants };
