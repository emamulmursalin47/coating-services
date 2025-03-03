"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    name: "Michael Johnson",
    role: "BMW M3 Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    stars: 5,
    text: "The ceramic coating on my M3 is absolutely incredible. The depth and gloss are beyond what I expected, and water just beads right off. Six months in and it still looks freshly detailed!"
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Tesla Model 3 Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    stars: 5,
    text: "I was skeptical about ceramic coating at first, but the results speak for themselves. My Tesla looks amazing in any light, and cleaning is so much easier now. Definitely worth the investment."
  },
  {
    id: 3,
    name: "David Chen",
    role: "Porsche 911 Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    stars: 5,
    text: "The team did an exceptional job on my 911. The paint correction removed years of swirl marks, and the ceramic coating brought out a depth in the paint I didn't know was possible. Highly recommended!"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Audi Q5 Owner",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    stars: 4,
    text: "My SUV looks better than when I drove it off the lot. The ceramic coating has made maintenance so much easier, especially with kids. Bird droppings and tree sap wipe right off without damaging the finish."
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Mercedes C-Class Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    stars: 5,
    text: "The attention to detail was impressive. They took the time to explain the entire process and the results exceeded my expectations. My Mercedes has never looked better!"
  }
]

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('testimonials')
      if (element) {
        const position = element.getBoundingClientRect()
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true)
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from vehicle owners who have experienced the difference our ceramic coating makes
          </p>
        </div>
        
        <div className={cn(
          "transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary">
                            <Image 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={cn(
                                  "h-5 w-5",
                                  i < testimonial.stars ? "text-yellow-500 fill-yellow-500" : "text-muted"
                                )}
                              />
                            ))}
                          </div>
                          
                          <p className="text-lg italic mb-4">"{testimonial.text}"</p>
                          
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-background shadow-md"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-background shadow-md"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-colors",
                  index === activeIndex ? "bg-primary" : "bg-muted"
                )}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 flex justify-center gap-8 flex-wrap">
          <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-center">
            <Image 
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
              alt="Certified Professional"
              width={100}
              height={50}
              className="object-contain h-12"
            />
          </div>
          <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-center">
            <Image 
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
              alt="Eco-Friendly Products"
              width={100}
              height={50}
              className="object-contain h-12"
            />
          </div>
          <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-center">
            <Image 
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
              alt="5-Year Warranty"
              width={100}
              height={50}
              className="object-contain h-12"
            />
          </div>
          <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-center">
            <Image 
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
              alt="Premium Materials"
              width={100}
              height={50}
              className="object-contain h-12"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection