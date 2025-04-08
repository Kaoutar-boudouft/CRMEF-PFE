import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassDiagram from '../components/ClassDiagram';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../components/ui/sidebar';
import { BookOpenCheck, BookText, Calendar, GraduationCap, LayoutDashboard, School, Users, FileCheck, BarChart, PieChart, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

type StudentFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  class: string;
};

const Index = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'dashboard' | 'students' | 'classes'>('dashboard');

  // Mock navigation items - removed 'diagram' and 'teachers'
  const navItems = [
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Étudiants", id: "students", icon: Users, path: "/" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
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
                        className={currentView === item.id && item.path === '/' ? "bg-accent" : ""}
                        onClick={() => {
                          if (item.path === '/') {
                            setCurrentView(item.id as any);
                          } else {
                            navigate(item.path);
                          }
                        }}
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
            <h1 className="text-2xl font-bold">
              {navItems.find(item => item.id === currentView)?.title || 'EduManage'}
            </h1>
          </header>

          <main className="p-6">
            {currentView === 'dashboard' && (
              <EnhancedDashboard />
            )}
            
            {currentView === 'students' && (
              <EnhancedStudents />
            )}
            
            {currentView === 'classes' && (
              <EnhancedClasses />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

// Enhanced Dashboard with more specific visualizations
const EnhancedDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard 
        title="Étudiants" 
        value="1,245" 
        icon={<Users className="h-8 w-8" />} 
        color="soft-blue" 
        details="Répartis sur 3 niveaux collégiaux"
      />
      <StatsCard 
        title="Classes" 
        value="36" 
        icon={<GraduationCap className="h-8 w-8" />} 
        color="soft-yellow" 
        details="15 générales, 21 internationales"
      />
      <StatsCard 
        title="Cours Planifiés" 
        value="124" 
        icon={<BookText className="h-8 w-8" />} 
        color="soft-green" 
        details="42 par niveau en moyenne"
      />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center"><BarChart className="h-5 w-5 mr-2" /> Répartition des élèves par niveau</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>1ère année collégiale</span>
              <span>425 élèves</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-blue-500 rounded-full h-2" style={{ width: '34%' }} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>2ème année collégiale</span>
              <span>410 élèves</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-green-500 rounded-full h-2" style={{ width: '33%' }} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>3ème année collégiale</span>
              <span>410 élèves</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-purple-500 rounded-full h-2" style={{ width: '33%' }} />
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
            { action: "Séquence ajoutée", details: "Programmation - 2ème année", time: "Il y a 2 heures", icon: "soft-purple" },
            { action: "Exercice complété", details: "HTML/CSS - 1ère année", time: "Il y a 3 heures", icon: "soft-green" },
            { action: "Cours modifié", details: "Base de données - 3ème année", time: "Il y a 5 heures", icon: "soft-blue" },
            { action: "Élève ajouté", details: "Classe 2B - 2ème année", time: "Il y a 1 jour", icon: "soft-peach" },
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
            { name: 'Introduction à la programmation', level: '1ère année', progress: 95 },
            { name: 'Base de données relationnelles', level: '2ème année', progress: 88 },
            { name: 'Développement Web', level: '2ème année', progress: 82 },
            { name: 'Algorithmique avancée', level: '3ème année', progress: 75 },
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
);

// Enhanced Students section with integrated student creation form
const EnhancedStudents = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'import' | 'create'>('list');
  
  // Mock class data
  const classes = [
    { id: "class1", name: "1ère année - Général" },
    { id: "class2", name: "2ème année - International" },
    { id: "class3", name: "3ème année - Général" },
  ];
  
  const form = useForm<StudentFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      studentId: "",
      class: "",
    },
  });

  const onSubmit = (data: StudentFormValues) => {
    // This would typically save to a backend
    console.log("Student data:", data);
    
    toast({
      title: "Étudiant créé avec succès",
      description: `${data.firstName} ${data.lastName} a été ajouté(e).`,
    });
    
    // Reset the form and switch back to list view
    form.reset();
    setActiveTab('list');
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
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
            <TabsTrigger value="create" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Ajouter un élève</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            {activeTab === 'list' && (
              <>
                <select className="px-3 py-1.5 border rounded-md text-sm">
                  <option>Tous les niveaux</option>
                  <option>1ère année</option>
                  <option>2ème année</option>
                  <option>3ème année</option>
                </select>
                <select className="px-3 py-1.5 border rounded-md text-sm">
                  <option>Toutes les classes</option>
                  <option>Classe 1A</option>
                  <option>Classe 1B</option>
                  <option>Classe 2A</option>
                </select>
                <Button 
                  onClick={() => setActiveTab('create')}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" /> Ajouter
                </Button>
              </>
            )}
          </div>
        </div>
        
        <TabsContent value="list">
          <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left">Nom</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Niveau</th>
                    <th className="py-3 px-4 text-left">Classe</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Progression</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4">Étudiant {i}</td>
                      <td className="py-4 px-4">etudiant{i}@example.com</td>
                      <td className="py-4 px-4">{i % 3 + 1}ème année</td>
                      <td className="py-4 px-4">Classe {Math.floor(i / 2) + 1}{String.fromCharCode(65 + i % 2)}</td>
                      <td className="py-4 px-4">{i % 2 ? 'International' : 'Général'}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2" 
                              style={{ width: `${60 + i * 5}%` }}
                            />
                          </div>
                          <span className="text-xs">{60 + i * 5}%</span>
                        </div>
                      </td>
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
                  <label className="block text-sm font-medium mb-1">Classe</label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option>Sélectionner une classe</option>
                    <option>Classe 1A</option>
                    <option>Classe 1B</option>
                    <option>Classe 2A</option>
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
                    <p>nom,prenom,email,date_naissance,genre</p>
                    <p>Exemple: Dupont,Jean,jean.dupont@example.com,2005-06-15,M</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setActiveTab('list')}>Annuler</Button>
                  <Button>Importer</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'étudiant</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro d'étudiant</FormLabel>
                        <FormControl>
                          <Input placeholder="STU12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Classe</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une classe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {classes.map((cls) => (
                              <SelectItem key={cls.id} value={cls.id}>
                                {cls.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setActiveTab('list')} type="button">Annuler</Button>
                    <Button type="submit">Enregistrer l'étudiant</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Enhanced Classes view
