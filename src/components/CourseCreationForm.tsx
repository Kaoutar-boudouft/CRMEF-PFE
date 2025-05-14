
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar as CalendarIcon, Book, FileText, Save, Upload, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Form schema
const courseFormSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  semester: z.string().min(1, "Veuillez sélectionner un semestre"),
  unit: z.string().min(1, "Veuillez sélectionner une unité"),
  sequence: z.string().min(1, "Veuillez sélectionner une séquence"),
  level: z.string().min(1, "Veuillez sélectionner un niveau"),
  description: z.string().optional(),
  scheduledDate: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  materials: z.instanceof(FileList).optional(),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

export function CourseCreationForm({ onSubmit }: { onSubmit: (data: CourseFormValues) => void }) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      semester: "",
      unit: "",
      sequence: "",
      level: "",
      description: "",
    },
  });

  const handleFormSubmit = (data: CourseFormValues) => {
    onSubmit(data);
    toast({
      title: "Cours créé avec succès",
      description: `Le cours "${data.title}" a été ajouté au planning.`,
    });
    form.reset();
    setUploadedFile(null);
  };
  
  // Functions for file upload handling
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: (value: FileList) => void) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      onChange(files);
    }
  };
  
  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>, onChange: (value: FileList) => void) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const allowedTypes = ['.pdf', '.ppt', '.pptx', '.doc', '.docx'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (allowedTypes.includes(fileExtension)) {
        setUploadedFile(file);
        onChange(files);
      } else {
        toast({
          title: "Type de fichier non supporté",
          description: "Veuillez télécharger un fichier PDF, PowerPoint ou Word.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const handleFileDelete = (onChange: (value: null) => void) => {
    setUploadedFile(null);
    onChange(null);
  };

  // Sample data
  const semesters = [
    { id: "1", name: "Semestre 1" },
    { id: "2", name: "Semestre 2" },
  ];
  
  const units = [
    { id: "1", name: "Unité 1 : 1ère semestre" },
    { id: "2", name: "Unité 2 : 1ère semestre" },
    { id: "3", name: "Unité 3 : 2ème semestre" },
  ];
  
  const sequences = [
    { id: "1", unitId: "1", name: "Système informatique" },
    { id: "2", unitId: "1", name: "Système d'exploitation" },
    { id: "3", unitId: "2", name: "Programmation" },
    { id: "4", unitId: "3", name: "Bureautique" },
  ];
  
  const levels = [
    { id: "basic", name: "Basique" },
    { id: "recommended", name: "Recommandé" },
    { id: "advanced", name: "Avancé" },
  ];

  // Filter sequences based on selected unit
  const filteredSequences = sequences.filter(
    sequence => sequence.unitId === form.watch("unit")
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Book className="h-5 w-5 mr-2" />
          Créer un nouveau cours
        </CardTitle>
        <CardDescription>
          Renseignez les détails du cours qui sera visible aux apprenants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre du cours</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: La connectivité" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ce titre sera visible pour les apprenants
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semestre</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un semestre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {semesters.map((semester) => (
                          <SelectItem key={semester.id} value={semester.id}>
                            {semester.name}
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
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unité</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Reset sequence when unit changes
                        form.setValue("sequence", "");
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une unité" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name}
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
                name="sequence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Séquence</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!form.watch("unit")}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une séquence" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredSequences.map((sequence) => (
                          <SelectItem key={sequence.id} value={sequence.id}>
                            {sequence.name}
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
                        {levels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>
                            {level.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Ce niveau sera utilisé pour la progression des apprenants
                    </FormDescription>
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
                  <FormLabel>Description du cours</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Description du cours et objectifs d'apprentissage"
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Expliquez brièvement le contenu du cours
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scheduledDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date du cours</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Choisir une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    La date à laquelle ce cours sera programmé
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="materials"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Matériel du cours
                  </FormLabel>
                  <FormDescription>
                    Téléchargez les supports de cours pour les apprenants (PDF, PowerPoint ou Word)
                  </FormDescription>
                  <FormControl>
                    <div className="flex flex-col gap-2 mt-2">
                      {!uploadedFile ? (
                        <div 
                          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                          onDrop={(e) => handleFileDrop(e, onChange)}
                          onDragOver={handleDragOver}
                          onClick={() => document.getElementById('file-upload-materials')?.click()}
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-base font-medium text-muted-foreground mb-2">
                              Glissez-déposez votre fichier ici ou cliquez pour parcourir
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Formats acceptés: PDF, PPT, PPTX, DOC, DOCX (Max 10MB)
                            </p>
                          </div>
                          <Input
                            id="file-upload-materials"
                            type="file"
                            className="hidden"
                            accept=".pdf,.ppt,.pptx,.doc,.docx"
                            onChange={(e) => handleFileChange(e, onChange)}
                            {...rest}
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
                                onClick={() => document.getElementById('file-upload-materials')?.click()}
                              >
                                Remplacer
                              </Button>
                              <Button 
                                type="button"
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleFileDelete(() => onChange(null))}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Input
                            id="file-upload-materials"
                            type="file"
                            className="hidden"
                            accept=".pdf,.ppt,.pptx,.doc,.docx"
                            onChange={(e) => handleFileChange(e, onChange)}
                            {...rest}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <CardFooter className="px-0 pt-4 flex justify-end">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Créer le cours
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
