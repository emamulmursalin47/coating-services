// ./components/lenis-provider.tsx
'use client';

import { useEffect, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

export default function LenisProvider({ 
  children 
}: { 
  children: ReactNode 
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      //@ts-ignore
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}