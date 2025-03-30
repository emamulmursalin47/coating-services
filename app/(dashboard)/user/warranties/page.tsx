/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
  FileText,
  Download,
  Eye,
  Info,
  Search,
  Filter
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'

// Define warranty interfaces
interface Warranty {
  id: number;
  title: string;
  product: string;
  registrationDate: string;
  expiryDate: string;
  status: 'active' | 'pending' | 'expired';
  coverage: string[];
  vehicle: {
    make: string;
    model: string;
    year: string;
    color: string;
    vin: string;
  };
  timeRemaining: number; // Percentage of warranty time remaining
}

// Sample warranty data
const warrantiesData: Warranty[] = [
  {
    id: 1,
    title: 'Premium Ceramic Coating',
    product: 'Ceramic Pro Gold Package',
    registrationDate: '2024-02-15',
    expiryDate: '2027-02-15',
    status: 'active',
    coverage: ['Paint Protection', 'UV Resistance', 'Chemical Resistance', 'Hydrophobic Effect'],
    vehicle: {
      make: 'Tesla',
      model: 'Model 3',
      year: '2023',
      color: 'Midnight Silver',
      vin: 'TSLA12345678901234'
    },
    timeRemaining: 75
  },
  {
    id: 2,
    title: 'Basic Ceramic Coating',
    product: 'Ceramic Pro Silver Package',
    registrationDate: '2024-03-28',
    expiryDate: '2026-03-28',
    status: 'pending',
    coverage: ['Paint Protection', 'UV Resistance', 'Hydrophobic Effect'],
    vehicle: {
      make: 'BMW',
      model: 'X5',
      year: '2022',
      color: 'Alpine White',
      vin: 'BMW098765432109876'
    },
    timeRemaining: 90
  },
  {
    id: 3,
    title: 'Paint Protection Film',
    product: 'XPEL Ultimate Plus',
    registrationDate: '2023-05-10',
    expiryDate: '2033-05-10',
    status: 'active',
    coverage: ['Self-Healing', 'Impact Protection', 'Stain Resistance', '10-Year Warranty'],
    vehicle: {
      make: 'Porsche',
      model: '911',
      year: '2023',
      color: 'Guards Red',
      vin: 'POR1122334455667788'
    },
    timeRemaining: 85
  },
  {
    id: 4,
    title: 'Interior Protection',
    product: 'Ceramic Pro Leather',
    registrationDate: '2022-11-15',
    expiryDate: '2025-11-15',
    status: 'active',
    coverage: ['Stain Resistance', 'UV Protection', 'Liquid Repellent'],
    vehicle: {
      make: 'Audi',
      model: 'Q7',
      year: '2022',
      color: 'Daytona Gray',
      vin: 'AUDI5544332211998877'
    },
    timeRemaining: 40
  },
  {
    id: 5,
    title: 'Wheel Coating',
    product: 'Ceramic Pro Wheel & Caliper',
    registrationDate: '2023-10-08',
    expiryDate: '2024-10-08',
    status: 'expired',
    coverage: ['Brake Dust Resistance', 'Easy Cleaning', 'Heat Resistance'],
    vehicle: {
      make: 'Mercedes-Benz',
      model: 'C300',
      year: '2021',
      color: 'Obsidian Black',
      vin: 'MERC9988776655443322'
    },
    timeRemaining: 0
  }
]

