import React from 'react';

const ServiceHighlights: React.FC = () => {
  const services = [
    {
      icon: '⚡',
      title: 'Instant Booking',
      description: 'Get a ride in seconds with our instant matching system'
    },
    {
      icon: '🛡️',
      title: 'Safe & Secure',
      description: 'All drivers verified with background checks and real-time tracking'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing with no surprise charges'
    },
    {
      icon: '🌍',
      title: 'City Coverage',
      description: 'Available in 50+ cities across the country'
    },
    {
      icon: '⭐',
      title: 'Top Rated',
      description: '4.9/5 rating from thousands of happy customers'
    },
    {
      icon: '🔄',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your needs'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose RideShare?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to providing the best ride-sharing experience with features that put you first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:bg-blue-50 transition-colors group cursor-pointer"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12 text-center text-white">
          <h3 className="text-2xl md:text-4xl font-bold mb-4">
            Join Thousands of Happy Users
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the difference with RideShare. Download the app and get your first ride with 50% off!
          </p>
          <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg">
            Claim Your Discount
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;