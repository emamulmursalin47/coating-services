'use client'
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Define TypeScript interface for service data
interface Service {
  title: string;
  description: string;
  price: string;
  mainImage: string;
}

interface ServicesRecord {
  [key: string]: Service;
}

// Import the same services object you're using in your [id] page
// You could also move this to a shared data file
const services: ServicesRecord = {
  'basic-coating': {
    title: 'Basic Ceramic Coating',
    description: 'Essential protection for daily drivers with a brilliant shine. Lasts 1-2 years with proper maintenance.',
    price: '$499',
    mainImage: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  // Include all other services
};

export default function ServicesPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.entries(services).map(([id, service]) => (
          <motion.div 
            key={id} 
            className="bg-card rounded-lg overflow-hidden border border-border"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="relative h-56 overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full"
              >
                <Image 
                  src={service.mainImage} 
                  alt={service.title}
                  fill
                  className="object-cover transition-transform"
                />
              </motion.div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
              <p className="font-bold text-primary text-xl mb-6">{service.price}</p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild className="w-full">
                  <Link href={`/services/${id}`}>
                    View Details
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}