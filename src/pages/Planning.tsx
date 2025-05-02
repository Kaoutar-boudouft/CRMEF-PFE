
import { useState, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../components/ui/sidebar';
import { BookOpenCheck, BookText, Calendar, GraduationCap, Home, LayoutDashboard, School, Users, ListTodo, BookOpen, Library, Video, FileText, Image, MoveHorizontal, Upload, X, Link2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRef } from 'react'; // Import useRef
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
    { id: "unit1", semestre: 'sem1', name: "Unité 1", sequences : 2, cours: 6, progression: '100%' },
    { id: "unit2", semestre: 'sem1', name: "Unité 2", sequences : 2, cours: 5, progression: '60%' },
    { id: "unit3", semestre: 'sem1', name: "Unité 3", sequences : 1, cours: 7, progression: '0%'},
    { id: "unit4", semestre: 'sem2', name: "Unité 1", sequences : 3, cours: 8, progression: '75%' },
    { id: "unit5", semestre: 'sem2', name: "Unité 2", sequences : 2, cours: 4, progression: '0%' },
  ]);


  
  const [sequences, setSequences] = useState([
    { id: "seq1", unite : "unit1", name: "Séquence 1: Système informatique", cours: 3, exercices : 5, progression: '100%' },
    { id: "seq2", unite : "unit1", name: "Séquence 2: Système d’exploitation", cours: 3, exercices : 7, progression: '100%' },
    // { id: "seq3", name: "Séquence 3: Projet pratique" },
  ]);
  
  // Fix the courses state by explicitly adding trace and video properties
  const [courses, setCourses] = useState([
    { id: "course1", name: "Cours 1: Introduction aux notions Information - Informatique - Système informatique", sequence: 'seq1', exercices : 4, progression : '85%'},
    { id: "course2", name: "Cours 2: Connectivité", sequence: 'seq1', exercices : 3, progression : '90%' },
    { id: "course3", name: "Cours 3: Logiciels", sequence: 'seq1', exercices : 2, progression : '75%' },
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

  // Course form with nested structure for levels and file fields
const courseForm = useForm<CourseFormData>({
  defaultValues: {
    basic: { courseName: "", trace: null, video: null, images: null },
    recommande: { courseName: "", trace: null, video: null, images: null },
    avancee: { courseName: "", trace: null, video: null, images: null },
  }
});

// State to manage uploaded files for each level and field
const [uploadedCourseFiles, setUploadedCourseFiles] = useState<Record<string, CourseFiles>>({
  basic: { trace: null, video: null, images: null },
  recommande: { trace: null, video: null, images: null },
  avancee: { trace: null, video: null, images: null },
});

// Refs for file inputs to manually clear them
const fileInputRefs = {
  basic: {
    trace: useRef<HTMLInputElement>(null),
    video: useRef<HTMLInputElement>(null),
    images: useRef<HTMLInputElement>(null),
  },
  recommande: {
    trace: useRef<HTMLInputElement>(null),
    video: useRef<HTMLInputElement>(null),
    images: useRef<HTMLInputElement>(null),
  },
  avancee: {
    trace: useRef<HTMLInputElement>(null),
    video: useRef<HTMLInputElement>(null),
    images: useRef<HTMLInputElement>(null),
  },
};




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

  const handleAddCourse = (data: CourseFormData) => {
    if (!selectedLevel || !selectedSemester || !selectedUnit || !selectedSequence) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner tous les critères nécessaires",
        variant: "destructive",
      });
      return;
    }
  
    // Process data for each level
    const newCourses = [];
  
    if (data.basic.courseName) {
      newCourses.push({
        id: `course${courses.length + 1}-basic`,
        name: data.basic.courseName,
        level: "basic",
        trace: uploadedCourseFiles.basic.trace ? uploadedCourseFiles.basic.trace.name : "", // Use file name or handle upload
        video: uploadedCourseFiles.basic.video ? uploadedCourseFiles.basic.video.name : "", // Use file name or handle upload
        images: uploadedCourseFiles.basic.images ? Array.from(uploadedCourseFiles.basic.images).map(f => f.name).join(',') : "", // Use file names or handle upload
      });
    }
  
    if (data.recommande.courseName) {
      newCourses.push({
        id: `course${courses.length + 1}-recommande`,
        name: data.recommande.courseName,
        level: "recommande",
        trace: uploadedCourseFiles.recommande.trace ? uploadedCourseFiles.recommande.trace.name : "",
        video: uploadedCourseFiles.recommande.video ? uploadedCourseFiles.recommande.video.name : "",
        images: uploadedCourseFiles.recommande.images ? Array.from(uploadedCourseFiles.recommande.images).map(f => f.name).join(',') : "",
      });
    }
  
    if (data.avancee.courseName) {
      newCourses.push({
        id: `course${courses.length + 1}-avancee`,
        name: data.avancee.courseName,
        level: "avancee",
        trace: uploadedCourseFiles.avancee.trace ? uploadedCourseFiles.avancee.trace.name : "",
        video: uploadedCourseFiles.avancee.video ? uploadedCourseFiles.avancee.video.name : "",
        images: uploadedCourseFiles.avancee.images ? Array.from(uploadedCourseFiles.avancee.images).map(f => f.name).join(',') : "",
      });
    }
  
    if (newCourses.length === 0) {
       toast({
        title: "Erreur",
        description: "Veuillez renseigner au moins un nom de cours.",
        variant: "destructive",
      });
      return;
    }
  
  
    setCourses([...courses, ...newCourses]);
    courseForm.reset();
    setUploadedCourseFiles({
       basic: { trace: null, video: null, images: null },
       recommande: { trace: null, video: null, images: null },
       avancee: { trace: null, video: null, images: null },
    });
  
    // Manually clear file inputs using refs
    Object.values(fileInputRefs).forEach(levelRefs => {
        Object.values(levelRefs).forEach(ref => {
            if (ref.current) {
                ref.current.value = '';
            }
        });
    });
  
  
    toast({
      title: "Cours(s) ajouté(s)",
      description: `Les cours ont été ajoutés avec succès.`,
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
    // { title: "Acceuil", id: "acceuil", icon: LayoutDashboard, path: "/index" },
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Étudiants", id: "students", icon: Users, path: "/students" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/classes" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
    { title: "Affectations", id: "affectation", icon: Link2Icon, path: "/affectation" },
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

  // Define types for file uploads for each level
type CourseFiles = {
  trace: File | null;
  video: File | null;
  images: FileList | null; // Use FileList for multiple images
};

type CourseFormData = {
  basic: {
    courseName: string;
    trace: File | null;
    video: File | null;
    images: FileList | null;
  };
  recommande: {
    courseName: string;
    trace: File | null;
    video: File | null;
    images: FileList | null;
  };
  avancee: {
    courseName: string;
    trace: File | null;
    video: File | null;
    images: FileList | null;
  };
};

// File upload handlers adapted for multiple fields and levels
const handleCourseFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  level: 'basic' | 'recommande' | 'avancee',
  field: 'trace' | 'video' | 'images',
  onChange: (value: FileList | null) => void // react-hook-form onChange
) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    // Basic file type validation (can be extended)
    const allowedTraceTypes = ['.pdf', '.doc', '.docx'];
    const allowedVideoTypes = ['.mp4', '.avi', '.mov'];
    const allowedImageTypes = ['.jpg', '.jpeg', '.png', '.gif'];

    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    let isValid = true;

    if (field === 'trace' && !allowedTraceTypes.includes(fileExtension)) {
       isValid = false;
    } else if (field === 'video' && !allowedVideoTypes.includes(fileExtension)) {
       isValid = false;
    } else if (field === 'images') {
       // For images, check each file if multiple are selected
       for (let i = 0; i < files.length; i++) {
          const imgExtension = files[i].name.substring(files[i].name.lastIndexOf('.')).toLowerCase();
          if (!allowedImageTypes.includes(imgExtension)) {
             isValid = false;
             break;
          }
       }
    }

    if (isValid) {
      setUploadedCourseFiles(prev => ({
        ...prev,
        [level]: {
          ...prev[level],
          [field]: field === 'images' ? files : file, // Store FileList for images, File for others
        },
      }));
      onChange(files); // Update react-hook-form state
    } else {
      toast({
        title: "Type de fichier non supporté",
        description: `Veuillez télécharger un fichier ${
           field === 'trace' ? 'PDF ou Word' :
           field === 'video' ? 'MP4, AVI ou MOV' :
           'JPG, PNG ou GIF'
        }.`,
        variant: "destructive",
      });
       // Clear the input value to allow re-selection of the same file after error
       if (event.target) {
           event.target.value = '';
       }
    }
  } else {
     // If files are cleared manually
     setUploadedCourseFiles(prev => ({
        ...prev,
        [level]: {
           ...prev[level],
           [field]: null,
        },
     }));
     onChange(null);
  }
};

