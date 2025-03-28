/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Award, Users, Sparkles, CheckCircle, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About CeramicShield Pro</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're passionate about protecting and enhancing your vehicle with the highest quality ceramic coating services.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Our Workshop"
                fill
                className="object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2015, CeramicShield Pro began with a simple mission: to provide vehicle owners with the highest quality ceramic coating services that truly deliver on their promises.
              </p>
              <p className="text-muted-foreground mb-4">
                Our founder, Michael Chen, was frustrated with the inconsistent results and exaggerated claims in the automotive protection industry. With a background in chemical engineering and a passion for automobiles, he set out to create a company that would set new standards for quality, transparency, and customer service.
              </p>
              <p className="text-muted-foreground mb-6">
                Today, we're proud to have protected thousands of vehicles with our premium ceramic coatings, earning a reputation for exceptional results and honest service. Our team of certified professionals shares a commitment to excellence and a genuine love for what we do.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>10+ Years Experience</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Certified Professionals</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Premium Products</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>5-Star Rated Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at CeramicShield Pro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-none shadow-sm">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Quality Without Compromise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  We use only the highest grade ceramic coatings and never cut corners on preparation or application. Every vehicle deserves our absolute best.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-none shadow-sm">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Customer-First Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  We build lasting relationships through honest communication, education, and exceeding expectations. Your satisfaction is our ultimate goal.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-none shadow-sm">
              <CardHeader className="text-center">
                <Sparkles className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Continuous Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  We're constantly researching, testing, and refining our techniques to stay at the forefront of ceramic coating technology and application methods.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our certified professionals bring years of experience and passion to every project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Michael Chen",
                role: "Founder & Lead Technician",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                bio: "With a background in chemical engineering and 15+ years in automotive detailing, Michael leads our team with expertise and passion."
              },
              {
                name: "Sarah Johnson",
                role: "Ceramic Coating Specialist",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                bio: "Sarah's attention to detail and technical knowledge make her one of our most requested specialists for premium coating applications."
              },
              {
                name: "David Rodriguez",
                role: "Paint Correction Expert",
                image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                bio: "David specializes in paint correction and surface preparation, ensuring every vehicle has the perfect foundation for ceramic coating."
              },
              {
                name: "Emily Zhang",
                role: "Customer Experience Manager",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                bio: "Emily ensures every client receives exceptional service from first contact through follow-up care and maintenance guidance."
              }
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-sm">
                <div className="relative h-64">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're proud to maintain the highest standards in the industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Certified Coating Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our technicians are certified by leading ceramic coating manufacturers and undergo regular training to stay current with the latest techniques.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Eco-Friendly Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're committed to environmentally responsible practices, using water-saving techniques and eco-friendly products whenever possible.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>5-Star Customer Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our consistent 5-star ratings reflect our dedication to exceptional customer experiences and outstanding results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
              <p className="text-xl mb-8">
                Protect your vehicle with our premium ceramic coating services. Book your appointment today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/services">Explore Services</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10">
                  <Link href="/booking" className="flex items-center">
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}