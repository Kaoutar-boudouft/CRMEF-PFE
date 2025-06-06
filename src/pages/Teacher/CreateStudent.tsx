
import { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Calendar, GraduationCap, LayoutDashboard, Users, ArrowLeft, Save, Link2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

type StudentFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  class: string;
};

const CreateStudent = () => {
  const navigate = useNavigate();
  
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
    
    // Optionally navigate back to students list
    navigate("/students");
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
  
  // Mock class data
  const classes = [
    { id: "class1", name: "Classe 1A" },
    { id: "class2", name: "Classe 1B" },
    { id: "class3", name: "Classe 1C" },
    { id: "class4", name: "Classe 2A" },
    { id: "class5", name: "Classe 2B" },
    { id: "class6", name: "Classe 2C" },

  ];

  return (
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
                        className={ item.id === 'students' ? "bg-accent" : ""}
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
              <Button variant="ghost" size="sm" onClick={() => navigate("/students")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <h1 className="text-2xl font-bold">Ajouter un Étudiant</h1>
            </div>
          </header>

          <main className="p-6">
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
                    
                    {/* <FormField
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
                    /> */}
                    
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <FormField
                      control={form.control}
                      name="studentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date naissance</FormLabel>
                          <FormControl>
                            <Input placeholder="2005-06-15" type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>

                    
                    
                    <CardFooter className="px-0 pb-0 flex justify-end">
                      <Button type="submit" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Enregistrer l'étudiant
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

export default CreateStudent;