const EnhancedClasses = () => (
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
          {[
            { name: 'Classe 1A', level: '1ère année', type: 'Général', students: 32, status: 'active' },
            { name: 'Classe 1B', level: '1ère année', type: 'International', students: 28, status: 'active' },
            { name: 'Classe 2A', level: '2ème année', type: 'Général', students: 30, status: 'active' },
            { name: 'Classe 2B', level: '2ème année', type: 'International', students: 26, status: 'active' },
            { name: 'Classe 3A', level: '3ème année', type: 'Général', students: 31, status: 'active' },
            { name: 'Classe 3B', level: '3ème année', type: 'International', students: 27, status: 'active' },
          ].map((classItem, i) => (
            <Card key={i} className="overflow-hidden">
              <div className={`h-2 ${classItem.type === 'Général' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{classItem.name}</h3>
                    <p className="text-sm text-muted-foreground">{classItem.level} - {classItem.type}</p>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    classItem.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {classItem.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Élèves:</span>
                    <span>{classItem.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Semestres:</span>
                    <span>2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cours planifiés:</span>
                    <span>24</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progression moyenne:</span>
                      <span>{70 + i * 3}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className={`${classItem.type === 'Général' ? 'bg-blue-500' : 'bg-purple-500'} rounded-full h-2`}
                        style={{ width: `${70 + i * 3}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button className="px-3 py-1.5 border rounded text-sm">Élèves</button>
                  <button className="px-3 py-1.5 border rounded text-sm">Emploi du temps</button>
                  <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm">Gérer</button>
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
                <label className="block text-sm font-medium mb-1">Description (optionnelle)</label>
                <textarea className="w-full px-3 py-2 border rounded-md" rows={3}></textarea>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button className="px-4 py-2 border rounded-md">Annuler</button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Créer la classe</button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

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

export default Index;
