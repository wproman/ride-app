import { role } from "@/constance/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { driverSidebarItems } from "@/routes/driverSidebarItems";
import { riderSidebarItems } from "@/routes/riderSidebarItems";
import { TRole } from "@/types";

export const getSidebarItems =(userRole: TRole)=>{
 
  
     switch(userRole) {
        case role.ADMIN:
        return [...adminSidebarItems];
        case role.DRIVER:
          return  [...driverSidebarItems];
        case role.RIDER:
            return [...riderSidebarItems]
            default: return []
     }

}