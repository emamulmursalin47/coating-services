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
  CardFooter,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Calendar as CalendarIcon, Clock, User, Package, Car, DollarSign, CreditCard, Bell, Users, BarChart2 } from 'lucide-react'

// Enhanced appointments data with all requested fields
const appointments = [
  {
    id: 1,
    customer: 'John Doe',
    service: 'Premium Ceramic Coating',
    servicePrice: 699.99,
    estimatedDuration: '4-5 hours',
    date: new Date(2024, 2, 25, 10, 0),
    status: 'scheduled',
    phone: '(555) 123-4567',
    email: 'john@example.com',
    vehicle: {
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      color: 'Red'
    },
    addons: ['Interior Protection', 'Wheel Coating'],
    notes: 'Customer requested extra attention to front bumper',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    assignedStaff: 'Mike Wilson',
    notificationsEnabled: true
  },
  {
    id: 2,
    customer: 'Jane Smith',
    service: 'Basic Ceramic Coating',
    servicePrice: 499.99,
    estimatedDuration: '3-4 hours',
    date: new Date(2024, 2, 25, 14, 30),
    status: 'in-progress',
    phone: '(555) 234-5678',
    email: 'jane@example.com',
    vehicle: {
      make: 'BMW',
      model: '3 Series',
      year: 2022,
      color: 'Black'
    },
    addons: [],
    notes: '',
    paymentStatus: 'partial',
    paymentMethod: 'Debit Card',
    assignedStaff: 'Alex Johnson',
    notificationsEnabled: true
  },
  {
    id: 3,
    customer: 'Mike Johnson',
    service: 'Paint Protection Film',
    servicePrice: 899.99,
    estimatedDuration: '5-6 hours',
    date: new Date(2024, 2, 26, 11, 0),
    status: 'completed',
    phone: '(555) 345-6789',
    email: 'mike@example.com',
    vehicle: {
      make: 'Audi',
      model: 'Q5',
      year: 2024,
      color: 'Silver'
    },
    addons: ['Full Front Package', 'Headlight Protection'],
    notes: 'Previous damage on rear quarter panel - already documented',
    paymentStatus: 'paid',
    paymentMethod: 'Cash',
    assignedStaff: 'Sarah Parker',
    notificationsEnabled: false
  }
]

// Available time slots for scheduling
const availableTimeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
]

// Staff members
const staffMembers = [
  'Mike Wilson', 'Alex Johnson', 'Sarah Parker', 'David Thompson'
]

// Services offered
const services = [
  { name: 'Basic Ceramic Coating', price: 499.99, duration: '3-4 hours' },
  { name: 'Premium Ceramic Coating', price: 699.99, duration: '4-5 hours' },
  { name: 'Ultimate Ceramic Shield', price: 899.99, duration: '5-6 hours' },
  { name: 'Paint Protection Film', price: 899.99, duration: '5-6 hours' },
  { name: 'Interior Protection', price: 299.99, duration: '2-3 hours' }
]

// Add-ons available
const availableAddons = [
  { name: 'Interior Protection', price: 149.99 },
  { name: 'Wheel Coating', price: 99.99 },
  { name: 'Headlight Protection', price: 79.99 },
  { name: 'Full Front Package', price: 299.99 }
]

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  pending: 'bg-purple-100 text-purple-800'
}

