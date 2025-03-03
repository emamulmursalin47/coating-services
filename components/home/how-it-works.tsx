"use client"

import { useEffect, useState } from 'react'
import { Calendar, Clock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('how-it-works')
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
  
  const steps = [
    {
      icon: <Calendar className="h-12 w-12 text-primary" />,
      title: "Choose Your Service",
      description: "Select the ceramic coating package that best suits your vehicle and protection needs.",
      delay: "delay-0"
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "Schedule Appointment",
      description: "Pick a convenient date and time for your vehicle's ceramic coating service.",
      delay: "delay-300"
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-primary" />,
      title: "Enjoy Long-lasting Protection",
      description: "Drive away with a brilliantly shining vehicle protected for years to come.",
      delay: "delay-600"
    }
  ]
  
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our simple three-step process makes it easy to get your vehicle protected with our premium ceramic coating
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-muted z-0"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className={cn(
                "flex flex-col items-center text-center relative z-10 transition-all duration-1000 transform",
                step.delay,
                isVisible 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-10 opacity-0"
              )}
            >
              <div className="bg-background p-6 rounded-full mb-6 shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks