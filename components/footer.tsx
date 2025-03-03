import Link from 'next/link'
import { ShieldCheck, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">CeramicShield Pro</span>
            </div>
            <p className="text-muted-foreground">
              Premium ceramic coating services to protect and enhance your vehicle with long-lasting shine and protection.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-muted-foreground hover:text-primary transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/basic-coating" className="text-muted-foreground hover:text-primary transition-colors">
                  Basic Ceramic Coating
                </Link>
              </li>
              <li>
                <Link href="/services/premium-coating" className="text-muted-foreground hover:text-primary transition-colors">
                  Premium Ceramic Coating
                </Link>
              </li>
              <li>
                <Link href="/services/paint-protection" className="text-muted-foreground hover:text-primary transition-colors">
                  Paint Protection Film
                </Link>
              </li>
              <li>
                <Link href="/services/interior-coating" className="text-muted-foreground hover:text-primary transition-colors">
                  Interior Coating
                </Link>
              </li>
              <li>
                <Link href="/services/maintenance" className="text-muted-foreground hover:text-primary transition-colors">
                  Maintenance Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">123 Detailing Street, Automotive City, AC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary shrink-0" />
                <span className="text-muted-foreground">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary shrink-0" />
                <span className="text-muted-foreground">info@ceramicshieldpro.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CeramicShield Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer