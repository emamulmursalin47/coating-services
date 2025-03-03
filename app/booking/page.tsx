/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useEffect, useRef } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'

import { useSearchParams } from "next/navigation"; // Correct imports


import { Calendar as CalendarIcon, Clock, Car, MapPin, ChevronRight } from 'lucide-react'

// Define TypeScript interfaces
interface ServiceType {
  id: string;
  title: string;
  price: string;
  duration: string;
  image: string;
}

interface BookingDetailsType {
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  make: string;
  model: string;
  year: string;
  notes: string;
}

// Sample service data from the services page
const services: ServiceType[] = [
  {
    id: 'basic-coating',
    title: 'Basic Ceramic Coating',
    price: '$499',
    duration: '4-5 hours',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'premium-coating',
    title: 'Premium Ceramic Shield',
    price: '$799',
    duration: '6-8 hours',
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ultimate-coating',
    title: 'Ultimate Ceramic Defense',
    price: '$1,299',
    duration: '1-2 days',
    image: 'https://images.unsplash.com/photo-1611821639601-d0a1db1490c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'paint-protection',
    title: 'Paint Protection Film',
    price: 'From $1,499',
    duration: '1-3 days',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'interior-coating',
    title: 'Interior Ceramic Coating',
    price: '$399',
    duration: '3-4 hours',
    image: 'https://images.unsplash.com/photo-1583836631333-f7edcf2ee78a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'maintenance',
    title: 'Maintenance Services',
    price: 'From $149',
    duration: '1-2 hours',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]

// Available time slots
const timeSlots: string[] = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM'
]

// Vehicle types
const vehicleTypes: string[] = [
  'Sedan',
  'SUV',
  'Truck',
  'Sports Car',
  'Luxury Vehicle',
  'Other'
]



