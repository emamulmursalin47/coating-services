import { Suspense } from 'react';
import BookingContent from './BookingContent';

// This must be a Server Component (no 'use client')
export default function BookingPage() {
  return (
    <main>
      <header>
       
      </header>

      <Suspense fallback={<div className="loading">Loading booking options...</div>}>
        <BookingContent />
      </Suspense>
    </main>
  );
}