'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { useSearchParams } from "next/navigation"
import { Calendar as CalendarIcon, Clock, Car, ChevronRight } from 'lucide-react'

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
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
]

// Vehicle types
const vehicleTypes: string[] = [
  'Sedan', 'SUV', 'Truck', 'Sports Car', 'Luxury Vehicle', 'Other'
]

export default function BookingContent() {
  const searchParams = useSearchParams();
  const preSelectedServiceId = searchParams.get("service");
  const service = searchParams.get('service');
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
  };

  const handlePrevStep = () => {
    setStep(step - 1);
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
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 mt-20 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Compact Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Book Your Ceramic Coating</h1>
          
          {/* Simplified Progress Bar */}
          <div className="bg-background rounded-full h-2 mb-6 mt-6">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((step) / 4) * 100}%` }}
            ></div>
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between max-w-lg mx-auto">
            {['Service', 'Schedule', 'Details', 'Done'].map((label, index) => {
              const stepNumber = index + 1;
              return (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                      step >= stepNumber
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step > stepNumber ? <ChevronRight className="h-4 w-4" /> : stepNumber}
                  </div>
                  <span className={`text-xs mt-1 ${step === stepNumber ? 'font-medium' : 'text-muted-foreground'}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-lg p-6 mb-8">
          {/* Step 1: Service Selection - Simplified Grid */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Select Your Service</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Card 
                    key={service.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedService?.id === service.id
                        ? 'border-primary border-2 shadow'
                        : 'border-muted'
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="relative h-32">
                      <Image 
                        src={service.image} 
                        alt={service.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold">{service.title}</h3>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span className="font-bold text-primary">{service.price}</span>
                        <span className="text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {service.duration}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={handleNextStep} 
                  disabled={!selectedService}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Step 2: Combined Date & Time Selection */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Choose Date & Time</h2>
                <div className="flex items-center text-primary">
                  <span className="mr-2 font-medium">{selectedService?.title}</span>
                  <span className="font-bold">{selectedService?.price}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="bg-muted/20 p-4 rounded-lg">
                  <Label className="text-sm mb-2 block">Select a Date</Label>
                  <Calendar
                    mode="single"
                    //@ts-ignore
                    selected={selectedDate}
                       //@ts-ignore
                    onSelect={setSelectedDate}
                    className="rounded-md bg-background"
                    disabled={(date) => {
                      // Disable past dates and Sundays
                      return date < new Date() || date.getDay() === 0;
                    }}
                  />
                </div>
                
                {/* Time Slots */}
                <div>
                  <Label className="text-sm mb-2 block">Select a Time</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`justify-start ${selectedTime === time ? 'bg-primary' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="h-4 w-4 mr-2" /> {time}
                      </Button>
                    ))}
                  </div>
                  
                  {selectedDate && selectedTime && (
                    <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                      <p className="text-sm font-medium">Your appointment:</p>
                      <p className="text-lg font-bold">{format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}</p>
                    </div>
                  )}
                </div>
              </div>
              
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
          )}
          
          {/* Step 3: Simplified Customer Details Form */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Your Details</h2>
                <div className="text-sm text-right">
                  <p className="font-medium">{selectedService?.title}</p>
                  <p className="font-bold">{format(selectedDate as Date, 'MMM d')} at {selectedTime}</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Tabs for Personal and Vehicle Info */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
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
                      <Label htmlFor="email">Email</Label>
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
                      <Label htmlFor="phone">Phone</Label>
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
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg mb-6">
                  <h3 className="text-base font-semibold mb-3 flex items-center">
                    <Car className="mr-2 h-4 w-4" /> Vehicle Information
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="vehicleType" className="text-sm">Type</Label>
                      <Select
                        value={bookingDetails.vehicleType}
                        onValueChange={(value) => setBookingDetails({...bookingDetails, vehicleType: value})}
                      >
                        <SelectTrigger id="vehicleType" className="mt-1">
                          <SelectValue placeholder="Select" />
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
                      <Label htmlFor="make" className="text-sm">Make</Label>
                      <Input
                        id="make"
                        name="make"
                        value={bookingDetails.make}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="e.g. Toyota"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="model" className="text-sm">Model</Label>
                      <Input
                        id="model"
                        name="model"
                        value={bookingDetails.model}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="e.g. Camry"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="year" className="text-sm">Year</Label>
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
                
                <div className="mb-6">
                  <Label htmlFor="notes" className="text-sm">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={bookingDetails.notes}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Any special requests or information"
                    rows={2}
                  />
                </div>
                
                <div className="flex justify-between">
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
              </form>
            </motion.div>
          )}
          
          {/* Step 4: Simplified Confirmation */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for booking our ceramic coating service!
              </p>
              
              <div className="bg-muted/20 p-4 rounded-lg mb-6 text-left">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Service:</span>
                    <p className="font-medium">{selectedService?.title}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <p className="font-medium">{selectedService?.price}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <p className="font-medium">{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time:</span>
                    <p className="font-medium">{selectedTime}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Vehicle:</span>
                    <p className="font-medium">{bookingDetails.year} {bookingDetails.make} {bookingDetails.model}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                A confirmation email has been sent to <span className="font-medium">{bookingDetails.email}</span>
              </p>
              
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link href="/services">Browse Services</Link>
                </Button>
                <Button asChild>
                  <Link href="/">Return Home</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Contact Info - Simplified and Always Visible */}
        {step !== 4 && (
          <div className="max-w-4xl mx-auto bg-background rounded-lg p-4 text-center text-sm">
            <p className="text-muted-foreground">
              Need help? Contact us at (555) 123-4567 or visit us at 123 Ceramic Street, Detailing City
            </p>
          </div>
        )}
      </div>
    </div>
  )
}