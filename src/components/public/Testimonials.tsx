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
    return '⭐'.repeat(rating);
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our community has to say about their RideShare experience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center">
              <div className="text-2xl mb-4 text-yellow-400">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
              <blockquote className="text-xl md:text-2xl font-light italic mb-8">
                "{testimonials[currentIndex].content}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="text-left">
                  <div className="font-bold text-lg">{testimonials[currentIndex].name}</div>
                  <div className="text-gray-300">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white text-gray-900 w-12 h-12 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            ‹
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white text-gray-900 w-12 h-12 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            ›
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-yellow-400">4.9/5</div>
            <div className="text-gray-300">App Store Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400">10K+</div>
            <div className="text-gray-300">5-Star Reviews</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400">98%</div>
            <div className="text-gray-300">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;