// import Analytics from "@/pages/Admin/Analytics";
import AdminUserManagement from "@/pages/Admin/AdminUserManagement";
import RideManagement from "@/pages/Admin/RideManangment";
import ProfileManagement from "@/pages/User/ProfileManagement";
import { ISidebarItem } from "@/types";
import { lazy } from "react";
const Analytics = lazy(()=>
import ("@/pages/Admin/Analytics"))

export const adminSidebarItems : ISidebarItem[]= [
    {
      title: "Dashboard",
     
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component: Analytics
        },
         
          {
          title: "User-Managent",
          url: "/admin/user-management",
          component: AdminUserManagement
        },
        
          {
          title: "Ride Oversight",
          url: "/admin/ride-ovrsight",
          component: RideManagement
        },
        {
          title: "Profile",
    url: "/admin/profile",
    component: ProfileManagement
  },
      ],
    },
    
  
    
      
    
  ]