// app/client-layout.tsx
'use client'

import { useEffect, useRef } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialized = useRef(false);

  // Apply smooth scrolling behavior
  useEffect(() => {
    // Apply CSS-based smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // For compatibility with older browsers or specific scroll behavior
    const smoothScrollPolyfill = () => {
      // Check if native smooth scroll is supported
      if ('scrollBehavior' in document.documentElement.style) return;
      
      // Simple smooth scroll polyfill for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          //@ts-ignore
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    };
    
    smoothScrollPolyfill();
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Setup lazy loading for images
  useEffect(() => {
    // Prevent running this effect twice in development mode with React strict mode
    if (initialized.current) return;
    initialized.current = true;
    
    // Check if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers that don't support IntersectionObserver
      const loadAllImages = () => {
        document.querySelectorAll('img[data-src]').forEach(img => {
          const element = img as HTMLImageElement;
          if (element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          }
        });
      };
      
      // Load all images immediately as fallback
      loadAllImages();
      return;
    }
    
    // Modern approach with IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          if (lazyImage.dataset.src) {
            // Create a new image to preload
            const img = new Image();
            img.onload = () => {
              lazyImage.src = lazyImage.dataset.src!;
              lazyImage.classList.add('loaded'); // Optional: for fade-in effects
            };
            img.src = lazyImage.dataset.src;
            
            lazyImage.removeAttribute('data-src');
            observer.unobserve(lazyImage);
          }
        }
      });
    }, { 
      rootMargin: '100px',
      threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Start observing all images with data-src attribute
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      observer.observe(img);
    });

    // Create a mutation observer to handle dynamically added images
    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element;
            if (element.tagName === 'IMG' && element.hasAttribute('data-src')) {
              observer.observe(element);
            } else {
              element.querySelectorAll('img[data-src]').forEach(img => {
                observer.observe(img);
              });
            }
          }
        });
      });
    });
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict={false}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LazyMotion>
  );
}