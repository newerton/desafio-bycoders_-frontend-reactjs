import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';

const cloudItemVariants = cva(
  'relative z-0 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f9d300] to-[#3fb9e6] opacity-30 sm:w-[72.1875rem]',
  {
    variants: {
      left: {
        true: 'left-[calc(50%-11rem)] rotate-[30deg] sm:left-[calc(50%-30rem)]',
      },
      right: {
        true: 'left-[calc(50%+3rem)] sm:left-[calc(50%+36rem)]',
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
