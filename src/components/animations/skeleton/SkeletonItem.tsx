import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/libs/utils';

const skeletonItemVariants = cva('bg-gray-200 rounded-md mb-4', {
  variants: {
    size: {
      default: 'h-4 ',
      md: 'h-3',
      lg: 'h-6',
      xl: 'h-8',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface SkeletonItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonItemVariants> {}

const SkeletonItem = React.forwardRef<HTMLDivElement, SkeletonItemProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        className={cn(skeletonItemVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
SkeletonItem.displayName = 'SkeletonItem';

export { SkeletonItem, skeletonItemVariants };
