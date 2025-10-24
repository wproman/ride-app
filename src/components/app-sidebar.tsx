import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
// auth theke getprofile import kora sila jeta ami profileApi diya change korlam 8:00pm
import { useGetProfileQuery } from "@/redux/features/user/profileApi"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { Link } from "react-router"

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data: userData} = useGetProfileQuery(undefined)
 
  const data = {

  navMain: getSidebarItems(userData?.data?.role),
}

  return (
    <Sidebar {...props}>
      <SidebarHeader>
         <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
           
            <span className="font-bold text-xl">RideShare</span>
          </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <Link to ={item.url}>{item.title} </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
