
import { Logo } from "@/assets/icons/Logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { role } from "@/constance/role"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hooks"
import { Link } from "react-router"
import { ModeToggle } from "./Mode.toggler"


// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC"},
  { href: "/about", label: "About",role: "PUBLIC"  },
  {href: "/features", label: "Features",role: "PUBLIC"},
  { href: "/contact", label: "Contact",role: "PUBLIC" },
  { href: "/faq", label: "FAQ",role: "PUBLIC" },
  {href: "/admin", label: "Dashboard", role: role.ADMIN},
  {href: "/rider", label: "Dashboard", role: role.RIDER}

 
]

export default function Navbar() {
 const {data} =useUserInfoQuery(undefined)
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  
 const handleLogout = () => {
  logout(undefined);
  dispatch(authApi.util.resetApiState())
 }


  return (
    <header className="border-b px-4 md:px-6">
      <div className="container mx-auto px-8 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
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
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                       
                        className="py-1.5"
                       
                      >
                       <Link to={link.href}></Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to ="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => {
  const isVisible =
    link.role === "PUBLIC" || link.role === data?.data?.role;

  if (!isVisible) return null;

  return (
    <NavigationMenuItem key={index}>
      <NavigationMenuLink
        asChild
        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
      >
        <Link to={link.href}>{link.label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
})}
             </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle/>
        {!data?.data?.email && (
  <Button asChild variant="ghost" size="sm" className="text-sm">
    <Link to="/login">Log In</Link>
  </Button>
)}

{data?.data?.email && (
  <Button onClick={handleLogout} variant="outline" className="text-sm">
    Log out
  </Button>
)}

          
        </div>
      </div>
    </header>
  )
}

// import { Link, useLocation } from 'react-router';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Features', path: '/features' },
//     { name: 'Contact', path: '/contact' },
//     { name: 'FAQ', path: '/faq' },
//   ];

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0 flex items-center">
//               <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
//               <span className="ml-2 text-xl font-bold text-gray-800">RideShare</span>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   location.pathname === link.path
//                     ? 'text-blue-600 bg-blue-50'
//                     : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <Link
//               to="/login"
//               className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
//             >
//               Sign Up
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//             >
//               <span className="sr-only">Open main menu</span>
//               {/* Menu icon */}
//               <div className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
//                 {isOpen ? '✕' : '☰'}
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   className={`block px-3 py-2 rounded-md text-base font-medium ${
//                     location.pathname === link.path
//                       ? 'text-blue-600 bg-blue-50'
//                       : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
//                   }`}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//               <div className="pt-4 pb-3 border-t border-gray-200">
//                 <Link
//                   to="/login"
//                   className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 mb-2"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-green-700"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;