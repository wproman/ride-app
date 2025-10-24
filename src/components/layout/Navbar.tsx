import { Logo } from "@/assets/icons/Logo"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { role } from "@/constance/role"
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { logout as clearAuth } from "@/redux/features/auth/authSlice"
import { useGetProfileQuery } from "@/redux/features/user/profileApi"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  Car,
  ChevronDown,
  LogOut,
  Settings,
  Shield,
  User
} from "lucide-react"
import { Link, useNavigate } from "react-router"
import { ModeToggle } from "./Mode.toggler"

// Navigation links following the accessibility requirements
const navigationLinks = [
  { 
    href: "/", 
    label: "Home", 
    role: "PUBLIC",
    description: "Welcome to RideShare - Your reliable ride service"
  },
  { 
    href: "/about", 
    label: "About Us", 
    role: "PUBLIC",
    description: "Learn about our company and mission"
  },
  { 
    href: "/features", 
    label: "Features", 
    role: "PUBLIC",
    dropdown: [
      { 
        href: "/features/rider", 
        label: "Rider Features", 
        icon: User, 
        description: "Easy booking, real-time tracking, secure payments" 
      },
      { 
        href: "/features/driver", 
        label: "Driver Features", 
        icon: Car, 
        description: "Flexible schedules, earning opportunities, support" 
      },
      { 
        href: "/features/admin", 
        label: "Admin Features", 
        icon: Shield, 
        description: "Dashboard analytics, user management, reports" 
      },
    ]
  },
  { 
    href: "/contact", 
    label: "Contact", 
    role: "PUBLIC",
    description: "Get in touch with our team"
  },
  { 
    href: "/faq", 
    label: "FAQ", 
    role: "PUBLIC",
    description: "Find answers to common questions"
  },
  // Role-based dashboard links (only visible to authenticated users)
  { 
    href: "/admin", 
    label: "Admin Dashboard", 
    role: role.ADMIN,
    description: "Administrator control panel"
  },
  { 
    href: "/rider", 
    label: "Rider Dashboard", 
    role: role.RIDER,
    description: "Your personal rider dashboard"
  },
  { 
    href: "/driver", 
    label: "Driver Dashboard", 
    role: role.DRIVER,
    description: "Driver management panel"
  }
]

// Public pages that should be accessible without authentication
// const publicPages = [
//   {
//     href: "/",
//     sections: [
//       "Hero Banner",
//       "How-it-works Overview", 
//       "Service Highlights",
//       "Customer Testimonials",
//       "Call-to-action Prompts",
//       "Special Offers"
//     ]
//   },
//   {
//     href: "/about",
//     sections: [
//       "Company Background",
//       "Our Mission & Vision",
//       "Team Profiles",
//       "Company Values",
//       "Achievements & Milestones"
//     ]
//   },
//   {
//     href: "/features",
//     sections: [
//       "Rider Capabilities",
//       "Driver Features", 
//       "Admin Functions",
//       "Safety Features",
//       "Technology Stack"
//     ]
//   },
//   {
//     href: "/contact", 
//     sections: [
//       "Contact Form",
//       "Office Locations",
//       "Support Channels",
//       "Response Time Info",
//       "Emergency Contacts"
//     ]
//   },
//   {
//     href: "/faq",
//     sections: [
//       "Searchable FAQ List",
//       "Booking Questions",
//       "Payment Issues",
//       "Safety Concerns",
//       "Technical Support"
//     ]
//   }
// ]

