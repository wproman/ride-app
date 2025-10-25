


import TravelLogin from "@/assets/images/a.jpeg";
import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car } from "lucide-react";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="flex flex-col p-4 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
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
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 bg-linear-to-r from-background/50 to-background/30 z-10" />
        <img
          src={TravelLogin}
          alt="Modern transportation scene"
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* Overlay Content */}
        <div className="relative z-20 flex h-full flex-col justify-between p-6 text-white">
          {/* Top Quote */}
          <div className="text-right">
            <blockquote className="space-y-1">
              <p className="text-base font-medium">
                "The future of urban mobility is here."
              </p>
              <footer className="text-xs text-white/80">
                — RideShare Team
              </footer>
            </blockquote>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-4">
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
    </div>
  );
}