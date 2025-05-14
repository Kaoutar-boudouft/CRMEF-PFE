import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, Calendar, Link2Icon, ChevronRight } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { toast } from "@/hooks/use-toast";
import { CourseCreationForm } from "@/components/CourseCreationForm";

const Planning = () => {

      const navigate = useNavigate(); // Utilisez votre hook de navigation
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
    
      // Définition des éléments de navigation pour la barre latérale (comme dans Planning.tsx)
        const navItems = [
          // { title: "Acceuil", id: "acceuil", icon: LayoutDashboard, path: "/index" },
          { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
          { title: "Étudiants", id: "students", icon: Users, path: "/students" }, // Adaptez le chemin si nécessaire
          { title: "Classes", id: "classes", icon: GraduationCap, path: "/classes" }, // Adaptez le chemin si nécessaire
          { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
          { title: "Affectations", id: "affectation", icon: Link2Icon, path: "/affectation" }, // Nouvel élément
        ];

        // Inside your Planning component
        const location = useLocation();
        const { level, className, type } = location.state || {}; // Destructure with a default empty object
        
        useEffect(() => {
          if (level && className && type) {
            // Fetch or filter students based on level and className
            console.log(`Filtering students for Level: ${level}, Class: ${className}, type: ${type}`);
            // Implement your filtering logic here
          } else {
            // Load all students or handle the case where no class is selected
            console.log("Loading all students");
          }
        }, [level, className]); // Re-run effect when level or className changes

        // Fix the courses state by explicitly adding trace and video properties
          const [courses, setCourses] = useState([
            { id: "1", title: "Connectivité", date: "2024-10-10" },
            { id: "2", title: "Introduction aux notions Information - Informatique - Système informatique", date: "2024-10-15" },
            { id: "3", title: "Tableur : Fonction si conditionnel", date: "2025-04-03" },
          ]);

    return(
        <SidebarProvider>
              <div className="min-h-screen bg-background flex w-full">
                {/* Sidebar Navigation */}
                <Sidebar className="border-r">
                  <SidebarContent>
                  <div className="py-4 px-5">
                    <div className="flex items-center space-x-3">
            <button 
              // onClick={resetSelection} 
              className="flex items-center focus:outline-none text-2xl font-bold"
            >
              <span className="text-black">اونلاين</span> <span className="text-yellow-500">قسمي</span>
            </button>
            <img 
              src="/graduation-cap-svg-icon-free-graduation-cap-icon-11553393846gq7rcr1qsx.png" 
              alt="Graduation Cap Icon" 
              className="w-14 h-14 rounded-full shadow-lg border-2 border-yellow-500"
            />
          </div>                    </div>
                    <SidebarGroup>
                      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {navItems.map((item) => (
                            <SidebarMenuItem key={item.id}>
                              <SidebarMenuButton
                                // Utilisez location.pathname pour déterminer l'élément actif
                                className={location.pathname === item.path && item.id === 'planning' ? "bg-accent" : ""}
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
                </Sidebar>
        
                {/* Main Content */}
                <div className="flex-1 overflow-hidden">
                  <header className="border-b px-6 py-3">
                    <h1 className="text-2xl text-center font-bold">Gestion du planning</h1> {/* Titre de la page */}
                  </header>
        
                  <main className="p-6">
                    {/* Contenu de la page planning */}
                    
                    <div className="space-y-6">
    <Tabs defaultValue="calendar">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Vue Calendrier</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Créer un cours</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="flex gap-2">
        <select
            className="px-3 py-1.5 border rounded-md text-sm"
            value={level || 'Tous les niveaux'} // Set the value based on state
            onChange={(e) => {
              // Optional: Add logic here to handle manual selection change
              console.log("Selected level:", e.target.value);
              // You might want to update the URL state or fetch new data
            }}
          >
            <option value="Tous les niveaux">Tous les niveaux</option>
            <option value="1ère année">1ère année</option>
            <option value="2ème année">2ème année</option>
            <option value="3ème année">3ème année</option>
          </select>
          <select className="px-3 py-1.5 border rounded-md text-sm"
          value={className || 'Toutes les classes'}
          onChange={(e) => {
            // Optional: Add logic here to handle manual selection change
            console.log("Selected classe:", e.target.value);
            // You might want to update the URL state or fetch new data
          }}
          >
            <option>Toutes les classes</option>
            <option>Classe 1A</option>
            <option>Classe 1B</option>
            <option>Classe 1C</option>
            <option>Classe 2A</option>
            <option>Classe 2B</option>  
            <option>Classe 2C</option>
          </select>
          {/* <button
            onClick={() => navigate('/create-student')} 
            className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md flex items-center"
          >
            <Users className="h-4 w-4 mr-2" /> Ajouter
          </button> */}
        </div>
      </div>
      
      <TabsContent value="calendar">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Vue Calendrier</h3>
              <div className="overflow-hidden">
                <div className="h-auto">
                {/* Intégration du composant FullCalendar */}
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  events={courses.map((course) => ({
                  title: course.title,
                  start: course.date,
                  }))}
                  headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek,dayGridDay',
                  }}
                  editable={false}
                  selectable={true}
                  eventClick={(info) => {
                  alert(`Event: ${info.event.title}`);
                  }}
                />
                </div>
              </div>
            </div>
            </TabsContent>

<TabsContent value="create">
  <div className="space-y-6">
    <CourseCreationForm 
      onSubmit={(data) => {
        console.log('New course data:', data);
        // Add your submission logic here
        toast({
          title: "Cours créé avec succès",
          description: `Le cours "${data.title}" a été ajouté au planning.`,
        });
      }} 
    />
  </div>
</TabsContent>
    </Tabs>
  </div>


                  </main>
                </div>
              </div>
            </SidebarProvider>
    )
}
export default Planning;
