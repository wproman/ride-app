
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import {
  DollarSign,
  Download,
  HeadphonesIcon,
  MapPin,
  Shield,
  Star,
  Users,
  Zap
} from 'lucide-react';
import React from 'react';

const ServiceHighlights: React.FC = () => {
  const services = [
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Get a ride in seconds with our instant matching system',
      color: 'text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All drivers verified with background checks and real-time tracking',
      color: 'text-green-600'
    },
    {
      icon: DollarSign,
      title: 'Best Prices',
      description: 'Competitive pricing with no surprise charges',
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'City Coverage',
      description: 'Available in 50+ cities across the country',
      color: 'text-purple-600'
    },
    {
      icon: Star,
      title: 'Top Rated',
      description: '4.9/5 rating from thousands of happy customers',
      color: 'text-orange-600'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your needs',
      color: 'text-red-600'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why Choose RideShare?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are committed to providing the best ride-sharing experience with features that put you first.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border cursor-pointer hover:border-primary/20"
            >
              <CardContent className="p-6 text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className={`h-8 w-8 ${service.color}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-linear-to-r from-primary to-purple-600 border-0">
          <CardContent className="p-12 text-center text-primary-foreground">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl md:text-3xl text-primary-foreground">
                Join Thousands of Happy Users
              </CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                Experience the difference with RideShare. Download the app and get your first ride with 50% off!
              </CardDescription>
              <Button 
                size="lg" 
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold px-8 py-6 shadow-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Claim Your Discount
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServiceHighlights;