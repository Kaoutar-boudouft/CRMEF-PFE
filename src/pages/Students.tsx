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
import { useLocation } from 'react-router-dom';

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
                                className={location.pathname === item.path && item.id === 'students' ? "bg-accent" : ""}
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
                    <h1 className="text-2xl text-center font-bold">Gestion des élèves</h1> {/* Titre de la page */}
                  </header>
        
                  <main className="p-6">
                    {/* Contenu de la page students */}
                    
                    <div className="space-y-6">
    <Tabs defaultValue="list">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Liste des élèves</span>
          </TabsTrigger>
          <TabsTrigger value="import" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Importer des élèves</span>
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
          <button
            onClick={() => navigate('/create-student')} 
            className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md flex items-center"
          >
            <Users className="h-4 w-4 mr-2" /> Ajouter
          </button>
        </div>
      </div>
      
      <TabsContent value="list">
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-center">Numéro</th>
                  <th className="py-3 px-4 text-left">Nom</th>
                  {/* <th className="py-3 px-4 text-left">Login</th> */}
                  <th className="py-3 px-4 text-left">Niveau collégial</th>
                  <th className="py-3 px-4 text-left">Classe</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  {/* <th className="py-3 px-4 text-left">Niveau</th> */}
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                  <tr key={i} className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 text-center">{i}</td>
                    <td className="py-4 px-4">Étudiant {i}</td>
                    {/* <td className="py-4 px-4">Utilisateur{i}</td> */}
                    <td className="py-4 px-4">{level ?? (i % 2 ? '1ère année' : '2ème année')} </td>
                    <td className="py-4 px-4">{className ?? ('Classe' + (i <= 2 ? '1A' : i <= 4 ? '1B' : i <= 6 ? '2A' : i <= 8 ? '2B' : '1C'))}</td>
                    <td className="py-4 px-4">{type ?? (i % 2 ? 'International' : 'Général')}</td>
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
          <div className="max-w-xl mx-auto">
            <h3 className="text-lg font-medium mb-4">Importer des élèves</h3>
            <div className="space-y-4">
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
              <div>
                <label className="block text-sm font-medium mb-1">Fichier CSV</label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="mt-4 flex text-sm justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-focus">
                      <span>Télécharger un fichier</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">ou glisser-déposer</p>
                  </div>
                  <p className="text-xs text-gray-500">CSV uniquement, max 5MB</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Structure du CSV</label>
                <div className="text-xs bg-muted p-3 rounded">
                  <p className="font-medium">Format requis:</p>
                  <p>nom,prenom,date_naissance</p>
                  <p>Exemple: Dupont,Jean,2005-06-15</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button className="px-4 py-2 border rounded-md">Annuler</button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Importer</button>
              </div>
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
