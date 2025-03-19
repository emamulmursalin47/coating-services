/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, ArrowLeft, Calendar } from 'lucide-react';

// Define the page props type
type ServicePageProps = {
  params: {
    id: string;
  };
};

// Define our service type
type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  image: string;
  popular?: boolean;
  longDescription?: string;
};

// Our services data (this should ideally be in a separate data file)
const services: Service[] = [
  {
    id: 'basic-coating',
    title: 'Basic Ceramic Coating',
    description: 'Essential protection for daily drivers with a brilliant shine. Lasts 1-2 years with proper maintenance.',
    longDescription: 'Our Basic Ceramic Coating service provides essential protection for daily drivers. The single-layer ceramic coating creates a hydrophobic barrier against environmental contaminants, UV rays, and light scratches. Includes thorough paint decontamination, hand wash, and clay bar treatment to prepare your vehicle\'s surface for optimal ceramic bonding. Perfect for daily drivers looking for improved shine and easier maintenance.',
    price: '$499',
    features: [
      'Single layer ceramic coating',
      'Paint decontamination',
      'Hand wash and clay bar treatment',
      '1-2 year protection',
      'Hydrophobic properties for easier cleaning',
      'Enhanced gloss finish',
      'Basic UV protection',
      'Complimentary maintenance guide'
    ],
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'premium-coating',
    title: 'Premium Ceramic Shield',
    description: 'Enhanced protection with multiple ceramic layers for superior durability and gloss. Lasts 3-5 years.',
    longDescription: 'The Premium Ceramic Shield offers enhanced protection through multiple ceramic coating layers. We first perform minor paint correction to remove light swirl marks and imperfections, then apply multiple layers of high-grade ceramic coating. The wheel faces are also ceramic coated for comprehensive protection. This package delivers superior durability, deeper gloss, and stronger resistance to environmental damage.',
    price: '$799',
    features: [
      'Multiple ceramic coating layers',
      'Paint correction (minor imperfections)',
      'Wheel faces ceramic coated',
      '3-5 year protection',
      'Enhanced hydrophobic and chemical resistance',
      'Superior gloss and depth',
      'Improved UV protection',
      'Maintenance service after 6 months'
    ],
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ultimate-coating',
    title: 'Ultimate Ceramic Defense',
    popular: true,
    description: 'Our flagship protection package with comprehensive paint correction and maximum ceramic layers. Lasts 5+ years.',
    longDescription: 'The Ultimate Ceramic Defense is our flagship protection package, designed for enthusiasts and luxury vehicle owners. We perform full paint correction to remove imperfections, swirl marks, and minor scratches before applying multiple premium ceramic coating layers. The comprehensive protection includes wheels, trim, and glass, providing maximum resistance against environmental damage. Backed by our 5+ year warranty, this package delivers unparalleled gloss, depth, and longevity.',
    price: '$1,299',
    features: [
      'Multiple premium ceramic coating layers',
      'Full paint correction',
      'Wheels, trim, and glass ceramic coated',
      '5+ year protection with warranty',
      'Maximum hydrophobic properties',
      'Ultimate gloss and color enhancement',
      'Complete UV and chemical protection',
      'Bi-annual maintenance service included for first year',
      'Priority scheduling for maintenance services'
    ],
    image: 'https://images.unsplash.com/photo-1611821639601-d0a1db1490c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'paint-protection',
    title: 'Paint Protection Film',
    description: 'Ultimate physical protection against rock chips, scratches, and road debris with self-healing technology.',
    longDescription: 'Our Paint Protection Film offers the ultimate physical protection for your vehicle. Using premium self-healing film custom cut for your specific vehicle model, this invisible shield safeguards against rock chips, scratches, and road debris. The advanced film features self-healing properties activated by heat, allowing minor scratches to disappear over time. Available in partial (high-impact areas) or full coverage options, with a comprehensive 10-year warranty against yellowing, cracking, or peeling.',
    price: 'From $1,499',
    features: [
      'Premium self-healing film',
      'Custom cut for your vehicle',
      'Partial or full coverage options',
      '10-year warranty',
      'Impact and scratch resistance',
      'Self-healing technology',
      'UV and stain protection',
      'Optionally combined with ceramic coating for ultimate protection',
      'Professional installation by certified technicians'
    ],
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'interior-coating',
    title: 'Interior Ceramic Coating',
    description: 'Protect your interior surfaces from spills, UV damage, and wear with our specialized interior coating.',
    longDescription: 'The Interior Ceramic Coating service applies specialized protection to all interior surfaces including leather, vinyl, and fabric. This creates an invisible barrier against spills, UV damage, and daily wear. The coating prevents premature aging and cracking of leather and vinyl surfaces while making fabrics more resistant to stains. It maintains the original appearance of your interior, keeping it looking newer for longer while making regular cleaning easier and more effective.',
    price: '$399',
    features: [
      'Leather, vinyl, and fabric protection',
      'UV damage prevention',
      'Stain resistance',
      '1-2 year durability',
      'Easier interior cleaning',
      'Prevents material fading',
      'Reduces dust accumulation',
      'Preserves factory appearance',
      'Complete interior detailing included'
    ],
    image: 'https://images.unsplash.com/photo-1583836631333-f7edcf2ee78a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'maintenance',
    title: 'Maintenance Services',
    description: 'Keep your ceramic coating performing at its best with our specialized maintenance services.',
    longDescription: 'Our Maintenance Services are designed to preserve the performance and appearance of your ceramic coating. During each service, we conduct a thorough inspection of the coating condition, perform a specialized wash using pH-neutral products safe for ceramic coatings, and apply a ceramic boost spray to refresh the hydrophobic properties. Regular maintenance (recommended every 6 months) significantly extends the life of your coating and maintains its protective capabilities and appearance.',
    price: 'From $149',
    features: [
      'Ceramic coating inspection',
      'Specialized wash service',
      'Ceramic boost application',
      'Recommended every 6 months',
      'pH-neutral product usage',
      'Restoration of hydrophobic properties',
      'Minor contaminant removal',
      'Performance assessment',
      'Detailed maintenance report'
    ],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export default async function ServicePage({ params }:any) {
  const { id } = await params;
  
  // Find the service that matches the ID from the URL
  const service = services.find(s => s.id === id);
  
  // Handle case where service is not found
  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">We couldn't find the service you're looking for.</p>
        <Button asChild>
          <Link href="/services">Back to Services</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-full md:w-1/2 h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
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
            <div className="w-full md:w-1/2">
              <Button asChild variant="outline" className="mb-4">
                <Link href="/services" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
                </Link>
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
              <div className="flex items-center mb-8">
                <span className="text-3xl font-bold text-primary">{service.price}</span>
              </div>
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link href={`/booking?service=${service.id}`} className="flex items-center justify-center">
                  <Calendar className="mr-2 h-5 w-5" /> Book This Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Details Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Service Details</h2>
              <p className="text-muted-foreground mb-8">
                {service.longDescription}
              </p>
              
              <h3 className="text-xl font-bold mb-4">What's Included</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Shield className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <Card className="shadow-md border-none">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Ready to Book?</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Schedule your appointment today and give your vehicle the protection it deserves.
                  </p>
                  <Button asChild className="w-full mb-4">
                    <Link href={`/booking?service=${service.id}`}>
                      Book Now
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/contact">
                      Ask a Question
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Need More Information?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Contact our team for any questions about our ceramic coating services.
                </p>
                <div className="bg-muted/40 rounded-lg p-4">
                  <p className="text-sm mb-1"><strong>Phone:</strong> (555) 123-4567</p>
                  <p className="text-sm mb-1"><strong>Email:</strong> info@ceramicpro.com</p>
                  <p className="text-sm"><strong>Hours:</strong> Mon-Sat, 9am-6pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Services Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter(s => s.id !== service.id)
              .slice(0, 3)
              .map(relatedService => (
                <Card key={relatedService.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image 
                      src={relatedService.image} 
                      alt={relatedService.title}
                      fill
                      className="object-cover"
                    />
                    {relatedService.popular && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-bold mb-2">{relatedService.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{relatedService.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">{relatedService.price}</span>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/services/${relatedService.id}`}>
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}