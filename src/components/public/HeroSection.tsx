// import React from 'react';
// import { Link } from 'react-router';

// const HeroSection: React.FC = () => {
//   return (
//     <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div className="text-center lg:text-left">
//             <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
//               Ride Smarter, 
//               <span className="block text-yellow-300">Arrive Happier</span>
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-blue-100">
//               Your reliable ride-sharing platform. Fast, safe, and affordable transportation at your fingertips.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <Link
//                 to="/register"
//                 className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
//               >
//                 Get Started Today
//               </Link>
//               <Link
//                 to="/features"
//                 className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
//               >
//                 Learn More
//               </Link>
//             </div>
//             <div className="mt-8 flex items-center justify-center lg:justify-start space-x-8 text-sm">
//               <div className="text-center">
//                 <div className="text-2xl font-bold">10K+</div>
//                 <div className="text-blue-200">Happy Riders</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold">5K+</div>
//                 <div className="text-blue-200">Verified Drivers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold">50+</div>
//                 <div className="text-blue-200">Cities</div>
//               </div>
//             </div>
//           </div>
//           <div className="relative">
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
//               <img 
//                 src="/api/placeholder/500/400" 
//                 alt="RideShare App Preview" 
//                 className="rounded-xl shadow-2xl"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Car, MapPin, Star, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🚀 Most Trusted Ride-Sharing Platform
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Ride Smarter,
                <span className="block text-yellow-300 mt-2">Arrive Happier</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Your reliable ride-sharing platform. Fast, safe, and affordable transportation at your fingertips.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold px-8 py-6 shadow-lg"
              >
                <Link to="/register">
                  <Car className="h-5 w-5 mr-2" />
                  Get Started Today
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold px-8 py-6"
              >
                <Link to="/features">
                  Learn More
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                  <Users className="h-5 w-5 text-yellow-300" />
                  10K+
                </div>
                <div className="text-primary-foreground/70 text-sm">Happy Riders</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                  <Star className="h-5 w-5 text-yellow-300" />
                  5K+
                </div>
                <div className="text-primary-foreground/70 text-sm">Verified Drivers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                  <MapPin className="h-5 w-5 text-yellow-300" />
                  50+
                </div>
                <div className="text-primary-foreground/70 text-sm">Cities</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Card */}
          <div className="relative">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                      <Car className="h-10 w-10 text-yellow-300" />
                    </div>
                    <h3 className="text-2xl font-bold">RideShare App</h3>
                    <p className="text-primary-foreground/80">
                      Experience the future of transportation
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Available Now
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;