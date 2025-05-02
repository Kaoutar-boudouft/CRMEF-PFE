import React, { useState, useEffect } from 'react';
// Importez les composants de la barre latérale
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../components/ui/sidebar';
// Importez les icônes nécessaires (par exemple, Link2Icon pour Affectations)
import { LayoutDashboard, Users, GraduationCap, Calendar, Link2Icon } from 'lucide-react';
// Importez votre hook de navigation (par exemple, useNavigate de react-router-dom)
import { useNavigate } from 'react-router-dom';

// Importez votre composant de bouton (par exemple, Button de shadcn/ui)
// import { Button } from "@/components/ui/button";
// Importez votre composant de lien de routage (par exemple, Link de react-router-dom)
// import { Link } from 'react-router-dom';

// Supposons que vous ayez un type pour vos données d'affectation
interface Affectation {
  id: string;
  classe: string;
  cours: string;
  date: string; // Ou Date, selon votre structure de données
  // Ajoutez d'autres champs pertinents
}

const Affectation = () => {
  const navigate = useNavigate(); // Utilisez votre hook de navigation
  const [affectations, setAffectations] = useState<Affectation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Exemple de données fictives
  const dummyAffectations: Affectation[] = [
    { id: '1', classe: 'Terminale S1', cours: 'Mathématiques', date: '2023-10-26' },
    { id: '2', classe: 'Première L2', cours: 'Histoire-Géographie', date: '2023-10-26' },
    { id: '3', classe: 'Seconde C', cours: 'Physique-Chimie', date: '2023-10-27' },
  ];

  useEffect(() => {
    // Ici, vous ferez généralement un appel API pour récupérer les affectations
    // Exemple fictif avec un délai
    const fetchAffectations = async () => {
      try {
        // Remplacez ceci par votre logique de récupération de données réelle
        await new Promise(resolve => setTimeout(resolve, 500)); // Simule un délai réseau
        setAffectations(dummyAffectations); // Utilisez les données réelles ici
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des affectations.");
        setLoading(false);
      }
    };

    fetchAffectations();
  }, []); // Le tableau vide assure que cela ne s'exécute qu'une fois au montage

  // Définition des éléments de navigation pour la barre latérale (comme dans Planning.tsx)
  const navItems = [
    // { title: "Acceuil", id: "acceuil", icon: LayoutDashboard, path: "/index" },
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Étudiants", id: "students", icon: Users, path: "/students" }, // Adaptez le chemin si nécessaire
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/classes" }, // Adaptez le chemin si nécessaire
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
    { title: "Affectations", id: "affectation", icon: Link2Icon, path: "/affectation" }, // Nouvel élément
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
                        // Utilisez location.pathname pour déterminer l'élément actif
                        className={location.pathname === item.path && item.id === 'affectation' ? "bg-accent" : ""}
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
          <header className="border-b px-6 py-3">
            <h1 className="text-2xl text-center font-bold">Gestion des Affectations</h1> {/* Titre de la page */}
          </header>

          <main className="p-6">
            {/* Contenu de la page Affectation */}
            <div className="container mx-auto p-4"> {/* Vous pouvez ajuster ou supprimer ce conteneur si le padding du main suffit */}
              <h1 className="text-2xl font-bold mb-4">Liste des Affectations</h1>

              {/* Bouton "Créer une nouvelle affectation" avec le style de Index.tsx */}
              {/* Remplacez Button et Link par vos composants réels si vous les utilisez */}
              {/* Assurez-vous que le chemin '/creer-affectation' correspond à votre configuration de routage */}
               <button
                 className="mb-4 px-4 py-1.5 bg-primary text-primary-foreground rounded-md flex items-center"
                 // onClick={() => navigate('/creer-affectation')} // Décommentez et adaptez si vous utilisez useNavigate
               >
                 Créer une nouvelle affectation
               </button>


              {loading && <p>Chargement des affectations...</p>}
              {error && <p className="text-red-500">{error}</p>}

              {!loading && !error && (
                // Conteneur de tableau avec le style de Index.tsx
                <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    {/* Tableau avec le style de Index.tsx */}
                    <table className="w-full"> {/* Utilisez w-full comme dans Index.tsx */}
                      <thead>
                        <tr className="border-b bg-muted/50"> {/* Style de l'en-tête de Index.tsx */}
                          <th className="py-3 px-4 text-left">Classe</th> {/* Ajustez le padding et l'alignement si nécessaire */}
                          <th className="py-3 px-4 text-left">Cours</th>
                          <th className="py-3 px-4 text-left">Date</th>
                          {/* Ajoutez d'autres en-têtes si nécessaire */}
                        </tr>
                      </thead>
                      <tbody>
                        {affectations.map((affectation) => (
                          <tr key={affectation.id} className="border-b hover:bg-muted/50"> {/* Style des lignes de Index.tsx */}
                            <td className="py-4 px-4">{affectation.classe}</td> {/* Ajustez le padding */}
                            <td className="py-4 px-4">{affectation.cours}</td>
                            <td className="py-4 px-4">{affectation.date}</td>
                            {/* Affichez d'autres données ici */}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {affectations.length === 0 && <p className="mt-4 text-center">Aucune affectation trouvée.</p>} {/* Centrer le message si pas d'affectations */}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Affectation;
