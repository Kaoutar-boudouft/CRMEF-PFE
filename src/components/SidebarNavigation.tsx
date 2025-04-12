
import { useNavigate } from 'react-router-dom';
import { Calendar, GraduationCap, LayoutDashboard, Users } from 'lucide-react';
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface SidebarNavigationProps {
  currentPath: string;
}

export const SidebarNavigation = ({ currentPath }: SidebarNavigationProps) => {
  const navigate = useNavigate();
  
  // Navigation items
  const navItems = [
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Étudiants", id: "students", icon: Users, path: "/" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
  ];

  return (
    <SidebarContent>
      <div className="py-4 px-3">
        <h2 className="text-xl font-bold text-primary">EduManage</h2>
      </div>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton 
                  className={currentPath === item.path && item.id === 'classes' ? "bg-accent" : ""}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
