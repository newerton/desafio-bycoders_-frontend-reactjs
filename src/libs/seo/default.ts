import type { Metadata, Viewport } from 'next';

import { siteConfig } from '../config';
import { fullURL } from '../utils';

export const DEFAULT_METADATA: Metadata = {
  metadataBase: fullURL(),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    url: '/',
    siteName: siteConfig.name,
    locale: 'en-US',
    type: 'website',
  },
};

export const DEFAULT_VIEWPORT: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};
