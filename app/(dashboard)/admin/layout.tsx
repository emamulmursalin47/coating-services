'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  Package, 
  Users, 
  FileText, 
  DollarSign,
  ChevronDown,
  Menu,
  X,
  Megaphone,
  Box
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Services',
    href: '/admin/services',
    icon: Package
  },
  {
    title: 'Appointments',
    href: '/admin/appointments',
    icon: Calendar
  },
  {
    title: 'Customers',
    href: '/admin/customers',
    icon: Users
  },
  {
    title: 'Inventory',
    href: '/admin/inventory',
    icon: Box
  },
  {
    title: 'Marketing',
    href: '/admin/marketing',
    icon: Megaphone
  },
  {
    title: 'Reports',
    href: '/admin/reports',
    icon: FileText,
    submenu: [
      { title: 'Sales', href: '/admin/reports/sales' },
      { title: 'Revenue', href: '/admin/reports/revenue' },
      { title: 'Performance', href: '/admin/reports/performance' }
    ]
  },
  {
    title: 'Finances',
    href: '/admin/finances',
    icon: DollarSign
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

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
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1 p-2">
              {sidebarItems.map((item) => (
                <li key={item.title}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => setExpandedItem(expandedItem === item.title ? null : item.title)}
                        className={cn(
                          "flex items-center w-full p-3 rounded-lg transition-colors",
                          pathname.startsWith(item.href)
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        )}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.title}</span>
                        <ChevronDown className={cn(
                          "h-4 w-4 ml-auto transition-transform",
                          expandedItem === item.title && "transform rotate-180"
                        )} />
                      </button>
                      {expandedItem === item.title && (
                        <motion.ul
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="ml-6 mt-2 space-y-1"
                        >
                          {item.submenu.map((subItem) => (
                            <li key={subItem.title}>
                              <Link
                                href={subItem.href}
                                className={cn(
                                  "block p-2 rounded-lg transition-colors",
                                  pathname === subItem.href
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-muted"
                                )}
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </div>
                  ) : (
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
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
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