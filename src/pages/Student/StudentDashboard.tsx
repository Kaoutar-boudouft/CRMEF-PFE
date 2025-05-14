import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Book, FileCheck, TestTube, Medal, User, Repeat, ChevronRight, Star, BookOpen, Calendar } from 'lucide-react';
import { 
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('El amrani Mohamed'); // Example student name, could be fetched from API/context
  
  // État pour suivre l'unité, la séquence et le cours sélectionnés
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedSequence, setSelectedSequence] = useState<string | null>(null);
  
  const unites = [
    {
      id: 'unite1',
      title: 'Unité 1 : 1er semestre',
      progress: 78,
      level: 'Recommandé',
      requiresDiagnostic: false,
      color: 'blue',
      emoji: '🚀'
    },
    {
      id: 'unite2',
      title: 'Unité 2 : 1er semestre',
      progress: 0,
      level: 'Non déterminé',
      requiresDiagnostic: true,
      color: 'purple',
      emoji: '🔍'
    }
  ];
  
  // Données pour la hiérarchie des cours (unité > séquence > cours)
  const courseHierarchy = [
    {
      id: 'unite1',
      title: 'Unité 1 : 1er semestre',
      sequences: [
        {
          id: 'seq1',
          title: 'Système informatique',
          courses: [
            {
              id: 'cours1',
              title: 'La connectivité',
              progress: 100,
              level: 'Avancé',
            },
            {
              id: 'cours2',
              title: 'Logiciels',
              progress: 100,
              level: 'Recommandé',
            }
          ]
        },
        {
          id: 'seq2',
          title: 'Système d\'exploitation',
          courses: [
            {
              id: 'cours3',
              title: 'Notion de système d\'exploitation',
              progress: 60,
              level: 'Basique',
            }
          ]
        }
      ]
    },
    {
      id: 'unite2',
      title: 'Unité 2 : 1er semestre',
      sequences: [
        {
          id: 'seq3',
          title: 'Programmation',
          courses: [
            {
              id: 'cours4',
              title: 'Introduction à la programmation',
              progress: 0,
              level: 'Basique',
            }
          ]
        }
      ]
    }
  ];

  // Mock data for student progress
  const courses = [
    {
      id: 'cours1',
      title: "La connectivité",
      unite: "Unité 1",
      sequence: 'Système informatique',
      progress: 100,
      level: 'Avancé',
      icon: '🌐',
      color: 'bg-blue-100'
    },
    {
      id: 'cours2',
      title: 'Logiciels',
      unite: "Unité 1",
      sequence: 'Système informatique',
      progress: 100,
      level: 'Recommandé',
      icon: '💻',
      color: 'bg-green-100'
    },
    {
      id: "cours3",
      title: 'Notion de système d\'exploitation',
      unite: "Unité 1",
      sequence: "Système d'exploitation", // Fixed string delimiter issue by using double quotes
      progress: 60,
      level: 'Basique',
      icon: '⚙️',
      color: 'bg-purple-100'
    }
  ];
  
  // Statistiques de progression générales
  const stats = {
    totalProgress: 68,
    coursesCompleted: 2,
    totalCourses: 5,
    streakDays: 4,
    stars: 12,
    nextMilestone: 15
  };

  // Handleurs pour la navigation
  const handleUnitSelect = (unitId: string) => {
    if (selectedUnit === unitId) {
      setSelectedUnit(null);
      setSelectedSequence(null);
    } else {
      setSelectedUnit(unitId);
      setSelectedSequence(null);
    }
  };

  const handleSequenceSelect = (sequenceId: string) => {
    if (selectedSequence === sequenceId) {
      setSelectedSequence(null);
    } else {
      setSelectedSequence(sequenceId);
    }
  };

  const handleCourseSelect = (courseId: string, level: string) => {
    navigate(`/student-course/${courseId}?level=${level}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button className="flex items-center focus:outline-none text-2xl font-bold">
              <span className="text-black">اونلاين</span> <span className="text-yellow-500">قسمي</span>
            </button>
            <img 
              src="/graduation-cap-svg-icon-free-graduation-cap-icon-11553393846gq7rcr1qsx.png" 
              alt="Graduation Cap Icon" 
              className="w-14 h-14 rounded-full shadow-lg border-2 border-yellow-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage src="" alt={studentName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{studentName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{studentName}</p>
                    <p className="text-xs leading-none text-muted-foreground">etudiant@qismi.ma</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/student-profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Mon profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('View progress')}>
                  <Medal className="mr-2 h-4 w-4" />
                  <span>Ma progression</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/')}>
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête de bienvenue avec emojis amicaux */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            👋 Salut, {studentName.split(' ')[0]}!
          </h1>
          <p className="text-blue-600">Continue ton super apprentissage et gagne des étoiles! ⭐</p>
        </div>

        {/* Statistiques visuelles pour les enfants */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-800 flex items-center">
            <Medal className="mr-2 h-6 w-6 text-yellow-500" /> 
            Ma progression
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Carte 1: Progression globale */}
            <Card className="overflow-hidden border-t-4 border-purple-500">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-white">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-purple-800">Mon niveau 🚀</h3>
                  <div className="text-xl font-bold bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    Basique
                  </div>
                </div>
                
                <div className="text-center py-3">
                  <div className="inline-block rounded-full bg-purple-100 p-3">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-purple-800">
                        {stats.totalProgress}%
                      </div>
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle 
                          cx="48" cy="48" r="36" 
                          stroke="#e2d9f3" 
                          strokeWidth="8" 
                          fill="transparent" 
                        />
                        <circle 
                          cx="48" cy="48" r="36" 
                          stroke="#8b5cf6" 
                          strokeWidth="8" 
                          fill="transparent" 
                          strokeDasharray={`${36 * 2 * Math.PI * stats.totalProgress/100} ${36 * 2 * Math.PI * (1-stats.totalProgress/100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-2 text-purple-700">Progression totale</p>
                </div>
              </div>
            </Card>
            
            {/* Carte 2: Réussites */}
            <Card className="overflow-hidden border-t-4 border-green-500">
              <div className="p-6 bg-gradient-to-br from-green-50 to-white">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-green-800">Mes réussites 🏆</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-100 p-4 rounded-xl flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-700">{stats.coursesCompleted}/{stats.totalCourses}</span>
                    <span className="text-sm text-green-600">Cours terminés</span>
                  </div>
                  
                  <div className="bg-green-100 p-4 rounded-xl flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-700">{stats.streakDays}</span>
                    <span className="text-sm text-green-600">Jours consécutifs</span>
                  </div>
                </div>
                
                <div className="mt-4 bg-green-100 p-4 rounded-xl flex items-center justify-center">
                  <Star className="text-yellow-500 h-6 w-6 mr-2" />
                  <div>
                    <span className="text-lg font-bold text-green-700">{stats.stars} étoiles</span>
                    <div className="text-xs text-green-600">Encore {stats.nextMilestone - stats.stars} pour un badge!</div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Carte 3: Activité récente */}
            <Card className="overflow-hidden border-t-4 border-blue-500">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-white">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-blue-800">Récemment 🕒</h3>
                </div>
                
                <div className="space-y-3">
                  {[
                    { emoji: "📝", action: "Test réussi", subject: "Bases de l'informatique", time: "Hier" },
                    { emoji: "📚", action: "Cours terminé", subject: "La connectivité", time: "Il y a 3 jours" },
                  ].map((activity, i) => (
                    <div key={i} className="bg-blue-100 p-3 rounded-xl flex items-center">
                      <div className="text-2xl mr-3">{activity.emoji}</div>
                      <div>
                        <p className="font-medium text-blue-800">{activity.action}</p>
                        <p className="text-xs text-blue-600">{activity.subject} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-500 hover:text-blue-700 hover:bg-blue-50 mt-2"
                  >
                    Voir tout
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs pour mieux organiser les contenus */}
        <Tabs defaultValue="courses" className="mt-8">
          <TabsList className="grid grid-cols-3 mb-6 w-full md:w-auto">
            <TabsTrigger value="courses" className="flex items-center">
              <Book className="mr-2 h-4 w-4" /> Mes cours
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" /> Leçons en cours
            </TabsTrigger>
            <TabsTrigger value="units" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Mes unités
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-6">
            {/* Historique des cours avec navigation hiérarchique */}
            <Card className="overflow-hidden">
              <div className="bg-blue-500 px-6 py-4">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <Book className="mr-2 h-5 w-5" /> Tous mes cours
                </h3>
              </div>
              <div className="p-4">
                <Accordion type="single" collapsible className="w-full">
                  {courseHierarchy.map(unit => (
                    <AccordionItem key={unit.id} value={unit.id} className="border rounded-lg mb-2 shadow-sm">
                      <AccordionTrigger className="text-lg font-medium px-4 py-2 hover:bg-blue-50">
                        <div className="flex items-center text-blue-700">
                          <Calendar className="h-5 w-5 mr-2" />
                          {unit.title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-2">
                        <div className="pl-4">
                          {unit.sequences.map(sequence => (
                            <Accordion type="single" collapsible className="w-full" key={sequence.id}>
                              <AccordionItem value={sequence.id} className="border-l-2 border-blue-200 ml-2 pl-2">
                                <AccordionTrigger className="text-md text-gray-800 px-2 py-1 hover:bg-blue-50 rounded">
                                  <div className="flex items-center text-blue-600">
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    {sequence.title}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-2 pl-4">
                                    {sequence.courses.map(course => (
                                      <div 
                                        key={course.id} 
                                        className="flex items-center justify-between p-3 hover:bg-blue-50 cursor-pointer rounded-md border border-blue-100"
                                        onClick={() => handleCourseSelect(course.id, course.level)}
                                      >
                                        <div className="flex items-center">
                                          <div className={`w-3 h-3 rounded-full mr-3 ${
                                            course.progress === 100 ? 'bg-green-500' : 
                                            course.progress > 0 ? 'bg-yellow-500' : 'bg-gray-300'
                                          }`} />
                                          <span>{course.title}</span>
                                          
                                          {course.progress === 100 && (
                                            <span className="ml-2 text-green-500">✓</span>
                                          )}
                                        </div>
                                        <div className="flex items-center">
                                          <div className="mr-3">
                                            <Progress value={course.progress} className="h-2 w-16" />
                                          </div>
                                          <ChevronRight className="h-4 w-4 text-blue-400" />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="lessons" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((cours) => (
                <Card key={cours.id} className={`overflow-hidden border-l-4 ${
                  cours.progress === 100 ? 'border-green-500' : 'border-yellow-500'
                }`}>
                  <div className={`${cours.color} p-1`}></div>
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="text-3xl mr-3">{cours.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold">{cours.title}</h3>
                        {cours.progress !== 100 ? (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                            En cours
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Terminé ✓
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Mon progrès:</span>
                        <span className="text-sm font-medium">{cours.progress}%</span>
                      </div>
                      <Progress value={cours.progress} className="h-3 rounded-full" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-gray-500">Unité</div>
                        <div className="font-medium">{cours.unite}</div>
                      </div>
                      
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-gray-500">Niveau</div>
                        <div className="font-medium">{cours.level}</div>
                      </div>
                    </div>
                    
                    {cours.progress !== 100 ? (
                      <Button 
                         variant="default" 
                        className="w-full"
                        onClick={() => navigate('/student-course/' + cours.id)}
                      >
                        <TestTube className="mr-2 h-4 w-4" />
                        Continuer
                      </Button>
                    ) : (
                      <Button
                        variant='secondary' 
                        className="w-full"
                      >
                        <Repeat className="mr-2 h-4 w-4" />
                        Revoir
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="units" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {unites.map((unite) => (
                <Card key={unite.id} className="overflow-hidden">
                  <div className={`bg-${unite.color}-500 p-4 flex justify-between items-center`}>
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <span className="mr-2 text-2xl">{unite.emoji}</span>
                      {unite.title}
                    </h3>
                    {unite.requiresDiagnostic ? (
                      <span className="px-3 py-1 bg-yellow-300 text-yellow-800 text-xs font-bold rounded-full">
                        Test requis
                      </span>
                    ) : (
                      unite.progress !== 100 ? (
                        <span className="px-3 py-1 bg-green-300 text-green-800 text-xs font-bold rounded-full">
                          En cours
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-blue-300 text-blue-800 text-xs font-bold rounded-full">
                          Terminé
                        </span>
                      )
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Progression</span>
                        <span className="text-sm font-medium">{unite.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className={`bg-${unite.color}-500 h-4 rounded-full text-xs text-white font-medium text-center leading-4`}
                          style={{ width: `${unite.progress}%` }}
                        >
                          {unite.progress > 15 ? `${unite.progress}%` : ''}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-4">
                      <span className="font-medium">Niveau: </span>
                      <span className={`font-bold text-${unite.color}-600`}>{unite.level}</span>
                    </div>
                    
                    {unite.requiresDiagnostic ? (
                      <Button 
                        variant="secondary" 
                        className="w-full"
                        onClick={() => navigate('/student-diagnostique-test/' + unite.id)}
                      >
                        <TestTube className="mr-2 h-4 w-4" />
                        Passer le test diagnostique
                      </Button>
                    ) : (unite.progress !== 100 ? 
                      (<Button 
                        variant="default" 
                        className="w-full"
                      >
                        <Book className="mr-2 h-4 w-4" />
                        Continuer l'apprentissage
                      </Button>) : 
                      (<Button
                        variant='secondary' 
                        className="w-full"
                      >
                        <Repeat className="mr-2 h-4 w-4" />
                        Revoir les cours
                      </Button>)
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-black text-white py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-white">قسمي</span> <span className="text-yellow-500"> اونلاين</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-300">
                © 2025 Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
