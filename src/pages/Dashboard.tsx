import React, { useState, useEffect } from 'react';
// Importez les composants de la barre latérale
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../components/ui/sidebar';
// Importez les icônes nécessaires (par exemple, Link2Icon pour Affectations)
import { LayoutDashboard, Users, GraduationCap, Calendar, Link2Icon, BookText, BarChart, PieChart, FileCheck } from 'lucide-react';
// Importez votre hook de navigation (par exemple, useNavigate de react-router-dom)
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {

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

    return (
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
                                className={location.pathname === item.path && item.id === 'dashboard' ? "bg-accent" : ""}
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
                    <h1 className="text-2xl text-center font-bold">Tableau de bord</h1> {/* Titre de la page */}
                  </header>
        
                  <main className="p-6">
                    {/* Contenu de la page Dashboard */}
                    

                    <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Étudiants" 
        value="97" 
        icon={<Users className="h-8 w-8" />} 
        color="soft-blue" 
        details="Répartis sur 3 niveaux collégiaux"
      />
      <StatsCard 
        title="Classes" 
        value="9" 
        icon={<GraduationCap className="h-8 w-8" />} 
        color="soft-yellow" 
        details="5 générales, 4 internationales"
      />
      <StatsCard 
        title="Cours Planifiés" 
        value="14" 
        icon={<BookText className="h-8 w-8" />} 
        color="soft-green" 
        details="5 par niveau en moyenne"
      />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center"><BarChart className="h-5 w-5 mr-2" /> Répartition des élèves par niveau</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>1ère année collégiale</span>
              <span>53 élèves</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-blue-500 rounded-full h-2" style={{ width: '60%' }} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>2ème année collégiale</span>
              <span>44 élèves</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-green-500 rounded-full h-2" style={{ width: '40%' }} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>3ème année collégiale</span>
              <span>0 élèves</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-purple-500 rounded-full h-2" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center"><PieChart className="h-5 w-5 mr-2" /> Progression des élèves par niveau</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Niveau basique</span>
            </div>
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">85% des élèves</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Niveau recommandé</span>
            </div>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">65% des élèves</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span>Niveau avancé</span>
            </div>
            <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">42% des élèves</span>
          </div>
        </div>
      </Card>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center"><FileCheck className="h-5 w-5 mr-2" /> Activité Récente</h3>
        <div className="space-y-4">
          {[
            { action: "Séquence ajoutée", details: "Traitement de textes- 1ère année", time: "Il y a 2 heures", icon: "soft-purple" },
          //  { action: "Exercice complété", details: "HTML/CSS - 1ère année", time: "Il y a 3 heures", icon: "soft-green" },
           // { action: "Cours modifié", details: "Base de données - 3ème année", time: "Il y a 5 heures", icon: "soft-blue" },
            //{ action: "Élève ajouté", details: "Classe 2B - 2ème année", time: "Il y a 1 jour", icon: "soft-peach" },
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-4 border-b pb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${item.icon}`}>
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{item.action}</p>
                <p className="text-sm">{item.details}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Cours Populaires</h3>
        <div className="space-y-4">
          {[
            { name: 'Connectivité', level: '1ère année', progress: 95 },
            { name: 'Programmation avec Logo : primitives de base', level: '2ème année', progress: 88 },
            { name: 'Création d\'un fichier dessin', level: '1ère année', progress: 82 },
           // { name: 'Algorithmique avancée', level: '3ème année', progress: 75 },
          ].map((course, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <span>{course.name}</span>
                <span className="text-sm">{course.progress}%</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{course.level}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2" 
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>


                  </main>
                </div>
              </div>
            </SidebarProvider>
    )
}

// Stats Card Component
const StatsCard = ({ title, value, icon, color, details }) => (
    <div className={`rounded-lg border bg-card p-6 shadow-sm flex items-center space-x-4`}>
      <div className={`rounded-full bg-${color} p-3`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {details && <p className="text-xs text-muted-foreground mt-1">{details}</p>}
      </div>
    </div>
  );
  
export default Dashboard;
