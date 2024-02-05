import { type VariantProps, cva } from 'class-variance-authority';
import { ReactNode, forwardRef } from 'react';

import { cn } from '@/libs/utils';

const cloudRootVariants = cva(
  'absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl',
  {
    variants: {
      left: {
        true: '-top-40 sm:-top-80',
      },
      right: {
        true: 'top-[calc(100%-13rem)] sm:top-[calc(100%-30rem)]',
      },
    },
    defaultVariants: {
      left: false,
      right: false,
    },
  },
);

export interface CloudRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cloudRootVariants> {
  children: ReactNode;
}

const CloudRoot = forwardRef<HTMLDivElement, CloudRootProps>(
  ({ className, children, left, right, ...props }, ref) => {
    return (
      <div
        className={cn(
          cloudRootVariants({
            className,
            left,
            right,
          }),
        )}
        ref={ref}
        aria-hidden="true"
        {...props}
      >
        {children}
      </div>
    );
  },
);

CloudRoot.displayName = 'CloudRoot';

export { CloudRoot, cloudRootVariants };
