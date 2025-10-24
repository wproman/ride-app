// pages/FeaturesDriver.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Award, Car, CheckCircle, Clock, DollarSign, Map, Shield, Users, Zap } from 'lucide-react';
import { Link } from 'react-router';

const DriverFeatures = () => {
  const detailedFeatures = [
    {
      icon: DollarSign,
      title: 'Flexible Earnings',
      description: 'Earn on your schedule with competitive rates',
      details: ['Surge pricing', 'Weekly payments', 'Tips included', 'Bonus opportunities']
    },
    {
      icon: Shield,
      title: 'Driver Protection',
      description: 'Comprehensive safety and insurance coverage',
      details: ['24/7 support', 'Accident insurance', 'Emergency assistance', 'Vehicle protection']
    },
    {
      icon: Map,
      title: 'Smart Navigation',
      description: 'Optimized routes and intelligent ride matching',
      details: ['GPS navigation', 'Traffic avoidance', 'Best routes', 'Destination preview']
    },
    {
      icon: Award,
      title: 'Rewards Program',
      description: 'Earn bonuses and incentives for great service',
      details: ['Weekly bonuses', 'Achievement badges', 'Priority support', 'Elite status']
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Drive whenever it works for you',
      details: ['Set your schedule', 'Take breaks anytime', 'Work part-time/full-time', 'Peak hour bonuses']
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with other drivers and get support',
      details: ['Driver forums', 'Mentorship programs', 'Local meetups', 'Training resources']
    }
  ];

  const earningsStats = [
    { label: 'Average Hourly Rate', value: '$25-35' },
    { label: 'Weekly Payout', value: 'Every Tuesday' },
    { label: 'Driver Satisfaction', value: '4.8/5' }
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
            Driver Partner
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Driver Features</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tools and features designed to help you succeed as a RideShare driver partner
          </p>
        </div>

        {/* Earnings Stats */}
        <Card className="mb-12 bg-green-50 border-green-200">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {earningsStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {detailedFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-green-100">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <Zap className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Requirements Section */}
        <Card className="mb-8 border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Driver Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Basic Requirements</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Valid driver's license</li>
                  <li>• Clean driving record</li>
                  <li>• Vehicle insurance</li>
                  <li>• Smartphone with data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Vehicle Requirements</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 4-door vehicle</li>
                  <li>• Good condition</li>
                  <li>• Year 2008 or newer</li>
                  <li>• Pass vehicle inspection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/features/rider">
              View Rider Features
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
        <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Driving?</h2>
            <p className="text-green-100 mb-6 max-w-md mx-auto">
              Join thousands of drivers earning with RideShare
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <Car className="h-5 w-5 mr-2" />
                Apply to Drive
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                <Link to="/driver/requirements">Learn Requirements</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverFeatures;