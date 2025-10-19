
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
       
         
      ],
    },
]