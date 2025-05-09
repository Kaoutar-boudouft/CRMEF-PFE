
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Book, FileCheck, TestTube, Medal, User, Repeat } from 'lucide-react';
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

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('El amrani Mohamed'); // Example student name, could be fetched from API/context
  
  const unites = [
    {
      id: 'unite1',
      title: 'Unité 1 : 1ère semestre',
      progress: 78,
      level: 'Recommandé',
      requiresDiagnostic: false,
    },
    {
      id: 'unite2',
      title: 'Unité 2 : 1ère semestre',
      progress: 0,
      level: 'Non déterminé',
      requiresDiagnostic: true,
    },
    // {
    //   id: 'unite3',
    //   title: 'Unité 3 : 1ère semestre',
    //   progress: 0,
    //   level: 'Non déterminé',
    //   requiresDiagnostic: true,
    // }
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
    },
    {
      id: 'cours2',
      title: 'Logiciels',
      unite: "Unité 1",
      sequence: 'Système informatique',
      progress: 100,
      level: 'Recommandé',
    },
    {
      id: "cours3",
      title: 'Notion de système d\'exploitation',
      unite: "Unité 1",
      sequence: 'Système d’exploitation',
      progress: 60,
      level: 'Basique',
    }
  ];

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
                <DropdownMenuItem onClick={() => console.log('Profile settings')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Bienvenue, {studentName}</h1>
          <p className="text-gray-600">Suivez votre progression et accédez à vos unités d'apprentissage</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Medal className="mr-2 h-5 w-5" /> Niveau global: Basique
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progression totale</span>
              <span className="text-sm font-medium">25%</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Book className="mr-2 h-5 w-5" /> Mes cours d'apprentissage
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((cours) => (
              <Card key={cours.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">{cours.title}</h3>
                    {cours.progress != 100 ? (
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                        Cours de jour
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                        Terminé
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Unité</span>
                      <span className="text-sm font-medium">{cours.unite}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Séquence</span>
                      <span className="text-sm font-medium">{cours.sequence}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Progression</span>
                      <span className="text-sm font-medium">{cours.progress}%</span>
                    </div>
                    <Progress value={cours.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-sm mb-4">
                    <span>Niveau: {cours.level}</span>
                  </div>
                  
                  {cours.progress != 100 ? (
                    <Button 
                       variant="default" 
                      className="w-full"
                      onClick={() => navigate('/student-course/' + cours.id)}
                    >
                      <TestTube className="mr-2 h-4 w-4" />
                      Continuer l'apprentissage
                    </Button>
                  ) : (<Button
                    variant='secondary' 
                      className="w-full btn-secondary"
                    >
                      <Repeat className="mr-2 h-4 w-4" />
                      Reconsulter le cours
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Book className="mr-2 h-5 w-5" /> Mes unités d'apprentissage
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {unites.map((unite) => (
              <Card key={unite.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">{unite.title}</h3>
                    {unite.requiresDiagnostic ? (
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                        Test requis
                      </span>
                    ) : (
                      unite.progress!==100 ? (<span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      En cours
                    </span>) : (<span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                        Terminé
                      </span>)
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Progression</span>
                      <span className="text-sm font-medium">{unite.progress}%</span>
                    </div>
                    <Progress value={unite.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-sm mb-4">
                    <span>Niveau: {unite.level}</span>
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
                  ) : (unite.progress!==100 ? 
(                    <Button 
                      variant="default" 
                      className="w-full"
                    >
                      <Book className="mr-2 h-4 w-4" />
                      Continuer l'apprentissage
                    </Button>) : (<Button
                    variant='secondary' 
                      className="w-full btn-secondary"
                    >
                      <Repeat className="mr-2 h-4 w-4" />
                      Reconsulter les cours
                    </Button>)
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileCheck className="mr-2 h-5 w-5" /> Activités récentes
          </h2>
          <Card>
            <div className="p-4 divide-y divide-gray-100">
              {[
                { date: "Il y a 2 jours", action: "Test diagnostique complété", course: "Traitement de texte" },
                { date: "Il y a 4 jours", action: "Inscription", course: "Plateforme" }
              ].map((activity, i) => (
                <div key={i} className="py-3 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <FileCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.course}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      <footer className="bg-black text-white py-6">
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
