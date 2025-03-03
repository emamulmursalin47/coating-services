import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'basic-coating',
    title: 'Basic Ceramic Coating',
    description: 'Essential protection for daily drivers with a brilliant shine. Lasts 1-2 years with proper maintenance.',
    price: '$499',
    features: [
      'Single layer ceramic coating',
      'Paint decontamination',
      'Hand wash and clay bar treatment',
      '1-2 year protection'
    ],
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'premium-coating',
    title: 'Premium Ceramic Shield',
    description: 'Enhanced protection with multiple ceramic layers for superior durability and gloss. Lasts 3-5 years.',
    price: '$799',
    features: [
      'Multiple ceramic coating layers',
      'Paint correction (minor imperfections)',
      'Wheel faces ceramic coated',
      '3-5 year protection'
    ],
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ultimate-coating',
    title: 'Ultimate Ceramic Defense',
    popular: true,
    description: 'Our flagship protection package with comprehensive paint correction and maximum ceramic layers. Lasts 5+ years.',
    price: '$1,299',
    features: [
      'Multiple premium ceramic coating layers',
      'Full paint correction',
      'Wheels, trim, and glass ceramic coated',
      '5+ year protection with warranty'
    ],
    image: 'https://images.unsplash.com/photo-1611821639601-d0a1db1490c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'paint-protection',
    title: 'Paint Protection Film',
    description: 'Ultimate physical protection against rock chips, scratches, and road debris with self-healing technology.',
    price: 'From $1,499',
    features: [
      'Premium self-healing film',
      'Custom cut for your vehicle',
      'Partial or full coverage options',
      '10-year warranty'
    ],
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'interior-coating',
    title: 'Interior Ceramic Coating',
    description: 'Protect your interior surfaces from spills, UV damage, and wear with our specialized interior coating.',
    price: '$399',
    features: [
      'Leather, vinyl, and fabric protection',
      'UV damage prevention',
      'Stain resistance',
      '1-2 year durability'
    ],
    image: 'https://images.unsplash.com/photo-1583836631333-f7edcf2ee78a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'maintenance',
    title: 'Maintenance Services',
    description: 'Keep your ceramic coating performing at its best with our specialized maintenance services.',
    price: 'From $149',
    features: [
      'Ceramic coating inspection',
      'Specialized wash service',
      'Ceramic boost application',
      'Recommended every 6 months'
    ],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Ceramic Coating Services</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our range of premium ceramic coating services designed to protect and enhance your vehicle's appearance.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Shield className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline">
                    <Link href={`/services/${service.id}`}>
                      Learn More
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/booking?service=${service.id}`}>
                      Book Now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Custom Services */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-muted-foreground mb-8">
              We offer tailored ceramic coating packages for special vehicles, fleets, or specific requirements.
              Contact us to discuss your unique needs.
            </p>
            <Button asChild size="lg">
              <Link href="/contact" className="flex items-center">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}