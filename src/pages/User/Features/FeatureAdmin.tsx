// pages/FeaturesAdmin.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Building, Database, Download, Eye, FileText, Lock, Settings, Shield, Users, Zap } from 'lucide-react';
import { Link } from 'react-router';

const AdminFeatures = () => {
  const detailedFeatures = [
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights and performance metrics',
      details: ['Real-time revenue tracking', 'Ride volume analytics', 'User growth metrics', 'Performance reports']
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Complete control over riders and drivers',
      details: ['User verification', 'Account management', 'Role assignments', 'Activity monitoring']
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Advanced security features and regulatory compliance',
      details: ['Data encryption', 'Audit logs', 'Compliance reporting', 'Security monitoring']
    },
    {
      icon: Building,
      title: 'Business Management',
      description: 'Tools to manage and grow your ride-sharing business',
      details: ['Pricing configuration', 'Zone management', 'Promotion setup', 'Service areas']
    },
    {
      icon: FileText,
      title: 'Reporting System',
      description: 'Generate detailed reports and insights',
      details: ['Financial reports', 'Driver performance', 'Rider behavior', 'Custom exports']
    },
    {
      icon: Settings,
      title: 'System Configuration',
      description: 'Complete control over platform settings',
      details: ['Platform settings', 'Payment gateway', 'Notification system', 'API management']
    }
  ];

  const adminTools = [
    {
      icon: Database,
      title: 'Data Management',
      description: 'Complete database access and management'
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Live monitoring of all platform activities'
    },
    {
      icon: Lock,
      title: 'Access Control',
      description: 'Granular permissions and role management'
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
            Admin Platform
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Admin Features</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tools to manage, monitor, and grow your ride-sharing platform
          </p>
        </div>

        {/* Platform Highlights */}
        <Card className="mb-12 bg-purple-50 border-purple-200">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {adminTools.map((tool, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tool.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground">{tool.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {detailedFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-purple-100">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <Zap className="h-4 w-4 text-purple-500 mr-2 flex-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Admin Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  Bulk user actions and imports
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  Advanced filtering and search
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  User activity tracking
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  Communication tools
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Business Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  Custom report builder
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  Revenue analytics
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  Market trend analysis
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  Performance benchmarking
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/features/rider">
              View Rider Features
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/features/driver">
              View Driver Features
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </Button>
        </div>

        {/* CTA Section */}
        <Card className="bg-linear-to-r from-purple-600 to-purple-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Manage Your Platform?</h2>
            <p className="text-purple-100 mb-6 max-w-md mx-auto">
              Get complete control and insights into your ride-sharing business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <Download className="h-5 w-5 mr-2" />
                Download Admin App
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <Link to="/admin/login">Admin Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminFeatures;