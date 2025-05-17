
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import { LineChart, Settings, Search, FileText, BarChart, Home, LogOut } from 'lucide-react';

const DashboardSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();

  const menuItems = [
    { title: 'Overview', path: '/dashboard', icon: Home },
    { title: 'Keyword Research', path: '/dashboard/keywords', icon: Search },
    { title: 'SEO Analyzer', path: '/dashboard/analyzer', icon: BarChart },
    { title: 'Rank Tracking', path: '/dashboard/rank-tracking', icon: LineChart },
    { title: 'Content Tools', path: '/dashboard/content', icon: FileText },
    { title: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-muted text-primary font-medium" 
      : "hover:bg-muted/50 text-sidebar-foreground";

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Sidebar 
      className={`${collapsed ? 'w-14' : 'w-60'} transition-all duration-300 bg-sidebar-background border-r`}
      collapsible
    >
      <SidebarTrigger className="m-2 self-end text-sidebar-foreground" />

      <SidebarContent>
        <div className={`flex items-center justify-center py-4 ${collapsed ? 'px-2' : 'px-6'}`}>
          {collapsed ? (
            <span className="text-brand-purple font-extrabold text-xl">S</span>
          ) : (
            <div className="font-bold text-xl flex items-center gap-1">
              <span className="text-brand-purple font-extrabold">SEO</span>
              <span className="text-sidebar-primary">Helper.ai</span>
            </div>
          )}
        </div>

        <SidebarGroup defaultOpen={true}>
          <SidebarGroupLabel className="text-sidebar-foreground/60">
            {!collapsed && 'Dashboard'}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} className={getNavCls}>
                      <item.icon className="h-4 w-4 mr-2" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto mb-6">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} className="text-sidebar-foreground hover:bg-muted/50 w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                {!collapsed && <span>Logout</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