const handleCourseFileDrop = (
  event: React.DragEvent<HTMLDivElement>,
  level: 'basic' | 'recommande' | 'avancee',
  field: 'trace' | 'video' | 'images',
  onChange: (value: FileList | null) => void // react-hook-form onChange
) => {
  event.preventDefault();
  event.stopPropagation();

  const files = event.dataTransfer.files;
  if (files && files.length > 0) {
     // Basic file type validation (can be extended)
    const allowedTraceTypes = ['.pdf', '.doc', '.docx'];
    const allowedVideoTypes = ['.mp4', '.avi', '.mov'];
    const allowedImageTypes = ['.jpg', '.jpeg', '.png', '.gif'];

    let isValid = true;
    const droppedFiles = field === 'images' ? files : [files[0]]; // Take only the first file for trace/video

    for (let i = 0; i < droppedFiles.length; i++) {
       const file = droppedFiles[i];
       const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

       if (field === 'trace' && !allowedTraceTypes.includes(fileExtension)) {
          isValid = false;
          break;
       } else if (field === 'video' && !allowedVideoTypes.includes(fileExtension)) {
          isValid = false;
          break;
       } else if (field === 'images' && !allowedImageTypes.includes(fileExtension)) {
          isValid = false;
          break;
       }
    }


    if (isValid) {
      setUploadedCourseFiles(prev => ({
        ...prev,
        [level]: {
          ...prev[level],
          [field]: field === 'images' ? files : files[0], // Store FileList for images, File for others
        },
      }));
      onChange(files); // Update react-hook-form state
    } else {
      toast({
        title: "Type de fichier non supporté",
        description: `Veuillez télécharger un fichier ${
           field === 'trace' ? 'PDF ou Word' :
           field === 'video' ? 'MP4, AVI ou MOV' :
           'JPG, PNG ou GIF'
        }.`,
        variant: "destructive",
      });
    }
  }
};

