'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
  Card,
  CardContent,
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
import { 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Calendar, 
  DollarSign, 
  Star, 
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Save,
  AlertCircle,
  Check,
  X
} from 'lucide-react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// Define schema for customer form validation
const customerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  location: z.string().min(2, { message: "Location is required" }),
  status: z.enum(["active", "inactive", "vip"]),
  vehicleMake: z.string().min(1, { message: "Vehicle make is required" }),
  vehicleModel: z.string().min(1, { message: "Vehicle model is required" }),
  vehicleYear: z.string().min(4, { message: "Valid year is required" }),
  notes: z.string().optional(),
})

// Define schema for service form validation
const serviceFormSchema = z.object({
  service: z.string().min(2, { message: "Service name is required" }),
  date: z.string().min(2, { message: "Date is required" }),
  amount: z.coerce.number().min(0, { message: "Amount must be a positive number" }),
  notes: z.string().optional(),
})

// Define types based on zod schemas
type CustomerFormValues = z.infer<typeof customerFormSchema>;
type ServiceFormValues = z.infer<typeof serviceFormSchema>;

// Define interfaces for our data structures
interface VehicleInfo {
  make: string;
  model: string;
  year: string;
}

interface Service {
  id: number;
  date: string;
  service: string;
  amount: number;
  notes?: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalSpent: number;
  lastVisit: string;
  status: 'active' | 'inactive' | 'vip';
  vehicleInfo: VehicleInfo;
  serviceHistory: Service[];
  notes?: string;
}

// Initial customer data
const initialCustomers: Customer[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    totalSpent: 2499,
    lastVisit: '2024-03-20',
    status: 'active',
    vehicleInfo: {
      make: 'BMW',
      model: 'M3',
      year: '2023'
    },
    serviceHistory: [
      {
        id: 1,
        date: '2024-03-20',
        service: 'Premium Ceramic Coating',
        amount: 799,
        notes: 'Full vehicle coating with 5-year warranty'
      },
      {
        id: 2,
        date: '2023-12-15',
        service: 'Paint Protection Film',
        amount: 1700,
        notes: 'Front bumper, hood, and fenders'
      }
    ],
    notes: 'VIP customer, prefers appointments on weekends'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(555) 234-5678',
    location: 'Los Angeles, CA',
    totalSpent: 1299,
    lastVisit: '2024-03-18',
    status: 'active',
    vehicleInfo: {
      make: 'Tesla',
      model: 'Model 3',
      year: '2024'
    },
    serviceHistory: [
      {
        id: 1,
        date: '2024-03-18',
        service: 'Basic Ceramic Coating',
        amount: 499,
        notes: 'Exterior only'
      },
      {
        id: 2,
        date: '2024-01-10',
        service: 'Interior Coating',
        amount: 800,
        notes: 'Full interior protection package'
      }
    ],
    notes: 'Referred by John Doe'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '(555) 345-6789',
    location: 'Chicago, IL',
    totalSpent: 3699,
    lastVisit: '2024-02-25',
    status: 'vip',
    vehicleInfo: {
      make: 'Porsche',
      model: '911',
      year: '2022'
    },
    serviceHistory: [
      {
        id: 1,
        date: '2024-02-25',
        service: 'Premium Ceramic Coating',
        amount: 1299,
        notes: 'Full vehicle with extra layer on hood'
      },
      {
        id: 2,
        date: '2023-10-05',
        service: 'Paint Correction',
        amount: 1200,
        notes: 'Two-stage correction'
      },
      {
        id: 3,
        date: '2023-10-02',
        service: 'Full Detail',
        amount: 1200,
        notes: 'Interior and exterior detail'
      }
    ],
    notes: 'Owns multiple vehicles, prefers premium services'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '(555) 456-7890',
    location: 'Miami, FL',
    totalSpent: 499,
    lastVisit: '2024-03-15',
    status: 'inactive',
    vehicleInfo: {
      make: 'Audi',
      model: 'Q5',
      year: '2021'
    },
    serviceHistory: [
      {
        id: 1,
        date: '2024-03-15',
        service: 'Express Detail',
        amount: 499,
        notes: 'Exterior wash and wax'
      }
    ],
    notes: 'First-time customer'
  }
]

// Format date for display
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return format(date, 'MMM dd, yyyy')
  } catch (error) {
    return dateString
  }
}

// Calculate total spent
const calculateTotalSpent = (services: Service[]): number => {
  return services.reduce((total, service) => total + service.amount, 0)
}

