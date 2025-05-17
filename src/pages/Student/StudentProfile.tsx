
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

const StudentProfile = () => {
  // Mock student data
  const student = {
    id: "STU123456",
    name: "Thomas Dupont",
    email: "thomas.dupont@example.com",
    enrollmentDate: "2023-09-01",
    avatar: "https://avatars.githubusercontent.com/u/12345?v=4",
    progress: 75,
    totalCourses: 8,
    completedCourses: 6,
    currentLevel: "Intermédiaire",
    achievements: [
      { id: 1, title: "Premier pas", description: "Compléter votre premier cours", date: "2023-09-15" },
      { id: 2, title: "Perfectionniste", description: "Obtenir une note de 100% sur un test", date: "2023-10-05" },
      { id: 3, title: "Assidu", description: "Se connecter 5 jours consécutifs", date: "2023-11-20" }
    ],
    recentActivities: [
      { id: 1, type: "Cours", title: "Systèmes d'exploitation", date: "2023-12-01", status: "En cours" },
      { id: 2, type: "Test", title: "Diagnostic sur les réseaux", date: "2023-11-28", status: "Complété" },
      { id: 3, type: "Cours", title: "Introduction à la cybersécurité", date: "2023-11-25", status: "En cours" }
    ],
    statistics: {
      averageScore: 85,
      timeSpent: "45h 30m",
      lastLogin: "2023-12-02",
      sessionCount: 38
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Profil d'Apprenant</h1>
        <Button>Modifier le profil</Button>
      </div>
      
      {/* Profile Overview */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle>Informations Générales</CardTitle>
          <CardDescription>Vos informations personnelles et votre progression</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src={student.avatar} 
                  alt={student.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
            </div>
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{student.name}</h3>
                  <p className="text-gray-500">{student.email}</p>
                  <p className="text-gray-500">ID: {student.id}</p>
                  <p className="text-gray-500">Inscrit depuis: {new Date(student.enrollmentDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Progression globale</span>
                      <span className="text-sm font-medium">{student.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{student.completedCourses}</p>
                      <p className="text-gray-500">Cours complétés</p>
                    </div>
                    <div>
                      <p className="font-medium">{student.totalCourses}</p>
                      <p className="text-gray-500">Total des cours</p>
                    </div>
                    <div>
                      <p className="font-medium">{student.currentLevel}</p>
                      <p className="text-gray-500">Niveau</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Activités Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {student.recentActivities.map(activity => (
                <li key={activity.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-gray-500 text-sm">{activity.type}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        activity.status === "Complété" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {activity.status}
                      </span>
                      <p className="text-gray-500 text-xs mt-1">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Récompenses & Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {student.achievements.map(achievement => (
                <li key={achievement.id} className="flex items-start gap-3 border-b pb-4 last:border-b-0">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Book className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-gray-500 text-sm">{achievement.description}</p>
                    <p className="text-gray-400 text-xs">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Statistics */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Statistiques d'Apprentissage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Note Moyenne</p>
              <p className="text-2xl font-semibold">{student.statistics.averageScore}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Temps Total</p>
              <p className="text-2xl font-semibold">{student.statistics.timeSpent}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Dernière Connexion</p>
              <p className="text-2xl font-semibold">{new Date(student.statistics.lastLogin).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Sessions</p>
              <p className="text-2xl font-semibold">{student.statistics.sessionCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
