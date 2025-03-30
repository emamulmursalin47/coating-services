/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { format, parseISO, isAfter, isBefore, isToday, addDays } from 'date-fns'
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Map, 
  Car, 
  User, 
  Plus, 
  Filter, 
  Search,
  Check,
  X,
  Edit,
  Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

// Sample data
const initialAppointments = [
  {
    id: '1',
    title: 'Regular Maintenance',
    date: '2025-04-02T10:00:00',
    duration: 60,
    location: 'AutoCare Service Center',
    vehicle: 'Tesla Model 3 (2023)',
    technician: 'Mike Johnson',
    status: 'upcoming',
    notes: 'Oil change, tire rotation, and general inspection'
  },
  {
    id: '2',
    title: 'Brake Inspection',
    date: '2025-03-31T14:30:00',
    duration: 45,
    location: 'AutoCare Service Center',
    vehicle: 'Tesla Model 3 (2023)',
    technician: 'Sarah Wilson',
    status: 'upcoming',
    notes: 'Customer reported squeaking noise during braking'
  },
  {
    id: '3',
    title: 'Annual Service',
    date: '2025-03-25T09:00:00',
    duration: 120,
    location: 'Premium Auto Center',
    vehicle: 'BMW X5 (2022)',
    technician: 'Robert Davis',
    status: 'completed',
    notes: 'Comprehensive annual service including all fluids and filters'
  },
  {
    id: '4',
    title: 'Tire Replacement',
    date: '2025-03-15T11:30:00',
    duration: 90,
    location: 'AutoCare Service Center',
    vehicle: 'Tesla Model 3 (2023)',
    technician: 'Mike Johnson',
    status: 'completed',
    notes: 'Replaced all four tires with Michelin Pilot Sport 4'
  },
  {
    id: '5',
    title: 'AC System Check',
    date: '2025-03-10T15:00:00',
    duration: 60,
    location: 'Cool Air Specialists',
    vehicle: 'BMW X5 (2022)',
    technician: 'Jennifer Lopez',
    status: 'completed',
    notes: 'Customer reported weak cooling, system recharged and leak fixed'
  }
]

// Service locations for dropdown
const serviceLocations = [
  'AutoCare Service Center',
  'Premium Auto Center',
  'Cool Air Specialists',
  'Elite Auto Maintenance',
  'City Central Mechanics'
]

// Vehicle options for dropdown
const vehicles = [
  'Tesla Model 3 (2023)',
  'BMW X5 (2022)'
]

// Technicians for dropdown
const technicians = [
  'Mike Johnson',
  'Sarah Wilson',
  'Robert Davis',
  'Jennifer Lopez',
  'David Smith'
]

