import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Shield, Clock, Award, Sparkles, CheckCircle, ArrowRight } from 'lucide-react'
import HeroSection from '@/components/home/hero-section'
import HowItWorks from '@/components/home/how-it-works'
import TestimonialSection from '@/components/home/testimonial-section'

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      
      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Ceramic Coating</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our premium ceramic coating provides unmatched protection and aesthetics for your vehicle, 
              with benefits that last for years.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Superior Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Shields against UV rays, oxidation, bird droppings, tree sap, and other environmental contaminants.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Long-Lasting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Provides years of protection with proper maintenance, outlasting traditional waxes and sealants.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Sparkles className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Enhanced Gloss</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Creates a deep, mirror-like finish that enhances your vehicle's appearance and color depth.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Easy Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Hydrophobic properties repel water and contaminants, making cleaning easier and less frequent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <HowItWorks />
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Ceramic Coating Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect protection package for your vehicle
            </p>
          </div>
          
          <Tabs defaultValue="basic" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="basic">Basic Protection</TabsTrigger>
              <TabsTrigger value="premium">Premium Shield</TabsTrigger>
              <TabsTrigger value="ultimate">Ultimate Defense</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="border rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Basic Ceramic Protection</h3>
                  <p className="text-xl font-semibold text-primary mb-4">$499</p>
                  <p className="text-muted-foreground mb-6">
                    Perfect for daily drivers seeking essential protection with a brilliant shine.
                    Lasts 1-2 years with proper maintenance.
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>Single layer ceramic coating</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>Paint decontamination</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>Hand wash and clay bar treatment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>1-2 year protection</span>
                    </li>
                  </ul>
                  
                  <Button asChild size="lg">
                    <Link href="/booking?service=basic">Book This Package</Link>
                  </Button>
                </div>
                
                <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Basic Ceramic Coating"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="premium" className="border rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Premium Ceramic Shield</h3>
                  <p className="text-xl font-semibold text-primary mb-4">$799</p>
                  <p className="text-muted-foreground mb-6">
                    Enhanced protection with multiple ceramic layers for superior durability and gloss.
                    Lasts 3-5 years with proper maintenance.
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>Multiple ceramic coating layers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>Paint correction (minor imperfections)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>Wheel faces ceramic coated</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>3-5 year protection</span>
                    </li>
                  </ul>
                  
                  <Button asChild size="lg">
                    <Link href="/booking?service=premium">Book This Package</Link>
                  </Button>
                </div>
                
                <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Premium Ceramic Coating"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ultimate" className="border rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ultimate Ceramic Defense</h3>
                  <p className="text-xl font-semibold text-primary mb-4">$1,299</p>
                  <p className="text-muted-foreground mb-6">
                    Our flagship protection package with comprehensive paint correction and maximum ceramic layers.
                    Lasts 5+ years with proper maintenance.
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>Multiple premium ceramic coating layers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>Full paint correction</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>Wheels, trim, and glass ceramic coated</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>5+ year protection with warranty</span>
                    </li>
                  </ul>
                  
                  <Button asChild size="lg">
                    <Link href="/booking?service=ultimate">Book This Package</Link>
                  </Button>
                </div>
                
                <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1611821639601-d0a1db1490c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Ultimate Ceramic Coating"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/services" className="flex items-center">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <TestimonialSection />
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our ceramic coating services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long does ceramic coating last?</AccordionTrigger>
                <AccordionContent>
                  Our ceramic coatings last between 1-5+ years depending on the package you choose and how well the vehicle is maintained. Basic packages typically last 1-2 years, Premium packages 3-5 years, and our Ultimate package 5+ years with proper care.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Is ceramic coating worth the investment?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! Ceramic coating provides superior protection against environmental damage, makes cleaning easier, enhances your vehicle's appearance, and maintains its value. While the upfront cost is higher than traditional waxes, the long-term protection and reduced maintenance make it a worthwhile investment.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How should I maintain my ceramic coated vehicle?</AccordionTrigger>
                <AccordionContent>
                  Maintain your ceramic coated vehicle by washing it regularly with pH-neutral car shampoo, avoiding automatic car washes with harsh brushes, and applying a ceramic boost spray every few months. Avoid parking under trees for extended periods and clean bird droppings or tree sap promptly.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How long does the application process take?</AccordionTrigger>
                <AccordionContent>
                  The application process typically takes 1-3 days depending on the package you choose. Basic packages usually take 1 day, Premium packages 1-2 days, and our Ultimate package with full paint correction can take 2-3 days to ensure perfect results.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Can ceramic coating be applied to any vehicle?</AccordionTrigger>
                <AccordionContent>
                  Yes, ceramic coating can be applied to virtually any vehicle regardless of age, make, or model. However, vehicles with damaged or oxidized paint may require paint correction before coating application to achieve optimal results.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>Does ceramic coating prevent scratches?</AccordionTrigger>
                <AccordionContent>
                  Ceramic coating provides a sacrificial layer that offers some resistance against light scratches and swirl marks. However, it's not scratch-proof and won't prevent damage from significant impacts, improper washing techniques, or deliberate scratching. For maximum scratch protection, consider combining ceramic coating with paint protection film.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8">
              Subscribe to our newsletter for exclusive offers, maintenance tips, and updates.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground text-foreground"
                required
              />
              <Button variant="secondary">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}