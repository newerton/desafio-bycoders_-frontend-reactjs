import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';

const cloudItemVariants = cva(
  'relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f9d300] to-[#3fb9e6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]',
  {
    variants: {
      left: {
        true: 'relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f9d300] to-[#3fb9e6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]',
      },
      right: {
        true: 'relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#f9d300] to-[#3fb9e6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]',
      },
    },
    defaultVariants: {
      left: false,
      right: false,
    },
  },
);

export interface CloudItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cloudItemVariants> {
  clipPath: string;
}

const CloudItem = forwardRef<HTMLDivElement, CloudItemProps>(
  ({ className, clipPath, left, right, ...props }, ref) => {
    return (
      <div
        className={cn(
          cloudItemVariants({
            className,
            left,
            right,
          }),
        )}
        ref={ref}
        aria-hidden="true"
        {...props}
        style={{ clipPath }}
      />
    );
  },
);

CloudItem.displayName = 'CloudItem';

export { CloudItem, cloudItemVariants };
