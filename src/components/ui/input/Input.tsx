import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';

const buttonVariants = cva(
  'bg-white shadow-md rounded-md px-4 py-2 border-solid border-stone-100 border-[1px] w-full',
  {
    variants: {
      hasError: {
        true: 'bg-red-50 border-red-200',
      },
    },
    defaultVariants: {
      hasError: false,
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof buttonVariants> {
  error?: string | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, error, ...props }, ref) => {
    const hasError: boolean = error && error?.length > 0 ? true : false;

    return (
      <input
        className={cn(
          buttonVariants({
            className,
            hasError,
          }),
        )}
        ref={ref}
        defaultValue={undefined}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input, buttonVariants };
