
import Bookings from "@/pages/Rider/Bookings";
import { ISidebarItem } from "@/types";

export const riderSidebarItems : ISidebarItem[]= [
    {
      title: "Bookings",
     
      items: [
        {
          title: "Bookings",
          url: "/rider/bookings",
          component: Bookings
        },
       
         
      ],
    },
]