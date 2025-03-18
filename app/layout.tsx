// ./app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import LenisProvider from '@/components/lenis-provider';

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