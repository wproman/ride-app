
// import Status from "@/pages/Driver/Status";
import DriverDashboard from "@/pages/Driver/DriverDashboard";
import EarningsDashboard from "@/pages/Driver/EarningsDashboard";
import IncomingRides from "@/pages/Driver/IncomingRides";
import LiveRideTracking from "@/pages/Ride/[Live-ride]";
import RideHistory from "@/pages/Ride/RideHistory";
import { ISidebarItem } from "@/types";

export const driverSidebarItems : ISidebarItem[]= [
    {
      title: "status",
     
      items: [
        {
          title: "driver-dashboard",
          url: "/driver/driver-dashboard",
          component: DriverDashboard
        },
       
            {
        title: "Ride History",
        url: "/driver/ride-history",
        component: RideHistory
      },
       {
     
        title: "Earnings Dashboard",
        url: "/driver/earnings",
        component: EarningsDashboard
      },
      {
        
        title: "Incoming Requests",
        url: "/driver/incoming-rides",
        component: IncomingRides
      },
        {
        
        title: "Live Tracking", // This will handle both cases
        url: "/driver/live-tracking", // Changed from /rider/live-ride/:rideId
        component: LiveRideTracking // Your enhanced component
      },
      ],
    },
]