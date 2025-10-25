
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import React, { useState } from 'react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Regular Rider',
      image: '/api/placeholder/80/80',
      content: 'RideShare has completely transformed my daily commute. The drivers are always professional and the app is so easy to use!',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Business User',
      image: '/api/placeholder/80/80',
      content: 'As a frequent business traveler, I rely on RideShare for punctuality and comfort. Never been late to a meeting!',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'Driver Partner',
      image: '/api/placeholder/80/80',
      content: 'Driving with RideShare has given me the flexibility I need while earning a stable income. Great support team too!',
      rating: 5
    },
    {
      name: 'James Kim',
      role: 'Premium User',
      image: '/api/placeholder/80/80',
      content: 'The premium service is worth every penny. Always clean cars and professional drivers. My go-to ride service!',
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'fill-gray-600 text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-linear-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-yellow-400/10 text-yellow-400 border-yellow-400/20">
            Trusted by Thousands
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our community has to say about their RideShare experience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <div className="flex justify-center items-center gap-1 mb-6">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                <blockquote className="text-xl md:text-2xl font-light italic mb-8 text-gray-100 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <Avatar className="w-16 h-16 border-2 border-yellow-400/20">
                    <AvatarImage 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                    />
                    <AvatarFallback className="bg-gray-700 text-white">
                      {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-bold text-lg text-white">{testimonials[currentIndex].name}</div>
                    <div className="text-gray-300">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <Button 
            onClick={prevTestimonial}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white text-gray-900 w-12 h-12 rounded-full shadow-lg hover:bg-gray-100 border-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button 
            onClick={nextTestimonial}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white text-gray-900 w-12 h-12 rounded-full shadow-lg hover:bg-gray-100 border-0"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-400 w-8' 
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-yellow-400">4.9/5</div>
              <div className="text-gray-300 mt-2">App Store Rating</div>
              <div className="flex justify-center mt-2">
                {renderStars(5)}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-yellow-400">10K+</div>
              <div className="text-gray-300 mt-2">5-Star Reviews</div>
              <div className="text-sm text-gray-400 mt-1">and counting</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-yellow-400">98%</div>
              <div className="text-gray-300 mt-2">Customer Satisfaction</div>
              <div className="text-sm text-gray-400 mt-1">across all services</div>
            </CardContent>
          </Card>
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Auto-advancing in 5s</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;