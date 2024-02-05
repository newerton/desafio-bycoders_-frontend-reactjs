import { type VariantProps, cva } from 'class-variance-authority';
import { ReactNode, forwardRef } from 'react';

import { cn } from '@/libs/utils';

const pageHeaderRootVariants = cva('absolute inset-x-0 top-0 z-50', {
  variants: {},
  defaultVariants: {},
});

export interface PageHeaderRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderRootVariants> {
  children: ReactNode;
}

const PageHeaderRoot = forwardRef<HTMLDivElement, PageHeaderRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header
        className={cn(
          pageHeaderRootVariants({
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        {children}
      </header>
    );
  },
);
PageHeaderRoot.displayName = 'PageHeaderRoot';

export { PageHeaderRoot, pageHeaderRootVariants };
