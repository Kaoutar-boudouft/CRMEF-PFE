
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LayoutDashboard, Users, School, Calendar, GraduationCap, Plus, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const navigate = useNavigate();
  
  // Navigation items for sidebar
  const navItems = [
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Étudiants", id: "students", icon: Users, path: "/" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
  ];

  // State for current tab on dashboard
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State for students and classes
  const [students, setStudents] = useState([
    { id: '1', firstName: 'Jean', lastName: 'Dupont', email: 'jean.dupont@example.com', class: '1A' },
    { id: '2', firstName: 'Marie', lastName: 'Martin', email: 'marie.martin@example.com', class: '2B' },
    { id: '3', firstName: 'Paul', lastName: 'Bernard', email: 'paul.bernard@example.com', class: '3C' },
  ]);
  
  const [classes, setClasses] = useState([
    { id: '1', name: '1A', level: '1', type: 'générale', students: 25 },
    { id: '2', name: '2B', level: '2', type: 'internationale', students: 22 },
    { id: '3', name: '3C', level: '3', type: 'générale', students: 20 },
  ]);

  // Forms for creating new entities
  const studentForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      class: ''
    }
  });

  const classForm = useForm({
    defaultValues: {
      name: '',
      level: '',
      type: ''
    }
  });

  // Function to add a new student
  const handleAddStudent = (data: { firstName: string, lastName: string, email: string, class: string }) => {
    const newStudent = {
      id: `${students.length + 1}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      class: data.class
    };
    
    setStudents([...students, newStudent]);
    studentForm.reset();
    
    toast({
      title: "Étudiant ajouté",
      description: `L'étudiant ${data.firstName} ${data.lastName} a été ajouté avec succès.`,
    });
  };

  // Function to add a new class
  const handleAddClass = (data: { name: string, level: string, type: string }) => {
    const newClass = {
      id: `${classes.length + 1}`,
      name: data.name,
      level: data.level,
      type: data.type,
      students: 0
    };
    
    setClasses([...classes, newClass]);
    classForm.reset();
    
    toast({
      title: "Classe ajoutée",
      description: `La classe ${data.name} a été ajoutée avec succès.`,
    });
  };

  // Handle file change for class schedule upload
  const handleScheduleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    toast({
      title: "Emploi du temps importé",
      description: `Le fichier ${e.target.files[0].name} a été importé avec succès.`,
    });
  };

  // Dashboard content
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">3</CardTitle>
            <CardDescription>Niveaux Collégiaux</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm text-muted-foreground">
              1ère, 2ème et 3ème année
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{classes.length}</CardTitle>
            <CardDescription>Classes</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm text-muted-foreground">
              {classes.filter(c => c.type === 'générale').length} générales, {classes.filter(c => c.type === 'internationale').length} internationales
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{students.length}</CardTitle>
            <CardDescription>Étudiants</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm text-muted-foreground">
              Inscrits pour l'année 2023-2024
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Progression des Élèves</CardTitle>
          <CardDescription>Répartition par niveau de compétence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Niveau Basique</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 rounded-full h-2" style={{ width: '85%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Niveau Recommandé</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-blue-500 rounded-full h-2" style={{ width: '60%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Niveau Avancé</span>
                <span>35%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-purple-500 rounded-full h-2" style={{ width: '35%' }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Students content
  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Liste des Étudiants</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Ajouter un étudiant</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel étudiant</DialogTitle>
              <DialogDescription>
                Entrez les informations de l'étudiant à ajouter à votre classe.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...studentForm}>
              <form onSubmit={studentForm.handleSubmit(handleAddStudent)} className="space-y-4">
                <FormField
                  control={studentForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={studentForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={studentForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jean.dupont@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={studentForm.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classe</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une classe" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((classItem) => (
                            <SelectItem key={classItem.id} value={classItem.name}>{classItem.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Annuler</Button>
                  </DialogClose>
                  <Button type="submit">Ajouter</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-md">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Classe</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="p-3">{student.firstName} {student.lastName}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.class}</td>
                <td className="p-3 text-right">
                  <Button variant="ghost" size="sm">Voir</Button>
                  <Button variant="ghost" size="sm">Modifier</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Classes content
  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Classes</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Nouvelle classe</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une nouvelle classe</DialogTitle>
              <DialogDescription>
                Configurez les détails de la nouvelle classe.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...classForm}>
              <form onSubmit={classForm.handleSubmit(handleAddClass)} className="space-y-4">
                <FormField
                  control={classForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de la classe</FormLabel>
                      <FormControl>
                        <Input placeholder="1A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={classForm.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niveau collégial</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1ère année</SelectItem>
                          <SelectItem value="2">2ème année</SelectItem>
                          <SelectItem value="3">3ème année</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={classForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de classe</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="générale">Générale</SelectItem>
                          <SelectItem value="internationale">Internationale</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <Label htmlFor="schedule">Emploi du temps</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="schedule" 
                      type="file" 
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={handleScheduleUpload}
                    />
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Importez l'emploi du temps de la classe (PDF, Word, Excel)
                  </p>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Annuler</Button>
                  </DialogClose>
                  <Button type="submit">Créer</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Classe {classItem.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  classItem.type === 'internationale' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {classItem.type === 'internationale' ? 'Internationale' : 'Générale'}
                </span>
              </CardTitle>
              <CardDescription>
                {classItem.level === '1' ? '1ère année' : 
                 classItem.level === '2' ? '2ème année' : '3ème année'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Élèves:</span>
                  <span>{classItem.students}</span>
                </div>
                <div className="flex justify-between">
                  <span>Emploi du temps:</span>
                  <span className="text-blue-500 cursor-pointer">Voir</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Élèves</Button>
              <Button>Gérer</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

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
                        className={activeTab === item.id || (item.path === "/planning" && location.pathname === "/planning") ? "bg-accent" : ""}
                        onClick={() => {
                          if (item.path === "/planning") {
                            navigate("/planning");
                          } else {
                            setActiveTab(item.id);
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
        <div className="flex-1 p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'students' && renderStudents()}
          {activeTab === 'classes' && renderClasses()}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
