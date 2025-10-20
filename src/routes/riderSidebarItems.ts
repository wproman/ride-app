


import RideHistory from "@/pages/Ride/RideHistory";
import LiveRideTracking from "@/pages/Ride/[Live-ride]";
import RideRequestForm from "@/pages/Rider/RideRequestForm";
import { ISidebarItem } from "@/types";

export const riderSidebarItems : ISidebarItem[]= [
      {
      title: "Bookings",
     
      items: [
        {
          title: "Bookings",
          url: "/rider/ride-request",
          component: RideRequestForm
        },
       {
        
        title: "Live Tracking", // This will handle both cases
        url: "/rider/live-tracking", // Changed from /rider/live-ride/:rideId
        component: LiveRideTracking // Your enhanced component
      },
     {
        title: "Ride History",
        url: "/rider/ride-history",
        component: RideHistory
      },
      //   {
      
      //   title: "Ride Details",
      //   url: "/rider/ride-details/:rideId",
      //   component: RideDetails
      // },
         
      ],
    },
]