// ./app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CeramicShield Pro | Premium Ceramic Coating Services',
  description: 'Professional ceramic coating services to protect and enhance your vehicle with long-lasting shine and protection.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <main className="flex-1">{children}</main> 
      </body>
    </html>
  );
}