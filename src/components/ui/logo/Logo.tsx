import Image from 'next/image';
import { memo } from 'react';

import logo from '@/assets/images/icons/logo.png';

export const Logo = memo(() => {
  return (
    <div>
      <Image
        className="h-10 w-auto"
        src={logo}
        alt="Weather Forecast"
        width={50}
        height={50}
      />
    </div>
  );
});

Logo.displayName = 'Logo';