export default function AppointmentsPage() {
  // State
  const [appointments, setAppointments] = useState(initialAppointments)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterVehicle, setFilterVehicle] = useState('all')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null)
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: new Date(),
    time: '10:00',
    duration: 60,
    location: serviceLocations[0],
    vehicle: vehicles[0],
    technician: technicians[0],
    notes: ''
  })
  const [isEditing, setIsEditing] = useState(false)

  // Filter appointments based on search, status, and vehicle
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.notes.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus
    const matchesVehicle = filterVehicle === 'all' || appointment.vehicle === filterVehicle
    
    return matchesSearch && matchesStatus && matchesVehicle
  })

  // Group appointments by status
  const upcomingAppointments = filteredAppointments.filter(
    app => app.status === 'upcoming' && isAfter(parseISO(app.date), new Date())
  ).sort((a, b) => (parseISO(a.date).getTime() - parseISO(b.date).getTime()))
  
  const todayAppointments = filteredAppointments.filter(
    app => isToday(parseISO(app.date))
  ).sort((a, b) => (parseISO(a.date).getTime() - parseISO(b.date).getTime()))
  
  const pastAppointments = filteredAppointments.filter(
    app => app.status === 'completed' || isBefore(parseISO(app.date), new Date())
  ).sort((a, b) => (parseISO(b.date).getTime() - parseISO(a.date).getTime())) // Newest first

  // Handle form submission
  const handleAddAppointment = () => {
    const formattedDate = `${format(newAppointment.date, 'yyyy-MM-dd')}T${newAppointment.time}:00`
    
    const appointmentToAdd = {
      id: isEditing ? selectedAppointment! : Date.now().toString(),
      title: newAppointment.title,
      date: formattedDate,
      duration: newAppointment.duration,
      location: newAppointment.location,
      vehicle: newAppointment.vehicle,
      technician: newAppointment.technician,
      status: 'upcoming',
      notes: newAppointment.notes
    }

    if (isEditing) {
      setAppointments(appointments.map(app => 
        app.id === selectedAppointment ? appointmentToAdd : app
      ))
    } else {
      setAppointments([...appointments, appointmentToAdd])
    }
    
    // Reset form
    setShowAddDialog(false)
    setNewAppointment({
      title: '',
      date: new Date(),
      time: '10:00',
      duration: 60,
      location: serviceLocations[0],
      vehicle: vehicles[0],
      technician: technicians[0],
      notes: ''
    })
    setIsEditing(false)
  }

  // Handle edit appointment
  const handleEditAppointment = (appointment: any) => {
    setSelectedAppointment(appointment.id)
    setIsEditing(true)
    
    const appointmentDate = parseISO(appointment.date)
    
    setNewAppointment({
      title: appointment.title,
      date: appointmentDate,
      time: format(appointmentDate, 'HH:mm'),
      duration: appointment.duration,
      location: appointment.location,
      vehicle: appointment.vehicle,
      technician: appointment.technician,
      notes: appointment.notes
    })
    
    setShowAddDialog(true)
  }

  // Handle delete appointment
  const confirmDelete = (id: string) => {
    setSelectedAppointment(id)
    setShowDeleteConfirm(true)
  }

  const handleDeleteAppointment = () => {
    setAppointments(appointments.filter(app => app.id !== selectedAppointment))
    setShowDeleteConfirm(false)
  }

  // Handle mark as completed
  const markAsCompleted = (id: string) => {
    setAppointments(appointments.map(app => 
      app.id === id ? {...app, status: 'completed'} : app
    ))
  }

  // Render appointment card
  const AppointmentCard = ({ appointment }: { appointment: any }) => {
    const appointmentDate = parseISO(appointment.date)
    const isPast = isBefore(appointmentDate, new Date()) && !isToday(appointmentDate)
    
    return (
      <Card className={cn(
        "mb-4",
        appointment.status === 'completed' ? "opacity-75" : ""
      )}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{appointment.title}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {format(appointmentDate, 'EEEE, MMMM d, yyyy')} at {format(appointmentDate, 'h:mm a')}
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                {appointment.duration} min
              </CardDescription>
            </div>
            
            <Badge variant={
              appointment.status === 'completed' ? "secondary" : 
              isPast ? "destructive" : 
              isToday(appointmentDate) ? "default" : "outline"
            }>
              {appointment.status === 'completed' ? "Completed" : 
               isPast ? "Missed" : 
               isToday(appointmentDate) ? "Today" : "Upcoming"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Map className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{appointment.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Car className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{appointment.vehicle}</span>
              </div>
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Technician: {appointment.technician}</span>
              </div>
            </div>
            
            {appointment.notes && (
              <div className="text-sm">
                <p className="text-muted-foreground mb-1">Notes:</p>
                <p>{appointment.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Manage Appointment</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {appointment.status !== 'completed' && (
                <DropdownMenuItem onClick={() => markAsCompleted(appointment.id)}>
                  <Check className="h-4 w-4 mr-2" />
                  Mark as Completed
                </DropdownMenuItem>
              )}
              
              <DropdownMenuItem onClick={() => handleEditAppointment(appointment)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => confirmDelete(appointment.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Cancel Appointment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    )
  }

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">
              Schedule and manage your vehicle service appointments
            </p>
          </div>
          
          <Button 
            className="md:w-auto w-full" 
            onClick={() => {
              setIsEditing(false)
              setShowAddDialog(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterVehicle} onValueChange={setFilterVehicle}>
              <SelectTrigger>
                <SelectValue placeholder="Vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vehicles</SelectItem>
                {vehicles.map(vehicle => (
                  <SelectItem key={vehicle} value={vehicle}>
                    {vehicle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="today" className="flex-1 md:flex-none">
              Today
              {todayAppointments.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {todayAppointments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex-1 md:flex-none">
              Upcoming
              {upcomingAppointments.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {upcomingAppointments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past" className="flex-1 md:flex-none">
              Past
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-4">
            {todayAppointments.length > 0 ? (
              todayAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">No appointments for today</h3>
                <p className="text-muted-foreground mt-1">
                  You have a free day! Schedule a new appointment if needed.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">No upcoming appointments</h3>
                <p className="text-muted-foreground mt-1">
                  Your schedule is clear. Click "Schedule Appointment" to create a new one.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="mt-4">
            {pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">No past appointments</h3>
                <p className="text-muted-foreground mt-1">
                  Your service history is empty.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add/Edit Appointment Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Appointment' : 'Schedule New Appointment'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update the details of your existing appointment.'
                : 'Fill out the form below to schedule a new service appointment for your vehicle.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Service Type</Label>
              <Input
                id="title"
                placeholder="e.g. Oil Change, Tire Rotation"
                value={newAppointment.title}
                onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newAppointment.date ? format(newAppointment.date, 'PPP') : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newAppointment.date}
                      onSelect={(date) => setNewAppointment({...newAppointment, date: date || new Date()})}
                      disabled={(date) => date < addDays(new Date(), -1)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Select 
                  value={newAppointment.time}
                  onValueChange={(value) => setNewAppointment({...newAppointment, time: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select 
                  value={newAppointment.duration.toString()}
                  onValueChange={(value) => setNewAppointment({...newAppointment, duration: Number(value)})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Service Location</Label>
                <Select 
                  value={newAppointment.location}
                  onValueChange={(value) => setNewAppointment({...newAppointment, location: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceLocations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="vehicle">Vehicle</Label>
                <Select 
                  value={newAppointment.vehicle}
                  onValueChange={(value) => setNewAppointment({...newAppointment, vehicle: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map(vehicle => (
                      <SelectItem key={vehicle} value={vehicle}>
                        {vehicle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="technician">Preferred Technician</Label>
                <Select 
                  value={newAppointment.technician}
                  onValueChange={(value) => setNewAppointment({...newAppointment, technician: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any available">Any available</SelectItem>
                    {technicians.map(tech => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any special instructions or details about the service needed"
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAppointment} disabled={!newAppointment.title || !newAppointment.date}>
              {isEditing ? 'Update Appointment' : 'Schedule Appointment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Keep Appointment
            </Button>
            <Button variant="destructive" onClick={handleDeleteAppointment}>
              Yes, Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}