'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar,
  Clock,
  Car,
  DollarSign,
  Shield,
  Bell,
  FileText,
  Settings,
  ChevronRight,
  Plus
} from 'lucide-react'

// Sample user data
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  vehicle: {
    make: 'BMW',
    model: 'M3',
    year: '2023'
  },
  upcomingAppointments: [
    {
      id: 1,
      service: 'Premium Ceramic Coating',
      date: '2024-03-28',
      time: '10:00 AM',
      status: 'confirmed'
    }
  ],
  pastServices: [
    {
      id: 1,
      service: 'Basic Ceramic Coating',
      date: '2024-02-15',
      warranty: '2 years',
      nextService: '2024-08-15'
    }
  ],
  notifications: [
    {
      id: 1,
      type: 'appointment',
      message: 'Upcoming appointment reminder: Premium Ceramic Coating',
      date: '2024-03-27'
    },
    {
      id: 2,
      type: 'maintenance',
      message: 'Time for your 6-month coating maintenance check',
      date: '2024-03-25'
    }
  ]
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {userData.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your vehicle</p>
        </div>
        <Button asChild>
          <Link href="/booking" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Book Service
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Service</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mar 28</div>
            <p className="text-xs text-muted-foreground">Premium Coating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Warranty Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">Until Feb 2026</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Lifetime services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250</div>
            <p className="text-xs text-muted-foreground">Points earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Make</p>
                  <p className="font-medium">{userData.vehicle.make}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">{userData.vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{userData.vehicle.year}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">Update Vehicle Info</Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Service */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Upcoming Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userData.upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="space-y-4">
                <div>
                  <h3 className="font-medium">{appointment.service}</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{appointment.date}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  {notification.type === 'appointment' ? (
                    <Calendar className="h-5 w-5 text-primary" />
                  ) : (
                    <Bell className="h-5 w-5 text-primary" />
                  )}
                  <div>
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/documents">
                  <FileText className="h-4 w-4 mr-2" />
                  View Documents
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/appointments">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Appointments
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  All Notifications
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}