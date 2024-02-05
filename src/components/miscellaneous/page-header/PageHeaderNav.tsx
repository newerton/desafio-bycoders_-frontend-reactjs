import { type VariantProps, cva } from 'class-variance-authority';
import { ReactNode, forwardRef } from 'react';

import { cn } from '@/libs/utils';

const pageHeaderNavVariants = cva(
  'flex items-center justify-between p-6 lg:px-8',
  {
    variants: {},
    defaultVariants: {},
  },
);

export interface PageHeaderNavProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderNavVariants> {
  children: ReactNode;
}

const PageHeaderNav = forwardRef<HTMLDivElement, PageHeaderNavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        className={cn(
          pageHeaderNavVariants({
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        {children}
      </nav>
    );
  },
);
PageHeaderNav.displayName = 'PageHeaderNav';

export { PageHeaderNav, pageHeaderNavVariants };