const paymentStatusColors = {
  paid: 'bg-green-100 text-green-800',
  unpaid: 'bg-red-100 text-red-800',
  partial: 'bg-yellow-100 text-yellow-800'
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedTab, setSelectedTab] = useState('appointments')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Sample data for analytics
  const popularServices = [
    { service: 'Premium Ceramic Coating', count: 15, revenue: 10499.85 },
    { service: 'Paint Protection Film', count: 12, revenue: 10799.88 },
    { service: 'Basic Ceramic Coating', count: 8, revenue: 3999.92 }
  ]
  
  const popularTimeSlots = [
    { slot: '10:00 AM', count: 18 },
    { slot: '2:00 PM', count: 14 },
    { slot: '11:00 AM', count: 11 }
  ]

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Appointment</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
              <DialogDescription>
                Add appointment details and schedule it in the system.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Service</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.name} value={service.name}>
                          {service.name} - ${service.price} ({service.duration})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Customer Name</label>
                  <input className="w-full p-2 border rounded-md" placeholder="Full name" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <input className="w-full p-2 border rounded-md" placeholder="Phone number" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <input className="w-full p-2 border rounded-md" placeholder="Email address" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Vehicle Details</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input className="p-2 border rounded-md" placeholder="Make" />
                    <input className="p-2 border rounded-md" placeholder="Model" />
                    <input className="p-2 border rounded-md" placeholder="Year" />
                    <input className="p-2 border rounded-md" placeholder="Color" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Appointment Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Time Slot</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Assign Staff</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map(staff => (
                        <SelectItem key={staff} value={staff}>{staff}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Add-ons</label>
                  <div className="space-y-2 mt-2">
                    {availableAddons.map(addon => (
                      <div key={addon.name} className="flex items-center">
                        <input type="checkbox" id={addon.name} className="mr-2" />
                        <label htmlFor={addon.name}>{addon.name} (+${addon.price})</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-medium">Notes/Instructions</label>
                <textarea 
                  className="w-full p-2 border rounded-md" 
                  rows={3} 
                  placeholder="Special requests or additional information"
                />
              </div>
              
              <div className="col-span-1 md:col-span-2 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Payment Status</label>
                    <Select defaultValue="unpaid">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Payment Method</label>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Credit Card</SelectItem>
                        <SelectItem value="debit">Debit Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Send Notifications</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Save Appointment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="appointments" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="analytics">Reports & Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Today's Schedule</h3>
                  <div className="space-y-2 text-sm">
                    {appointments
                      .filter(app => {
                        const today = new Date()
                        return app.date.getDate() === today.getDate() &&
                               app.date.getMonth() === today.getMonth() &&
                               app.date.getFullYear() === today.getFullYear()
                      })
                      .map(app => (
                        <div key={app.id} className="flex justify-between p-2 bg-gray-50 rounded">
                          <span>{format(app.date, 'h:mm a')}</span>
                          <span className="truncate max-w-[120px]">{app.customer}</span>
                          <Badge variant="outline" className={statusColors[app.status as keyof typeof statusColors]}>
                            {app.status}
                          </Badge>
                        </div>
                      ))}
                  </div>
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
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{appointment.customer}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Package className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <span>{appointment.service}</span>
                              <span className="text-sm text-muted-foreground ml-2">${appointment.servicePrice}</span>
                              <span className="text-sm text-muted-foreground ml-2">({appointment.estimatedDuration})</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <span>{format(appointment.date, 'h:mm a')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Car className="h-5 w-5 text-muted-foreground" />
                            <span>
                              {appointment.vehicle.year} {appointment.vehicle.make} {appointment.vehicle.model} ({appointment.vehicle.color})
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <span>Assigned: {appointment.assignedStaff}</span>
                          </div>
                          {appointment.addons.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {appointment.addons.map(addon => (
                                <Badge key={addon} variant="outline" className="bg-gray-100">
                                  {addon}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 md:mt-0 md:text-right space-y-3">
                          <div className="flex md:justify-end gap-2">
                            <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                              {appointment.status}
                            </Badge>
                            <Badge className={paymentStatusColors[appointment.paymentStatus as keyof typeof paymentStatusColors]}>
                              {appointment.paymentStatus}
                            </Badge>
                          </div>
                          <div className="flex items-center md:justify-end space-x-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{appointment.paymentMethod}</span>
                          </div>
                          <div className="flex items-center md:justify-end space-x-2">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {appointment.notificationsEnabled ? 'Notifications enabled' : 'No notifications'}
                            </span>
                          </div>
                          <div className="space-x-2 mt-4">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Reschedule</Button>
                            <Button variant="outline" size="sm">Cancel</Button>
                          </div>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium">Notes:</p>
                          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        </div>
                      )}
                      
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
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Most Popular Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularServices.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{item.service}</p>
                        <p className="text-sm text-muted-foreground">{item.count} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.revenue.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Most Popular Time Slots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularTimeSlots.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <p className="font-medium">{item.slot}</p>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{item.count}</span>
                        <div className="bg-blue-100 h-4" style={{ width: `${(item.count / 20) * 100}%`, maxWidth: '100px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5" />
                  Appointment Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-lg font-bold">35</p>
                    <p className="text-sm text-muted-foreground">Total Appointments</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-lg font-bold">28</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-lg font-bold">4</p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-lg font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Cancelled</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Monthly Revenue (Last 6 Months)</h3>
                  <div className="flex items-end h-40 gap-2">
                    {[4500, 5200, 4800, 6100, 7200, 6800].map((value, index) => (
                      <div key={index} className="relative flex-1">
                        <div 
                          className="bg-blue-500 rounded-t" 
                          style={{ height: `${(value / 8000) * 100}%` }}
                        ></div>
                        <p className="text-xs text-center mt-1">
                          {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'][index]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}