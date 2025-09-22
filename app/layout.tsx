import type { Metadata } from 'next';
import type React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Green Circle',
  description:
    'Connecting Ethiopian entrepreneurs with investors, mentors, and supporters.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} >
      <body className={` ${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
