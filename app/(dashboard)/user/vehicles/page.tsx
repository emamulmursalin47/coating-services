/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import {
  Car,
  Calendar,
  FileText,
  Settings,
  Fuel,
  Gauge,
  Shield,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  Check,
  MoreHorizontal,
  BarChart,
  ArrowUpRight,
  Sparkles,
  RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

// Sample data for vehicles
const initialVehicles = [
  {
    id: "1",
    name: "Tesla Model 3",
    image: "/api/placeholder/400/250",
    year: "2023",
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range",
    vin: "5YJ3E1EA1PF123456",
    licensePlate: "ELC-3210",
    color: "Midnight Silver",
    purchaseDate: "2023-03-15",
    odometer: 12650,
    fuelType: "Electric",
    batteryCapacity: "82 kWh",
    range: "358 miles",
    nextService: "2025-04-25",
    serviceInterval: "24 months / 25,000 miles",
    status: "good",
    issues: [],
    documents: [
      { id: "doc1", name: "Purchase Agreement", date: "2023-03-15" },
      { id: "doc2", name: "Warranty Information", date: "2023-03-15" },
      { id: "doc3", name: "Insurance Policy", date: "2025-01-10" }
    ],
    maintenanceHistory: [
      { id: "maint1", service: "Tire Rotation", date: "2024-10-15", odometer: 10500 },
      { id: "maint2", service: "Software Update", date: "2024-07-23", odometer: 8200 }
    ],
    warranty: {
      basic: { name: "Basic Vehicle Limited Warranty", expiration: "2027-03-15", active: true },
      battery: { name: "Battery & Drive Unit", expiration: "2031-03-15", active: true },
      extended: null
    }
  },
  {
    id: "2",
    name: "BMW X5",
    image: "/api/placeholder/400/250",
    year: "2022",
    make: "BMW",
    model: "X5",
    trim: "xDrive40i",
    vin: "5UXCR6C01N9D12345",
    licensePlate: "LUX-8800",
    color: "Alpine White",
    purchaseDate: "2022-05-20",
    odometer: 22350,
    fuelType: "Gasoline",
    engineSize: "3.0L Inline-6 Turbo",
    fuelEfficiency: "23 MPG combined",
    nextService: "2025-05-10",
    serviceInterval: "12 months / 10,000 miles",
    status: "warning",
    issues: [
      { id: "issue1", description: "Oil change due soon", severity: "warning" }
    ],
    documents: [
      { id: "doc4", name: "Purchase Agreement", date: "2022-05-20" },
      { id: "doc5", name: "Warranty Booklet", date: "2022-05-20" },
      { id: "doc6", name: "Service Records", date: "2024-05-25" }
    ],
    maintenanceHistory: [
      { id: "maint3", service: "Oil Change & Inspection", date: "2024-05-25", odometer: 15300 },
      { id: "maint4", service: "Brake Fluid Flush", date: "2023-05-30", odometer: 10200 },
      { id: "maint5", service: "Air Filter Replacement", date: "2023-05-30", odometer: 10200 }
    ],
    warranty: {
      basic: { name: "BMW New Vehicle Limited Warranty", expiration: "2026-05-20", active: true },
      powertrain: { name: "Powertrain Limited Warranty", expiration: "2028-05-20", active: true },
      extended: { name: "BMW Extended Service Contract", expiration: "2030-05-20", active: true }
    }
  }
]

// Make and model options for dropdowns
const carMakes = [
  "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Buick", "Cadillac", 
  "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", 
  "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", 
  "Lexus", "Lincoln", "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", 
  "Nissan", "Porsche", "Ram", "Rolls-Royce", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"
]

const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid", "Hydrogen"]

export default function VehiclesPage() {
  // State
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [currentVehicleId, setCurrentVehicleId] = useState(vehicles[0]?.id || null)
  const [isEditing, setIsEditing] = useState(false)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false)
  
  // Get current vehicle
  const currentVehicle = vehicles.find(v => v.id === currentVehicleId) || vehicles[0]
  
  // New vehicle form state
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    year: new Date().getFullYear().toString(),
    make: "",
    model: "",
    trim: "",
    vin: "",
    licensePlate: "",
    color: "",
    purchaseDate: new Date(),
    odometer: 0,
    fuelType: "Gasoline",
    nextService: "",
    serviceInterval: "",
    image: "/api/placeholder/400/250"
  })
  
  // Document form state
  const [newDocument, setNewDocument] = useState({
    name: "",
    date: new Date()
  })
  
  // Maintenance form state
  const [newMaintenance, setNewMaintenance] = useState({
    service: "",
    date: new Date(),
    odometer: currentVehicle?.odometer || 0
  })
  
  // Handle adding/editing vehicle
 const handleSaveVehicle = () => {
    //@ts-ignore
  const vehicleToSave: Vehicle = {
    id: isEditing ? selectedVehicle! : Date.now().toString(),
    name: `${newVehicle.year} ${newVehicle.make} ${newVehicle.model}`,
    image: newVehicle.image,
    year: newVehicle.year,
    make: newVehicle.make,
    model: newVehicle.model,
    trim: newVehicle.trim,
    vin: newVehicle.vin,
    licensePlate: newVehicle.licensePlate,
    color: newVehicle.color,
    purchaseDate: format(newVehicle.purchaseDate, 'yyyy-MM-dd'),
    odometer: newVehicle.odometer,
    fuelType: newVehicle.fuelType,
    batteryCapacity: newVehicle.fuelType === "Electric" ? "82 kWh" : undefined,
    range: newVehicle.fuelType === "Electric" ? "358 miles" : undefined,
    nextService: newVehicle.nextService,
    serviceInterval: newVehicle.serviceInterval,
    status: "good",
    issues: [],
    documents: isEditing ? vehicles.find(v => v.id === selectedVehicle)?.documents || [] : [],
    maintenanceHistory: isEditing ? vehicles.find(v => v.id === selectedVehicle)?.maintenanceHistory || [] : [],
    warranty: {
      basic: { 
        name: "Basic Vehicle Limited Warranty", 
        expiration: format(new Date(new Date(newVehicle.purchaseDate).setFullYear(new Date(newVehicle.purchaseDate).getFullYear() + 4)), 'yyyy-MM-dd'),
        active: true 
      },
      battery: newVehicle.fuelType === "Electric" ? {
        name: "Battery & Drive Unit",
        expiration: format(new Date(new Date(newVehicle.purchaseDate).setFullYear(new Date(newVehicle.purchaseDate).getFullYear() + 8)), 'yyyy-MM-dd'),
        active: true
      } : null,
      powertrain: newVehicle.fuelType !== "Electric" ? {
        name: "Powertrain Limited Warranty",
        expiration: format(new Date(new Date(newVehicle.purchaseDate).setFullYear(new Date(newVehicle.purchaseDate).getFullYear() + 6)), 'yyyy-MM-dd'),
        active: true
      } : null,
      extended: null
    }
  };
  
  if (isEditing) {
    setVehicles(vehicles.map(v => v.id === selectedVehicle ? vehicleToSave : v));
  } else {
    setVehicles([...vehicles, vehicleToSave]);
    setCurrentVehicleId(vehicleToSave.id);
  }
  
  resetVehicleForm();
};
  
  // Reset vehicle form
  const resetVehicleForm = () => {
    setShowAddDialog(false)
    setIsEditing(false)
    setNewVehicle({
      name: "",
      year: new Date().getFullYear().toString(),
      make: "",
      model: "",
      trim: "",
      vin: "",
      licensePlate: "",
      color: "",
      purchaseDate: new Date(),
      odometer: 0,
      fuelType: "Gasoline",
      nextService: "",
      serviceInterval: "",
      image: "/api/placeholder/400/250"
    })
  }
  
  // Handle editing vehicle
  const handleEditVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle.id)
    setIsEditing(true)
    setNewVehicle({
      name: vehicle.name,
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      trim: vehicle.trim,
      vin: vehicle.vin,
      licensePlate: vehicle.licensePlate,
      color: vehicle.color,
      purchaseDate: new Date(vehicle.purchaseDate),
      odometer: vehicle.odometer,
      fuelType: vehicle.fuelType,
      nextService: vehicle.nextService,
      serviceInterval: vehicle.serviceInterval,
      image: vehicle.image
    })
    setShowAddDialog(true)
  }
  
  // Handle delete vehicle
  const confirmDelete = (id: string) => {
    setSelectedVehicle(id)
    setShowDeleteConfirm(true)
  }
  
  const handleDeleteVehicle = () => {
    const newVehicles = vehicles.filter(v => v.id !== selectedVehicle)
    setVehicles(newVehicles)
    if (currentVehicleId === selectedVehicle) {
      setCurrentVehicleId(newVehicles[0]?.id || null)
    }
    setShowDeleteConfirm(false)
  }
  
  // Handle add document
  const handleAddDocument = () => {
    const document = {
      id: `doc${Date.now()}`,
      name: newDocument.name,
      date: format(newDocument.date, 'yyyy-MM-dd')
    }
    
    setVehicles(vehicles.map(v => {
      if (v.id === currentVehicleId) {
        return {
          ...v,
          documents: [...v.documents, document]
        }
      }
      return v
    }))
    
    setShowDocumentDialog(false)
    setNewDocument({
      name: "",
      date: new Date()
    })
  }
  
  // Handle add maintenance record
  const handleAddMaintenance = () => {
    const maintenance = {
      id: `maint${Date.now()}`,
      service: newMaintenance.service,
      date: format(newMaintenance.date, 'yyyy-MM-dd'),
      odometer: newMaintenance.odometer
    }
    
    setVehicles(vehicles.map(v => {
      if (v.id === currentVehicleId) {
        return {
          ...v,
          maintenanceHistory: [...v.maintenanceHistory, maintenance],
          odometer: Math.max(v.odometer, newMaintenance.odometer) // Update odometer if maintenance reading is higher
        }
      }
      return v
    }))
    
    setShowMaintenanceDialog(false)
    setNewMaintenance({
      service: "",
      date: new Date(),
      odometer: currentVehicle?.odometer || 0
    })
  }
  
  // Handle update odometer
  const handleUpdateOdometer = (newValue: number) => {
    setVehicles(vehicles.map(v => {
      if (v.id === currentVehicleId) {
        return {
          ...v,
          odometer: newValue
        }
      }
      return v
    }))
  }
  
  // Render vehicle card for selection
  const VehicleCard = ({ vehicle, isActive }: { vehicle: any, isActive: boolean }) => (
    <Card 
      className={cn(
        "cursor-pointer hover:bg-accent/50 transition-colors",
        isActive && "border-primary"
      )}
      onClick={() => setCurrentVehicleId(vehicle.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-md bg-secondary flex items-center justify-center overflow-hidden">
              {vehicle.image ? (
                <Image
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="h-full w-full object-cover" 
                  width={500}
                  height={500}
                />
              ) : (
                <Car className="h-8 w-8 text-secondary-foreground" />
              )}
            </div>
            <Badge 
              className="absolute -top-2 -right-2" 
              variant={vehicle.status === "good" ? "default" : "destructive"}
            >
              {vehicle.status === "good" ? (
                <Check className="h-3 w-3" />
              ) : (
                <AlertTriangle className="h-3 w-3" />
              )}
            </Badge>
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-sm">{vehicle.name}</h3>
            <p className="text-xs text-muted-foreground">{vehicle.licensePlate}</p>
            <div className="flex items-center text-xs mt-1">
              <Gauge className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>{vehicle.odometer.toLocaleString()} miles</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
  
  // Stats card component
  const StatsCard = ({ title, value, icon: Icon, description, className }: any) => (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-2">{value}</h4>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
  
  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Vehicles</h1>
            <p className="text-muted-foreground">
              Manage your vehicles and track maintenance history
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
            Add Vehicle
          </Button>
        </div>
        
        {/* Vehicle Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vehicles.map(vehicle => (
            <VehicleCard 
              key={vehicle.id} 
              vehicle={vehicle} 
              isActive={vehicle.id === currentVehicleId} 
            />
          ))}
        </div>
        
        {/* Vehicle Details */}
        {currentVehicle && (
          <>
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>{currentVehicle.name}</CardTitle>
                    <CardDescription>
                      {currentVehicle.vin && `VIN: ${currentVehicle.vin}`}
                    </CardDescription>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditVehicle(currentVehicle)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Vehicle
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Vehicle Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setShowMaintenanceDialog(true)}>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Add Service Record
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowDocumentDialog(true)}>
                          <FileText className="h-4 w-4 mr-2" />
                          Upload Document
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => confirmDelete(currentVehicle.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Vehicle
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              
              <Tabs
                defaultValue="overview"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <CardContent className="pt-0 pb-1">
                  <TabsList className="w-full md:w-auto">
                    <TabsTrigger value="overview" className="flex-1 md:flex-none">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="specs" className="flex-1 md:flex-none">
                      Specifications
                    </TabsTrigger>
                    <TabsTrigger value="maintenance" className="flex-1 md:flex-none">
                      Maintenance
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="flex-1 md:flex-none">
                      Documents
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="m-0 p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <Image 
                        src={currentVehicle.image} 
                        alt={currentVehicle.name} 
                        className="h-full w-full object-cover"
                        height={500}
                        width={500}
                      />
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">{currentVehicle.year} {currentVehicle.make} {currentVehicle.model}</h2>
                        <p className="text-muted-foreground">{currentVehicle.trim}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">License Plate</p>
                          <p>{currentVehicle.licensePlate || "—"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Color</p>
                          <p>{currentVehicle.color || "—"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Purchase Date</p>
                          <p>{currentVehicle.purchaseDate ? format(new Date(currentVehicle.purchaseDate), 'MMM dd, yyyy') : "—"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Fuel Type</p>
                          <p>{currentVehicle.fuelType || "—"}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium">Odometer</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-2"
                            onClick={() => {
                              const newValue = window.prompt("Enter current odometer reading:", currentVehicle.odometer.toString())
                              if (newValue && !isNaN(Number(newValue))) {
                                handleUpdateOdometer(Number(newValue))
                              }
                            }}
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Update
                          </Button>
                        </div>
                        <div className="text-2xl font-bold">{currentVehicle.odometer.toLocaleString()} miles</div>
                      </div>
                      
                      {currentVehicle.nextService && (
                        <div className="pt-2">
                          <p className="text-sm font-medium mb-2">Next Service Due</p>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <p>{format(new Date(currentVehicle.nextService), 'MMMM d, yyyy')}</p>
                          </div>
                          {currentVehicle.serviceInterval && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Service Interval: {currentVehicle.serviceInterval}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatsCard 
                      title="Total Service Records" 
                      value={currentVehicle.maintenanceHistory.length}
                      icon={Settings} 
                      description="Lifetime maintenance history" 
                    />
                    
                    <StatsCard 
                      title="Documents" 
                      value={currentVehicle.documents.length}
                      icon={FileText} 
                      description="Vehicle-related documents" 
                    />
                    
                    <StatsCard 
                      title="Active Warranties" 
                      value={Object.values(currentVehicle.warranty || {}).filter((w: any) => w && w.active).length}
                      icon={Shield} 
                      description="Currently valid warranties" 
                    />
                  </div>
                  
                  {currentVehicle.issues && currentVehicle.issues.length > 0 && (
                    <Card className="border-destructive/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-destructive" />
                          Attention Required
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {currentVehicle.issues.map((issue: any) => (
                            <li key={issue.id} className="text-sm flex items-start space-x-2">
                              <Badge 
                                variant={issue.severity === "warning" ? "outline" : "destructive"}
                                className="mt-0.5"
                              >
                                {issue.severity}
                              </Badge>
                              <span>{issue.description}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                {/* Specifications Tab */}
                <TabsContent value="specs" className="m-0 p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Vehicle Details</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <dl className="grid grid-cols-2 gap-4">
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Make</dt>
                            <dd>{currentVehicle.make}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Model</dt>
                            <dd>{currentVehicle.model}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Year</dt>
                            <dd>{currentVehicle.year}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Trim</dt>
                            <dd>{currentVehicle.trim || "—"}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">VIN</dt>
                            <dd className="break-all">{currentVehicle.vin || "—"}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">License Plate</dt>
                            <dd>{currentVehicle.licensePlate || "—"}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Color</dt>
                            <dd>{currentVehicle.color || "—"}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Purchase Date</dt>
                            <dd>{currentVehicle.purchaseDate ? format(new Date(currentVehicle.purchaseDate), 'MMM dd, yyyy') : "—"}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Technical Specifications</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <dl className="grid grid-cols-2 gap-4">
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Fuel Type</dt>
                            <dd>{currentVehicle.fuelType || "—"}</dd>
                          </div>
                          {currentVehicle.engineSize && (
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Engine</dt>
                              <dd>{currentVehicle.engineSize}</dd>
                            </div>
                          )}
                          {currentVehicle.fuelEfficiency && (
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Fuel Efficiency</dt>
                              <dd>{currentVehicle.fuelEfficiency}</dd>
                            </div>
                          )}
                          {currentVehicle.batteryCapacity && (
                            <div>
<dt className="text-sm font-medium text-muted-foreground">Battery Capacity</dt>
<dd>{currentVehicle.batteryCapacity}</dd>
</div>
)}
{currentVehicle.range && (
<div>
<dt className="text-sm font-medium text-muted-foreground">Range</dt>
<dd>{currentVehicle.range}</dd>
</div>
)}
<div>
<dt className="text-sm font-medium text-muted-foreground">Odometer</dt>
<dd>{currentVehicle.odometer.toLocaleString()} miles</dd>
</div>
</dl>
</CardContent>
</Card>
</div>

{/* Warranty Information */}
<Card>
<CardHeader>
<CardTitle className="text-lg">Warranty Information</CardTitle>
</CardHeader>
<CardContent className="pt-0">
<div className="space-y-4">
{Object.entries(currentVehicle.warranty || {}).map(([key, warranty]: [string, any]) => (
warranty && (
<div key={key} className="border rounded-lg p-4">
<div className="flex items-center justify-between">
  <div>
    <h4 className="font-medium">{warranty.name}</h4>
    {warranty.expiration && (
      <p className="text-sm text-muted-foreground">
        Expires: {format(new Date(warranty.expiration), 'MMMM d, yyyy')}
      </p>
    )}
  </div>
  <Badge variant={warranty.active ? "default" : "outline"}>
    {warranty.active ? "Active" : "Expired"}
  </Badge>
</div>
</div>
)
))}
</div>
</CardContent>
</Card>
</TabsContent>

{/* Maintenance Tab */}
<TabsContent value="maintenance" className="m-0 p-6 space-y-6">
<div className="flex justify-between items-center">
<div>
<h2 className="text-xl font-semibold">Maintenance History</h2>
<p className="text-muted-foreground">
Track your vehicle's service records and upcoming maintenance
</p>
</div>
<Button onClick={() => setShowMaintenanceDialog(true)}>
<Plus className="h-4 w-4 mr-2" />
Add Record
</Button>
</div>

{currentVehicle.maintenanceHistory.length > 0 ? (
<div className="space-y-4">
{currentVehicle.maintenanceHistory
.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
.map((record: any) => (
<Card key={record.id}>
<CardContent className="p-4">
<div className="flex items-center justify-between">
  <div>
    <h4 className="font-medium">{record.service}</h4>
    <div className="flex items-center space-x-4 mt-1 text-sm">
      <span className="flex items-center text-muted-foreground">
        <Calendar className="h-4 w-4 mr-1" />
        {format(new Date(record.date), 'MMM d, yyyy')}
      </span>
      <span className="flex items-center text-muted-foreground">
        <Gauge className="h-4 w-4 mr-1" />
        {record.odometer.toLocaleString()} miles
      </span>
    </div>
  </div>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="sm">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Edit Record</DropdownMenuItem>
      <DropdownMenuItem className="text-destructive">
        Delete Record
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
</CardContent>
</Card>
))}
</div>
) : (
<Card>
<CardContent className="p-8 text-center">
<Settings className="h-8 w-8 mx-auto text-muted-foreground" />
<h3 className="mt-4 font-medium">No maintenance records</h3>
<p className="text-sm text-muted-foreground mt-1">
Add your first service record to track your vehicle's maintenance history
</p>
<Button className="mt-4" onClick={() => setShowMaintenanceDialog(true)}>
Add Service Record
</Button>
</CardContent>
</Card>
)}

{currentVehicle.nextService && (
<Card>
<CardHeader>
<CardTitle className="text-lg">Upcoming Maintenance</CardTitle>
</CardHeader>
<CardContent>
<div className="space-y-2">
<div className="flex items-center justify-between">
<div>
<h4 className="font-medium">Next Scheduled Service</h4>
<p className="text-sm text-muted-foreground">
  {currentVehicle.serviceInterval}
</p>
</div>
<Badge variant="outline">
{format(new Date(currentVehicle.nextService), 'MMM d, yyyy')}
</Badge>
</div>
<div className="pt-2">
<div className="flex justify-between text-sm mb-1">
<span>Last Service</span>
<span>Next Service</span>
</div>
<Progress
value={Math.min(
  100,
  (currentVehicle.odometer /
    (currentVehicle.odometer + 
     (currentVehicle.maintenanceHistory[0]?.odometer || 0))) * 100
)}
className="h-2"
/>
</div>
</div>
</CardContent>
</Card>
)}
</TabsContent>

{/* Documents Tab */}
<TabsContent value="documents" className="m-0 p-6 space-y-6">
<div className="flex justify-between items-center">
<div>
<h2 className="text-xl font-semibold">Vehicle Documents</h2>
<p className="text-muted-foreground">
Store and manage important documents related to your vehicle
</p>
</div>
<Button onClick={() => setShowDocumentDialog(true)}>
<Plus className="h-4 w-4 mr-2" />
Add Document
</Button>
</div>

{currentVehicle.documents.length > 0 ? (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{currentVehicle.documents.map((doc: any) => (
<Card key={doc.id} className="hover:shadow-md transition-shadow">
<CardContent className="p-4">
<div className="flex items-start space-x-3">
<div className="bg-secondary p-2 rounded-md">
  <FileText className="h-5 w-5" />
</div>
<div className="flex-1">
  <h4 className="font-medium text-sm truncate">{doc.name}</h4>
  <p className="text-xs text-muted-foreground mt-1">
    Added: {format(new Date(doc.date), 'MMM d, yyyy')}
  </p>
</div>
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Download</DropdownMenuItem>
    <DropdownMenuItem>Rename</DropdownMenuItem>
    <DropdownMenuItem className="text-destructive">
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</div>
</CardContent>
</Card>
))}
</div>
) : (
<Card>
<CardContent className="p-8 text-center">
<FileText className="h-8 w-8 mx-auto text-muted-foreground" />
<h3 className="mt-4 font-medium">No documents</h3>
<p className="text-sm text-muted-foreground mt-1">
Add your first document to keep all vehicle records in one place
</p>
<Button className="mt-4" onClick={() => setShowDocumentDialog(true)}>
Add Document
</Button>
</CardContent>
</Card>
)}
</TabsContent>
</Tabs>
</Card>
</>
)}
</div>

{/* Add/Edit Vehicle Dialog */}
<Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
<DialogContent className="sm:max-w-[625px]">
<DialogHeader>
<DialogTitle>{isEditing ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
<DialogDescription>
{isEditing 
? "Update your vehicle details below."
: "Fill in the details of your vehicle to add it to your garage."}
</DialogDescription>
</DialogHeader>

<div className="grid gap-4 py-4">
<div className="grid grid-cols-2 gap-4">
<div className="space-y-2">
<Label htmlFor="year">Year</Label>
<Input
id="year"
value={newVehicle.year}
onChange={(e) => setNewVehicle({...newVehicle, year: e.target.value})}
/>
</div>
<div className="space-y-2">
<Label htmlFor="make">Make</Label>
<Select
value={newVehicle.make}
onValueChange={(value) => setNewVehicle({...newVehicle, make: value})}
>
<SelectTrigger>
<SelectValue placeholder="Select make" />
</SelectTrigger>
<SelectContent>
{carMakes.map(make => (
<SelectItem key={make} value={make}>{make}</SelectItem>
))}
</SelectContent>
</Select>
</div>
</div>

<div className="grid grid-cols-2 gap-4">
<div className="space-y-2">
<Label htmlFor="model">Model</Label>
<Input
id="model"
value={newVehicle.model}
onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
/>
</div>
<div className="space-y-2">
<Label htmlFor="trim">Trim (Optional)</Label>
<Input
id="trim"
value={newVehicle.trim}
onChange={(e) => setNewVehicle({...newVehicle, trim: e.target.value})}
/>
</div>
</div>

<div className="grid grid-cols-2 gap-4">
<div className="space-y-2">
<Label htmlFor="vin">VIN (Optional)</Label>
<Input
id="vin"
value={newVehicle.vin}
onChange={(e) => setNewVehicle({...newVehicle, vin: e.target.value})}
/>
</div>
<div className="space-y-2">
<Label htmlFor="licensePlate">License Plate (Optional)</Label>
<Input
id="licensePlate"
value={newVehicle.licensePlate}
onChange={(e) => setNewVehicle({...newVehicle, licensePlate: e.target.value})}
/>
</div>
</div>

<div className="grid grid-cols-2 gap-4">
<div className="space-y-2">
<Label htmlFor="color">Color (Optional)</Label>
<Input
id="color"
value={newVehicle.color}
onChange={(e) => setNewVehicle({...newVehicle, color: e.target.value})}
/>
</div>
<div className="space-y-2">
<Label htmlFor="fuelType">Fuel Type</Label>
<Select
value={newVehicle.fuelType}
onValueChange={(value) => setNewVehicle({...newVehicle, fuelType: value})}
>
<SelectTrigger>
<SelectValue placeholder="Select fuel type" />
</SelectTrigger>
<SelectContent>
{fuelTypes.map(type => (
<SelectItem key={type} value={type}>{type}</SelectItem>
))}
</SelectContent>
</Select>
</div>
</div>

<div className="grid grid-cols-2 gap-4">
<div className="space-y-2">
<Label htmlFor="purchaseDate">Purchase Date</Label>
<Popover>
<PopoverTrigger asChild>
<Button
variant="outline"
className="w-full justify-start text-left font-normal"
>
<Calendar className="mr-2 h-4 w-4" />
{newVehicle.purchaseDate ? (
format(newVehicle.purchaseDate, 'PPP')
) : (
<span>Pick a date</span>
)}
</Button>
</PopoverTrigger>
<PopoverContent className="w-auto p-0">
<CalendarComponent
mode="single"
selected={newVehicle.purchaseDate}
onSelect={(date) => date && setNewVehicle({...newVehicle, purchaseDate: date})}
initialFocus
/>
</PopoverContent>
</Popover>
</div>
<div className="space-y-2">
<Label htmlFor="odometer">Current Odometer (miles)</Label>
<Input
id="odometer"
type="number"
value={newVehicle.odometer}
onChange={(e) => setNewVehicle({...newVehicle, odometer: Number(e.target.value)})}
/>
</div>
</div>

<div className="grid grid-cols-2 gap-4">
<div className="space-y-2">
<Label htmlFor="nextService">Next Service Date (Optional)</Label>
<Input
id="nextService"
value={newVehicle.nextService}
onChange={(e) => setNewVehicle({...newVehicle, nextService: e.target.value})}
placeholder="YYYY-MM-DD"
/>
</div>
<div className="space-y-2">
<Label htmlFor="serviceInterval">Service Interval (Optional)</Label>
<Input
id="serviceInterval"
value={newVehicle.serviceInterval}
onChange={(e) => setNewVehicle({...newVehicle, serviceInterval: e.target.value})}
placeholder="e.g. 6 months / 5,000 miles"
/>
</div>
</div>
</div>

<DialogFooter>
<Button variant="outline" onClick={resetVehicleForm}>
Cancel
</Button>
<Button onClick={handleSaveVehicle}>
{isEditing ? "Save Changes" : "Add Vehicle"}
</Button>
</DialogFooter>
</DialogContent>
</Dialog>

{/* Delete Confirmation Dialog */}
<Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
<DialogContent className="sm:max-w-[425px]">
<DialogHeader>
<DialogTitle>Confirm Deletion</DialogTitle>
<DialogDescription>
Are you sure you want to remove this vehicle? This action cannot be undone.
</DialogDescription>
</DialogHeader>
<div className="flex justify-end space-x-2 pt-4">
<Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
Cancel
</Button>
<Button variant="destructive" onClick={handleDeleteVehicle}>
Delete Vehicle
</Button>
</div>
</DialogContent>
</Dialog>

{/* Add Document Dialog */}
<Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
<DialogContent className="sm:max-w-[425px]">
<DialogHeader>
<DialogTitle>Add Document</DialogTitle>
<DialogDescription>
Upload a document for your vehicle. This could be insurance, registration, or service records.
</DialogDescription>
</DialogHeader>

<div className="grid gap-4 py-4">
<div className="space-y-2">
<Label htmlFor="documentName">Document Name</Label>
<Input
id="documentName"
value={newDocument.name}
onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
/>
</div>

<div className="space-y-2">
<Label htmlFor="documentDate">Date</Label>
<Popover>
<PopoverTrigger asChild>
<Button
variant="outline"
className="w-full justify-start text-left font-normal"
>
<Calendar className="mr-2 h-4 w-4" />
{newDocument.date ? (
format(newDocument.date, 'PPP')
) : (
<span>Pick a date</span>
)}
</Button>
</PopoverTrigger>
<PopoverContent className="w-auto p-0">
<CalendarComponent
mode="single"
selected={newDocument.date}
onSelect={(date) => date && setNewDocument({...newDocument, date})}
initialFocus
/>
</PopoverContent>
</Popover>
</div>

<div className="space-y-2">
<Label htmlFor="documentFile">File</Label>
<div className="flex items-center justify-center w-full">
<label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-secondary/50">
<div className="flex flex-col items-center justify-center pt-5 pb-6">
<FileText className="h-8 w-8 mb-2 text-muted-foreground" />
<p className="mb-2 text-sm text-muted-foreground">
<span className="font-semibold">Click to upload</span> or drag and drop
</p>
<p className="text-xs text-muted-foreground">
PDF, JPG, PNG (MAX. 10MB)
</p>
</div>
<input id="documentFile" type="file" className="hidden" />
</label>
</div>
</div>
</div>

<DialogFooter>
<Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
Cancel
</Button>
<Button onClick={handleAddDocument}>
Add Document
</Button>
</DialogFooter>
</DialogContent>
</Dialog>

{/* Add Maintenance Dialog */}
<Dialog open={showMaintenanceDialog} onOpenChange={setShowMaintenanceDialog}>
<DialogContent className="sm:max-w-[425px]">
<DialogHeader>
<DialogTitle>Add Maintenance Record</DialogTitle>
<DialogDescription>
Record a service or maintenance performed on your vehicle.
</DialogDescription>
</DialogHeader>

<div className="grid gap-4 py-4">
<div className="space-y-2">
<Label htmlFor="service">Service Performed</Label>
<Input
id="service"
value={newMaintenance.service}
onChange={(e) => setNewMaintenance({...newMaintenance, service: e.target.value})}
placeholder="e.g. Oil Change, Tire Rotation"
/>
</div>

<div className="grid grid-cols-2 gap-4">
<div className="space-y-2">
<Label htmlFor="maintenanceDate">Date</Label>
<Popover>
<PopoverTrigger asChild>
<Button
variant="outline"
className="w-full justify-start text-left font-normal"
>
<Calendar className="mr-2 h-4 w-4" />
{newMaintenance.date ? (
format(newMaintenance.date, 'PPP')
) : (
<span>Pick a date</span>
)}
</Button>
</PopoverTrigger>
<PopoverContent className="w-auto p-0">
<CalendarComponent
mode="single"
selected={newMaintenance.date}
onSelect={(date) => date && setNewMaintenance({...newMaintenance, date})}
initialFocus
/>
</PopoverContent>
</Popover>
</div>

<div className="space-y-2">
<Label htmlFor="odometer">Odometer (miles)</Label>
<Input
id="odometer"
type="number"
value={newMaintenance.odometer}
onChange={(e) => setNewMaintenance({...newMaintenance, odometer: Number(e.target.value)})}
/>
</div>
</div>

<div className="space-y-2">
<Label htmlFor="notes">Notes (Optional)</Label>
<Textarea
id="notes"
placeholder="Any additional details about the service..."
className="min-h-[100px]"
/>
</div>
</div>

<DialogFooter>
<Button variant="outline" onClick={() => setShowMaintenanceDialog(false)}>
Cancel
</Button>
<Button onClick={handleAddMaintenance}>
Add Record
</Button>
</DialogFooter>
</DialogContent>
</Dialog>
</>
)
}