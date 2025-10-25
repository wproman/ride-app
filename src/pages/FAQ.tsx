import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { HelpCircle, Mail, Phone, Search } from 'lucide-react';
import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = {
    general: 'General',
    rider: 'For Riders',
    driver: 'For Drivers',
    payment: 'Payment & Pricing',
    safety: 'Safety & Security'
  };

  const faqItems = [
    {
      id: 1,
      category: 'general',
      question: 'What is RideShare?',
      answer: 'RideShare is a comprehensive ride-booking platform that connects riders with drivers for convenient, affordable, and safe transportation. We operate in 50+ cities and are committed to transforming urban mobility.'
    },
    {
      id: 2,
      category: 'general',
      question: 'How do I create an account?',
      answer: 'You can create an account by downloading our mobile app or visiting our website. Click "Sign Up", provide your email address, phone number, and create a password. You\'ll need to verify your email and phone number to complete registration.'
    },
    {
      id: 3,
      category: 'rider',
      question: 'How do I book a ride?',
      answer: 'To book a ride: 1) Open the app and enter your destination, 2) Choose your ride type, 3) Confirm pickup location, 4) Review fare estimate, 5) Tap "Book Ride". You\'ll be matched with a nearby driver instantly.'
    },
    {
      id: 4,
      category: 'rider',
      question: 'Can I schedule rides in advance?',
      answer: 'Yes! You can schedule rides up to 7 days in advance. Go to the booking screen, tap "Schedule", choose your date and time, and confirm. Your ride will be automatically booked at the scheduled time.'
    },
    {
      id: 5,
      category: 'driver',
      question: 'What are the requirements to become a driver?',
      answer: 'To drive with RideShare, you need: 1) Valid driver\'s license, 2) Clean driving record, 3) Vehicle insurance, 4) Vehicle year 2010 or newer, 5) Pass background check, 6) Smartphone with our driver app.'
    },
    {
      id: 6,
      category: 'driver',
      question: 'How do I get paid?',
      answer: 'Drivers earn for each completed ride. Payments are processed weekly via direct deposit or instantly through our instant pay feature. You can track your earnings in real-time through the driver app.'
    },
    {
      id: 7,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards (Visa, MasterCard, American Express), digital wallets (Apple Pay, Google Pay), and in some cities, cash payments. All payments are securely processed through our encrypted system.'
    },
    {
      id: 8,
      category: 'payment',
      question: 'How are fares calculated?',
      answer: 'Fares are based on: base fare + time + distance + demand (surge pricing). You can see a fare estimate before booking. Final fare may vary slightly based on actual route and traffic conditions.'
    },
    {
      id: 9,
      category: 'safety',
      question: 'What safety measures do you have?',
      answer: 'We prioritize safety with: 1) Driver background checks, 2) Real-time ride tracking, 3) Emergency assistance button, 4) Share trip feature, 5) 24/7 support, 6) Driver ratings and reviews.'
    },
    {
      id: 10,
      category: 'safety',
      question: 'What is the SOS feature?',
      answer: 'The SOS button provides immediate assistance during rides. When pressed, it shares your live location with emergency contacts and connects you with emergency services. This feature is available throughout your ride.'
    }
  ];

  const filteredItems = faqItems.filter(item => 
    item.category === activeCategory && 
    (item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const popularQuestions = faqItems.filter(item => 
    [1, 3, 7, 9].includes(item.id)
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="flex justify-center mb-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help Center
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find quick answers to common questions about RideShare. Can't find what you're looking for?{' '}
            <a href="/contact" className="text-primary hover:underline font-semibold">
              Contact our support team.
            </a>
          </p>
        </div>

        {/* Popular Questions */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Popular Questions</CardTitle>
            <CardDescription>
              Quick answers to our most frequently asked questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-4">
              {popularQuestions.map((item) => (
                <AccordionItem key={item.id} value={`item-${item.id}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="hover:no-underline hover:bg-muted/50 px-0 py-4">
                    <div className="flex items-start space-x-4 text-left">
                      <Badge variant="outline" className="shrink-0 mt-1">
                        {categories[item.category as keyof typeof categories]}
                      </Badge>
                      <span className="font-semibold text-base">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-4">
                    <Separator className="mb-4" />
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar - Fixed */}
          <div className="lg:col-span-1">
            <div className="space-y-4 lg:sticky lg:top-24">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  {Object.entries(categories).map(([key, label]) => (
                    <Button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      variant={activeCategory === key ? "default" : "ghost"}
                      className="w-full justify-start h-11"
                    >
                      {label}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Search</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Items Main Content - Scrollable */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    {categories[activeCategory as keyof typeof categories]}
                    <Badge variant="secondary">
                      {filteredItems.length} {filteredItems.length === 1 ? 'question' : 'questions'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredItems.length > 0 ? (
                    <Accordion type="multiple" className="w-full">
                      {filteredItems.map((item) => (
                        <AccordionItem 
                          key={item.id} 
                          value={`item-${item.id}`} 
                          className="px-6 border-b last:border-b-0"
                        >
                          <AccordionTrigger className="py-4 hover:no-underline text-left">
                            <div className="flex flex-col items-start space-y-2">
                              <h3 className="font-semibold text-base">{item.question}</h3>
                              <Badge variant="outline" className="text-xs">
                                {categories[item.category as keyof typeof categories]}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <Separator className="mb-4" />
                            <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-12">
                      <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No questions found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search or browse different categories.
                      </p>
                      <Button onClick={() => setSearchTerm('')}>
                        Clear Search
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Support CTA */}
              <Card className="bg-linear-to-r from-primary to-purple-600 border-0">
                <CardContent className="p-6 text-white text-center">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold mb-3">Still need help?</h3>
                    <p className="text-white/80 mb-4">
                      Our support team is available 24/7 to assist you with any questions or concerns.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="bg-white text-primary hover:bg-white/90"
                        asChild
                      >
                        <a href="/contact">
                          <Mail className="h-4 w-4 mr-2" />
                          Contact Support
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-white text-white hover:bg-white hover:text-primary"
                        asChild
                      >
                        <a href="tel:+15551234567">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;