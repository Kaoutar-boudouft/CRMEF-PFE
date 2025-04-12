
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScheduleFileUpload } from "./ScheduleFileUpload";

export type ClassFormValues = {
  className: string;
  level: string;
  type: string;
  academicYear: string;
  schedule: FileList | null;
};

export const ClassForm = () => {
  const navigate = useNavigate();
  
  const form = useForm<ClassFormValues>({
    defaultValues: {
      className: "",
      level: "",
      type: "",
      academicYear: "",
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
  
  const academicYears = [
    { id: "2023-2024", name: "2023-2024" },
    { id: "2024-2025", name: "2024-2025" },
    { id: "2025-2026", name: "2025-2026" },
  ];

  return (
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
            {/* Schedule File Upload Component */}
            <ScheduleFileUpload control={form.control} name="schedule" />

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
  );
};
