
import { useState } from 'react';
import ClassDiagram from '../components/ClassDiagram';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/ui/resizable';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../components/ui/sidebar';
import { BookOpenCheck, BookText, Calendar, GraduationCap, Home, LayoutDashboard, School, Users } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'diagram' | 'students' | 'teachers' | 'classes' | 'courses' | 'exercises' | 'semesters'>('diagram');

  // Mock navigation items
  const navItems = [
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard },
    { title: "Diagramme UML", id: "diagram", icon: BookOpenCheck },
    { title: "Étudiants", id: "students", icon: Users },
    { title: "Enseignants", id: "teachers", icon: School },
    { title: "Classes", id: "classes", icon: GraduationCap },
    { title: "Cours", id: "courses", icon: BookText },
    { title: "Exercices", id: "exercises", icon: BookText },
    { title: "Semestres", id: "semesters", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <Sidebar className="border-r">
        <SidebarContent>
          <div className="py-4 px-3">
            <h2 className="text-xl font-bold text-primary">EduManage</h2>
          </div>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      className={currentView === item.id ? "bg-accent" : ""}
                      onClick={() => setCurrentView(item.id as any)}
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
          <h1 className="text-2xl font-bold">
            {navItems.find(item => item.id === currentView)?.title || 'EduManage'}
          </h1>
        </header>

        <main className="p-6">
          {currentView === 'diagram' && (
            <div className="rounded-lg border bg-card p-6 shadow-sm w-full overflow-auto">
              <h2 className="text-xl font-semibold mb-4">Diagramme de Classes</h2>
              <ClassDiagram />
            </div>
          )}
          
          {currentView === 'dashboard' && (
            <DashboardMockup />
          )}
          
          {currentView === 'students' && (
            <StudentsMockup />
          )}
          
          {currentView === 'teachers' && (
            <TeachersMockup />
          )}
          
          {currentView === 'classes' && (
            <ClassesMockup />
          )}
          
          {currentView === 'courses' && (
            <CoursesMockup />
          )}
          
          {currentView === 'exercises' && (
            <ExercisesMockup />
          )}
          
          {currentView === 'semesters' && (
            <SemestersMockup />
          )}
        </main>
      </div>
    </div>
  );
};

