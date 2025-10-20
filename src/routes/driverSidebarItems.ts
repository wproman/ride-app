
import Status from "@/pages/Driver/Status";
import RideHistory from "@/pages/Ride/RideHistory";
import { ISidebarItem } from "@/types";

export const driverSidebarItems : ISidebarItem[]= [
    {
      title: "status",
     
      items: [
        {
          title: "status",
          url: "/driver/status",
          component: Status
        },
       
            {
        title: "Ride History",
        url: "/driver/ride-history",
        component: RideHistory
      },
      ],
    },
]