
import React, { useState, useEffect } from 'react';
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
  LogOut,
  GraduationCap
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
import { fetchStudentById, fetchActivities, fetchBadges, fetchCourses, Student, Activity, BadgeType, Course } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const StudentProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [student, setStudent] = useState<Student | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // In a real app, you would get the student ID from auth context or URL params
        const studentData = await fetchStudentById("1");
        const activitiesData = await fetchActivities();
        const badgesData = await fetchBadges();
        const coursesData = await fetchCourses();
        
        if (studentData) {
          setStudent(studentData);
        }
        setActivities(activitiesData);
        setBadges(badgesData);
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du profil",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  if (loading || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Chargement du profil...</p>
        </div>
      </div>
    );
  }

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage src="" alt={student.nom} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{student.nom.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{student.nom}</p>
                    <p className="text-xs leading-none text-muted-foreground">{student.email}</p>
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
                <AvatarImage src="" alt={student.nom} />
                <AvatarFallback className="bg-blue-500 text-white text-3xl">{student.nom.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{student.nom}</h1>
                  <div className="flex items-center mt-1 text-gray-600">
                    <Mail className="w-4 h-4 mr-1" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    <span>{student.classe}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                  <div className="flex items-center mb-2">
                    <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                      Niveau: {student.niveau_competence}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    Inscrit depuis: {student.dateInscription}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progression globale</span>
                  <span className="text-sm font-medium">{student.progress.global}%</span>
                </div>
                <Progress value={student.progress.global} className="h-2" />
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
           {/* Calendar card */}
           <div className="md:col-span-1 space-y-6">
            {/* Stats card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 w-5" />
                  <span>Mon Emploi du Temps</span>
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Voir l'emploi du temps complet
                </Button>
              </CardFooter>
            </Card> 
           
          </div>
          <div className="md:col-span-1 space-y-6">
            {/* Stats card */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-700">
                      {student.progress.coursesCompleted}/{student.progress.totalCourses}
                    </div>
                    <div className="text-sm text-blue-600">Cours terminés</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-700">{student.progress.stars}</div>
                    <div className="text-sm text-green-600">Étoiles gagnées</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Badges card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Badges & Réussites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Badges</h4>
                    <div className="flex flex-wrap gap-2">
                      {badges.slice(0, 3).map((badge) => (
                        <div 
                          key={badge.id} 
                          className={`${badge.color} px-3 py-2 rounded-full flex items-center`}
                        >
                          <span className="mr-2">{badge.icon}</span>
                          <span className="font-medium">{badge.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
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
