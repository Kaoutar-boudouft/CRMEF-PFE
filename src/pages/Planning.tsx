import { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../components/ui/sidebar';
import { Calendar, GraduationCap, LayoutDashboard, Users, ArrowLeft, Save, Upload, X, FileInput } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

type ClassFormValues = {
  className: string;
  level: string;
  type: string;
  academicYear: string;
  description?: string;
  schedule: FileList | null;
};

const CreateClass = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const form = useForm<ClassFormValues>({
    defaultValues: {
      className: "",
      level: "",
      type: "",
      academicYear: "",
      description: "",
      schedule: null,
    },
  });

  const onSubmit = (data: ClassFormValues) => {
    // This would typically save to a backend
    console.log("Class data:", data);
    console.log("Uploaded file:", uploadedFile);
    
    toast({
      title: "Classe créée avec succès",
      description: `La classe ${data.className} a été ajoutée.`,
    });
    
    // Optionally navigate back to classes list
    navigate("/");
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      form.setValue('schedule', files);
    }
  };
  
  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      form.setValue('schedule', files);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const removeUploadedFile = () => {
    setUploadedFile(null);
    form.setValue('schedule', null);
  };
  
  // Mock navigation items
  const navItems = [
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Étudiants", id: "students", icon: Users, path: "/" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
  ];
  
  // Mock level and type data
  const collegialLevels = [
    { id: "1", name: "1ère année" },
    { id: "2", name: "2ème année" },
    { id: "3", name: "3ème année" },
  ];
  
  const classTypes = [
    { id: "general", name: "Général" },
    { id: "international", name: "International" },
  ];
  
  const academicYears = [
    { id: "2023-2024", name: "2023-2024" },
    { id: "2024-2025", name: "2024-2025" },
    { id: "2025-2026", name: "2025-2026" },
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
          <header className="border-b px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <h1 className="text-2xl font-bold">Créer une Nouvelle Classe</h1>
            </div>
          </header>

          <main className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de la classe</CardTitle>
                <CardDescription>Renseignez les détails de la nouvelle classe</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="className"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de la classe</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Classe A" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Niveau collégial</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un niveau" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {collegialLevels.map((level) => (
                                  <SelectItem key={level.id} value={level.id}>
                                    {level.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type de classe</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {classTypes.map((type) => (
                                  <SelectItem key={type.id} value={type.id}>
                                    {type.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="academicYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Année scolaire</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner une année" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {academicYears.map((year) => (
                                  <SelectItem key={year.id} value={year.id}>
                                    {year.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (optionnelle)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ajoutez une description de la classe..."
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="schedule"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Emploi du temps
                          </FormLabel>
                          <FormControl>
                            <div 
                              className="flex flex-col gap-2"
                              onDrop={handleFileDrop}
                              onDragOver={handleDragOver}
                            >
                              <div className="border border-dashed border-gray-300 rounded-md p-8 text-center transition-colors hover:bg-accent/10">
                                <div className="flex flex-col items-center justify-center">
                                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                  <p className="text-sm text-muted-foreground mb-1">
                                    Glissez-déposez votre fichier ici ou cliquez pour parcourir
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Formats acceptés: PDF, XLS, XLSX, DOC, DOCX (Max 10MB)
                                  </p>
                                </div>
                                <Input
                                  id="file-upload"
                                  type="file"
                                  className="hidden"
                                  accept=".pdf,.xls,.xlsx,.doc,.docx"
                                  onChange={handleFileChange}
                                  {...field}
                                />
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  className="mt-4 px-4 py-2"
                                  onClick={() => document.getElementById('file-upload')?.click()}
                                >
                                  Parcourir...
                                </Button>
                              </div>
                              
                              {uploadedFile && (
                                <div className="flex items-center justify-between gap-2 text-sm bg-accent/20 p-3 rounded-md mt-2">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span className="font-medium">{uploadedFile.name}</span>
                                    <span className="text-muted-foreground">({Math.round(uploadedFile.size / 1024)} KB)</span>
                                  </div>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={removeUploadedFile}
                                    className="text-destructive hover:text-destructive/90"
                                  >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Supprimer</span>
                                  </Button>
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Téléchargez l'emploi du temps de la classe au format PDF, Excel ou Word.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <CardFooter className="px-0 pb-0 flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => navigate("/")}>
                        Annuler
                      </Button>
                      <Button type="submit" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Créer la classe
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CreateClass;
