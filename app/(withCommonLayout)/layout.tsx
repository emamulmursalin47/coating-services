import Footer from '@/components/footer';
import LenisProvider from '@/components/lenis-provider';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';

const CommonLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
              <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <LenisProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              {children}
              <Footer />
            </div>
          </LenisProvider>
          <Toaster />
        </ThemeProvider>
           
        </div>
    );
};

export default CommonLayout;