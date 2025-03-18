'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar as CalendarIcon, Clock, User, Package } from 'lucide-react'

// Sample appointments data
const appointments = [
  {
    id: 1,
    customer: 'John Doe',
    service: 'Premium Ceramic Coating',
    date: new Date(2024, 2, 25, 10, 0),
    status: 'scheduled',
    phone: '(555) 123-4567',
    email: 'john@example.com'
  },
  {
    id: 2,
    customer: 'Jane Smith',
    service: 'Basic Ceramic Coating',
    date: new Date(2024, 2, 25, 14, 30),
    status: 'in-progress',
    phone: '(555) 234-5678',
    email: 'jane@example.com'
  },
  {
    id: 3,
    customer: 'Mike Johnson',
    service: 'Paint Protection Film',
    date: new Date(2024, 2, 26, 11, 0),
    status: 'completed',
    phone: '(555) 345-6789',
    email: 'mike@example.com'
  }
]

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredAppointments = appointments.filter(appointment => {
    const sameDate = selectedDate && 
      appointment.date.getDate() === selectedDate.getDate() &&
      appointment.date.getMonth() === selectedDate.getMonth() &&
      appointment.date.getFullYear() === selectedDate.getFullYear()
    
    return sameDate && (selectedStatus === 'all' || appointment.status === selectedStatus)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <Button>Create Appointment</Button>
      </div>

      <div className="grid grid-cols-1 md: grid-cols-12 gap-6">
        {/* Calendar and Filters */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Filter by Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="md:col-span-8 space-y-4">
          {selectedDate && (
            <h2 className="text-xl font-semibold mb-4">
              Appointments for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
          )}
          
          {filteredAppointments.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">No appointments found for this date</p>
              </CardContent>
            </Card>
          ) : (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{appointment.customer}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="h-5 w-5 text-muted-foreground" />
                        <span>{appointment.service}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span>{format(appointment.date, 'h:mm a')}</span>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[appointment.status as keyof typeof statusColors]}`}>
                        {appointment.status}
                      </span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Cancel</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                    <p>Phone: {appointment.phone}</p>
                    <p>Email: {appointment.email}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}