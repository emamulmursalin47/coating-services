/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Clock, ArrowRight, CheckCircle } from 'lucide-react'

// This would typically come from a database or API
const services = {
  'basic-coating': {
    title: 'Basic Ceramic Coating',
    description: 'Essential protection for daily drivers with a brilliant shine. Lasts 1-2 years with proper maintenance.',
    longDescription: 'Our Basic Ceramic Coating package provides essential protection for daily drivers who want to maintain their vehicle\'s appearance with minimal effort. This entry-level ceramic coating creates a hydrophobic surface that repels water, dirt, and contaminants, making washing easier and less frequent. The coating also enhances your paint\'s gloss and depth, giving your vehicle a showroom shine that lasts far longer than traditional waxes or sealants.',
    price: '$499',
    duration: '1 day',
    features: [
      'Single layer ceramic coating',
      'Paint decontamination',
      'Hand wash and clay bar treatment',
      'Minor surface preparation',
      '1-2 year protection',
      'Hydrophobic properties',
      'UV protection',
      'Enhanced gloss'
    ],
    process: [
      'Thorough hand wash and decontamination',
      'Clay bar treatment to remove embedded contaminants',
      'Surface preparation to ensure proper bonding',
      'Application of ceramic coating',
      'Curing time',
      'Final inspection'
    ],
    mainImage: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1605515298946-d0573716f0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  'premium-coating': {
    title: 'Premium Ceramic Shield',
    description: 'Enhanced protection with multiple ceramic layers for superior durability and gloss. Lasts 3-5 years.',
    longDescription: 'Our Premium Ceramic Shield package takes protection to the next level with multiple layers of high-grade ceramic coating. This service includes paint correction to address minor imperfections, swirl marks, and light scratches before applying the ceramic coating. The result is a deeper, more reflective finish with enhanced durability that lasts 3-5 years with proper maintenance. The multi-layer approach provides superior chemical resistance and protection against environmental contaminants.',
    price: '$799',
    duration: '1-2 days',
    features: [
      'Multiple ceramic coating layers',
      'Paint correction (minor imperfections)',
      'Wheel faces ceramic coated',
      'Extensive surface preparation',
      '3-5 year protection',
      'Superior hydrophobic properties',
      'Enhanced chemical resistance',
      'Maximum gloss and depth'
    ],
    process: [
      'Thorough hand wash and decontamination',
      'Clay bar treatment to remove embedded contaminants',
      'Paint correction to remove swirl marks and minor imperfections',
      'Surface preparation for optimal bonding',
      'Application of multiple ceramic coating layers',
      'Wheel faces ceramic coated',
      'Extended curing time',
      'Final inspection and documentation'
    ],
    mainImage: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  'ultimate-coating': {
    title: 'Ultimate Ceramic Defense',
    description: 'Our flagship protection package with comprehensive paint correction and maximum ceramic layers. Lasts 5+ years.',
    longDescription: 'The Ultimate Ceramic Defense is our flagship protection package, offering the highest level of ceramic coating protection available. This comprehensive service begins with a multi-stage paint correction process to address imperfections, swirl marks, and scratches, restoring your paint to a flawless finish. We then apply multiple layers of our premium ceramic coating to the paint, wheels, trim, and glass for complete protection. This package includes a written warranty and provides 5+ years of protection with proper maintenance.',
    price: '$1,299',
    duration: '2-3 days',
    features: [
      'Multiple premium ceramic coating layers',
      'Full paint correction',
      'Wheels, trim, and glass ceramic coated',
      'Complete exterior protection',
      '5+ year protection with warranty',
      'Maximum hydrophobic properties',
      'Superior chemical and UV resistance',
      'Ultimate gloss and depth'
    ],
    process: [
      'Thorough hand wash and decontamination',
      'Clay bar treatment to remove embedded contaminants',
      'Multi-stage paint correction to remove defects and restore gloss',
      'Extensive surface preparation for optimal bonding',
      'Application of multiple premium ceramic coating layers',
      'Wheels, trim, and glass ceramic coated',
      'Extended curing time with controlled environment',
      'Detailed documentation and warranty registration',
      'Final inspection with customer walkthrough'
    ],
    mainImage: 'https://images.unsplash.com/photo-1611821639601-d0a1db1490c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  'paint-protection': {
    title: 'Paint Protection Film',
    description: 'Ultimate physical protection against rock chips, scratches, and road debris with self-healing technology.',
    longDescription: 'Our Paint Protection Film (PPF) provides the ultimate physical barrier against road debris, rock chips, scratches, and environmental damage. This virtually invisible urethane film features self-healing technology that allows minor scratches to disappear with heat exposure. We offer partial coverage options for high-impact areas or full vehicle coverage for maximum protection. All installations are custom cut for your specific vehicle model to ensure a perfect fit and are backed by a 10-year warranty against yellowing, cracking, or peeling.',
    price: 'From $1,499',
    duration: '2-4 days',
    features: [
      'Premium self-healing film',
      'Custom cut for your vehicle',
      'Partial or full coverage options',
      'Virtually invisible protection',
      'Resistant to rock chips and scratches',
      'Self-healing technology',
      'Preserves paint finish',
      '10-year warranty'
    ],
    process: [
      'Thorough hand wash and decontamination',
      'Surface preparation',
      'Custom cutting of film patterns for your specific vehicle',
      'Precision application of film',
      'Heat forming and trimming',
      'Quality inspection',
      'Detailed documentation and warranty registration'
    ],
    mainImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  'interior-coating': {
    title: 'Interior Ceramic Coating',
    description: 'Protect your interior surfaces from spills, UV damage, and wear with our specialized interior coating.',
    longDescription: 'Our Interior Ceramic Coating service provides specialized protection for your vehicle\'s interior surfaces, including leather, vinyl, fabric, and plastic components. This advanced coating creates a hydrophobic barrier that repels liquids, prevents staining, and protects against UV damage and fading. The coating also makes cleaning easier and helps maintain that new car look and feel. With proper care, the protection lasts 1-2 years and helps preserve your vehicle\'s interior value.',
    price: '$399',
    duration: '1 day',
    features: [
      'Leather, vinyl, and fabric protection',
      'UV damage prevention',
      'Stain resistance',
      'Easier cleaning',
      'Reduced wear on high-touch areas',
      'Preserves interior appearance',
      'Prevents fading and cracking',
      '1-2 year durability'
    ],
    process: [
      'Thorough interior cleaning',
      'Surface preparation',
      'Application of specialized ceramic coating to interior surfaces',
      'Curing time',
      'Final inspection'
    ],
    mainImage: 'https://images.unsplash.com/photo-1583836631333-f7edcf2ee78a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1603811478698-0b1d6256f79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606712944349-a8b5b0491867?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  'maintenance': {
    title: 'Maintenance Services',
    description: 'Keep your ceramic coating performing at its best with our specialized maintenance services.',
    longDescription: 'Our Maintenance Services are designed to keep your ceramic coating performing at its best and extend its lifespan. These specialized services include a thorough inspection of your coating, a gentle hand wash using pH-neutral products safe for ceramic coatings, and the application of a ceramic boost spray to refresh the hydrophobic properties. Regular maintenance every 6 months is recommended to maintain optimal performance and appearance of your ceramic coating investment.',
    price: 'From $149',
    duration: '2-3 hours',
    features: [
      'Ceramic coating inspection',
      'Specialized wash service',
      'Ceramic boost application',
      'Extends coating lifespan',
      'Maintains hydrophobic properties',
      'Preserves gloss and protection',
      'Professional detailing',
      'Recommended every 6 months'
    ],
    process: [
      'Inspection of ceramic coating condition',
      'Gentle hand wash with pH-neutral products',
      'Decontamination as needed',
      'Application of ceramic boost spray',
      'Final wipe down and inspection'
    ],
    mainImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1605515298946-d0573716f0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
}
export async function generateStaticParams() {
  return Object.keys(services).map(id => ({
    id
  }));
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = services[params.id as keyof typeof services]
  
  if (!service) {
    notFound()
  }
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[40vh] md:h-[50vh]">
          <Image 
            src={service.mainImage} 
            alt={service.title}
            fill
            priority
            className="object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{service.title}</h1>
              <p className="text-xl text-white/90 max-w-2xl">{service.description}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="process">Process</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                    <p className="text-muted-foreground">{service.longDescription}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Features & Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Before & After</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.beforeAfterImages.map((images, index) => (
                        <div key={index} className="space-y-2">
                          <div className="relative h-48 rounded-lg overflow-hidden">
                            <Image 
                              src={images.before} 
                              alt="Before Ceramic Coating"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-medium">
                              Before
                            </div>
                          </div>
                          <div className="relative h-48 rounded-lg overflow-hidden">
                            <Image 
                              src={images.after} 
                              alt="After Ceramic Coating"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-primary/80 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                              After
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="process" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Process</h2>
                    <p className="text-muted-foreground mb-6">
                      Our detailed process ensures the highest quality results for your vehicle's ceramic coating.
                    </p>
                    
                    <div className="space-y-6">
                      {service.process.map((step, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6 bg-muted rounded-lg">
                    <div className="flex items-center mb-4">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-lg font-bold">Service Duration</h3>
                    </div>
                    <p>
                      This service typically takes <span className="font-semibold">{service.duration}</span> to complete.
                      The exact time may vary depending on your vehicle's size, condition, and specific requirements.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="gallery" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[service.mainImage, ...service.galleryImages].map((image, index) => (
                      <div key={index} className="relative h-48 md:h-64 rounded-lg overflow-hidden">
                        <Image 
                          src={image} 
                          alt={`${service.title} Gallery Image ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-lg border p-6 shadow-sm">
                <h3 className="text-2xl font-bold mb-2">{service.price}</h3>
                <div className="flex items-center mb-6">
                  <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">Duration: {service.duration}</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold">Includes:</h4>
                  <ul className="space-y-2">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Shield className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <Button asChild className="w-full" size="lg">
                    <Link href={`/booking?service=${params.id}`}>
                      Book This Service
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/contact">
                      Ask a Question
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Services */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">You Might Also Be Interested In</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(services)
              .filter(([id]) => id !== params.id)
              .slice(0, 3)
              .map(([id, service]) => (
                <div key={id} className="bg-card rounded-lg shadow-sm overflow-hidden border">
                  <div className="relative h-48">
                    <Image 
                      src={service.mainImage} 
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
                    <p className="font-bold text-primary mb-4">{service.price}</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/services/${id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}