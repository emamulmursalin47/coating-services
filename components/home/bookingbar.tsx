"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Car, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const locations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Miami",
  "San Francisco",
]

const carTypes = [
  { value: "sports", label: "Sports Car" },
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "luxury", label: "Luxury" },
  { value: "truck", label: "Truck" },
]

export const BookingBar = () => {
  const [location, setLocation] = useState<string>("New York")
  const [carType, setCarType] = useState<string>("sports")
  const [pickupDate, setPickupDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()

  return (
    <div className="relative z-20 mx-auto px-4 mt-24 max-w-5xl">
      <div className="bg-[#1a1a1a] text-white backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-700 flex items-center gap-4">
        
        {/* Location Selection */}
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[150px] bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border-gray-700">
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc} className="hover:bg-gray-700">
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Car Type Selection */}
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" />
          <Select value={carType} onValueChange={setCarType}>
            <SelectTrigger className="w-[140px] bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Vehicle type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border-gray-700">
              {carTypes.map((car) => (
                <SelectItem key={car.value} value={car.value} className="hover:bg-gray-700">
                  {car.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pick-up Date Selection */}
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[150px] bg-gray-800 border-gray-600 text-white",
                  !pickupDate && "text-gray-400"
                )}
              >
                {pickupDate ? format(pickupDate, "PPP") : "Pick-up Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-900 text-white border-gray-700" align="start">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                initialFocus
                //@ts-ignore
                disabled={(date) =>
                  date < new Date() || (returnDate && date > returnDate)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Return Date Selection */}
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[150px] bg-gray-800 border-gray-600 text-white",
                  !returnDate && "text-gray-400"
                )}
              >
                {returnDate ? format(returnDate, "PPP") : "Return Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-900 text-white border-gray-700" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                initialFocus
                //@ts-ignore
                disabled={(date) =>
                  date < new Date() || (pickupDate && date < pickupDate)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Book Now Button */}
        <div className="ml-auto">
          <Button
            asChild
            size="lg"
            className="px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition duration-200"
            disabled={!location || !carType || !pickupDate || !returnDate}
          >
            <Link
              href={`/booking?location=${location}&type=${carType}&pickup=${pickupDate?.toISOString()}&return=${returnDate?.toISOString()}`}
            >
              Book Now
            </Link>
          </Button>
        </div>

      </div>
    </div>
  )
}
