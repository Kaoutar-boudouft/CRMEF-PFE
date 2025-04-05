
import { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../components/ui/sidebar';
import { BookOpenCheck, BookText, Calendar, GraduationCap, Home, LayoutDashboard, School, Users, ListTodo, BookOpen, Library } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const Planning = () => {
  const navigate = useNavigate();
  const [currentPlanningTab, setCurrentPlanningTab] = useState<'semesters' | 'units' | 'sequences' | 'courses'>('semesters');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedSequence, setSelectedSequence] = useState<string>('');

  // Mock navigation items
  const navItems = [
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Diagramme UML", id: "diagram", icon: BookOpenCheck, path: "/" },
    { title: "Étudiants", id: "students", icon: Users, path: "/" },
    { title: "Enseignants", id: "teachers", icon: School, path: "/" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
  ];

  // Mock data
  const collegialLevels = [
    { id: "1", name: "1ère année" },
    { id: "2", name: "2ème année" },
    { id: "3", name: "3ème année" },
  ];

  const semesters = [
    { id: "sem1", name: "Semestre 1" },
    { id: "sem2", name: "Semestre 2" },
  ];

  const units = [
    { id: "unit1", name: "Unité 1: Programmation" },
    { id: "unit2", name: "Unité 2: Base de données" },
    { id: "unit3", name: "Unité 3: Web" },
  ];

  const sequences = [
    { id: "seq1", name: "Séquence 1: Introduction" },
    { id: "seq2", name: "Séquence 2: Concepts avancés" },
    { id: "seq3", name: "Séquence 3: Projet pratique" },
  ];

  const courses = [
    { id: "course1", name: "Cours 1: Fondamentaux", level: "basic" },
    { id: "course2", name: "Cours 2: Applications", level: "recommande" },
    { id: "course3", name: "Cours 3: Techniques avancées", level: "avancee" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        {/* Sidebar Navigation */}
        <Sidebar className="border-r">
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
            <h1 className="text-2xl font-bold">Planning Pédagogique</h1>
          </header>

          <main className="p-6">
            <Tabs value={currentPlanningTab} onValueChange={(value) => setCurrentPlanningTab(value as any)}>
              <TabsList className="mb-4">
                <TabsTrigger value="semesters" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Semestres</span>
                </TabsTrigger>
                <TabsTrigger value="units" className="flex items-center gap-2">
                  <Library className="h-4 w-4" />
                  <span>Unités</span>
                </TabsTrigger>
                <TabsTrigger value="sequences" className="flex items-center gap-2">
                  <ListTodo className="h-4 w-4" />
                  <span>Séquences</span>
                </TabsTrigger>
                <TabsTrigger value="courses" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Cours</span>
                </TabsTrigger>
              </TabsList>

              {/* Semestres Tab */}
              <TabsContent value="semesters">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-1/3">
                      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un niveau collégial" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Niveau Collégial</SelectLabel>
                            {collegialLevels.map((level) => (
                              <SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Ajouter un semestre</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {semesters.map((semester) => (
                      <Card key={semester.id}>
                        <CardHeader>
                          <CardTitle className="flex justify-between">
                            <span>{semester.name}</span>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Actif</span>
                          </CardTitle>
                          <CardDescription>Année Scolaire 2023-2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Unités:</span>
                              <span>3</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Séquences:</span>
                              <span>9</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cours:</span>
                              <span>27</span>
                            </div>
                            <div className="pt-2">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progression:</span>
                                <span>65%</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: '65%' }} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                          <Button variant="outline">Exporter</Button>
                          <Button>Gérer</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Unités Tab */}
              <TabsContent value="units">
                <div className="space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex gap-4 flex-wrap md:w-2/3">
                      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Niveau collégial" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Niveau Collégial</SelectLabel>
                            {collegialLevels.map((level) => (
                              <SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      
                      <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Semestre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Semestre</SelectLabel>
                            {semesters.map((semester) => (
                              <SelectItem key={semester.id} value={semester.id}>{semester.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="flex items-center gap-2">
                      <Library className="h-4 w-4" />
                      <span>Ajouter une unité</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {units.map((unit) => (
                      <Card key={unit.id}>
                        <CardHeader>
                          <CardTitle>{unit.name}</CardTitle>
                          <CardDescription>Semestre 1 - 2023-2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Séquences:</span>
                              <span>3</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cours:</span>
                              <span>9</span>
                            </div>
                            <div className="pt-2">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progression:</span>
                                <span>50%</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: '50%' }} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                          <Button variant="outline">Copier</Button>
                          <Button>Gérer</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Séquences Tab */}
              <TabsContent value="sequences">
                <div className="space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex gap-4 flex-wrap md:w-3/4">
                      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Niveau collégial" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Niveau Collégial</SelectLabel>
                            {collegialLevels.map((level) => (
                              <SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      
                      <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Semestre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Semestre</SelectLabel>
                            {semesters.map((semester) => (
                              <SelectItem key={semester.id} value={semester.id}>{semester.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      
                      <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Unité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Unité</SelectLabel>
                            {units.map((unit) => (
                              <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="flex items-center gap-2">
                      <ListTodo className="h-4 w-4" />
                      <span>Ajouter une séquence</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sequences.map((sequence) => (
                      <Card key={sequence.id}>
                        <CardHeader>
                          <CardTitle>{sequence.name}</CardTitle>
                          <CardDescription>Unité 1: Programmation</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Cours:</span>
                              <span>3</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Exercices:</span>
                              <span>6</span>
                            </div>
                            <div className="pt-2">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progression:</span>
                                <span>75%</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: '75%' }} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                          <Button variant="outline">Dupliquer</Button>
                          <Button>Gérer</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Cours Tab */}
              <TabsContent value="courses">
                <div className="space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex gap-4 flex-wrap md:w-4/5">
                      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Niveau collégial" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Niveau Collégial</SelectLabel>
                            {collegialLevels.map((level) => (
                              <SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      
                      <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Semestre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Semestre</SelectLabel>
                            {semesters.map((semester) => (
                              <SelectItem key={semester.id} value={semester.id}>{semester.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      
                      <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Unité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Unité</SelectLabel>
                            {units.map((unit) => (
                              <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      
                      <Select value={selectedSequence} onValueChange={setSelectedSequence}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Séquence" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Séquence</SelectLabel>
                            {sequences.map((sequence) => (
                              <SelectItem key={sequence.id} value={sequence.id}>{sequence.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Ajouter un cours</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <Card key={course.id} className={`border-l-4 ${
                        course.level === 'basic' ? 'border-l-green-500' : 
                        course.level === 'recommande' ? 'border-l-blue-500' : 'border-l-purple-500'
                      }`}>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>{course.name}</CardTitle>
                            <span className={`text-xs px-2 py-1 rounded ${
                              course.level === 'basic' ? 'bg-green-100 text-green-800' : 
                              course.level === 'recommande' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                            }`}>
                              {course.level === 'basic' ? 'Basique' : 
                               course.level === 'recommande' ? 'Recommandé' : 'Avancé'}
                            </span>
                          </div>
                          <CardDescription>Séquence 1: Introduction</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Exercices:</span>
                              <span>2</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Durée:</span>
                              <span>2 heures</span>
                            </div>
                            <div className="pt-2">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progrès moyen des élèves:</span>
                                <span>60%</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div className={`rounded-full h-2 ${
                                  course.level === 'basic' ? 'bg-green-500' : 
                                  course.level === 'recommande' ? 'bg-blue-500' : 'bg-purple-500'
                                }`} style={{ width: '60%' }} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                          <Button variant="outline">Exercices</Button>
                          <Button>Modifier</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Planning;