export default function BookingPage() {

  const searchParams = useSearchParams(); // Get query params
  const preSelectedServiceId = searchParams.get("service"); // Correct way to get service ID

  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetailsType>({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    make: "",
    model: "",
    year: "",
    notes: "",
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const calendarSectionRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const summarySectionRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }

    const sections = [
      servicesSectionRef.current,
      calendarSectionRef.current,
      formSectionRef.current,
      summarySectionRef.current,
    ];

    sections.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2 * index,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, [step]);

  // Pre-select service from URL query param
  useEffect(() => {
    if (preSelectedServiceId) {
      const service = services.find((s) => s.id === preSelectedServiceId);
      if (service) {
        setSelectedService(service);
        setStep(2);
      }
    }
  }, [preSelectedServiceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      details: bookingDetails,
    });

    // Move to confirmation step
    handleNextStep();
  };
  
  return (
    <>
      <Head>
        <title>Book Your Ceramic Coating Service</title>
        <meta name="description" content="Schedule your ceramic coating service with our easy online booking system." />
      </Head>
      
      {/* Header */}
      <div ref={headerRef} className="bg-gradient-to-r from-primary/20 to-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Ceramic Coating Service</h1>
            <p className="text-xl text-muted-foreground">
              Protect your vehicle with our professional ceramic coating services.
            </p>
          </motion.div>
          
          {/* Booking Progress */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="flex justify-between">
              {['Select Service', 'Choose Date & Time', 'Your Details', 'Confirmation'].map((label, index) => {
                const stepNumber = index + 1
                return (
                  <motion.div 
                    key={label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <div 
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 
                        ${step > stepNumber 
                          ? 'bg-primary text-primary-foreground' 
                          : step === stepNumber 
                            ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' 
                            : 'bg-muted text-muted-foreground'}`}
                    >
                      {step > stepNumber ? <ChevronRight className="h-5 w-5" /> : stepNumber}
                    </div>
                    <span className={`text-sm hidden md:block ${step === stepNumber ? 'font-medium' : 'text-muted-foreground'}`}>
                      {label}
                    </span>
                  </motion.div>
                )
              })}
            </div>
            <div className="relative mt-3 mb-8">
              <div className="absolute top-0 left-0 right-0 h-1 bg-muted"></div>
              <div 
                className="absolute top-0 left-0 h-1 bg-primary transition-all duration-500"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <motion.div 
            ref={servicesSectionRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Select Your Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card 
                    className={`cursor-pointer h-full overflow-hidden transition-all ${
                      selectedService?.id === service.id
                        ? 'border-primary border-2 shadow-lg'
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="relative h-48">
                      <Image 
                        src={service.image} 
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-primary">{service.price}</span>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-4 w-4 mr-1" /> {service.duration}
                        </span>
                      </div>
                      {selectedService?.id === service.id && (
                        <div className="mt-2 text-center">
                          <Button size="sm" variant="outline" className="w-full">Selected</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button 
                size="lg" 
                onClick={handleNextStep} 
                disabled={!selectedService}
                className="px-8"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <motion.div 
            ref={calendarSectionRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Service Summary */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-8 md:mb-0 md:w-1/3"
              >
                <Card className="border border-muted">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Selected Service</h3>
                    {selectedService && (
                      <>
                        <div className="relative h-36 mb-4 rounded-md overflow-hidden">
                          <Image 
                            src={selectedService.image} 
                            alt={selectedService.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-medium mb-2">{selectedService.title}</h4>
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-primary">{selectedService.price}</span>
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-4 w-4 mr-1" /> {selectedService.duration}
                          </span>
                        </div>
                      </>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={handlePrevStep}
                    >
                      Change Service
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Calendar & Time Selection */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="md:w-2/3"
              >
                <h2 className="text-3xl font-bold mb-6">Choose Date & Time</h2>
                
                <div className="mb-6">
                  <Label className="text-lg mb-3 block">Select a Date</Label>
                  <div className="border rounded-lg p-4">
                    <Calendar
                      mode="single"
                      //@ts-ignore
                      selected={selectedDate}
                        //@ts-ignore
                      onSelect={setSelectedDate}
                      className="rounded-md"
                      disabled={(date) => {
                        // Disable past dates and Sundays
                        return date < new Date() || date.getDay() === 0;
                      }}
                    />
                  </div>
                </div>
                
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label className="text-lg mb-3 block">Select a Time</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          className="h-12"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <div className="mt-6 flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleNextStep}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* Step 3: Customer Details */}
        {step === 3 && (
          <motion.div 
            ref={formSectionRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Booking Summary */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-8 md:mb-0 md:w-1/3"
              >
                <Card className="border border-muted sticky top-8">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm text-muted-foreground mb-1">Service</h4>
                        <p className="font-medium">{selectedService?.title}</p>
                        <p className="text-primary font-bold">{selectedService?.price}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm text-muted-foreground mb-1">Date & Time</h4>
                        <p className="font-medium">
                          {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : ''}
                        </p>
                        <p className="font-medium">{selectedTime}</p>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setStep(2)}
                        >
                          Change Date/Time
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Customer Details Form */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="md:w-2/3"
              >
                <h2 className="text-3xl font-bold mb-6">Your Details</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={bookingDetails.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={bookingDetails.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={bookingDetails.phone}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="border-t pt-6 mt-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Car className="mr-2 h-5 w-5" /> Vehicle Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="vehicleType">Vehicle Type</Label>
                          <Select
                            value={bookingDetails.vehicleType}
                            onValueChange={(value) => setBookingDetails({...bookingDetails, vehicleType: value})}
                          >
                            <SelectTrigger id="vehicleType" className="mt-1">
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                            <SelectContent>
                              {vehicleTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="make">Make</Label>
                          <Input
                            id="make"
                            name="make"
                            value={bookingDetails.make}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                            placeholder="e.g. Toyota, BMW"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="model">Model</Label>
                          <Input
                            id="model"
                            name="model"
                            value={bookingDetails.model}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                            placeholder="e.g. Camry, X5"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="year">Year</Label>
                          <Input
                            id="year"
                            name="year"
                            value={bookingDetails.year}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                            placeholder="e.g. 2023"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={bookingDetails.notes}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Any special requests or information about your vehicle"
                        rows={4}
                      />
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={handlePrevStep}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit"
                      >
                        Complete Booking
                      </Button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* Step 4: Confirmation */}
        {step === 4 && (
          <motion.div 
            ref={summarySectionRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </motion.div>
            
            <h2 className="text-3xl font-bold mb-3">Booking Confirmed!</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for booking our ceramic coating service. We'll see you soon!
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-muted p-6 rounded-lg mb-8 text-left"
            >
              <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium">{selectedService?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <span className="font-medium">
                    {bookingDetails.year} {bookingDetails.make} {bookingDetails.model}
                  </span>
                </div>
              </div>
            </motion.div>
            
            <p className="text-muted-foreground mb-6">
              A confirmation email has been sent to <strong>{bookingDetails.email}</strong> with all the details.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/services">
                  Browse Other Services
                </Link>
              </Button>
              <Button asChild>
                <Link href="/">
                  Return to Homepage
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Location Information */}
      {step !== 4 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                  <h3 className="text-2xl font-bold mb-3">Our Location</h3>
                  <p className="text-muted-foreground mb-4">
                    We're conveniently located in the heart of the city. Feel free to visit us or call for more information about our services.
                  </p>
                  <div className="flex items-start mb-3">
                    <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">123 Ceramic Street</p>
                      <p className="text-muted-foreground">Detailing City, DC 12345</p>
                    </div>
                  </div>
                  <p className="font-medium">
                    Phone: (555) 123-4567
                  </p>
                  <p className="font-medium">
                    Hours: Mon-Sat 9AM-6PM
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="rounded-lg overflow-hidden border shadow-sm bg-background h-64">
                    {/* Placeholder for a map */}
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">Interactive Map Goes Here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}