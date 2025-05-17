
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

const UMLDiagram = () => {
  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6" />
            <CardTitle>Diagramme UML de l'Application</CardTitle>
          </div>
          <CardDescription>
            Structure architecturale et modèle de données de l'application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative border border-gray-200 rounded-lg p-4 bg-white overflow-auto max-h-[80vh]">
            <svg
              width="1200"
              height="1000"
              viewBox="0 0 1200 1000"
              className="mx-auto"
            >
              {/* Utilisateur */}
              <rect x="550" y="550" width="200" height="180" fill="#f9f0ff" stroke="#6900cc" strokeWidth="2" rx="5" />
              <text x="650" y="575" textAnchor="middle" fontWeight="bold" fontSize="16">Utilisateur</text>
              <line x1="550" y1="585" x2="750" y2="585" stroke="#6900cc" strokeWidth="2" />
              <text x="560" y="605" fontSize="12">- id: INT (PK)</text>
              <text x="560" y="625" fontSize="12">- nom: VARCHAR</text>
              <text x="560" y="645" fontSize="12">- email: VARCHAR</text>
              <text x="560" y="665" fontSize="12">- mot_de_passe: VARCHAR</text>
              <text x="560" y="685" fontSize="12">- role: ENUM</text>

              {/* Etudiant */}
              <rect x="850" y="550" width="200" height="180" fill="#fff0e6" stroke="#ff7b00" strokeWidth="2" rx="5" />
              <text x="950" y="575" textAnchor="middle" fontWeight="bold" fontSize="16">Etudiant</text>
              <line x1="850" y1="585" x2="1050" y2="585" stroke="#ff7b00" strokeWidth="2" />
              <text x="860" y="605" fontSize="12">- id: INT (PK)</text>
              <text x="860" y="625" fontSize="12">- nom: VARCHAR</text>
              <text x="860" y="645" fontSize="12">- email: VARCHAR</text>
              <text x="860" y="665" fontSize="12">- classe_id: INT (FK)</text>
              <text x="860" y="685" fontSize="12">- niveau: ENUM</text>

              {/* Classe */}
              <rect x="550" y="800" width="200" height="180" fill="#ebf9eb" stroke="#2e8b57" strokeWidth="2" rx="5" />
              <text x="650" y="825" textAnchor="middle" fontWeight="bold" fontSize="16">Classe</text>
              <line x1="550" y1="835" x2="750" y2="835" stroke="#2e8b57" strokeWidth="2" />
              <text x="560" y="855" fontSize="12">- id: INT (PK)</text>
              <text x="560" y="875" fontSize="12">- enseignant_id: INT (FK)</text>
              <text x="560" y="895" fontSize="12">- niveau_id: INT (FK)</text>
              <text x="560" y="915" fontSize="12">- type: ENUM</text>
              <text x="560" y="935" fontSize="12">- annee_scolaire: YEAR</text>

              {/* Enseignant_Classe */}
              <rect x="400" y="300" width="200" height="130" fill="#e6f0ff" stroke="#0044cc" strokeWidth="2" rx="5" />
              <text x="500" y="325" textAnchor="middle" fontWeight="bold" fontSize="16">Enseignant_Classe</text>
              <line x1="400" y1="335" x2="600" y2="335" stroke="#0044cc" strokeWidth="2" />
              <text x="410" y="355" fontSize="12">- id: INT (PK)</text>
              <text x="410" y="375" fontSize="12">- enseignant_id: INT (FK)</text>
              <text x="410" y="395" fontSize="12">- classe_id: INT (FK)</text>

              {/* Cours */}
              <rect x="100" y="300" width="200" height="160" fill="#f0e6ff" stroke="#6900cc" strokeWidth="2" rx="5" />
              <text x="200" y="325" textAnchor="middle" fontWeight="bold" fontSize="16">Cours</text>
              <line x1="100" y1="335" x2="300" y2="335" stroke="#6900cc" strokeWidth="2" />
              <text x="110" y="355" fontSize="12">- id: INT (PK)</text>
              <text x="110" y="375" fontSize="12">- titre: VARCHAR</text>
              <text x="110" y="395" fontSize="12">- sequence_id: INT (FK)</text>
              <text x="110" y="415" fontSize="12">- description: TEXT</text>

              {/* Sequence */}
              <rect x="100" y="550" width="200" height="160" fill="#e2f0fd" stroke="#0077cc" strokeWidth="2" rx="5" />
              <text x="200" y="575" textAnchor="middle" fontWeight="bold" fontSize="16">Sequence</text>
              <line x1="100" y1="585" x2="300" y2="585" stroke="#0077cc" strokeWidth="2" />
              <text x="110" y="605" fontSize="12">- id: INT (PK)</text>
              <text x="110" y="625" fontSize="12">- titre: VARCHAR</text>
              <text x="110" y="645" fontSize="12">- niveau: ENUM</text>
              <text x="110" y="665" fontSize="12">- semestre_id: INT (FK)</text>

              {/* Semestre */}
              <rect x="100" y="800" width="200" height="160" fill="#fffacd" stroke="#b8860b" strokeWidth="2" rx="5" />
              <text x="200" y="825" textAnchor="middle" fontWeight="bold" fontSize="16">Semestre</text>
              <line x1="100" y1="835" x2="300" y2="835" stroke="#b8860b" strokeWidth="2" />
              <text x="110" y="855" fontSize="12">- id: INT (PK)</text>
              <text x="110" y="875" fontSize="12">- annee_scolaire: YEAR</text>
              <text x="110" y="895" fontSize="12">- numero: INT</text>
              <text x="110" y="915" fontSize="12">- niveau_id: INT (FK)</text>

              {/* Niveau */}
              <rect x="400" y="800" width="200" height="130" fill="#ffecf0" stroke="#cc0033" strokeWidth="2" rx="5" />
              <text x="500" y="825" textAnchor="middle" fontWeight="bold" fontSize="16">Niveau</text>
              <line x1="400" y1="835" x2="600" y2="835" stroke="#cc0033" strokeWidth="2" />
              <text x="410" y="855" fontSize="12">- id: INT (PK)</text>
              <text x="410" y="875" fontSize="12">- nom: ENUM</text>

              {/* Exercice */}
              <rect x="100" y="50" width="200" height="180" fill="#fff6e9" stroke="#ff9d00" strokeWidth="2" rx="5" />
              <text x="200" y="75" textAnchor="middle" fontWeight="bold" fontSize="16">Exercice</text>
              <line x1="100" y1="85" x2="300" y2="85" stroke="#ff9d00" strokeWidth="2" />
              <text x="110" y="105" fontSize="12">- id: INT (PK)</text>
              <text x="110" y="125" fontSize="12">- type: ENUM</text>
              <text x="110" y="145" fontSize="12">- cours_id: INT (FK)</text>
              <text x="110" y="165" fontSize="12">- correction: TEXT</text>
              <text x="110" y="185" fontSize="12">- note_maximale: INT</text>

              {/* Progression */}
              <rect x="850" y="50" width="200" height="160" fill="#e6f8f5" stroke="#00a086" strokeWidth="2" rx="5" />
              <text x="950" y="75" textAnchor="middle" fontWeight="bold" fontSize="16">Progression</text>
              <line x1="850" y1="85" x2="1050" y2="85" stroke="#00a086" strokeWidth="2" />
              <text x="860" y="105" fontSize="12">- id: INT (PK)</text>
              <text x="860" y="125" fontSize="12">- etudiant_id: INT (FK)</text>
              <text x="860" y="145" fontSize="12">- cours_id: INT (FK)</text>
              <text x="860" y="165" fontSize="12">- statut: ENUM</text>
              <text x="860" y="185" fontSize="12">- score: INT</text>

              {/* Relations */}
              {/* Cours - Exercice */}
              <line x1="200" y1="230" x2="200" y2="300" stroke="#333" strokeWidth="1.5" />
              <text x="210" y="270" fontSize="10">comprend</text>
              
              {/* Cours - Sequence */}
              <line x1="200" y1="460" x2="200" y2="550" stroke="#333" strokeWidth="1.5" />
              <text x="210" y="500" fontSize="10">inclut</text>
              
              {/* Sequence - Semestre */}
              <line x1="200" y1="710" x2="200" y2="800" stroke="#333" strokeWidth="1.5" />
              <text x="210" y="760" fontSize="10">composé de</text>
              
              {/* Semestre - Niveau */}
              <line x1="300" y1="880" x2="400" y2="880" stroke="#333" strokeWidth="1.5" />
              <text x="350" y="870" fontSize="10">affecté au semestre</text>
              
              {/* Niveau - Classe */}
              <line x1="600" y1="880" x2="640" y2="880" stroke="#333" strokeWidth="1.5" />
              <line x1="640" y1="880" x2="640" y2="910" stroke="#333" strokeWidth="1.5" />
              <line x1="640" y1="910" x2="680" y2="910" stroke="#333" strokeWidth="1.5" />
              <text x="640" y="940" fontSize="10">définit le niveau</text>
              
              {/* Enseignant (user) - Classe */}
              <line x1="650" y1="730" x2="650" y2="800" stroke="#333" strokeWidth="1.5" />
              <text x="660" y="770" fontSize="10">enseigne</text>
              
              {/* Etudiant - Classe */}
              <line x1="850" y1="680" x2="680" y2="680" stroke="#333" strokeWidth="1.5" />
              <line x1="680" y1="680" x2="680" y2="800" stroke="#333" strokeWidth="1.5" />
              <text x="700" y="680" fontSize="10">appartient à</text>
              
              {/* Etudiant - Progression */}
              <line x1="950" y1="550" x2="950" y2="210" stroke="#333" strokeWidth="1.5" />
              <text x="960" y="380" fontSize="10">suit</text>
              
              {/* Cours - Progression */}
              <line x1="300" y1="400" x2="850" y2="160" stroke="#333" strokeWidth="1.5" />
              <text x="550" y="250" fontSize="10">associé à</text>
              
              {/* User - Enseignant_Classe */}
              <line x1="600" y1="550" x2="550" y2="430" stroke="#333" strokeWidth="1.5" />
              <text x="560" y="490" fontSize="10">enseignant de</text>
              
              {/* Classe - Enseignant_Classe */}
              <line x1="550" y1="820" x2="350" y2="820" stroke="#333" strokeWidth="1.5" />
              <line x1="350" y1="820" x2="350" y2="400" stroke="#333" strokeWidth="1.5" />
              <line x1="350" y1="400" x2="400" y2="400" stroke="#333" strokeWidth="1.5" />
              <text x="350" y="650" fontSize="10">relié à</text>
              
              {/* Cours - Enseignant_Classe */}
              <line x1="300" y1="350" x2="400" y2="350" stroke="#333" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Légende</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#f9f0ff] border border-[#6900cc]"></div>
                <span>Utilisateur</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#fff0e6] border border-[#ff7b00]"></div>
                <span>Etudiant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#ebf9eb] border border-[#2e8b57]"></div>
                <span>Classe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#f0e6ff] border border-[#6900cc]"></div>
                <span>Cours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#e6f0ff] border border-[#0044cc]"></div>
                <span>Enseignant_Classe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#e2f0fd] border border-[#0077cc]"></div>
                <span>Sequence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#fffacd] border border-[#b8860b]"></div>
                <span>Semestre</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#ffecf0] border border-[#cc0033]"></div>
                <span>Niveau</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#fff6e9] border border-[#ff9d00]"></div>
                <span>Exercice</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#e6f8f5] border border-[#00a086]"></div>
                <span>Progression</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-sm text-gray-500 text-center mb-4">
        <p>Ce diagramme représente la structure de la base de données de l'application.</p>
        <p>Les clés primaires (PK) et étrangères (FK) sont indiquées, ainsi que les relations entre les entités.</p>
      </div>
    </div>
  );
};

export default UMLDiagram;
