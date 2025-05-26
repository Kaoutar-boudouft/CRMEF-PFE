import React, { useState, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, GraduationCap, Calendar, Link2Icon, FileCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { fetchUnits, fetchSequences, fetchPlanningCourses, fetchExercices, Unit, Sequence, PlanningCourse, Exercice } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Planning = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Replace hardcoded state with API data
  const [units, setUnits] = useState<Unit[]>([]);
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [courses, setCourses] = useState<PlanningCourse[]>([]);
  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [loading, setLoading] = useState(true);

  // Navigation items
  const navItems = [
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Étudiants", id: "students", icon: Users, path: "/students" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/classes" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
    { title: "Affectations", id: "affectation", icon: Link2Icon, path: "/affectation" },
  ];

  // Load data from API
  useEffect(() => {
    const loadPlanningData = async () => {
      try {
        setLoading(true);
        const [unitsData, sequencesData, coursesData, exercicesData] = await Promise.all([
          fetchUnits(),
          fetchSequences(),
          fetchPlanningCourses(),
          fetchExercices()
        ]);
        
        setUnits(unitsData);
        setSequences(sequencesData);
        setCourses(coursesData);
        setExercices(exercicesData);
      } catch (error) {
        console.error('Error loading planning data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de planification",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadPlanningData();
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
            <h1 className="text-2xl text-center font-bold">Planning des cours</h1>
          </header>

          <main className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4">Chargement du planning...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Tabs defaultValue="semestre1">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="semestre1">Semestre 1</TabsTrigger>
                      <TabsTrigger value="semestre2">Semestre 2</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="semestre1">
                    <div className="space-y-6">
                      {units
                        .filter(unit => unit.semestre === 'sem1')
                        .map(unit => (
                          <div key={unit.id} className="rounded-lg border bg-card shadow-sm">
                            <div className="p-6">
                              <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">{unit.name}</h3>
                                <div className="flex items-center space-x-4">
                                  <div className="text-sm text-muted-foreground">
                                    <span className="font-medium">{unit.sequences}</span> séquences
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    <span className="font-medium">{unit.cours}</span> cours
                                  </div>
                                  <div className="text-sm">
                                    Progression: <span className="font-medium text-green-600">{unit.progression}</span>
                                  </div>
                                  {unit.testDiagno && (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">Test diagnostique</Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Test diagnostique - {unit.name}</DialogTitle>
                                          <DialogDescription>
                                            Ce test permet d'évaluer les connaissances préalables des étudiants.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                          <p>Le test contient 20 questions à choix multiples.</p>
                                          <p>Durée: 30 minutes</p>
                                          <p>Score minimum requis: 60%</p>
                                        </div>
                                        <div className="flex justify-end">
                                          <Button>Commencer le test</Button>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  )}
                                </div>
                              </div>
                              
                              <div className="mt-6 space-y-4">
                                {sequences
                                  .filter(seq => seq.unite === unit.id)
                                  .map(sequence => (
                                    <div key={sequence.id} className="rounded-md border p-4">
                                      <div className="flex justify-between items-center">
                                        <h4 className="font-medium">{sequence.name}</h4>
                                        <div className="flex items-center space-x-4">
                                          <div className="text-sm text-muted-foreground">
                                            <span className="font-medium">{sequence.cours}</span> cours
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            <span className="font-medium">{sequence.exercices}</span> exercices
                                          </div>
                                          <div className="text-sm">
                                            Progression: <span className="font-medium text-green-600">{sequence.progression}</span>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="mt-4 space-y-2">
                                        {courses
                                          .filter(course => course.sequence === sequence.id)
                                          .map(course => (
                                            <div key={course.id} className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-sm">
                                              <span className="text-sm">{course.name}</span>
                                              <div className="flex items-center space-x-4">
                                                <div className="text-xs text-muted-foreground">
                                                  <span className="font-medium">{course.exercices}</span> exercices
                                                </div>
                                                <div className="text-xs">
                                                  Progression: <span className="font-medium text-green-600">{course.progression}</span>
                                                </div>
                                                <Button variant="ghost" size="sm">Voir</Button>
                                              </div>
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="semestre2">
                    <div className="space-y-6">
                      {units
                        .filter(unit => unit.semestre === 'sem2')
                        .map(unit => (
                          <div key={unit.id} className="rounded-lg border bg-card shadow-sm">
                            <div className="p-6">
                              <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">{unit.name}</h3>
                                <div className="flex items-center space-x-4">
                                  <div className="text-sm text-muted-foreground">
                                    <span className="font-medium">{unit.sequences}</span> séquences
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    <span className="font-medium">{unit.cours}</span> cours
                                  </div>
                                  <div className="text-sm">
                                    Progression: <span className="font-medium text-green-600">{unit.progression}</span>
                                  </div>
                                  {unit.testDiagno && (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">Test diagnostique</Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Test diagnostique - {unit.name}</DialogTitle>
                                          <DialogDescription>
                                            Ce test permet d'évaluer les connaissances préalables des étudiants.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                          <p>Le test contient 20 questions à choix multiples.</p>
                                          <p>Durée: 30 minutes</p>
                                          <p>Score minimum requis: 60%</p>
                                        </div>
                                        <div className="flex justify-end">
                                          <Button>Commencer le test</Button>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
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

export default Planning;
