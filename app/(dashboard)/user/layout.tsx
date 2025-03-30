'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  FileText, 
  Car,
  Bell,
  Shield,
  Menu,
  X,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/user',
    icon: LayoutDashboard
  },
  {
    title: 'Appointments',
    href: '/user/appointments',
    icon: Calendar
  },
  {
    title: 'My Vehicles',
    href: '/user/vehicles',
    icon: Car
  },
  {
    title: 'Documents',
    href: '/user/documents',
    icon: FileText
  },
  {
    title: 'Warranties',
    href: '/user/warranties',
    icon: Shield
  },
  {
    title: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
    badge: '2'
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  }
]

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-sm text-muted-foreground">john@example.com</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center p-3 rounded-lg transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/auth/logout" className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-200 ease-in-out",
        isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
      )}>
        <div className="container mx-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}