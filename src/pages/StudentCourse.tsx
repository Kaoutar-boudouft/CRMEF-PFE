
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, BookOpen, FileText, Play, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from "@/hooks/use-toast";

interface LessonUnit {
  id: number;
  title: string;
  type: 'video' | 'text' | 'quiz';
  completed: boolean;
  content: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  lessons: LessonUnit[];
  level: string;
}

const StudentCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch course data
    const fetchCourse = () => {
      setLoading(true);
      
      // Simulated data - in a real app, this would come from an API
      const mockCourse: Course = {
        id: Number(courseId),
        title: courseId === '1' ? 'Système informatique' : 
               courseId === '2' ? 'Programmation avec Logo' : 'Traitement de texte',
        description: 'Apprenez les concepts fondamentaux de l\'informatique pour développer vos compétences.',
        progress: 60,
        level: 'Recommandé',
        lessons: [
          {
            id: 1,
            title: 'Introduction aux systèmes informatiques',
            type: 'text',
            completed: true,
            content: `
              <h2>Introduction aux systèmes informatiques</h2>
              <p>Un système informatique est un ensemble de composants électroniques et logiciels qui permettent de traiter l'information.</p>
              <p>Il est composé de :</p>
              <ul>
                <li>Matériel (hardware) : processeur, mémoire, disque dur, etc.</li>
                <li>Logiciel (software) : système d'exploitation, applications, etc.</li>
              </ul>
              <p>Ces éléments travaillent ensemble pour exécuter des programmes et traiter des données.</p>
            `
          },
          {
            id: 2,
            title: 'Composants matériels d\'un ordinateur',
            type: 'video',
            completed: true,
            content: 'https://example.com/video-placeholder'
          },
          {
            id: 3,
            title: 'Les différents systèmes d\'exploitation',
            type: 'text',
            completed: false,
            content: `
              <h2>Les systèmes d'exploitation</h2>
              <p>Le système d'exploitation est le logiciel principal d'un ordinateur qui gère les ressources matérielles et les applications.</p>
              <p>Les principaux systèmes d'exploitation sont :</p>
              <ul>
                <li>Windows : développé par Microsoft</li>
                <li>macOS : développé par Apple</li>
                <li>Linux : système open-source avec de nombreuses distributions</li>
              </ul>
              <p>Chacun offre différentes interfaces et fonctionnalités pour l'utilisateur.</p>
            `
          },
          {
            id: 4,
            title: 'Quiz sur les bases des systèmes informatiques',
            type: 'quiz',
            completed: false,
            content: JSON.stringify({
              questions: [
                {
                  question: "Qu'est-ce qu'un système d'exploitation ?",
                  options: [
                    "Un logiciel de traitement de texte",
                    "Un programme qui gère les ressources matérielles et logicielles de l'ordinateur",
                    "Un composant matériel de l'ordinateur",
                    "Une application de navigation web"
                  ],
                  answer: 1
                },
                {
                  question: "Quel élément n'est PAS un périphérique d'entrée ?",
                  options: [
                    "Clavier",
                    "Souris",
                    "Écran",
                    "Microphone"
                  ],
                  answer: 2
                }
              ]
            })
          }
        ]
      };
      
      setCourse(mockCourse);
      setLoading(false);
    };
    
    fetchCourse();
  }, [courseId]);

  const handleNextLesson = () => {
    if (course && currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const markLessonComplete = () => {
    if (!course) return;
    
    const updatedLessons = [...course.lessons];
    updatedLessons[currentLessonIndex].completed = true;
    
    // Calculate new progress
    const completedCount = updatedLessons.filter(lesson => lesson.completed).length;
    const newProgress = Math.round((completedCount / updatedLessons.length) * 100);
    
    setCourse({
      ...course,
      lessons: updatedLessons,
      progress: newProgress
    });
    
    toast({
      title: "Leçon terminée",
      description: "Progression mise à jour avec succès",
    });
  };

  const returnToDashboard = () => {
    navigate('/student-dashboard');
  };

  const renderLessonContent = (lesson: LessonUnit) => {
    switch (lesson.type) {
      case 'text':
        return (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
        );
      case 'video':
        return (
          <div className="aspect-video bg-gray-200 flex items-center justify-center rounded-md mb-4">
            <Play className="h-16 w-16 text-gray-400" />
            <p className="text-gray-500">Vidéo simulée (dans une vraie application, une vidéo serait diffusée ici)</p>
          </div>
        );
      case 'quiz':
        try {
          const quizData = JSON.parse(lesson.content);
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Quiz</h3>
              {quizData.questions.map((q: any, i: number) => (
                <Card key={i} className="mb-4">
                  <CardContent className="pt-4">
                    <p className="font-medium mb-2">{i + 1}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((option: string, j: number) => (
                        <div 
                          key={j} 
                          className="p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                        >
                          <label className="flex items-start cursor-pointer">
                            <input type="radio" className="mt-1 mr-2" name={`question-${i}`} />
                            <span>{option}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={() => markLessonComplete()}>Soumettre les réponses</Button>
            </div>
          );
        } catch (e) {
          return <p>Erreur lors du chargement du quiz</p>;
        }
      default:
        return <p>Contenu non disponible</p>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Chargement du cours...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-500">Cours non trouvé</p>
          <Button onClick={returnToDashboard} className="mt-4">
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    );
  }

  const currentLesson = course.lessons[currentLessonIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={returnToDashboard}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Button>
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
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Progression du cours</span>
              <span className="text-sm font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md mb-6">
            <div className="flex">
              <Award className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Niveau recommandé:</span> {course.level}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex mb-6">
          <div className="w-1/4 pr-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium text-lg mb-4">Modules du cours</h3>
              <ul className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <li key={lesson.id}>
                    <button 
                      className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm ${
                        index === currentLessonIndex 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setCurrentLessonIndex(index)}
                    >
                      {lesson.completed && <CheckCircle className="h-4 w-4 mr-2 text-green-500" />}
                      {!lesson.completed && (
                        lesson.type === 'text' ? <FileText className="h-4 w-4 mr-2 text-gray-500" /> :
                        lesson.type === 'video' ? <Play className="h-4 w-4 mr-2 text-gray-500" /> :
                        <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="w-3/4">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    {currentLesson.type === 'text' && <FileText className="h-5 w-5 mr-2" />}
                    {currentLesson.type === 'video' && <Play className="h-5 w-5 mr-2" />}
                    {currentLesson.type === 'quiz' && <BookOpen className="h-5 w-5 mr-2" />}
                    {currentLesson.title}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderLessonContent(currentLesson)}
                
                {currentLesson.type !== 'quiz' && (
                  <div className="mt-8">
                    <Button onClick={markLessonComplete} disabled={currentLesson.completed}>
                      {currentLesson.completed ? 'Déjà terminé' : 'Marquer comme terminé'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                onClick={handlePreviousLesson}
                disabled={currentLessonIndex === 0}
              >
                Leçon précédente
              </Button>
              <Button 
                onClick={handleNextLesson}
                disabled={currentLessonIndex === course.lessons.length - 1}
              >
                Leçon suivante
              </Button>
            </div>
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

export default StudentCourse;
