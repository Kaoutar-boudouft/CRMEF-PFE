
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
            Structure architecturale de l'application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative border border-gray-200 rounded-lg p-4 bg-white overflow-auto max-h-[80vh]">
            <svg
              width="1000"
              height="800"
              viewBox="0 0 1000 800"
              className="mx-auto"
            >
              {/* Teacher Components */}
              <rect x="50" y="50" width="200" height="120" fill="#e2f0fd" stroke="#0077cc" strokeWidth="2" rx="5" />
              <text x="150" y="80" textAnchor="middle" fontWeight="bold" fontSize="16">Teacher</text>
              <line x1="50" y1="90" x2="250" y2="90" stroke="#0077cc" strokeWidth="2" />
              <text x="60" y="110" fontSize="12">- id: string</text>
              <text x="60" y="130" fontSize="12">- name: string</text>
              <text x="60" y="150" fontSize="12">- email: string</text>
              
              {/* Student Components */}
              <rect x="50" y="220" width="200" height="140" fill="#fff0e6" stroke="#ff7b00" strokeWidth="2" rx="5" />
              <text x="150" y="250" textAnchor="middle" fontWeight="bold" fontSize="16">Student</text>
              <line x1="50" y1="260" x2="250" y2="260" stroke="#ff7b00" strokeWidth="2" />
              <text x="60" y="280" fontSize="12">- id: string</text>
              <text x="60" y="300" fontSize="12">- name: string</text>
              <text x="60" y="320" fontSize="12">- email: string</text>
              <text x="60" y="340" fontSize="12">- progress: number</text>
              
              {/* Class Components */}
              <rect x="350" y="50" width="200" height="130" fill="#ebf9eb" stroke="#2e8b57" strokeWidth="2" rx="5" />
              <text x="450" y="80" textAnchor="middle" fontWeight="bold" fontSize="16">Class</text>
              <line x1="350" y1="90" x2="550" y2="90" stroke="#2e8b57" strokeWidth="2" />
              <text x="360" y="110" fontSize="12">- id: string</text>
              <text x="360" y="130" fontSize="12">- name: string</text>
              <text x="360" y="150" fontSize="12">- students: Student[]</text>
              <text x="360" y="170" fontSize="12">- teacherId: string</text>
              
              {/* Course Components */}
              <rect x="350" y="220" width="200" height="160" fill="#f0e6ff" stroke="#6900cc" strokeWidth="2" rx="5" />
              <text x="450" y="250" textAnchor="middle" fontWeight="bold" fontSize="16">Course</text>
              <line x1="350" y1="260" x2="550" y2="260" stroke="#6900cc" strokeWidth="2" />
              <text x="360" y="280" fontSize="12">- id: string</text>
              <text x="360" y="300" fontSize="12">- title: string</text>
              <text x="360" y="320" fontSize="12">- unit: string</text>
              <text x="360" y="340" fontSize="12">- semester: string</text>
              <text x="360" y="360" fontSize="12">- teacherId: string</text>
              
              {/* DiagnosticTest Components */}
              <rect x="650" y="50" width="200" height="150" fill="#ffecf0" stroke="#cc0033" strokeWidth="2" rx="5" />
              <text x="750" y="80" textAnchor="middle" fontWeight="bold" fontSize="16">DiagnosticTest</text>
              <line x1="650" y1="90" x2="850" y2="90" stroke="#cc0033" strokeWidth="2" />
              <text x="660" y="110" fontSize="12">- id: string</text>
              <text x="660" y="130" fontSize="12">- title: string</text>
              <text x="660" y="150" fontSize="12">- questions: Question[]</text>
              <text x="660" y="170" fontSize="12">- courseId: string</text>
              <text x="660" y="190" fontSize="12">- createdBy: string</text>
              
              {/* Question Components */}
              <rect x="650" y="250" width="200" height="120" fill="#fffacd" stroke="#b8860b" strokeWidth="2" rx="5" />
              <text x="750" y="280" textAnchor="middle" fontWeight="bold" fontSize="16">Question</text>
              <line x1="650" y1="290" x2="850" y2="290" stroke="#b8860b" strokeWidth="2" />
              <text x="660" y="310" fontSize="12">- id: string</text>
              <text x="660" y="330" fontSize="12">- text: string</text>
              <text x="660" y="350" fontSize="12">- options: string[]</text>
              
              {/* Dashboard Components */}
              <rect x="350" y="420" width="200" height="100" fill="#e6f0ff" stroke="#0044cc" strokeWidth="2" rx="5" />
              <text x="450" y="450" textAnchor="middle" fontWeight="bold" fontSize="16">Dashboard</text>
              <line x1="350" y1="460" x2="550" y2="460" stroke="#0044cc" strokeWidth="2" />
              <text x="360" y="480" fontSize="12">- stats: Object</text>
              <text x="360" y="500" fontSize="12">- activities: Activity[]</text>
              
              {/* Planning Components */}
              <rect x="50" y="420" width="200" height="100" fill="#f0fff0" stroke="#006400" strokeWidth="2" rx="5" />
              <text x="150" y="450" textAnchor="middle" fontWeight="bold" fontSize="16">Planning</text>
              <line x1="50" y1="460" x2="250" y2="460" stroke="#006400" strokeWidth="2" />
              <text x="60" y="480" fontSize="12">- courses: Course[]</text>
              <text x="60" y="500" fontSize="12">- schedule: Event[]</text>
              
              {/* Relationships */}
              {/* Teacher manages Classes */}
              <line x1="250" y1="90" x2="350" y2="90" stroke="#333" strokeWidth="1" />
              <polygon points="345,85 350,90 345,95" fill="#333" />
              <text x="300" y="80" fontSize="10" textAnchor="middle">manages</text>
              
              {/* Teacher creates Courses */}
              <line x1="170" y1="170" x2="370" y2="220" stroke="#333" strokeWidth="1" />
              <polygon points="365,218 370,220 365,222" fill="#333" />
              <text x="270" y="195" fontSize="10" textAnchor="middle">creates</text>
              
              {/* Class contains Students */}
              <line x1="350" y1="150" x2="250" y2="240" stroke="#333" strokeWidth="1" />
              <polygon points="248,235 250,240 252,235" fill="#333" />
              <text x="300" y="195" fontSize="10" textAnchor="middle">contains</text>
              
              {/* Course has DiagnosticTests */}
              <line x1="550" y1="250" x2="650" y2="120" stroke="#333" strokeWidth="1" />
              <polygon points="645,123 650,120 645,117" fill="#333" />
              <text x="600" y="180" fontSize="10" textAnchor="middle">has</text>
              
              {/* DiagnosticTest contains Questions */}
              <line x1="750" y1="200" x2="750" y2="250" stroke="#333" strokeWidth="1" />
              <polygon points="745,245 750,250 755,245" fill="#333" />
              <text x="765" y="225" fontSize="10" textAnchor="middle">contains</text>
              
              {/* Students take Courses */}
              <line x1="250" y1="290" x2="350" y2="290" stroke="#333" strokeWidth="1" />
              <polygon points="345,285 350,290 345,295" fill="#333" />
              <text x="300" y="280" fontSize="10" textAnchor="middle">takes</text>
              
              {/* Students take DiagnosticTests */}
              <line x1="250" y1="260" x2="650" y2="100" stroke="#333" strokeWidth="1" />
              <polygon points="645,103 650,100 645,97" fill="#333" />
              <text x="450" y="160" fontSize="10" textAnchor="middle">takes</text>
              
              {/* Teacher uses Dashboard */}
              <line x1="150" y1="170" x2="380" y2="420" stroke="#333" strokeWidth="1" />
              <polygon points="375,415 380,420 385,415" fill="#333" />
              <text x="265" y="300" fontSize="10" textAnchor="middle">uses</text>
              
              {/* Student uses Dashboard */}
              <line x1="150" y1="360" x2="380" y2="420" stroke="#333" strokeWidth="1" />
              <polygon points="375,415 380,420 385,415" fill="#333" />
              <text x="265" y="390" fontSize="10" textAnchor="middle">uses</text>
              
              {/* Teacher uses Planning */}
              <line x1="100" y1="170" x2="100" y2="420" stroke="#333" strokeWidth="1" />
              <polygon points="95,415 100,420 105,415" fill="#333" />
              <text x="85" y="295" fontSize="10" textAnchor="middle">uses</text>
              
              {/* Course in Planning */}
              <line x1="350" y1="380" x2="250" y2="430" stroke="#333" strokeWidth="1" />
              <polygon points="248,425 250,430 252,425" fill="#333" />
              <text x="300" y="405" fontSize="10" textAnchor="middle">schedules</text>
            </svg>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Légende</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#e2f0fd] border border-[#0077cc]"></div>
                <span>Enseignant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#fff0e6] border border-[#ff7b00]"></div>
                <span>Apprenant</span>
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
                <div className="w-4 h-4 bg-[#ffecf0] border border-[#cc0033]"></div>
                <span>Test Diagnostique</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#fffacd] border border-[#b8860b]"></div>
                <span>Question</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#e6f0ff] border border-[#0044cc]"></div>
                <span>Tableau de Bord</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#f0fff0] border border-[#006400]"></div>
                <span>Planning</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UMLDiagram;
