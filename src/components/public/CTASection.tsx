import React from 'react';
import { Link } from 'react-router';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-6xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
          Join thousands of riders and drivers who are already enjoying the RideShare experience. 
          Sign up today and get your first ride at 50% off!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Link
            to="/register?type=rider"
            className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg w-full sm:w-auto text-center"
          >
            Start Riding
          </Link>
          <Link
            to="/register?type=driver"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors w-full sm:w-auto text-center"
          >
            Become a Driver
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-2xl font-bold mb-2">50% Off</div>
            <div className="text-blue-100">First Ride Discount</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-2xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Customer Support</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-2xl font-bold mb-2">Instant</div>
            <div className="text-blue-100">Driver Matching</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;