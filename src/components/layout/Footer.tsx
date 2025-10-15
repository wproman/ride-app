import React from 'react';
import { Link } from 'react-router';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-500 rounded-full"></div>
              <span className="ml-2 text-xl font-bold">RideShare</span>
            </div>
            <p className="text-gray-300 text-base">
              Your reliable ride-sharing platform connecting riders and drivers for seamless urban transportation.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Services</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/features#rider" className="text-base text-gray-300 hover:text-white">Rider App</Link></li>
                  <li><Link to="/features#driver" className="text-base text-gray-300 hover:text-white">Driver App</Link></li>
                  <li><Link to="/features#business" className="text-base text-gray-300 hover:text-white">Business</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/contact" className="text-base text-gray-300 hover:text-white">Contact</Link></li>
                  <li><Link to="/faq" className="text-base text-gray-300 hover:text-white">FAQ</Link></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Help Center</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/about" className="text-base text-gray-300 hover:text-white">About</Link></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2024 RideShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;