
import { useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import { toast } from "@/components/ui/use-toast";
import { FileText, Upload, X } from 'lucide-react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ScheduleFileUploadProps {
  control: Control<any>;
  name: string;
}

export const ScheduleFileUpload = ({ control, name }: ScheduleFileUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem className="mt-6">
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
                  onDrop={(e) => handleFileDrop(e, onChange)}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById(`file-upload-${name}`)?.click()}
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
                    id={`file-upload-${name}`}
                    type="file"
                    className="hidden"
                    accept=".pdf,.xls,.xlsx,.doc,.docx"
                    onChange={(e) => handleFileChange(e, onChange)}
                    {...field}
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
                        onClick={() => document.getElementById(`file-upload-${name}`)?.click()}
                      >
                        Remplacer
                      </Button>
                      <Button 
                        type="button"
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleFileDelete(onChange)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Input
                    id={`file-upload-${name}`}
                    type="file"
                    className="hidden"
                    accept=".pdf,.xls,.xlsx,.doc,.docx"
                    onChange={(e) => handleFileChange(e, onChange)}
                    {...field}
                  />
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
