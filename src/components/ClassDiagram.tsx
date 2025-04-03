
import React from 'react';
import { ArrowRight, User, Users, Book, BookOpen, Calendar, School } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EntityProps {
  title: string;
  attributes: string[];
  icon?: React.ReactNode;
  className?: string;
}

const Entity: React.FC<EntityProps> = ({ title, attributes, icon, className }) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-md border border-gray-200 w-64 overflow-hidden flex flex-col", className)}>
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

interface RelationshipProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
  type: "one-to-many" | "many-to-many" | "one-to-one" | "inheritance";
}

const ClassDiagram: React.FC = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Système de Gestion Pédagogique</h1>
      <div className="overflow-x-auto">
        <div className="relative w-[1200px] h-[900px] mx-auto">
          {/* Users */}
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
            className="absolute top-10 left-10 bg-soft-blue"
          />

          {/* Niveau */}
          <Entity
            title="Niveau"
            icon={<Book className="w-5 h-5" />}
            attributes={[
              "id: INT PRIMARY KEY",
              "nom: ENUM('1ère année', '2ème année', '3ème année')"
            ]}
            className="absolute top-10 right-10 bg-soft-green"
          />

          {/* Classe */}
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
            className="absolute top-60 left-80 bg-soft-yellow"
          />

          {/* Etudiant */}
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
            className="absolute top-10 left-300 bg-soft-orange"
          />

          {/* Semestre */}
          <Entity
            title="Semestre"
            icon={<Calendar className="w-5 h-5" />}
            attributes={[
              "id: INT PRIMARY KEY",
              "annee_scolaire: YEAR",
              "niveau_id: INT FK"
            ]}
            className="absolute top-350 left-10 bg-soft-purple"
          />

          {/* Sequence */}
          <Entity
            title="Sequence"
            icon={<BookOpen className="w-5 h-5" />}
            attributes={[
              "id: INT PRIMARY KEY",
              "titre: VARCHAR(255)",
              "niveau: ENUM('Basique', 'Recommandé', 'Avancé')",
              "semestre_id: INT FK"
            ]}
            className="absolute top-350 left-300 bg-soft-pink"
          />

          {/* Cours */}
          <Entity
            title="Cours"
            icon={<Book className="w-5 h-5" />}
            attributes={[
              "id: INT PRIMARY KEY",
              "titre: VARCHAR(255)",
              "sequence_id: INT FK",
              "description: TEXT"
            ]}
            className="absolute top-350 right-10 bg-soft-peach"
          />

          {/* Exercice */}
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
            className="absolute top-520 left-10 bg-soft-blue"
          />

          {/* Progression */}
          <Entity
            title="Progression"
            attributes={[
              "id: INT PRIMARY KEY",
              "etudiant_id: INT FK",
              "cours_id: INT FK",
              "statut: ENUM('En cours', 'Terminé')",
              "score: INT"
            ]}
            className="absolute top-520 left-300 bg-soft-gray"
          />

          {/* Enseignant_Classe */}
          <Entity
            title="Enseignant_Classe"
            attributes={[
              "id: INT PRIMARY KEY",
              "enseignant_id: INT FK",
              "classe_id: INT FK"
            ]}
            className="absolute top-520 right-10 bg-soft-green"
          />

          {/* Relationship Lines */}
          <svg className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#8E9196" />
              </marker>
            </defs>
            
            {/* Lines to represent relationships would go here */}
            {/* These would be drawn with SVG lines/paths */}
            
            {/* Example relationship: User to Classe */}
            <line x1="110" y1="120" x2="150" y2="200" 
                  stroke="#8E9196" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="120" y="160" className="text-xs" fill="#403E43">manages</text>
            
            {/* Niveau to Classe */}
            <line x1="900" y1="120" x2="500" y2="200" 
                  stroke="#8E9196" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="700" y="160" className="text-xs" fill="#403E43">has level</text>
            
            {/* More relationship lines would be added here */}
            
            {/* Classe to Etudiant */}
            <line x1="500" y1="200" x2="400" y2="120" 
                  stroke="#8E9196" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="440" y="160" className="text-xs" fill="#403E43">contains</text>
            
            {/* Niveau to Semestre */}
            <line x1="900" y1="120" x2="150" y2="400" 
                  stroke="#8E9196" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="500" y="300" className="text-xs" fill="#403E43">organizes</text>
            
            {/* Semestre to Sequence */}
            <line x1="150" y1="400" x2="300" y2="400" 
                  stroke="#8E9196" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="225" y="390" className="text-xs" fill="#403E43">contains</text>
            
            {/* Sequence to Cours */}
            <line x1="450" y1="400" x2="850" y2="400" 
                  stroke="#8E9196" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="650" y="390" className="text-xs" fill="#403E43">contains</text>
            
            {/* Cours to Exercice */}
            <line x1="850" y1="450" x2="150" y2="550" 
                  stroke="#8E9196" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="500" y="510" className="text-xs" fill="#403E43">contains</text>
            
            {/* Etudiant to Progression */}
            <line x1="400" y1="150" x2="300" y2="550" 
                  stroke="#8E9196" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="350" y="350" className="text-xs" fill="#403E43">tracks</text>
            
            {/* Cours to Progression */}
            <line x1="850" y1="450" x2="400" y2="550" 
                  stroke="#8E9196" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="600" y="510" className="text-xs" fill="#403E43">tracks</text>
            
            {/* Utilisateur to Enseignant_Classe */}
            <line x1="110" y1="150" x2="850" y2="550" 
                  stroke="#8E9196" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="500" y="350" className="text-xs" fill="#403E43">manages</text>
            
            {/* Classe to Enseignant_Classe */}
            <line x1="500" y1="250" x2="850" y2="550" 
                  stroke="#8E9196" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="675" y="400" className="text-xs" fill="#403E43">assigned to</text>
          </svg>
        </div>
      </div>
      
      <div className="mt-10 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Légende</h2>
        <div className="grid grid-cols-2 gap-4">
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
