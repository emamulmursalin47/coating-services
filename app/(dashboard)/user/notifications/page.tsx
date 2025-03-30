/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Bell,
  Calendar,
  Car,
  Clock,
  CreditCard,
  FileText,
  Shield,
  User,
  UserCog,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Settings,
  LogOut,
  ChevronRight,
  Check
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
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

// Sample notification data
const notificationsList = [
  {
    id: 1,
    title: 'Warranty Expiring Soon',
    message: 'Your Basic Ceramic Coating warranty expires in 30 days. Consider renewing for continued protection.',
    date: '2025-03-25',
    type: 'warranty',
    read: false
  },
  {
    id: 2,
    title: 'Maintenance Reminder',
    message: 'Your vehicle is due for its 6-month ceramic coating inspection. Schedule an appointment soon.',
    date: '2025-03-20',
    type: 'maintenance',
    read: false
  },
  {
    id: 3,
    title: 'Appointment Confirmation',
    message: 'Your appointment for Premium Interior Coating is confirmed for April 5, 2025 at 10:00 AM.',
    date: '2025-03-15',
    type: 'appointment',
    read: true
  },
  {
    id: 4,
    title: 'Special Offer Available',
    message: 'As a valued customer, you qualify for 15% off your next ceramic coating service. Valid until May 1.',
    date: '2025-03-10',
    type: 'promotion',
    read: true
  },
  {
    id: 5,
    title: 'New Product Launch',
    message: 'We\'ve launched a new Graphene Coating service. Check out the details and benefits.',
    date: '2025-02-28',
    type: 'news',
    read: true
  }
]

// User profile data
const userProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  address: {
    street: '123 Main Street',
    city: 'Austin',
    state: 'TX',
    zip: '78701'
  },
  memberSince: '2023-05-15',
  preferredLocation: 'North Austin',
  preferredContactMethod: 'email'
}

export default function NotificationsSettingsPage() {
  const [activeTab, setActiveTab] = useState('notifications')
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    appointmentReminders: true,
    warrantyAlerts: true,
    maintenanceReminders: true,
    promotions: false,
    newsUpdates: true
  })
  const [notifications, setNotifications] = useState(notificationsList)
  
  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
  }
  
  // Delete notification
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }
  
  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
  }
  
  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'warranty': return <Shield className="h-5 w-5 text-blue-600" />
      case 'maintenance': return <Car className="h-5 w-5 text-green-600" />
      case 'appointment': return <Calendar className="h-5 w-5 text-purple-600" />
      case 'promotion': return <CreditCard className="h-5 w-5 text-amber-600" />
      case 'news': return <FileText className="h-5 w-5 text-red-600" />
      default: return <Bell className="h-5 w-5 text-gray-600" />
    }
  }
  
  // Handle notification settings change
  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: value
    })
  }
  
  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {activeTab === 'notifications' ? 'Notifications' : 'Account Settings'}
          </h1>
          <p className="text-muted-foreground">
            {activeTab === 'notifications' 
              ? 'View and manage your notifications' 
              : 'Manage your account preferences and information'}
          </p>
        </div>
        {activeTab === 'notifications' && (
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>
      
      {/* Main tabs */}
      <Tabs defaultValue="notifications" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Types Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Center</CardTitle>
              <CardDescription>View and manage your recent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`border rounded-lg p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium ${notification.read ? '' : 'font-semibold'}`}>
                              {notification.title}
                            </h3>
                            <div className="flex items-center">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-6 w-6 p-0 rounded-full"
                                disabled={notification.read}
                              >
                                <Check className="h-3.5 w-3.5 text-blue-600" />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-6 w-6 p-0 rounded-full ml-1 text-red-600"
                              >
                                <span className="sr-only">Delete</span>
                                ×
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center mt-2">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                            <span className="text-xs text-muted-foreground">
                              {notification.date}
                            </span>
                            <Badge variant="outline" className="ml-2 text-xs font-normal">
                              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="font-medium text-lg">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </div>
              )}
            </CardContent>
            {notifications.length > 0 && (
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" disabled={unreadCount === 0} onClick={markAllAsRead}>
                  Mark all as read
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">Clear All</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear all notifications?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your notifications.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={clearAllNotifications}>
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                  </AlertDialog>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you'd like to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Notification Methods</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <span>Email Notifications</span>
                      </div>
                      <Switch
                        checked={notificationSettings.email}
                        onCheckedChange={(checked) => handleSettingChange('email', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-purple-600" />
                        <span>Push Notifications</span>
                      </div>
                      <Switch
                        checked={notificationSettings.push}
                        onCheckedChange={(checked) => handleSettingChange('push', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-green-600" />
                        <span>SMS Notifications</span>
                      </div>
                      <Switch
                        checked={notificationSettings.sms}
                        onCheckedChange={(checked) => handleSettingChange('sms', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Notification Types</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-amber-600" />
                        <span>Appointment Reminders</span>
                      </div>
                      <Switch
                        checked={notificationSettings.appointmentReminders}
                        onCheckedChange={(checked) => handleSettingChange('appointmentReminders', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-red-600" />
                        <span>Warranty Alerts</span>
                      </div>
                      <Switch
                        checked={notificationSettings.warrantyAlerts}
                        onCheckedChange={(checked) => handleSettingChange('warrantyAlerts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Car className="h-5 w-5 text-indigo-600" />
                        <span>Maintenance Reminders</span>
                      </div>
                      <Switch
                        checked={notificationSettings.maintenanceReminders}
                        onCheckedChange={(checked) => handleSettingChange('maintenanceReminders', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-emerald-600" />
                        <span>Promotions & Offers</span>
                      </div>
                      <Switch
                        checked={notificationSettings.promotions}
                        onCheckedChange={(checked) => handleSettingChange('promotions', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-cyan-600" />
                        <span>News & Updates</span>
                      </div>
                      <Switch
                        checked={notificationSettings.newsUpdates}
                        onCheckedChange={(checked) => handleSettingChange('newsUpdates', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Personal Information</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-600" />
                        <span>Name</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {userProfile.name}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-600" />
                        <span>Email</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {userProfile.email}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-600" />
                        <span>Phone</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {userProfile.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Preferred Contact Method</Label>
                  <RadioGroup 
                    defaultValue={userProfile.preferredContactMethod}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="email" id="email" className="peer sr-only" />
                      <Label
                        htmlFor="email"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Mail className="mb-3 h-6 w-6" />
                        Email
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="sms" id="sms" className="peer sr-only" />
                      <Label
                        htmlFor="sms"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <MessageSquare className="mb-3 h-6 w-6" />
                        Text
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="phone" id="phone" className="peer sr-only" />
                      <Label
                        htmlFor="phone"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Phone className="mb-3 h-6 w-6" />
                        Call
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Security</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-gray-600" />
                        <span>Change Password</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">
                        Change
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <UserCog className="h-5 w-5 text-gray-600" />
                        <span>Two-Factor Authentication</span>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}