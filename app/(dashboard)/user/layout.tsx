'use client'

import { useState, useEffect } from 'react'
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
  LogOut,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

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
    title: 'Settings & Notifications',
    href: '/user/notifications',
    icon: Bell,
    badge: '2'
  }
]

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileSheet, setMobileSheet] = useState(false)
  const [pageTitle, setPageTitle] = useState('Dashboard')

  // Detect mobile viewport and initialize sidebar state
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }
    
    // Set initial state
    checkIsMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile)
    
    // Update page title based on current path
    const currentItem = sidebarItems.find(item => item.href === pathname)
    if (currentItem) {
      setPageTitle(currentItem.title)
    }
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [pathname])

  // Toggle sidebar for larger screens
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Close mobile sheet when a link is clicked
  const handleNavClick = () => {
    if (isMobile) {
      setMobileSheet(false)
    }
  }

  // Sidebar content component (reused in both desktop and mobile views)
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* User Profile Section */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
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
                onClick={handleNavClick}
                className={cn(
                  "flex items-center p-3 rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="line-clamp-1">{item.title}</span>
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
      <div className="p-4 border-t mt-auto">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/auth/logout" className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
        <Sheet open={mobileSheet} onOpenChange={setMobileSheet}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        
        <h1 className="text-xl font-bold">{pageTitle}</h1>
        
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className={cn(
          "hidden lg:block fixed inset-y-0 left-0 z-30 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <SidebarContent />
        </div>

        {/* Sidebar Toggle Button (Desktop) */}
        <button 
          onClick={toggleSidebar}
          className="hidden lg:flex fixed z-40 items-center justify-center h-8 w-8 rounded-r-md bg-primary text-primary-foreground left-64 top-6 transform transition-transform duration-200 ease-in-out hover:bg-primary/90"
          style={{ 
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-16rem)',
          }}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform", 
            isSidebarOpen ? "rotate-180" : "rotate-0"
          )} />
        </button>

        {/* Main Content */}
        <div className={cn(
          "flex-1 transition-all duration-200 ease-in-out",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}>
          <main className="container mx-auto px-4 sm:px-6 py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}