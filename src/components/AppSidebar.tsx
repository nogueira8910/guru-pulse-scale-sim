
import { Home, Compare, History } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const items = [{
  title: "Início",
  url: "/",
  icon: Home
}, {
  title: "Comparativo",
  url: "/comparativo",
  icon: Compare
}, {
  title: "Histórico",
  url: "/historico",
  icon: History
}];

export function AppSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar className="border-r border-border bg-[#111827] text-white">
      <SidebarContent className="bg-gray-950">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-[#1F2937] aria-[current=page]:bg-[#1F2937] aria-[current=page]:text-[#40E0D0]">
                    <Link to={item.url} aria-current={location.pathname === item.url ? "page" : undefined}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
