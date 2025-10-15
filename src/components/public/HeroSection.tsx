import React from 'react';
import { Link } from 'react-router';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Ride Smarter, 
              <span className="block text-yellow-300">Arrive Happier</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your reliable ride-sharing platform. Fast, safe, and affordable transportation at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
              >
                Get Started Today
              </Link>
              <Link
                to="/features"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-blue-200">Happy Riders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5K+</div>
                <div className="text-blue-200">Verified Drivers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-blue-200">Cities</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src="/api/placeholder/500/400" 
                alt="RideShare App Preview" 
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;