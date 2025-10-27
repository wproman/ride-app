// pages/FeaturesRider.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Car, Clock, CreditCard, Download, MapPin, Shield, Smartphone, Star, Zap } from 'lucide-react';
import { Link } from 'react-router';

const RiderFeatures = () => {
  const detailedFeatures = [
    {
      icon: Car,
      title: 'Instant Booking',
      description: 'Book a ride in seconds with our intuitive interface',
      details: ['One-tap booking', 'Multiple vehicle options', 'Price estimation', 'Ride history']
    },
    {
      icon: MapPin,
      title: 'Live Tracking',
      description: 'Real-time driver location and ETA updates',
      details: ['Live GPS tracking', 'Accurate ETAs', 'Route optimization', 'Driver information']
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-level security',
      details: ['Credit/Debit cards', 'Mobile wallets', 'Cash payments', 'Ride receipts']
    },
    {
      icon: Star,
      title: 'Ratings System',
      description: 'Rate your experience and maintain service quality',
      details: ['Driver ratings', 'Trip feedback', 'Quality assurance', 'Community standards']
    },
    {
      icon: Shield,
      title: 'Safety Features',
      description: 'Comprehensive safety measures for every ride',
      details: ['Emergency button', 'Share ride details', '24/7 support', 'Trip verification']
    },
    {
      icon: Clock,
      title: 'Schedule Rides',
      description: 'Book rides in advance for planned trips',
      details: ['Advance booking', 'Recurring rides', 'Airport transfers', 'Event planning']
    }
  ];

  const appFeatures = [
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Available on iOS and Android'
    },
    {
      icon: Download,
      title: 'Easy Setup',
      description: 'Download and start riding in minutes'
    },
    {
      icon: Zap,
      title: 'Fast Matching',
      description: 'Find drivers near you instantly'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="flex items-center gap-2">
            <Link to="/features">
              <ArrowLeft className="h-4 w-4" />
              Back to All Features
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Rider Experience
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Rider Features</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a seamless, safe, and comfortable ride experience
          </p>
        </div>

        {/* App Highlights */}
        <Card className="mb-12 bg-blue-50 border-blue-200">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {appFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {detailedFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-blue-100">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <Zap className="h-4 w-4 text-blue-500 mr-2 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/features/driver">
              View Driver Features
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/features/admin">
              View Admin Features
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </Button>
        </div>

        {/* CTA Section */}
        <Card className="bg-linear-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Riding?</h2>
            <p className="text-blue-100 mb-6 max-w-md mx-auto">
              Download the app today and experience the future of transportation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Download className="h-5 w-5 mr-2" />
                Download App
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/signup">Sign Up Free</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiderFeatures;