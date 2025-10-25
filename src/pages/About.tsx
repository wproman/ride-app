


import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const About: React.FC = () => {
  const team = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: '/api/placeholder/200/200',
      bio: 'Former transportation executive with 15+ years of experience.'
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      image: '/api/placeholder/200/200',
      bio: 'Tech innovator passionate about mobility solutions.'
    },
    {
      name: 'Mike Johnson',
      role: 'COO',
      image: '/api/placeholder/200/200',
      bio: 'Operations expert focused on scaling platforms globally.'
    }
  ];

  const stats = [
    { value: '50+', label: 'Cities Served' },
    { value: '10K+', label: 'Active Drivers' },
    { value: '1M+', label: 'Rides Completed' }
  ];

  const values = [
    { icon: '🤝', title: 'Trust & Safety', description: 'Your safety is our top priority with verified drivers and 24/7 support.' },
    { icon: '🚀', title: 'Innovation', description: 'Constantly improving our technology to enhance your experience.' },
    { icon: '🌱', title: 'Sustainability', description: 'Committed to reducing environmental impact through shared mobility.' }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            About RideShare
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to transform urban mobility and make transportation accessible, affordable, and sustainable for everyone.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To create seamless, reliable, and affordable transportation solutions that connect communities and empower both riders and drivers.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A world where everyone has access to safe, convenient, and sustainable transportation options, reducing congestion and environmental impact.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Founded in 2020, RideShare emerged from a simple observation: urban transportation was fragmented, unreliable, and often unaffordable for many people.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our founders, coming from diverse backgrounds in technology, transportation, and urban planning, set out to create a platform that would bridge these gaps and create value for all stakeholders.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Today, we operate in 50+ cities, have facilitated millions of rides, and continue to innovate in the mobility space.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg">The passionate people behind RideShare</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <Card className="bg-linear-to-r from-primary to-purple-600 border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-white">Our Values</CardTitle>
            <CardDescription className="text-white/80">
              The principles that guide everything we do
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center text-white">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/80 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;