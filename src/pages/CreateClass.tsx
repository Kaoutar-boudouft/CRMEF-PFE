
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, Sidebar } from '../components/ui/sidebar';
import { Button } from "@/components/ui/button";
import { SidebarNavigation } from '../components/SidebarNavigation';
import { ClassForm } from '../components/ClassForm';

const CreateClass = () => {
  const navigate = useNavigate();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        {/* Sidebar Navigation */}
        <Sidebar className="border-r">
          <SidebarNavigation currentPath="/" />
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
            <ClassForm />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CreateClass;
