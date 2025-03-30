'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar,
  FileText,
  Download,
  Eye,
  Upload,
  Clock,
  Filter,
  Search,
  Share2
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

// Define document types with proper interfaces
interface BaseDocument {
  id: number;
  title: string;
  date: string;
  type: string;
}

interface WarrantyDocument extends BaseDocument {
  expiryDate: string;
  status: string;
}

interface ServiceDocument extends BaseDocument {
  technician: string;
}

interface GuideDocument extends BaseDocument {
  // No additional properties needed
}

// Sample documents data
const documentsData = {
  warranties: [
    {
      id: 1,
      title: 'Basic Ceramic Coating Warranty',
      date: '2024-02-15',
      expiryDate: '2026-02-15',
      type: 'warranty',
      status: 'active'
    },
    {
      id: 2,
      title: 'Premium Ceramic Coating Warranty',
      date: '2024-03-28',
      expiryDate: '2026-03-28',
      type: 'warranty',
      status: 'pending'
    }
  ] as WarrantyDocument[],
  serviceRecords: [
    {
      id: 1,
      title: 'Basic Ceramic Coating Service Receipt',
      date: '2024-02-15',
      technician: 'Michael Thompson',
      type: 'receipt'
    },
    {
      id: 2,
      title: 'Vehicle Condition Report - Pre-Service',
      date: '2024-02-15',
      technician: 'Michael Thompson',
      type: 'report'
    }
  ] as ServiceDocument[],
  instructionalGuides: [
    {
      id: 1,
      title: 'Ceramic Coating Maintenance Guide',
      date: '2024-02-15',
      type: 'guide'
    },
    {
      id: 2,
      title: 'Proper Washing Techniques for Coated Vehicles',
      date: '2024-02-15',
      type: 'guide'
    }
  ] as GuideDocument[]
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  
  // Filter documents based on search term and filter type
  const filteredDocuments = () => {
    const allDocs = [
      ...documentsData.warranties,
      ...documentsData.serviceRecords,
      ...documentsData.instructionalGuides
    ]
    
    return allDocs
      .filter(doc => doc.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(doc => filterType === 'all' ? true : doc.type === filterType)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  
  // Helper function to get badge color based on document type
  const getBadgeVariant = (type: string) => {
    switch(type) {
      case 'warranty': return 'default'
      case 'receipt': return 'secondary'
      case 'report': return 'outline'
      case 'guide': return 'destructive'
      default: return 'secondary'
    }
  }

  // Type guard to check if a document is a warranty document
  const isWarrantyDocument = (doc: BaseDocument): doc is WarrantyDocument => {
    return doc.type === 'warranty';
  }
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Manage your warranties, receipts and guides</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/documents/upload" className="flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Link>
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Documents</SelectItem>
            <SelectItem value="warranty">Warranties</SelectItem>
            <SelectItem value="receipt">Receipts</SelectItem>
            <SelectItem value="report">Reports</SelectItem>
            <SelectItem value="guide">Guides</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Warranty Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Warranty Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentsData.warranties.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium">{doc.title}</h3>
                    <Badge variant={doc.status === 'active' ? 'default' : 'outline'} className="ml-2">
                      {doc.status === 'active' ? 'Active' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>Valid until: {doc.expiryDate}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Service Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Service Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentsData.serviceRecords.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium">{doc.title}</h3>
                    <Badge variant={getBadgeVariant(doc.type)} className="ml-2">
                      {doc.type === 'receipt' ? 'Receipt' : 'Report'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>{doc.date}</span>
                    <span className="ml-2">Technician: {doc.technician}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Guides & Manuals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Guides & Manuals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentsData.instructionalGuides.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex-1">
                  <h3 className="font-medium">{doc.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>Added on: {doc.date}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* All Documents Section */}
      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments().length > 0 ? (
              filteredDocuments().map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium">{doc.title}</h3>
                      <Badge variant={getBadgeVariant(doc.type)} className="ml-2">
                        {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>{doc.date}</span>
                      {isWarrantyDocument(doc) && (
                        <span className="ml-2">Expires: {doc.expiryDate}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium text-lg">No documents found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}