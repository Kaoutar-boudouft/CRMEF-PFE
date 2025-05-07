import React, { useState, useEffect } from 'react';
// Importez les composants de la barre latérale
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
// Importez les icônes nécessaires (par exemple, Link2Icon pour Affectations)
import { LayoutDashboard, Users, GraduationCap, Calendar, Link2Icon, BookText, BarChart, PieChart, FileCheck } from 'lucide-react';
// Importez votre hook de navigation (par exemple, useNavigate de react-router-dom)
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const Students = () => {

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

        // Inside your Students component
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
          const [affectations, setAffectations] = useState([
            { id: "1", NiveauCollegial: "1ère année", Classe: 'Classe 1B', Type : "Général", Cours : 'Connectivité', Date:"10-10-2024"},
            { id: "2", NiveauCollegial: "1ère année", Classe: 'Classe 1A', Type : "International", Cours : 'Connectivité', Date:"15-10-2024"},
            { id: "1", NiveauCollegial: "2ème année", Classe: 'Classe 2C', Type : "Général", Cours : 'Tableur : Fonction si conditionnel', Date:"03-04-2025"},
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
                                className={location.pathname === item.path && item.id === 'affectation' ? "bg-accent" : ""}
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
                    <h1 className="text-2xl text-center font-bold">Gestion des affectations</h1> {/* Titre de la page */}
                  </header>
        
                  <main className="p-6">
                    {/* Contenu de la page students */}
                    
                    <div className="space-y-6">
    <Tabs defaultValue="list">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Liste des affectations</span>
          </TabsTrigger>
          <TabsTrigger value="import" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Ajouter nouvelle affectations</span>
          </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Vue Calendrier</span>
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
      
      <TabsContent value="list">
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">Niveau collégial</th>
                  <th className="py-3 px-4 text-left">Classe</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Cours</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  {/* <th className="py-3 px-4 text-left">Niveau</th> */}
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {affectations.map((affectation) => (
                  <tr key={affectation.id} className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 text-center">{affectation.NiveauCollegial}</td>
                    <td className="py-4 px-4">{affectation.Classe}</td>
                    {/* <td className="py-4 px-4">Utilisateur{i}</td> */}
                    <td className="py-4 px-4">{affectation.Type} </td>
                    <td className="py-4 px-4">{affectation.Cours}</td>
                    <td className="py-4 px-4">{affectation.Date}</td>
                    {/* <td className="py-4 px-4">
                    {['Basique', 'Recommandé', 'Avancé'][i % 3]} */}
                    {/* <div className="flex items-center space-x-2">
                        <div className="w-24 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2" 
                            style={{ width: `${60 + i * 5}%` }}
                          />
                        </div>
                        <span className="text-xs">{60 + i * 5}%</span>
                      </div> */}
                    {/* </td> */}
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-1 text-green-600 hover:text-green-800">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="import">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="">
            <h3 className="text-lg font-medium mb-4">Selectionner la classe</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium mb-1">Niveau collégial</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Sélectionner un niveau</option>
                  <option>1ère année</option>
                  <option>2ème année</option>
                  <option>3ème année</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Sélectionner un type</option>
                  <option>International</option>
                  <option>Général</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Classe</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Sélectionner une classe</option>
                  <option>Classe 1A</option>
                  <option>Classe 1B</option>
                  <option>Classe 1C</option>
                  <option>Classe 2A</option>
                  <option>Classe 2B</option>  
                  <option>Classe 2C</option>
                </select>
              </div>
              </div>
              <br></br>
              <div>
              <h3 className="text-lg font-medium mb-4">Selectionner le cours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Semestre</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Sélectionner une semestre</option>
                  <option>Semestre 1</option>
                  <option>Semestre 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Unité</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Sélectionner l'unité</option>
                  <option>Unité 1</option>
                  <option>Unité 2</option>
                  <option>Unité 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Séquence</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Sélectionner la séquence</option>
                  <option>Séquence 1: Système informatique</option>
                  <option>Séquence 2: Système d’exploitation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cours</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Sélectionner le cours</option>
                  <option>Introduction aux notions Information - Informatique - Système informatique</option>
                  <option>Connectivité</option>
                  <option>Logiciels</option>
                </select>
              </div>

              </div>
              <br></br>
              <h3 className="text-lg font-medium mb-4">Date affectation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type='date' className="w-full px-3 py-2 border rounded-md"></input>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button className="px-4 py-2 border rounded-md">Annuler</button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Importer</button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="calendar">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Vue Calendrier</h3>
              <div className="overflow-hidden">
                <div className="h-auto">
                {/* Intégration du composant FullCalendar */}
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  events={affectations.map((affectation) => ({
                  title: `${affectation.Cours} - ${affectation.Classe}`,
                  start: isNaN(new Date(affectation.Date).getTime()) ? null : new Date(affectation.Date).toISOString(), // Validate date before conversion
                  }))}
                  headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek,dayGridDay',
                  }}
                  editable={false}
                  selectable={true}
                  eventClick={(info) => {
                  alert(`Affectation: ${info.event.title}`);
                  }}
                />
                </div>
              </div>
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
export default Students;