export default function Navbar() {
  const { data, isLoading } = useGetProfileQuery(undefined)
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  // Get auth state from Redux store
  const authState = useAppSelector((state) => state.auth)
  
  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap()
      dispatch(authApi.util.resetApiState())
      dispatch(clearAuth())
      navigate("/")
    } catch (error) {
      console.error('Logout failed:', error)
      dispatch(clearAuth())
      dispatch(authApi.util.resetApiState())
    }
  }

  const isAuthenticated = authState.isAuthenticated || !!data?.data?.email
  const userRole = data?.data?.role || authState.user?.role

  if (isLoggingOut) {
    return (
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/90">
              <Logo />
              <span className="font-bold text-xl">RideShare</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle/>
            <Button variant="outline" className="text-sm" disabled>
              Logging out...
            </Button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
           
            <span className="font-bold text-xl">RideShare</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {navigationLinks.map((link, index) => {
                const isVisible = link.role === "PUBLIC" || link.role === userRole
                if (!isVisible) return null

                // Regular menu items (no dropdown)
                if (!link.dropdown) {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-accent"
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                }

                // Dropdown menu items for Features
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary data-[state=open]:text-primary">
                      {link.label}
                      <ChevronDown className="h-3 w-3 transition-transform duration-200" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-80 p-3">
                        <div className="grid gap-2">
                          <div className="px-2 pb-1">
                            <div className="text-sm font-semibold text-foreground">Platform Features</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Explore capabilities for all user types
                            </div>
                          </div>
                          
                          {link.dropdown.map((dropdownItem, dropdownIndex) => {
                            const IconComponent = dropdownItem.icon
                            return (
                              <NavigationMenuLink asChild key={dropdownIndex}>
                                <Link
                                  to={dropdownItem.href}
                                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group border"
                                >
                                  <div className="flex-shrink-0 mt-0.5">
                                    <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm group-hover:text-primary">
                                      {dropdownItem.label}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {dropdownItem.description}
                                    </div>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            )
                          })}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center gap-4">
          {/* Quick Actions for Public Users */}
          {!isAuthenticated && !isLoading && (
            <div className="hidden md:flex items-center gap-2">
              {/* <Button asChild variant="ghost" size="sm">
                <Link to="/download" className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Download App
                </Link>
              </Button> */}
            </div>
          )}

          <ModeToggle />
          
          {!isAuthenticated && !isLoading ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Quick Action Buttons for Authenticated Users */}
              <div className="hidden md:flex items-center gap-2">
                {userRole === role.RIDER && (
                  <Button asChild size="sm" className="flex items-center gap-1">
                    <Link to="/rider/ride-request">
                      <Car className="h-4 w-4" />
                      Book Ride
                    </Link>
                  </Button>
                )}
                {/* {userRole === role.DRIVER && (
                  <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                    <Link to="/driver/go-online">
                      <Zap className="h-4 w-4" />
                      Go Online
                    </Link>
                  </Button>
                )} */}
              </div>

              {/* User dropdown menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex items-center gap-2 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="hidden sm:block text-sm font-medium max-w-24 truncate">
                        {data?.data?.name || authState.user?.name || "User"}
                      </span>
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">
                        {data?.data?.name || authState.user?.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {data?.data?.email || authState.user?.email}
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  
                  {/* Role-based dashboard links */}
                  {(userRole === role.ADMIN || userRole === role.RIDER || userRole === role.DRIVER) && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to={`/${userRole}`} className="flex items-center gap-2 cursor-pointer">
                          <Settings className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem asChild>
                    <Link to={`/${userRole}/profile`} className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Profile & Settings
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem asChild>
                    <Link to="/help" className="flex items-center gap-2 cursor-pointer">
                      <HelpCircle className="h-4 w-4" />
                      Help & Support
                    </Link>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 p-4">
              <div className="space-y-4">
                {/* Public Navigation */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2">
                    Main Navigation
                  </div>
                  {navigationLinks
                    .filter(link => link.role === "PUBLIC")
                    .map((link, index) => (
                    <div key={index}>
                      {link.dropdown ? (
                        <div className="space-y-2">
                          <div className="px-2 py-1 text-sm font-semibold text-foreground">
                            {link.label}
                          </div>
                          <div className="space-y-1 pl-2">
                            {link.dropdown.map((dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownIndex}
                                to={dropdownItem.href}
                                className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                                onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}
                              >
                                {dropdownItem.icon && (
                                  <dropdownItem.icon className="h-4 w-4 text-muted-foreground" />
                                )}
                                <div>
                                  <div className="font-medium">{dropdownItem.label}</div>
                                  <div className="text-xs text-muted-foreground mt-0.5">
                                    {dropdownItem.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={link.href}
                          className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors font-medium"
                          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Authentication Section */}
                <div className="pt-4 border-t">
                  {!isAuthenticated ? (
                    <div className="space-y-2">
                      <Button asChild className="w-full">
                        <Link to="/signup">Sign Up Free</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/login">Log In</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2">
                        Your Account
                      </div>
                      <Button 
                        onClick={handleLogout}
                        variant="outline" 
                        className="w-full text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Log out
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}