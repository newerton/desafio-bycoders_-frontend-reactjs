import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from '@/components/layout/header';
import { seo } from '@/libs/seo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = seo();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-white ${inter.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
