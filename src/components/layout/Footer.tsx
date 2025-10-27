import { Button } from '@/components/ui/button';
import {
  Apple,
  ArrowRight,
  Car,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Play,
  Shield,
  Twitter
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const Footer: React.FC = () => {
  return (
    <footer className="bg-linear-to-b from-background to-muted/20 border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  RideShare
                </span>
                <p className="text-xs text-muted-foreground mt-1">Your Journey, Our Priority</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Transforming urban mobility with reliable, safe, and affordable ride-sharing services. 
              Connecting communities one ride at a time.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg transition-all hover:scale-105 hover:shadow-md">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg transition-all hover:scale-105 hover:shadow-md">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg transition-all hover:scale-105 hover:shadow-md">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg transition-all hover:scale-105 hover:shadow-md">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/features/rider" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Rider Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/features/driver" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Driver Features
                </Link>
              </li>
              <li>
                {/* <Link 
                  to="/pricing" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Pricing Plans
                </Link> */}
              </li>
              <li>
                {/* <Link 
                  to="/safety" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Safety Features
                </Link> */}
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/contact" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Help Center
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Live Chat
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog
                </Link>
              </li>
              <li>
                {/* <Link 
                  to="/press" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Press Kit
                </Link> */}
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <Shield className="h-3 w-3" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <Shield className="h-3 w-3" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <Shield className="h-3 w-3" />
                  Cookie Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 group"
                >
                  <Shield className="h-3 w-3" />
                  Data Protection
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* App Download CTA */}
        <div className="bg-linear-to-r from-primary/10 to-primary/5 rounded-2xl p-6 mb-8 border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold mb-2">Get the RideShare App</h3>
              <p className="text-muted-foreground text-sm">
                Download our app for the best ride-sharing experience
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-background text-foreground border hover:bg-accent transition-all duration-200">
                <Apple className="h-4 w-4 mr-2" />
                App Store
              </Button>
              <Button className="bg-background text-foreground border hover:bg-accent transition-all duration-200">
                <Play className="h-4 w-4 mr-2" />
                Google Play
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y">
          <div className="flex items-center gap-3 text-sm text-muted-foreground group hover:text-foreground transition-colors">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Email Us</p>
              <p>support@rideshare.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground group hover:text-foreground transition-colors">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Call Us</p>
              <p>+880 1718407482</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground group hover:text-foreground transition-colors">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Visit Us</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for better mobility</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>© 2025 RideShare. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Accessibility</a>
              <a href="#" className="hover:text-foreground transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;