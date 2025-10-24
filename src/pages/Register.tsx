// // // import TravelRegister from "@/assets/images/travel-register.jpg";
// // import { Link } from "react-router";
// // // import Logo from "@/assets/icons/Logo";
// // import { RegisterForm } from "@/components/modules/Authentication/RegistrationForm";

// // export default function Register() {
// //   return (
// //     <div className="grid min-h-svh lg:grid-cols-2">
// //       <div className="relative hidden bg-muted lg:block">
// //         {/* <img
// //           src={TravelRegister}
// //           alt="Image"
// //           className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
// //         /> */}
// //       </div>
// //       <div className="flex flex-col gap-4 p-6 md:p-10">
// //         <div className="flex justify-center gap-2 md:justify-start">
// //           <Link to="/" className="flex items-center gap-2 font-medium">
// //             {/* <Logo /> */}
// //           </Link>
// //         </div>
// //         <div className="flex flex-1 items-center justify-center">
// //           <div className="w-full max-w-xs">
// //             <RegisterForm />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { RegisterForm } from "@/components/modules/Authentication/RegistrationForm";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowLeft, Car } from "lucide-react";
// import { Link } from "react-router";

// export default function Register() {
//   return (
//     <div className="min-h-screen grid lg:grid-cols-2">
//       {/* Left Side - Image (Placeholder for now) */}
//       <div className="relative hidden lg:block bg-gradient-to-br from-blue-500 to-purple-600">
//         <div className="absolute inset-0 bg-black/20 z-10" />
        
//         {/* Overlay Content */}
//         <div className="relative z-20 flex h-full flex-col justify-between p-8 text-white">
//           {/* Top Quote */}
//           <div className="space-y-2">
//             <blockquote className="space-y-1">
//               <p className="text-lg font-medium">
//                 "Join thousands of riders and drivers in our growing community."
//               </p>
//               <footer className="text-sm text-white/80">
//                 — RideShare Team
//               </footer>
//             </blockquote>
//           </div>

//           {/* Bottom Stats */}
//           <div className="grid grid-cols-3 gap-4">
//             <div className="text-center">
//               <div className="text-xl font-bold">50K+</div>
//               <div className="text-xs text-white/80">Riders</div>
//             </div>
//             <div className="text-center">
//               <div className="text-xl font-bold">10K+</div>
//               <div className="text-xs text-white/80">Drivers</div>
//             </div>
//             <div className="text-center">
//               <div className="text-xl font-bold">100+</div>
//               <div className="text-xs text-white/80">Cities</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Registration Form */}
//       <div className="flex flex-col p-4 md:p-6 lg:p-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <Button variant="ghost" size="sm" asChild className="gap-2">
//             <Link to="/">
//               <ArrowLeft className="h-4 w-4" />
//               Back to Home
//             </Link>
//           </Button>
//           <div className="flex items-center gap-2 text-base font-semibold">
//             <Car className="h-5 w-5 text-primary" />
//             RideShare
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex items-center justify-center py-4">
//           <div className="w-full max-w-sm space-y-6">
//             {/* Welcome Header */}
//             <div className="text-center space-y-2">
//               <h1 className="text-2xl font-bold">Create Account</h1>
//               <p className="text-sm text-muted-foreground">
//                 Join RideShare today and start your journey
//               </p>
//             </div>

//             {/* Registration Card */}
//             <Card className="border shadow-sm">
//               <CardHeader className="space-y-1 pb-3">
//                 <CardTitle className="text-xl text-center">Sign Up</CardTitle>
//                 <CardDescription className="text-center text-sm">
//                   Enter your details to create your account
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <RegisterForm />
                
//                 {/* Additional Links */}
//                 <div className="text-center space-y-3 pt-3">
//                   <div className="text-sm text-muted-foreground">
//                     Already have an account?{" "}
//                     <Link 
//                       to="/login" 
//                       className="text-primary font-medium hover:underline"
//                     >
//                       Sign in
//                     </Link>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Footer */}
//             <div className="text-center text-xs text-muted-foreground">
//               By creating an account, you agree to our{" "}
//               <Link to="/terms" className="hover:underline">Terms</Link>{" "}
//               and{" "}
//               <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { RegisterForm } from "@/components/modules/Authentication/RegistrationForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car } from "lucide-react";
import { Link } from "react-router";

export default function Register() {
  return (
    <div className="h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Left Side - Image */}
      <div className="relative hidden lg:block bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black/20 z-10" />
        
        {/* Overlay Content */}
        <div className="relative z-20 flex h-full flex-col justify-between p-6 text-white">
          {/* Top Quote */}
          <div className="space-y-1">
            <blockquote>
              <p className="text-base font-medium">
                "Join thousands of riders and drivers in our growing community."
              </p>
              <footer className="text-xs text-white/80">
                — RideShare Team
              </footer>
            </blockquote>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold">50K+</div>
              <div className="text-xs text-white/80">Riders</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">10K+</div>
              <div className="text-xs text-white/80">Drivers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">100+</div>
              <div className="text-xs text-white/80">Cities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex flex-col p-4 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-base font-semibold">
            <Car className="h-5 w-5 text-primary" />
            RideShare
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <Card className="border shadow-sm">
              <CardHeader className="text-center space-y-1 pb-4">
                <CardTitle className="text-xl">Create Account</CardTitle>
                <CardDescription>
                  Join RideShare today and start your journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegisterForm />
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground mt-4">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="hover:underline">Terms</Link>{" "}
              and{" "}
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}