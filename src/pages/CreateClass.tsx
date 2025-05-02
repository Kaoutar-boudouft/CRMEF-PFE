
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, GraduationCap, LayoutDashboard, Link2Icon, Save, Upload, Users, X } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../components/ui/sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type ClassFormValues = {
  className: string;
  level: string;
  type: string;
  description: string;
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
      description: "",
      schedule: null,
    },
  });

  const onSubmit = (data: ClassFormValues) => {
    // This would typically save to a backend
    console.log("Class data:", data);
    
    toast({
      title: "Classe créée avec succès",
      description: `La classe ${data.className} a été ajoutée.`,
    });
    
    // Navigate back to classes list
    navigate("/");
  };
  
  // Mock data
  const collegialLevels = [
    { id: "1", name: "1ère année" },
    { id: "2", name: "2ème année" },
    { id: "3", name: "3ème année" },
  ];
  
  const classTypes = [
    { id: "general", name: "Général" },
    { id: "international", name: "International" },
  ];

  // Functions for file upload handling
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: (value: FileList | null) => void) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      onChange(files);
    }
  };
  
  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>, onChange: (value: FileList | null) => void) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      // Check file type
      const file = files[0];
      const allowedTypes = ['.pdf', '.xls', '.xlsx', '.doc', '.docx'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (allowedTypes.includes(fileExtension)) {
        setUploadedFile(file);
        onChange(files);
      } else {
        toast({
          title: "Type de fichier non supporté",
          description: "Veuillez télécharger un fichier PDF, Excel ou Word.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const handleFileDelete = (onChange: (value: FileList | null) => void) => {
    setUploadedFile(null);
    onChange(null);
  };

  // Navigation items for sidebar
  const navItems = [
    // { title: "Acceuil", id: "acceuil", icon: LayoutDashboard, path: "/index" },
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Étudiants", id: "students", icon: Users, path: "/students" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/classes" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
    { title: "Affectations", id: "affectation", icon: Link2Icon, path: "/affectation" },
  ];
  
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
                        className={item.id === 'classes' ? "bg-accent" : ""}
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Niveau</FormLabel>
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
                    </div>

                    {/* Description Field */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Description de la classe"
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Schedule File Upload */}
                    <FormField
                      control={form.control}
                      name="schedule"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Emploi du temps
                          </FormLabel>
                          <FormDescription>
                            Téléchargez l'emploi du temps de la classe au format PDF, Excel ou Word.
                          </FormDescription>
                          <FormControl>
                            <div className="flex flex-col gap-2 mt-2">
                              {!uploadedFile ? (
                                <div 
                                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                                  onDrop={(e) => handleFileDrop(e, field.onChange)}
                                  onDragOver={handleDragOver}
                                  onClick={() => document.getElementById('file-upload-schedule')?.click()}
                                >
                                  <div className="flex flex-col items-center justify-center">
                                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-base font-medium text-muted-foreground mb-2">
                                      Glissez-déposez votre fichier ici ou cliquez pour parcourir
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Formats acceptés: PDF, XLS, XLSX, DOC, DOCX (Max 10MB)
                                    </p>
                                  </div>
                                  <Input
                                    id="file-upload-schedule"
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.xls,.xlsx,.doc,.docx"
                                    onChange={(e) => handleFileChange(e, field.onChange)}
                                  />
                                </div>
                              ) : (
                                <div className="border rounded-lg p-4 bg-muted/20">
                                  <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                      <div className="bg-primary/10 p-2 rounded-md">
                                        <FileText className="h-6 w-6 text-primary" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{uploadedFile.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                          {Math.round(uploadedFile.size / 1024)} KB
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button 
                                        type="button"
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => document.getElementById('file-upload-schedule')?.click()}
                                      >
                                        Remplacer
                                      </Button>
                                      <Button 
                                        type="button"
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => handleFileDelete(field.onChange)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <Input
                                    id="file-upload-schedule"
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.xls,.xlsx,.doc,.docx"
                                    onChange={(e) => handleFileChange(e, field.onChange)}
                                  />
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <CardFooter className="px-0 pb-0 flex justify-end">
                      <Button type="submit" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Enregistrer la classe
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
