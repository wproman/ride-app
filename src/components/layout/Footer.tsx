// import React from 'react';
// import { Link } from 'react-router';

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-800 text-white">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
//         <div className="xl:grid xl:grid-cols-3 xl:gap-8">
//           <div className="space-y-8 xl:col-span-1">
//             <div className="flex items-center">
//               <div className="h-8 w-8 bg-blue-500 rounded-full"></div>
//               <span className="ml-2 text-xl font-bold">RideShare</span>
//             </div>
//             <p className="text-gray-300 text-base">
//               Your reliable ride-sharing platform connecting riders and drivers for seamless urban transportation.
//             </p>
//             <div className="flex space-x-6">
//               <a href="#" className="text-gray-300 hover:text-white">
//                 <span className="sr-only">Facebook</span>
//                 <i className="fab fa-facebook"></i>
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white">
//                 <span className="sr-only">Instagram</span>
//                 <i className="fab fa-instagram"></i>
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white">
//                 <span className="sr-only">Twitter</span>
//                 <i className="fab fa-twitter"></i>
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white">
//                 <span className="sr-only">LinkedIn</span>
//                 <i className="fab fa-linkedin"></i>
//               </a>
//             </div>
//           </div>
//           <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
//             <div className="md:grid md:grid-cols-2 md:gap-8">
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Services</h3>
//                 <ul className="mt-4 space-y-4">
//                   <li><Link to="/features#rider" className="text-base text-gray-300 hover:text-white">Rider App</Link></li>
//                   <li><Link to="/features#driver" className="text-base text-gray-300 hover:text-white">Driver App</Link></li>
//                   <li><Link to="/features#business" className="text-base text-gray-300 hover:text-white">Business</Link></li>
//                 </ul>
//               </div>
//               <div className="mt-12 md:mt-0">
//                 <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
//                 <ul className="mt-4 space-y-4">
//                   <li><Link to="/contact" className="text-base text-gray-300 hover:text-white">Contact</Link></li>
//                   <li><Link to="/faq" className="text-base text-gray-300 hover:text-white">FAQ</Link></li>
//                   <li><a href="#" className="text-base text-gray-300 hover:text-white">Help Center</a></li>
//                 </ul>
//               </div>
//             </div>
//             <div className="md:grid md:grid-cols-2 md:gap-8">
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
//                 <ul className="mt-4 space-y-4">
//                   <li><Link to="/about" className="text-base text-gray-300 hover:text-white">About</Link></li>
//                   <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
//                   <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
//                 </ul>
//               </div>
//               <div className="mt-12 md:mt-0">
//                 <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
//                 <ul className="mt-4 space-y-4">
//                   <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy</a></li>
//                   <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms</a></li>
//                   <li><a href="#" className="text-base text-gray-300 hover:text-white">Cookie Policy</a></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-12 border-t border-gray-700 pt-8">
//           <p className="text-base text-gray-400 xl:text-center">
//             &copy; 2024 RideShare. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Button } from '@/components/ui/button';
import { Car, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">RideShare</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your reliable ride-sharing platform connecting riders and drivers for seamless urban transportation.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Facebook className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Twitter className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Instagram className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Linkedin className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features#rider" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Rider App
                </Link>
              </li>
              <li>
                <Link to="/features#driver" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Driver App
                </Link>
              </li>
              <li>
                <Link to="/features#business" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>support@rideshare.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>San Francisco, CA</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            &copy; 2024 RideShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;