const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

const handleCourseFileDelete = (
  level: 'basic' | 'recommande' | 'avancee',
  field: 'trace' | 'video' | 'images',
  onChange: (value: FileList | null) => void // react-hook-form onChange
) => {
  setUploadedCourseFiles(prev => ({
    ...prev,
    [level]: {
      ...prev[level],
      [field]: null,
    },
  }));
  onChange(null); // Update react-hook-form state
   // Find the corresponding file input element and clear its value
  const inputElement = fileInputRefs[level][field].current;
  if (inputElement) {
      inputElement.value = '';
  }
};

const filteredUnits = units.filter(unit => unit.semestre === selectedSemester);
const filteredSequences = sequences.filter(sequence => sequence.unite === selectedUnit);
const filteredCourses = courses.filter(course => course.sequence === selectedSequence);
const selectedUnitDetails = units.find(unit => unit.id === selectedUnit);
const selectedSequenceDetails = sequences.find(sequence => sequence.id === selectedSequence);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        {/* Sidebar Navigation */}
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="py-4 px-3">
              <h2 className="text-xl text-center font-bold text-primary">قسمي اونلاين</h2>
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
            <h1 className="text-2xl text-center font-bold">Planification</h1>
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
                      <Card key='sem1'>
                        <CardHeader>
                          <CardTitle className="flex justify-between">
                            <span>1ère semestre</span>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Actif</span>
                          </CardTitle>
                          <CardDescription>Année Scolaire 2024-2025</CardDescription>
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
                          <Button variant="outline">Dupliquer</Button>
                          <Button onClick={() => navigateToUnits('sem1')}>Gérer</Button>
                        </CardFooter>
                      </Card>

                      <Card key='sem2'>
                        <CardHeader>
                          <CardTitle className="flex justify-between">
                            <span>2ème semestre</span>
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Inactif</span>
                          </CardTitle>
                          <CardDescription>Année Scolaire 2024-2025</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Unités:</span>
                              <span>2</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Séquences:</span>
                              <span>5</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cours:</span>
                              <span>10</span>
                            </div>
                            <div className="pt-2">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progression:</span>
                                <span>0%</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: '0%' }} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                          <Button variant="outline">Dupliquer</Button>
                          <Button onClick={() => navigateToUnits('sem2')}>Gérer</Button>
                        </CardFooter>
                      </Card>
                    {/* {semesters.map((semester) => (
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
                    ))} */}
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
                    {filteredUnits.map((unit) => (
                      <Card key={unit.id}>
                        <CardHeader>
                          <CardTitle>{unit.name}</CardTitle>
                          <CardDescription>{selectedSemester=='sem1' ? "1ère semestre" : "2ème semestre"} - 2024-2025</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Séquences:</span>
                              <span>{unit.sequences}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cours:</span>
                              <span>{unit.cours}</span>
                            </div>
                            <div className="pt-2">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progression:</span>
                                <span>{unit.progression}</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: unit.progression }} />
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
                    {filteredSequences.map((sequence) => (
                      <Card key={sequence.id}>
                        <CardHeader>
                          <CardTitle>{sequence.name}</CardTitle>
                          <CardDescription>{selectedUnitDetails.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Cours:</span>
                              <span>{sequence.cours}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Exercices:</span>
                              <span>{sequence.exercices}</span>
                            </div>
                            <div className="pt-2">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progression:</span>
                                <span>{sequence.progression}</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: sequence.progression }} />
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
<DialogContent className="w-full max-w-none max-h-screen overflow-y-auto rounded-none left-0 translate-x-0">
                          <DialogHeader>
                          <DialogTitle>Ajouter un nouveau cours</DialogTitle>
                          <DialogDescription>
                            Créez un nouveau cours pour la séquence sélectionnée.
                          </DialogDescription>
                        </DialogHeader>
                        
                        {/* <Form {...courseForm}>
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
                        </Form> */}


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

    {/* --- Basic Level Form Fields --- */}
    {activeCourseLevel === 'basic' && (
      <>
        <FormField
          control={courseForm.control}
          name="basic.courseName" // Updated name for basic level
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du cours (Basique)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Cours 4: Révisions générales (Basique)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
  control={courseForm.control}
  name={`${activeCourseLevel}.trace`} // Use dynamic name
  render={({ field: { onChange, onBlur, name, ref } }) => (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        Trace du cours ({activeCourseLevel === 'basic' ? 'Basique' : activeCourseLevel === 'recommande' ? 'Recommandé' : 'Avancé'})
      </FormLabel>
      <FormControl>
        <div
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDrop={(e) => handleCourseFileDrop(e, activeCourseLevel, 'trace', onChange)}
          onDragOver={handleDragOver}
          onClick={() => fileInputRefs[activeCourseLevel].trace.current?.click()}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploadedCourseFiles[activeCourseLevel].trace ? (
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {uploadedCourseFiles[activeCourseLevel].trace.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the file input click
                    handleCourseFileDelete(activeCourseLevel, 'trace', onChange);
                  }}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX</p>
              </>
            )}
          </div>
          <input
            id={`course-file-upload-${activeCourseLevel}-trace`}
            type="file"
            className="hidden"
            ref={fileInputRefs[activeCourseLevel].trace}
            onChange={(e) => handleCourseFileChange(e, activeCourseLevel, 'trace', onChange)}
            onBlur={onBlur}
            name={name}
            accept=".pdf,.doc,.docx"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Repeat similar structure for 'video' field */}
 <FormField
  control={courseForm.control}
  name={`${activeCourseLevel}.video`} // Use dynamic name
  render={({ field: { onChange, onBlur, name, ref } }) => (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <Video className="h-4 w-4" />
        Vidéo explicative ({activeCourseLevel === 'basic' ? 'Basique' : activeCourseLevel === 'recommande' ? 'Recommandé' : 'Avancé'})
      </FormLabel>
      <FormControl>
        <div
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDrop={(e) => handleCourseFileDrop(e, activeCourseLevel, 'video', onChange)}
          onDragOver={handleDragOver}
          onClick={() => fileInputRefs[activeCourseLevel].video.current?.click()}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploadedCourseFiles[activeCourseLevel].video ? (
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {uploadedCourseFiles[activeCourseLevel].video.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the file input click
                    handleCourseFileDelete(activeCourseLevel, 'video', onChange);
                  }}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">MP4, AVI, MOV</p>
              </>
            )}
          </div>
          <input
             id={`course-file-upload-${activeCourseLevel}-video`}
            type="file"
            className="hidden"
            ref={fileInputRefs[activeCourseLevel].video}
            onChange={(e) => handleCourseFileChange(e, activeCourseLevel, 'video', onChange)}
            onBlur={onBlur}
            name={name}
            accept=".mp4,.avi,.mov"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


<FormField
  control={courseForm.control}
  name={`${activeCourseLevel}.images`} // Use dynamic name
  render={({ field: { onChange, onBlur, name, ref } }) => (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <Image className="h-4 w-4" />
        Images supplémentaires ({activeCourseLevel === 'basic' ? 'Basique' : activeCourseLevel === 'recommande' ? 'Recommandé' : 'Avancé'})
      </FormLabel>
      <FormControl>
        <div
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDrop={(e) => handleCourseFileDrop(e, activeCourseLevel, 'images', onChange)}
          onDragOver={handleDragOver}
          onClick={() => fileInputRefs[activeCourseLevel].images.current?.click()}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploadedCourseFiles[activeCourseLevel].images && uploadedCourseFiles[activeCourseLevel].images.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {Array.from(uploadedCourseFiles[activeCourseLevel].images).map((file, index) => (
                   <span key={index} className="flex items-center space-x-1 text-sm font-medium text-gray-900 dark:text-white">
                      <Image className="h-4 w-4 text-green-500" />
                      {file.name}
                   </span>
                ))}
                 <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                   onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the file input click
                    handleCourseFileDelete(activeCourseLevel, 'images', onChange);
                  }}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG, GIF (plusieurs fichiers autorisés)</p>
              </>
            )}
          </div>
          <input
             id={`course-file-upload-${activeCourseLevel}-images`}
            type="file"
            className="hidden"
            ref={fileInputRefs[activeCourseLevel].images}
            onChange={(e) => handleCourseFileChange(e, activeCourseLevel, 'images', onChange)}
            onBlur={onBlur}
            name={name}
            accept=".jpg,.jpeg,.png,.gif"
            multiple // Allow multiple file selection
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

      </>
    )}

    {/* --- Recommended Level Form Fields --- */}
    {activeCourseLevel === 'recommande' && (
      <>
        <FormField
          control={courseForm.control}
          name="recommande.courseName" // Updated name for recommended level
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du cours (Recommandé)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Cours 4: Révisions générales (Recommandé)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={courseForm.control}
          name="recommande.courseTrace" // Updated name for recommended level
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Trace du cours (URL ou référence) (Recommandé)
              </FormLabel>
              <FormControl>
                <Input placeholder="Ex: https://example.com/cours.pdf (Recommandé)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={courseForm.control}
          name="recommande.courseVideo" // Updated name for recommended level
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Vidéo explicative (URL) (Recommandé)
              </FormLabel>
              <FormControl>
                <Input placeholder="Ex: https://youtube.com/watch?v=... (Recommandé)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

<FormField
  control={courseForm.control}
  name={`${activeCourseLevel}.trace`} // Use dynamic name
  render={({ field: { onChange, onBlur, name, ref } }) => (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        Trace du cours ({activeCourseLevel === 'recommande' ? 'Recommandé' : activeCourseLevel === 'recommande' ? 'Recommandé' : 'Avancé'})
      </FormLabel>
      <FormControl>
        <div
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDrop={(e) => handleCourseFileDrop(e, activeCourseLevel, 'trace', onChange)}
          onDragOver={handleDragOver}
          onClick={() => fileInputRefs[activeCourseLevel].trace.current?.click()}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploadedCourseFiles[activeCourseLevel].trace ? (
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {uploadedCourseFiles[activeCourseLevel].trace.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the file input click
                    handleCourseFileDelete(activeCourseLevel, 'trace', onChange);
                  }}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX</p>
              </>
            )}
          </div>
          <input
            id={`course-file-upload-${activeCourseLevel}-trace`}
            type="file"
            className="hidden"
            ref={fileInputRefs[activeCourseLevel].trace}
            onChange={(e) => handleCourseFileChange(e, activeCourseLevel, 'trace', onChange)}
            onBlur={onBlur}
            name={name}
            accept=".pdf,.doc,.docx"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Repeat similar structure for 'video' field */}
 <FormField
  control={courseForm.control}
  name={`${activeCourseLevel}.video`} // Use dynamic name
  render={({ field: { onChange, onBlur, name, ref } }) => (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <Video className="h-4 w-4" />
        Vidéo explicative ({activeCourseLevel === 'recommande' ? 'Recommandé' : activeCourseLevel === 'recommande' ? 'Recommandé' : 'Avancé'})
      </FormLabel>
      <FormControl>
        <div
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDrop={(e) => handleCourseFileDrop(e, activeCourseLevel, 'video', onChange)}
          onDragOver={handleDragOver}
          onClick={() => fileInputRefs[activeCourseLevel].video.current?.click()}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploadedCourseFiles[activeCourseLevel].video ? (
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {uploadedCourseFiles[activeCourseLevel].video.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the file input click
                    handleCourseFileDelete(activeCourseLevel, 'video', onChange);
                  }}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">MP4, AVI, MOV</p>
              </>
            )}
          </div>
          <input
             id={`course-file-upload-${activeCourseLevel}-video`}
            type="file"
            className="hidden"
            ref={fileInputRefs[activeCourseLevel].video}
            onChange={(e) => handleCourseFileChange(e, activeCourseLevel, 'video', onChange)}
            onBlur={onBlur}
            name={name}
            accept=".mp4,.avi,.mov"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


        {/* <FormField
          control={courseForm.control}
          name="recommande.courseImages" // Updated name for recommended level
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Images supplémentaires (URLs séparées par des virgules) (Recommandé)
              </FormLabel>
              <FormControl>
                <Input placeholder="Ex: https://example.com/image1.jpg, https://example.com/image2.jpg (Recommandé)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

<FormField
  control={courseForm.control}
  name={`${activeCourseLevel}.images`} // Use dynamic name
  render={({ field: { onChange, onBlur, name, ref } }) => (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <Image className="h-4 w-4" />
        Images supplémentaires ({activeCourseLevel === 'recommande' ? 'Recommandé' : activeCourseLevel === 'recommande' ? 'Recommandé' : 'Avancé'})
      </FormLabel>
      <FormControl>
        <div
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDrop={(e) => handleCourseFileDrop(e, activeCourseLevel, 'images', onChange)}
          onDragOver={handleDragOver}
          onClick={() => fileInputRefs[activeCourseLevel].images.current?.click()}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploadedCourseFiles[activeCourseLevel].images && uploadedCourseFiles[activeCourseLevel].images.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {Array.from(uploadedCourseFiles[activeCourseLevel].images).map((file, index) => (
                   <span key={index} className="flex items-center space-x-1 text-sm font-medium text-gray-900 dark:text-white">
                      <Image className="h-4 w-4 text-green-500" />
                      {file.name}
                   </span>
                ))}
                 <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                   onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the file input click
                    handleCourseFileDelete(activeCourseLevel, 'images', onChange);
                  }}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG, GIF (plusieurs fichiers autorisés)</p>
              </>
            )}
          </div>
          <input
             id={`course-file-upload-${activeCourseLevel}-images`}
            type="file"
            className="hidden"
            ref={fileInputRefs[activeCourseLevel].images}
            onChange={(e) => handleCourseFileChange(e, activeCourseLevel, 'images', onChange)}
            onBlur={onBlur}
            name={name}
            accept=".jpg,.jpeg,.png,.gif"
            multiple // Allow multiple file selection
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


      </>
    )}

    {/* --- Advanced Level Form Fields --- */}
    {activeCourseLevel === 'avancee' && (
      <>
        <FormField
          control={courseForm.control}
          name="avancee.courseName" // Updated name for advanced level
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du cours (Avancé)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Cours 4: Révisions générales (Avancé)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
  control={courseForm.control}
  name={`${activeCourseLevel}.trace`} // Use dynamic name
  render={({ field: { onChange, onBlur, name, ref } }) => (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        Trace du cours ({activeCourseLevel === 'avancee' ? 'Avancé' : activeCourseLevel === 'recommande' ? 'Recommandé' : 'Avancé'})
      </FormLabel>
      <FormControl>
        <div
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDrop={(e) => handleCourseFileDrop(e, activeCourseLevel, 'trace', onChange)}
          onDragOver={handleDragOver}
          onClick={() => fileInputRefs[activeCourseLevel].trace.current?.click()}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploadedCourseFiles[activeCourseLevel].trace ? (
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {uploadedCourseFiles[activeCourseLevel].trace.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the file input click
                    handleCourseFileDelete(activeCourseLevel, 'trace', onChange);
                  }}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX</p>
              </>
            )}
          </div>
          <input
            id={`course-file-upload-${activeCourseLevel}-trace`}
            type="file"
            className="hidden"
            ref={fileInputRefs[activeCourseLevel].trace}
            onChange={(e) => handleCourseFileChange(e, activeCourseLevel, 'trace', onChange)}
            onBlur={onBlur}
            name={name}
            accept=".pdf,.doc,.docx"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Repeat similar structure for 'video' field */}
 <FormField
  control={courseForm.control}
  name={`${activeCourseLevel}.video`} // Use dynamic name
  render={({ field: { onChange, onBlur, name, ref } }) => (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <Video className="h-4 w-4" />
        Vidéo explicative ({activeCourseLevel === 'avancee' ? 'Avancé' : activeCourseLevel === 'recommande' ? 'Recommandé' : 'Avancé'})
      </FormLabel>
      <FormControl>
        <div
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDrop={(e) => handleCourseFileDrop(e, activeCourseLevel, 'video', onChange)}
          onDragOver={handleDragOver}
          onClick={() => fileInputRefs[activeCourseLevel].video.current?.click()}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploadedCourseFiles[activeCourseLevel].video ? (
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {uploadedCourseFiles[activeCourseLevel].video.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the file input click
                    handleCourseFileDelete(activeCourseLevel, 'video', onChange);
                  }}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">MP4, AVI, MOV</p>
              </>
            )}
          </div>
          <input
             id={`course-file-upload-${activeCourseLevel}-video`}
            type="file"
            className="hidden"
            ref={fileInputRefs[activeCourseLevel].video}
            onChange={(e) => handleCourseFileChange(e, activeCourseLevel, 'video', onChange)}
            onBlur={onBlur}
            name={name}
            accept=".mp4,.avi,.mov"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={courseForm.control}
  name={`${activeCourseLevel}.images`} // Use dynamic name
  render={({ field: { onChange, onBlur, name, ref } }) => (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <Image className="h-4 w-4" />
        Images supplémentaires ({activeCourseLevel === 'basic' ? 'Basique' : activeCourseLevel === 'recommande' ? 'Recommandé' : 'Avancé'})
      </FormLabel>
      <FormControl>
        <div
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDrop={(e) => handleCourseFileDrop(e, activeCourseLevel, 'images', onChange)}
          onDragOver={handleDragOver}
          onClick={() => fileInputRefs[activeCourseLevel].images.current?.click()}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploadedCourseFiles[activeCourseLevel].images && uploadedCourseFiles[activeCourseLevel].images.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {Array.from(uploadedCourseFiles[activeCourseLevel].images).map((file, index) => (
                   <span key={index} className="flex items-center space-x-1 text-sm font-medium text-gray-900 dark:text-white">
                      <Image className="h-4 w-4 text-green-500" />
                      {file.name}
                   </span>
                ))}
                 <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                   onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the file input click
                    handleCourseFileDelete(activeCourseLevel, 'images', onChange);
                  }}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG, GIF (plusieurs fichiers autorisés)</p>
              </>
            )}
          </div>
          <input
             id={`course-file-upload-${activeCourseLevel}-images`}
            type="file"
            className="hidden"
            ref={fileInputRefs[activeCourseLevel].images}
            onChange={(e) => handleCourseFileChange(e, activeCourseLevel, 'images', onChange)}
            onBlur={onBlur}
            name={name}
            accept=".jpg,.jpeg,.png,.gif"
            multiple // Allow multiple file selection
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

      </>
    )}

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
                    {filteredCourses.map((course) => (
                      <Card key={course.id} 
                      // className=
                      // {`border-l-4 ${
                      //   course.level === 'basic' ? 'border-l-green-500' : 
                      //   course.level === 'recommande' ? 'border-l-blue-500' : 'border-l-purple-500'
                      // }`}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle className=''>{course.name}</CardTitle>
                            {/* <span className={`text-xs px-2 py-1 rounded ${
                              course.level === 'basic' ? 'bg-green-100 text-green-800' : 
                              course.level === 'recommande' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                            }`}>
                              {course.level === 'basic' ? 'Basique' : 
                               course.level === 'recommande' ? 'Recommandé' : 'Avancé'}
                            </span> */}
                          </div>
                          <CardDescription>{selectedSequenceDetails.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Exercices:</span>
                              <span>{course.exercices}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Durée:</span>
                              <span>1 heure</span>
                            </div>
                            
                              <div className="flex items-center gap-2 text-primary">
                                <FileText className="h-4 w-4" />
                                <span>Trace de cours disponible</span>
                              </div>
                            
                           
                              <div className="flex items-center gap-2 text-primary">
                                <Video className="h-4 w-4" />
                                <span>Vidéo explicative disponible</span>
                              </div>

                              <div className="flex items-center gap-2 text-primary">
                                <Image className="h-4 w-4" />
                                <span>Image explicative disponible</span>
                              </div>
                            
                            <div className="pt-2">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progrès moyen des élèves:</span>
                                <span>{course.progression}</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div className={`rounded-full h-2 bg-green-500`} style={{ width: course.progression }} />
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
