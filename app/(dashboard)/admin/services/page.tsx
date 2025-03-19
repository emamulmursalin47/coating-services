'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Textarea } from '@/components/ui/textarea'
import { Plus, Pencil, Trash2, Search, X, ChevronUp, ChevronDown, Image } from 'lucide-react'
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
import { Switch } from '@/components/ui/switch'

// Define TypeScript interfaces
interface ServiceItem {
  id: number
  name: string
  shortDescription: string
  fullDescription: string
  price: number
  duration: string
  features: string[]
  includes: string[]
  processSteps: string[]
  beforeImage: string
  afterImage: string
  galleryImages: string[]
  durationNote: string
  bookingUrl: string
  questionUrl: string
  seoTitle: string
  seoDescription: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
}

interface NewServiceItem {
  name: string
  shortDescription: string
  fullDescription: string
  price: string | number
  duration: string
  features: string[]
  includes: string[]
  processSteps: string[]
  beforeImage: string
  afterImage: string
  galleryImages: string[]
  durationNote: string
  bookingUrl: string
  questionUrl: string
  seoTitle: string
  seoDescription: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
}

// Sample service data with enhanced fields
const initialServices: ServiceItem[] = [
  {
    id: 1,
    name: 'Basic Ceramic Coating',
    shortDescription: 'Essential protection for daily drivers with a brilliant shine.',
    fullDescription: 'Our Basic Ceramic Coating provides essential protection for daily drivers. This single-layer ceramic coating creates a brilliant shine while offering protection against UV rays, light scratches, and environmental contaminants.',
    price: 499,
    duration: '1 day',
    features: [
      'Single-layer ceramic coating',
      'UV Protection',
      'Hydrophobic properties'
    ],
    includes: [
      'Paint decontamination',
      'Hand wash & clay bar treatment',
      'Minor surface preparation'
    ],
    processSteps: [
      'Thorough hand wash and decontamination',
      'Clay bar treatment to remove embedded contaminants',
      'Surface preparation to ensure proper bonding',
      'Application of ceramic coating',
      'Curing time',
      'Final inspection'
    ],
    beforeImage: '/images/before-1.jpg',
    afterImage: '/images/after-1.jpg',
    galleryImages: ['/images/gallery-1.jpg', '/images/gallery-2.jpg'],
    durationNote: 'This service takes 1 day but may vary based on vehicle size and condition.',
    bookingUrl: '/booking?service=basic-ceramic',
    questionUrl: '/contact?inquiry=basic-ceramic',
    seoTitle: 'Basic Ceramic Coating | Auto Detailing Services',
    seoDescription: 'Our Basic Ceramic Coating provides essential protection for daily drivers with brilliant shine, UV protection, and hydrophobic properties.',
    slug: '/services/basic-ceramic-coating',
    status: 'published',
    featured: true
  },
  {
    id: 2,
    name: 'Premium Ceramic Shield',
    shortDescription: 'Enhanced protection with multiple ceramic layers.',
    fullDescription: 'Our Premium Ceramic Shield offers superior protection with multiple ceramic layers. This advanced coating provides exceptional gloss, enhanced chemical resistance, and long-lasting protection against environmental hazards.',
    price: 799,
    duration: '2 days',
    features: [
      'Multi-layer ceramic coating',
      'Enhanced UV Protection',
      'Superior hydrophobic properties',
      'Increased hardness and durability'
    ],
    includes: [
      'Paint decontamination',
      'Hand wash & clay bar treatment',
      'Comprehensive surface preparation',
      'Machine polishing to remove minor imperfections'
    ],
    processSteps: [
      'Thorough hand wash and decontamination',
      'Clay bar treatment to remove embedded contaminants',
      'Machine polishing to remove swirl marks and minor scratches',
      'Surface preparation to ensure proper bonding',
      'Application of first ceramic coating layer',
      'Application of second ceramic coating layer',
      'Extended curing time',
      'Final inspection'
    ],
    beforeImage: '/images/before-2.jpg',
    afterImage: '/images/after-2.jpg',
    galleryImages: ['/images/gallery-3.jpg', '/images/gallery-4.jpg'],
    durationNote: 'This service takes 2 days to ensure proper application and curing of multiple ceramic layers.',
    bookingUrl: '/booking?service=premium-ceramic',
    questionUrl: '/contact?inquiry=premium-ceramic',
    seoTitle: 'Premium Ceramic Shield | Ultimate Auto Protection',
    seoDescription: 'Our Premium Ceramic Shield offers enhanced protection with multiple ceramic layers for superior gloss, durability, and resistance to environmental hazards.',
    slug: '/services/premium-ceramic-shield',
    status: 'published',
    featured: true
  },
  {
    id: 3,
    name: 'Ultimate Ceramic Defense',
    shortDescription: 'Our flagship protection package with comprehensive coverage.',
    fullDescription: 'The Ultimate Ceramic Defense is our flagship protection package offering comprehensive coverage. This professional-grade ceramic coating provides the highest level of protection available with maximum hardness, chemical resistance, and an unmatched deep gloss finish.',
    price: 1299,
    duration: '3 days',
    features: [
      'Professional-grade ceramic coating',
      'Maximum hardness and scratch resistance',
      'Extended warranty protection',
      'Superior chemical resistance',
      'Extreme hydrophobic properties'
    ],
    includes: [
      'Complete paint decontamination',
      'Premium wash & clay bar treatment',
      'Full paint correction',
      'Extensive surface preparation',
      'Interior leather protection',
      'Glass treatment'
    ],
    processSteps: [
      'Complete vehicle inspection',
      'Premium wash and decontamination process',
      'Clay bar treatment to remove all embedded contaminants',
      'Multi-stage paint correction to remove defects',
      'IPA wipedown to ensure clean surface',
      'Extensive surface preparation',
      'Application of base ceramic coating layer',
      'Application of main ceramic coating layer',
      'Application of top ceramic coating layer',
      'Extended controlled curing time',
      'Final inspection and documentation'
    ],
    beforeImage: '/images/before-3.jpg',
    afterImage: '/images/after-3.jpg',
    galleryImages: ['/images/gallery-5.jpg', '/images/gallery-6.jpg', '/images/gallery-7.jpg'],
    durationNote: 'This comprehensive service takes 3 days to complete with proper preparation, application, and curing of multiple ceramic layers.',
    bookingUrl: '/booking?service=ultimate-ceramic',
    questionUrl: '/contact?inquiry=ultimate-ceramic',
    seoTitle: 'Ultimate Ceramic Defense | Professional Auto Protection',
    seoDescription: 'Our Ultimate Ceramic Defense is a flagship protection package with comprehensive coverage for maximum hardness, chemical resistance, and unmatched gloss finish.',
    slug: '/services/ultimate-ceramic-defense',
    status: 'published',
    featured: true
  }
]

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
  const [currentService, setCurrentService] = useState<ServiceItem | null>(null)
  const [newService, setNewService] = useState<NewServiceItem>({
    name: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    duration: '',
    features: [''],
    includes: [''],
    processSteps: [''],
    beforeImage: '',
    afterImage: '',
    galleryImages: [''],
    durationNote: '',
    bookingUrl: '',
    questionUrl: '',
    seoTitle: '',
    seoDescription: '',
    slug: '',
    status: 'draft',
    featured: false
  })

  // Function to add a repeater field item
  const addRepeaterItem = (field: keyof Pick<NewServiceItem, 'features' | 'includes' | 'processSteps' | 'galleryImages'>) => {
    setNewService({
      ...newService,
      [field]: [...newService[field], '']
    })
  }

  // Function to remove a repeater field item
  const removeRepeaterItem = (field: keyof Pick<NewServiceItem, 'features' | 'includes' | 'processSteps' | 'galleryImages'>, index: number) => {
    setNewService({
      ...newService,
      [field]: newService[field].filter((_, i) => i !== index)
    })
  }

  // Function to update a repeater field item
  const updateRepeaterItem = (field: keyof Pick<NewServiceItem, 'features' | 'includes' | 'processSteps' | 'galleryImages'>, index: number, value: string) => {
    const updatedItems = [...newService[field]]
    updatedItems[index] = value
    setNewService({
      ...newService,
      [field]: updatedItems
    })
  }

  // Function to move a repeater item up
  const moveItemUp = (field: keyof Pick<NewServiceItem, 'features' | 'includes' | 'processSteps' | 'galleryImages'>, index: number) => {
    if (index === 0) return
    const updatedItems = [...newService[field]]
    const temp = updatedItems[index]
    updatedItems[index] = updatedItems[index - 1]
    updatedItems[index - 1] = temp
    setNewService({
      ...newService,
      [field]: updatedItems
    })
  }

  // Function to move a repeater item down
  const moveItemDown = (field: keyof Pick<NewServiceItem, 'features' | 'includes' | 'processSteps' | 'galleryImages'>, index: number) => {
    if (index === newService[field].length - 1) return
    const updatedItems = [...newService[field]]
    const temp = updatedItems[index]
    updatedItems[index] = updatedItems[index + 1]
    updatedItems[index + 1] = temp
    setNewService({
      ...newService,
      [field]: updatedItems
    })
  }

  const handleAddService = () => {
    const service: ServiceItem = {
      id: services.length + 1,
      ...newService,
      price: parseFloat(newService.price as string),
    }
    
    // Generate slug if empty
    if (!service.slug) {
      service.slug = `/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`
    }
    
    setServices([...services, service])
    resetNewService()
    setIsAddDialogOpen(false)
  }

  const handleEditService = (service: ServiceItem) => {
    setCurrentService(service)
    setNewService(service)
    setIsEditDialogOpen(true)
  }

  const handleUpdateService = () => {
    if (!currentService) return
    
    const updatedServices = services.map(service => 
      service.id === currentService.id ? { 
        ...newService, 
        id: currentService.id,
        price: typeof newService.price === 'string' ? parseFloat(newService.price) : newService.price 
      } : service
    )
    setServices(updatedServices)
    resetNewService()
    setIsEditDialogOpen(false)
  }

  const handleDeleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id))
  }

  const resetNewService = () => {
    setNewService({
      name: '',
      shortDescription: '',
      fullDescription: '',
      price: '',
      duration: '',
      features: [''],
      includes: [''],
      processSteps: [''],
      beforeImage: '',
      afterImage: '',
      galleryImages: [''],
      durationNote: '',
      bookingUrl: '',
      questionUrl: '',
      seoTitle: '',
      seoDescription: '',
      slug: '',
      status: 'draft',
      featured: false
    })
    setCurrentService(null)
  }

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Function to render repeater field
  const renderRepeaterField = (
    field: keyof Pick<NewServiceItem, 'features' | 'includes' | 'processSteps' | 'galleryImages'>, 
    label: string, 
    items: string[]
  ) => (
    <div className="space-y-3">
      <Label>{label}</Label>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="flex-grow">
            <Input
              value={item}
              onChange={(e) => updateRepeaterItem(field, index, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()} item...`}
            />
          </div>
          <div className="flex items-center space-x-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => moveItemUp(field, index)}
              disabled={index === 0}
              className="h-8 w-8"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => moveItemDown(field, index)}
              disabled={index === items.length - 1}
              className="h-8 w-8"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeRepeaterItem(field, index)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => addRepeaterItem(field)}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {label.toLowerCase()} item
      </Button>
    </div>
  )

  // Content for the service dialog
  const serviceDialogContent = () => (
    <>
      <Tabs defaultValue="basic">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              value={newService.shortDescription}
              onChange={(e) => setNewService({ ...newService, shortDescription: e.target.value })}
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description</Label>
            <Textarea
              id="fullDescription"
              value={newService.fullDescription}
              onChange={(e) => setNewService({ ...newService, fullDescription: e.target.value })}
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={newService.price.toString()}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select 
                value={newService.duration} 
                onValueChange={(value) => setNewService({ ...newService, duration: value })}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2 hours">1-2 hours</SelectItem>
                  <SelectItem value="3-4 hours">3-4 hours</SelectItem>
                  <SelectItem value="1 day">1 day</SelectItem>
                  <SelectItem value="2 days">2 days</SelectItem>
                  <SelectItem value="3 days">3 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="durationNote">Duration Note</Label>
            <Textarea
              id="durationNote"
              value={newService.durationNote}
              onChange={(e) => setNewService({ ...newService, durationNote: e.target.value })}
              rows={2}
              placeholder="Additional information about service duration..."
            />
          </div>
        </TabsContent>
        
        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          {renderRepeaterField('features', 'Features', newService.features)}
          
          <div className="pt-4">
            {renderRepeaterField('includes', 'Service Includes', newService.includes)}
          </div>
        </TabsContent>
        
        {/* Process Tab */}
        <TabsContent value="process" className="space-y-4">
          {renderRepeaterField('processSteps', 'Process Steps', newService.processSteps)}
        </TabsContent>
        
        {/* Media Tab */}
        <TabsContent value="media" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="beforeImage">Before Image URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="beforeImage"
                  value={newService.beforeImage}
                  onChange={(e) => setNewService({ ...newService, beforeImage: e.target.value })}
                  placeholder="/images/before.jpg"
                />
                <Button variant="outline" size="icon" type="button">
                  <Image className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="afterImage">After Image URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="afterImage"
                  value={newService.afterImage}
                  onChange={(e) => setNewService({ ...newService, afterImage: e.target.value })}
                  placeholder="/images/after.jpg"
                />
                <Button variant="outline" size="icon" type="button">
                  <Image className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Label>Gallery Images</Label>
            {newService.galleryImages.map((image, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <div className="flex-grow">
                  <Input
                    value={image}
                    onChange={(e) => updateRepeaterItem('galleryImages', index, e.target.value)}
                    placeholder="/images/gallery.jpg"
                  />
                </div>
                <Button variant="outline" size="icon" type="button">
                  <Image className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeRepeaterItem('galleryImages', index)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addRepeaterItem('galleryImages')}
              className="w-full mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add gallery image
            </Button>
          </div>
        </TabsContent>
        
        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bookingUrl">Booking URL</Label>
              <Input
                id="bookingUrl"
                value={newService.bookingUrl}
                onChange={(e) => setNewService({ ...newService, bookingUrl: e.target.value })}
                placeholder="/booking?service=example"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="questionUrl">Question URL</Label>
              <Input
                id="questionUrl"
                value={newService.questionUrl}
                onChange={(e) => setNewService({ ...newService, questionUrl: e.target.value })}
                placeholder="/contact?inquiry=example"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input
              id="seoTitle"
              value={newService.seoTitle}
              onChange={(e) => setNewService({ ...newService, seoTitle: e.target.value })}
              placeholder="Service Name | Company"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              value={newService.seoDescription}
              onChange={(e) => setNewService({ ...newService, seoDescription: e.target.value })}
              rows={2}
              placeholder="Brief description for search engines..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={newService.slug}
              onChange={(e) => setNewService({ ...newService, slug: e.target.value })}
              placeholder="/services/service-name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newService.status} 
                onValueChange={(value: 'draft' | 'published' | 'archived') => 
                  setNewService({ ...newService, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-end space-x-2 pt-8">
              <Label htmlFor="featured" className="cursor-pointer">Featured Service</Label>
              <Switch
                id="featured"
                checked={newService.featured}
                onCheckedChange={(checked) => setNewService({ ...newService, featured: checked })}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new service package for your customers.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {serviceDialogContent()}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService}>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>${service.price}</TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${service.status === 'published' ? 'bg-green-100 text-green-800' : 
                     service.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                     'bg-gray-100 text-gray-800'}`}>
                    {service.status}
                  </span>
                </TableCell>
                <TableCell>
                  {service.featured ? 
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Featured
                    </span> : '-'}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditService(service)} type="button">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteService(service.id)} type="button">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update the service details.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {serviceDialogContent()}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateService}>Update Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}