import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/libs/utils';

const skeletonRootVariants = cva('animate-pulse w-full', {
  variants: {},
  defaultVariants: {},
});

export interface SkeletonRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonRootVariants> {
  children?: React.ReactNode;
}

const SkeletonRoot = React.forwardRef<HTMLDivElement, SkeletonRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(skeletonRootVariants({ className }))}
        ref={ref}
        {...props}
      >
        {children}
        <span className="sr-only">Loading...</span>
      </div>
    );
  },
);
SkeletonRoot.displayName = 'SkeletonRoot';

export { SkeletonRoot, skeletonRootVariants };
