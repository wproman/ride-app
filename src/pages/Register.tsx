


import { RegisterForm } from "@/components/modules/Authentication/RegistrationForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car } from "lucide-react";
import { Link } from "react-router";

export default function Register() {
  return (
    <div className="h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Left Side - Image */}
      <div className="relative hidden lg:block bg-linear-to-br from-blue-500 to-purple-600">
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