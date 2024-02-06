import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/libs/utils';

const alertVariants = cva(
  'text-left w-full px-4 py-2 rounded-md font-normal text-base',
  {
    variants: {
      variant: {
        default: 'text-white bg-blue-400',
        error: 'text-white bg-red-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(alertVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Alert.displayName = 'Alert';

export { Alert, alertVariants };
