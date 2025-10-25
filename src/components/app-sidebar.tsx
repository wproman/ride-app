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
  useSidebar, // Add this import
} from "@/components/ui/sidebar"
import { useGetProfileQuery } from "@/redux/features/user/profileApi"
import { getSidebarItems } from "@/utils/getSidebarItems"
import * as React from "react"
import { Link } from "react-router"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetProfileQuery(undefined)
  const { setOpenMobile } = useSidebar() // Get the sidebar context
 
  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  }

  // Handle menu item click to close sidebar on mobile
  const handleMenuItemClick = () => {
    setOpenMobile(false) // This closes the mobile sidebar
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link 
          to="/" 
          className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
          onClick={handleMenuItemClick}
        >
          <span className="font-bold text-xl">RideShare</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.url} 
                        onClick={handleMenuItemClick} // Add this click handler
                      >
                        {item.title}
                      </Link>
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