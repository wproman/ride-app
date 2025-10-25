
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Download, MapPin, Search, Smartphone, Star } from 'lucide-react';
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Book a Ride',
      description: 'Enter your destination, choose your ride, and confirm your booking in seconds.',
      icon: Car,
      color: 'text-blue-600'
    },
    {
      number: '02',
      title: 'Get Matched',
      description: 'We connect you with the nearest available driver for quick pickup.',
      icon: Search,
      color: 'text-green-600'
    },
    {
      number: '03',
      title: 'Track Your Ride',
      description: 'Follow your driver in real-time and get accurate arrival estimates.',
      icon: MapPin,
      color: 'text-purple-600'
    },
    {
      number: '04',
      title: 'Enjoy the Ride',
      description: 'Sit back, relax, and enjoy a safe and comfortable journey.',
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Simple & Easy
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting where you need to go has never been easier. Follow these simple steps to start your journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative group hover:shadow-lg transition-all duration-300 border"
            >
              <CardContent className="p-6 text-center">
                {/* Step Number Badge */}
                <Badge 
                  variant="default" 
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full p-0 flex items-center justify-center text-xs font-bold"
                >
                  {step.number}
                </Badge>
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
              
              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-primary to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="max-w-4xl mx-auto border shadow-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Ready to Start Your Journey?</CardTitle>
            <CardDescription className="text-lg">
              Download the app now and experience the future of urban transportation.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                App Store
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Smartphone className="h-5 w-5" />
                Google Play
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Available on iOS and Android devices
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;