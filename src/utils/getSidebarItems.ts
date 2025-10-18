import { role } from "@/constance/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { riderSidebarItems } from "@/routes/riderSidebarItems";
import { TRole } from "@/types";

export const getSidebarItems =(userRole: TRole)=>{
    console.log(userRole)
    console.log(role.RIDER)
     switch(userRole) {
        case role.ADMIN:
        return [...adminSidebarItems];
        case role.DRIVER:
          return  [...adminSidebarItems];
        case role.RIDER:
            return [...riderSidebarItems]
            default: return []
     }

}