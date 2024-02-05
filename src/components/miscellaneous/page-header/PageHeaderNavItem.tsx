import { type VariantProps, cva } from 'class-variance-authority';
import Link, { type LinkProps } from 'next/link';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';

const pageHeaderNavItemVariants = cva(
  'text-sm font-semibold leading-6 text-gray-900',
  {
    variants: {},
    defaultVariants: {},
  },
);

export interface PageHeaderNavItemProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    LinkProps<'a'>,
    VariantProps<typeof pageHeaderNavItemVariants> {
  name: string;
}

const PageHeaderNavItem = forwardRef<HTMLAnchorElement, PageHeaderNavItemProps>(
  ({ className, name, ...props }, ref) => {
    return (
      <Link
        className={cn(
          pageHeaderNavItemVariants({
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        {name}
      </Link>
    );
  },
);
PageHeaderNavItem.displayName = 'PageHeaderNavItem';

export { PageHeaderNavItem, pageHeaderNavItemVariants };
