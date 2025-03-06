"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BookingBar } from './bookingbar'

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="\videos\0304.mp4" type="video/mp4" />
          Your browser does not support the video tag.
          
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-3xl">
          <div className={cn(
            "transition-all duration-1000 transform",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Protect Your Car with Premium Ceramic Coating
            </h1>
          </div>
          
          <div className={cn(
            "transition-all duration-1000 delay-300 transform",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Shine & Protect – Long-lasting ceramic coating that shields your vehicle from environmental damage while maintaining a brilliant finish.
            </p>
          </div>
          
          <div className={cn(
            "flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 transform",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            
            <Button asChild variant="outline" size="lg" className="text-lg bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Link href="/services" className="flex items-center">
                View Services <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
     
    
        </div>
        <BookingBar/>
      </div>
      
      {/* Scroll indicator */}
      <div className={cn(
        "absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white transition-all duration-1000 delay-700",
        isLoaded ? "opacity-100" : "opacity-0"
      )}>
        <span className="text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mt-1"></div>
        </div>
      </div>
      
    </section>
  )
}

export default HeroSection