// Mock components for each view
const DashboardMockup = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard title="Étudiants" value="1,245" icon={<Users className="h-8 w-8" />} color="soft-blue" />
      <StatsCard title="Enseignants" value="78" icon={<School className="h-8 w-8" />} color="soft-green" />
      <StatsCard title="Classes" value="36" icon={<GraduationCap className="h-8 w-8" />} color="soft-yellow" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Activité Récente</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-start space-x-4 border-b pb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-soft-${i % 2 ? 'purple' : 'peach'}`}>
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Nouvel étudiant inscrit</p>
                <p className="text-sm text-muted-foreground">Il y a 3 heures</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Cours Populaires</h3>
        <div className="space-y-4">
          {['Mathématiques', 'Programmation', 'Base de données', 'Anglais'].map((course, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <span>{course}</span>
                <span className="text-sm">{90 - i * 10}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2" 
                  style={{ width: `${90 - i * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Stats Card Component
const StatsCard = ({ title, value, icon, color }) => (
  <div className={`rounded-lg border bg-card p-6 shadow-sm flex items-center space-x-4`}>
    <div className={`rounded-full bg-${color} p-3`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

// Student mockup
const StudentsMockup = () => (
  <div className="rounded-lg border bg-card p-6 shadow-sm space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Liste des Étudiants</h2>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center">
        <Users className="h-4 w-4 mr-2" /> Ajouter un étudiant
      </button>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left">Nom</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Classe</th>
            <th className="py-3 px-4 text-left">Date d'inscription</th>
            <th className="py-3 px-4 text-left">Statut</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map(i => (
            <tr key={i} className="border-b hover:bg-muted/50">
              <td className="py-4 px-4">Étudiant {i}</td>
              <td className="py-4 px-4">etudiant{i}@example.com</td>
              <td className="py-4 px-4">Classe {i % 3 + 1}</td>
              <td className="py-4 px-4">2023-09-{i * 5}</td>
              <td className="py-4 px-4">
                <span className={`inline-block px-2 py-1 rounded text-xs ${i % 2 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {i % 2 ? 'Actif' : 'En attente'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Teachers mockup
const TeachersMockup = () => (
  <div className="rounded-lg border bg-card p-6 shadow-sm space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Liste des Enseignants</h2>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center">
        <School className="h-4 w-4 mr-2" /> Ajouter un enseignant
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="rounded-lg border bg-card shadow p-6 flex flex-col">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-soft-purple flex items-center justify-center">
              <School className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-medium">Prof. Nom {i}</h3>
              <p className="text-sm text-muted-foreground">Spécialité {i % 3 + 1}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Email:</span>
              <span>prof{i}@example.com</span>
            </div>
            <div className="flex justify-between">
              <span>Classes:</span>
              <span>{i + 1}</span>
            </div>
            <div className="flex justify-between">
              <span>Cours:</span>
              <span>{i * 2}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Classes mockup
const ClassesMockup = () => (
  <div className="rounded-lg border bg-card p-6 shadow-sm space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Gestion des Classes</h2>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center">
        <GraduationCap className="h-4 w-4 mr-2" /> Nouvelle classe
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="rounded-lg border bg-card shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">Classe {i}</h3>
            <p className="text-sm text-muted-foreground">Année 2023-2024</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span>Étudiants:</span>
              <span>{20 + i * 5}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Enseignants:</span>
              <span>{3 + i}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cours:</span>
              <span>{6 + i}</span>
            </div>
            <div className="pt-4 flex space-x-2">
              <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm">Voir détails</button>
              <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm">Gérer</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Courses mockup
const CoursesMockup = () => (
  <div className="rounded-lg border bg-card p-6 shadow-sm space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Gestion des Cours</h2>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center">
        <BookText className="h-4 w-4 mr-2" /> Nouveau cours
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['Mathématiques', 'Programmation', 'Base de données', 'Anglais', 'Physique', 'Chimie'].map((course, i) => (
        <div key={i} className={`rounded-lg border shadow p-6 bg-soft-${i % 5 === 0 ? 'blue' : i % 5 === 1 ? 'green' : i % 5 === 2 ? 'yellow' : i % 5 === 3 ? 'peach' : 'purple'}`}>
          <h3 className="font-medium text-lg mb-2">{course}</h3>
          <p className="text-sm mb-4">Description du cours de {course.toLowerCase()}.</p>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span>Niveau:</span>
              <span>{i % 3 === 0 ? 'Basique' : i % 3 === 1 ? 'Intermédiaire' : 'Avancé'}</span>
            </div>
            <div className="flex justify-between">
              <span>Crédits:</span>
              <span>{(i % 3) + 2}</span>
            </div>
            <div className="flex justify-between">
              <span>Exercices:</span>
              <span>{i * 2 + 3}</span>
            </div>
          </div>
          <button className="w-full px-3 py-1.5 bg-background text-foreground rounded text-sm">Voir le cours</button>
        </div>
      ))}
    </div>
  </div>
);

// Exercises mockup
const ExercisesMockup = () => (
  <div className="rounded-lg border bg-card p-6 shadow-sm space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Exercices</h2>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center">
        <BookText className="h-4 w-4 mr-2" /> Nouvel exercice
      </button>
    </div>
    
    <div className="space-y-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="rounded-lg border bg-card shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium">Exercice {i}: Titre de l'exercice</h3>
              <p className="text-sm text-muted-foreground">Cours: {i % 3 === 0 ? 'Mathématiques' : i % 3 === 1 ? 'Programmation' : 'Base de données'}</p>
            </div>
            <span className={`inline-block px-2 py-1 rounded text-xs ${i % 3 === 0 ? 'bg-green-100 text-green-800' : i % 3 === 1 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
              {i % 3 === 0 ? 'Facile' : i % 3 === 1 ? 'Moyen' : 'Difficile'}
            </span>
          </div>
          <p className="text-sm mb-4">Description de l'exercice {i} avec des instructions détaillées pour les étudiants.</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm">Prévisualiser</button>
            <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm">Modifier</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Semesters mockup
const SemestersMockup = () => (
  <div className="rounded-lg border bg-card p-6 shadow-sm space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Gestion des Semestres</h2>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center">
        <Calendar className="h-4 w-4 mr-2" /> Nouveau semestre
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { name: 'Semestre 1 2023-2024', status: 'En cours', startDate: '2023-09-01', endDate: '2023-12-31' },
        { name: 'Semestre 2 2023-2024', status: 'À venir', startDate: '2024-01-15', endDate: '2024-05-31' },
        { name: 'Semestre 1 2022-2023', status: 'Terminé', startDate: '2022-09-01', endDate: '2022-12-31' },
        { name: 'Semestre 2 2022-2023', status: 'Terminé', startDate: '2023-01-15', endDate: '2023-05-31' },
      ].map((semester, i) => (
        <div key={i} className="rounded-lg border bg-card shadow">
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-lg font-medium">{semester.name}</h3>
            <span className={`inline-block px-2 py-1 rounded text-xs ${semester.status === 'En cours' ? 'bg-green-100 text-green-800' : semester.status === 'À venir' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
              {semester.status}
            </span>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span>Date de début:</span>
              <span>{semester.startDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Date de fin:</span>
              <span>{semester.endDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Séquences:</span>
              <span>{i === 0 ? '4 (2 complétées)' : i === 1 ? '4 (0 complétée)' : '4 (4 complétées)'}</span>
            </div>
            {semester.status === 'En cours' && (
              <div className="pt-2">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progression:</span>
                  <span>50%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2 w-1/2" />
                </div>
              </div>
            )}
            <div className="pt-4 flex space-x-2">
              <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm">Séquences</button>
              <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm">Gérer</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Index;
