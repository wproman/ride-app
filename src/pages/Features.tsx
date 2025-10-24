

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Award, Car, Check, CreditCard, MapPin, Settings, Shield, Star, TrendingUp, User, Users, X } from 'lucide-react';
import React from 'react';

const Features: React.FC = () => {
  const riderFeatures = [
    {
      icon: Car,
      title: 'Instant Booking',
      description: 'Book a ride in seconds with real-time driver matching'
    },
    {
      icon: MapPin,
      title: 'Live Tracking',
      description: 'Track your driver in real-time with accurate ETAs'
    },
    {
      icon: CreditCard,
      title: 'Multiple Payments',
      description: 'Pay with credit card, mobile wallet, or cash'
    },
    {
      icon: Star,
      title: 'Ratings & Reviews',
      description: 'Rate your experience and help maintain quality'
    }
  ];

  const driverFeatures = [
    {
      icon: TrendingUp,
      title: 'Flexible Earnings',
      description: 'Drive when you want and earn competitive rates'
    },
    {
      icon: Shield,
      title: 'Driver Protection',
      description: '24/7 support and insurance coverage'
    },
    {
      icon: Award,
      title: 'Smart App',
      description: 'Optimized routes and intelligent ride matching'
    },
    {
      icon: Users,
      title: 'Rewards Program',
      description: 'Earn bonuses and incentives for great service'
    }
  ];

  const adminFeatures = [
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights into platform performance'
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Manage riders, drivers, and their accounts efficiently'
    },
    {
      icon: AlertCircle,
      title: 'Safety Monitoring',
      description: 'Real-time monitoring and emergency response systems'
    },
    {
      icon: Settings,
      title: 'Business Tools',
      description: 'Advanced tools for fleet management and operations'
    }
  ];

  const comparisonData = [
    { feature: 'Real-time Tracking', rider: true, driver: true, admin: true },
    { feature: 'Payment Processing', rider: true, driver: true, admin: true },
    { feature: 'User Management', rider: false, driver: false, admin: true },
    { feature: 'Analytics Dashboard', rider: false, driver: true, admin: true },
    { feature: 'Route Optimization', rider: true, driver: true, admin: true },
    { feature: 'Safety Features', rider: true, driver: true, admin: true },
    { feature: 'Earnings Tracking', rider: false, driver: true, admin: true },
    { feature: 'Platform Management', rider: false, driver: false, admin: true }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Platform Features
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Powerful Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed for riders, drivers, and administrators. Experience the complete ride-sharing ecosystem.
          </p>
        </div>

        {/* Rider Features */}
        <Card className="mb-8 hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">For Riders</CardTitle>
            <CardDescription className="text-lg">
              Enjoy a seamless ride-booking experience with features designed for your convenience and safety.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {riderFeatures.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow border-blue-200">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Riding
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Driver Features */}
        <Card className="mb-8 hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">For Drivers</CardTitle>
            <CardDescription className="text-lg">
              Maximize your earnings with flexible schedules and powerful driver tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {driverFeatures.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow border-green-200">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Become a Driver
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Admin Features */}
        <Card className="mb-8 hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">For Administrators</CardTitle>
            <CardDescription className="text-lg">
              Comprehensive tools to manage and grow your ride-sharing platform efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {adminFeatures.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow border-purple-200">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Feature Comparison</CardTitle>
            <CardDescription>
              Compare features available across different user roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Feature</TableHead>
                    <TableHead className="text-center">Rider</TableHead>
                    <TableHead className="text-center">Driver</TableHead>
                    <TableHead className="text-center">Admin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.feature}</TableCell>
                      <TableCell className="text-center">
                        {item.rider ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.driver ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.admin ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Features;