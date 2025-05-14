
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Award, 
  Calendar, 
  Book, 
  Settings,
  Edit,
  Shield,
  Bell,
  LogOut
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: 'El amrani Mohamed',
    email: 'elamrani@qismi.ma',
    class: 'Informatique - 2ème Année',
    joinedDate: 'Septembre 2024',
    level: 'Basique',
    progress: {
      overall: 68,
      coursesCompleted: 2,
      totalCourses: 5,
      streakDays: 4,
      stars: 12,
      hoursStudied: 14.5,
      badges: [
        { name: 'Débutant', icon: '🚀', color: 'bg-blue-100 text-blue-700' },
        { name: '3 Jours', icon: '🔥', color: 'bg-orange-100 text-orange-700' },
      ],
      achievements: [
        { name: 'Premier cours terminé', date: '12 Mai', icon: '📚' },
        { name: 'Quiz parfait', date: '15 Mai', icon: '🏆' },
      ]
    },
    recentActivity: [
      { type: 'course', name: 'La connectivité', date: '2 jours', status: 'completed', icon: '🌐' },
      { type: 'test', name: 'Bases de l\'informatique', date: '3 jours', status: 'passed', icon: '📝' },
      { type: 'course', name: 'Système d\'exploitation', date: '5 jours', status: 'in-progress', icon: '⚙️' },
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/student-dashboard')} 
              className="flex items-center focus:outline-none text-2xl font-bold"
            >
              <span className="text-black">اونلاين</span> <span className="text-yellow-500">قسمي</span>
            </button>
            <img 
              src="/graduation-cap-svg-icon-free-graduation-cap-icon-11553393846gq7rcr1qsx.png" 
              alt="Graduation Cap Icon" 
              className="w-14 h-14 rounded-full shadow-lg border-2 border-yellow-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => console.log('Notifications')}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 text-white">
                2
              </span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage src="" alt={studentData.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{studentData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{studentData.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{studentData.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/student-dashboard')}>
                  <Book className="mr-2 h-4 w-4" />
                  <span>Tableau de bord</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('View progress')}>
                  <Award className="mr-2 h-4 w-4" />
                  <span>Ma progression</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('Settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile header */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <Avatar className="h-24 w-24 border-4 border-blue-500">
                <AvatarImage src="" alt={studentData.name} />
                <AvatarFallback className="bg-blue-500 text-white text-3xl">{studentData.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{studentData.name}</h1>
                  <div className="flex items-center mt-1 text-gray-600">
                    <Mail className="w-4 h-4 mr-1" />
                    <span>{studentData.email}</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    <span>{studentData.class}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                  <div className="flex items-center mb-2">
                    <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                      Niveau: {studentData.level}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    Inscrit depuis: {studentData.joinedDate}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progression globale</span>
                  <span className="text-sm font-medium">{studentData.progress.overall}%</span>
                </div>
                <Progress value={studentData.progress.overall} className="h-2" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="mr-2" onClick={() => console.log('Edit profile')}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier le profil
            </Button>
            <Button variant="outline" onClick={() => console.log('Privacy settings')}>
              <Shield className="mr-2 h-4 w-4" />
              Paramètres de confidentialité
            </Button>
          </div>
        </div>

        {/* Profile content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="md:col-span-1 space-y-6">
            {/* Stats card */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-700">{studentData.progress.coursesCompleted}/{studentData.progress.totalCourses}</div>
                    <div className="text-sm text-blue-600">Cours terminés</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-700">{studentData.progress.streakDays}</div>
                    <div className="text-sm text-purple-600">Jours consécutifs</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-700">{studentData.progress.stars}</div>
                    <div className="text-sm text-green-600">Étoiles gagnées</div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-700">{studentData.progress.hoursStudied}</div>
                    <div className="text-sm text-amber-600">Heures d'étude</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges card */}
            <Card>
              <CardHeader>
                <CardTitle>Badges & Réussites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Badges</h4>
                    <div className="flex flex-wrap gap-2">
                      {studentData.progress.badges.map((badge, index) => (
                        <div 
                          key={index} 
                          className={`${badge.color} px-3 py-2 rounded-full flex items-center`}
                        >
                          <span className="mr-2">{badge.icon}</span>
                          <span className="font-medium">{badge.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Réussites récentes</h4>
                    <div className="space-y-2">
                      {studentData.progress.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center p-2 bg-gray-50 rounded-md">
                          <div className="text-2xl mr-3">{achievement.icon}</div>
                          <div>
                            <div className="font-medium">{achievement.name}</div>
                            <div className="text-xs text-gray-500">{achievement.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="w-full" onClick={() => console.log('View all achievements')}>
                  Voir toutes les réussites
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right column */}
          <div className="md:col-span-2 space-y-6">
            {/* Activity and progress tabs */}
            <Card>
              <CardHeader>
                <Tabs defaultValue="activity" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="activity">Activité Récente</TabsTrigger>
                    <TabsTrigger value="courses">Mes Cours</TabsTrigger>
                  </TabsList>

                  <TabsContent value="activity" className="mt-6">
                    <div className="space-y-4">
                      {studentData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start p-3 bg-white rounded-lg border border-gray-100">
                          <div className="text-3xl mr-3">{activity.icon}</div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{activity.name}</h4>
                                <div className="text-sm text-gray-500">Il y a {activity.date}</div>
                              </div>
                              {activity.status === 'completed' && (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                                  Terminé
                                </Badge>
                              )}
                              {activity.status === 'passed' && (
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
                                  Réussi
                                </Badge>
                              )}
                              {activity.status === 'in-progress' && (
                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">
                                  En cours
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">Voir toute l'activité</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="courses" className="mt-6">
                    <div className="space-y-4">
                      {[
                        { name: 'La connectivité', progress: 100, icon: '🌐', unit: 'Unité 1', color: 'bg-blue-100' },
                        { name: 'Logiciels', progress: 100, icon: '💻', unit: 'Unité 1', color: 'bg-green-100' },
                        { name: 'Notion de système d\'exploitation', progress: 60, icon: '⚙️', unit: 'Unité 1', color: 'bg-purple-100' }
                      ].map((course, index) => (
                        <div key={index} className={`p-4 rounded-md border ${course.color}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{course.icon}</span>
                              <div>
                                <h4 className="font-medium">{course.name}</h4>
                                <div className="text-xs text-gray-600">{course.unit}</div>
                              </div>
                            </div>
                            <div className="text-sm font-bold">
                              {course.progress}%
                            </div>
                          </div>
                          <div className="mt-2">
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button className="w-full" onClick={() => navigate('/student-dashboard')}>
                        Voir tous mes cours
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>

            {/* Calendar card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>Mon Emploi du Temps</span>
                </CardTitle>
                <CardDescription>
                  Prochaines sessions et examens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: 'Test diagnostique', 
                      course: 'Programmation Web', 
                      date: 'Lundi, 20 Mai', 
                      time: '10:30 - 12:00',
                      type: 'test',
                      color: 'border-orange-300 bg-orange-50' 
                    },
                    { 
                      title: 'Cours sur la Sécurité', 
                      course: 'Systèmes et Réseaux', 
                      date: 'Mercredi, 22 Mai', 
                      time: '14:00 - 15:30',
                      type: 'course',
                      color: 'border-blue-300 bg-blue-50' 
                    },
                    { 
                      title: 'Atelier pratique', 
                      course: 'Bases de données', 
                      date: 'Vendredi, 24 Mai', 
                      time: '09:00 - 11:00',
                      type: 'workshop',
                      color: 'border-green-300 bg-green-50' 
                    }
                  ].map((event, index) => (
                    <div key={index} className={`p-4 rounded-md border-l-4 ${event.color}`}>
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="text-sm text-gray-600">{event.course}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{event.date}</div>
                          <div className="text-sm text-gray-600">{event.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Voir l'emploi du temps complet
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
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

export default StudentProfile;
