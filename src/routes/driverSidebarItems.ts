
import Status from "@/pages/Driver/Status";
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
       
         
      ],
    },
]