export default function WarrantiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Filter warranties based on search term and filter status
  const filteredWarranties = warrantiesData
    .filter(warranty => 
      warranty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warranty.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warranty.vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warranty.vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(warranty => filterStatus === 'all' ? true : warranty.status === filterStatus)
    .sort((a, b) => {
      // Sort by status: active first, then pending, then expired
      if (a.status !== b.status) {
        if (a.status === 'active') return -1;
        if (b.status === 'active') return 1;
        if (a.status === 'pending') return -1;
        if (b.status === 'pending') return 1;
      }
      // Then sort by expiry date
      return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime();
    });
  
  // Calculate summary stats
  const activeWarranties = warrantiesData.filter(w => w.status === 'active').length;
  const pendingWarranties = warrantiesData.filter(w => w.status === 'pending').length;
  const expiredWarranties = warrantiesData.filter(w => w.status === 'expired').length;
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <Badge variant="default" className="bg-green-600">Active</Badge>
      case 'pending': return <Badge variant="outline" className="text-amber-600 border-amber-600">Pending</Badge>
      case 'expired': return <Badge variant="secondary" className="bg-gray-200 text-gray-600">Expired</Badge>
      default: return <Badge variant="outline">Unknown</Badge>
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Warranties</h1>
          <p className="text-muted-foreground">Manage and track your product warranties</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/warranties/register" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Register New Warranty
          </Link>
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Warranties</p>
                <h2 className="text-3xl font-bold">{activeWarranties}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Registration</p>
                <h2 className="text-3xl font-bold">{pendingWarranties}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expired Warranties</p>
                <h2 className="text-3xl font-bold">{expiredWarranties}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Info className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search warranties..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Warranties</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Warranties List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Your Warranties
          </CardTitle>
          <CardDescription>
            Manage your product warranties and registrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredWarranties.length > 0 ? (
              filteredWarranties.map((warranty) => (
                <div key={warranty.id} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-lg">{warranty.title}</h3>
                        {getStatusBadge(warranty.status)}
                      </div>
                      <p className="text-muted-foreground">{warranty.product}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Certificate
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Vehicle Information</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Make</p>
                          <p>{warranty.vehicle.make}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Model</p>
                          <p>{warranty.vehicle.model}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Year</p>
                          <p>{warranty.vehicle.year}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Color</p>
                          <p>{warranty.vehicle.color}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Warranty Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Registration Date</p>
                          <p>{warranty.registrationDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expiry Date</p>
                          <p>{warranty.expiryDate}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm">
                          <span>Warranty Period</span>
                          <span>{warranty.timeRemaining}%</span>
                        </div>
                        <Progress value={warranty.timeRemaining} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Coverage</h4>
                    <div className="flex flex-wrap gap-2">
                      {warranty.coverage.map((item, index) => (
                        <Badge key={index} variant="outline" className="font-normal">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium text-lg">No warranties found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                <Button variant="outline" className="mt-4">Register New Warranty</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Warranty FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Warranty Information</CardTitle>
          <CardDescription>Frequently asked questions about your warranties</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ceramic">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="ceramic">Ceramic Coating</TabsTrigger>
              <TabsTrigger value="ppf">Paint Protection Film</TabsTrigger>
            </TabsList>
            <TabsContent value="ceramic" className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-1">How do I maintain my ceramic coating?</h3>
                <p className="text-sm text-muted-foreground">
                  To maintain your ceramic coating, wash your vehicle regularly using pH neutral car wash soap,
                  avoid automatic car washes with brushes, and apply a ceramic boost spray every 3-4 months.
                  Avoid using harsh chemicals or abrasive polishes.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-1">What should I do if my coating is damaged?</h3>
                <p className="text-sm text-muted-foreground">
                  If you notice any damage to your ceramic coating, contact our service center immediately
                  to schedule an inspection. Minor damage may be repairable without affecting your warranty.
                  Always document the damage with photos.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-1">How often should I schedule maintenance?</h3>
                <p className="text-sm text-muted-foreground">
                  We recommend scheduling a professional maintenance inspection every 12 months
                  to ensure your coating is performing optimally and to maintain warranty coverage.
                  These inspections include cleaning, decontamination, and reapplication of top layers if needed.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="ppf" className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-1">How do I clean my paint protection film?</h3>
                <p className="text-sm text-muted-foreground">
                  Clean your PPF using the same gentle washing techniques you would use for the rest of your vehicle.
                  Avoid pressure washers directly on the edges of the film, use pH neutral soaps, and
                  allow any cleaning products to fully dry before driving.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-1">Will the self-healing function always work?</h3>
                <p className="text-sm text-muted-foreground">
                  The self-healing function works best on minor scratches and swirl marks. It's activated by
                  heat (either from the sun or warm water) and may take a few hours to fully heal.
                  Deep cuts or punctures will not self-heal and may require professional repair.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-1">How long will the PPF last?</h3>
                <p className="text-sm text-muted-foreground">
                  With proper care, your paint protection film can last up to 10 years. Factors that affect
                  longevity include climate, storage conditions, maintenance, and frequency of washing.
                  Regular inspections can help identify any issues before they compromise the film.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}