
import { useState, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../components/ui/sidebar';
import { BookOpenCheck, BookText, Calendar, GraduationCap, Home, LayoutDashboard, School, Users, ListTodo, BookOpen, Library, Video, FileText, Image, MoveHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Planning = () => {
  const navigate = useNavigate();
  const [currentPlanningTab, setCurrentPlanningTab] = useState<'semesters' | 'units' | 'sequences' | 'courses'>('semesters');
  
  // State management
  const [selectedLevel, setSelectedLevel] = useState<string>('1');
  const [selectedSemester, setSelectedSemester] = useState<string>('sem1');
  const [selectedUnit, setSelectedUnit] = useState<string>('unit1');
  const [selectedSequence, setSelectedSequence] = useState<string>('seq1');
  const [activeCourseLevel, setActiveCourseLevel] = useState<'basic' | 'recommande' | 'avancee'>('basic');
  
  const [units, setUnits] = useState([
    { id: "unit1", name: "Unité 1: Programmation" },
    { id: "unit2", name: "Unité 2: Base de données" },
    { id: "unit3", name: "Unité 3: Web" },
  ]);
  
  const [sequences, setSequences] = useState([
    { id: "seq1", name: "Séquence 1: Introduction" },
    { id: "seq2", name: "Séquence 2: Concepts avancés" },
    { id: "seq3", name: "Séquence 3: Projet pratique" },
  ]);
  
  const [courses, setCourses] = useState([
    { id: "course1", name: "Cours 1: Fondamentaux", level: "basic" },
    { id: "course2", name: "Cours 2: Applications", level: "recommande" },
    { id: "course3", name: "Cours 3: Techniques avancées", level: "avancee" },
  ]);

  // Set default values for dropdowns
  useEffect(() => {
    if (currentPlanningTab === 'units' && !selectedLevel) {
      setSelectedLevel('1');
      setSelectedSemester('sem1');
    } else if (currentPlanningTab === 'sequences' && (!selectedLevel || !selectedSemester || !selectedUnit)) {
      setSelectedLevel('1');
      setSelectedSemester('sem1');
      setSelectedUnit('unit1');
    } else if (currentPlanningTab === 'courses' && (!selectedLevel || !selectedSemester || !selectedUnit || !selectedSequence)) {
      setSelectedLevel('1');
      setSelectedSemester('sem1');
      setSelectedUnit('unit1');
      setSelectedSequence('seq1');
    }
  }, [currentPlanningTab, selectedLevel, selectedSemester, selectedUnit, selectedSequence]);

  // Formulaires pour les nouvelles entités
  const unitForm = useForm({
    defaultValues: {
      unitName: "",
    }
  });

  const sequenceForm = useForm({
    defaultValues: {
      sequenceName: "",
    }
  });

  const courseForm = useForm({
    defaultValues: {
      courseName: "",
      courseLevel: "basic", // Valeur par défaut
      courseTrace: "",
      courseVideo: "",
      courseImages: ""
    }
  });

  // Fonctions pour ajouter de nouvelles entités
  const handleAddUnit = (data: { unitName: string }) => {
    if (!selectedLevel || !selectedSemester) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un niveau collégial et un semestre",
        variant: "destructive",
      });
      return;
    }

    const newUnit = {
      id: `unit${units.length + 1}`,
      name: data.unitName,
    };
    
    setUnits([...units, newUnit]);
    unitForm.reset();
    
    toast({
      title: "Unité ajoutée",
      description: `L'unité ${data.unitName} a été ajoutée avec succès.`,
    });
  };

  const handleAddSequence = (data: { sequenceName: string }) => {
    if (!selectedLevel || !selectedSemester || !selectedUnit) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un niveau collégial, un semestre et une unité",
        variant: "destructive",
      });
      return;
    }

    const newSequence = {
      id: `seq${sequences.length + 1}`,
      name: data.sequenceName,
    };
    
    setSequences([...sequences, newSequence]);
    sequenceForm.reset();
    
    toast({
      title: "Séquence ajoutée",
      description: `La séquence ${data.sequenceName} a été ajoutée avec succès.`,
    });
  };

  const handleAddCourse = (data: any) => {
    if (!selectedLevel || !selectedSemester || !selectedUnit || !selectedSequence) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner tous les critères nécessaires",
        variant: "destructive",
      });
      return;
    }

    const newCourse = {
      id: `course${courses.length + 1}`,
      name: data.courseName,
      level: activeCourseLevel,
      trace: data.courseTrace || "",
      video: data.courseVideo || "",
      images: data.courseImages || ""
    };
    
    setCourses([...courses, newCourse]);
    courseForm.reset();
    
    toast({
      title: "Cours ajouté",
      description: `Le cours ${data.courseName} a été ajouté avec succès.`,
    });
  };

  // Navigation functions
  const navigateToUnits = (semesterId: string) => {
    setSelectedSemester(semesterId);
    setCurrentPlanningTab('units');
  };

  const navigateToSequences = (unitId: string) => {
    setSelectedUnit(unitId);
    setCurrentPlanningTab('sequences');
  };

  const navigateToCourses = (sequenceId: string) => {
    setSelectedSequence(sequenceId);
    setCurrentPlanningTab('courses');
  };

  // Mock navigation items
  const navItems = [
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Étudiants", id: "students", icon: Users, path: "/" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
  ];

  // Mock data
  const collegialLevels = [
    { id: "1", name: "1ère année" },
    { id: "2", name: "2ème année" },
    { id: "3", name: "3ème année" },
  ];

  // Semestres constants
  const semesters = [
    { id: "sem1", name: "1er semestre" },
    { id: "sem2", name: "2ème semestre" },
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
                          <Button onClick={() => navigateToUnits(semester.id)}>Gérer</Button>
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
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <Library className="h-4 w-4" />
                          <span>Ajouter une unité</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter une nouvelle unité</DialogTitle>
                          <DialogDescription>
                            Créez une nouvelle unité pour le niveau et le semestre sélectionnés.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Form {...unitForm}>
                          <form onSubmit={unitForm.handleSubmit(handleAddUnit)} className="space-y-4">
                            <FormField
                              control={unitForm.control}
                              name="unitName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nom de l'unité</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ex: Unité 4: Algorithmes" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Annuler</Button>
                              </DialogClose>
                              <Button type="submit">Créer l'unité</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
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
                          <Button onClick={() => navigateToSequences(unit.id)}>Gérer</Button>
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
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <ListTodo className="h-4 w-4" />
                          <span>Ajouter une séquence</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter une nouvelle séquence</DialogTitle>
                          <DialogDescription>
                            Créez une nouvelle séquence pour l'unité sélectionnée.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Form {...sequenceForm}>
                          <form onSubmit={sequenceForm.handleSubmit(handleAddSequence)} className="space-y-4">
                            <FormField
                              control={sequenceForm.control}
                              name="sequenceName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nom de la séquence</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ex: Séquence 4: Révisions" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Annuler</Button>
                              </DialogClose>
                              <Button type="submit">Créer la séquence</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
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
                          <Button onClick={() => navigateToCourses(sequence.id)}>Gérer</Button>
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
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span>Ajouter un cours</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Ajouter un nouveau cours</DialogTitle>
                          <DialogDescription>
                            Créez un nouveau cours pour la séquence sélectionnée.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Form {...courseForm}>
                          <form onSubmit={courseForm.handleSubmit(handleAddCourse)} className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-sm font-medium">Niveau du cours:</span>
                              <div className="flex space-x-2">
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant={activeCourseLevel === 'basic' ? 'default' : 'outline'}
                                  onClick={() => setActiveCourseLevel('basic')}
                                  className="text-xs px-3"
                                >
                                  Basique
                                </Button>
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant={activeCourseLevel === 'recommande' ? 'default' : 'outline'}
                                  onClick={() => setActiveCourseLevel('recommande')}
                                  className="text-xs px-3"
                                >
                                  Recommandé
                                </Button>
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant={activeCourseLevel === 'avancee' ? 'default' : 'outline'}
                                  onClick={() => setActiveCourseLevel('avancee')}
                                  className="text-xs px-3"
                                >
                                  Avancé
                                </Button>
                              </div>
                            </div>
                            
                            <FormField
                              control={courseForm.control}
                              name="courseName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nom du cours</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ex: Cours 4: Révisions générales" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={courseForm.control}
                              name="courseTrace"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Trace du cours (URL ou référence)
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ex: https://example.com/cours.pdf" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={courseForm.control}
                              name="courseVideo"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Video className="h-4 w-4" />
                                    Vidéo explicative (URL)
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ex: https://youtube.com/watch?v=..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={courseForm.control}
                              name="courseImages"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Image className="h-4 w-4" />
                                    Images supplémentaires (URLs séparées par des virgules)
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ex: https://example.com/image1.jpg, https://example.com/image2.jpg" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Annuler</Button>
                              </DialogClose>
                              <Button type="submit">Créer le cours</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
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
                            {course.trace && (
                              <div className="flex items-center gap-2 text-primary">
                                <FileText className="h-4 w-4" />
                                <span>Trace de cours disponible</span>
                              </div>
                            )}
                            {course.video && (
                              <div className="flex items-center gap-2 text-primary">
                                <Video className="h-4 w-4" />
                                <span>Vidéo explicative disponible</span>
                              </div>
                            )}
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
