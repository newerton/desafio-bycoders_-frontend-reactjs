import { type VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';

const geocodingListImageVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

export interface GeocodingListImageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof geocodingListImageVariants> {
  code: string;
}

const GeocodingListImage = forwardRef<HTMLDivElement, GeocodingListImageProps>(
  ({ className, code, ...props }, ref) => {
    return (
      <div
        className={cn(
          geocodingListImageVariants({
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        <Image
          src={`https://open-meteo.com/images/country-flags/${code.toLocaleLowerCase()}.svg`}
          alt={code}
          width={20}
          height={20}
        />
      </div>
    );
  },
);
GeocodingListImage.displayName = 'GeocodingListImage';

export { GeocodingListImage, geocodingListImageVariants };
