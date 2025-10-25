

// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Car, Clock, HeadphonesIcon, Star } from 'lucide-react';
// import React from 'react';
// import { Link } from 'react-router';

// const CTASection: React.FC = () => {
//   return (
//     <section className="py-16 bg-linear-to-br from-primary to-purple-600 text-primary-foreground">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <div className="max-w-4xl mx-auto space-y-8">
//           {/* Header */}
//           <div className="space-y-4">
//             <Badge variant="secondary" className="px-4 py-2 text-sm">
//               Get Started Today
//             </Badge>
//             <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
//               Ready to Get Started?
//             </h2>
//             <p className="text-xl text-primary-foreground/80 leading-relaxed">
//               Join thousands of riders and drivers who are already enjoying the RideShare experience. 
//               Sign up today and get your first ride at 50% off!
//             </p>
//           </div>
          
//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Button
//               asChild
//               size="lg"
//               className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold text-lg px-8 py-6 shadow-lg"
//             >
//               <Link to="/register?type=rider">
//                 <Car className="h-5 w-5 mr-2" />
//                 Start Riding
//               </Link>
//             </Button>
//             <Button
//               asChild
//               variant="outline"
//               size="lg"
//               className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold text-lg px-8 py-6"
//             >
//               <Link to="/register?type=driver">
//                 Become a Driver
//               </Link>
//             </Button>
//           </div>

//           {/* Features Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
//             <Card className="bg-white/10 backdrop-blur-sm border-white/20">
//               <CardContent className="p-6 text-center">
//                 <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <Star className="h-6 w-6 text-yellow-400" />
//                 </div>
//                 <div className="text-2xl font-bold mb-2">50% Off</div>
//                 <div className="text-primary-foreground/80">First Ride Discount</div>
//               </CardContent>
//             </Card>
            
//             <Card className="bg-white/10 backdrop-blur-sm border-white/20">
//               <CardContent className="p-6 text-center">
//                 <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <HeadphonesIcon className="h-6 w-6 text-blue-400" />
//                 </div>
//                 <div className="text-2xl font-bold mb-2">24/7</div>
//                 <div className="text-primary-foreground/80">Customer Support</div>
//               </CardContent>
//             </Card>
            
//             <Card className="bg-white/10 backdrop-blur-sm border-white/20">
//               <CardContent className="p-6 text-center">
//                 <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <Clock className="h-6 w-6 text-green-400" />
//                 </div>
//                 <div className="text-2xl font-bold mb-2">Instant</div>
//                 <div className="text-primary-foreground/80">Driver Matching</div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CTASection;

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppSelector } from '@/redux/hooks';
import { Car, Clock, HeadphonesIcon, Rocket, Star } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';


const CTASection: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  if (isAuthenticated) {
    return (
      <section className="py-16 bg-linear-to-br from-primary to-purple-600 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header for logged-in users */}
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Welcome Back!
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Ready to Continue Your Journey?
              </h2>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                {user?.role === 'driver' 
                  ? 'Start accepting rides and earn money today!'
                  : user?.role === 'rider'
                  ? 'Book your next ride and get to your destination safely!'
                  : 'Manage your platform and help users have the best experience!'
                }
              </p>
            </div>
            
            {/* Action Buttons for logged-in users */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold text-lg px-8 py-6 shadow-lg"
              >
                <Link to={
                  user?.role === 'driver' ? '/driver' :
                  user?.role === 'rider' ? '/rider' :
                  user?.role === 'admin' ? '/admin' :
                  '/dashboard'
                }>
                  <Rocket className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Original CTA section for non-authenticated users
  return (
    <section className="py-16 bg-linear-to-br from-primary to-purple-600 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Get Started Today
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Join thousands of riders and drivers who are already enjoying the RideShare experience. 
              Sign up today and get your first ride at 50% off!
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold text-lg px-8 py-6 shadow-lg"
            >
              <Link to="/register?type=rider">
                <Car className="h-5 w-5 mr-2" />
                Start Riding
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold text-lg px-8 py-6"
            >
              <Link to="/register?type=driver">
                Become a Driver
              </Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold mb-2">50% Off</div>
                <div className="text-primary-foreground/80">First Ride Discount</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HeadphonesIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold mb-2">24/7</div>
                <div className="text-primary-foreground/80">Customer Support</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold mb-2">Instant</div>
                <div className="text-primary-foreground/80">Driver Matching</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;