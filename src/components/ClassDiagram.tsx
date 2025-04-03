
import React, { useState, useEffect } from 'react';
import { ArrowRight, User, Users, Book, BookOpen, Calendar, School } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface EntityProps {
  title: string;
  attributes: string[];
  icon?: React.ReactNode;
  className?: string;
}

const Entity: React.FC<EntityProps> = ({ title, attributes, icon, className }) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-md border border-gray-200 w-full overflow-hidden flex flex-col", className)}>
      <div className="bg-primary-foreground border-b border-gray-200 p-3 font-bold flex items-center gap-2">
        {icon}
        {title}
      </div>
      <div className="p-4 text-sm">
        <ul className="space-y-1">
          {attributes.map((attr, index) => (
            <li key={index} className="border-b border-gray-100 py-1 text-left">
              {attr}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ClassDiagram: React.FC = () => {
  const isMobile = useIsMobile();
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const handleResize = () => {
      // Adjust scale based on window width
      const newScale = window.innerWidth < 768 ? window.innerWidth / 1200 * 0.9 : 1;
      setScale(newScale);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Système de Gestion Pédagogique</h1>
      
      <div className="overflow-x-auto pb-4">
        <div 
          className="relative w-[1200px] h-[800px] mx-auto" 
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: isMobile ? '100%' : '1200px'
          }}
        >
          {/* Grid layout for better organization */}
          <div className="grid grid-cols-3 gap-6 h-full">
            {/* Row 1 */}
            <div className="relative">
              <Entity 
                title="Utilisateur" 
                icon={<User className="w-5 h-5" />}
                attributes={[
                  "id: INT PRIMARY KEY",
                  "nom: VARCHAR(255)",
                  "email: VARCHAR(255) UNIQUE",
                  "mot_de_passe: VARCHAR(255)",
                  "role: ENUM('Administrateur', 'Enseignant', 'Apprenant')"
                ]}
                className="bg-soft-blue"
              />
            </div>
            
            <div className="relative">
              <Entity
                title="Etudiant"
                icon={<Users className="w-5 h-5" />}
                attributes={[
                  "id: INT PRIMARY KEY",
                  "nom: VARCHAR(255)",
                  "email: VARCHAR(255) UNIQUE",
                  "classe_id: INT FK",
                  "niveau: ENUM('Basique', 'Recommandé', 'Avancé')"
                ]}
                className="bg-soft-orange"
              />
            </div>

            <div className="relative">
              <Entity
                title="Niveau"
                icon={<Book className="w-5 h-5" />}
                attributes={[
                  "id: INT PRIMARY KEY",
                  "nom: ENUM('1ère année', '2ème année', '3ème année')"
                ]}
                className="bg-soft-green"
              />
            </div>
            
            {/* Row 2 */}
            <div className="relative mt-8">
              <Entity
                title="Semestre"
                icon={<Calendar className="w-5 h-5" />}
                attributes={[
                  "id: INT PRIMARY KEY",
                  "annee_scolaire: YEAR",
                  "niveau_id: INT FK"
                ]}
                className="bg-soft-purple"
              />
            </div>
            
            <div className="relative mt-8">
              <Entity
                title="Classe"
                icon={<School className="w-5 h-5" />}
                attributes={[
                  "id: INT PRIMARY KEY",
                  "enseignant_id: INT FK",
                  "niveau_id: INT FK",
                  "type: ENUM('Générale', 'Internationale')",
                  "annee_scolaire: YEAR"
                ]}
                className="bg-soft-yellow"
              />
            </div>

            <div className="relative mt-8">
              <Entity
                title="Sequence"
                icon={<BookOpen className="w-5 h-5" />}
                attributes={[
                  "id: INT PRIMARY KEY",
                  "titre: VARCHAR(255)",
                  "niveau: ENUM('Basique', 'Recommandé', 'Avancé')",
                  "semestre_id: INT FK"
                ]}
                className="bg-soft-pink"
              />
            </div>

            {/* Row 3 */}
            <div className="relative mt-8">
              <Entity
                title="Cours"
                icon={<Book className="w-5 h-5" />}
                attributes={[
                  "id: INT PRIMARY KEY",
                  "titre: VARCHAR(255)",
                  "sequence_id: INT FK",
                  "description: TEXT"
                ]}
                className="bg-soft-peach"
              />
            </div>
            
            <div className="relative mt-8">
              <Entity
                title="Exercice"
                icon={<BookOpen className="w-5 h-5" />}
                attributes={[
                  "id: INT PRIMARY KEY",
                  "type: ENUM('QCM', 'Texte', 'Code')",
                  "cours_id: INT FK",
                  "correction: TEXT",
                  "note_maximale: INT"
                ]}
                className="bg-soft-blue"
              />
            </div>

            <div className="relative mt-8">
              <Entity
                title="Progression"
                attributes={[
                  "id: INT PRIMARY KEY",
                  "etudiant_id: INT FK",
                  "cours_id: INT FK",
                  "statut: ENUM('En cours', 'Terminé')",
                  "score: INT"
                ]}
                className="bg-soft-gray"
              />
            </div>
            
            {/* Row 4 */}
            <div className="relative col-start-2 mt-8">
              <Entity
                title="Enseignant_Classe"
                attributes={[
                  "id: INT PRIMARY KEY",
                  "enseignant_id: INT FK",
                  "classe_id: INT FK"
                ]}
                className="bg-soft-green"
              />
            </div>

            {/* SVG arrows and relationship lines have been removed */}
          </div>
        </div>
      </div>
      
      <div className="mt-10 mx-auto bg-white p-6 rounded-lg shadow-md max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Légende</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-soft-blue"></div>
            <span>Utilisateur & Exercice</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-soft-green"></div>
            <span>Niveau & Enseignant_Classe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-soft-yellow"></div>
            <span>Classe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-soft-orange"></div>
            <span>Etudiant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-soft-purple"></div>
            <span>Semestre</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-soft-pink"></div>
            <span>Sequence</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-soft-peach"></div>
            <span>Cours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-soft-gray"></div>
            <span>Progression</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDiagram;