// Format status with appropriate color
interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'vip';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    vip: "bg-purple-100 text-purple-800",
  }
  
  return (
    <Badge variant="outline" className={cn("px-2 py-0.5 rounded-full", statusStyles[status])}>
      {status === 'vip' ? 'VIP' : status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export default function CustomersPage() {
  // State management
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState<boolean>(false)
  const [isEditCustomerOpen, setIsEditCustomerOpen] = useState<boolean>(false)
  const [isAddServiceOpen, setIsAddServiceOpen] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('details')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(5)

  // Forms
  const addCustomerForm = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      status: 'active',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      notes: '',
    }
  })

  const editCustomerForm = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      status: 'active',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      notes: '',
    }
  })

  const addServiceForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      service: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      amount: 0,
      notes: '',
    }
  })

  // Load initial data
  useEffect(() => {
    // In a real app, this would be an API call
    setCustomers(initialCustomers)
  }, [])

  // Update form values when editing a customer
  useEffect(() => {
    if (selectedCustomer && isEditCustomerOpen) {
      editCustomerForm.reset({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone,
        location: selectedCustomer.location,
        status: selectedCustomer.status,
        vehicleMake: selectedCustomer.vehicleInfo.make,
        vehicleModel: selectedCustomer.vehicleInfo.model,
        vehicleYear: selectedCustomer.vehicleInfo.year,
        notes: selectedCustomer.notes || '',
      })
    }
  }, [selectedCustomer, isEditCustomerOpen, editCustomerForm])

  // Filter customers based on search term and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)

  // Handle adding a new customer
  const handleAddCustomer = (data: CustomerFormValues) => {
    const newCustomer: Customer = {
      id: customers.length + 1,
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      totalSpent: 0,
      lastVisit: '-',
      status: data.status,
      vehicleInfo: {
        make: data.vehicleMake,
        model: data.vehicleModel,
        year: data.vehicleYear
      },
      serviceHistory: [],
      notes: data.notes,
    }
    
    setCustomers([...customers, newCustomer])
    setIsAddCustomerOpen(false)
    addCustomerForm.reset()
    toast.success('Customer added successfully')
  }

  // Handle editing a customer
  const handleEditCustomer = (data: CustomerFormValues) => {
    const updatedCustomers = customers.map(customer => {
      if (customer.id === selectedCustomer?.id) {
        return {
          ...customer,
          name: data.name,
          email: data.email,
          phone: data.phone,
          location: data.location,
          status: data.status,
          vehicleInfo: {
            make: data.vehicleMake,
            model: data.vehicleModel,
            year: data.vehicleYear
          },
          notes: data.notes,
        }
      }
      return customer
    })
    
    setCustomers(updatedCustomers)
    if (selectedCustomer) {
      setSelectedCustomer(updatedCustomers.find(c => c.id === selectedCustomer.id) || null)
    }
    setIsEditCustomerOpen(false)
    toast.success('Customer updated successfully')
  }

  // Handle adding a new service
  const handleAddService = (data: ServiceFormValues) => {
    if (!selectedCustomer) return;
    
    const newService: Service = {
      id: selectedCustomer.serviceHistory.length + 1,
      service: data.service,
      date: data.date,
      amount: data.amount,
      notes: data.notes,
    }
    
    const updatedCustomers = customers.map(customer => {
      if (customer.id === selectedCustomer.id) {
        const updatedServiceHistory = [...customer.serviceHistory, newService]
        const totalSpent = calculateTotalSpent(updatedServiceHistory)
        
        return {
          ...customer,
          serviceHistory: updatedServiceHistory,
          totalSpent: totalSpent,
          lastVisit: data.date,
        }
      }
      return customer
    })
    
    setCustomers(updatedCustomers)
    if (selectedCustomer) {
      setSelectedCustomer(updatedCustomers.find(c => c.id === selectedCustomer.id) || null)
    }
    setIsAddServiceOpen(false)
    addServiceForm.reset({
      service: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      amount: 0,
      notes: '',
    })
    toast.success('Service added successfully')
  }

  // Handle deleting a customer
  const handleDeleteCustomer = (id: number) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id)
    setCustomers(updatedCustomers)
    setSelectedCustomer(null)
    toast.success('Customer deleted successfully')
  }

  // Handle deleting a service
  const handleDeleteService = (serviceId: number) => {
    if (!selectedCustomer) return;
    
    const updatedCustomers = customers.map(customer => {
      if (customer.id === selectedCustomer.id) {
        const updatedServiceHistory = customer.serviceHistory.filter(service => service.id !== serviceId)
        const totalSpent = calculateTotalSpent(updatedServiceHistory)
        const lastVisit = updatedServiceHistory.length > 0 
          ? updatedServiceHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date 
          : '-'
        
        return {
          ...customer,
          serviceHistory: updatedServiceHistory,
          totalSpent: totalSpent,
          lastVisit: lastVisit,
        }
      }
      return customer
    })
    
    setCustomers(updatedCustomers)
    if (selectedCustomer) {
      setSelectedCustomer(updatedCustomers.find(c => c.id === selectedCustomer.id) || null)
    }
    toast.success('Service deleted successfully')
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Enter customer details to create a new profile.
              </DialogDescription>
            </DialogHeader>
            <Form {...addCustomerForm}>
              <form onSubmit={addCustomerForm.handleSubmit(handleAddCustomer)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addCustomerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addCustomerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addCustomerForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addCustomerForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addCustomerForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="vip">VIP</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Vehicle Information</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={addCustomerForm.control}
                      name="vehicleMake"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Make</FormLabel>
                          <FormControl>
                            <Input placeholder="BMW" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addCustomerForm.control}
                      name="vehicleModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model</FormLabel>
                          <FormControl>
                            <Input placeholder="M3" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addCustomerForm.control}
                      name="vehicleYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input placeholder="2023" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={addCustomerForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Additional customer notes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddCustomerOpen(false)}>Cancel</Button>
                  <Button type="submit">Add Customer</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select 
          value={statusFilter} 
          onValueChange={(value) => {
            setStatusFilter(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Customers</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Customer List */}
        <div className="md:col-span-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Customers</CardTitle>
              <div className="text-sm text-muted-foreground">
                Showing {filteredCustomers.length} customers
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.length > 0 ? (
                    currentItems.map((customer) => (
                      <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={() => setSelectedCustomer(customer)}>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                          </div>
                        </TableCell>
                        <TableCell onClick={() => setSelectedCustomer(customer)}>
                          <StatusBadge status={customer.status} />
                        </TableCell>
                        <TableCell onClick={() => setSelectedCustomer(customer)}>
                          ${customer.totalSpent.toLocaleString()}
                        </TableCell>
                        <TableCell onClick={() => setSelectedCustomer(customer)}>
                          {customer.lastVisit !== '-' ? formatDate(customer.lastVisit) : '-'}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setSelectedCustomer(customer)
                                      setIsEditCustomerOpen(true)
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit Customer</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to delete {customer.name}? This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                          className="bg-red-500 hover:bg-red-600"
                                          onClick={() => handleDeleteCustomer(customer.id)}
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete Customer</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <AlertCircle className="h-10 w-10 mb-2" />
                          <p>No customers found</p>
                          <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm">{currentPage} / {totalPages || 1}</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Customer Details */}
        <div className="md:col-span-4">
          {selectedCustomer ? (
            <motion.div
              key={selectedCustomer.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Customer Details</CardTitle>
                    <StatusBadge status={selectedCustomer.status} />
                  </div>
                </CardHeader>
                
                <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
                  <div className="px-6">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="services">Services</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="details" className="p-0">
                    <CardContent className="space-y-6 pt-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Mail className="h-4 w-4 mr-2" />
                            {selectedCustomer.email}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            
                            <Phone className="h-4 w-4 mr-2" />
                            
                            {selectedCustomer.phone}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            {selectedCustomer.location}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            Last Visit: {selectedCustomer.lastVisit !== '-' ? formatDate(selectedCustomer.lastVisit) : '-'}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Vehicle Information</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Make</p>
                            <p>{selectedCustomer.vehicleInfo.make}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Model</p>
                            <p>{selectedCustomer.vehicleInfo.model}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Year</p>
                            <p>{selectedCustomer.vehicleInfo.year}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Notes</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedCustomer.notes || 'No notes available'}
                        </p>
                      </div>
                    </CardContent>
                  </TabsContent>

                  <TabsContent value="services" className="p-0">
                    <CardContent className="space-y-6 pt-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Service History</h3>
                        <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Service
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Service</DialogTitle>
                              <DialogDescription>
                                Add a new service for {selectedCustomer.name}.
                              </DialogDescription>
                            </DialogHeader>
                            <Form {...addServiceForm}>
                              <form onSubmit={addServiceForm.handleSubmit(handleAddService)} className="space-y-4">
                                <FormField
                                  control={addServiceForm.control}
                                  name="service"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Service</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Service name" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={addServiceForm.control}
                                  name="date"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Date</FormLabel>
                                      <FormControl>
                                        <Input type="date" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={addServiceForm.control}
                                  name="amount"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Amount</FormLabel>
                                      <FormControl>
                                        <Input type="number" placeholder="0" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={addServiceForm.control}
                                  name="notes"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Notes</FormLabel>
                                      <FormControl>
                                        <Textarea placeholder="Additional notes" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <DialogFooter>
                                  <Button type="button" variant="outline" onClick={() => setIsAddServiceOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button type="submit">Add Service</Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                      </div>

                      {selectedCustomer.serviceHistory.length > 0 ? (
                        <div className="space-y-4">
                          {selectedCustomer.serviceHistory.map((service) => (
                            <div key={service.id} className="flex justify-between items-center p-4 border rounded-lg">
                              <div>
                                <p className="font-medium">{service.service}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(service.date)} - ${service.amount.toLocaleString()}
                                </p>
                                {service.notes && (
                                  <p className="text-sm text-muted-foreground mt-1">{service.notes}</p>
                                )}
                              </div>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Service</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this service? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-500 hover:bg-red-600"
                                      onClick={() => handleDeleteService(service.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
                          <Package className="h-10 w-10 mb-2" />
                          <p>No services found</p>
                        </div>
                      )}
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
              <UserPlus className="h-10 w-10 mb-2" />
              <p>Select a customer to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}