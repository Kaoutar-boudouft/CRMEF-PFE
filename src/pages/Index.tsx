
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, GraduationCap, PlusCircle, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Tableau de bord EduManage</h1>
        <p className="text-muted-foreground">Bienvenue dans votre système de gestion éducative</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-lg p-6 border shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Étudiants</h2>
          </div>
          <p className="text-3xl font-bold mb-2">247</p>
          <p className="text-muted-foreground text-sm mb-4">Étudiants inscrits</p>
          <div className="mt-auto flex">
            <Link to="/create-student">
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Ajouter un étudiant
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-6 border shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Classes</h2>
          </div>
          <p className="text-3xl font-bold mb-2">12</p>
          <p className="text-muted-foreground text-sm mb-4">Classes actives</p>
          <div className="mt-auto flex">
            <Link to="/create-class">
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Créer une classe
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-6 border shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Planning</h2>
          </div>
          <p className="text-3xl font-bold mb-2">35</p>
          <p className="text-muted-foreground text-sm mb-4">Événements programmés</p>
          <div className="mt-auto flex">
            <Link to="/planning">
              <Button size="sm" className="gap-1">
                <Calendar className="h-4 w-4" />
                Voir le planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <Link to="/create-class">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Créer une nouvelle classe
          </Button>
        </Link>
        
        <Link to="/create-student">
          <Button variant="outline" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Ajouter un étudiant
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
