
import React, { useState, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, GraduationCap, Calendar, Link2Icon, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchClasses, Class } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Classes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navItems = [
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Étudiants", id: "students", icon: Users, path: "/students" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/classes" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
    { title: "Affectations", id: "affectation", icon: Link2Icon, path: "/affectation" },
  ];

  useEffect(() => {
    const loadClasses = async () => {
      try {
        setLoading(true);
        const data = await fetchClasses();
        setClasses(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Impossible de charger les classes");
        toast({
          title: "Erreur",
          description: "Impossible de charger les classes",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, [toast]);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        {/* Sidebar Navigation */}
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="py-4 px-5">
              <div className="flex items-center space-x-3">
                <button 
                  className="flex items-center focus:outline-none text-2xl font-bold"
                >
                  <span className="text-black">اونلاين</span> <span className="text-yellow-500">قسمي</span>
                </button>
                <img 
                  src="/graduation-cap-svg-icon-free-graduation-cap-icon-11553393846gq7rcr1qsx.png" 
                  alt="Graduation Cap Icon" 
                  className="w-14 h-14 rounded-full shadow-lg border-2 border-yellow-500"
                />
              </div>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        className={location.pathname === item.path && item.id === 'classes' ? "bg-accent" : ""}
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
            <h1 className="text-2xl text-center font-bold">Gestion des classes</h1>
          </header>

          <main className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4">Chargement des classes...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center p-6 text-red-500">{error}</div>
            ) : (
              <div className="space-y-6">
                <Tabs defaultValue="list">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="list" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>Liste des classes</span>
                      </TabsTrigger>
                      <TabsTrigger value="new" className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4" />
                        <span>Nouvelle classe</span>
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex gap-2">
                      <select className="px-3 py-1.5 border rounded-md text-sm">
                        <option>Tous les niveaux</option>
                        <option>1ère année</option>
                        <option>2ème année</option>
                        <option>3ème année</option>
                      </select>
                      <select className="px-3 py-1.5 border rounded-md text-sm">
                        <option>Tous les types</option>
                        <option>Général</option>
                        <option>International</option>
                      </select>
                    </div>
                  </div>

                  <TabsContent value="list">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {classes.map((classItem) => (
                        <Card key={classItem.id} className="overflow-hidden">
                          <div className={`h-2 ${classItem.level === '1ère année' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-medium">{classItem.name}</h3>
                                <p className="text-sm text-muted-foreground">{classItem.level} - {classItem.type}</p>
                              </div>
                              <span className={`inline-block px-2 py-1 rounded text-xs ${classItem.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                {classItem.status === 'active' ? 'Actif' : 'Inactif'}
                              </span>
                            </div>

                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span>Élèves:</span>
                                <span>{classItem.students}</span>
                              </div>
                              <div className="pt-2">
                                <div className="flex justify-between text-sm mb-2">
                                  <span>Progression moyenne:</span>
                                  <span>{classItem.progression}%</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2">
                                  <div
                                    className={`${classItem.level === '1ère année' ? 'bg-blue-500' : 'bg-purple-500'} rounded-full h-2`}
                                    style={{ width: `${classItem.progression}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between mt-6">
                              <button
                                onClick={() => navigate('/students', { state: { level: classItem.level, className: classItem.name, type: classItem.type } })}
                                className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm"
                              >
                                Élèves
                              </button>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <button className="px-3 py-1.5 border rounded text-sm">Emploi du temps</button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Emploi du temps</DialogTitle>
                                    <DialogDescription>
                                      <img src="/1_AC-B.jpg" alt="Emploi du temps" className="w-full h-auto rounded-md" />
                                    </DialogDescription>
                                  </DialogHeader>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="new">
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                      <div className="max-w-xl mx-auto">
                        <h3 className="text-lg font-medium mb-4">Créer une nouvelle classe</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Nom de la classe</label>
                            <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Ex: Classe 1C" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
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
                              <label className="block text-sm font-medium mb-1">Type de classe</label>
                              <select className="w-full px-3 py-2 border rounded-md">
                                <option>Sélectionner un type</option>
                                <option>Général</option>
                                <option>International</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Année scolaire</label>
                            <select className="w-full px-3 py-2 border rounded-md">
                              <option>2023-2024</option>
                              <option>2024-2025</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">Emploi de temps</label>
                            <div className="border-2 border-dashed rounded-md p-6 text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="mt-4 flex text-sm justify-center">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-focus">
                                  <span>Choisir un fichier</span>
                                  <input
                                    id="emploi-upload"
                                    name="emploi-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="sr-only"
                                    onChange={(e) => {
                                      const fileName = e.target.files?.[0]?.name || "Aucun fichier";
                                      const label = document.getElementById("emploi-file-name");
                                      if (label) label.textContent = fileName;
                                    }}
                                  />
                                </label>
                                <p className="pl-1">ou glisser-déposer</p>
                              </div>
                              <p id="emploi-file-name" className="mt-2 text-sm text-gray-500">Aucun fichier sélectionné</p>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">Description (optionnelle)</label>
                            <textarea className="w-full px-3 py-2 border rounded-md" rows={3}></textarea>
                          </div>
                          <div className="flex justify-end space-x-2 pt-4">
                            <button className="px-4 py-2 border rounded-md">Annuler</button>
                            <button 
                              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                              onClick={() => {
                                toast({
                                  title: "Classe créée",
                                  description: "La classe a été créée avec succès",
                                });
                              }}
                            >
                              Créer la classe
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Classes;
