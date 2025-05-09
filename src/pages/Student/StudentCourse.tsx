import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, BookOpen, FileText, Play, Award, Layers } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LessonUnit {
  id: number;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'image';
  completed: boolean;
  content: string;
  lien?: string; // Optional property for image lessons
}

interface CourseContent {
  level: string;
  lessons: LessonUnit[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  content: CourseContent[];
}

const StudentCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLevelOptions, setShowLevelOptions] = useState(false);
  
  // Get the level from URL query parameters if available
  const queryParams = new URLSearchParams(location.search);
  const levelFromUrl = queryParams.get('level') || 'Basique';
  const [currentLevel, setCurrentLevel] = useState(levelFromUrl);
  
  // Get the current content based on selected level
  const currentContent = course?.content.find(content => content.level === currentLevel);
  
  // Check if all modules for the current level are completed
  const areAllModulesCompleted = currentContent?.lessons.every(lesson => lesson.completed) || false;

  useEffect(() => {
    // Mock API call to fetch course data
    const fetchCourse = () => {
      setLoading(true);
      
      // Simulated data - in a real app, this would come from an API
      const mockCourse: Course = {
        id: Number(courseId),
        title: 'Notion de système d\'exploitation',
        description: "Permettre à l'élève de comprendre ce qu'est un système d'exploitation, son rôle et ses principaux types, à travers des contenus adaptés à son niveau.",
        progress: 60,
        content: [
          {
            level: "Basique",
            lessons: [
              {
                id: 1,
                title: 'Introduction',
                type: 'text',
                completed: true,
                content: `
                  <h2 class="font-bold">Définition simple :</h2>
                  <p>Le système d’exploitation est un logiciel de base qui fait fonctionner l’ordinateur.</p>
                  <p class="font-bold mt-2">Exemple imagé :</p>
                  <ul>
                    <li>Il est comme un chef d’orchestre qui fait marcher les logiciel d'applications comme (jeux, Word, etc.) et le matériel comme (clavier, Souris, Unité centrale).</li>
                  </ul>
                `
              },
              {
                id: 2,
                title: 'Exemples',
                type: 'image',
                completed: true,
                content: "<p class=' mb-4'>Il existe plusieurs types de système d'exploitation par exemple on a :</p>",
                lien: '/sistema-operativo-5.jpg'
              },
              {
                id: 3,
                title: 'Vidéo explicative',
                type: 'video',
                completed: false,
                content: ``,
                lien:"https://www.youtube.com/embed/AcZ87MTiXr4?si=zN_JkDXI-4MKxNX4"
              },
              {
                id: 4,
                title: 'Quiz',
                type: 'quiz',
                completed: false,
                content: JSON.stringify({
                  questions: [
                    {
                      question: "Qu'est-ce qu'un système d'exploitation ?",
                      options: [
                        "Un jeu installé sur l'ordinateur",
                        "Un logiciel de base qui permet de gérer l’ordinateur",
                        "Une page internet",
                        "Une imprimante"
                      ],
                      answer: 1
                    },
                    {
                      question: "Lequel de ces exemples est un système d'exploitation ?",
                      options: [
                        "Google Chrome",
                        "Instagram",
                        "Windows",
                        "Clavier"
                      ],
                      answer: 2
                    },
                  ]
                })
              }
            ]
          },
          {
            level: "Recommandé",
            lessons: [
              {
                id: 1,
                title: 'Introduction',
                type: 'text',
                completed: false,
                content: `
                  <h2 class="font-bold">Définition :</h2>
                  <p>Le système d’exploitation est un logiciel qui permet de gérer les composants de l’ordinateur (écran, clavier, fichiers, etc.) et d’exécuter d’autres logiciels.</p>
                  <p class="font-bold mt-2">Fonctions principales :</p>
                  <ul>
                    <li>Gérer le matériel (clavier, écran, souris…).</li>
                    <li>Lancer et fermer les programmes.</li>
                    <li>Organiser les fichiers et dossiers.</li>
                  </ul>
                  <p class="font-bold mt-2">Les systèmes d’exploitations ne sont pas que sur les ordinateurs :</p>
                  <ul>
                      <li>PC : Windows, macOS, Linux.</li>
                      <li>Téléphones : Android, iOS.</li>
                      <li>Tablettes / Smart TV / Montres connectées.</li>
                    </ul>
                  `
              },
              {
                id: 2,
                title: 'Exemples',
                type: 'image',
                completed: true,
                content: "<p class=' mb-4'>Il existe plusieurs types de système d'exploitation par exemple on a :</p>",
                lien: '/ser.png'
              },
              {
                id: 3,
                title: 'Vidéo explicative',
                type: 'video',
                completed: false,
                content: ``,
                lien:"https://www.youtube.com/embed/lqVvAnxEkag?si=k_T4SJnVWVjrDndF"
              },
              {
                id: 4,
                title: 'Quiz',
                type: 'quiz',
                completed: false,
                content: JSON.stringify({
                  questions: [
                    {
                      question: "Parmi ces appareils, lequel a besoin d’un système d’exploitation pour fonctionner ?",
                      options: [
                        "Un ordinateur seulement",
                        "Un téléphone portable seulement",
                        "Une tablette seulement",
                        "Tous les appareils numériques (ordinateur, tablette, téléphone)"
                      ],
                      answer: 3
                    },
                    {
                      question: "Quel est le rôle d’un système d’exploitation ?",
                      options: [
                        "Gérer le matériel et permettre l’utilisation des applications",
                        "Regarder des vidéos sur YouTube",
                        "Jouer uniquement à des jeux",
                        "Éteindre l’appareil automatiquement"
                      ],
                      answer: 0
                    }
                  ]
                })
              }
            ]
          },
          {
            level: "Avancé",
            lessons: [
              {
                id: 1,
                title: 'Introduction',
                type: 'text',
                completed: false,
                content: `
                  <h2 class="font-bold">Définition :</h2>
                  <p>Un système d’exploitation est un programme spécial qui :
                  <br>
                  <ul>
                  <li>Fait fonctionner l’ordinateur.
                  <li>Aide tous les autres programmes à bien marcher.
                  <li>Organise l’utilisation des ressources (mémoire, processeur, fichiers…).</p>
                  </ul>
                  <p class="font-bold mt-2">Les fonctions avancées du système d’exploitation :</p>
                  <ul>
                    <li><h5 class="font-bold mt-2">a. Gestion des tâches (Multitâche)</h5>
                    Le SE peut faire tourner plusieurs programmes en même temps.
                    <br />
                    Exemple : Écouter de la musique tout en écrivant un document.
                    </li>
                    <li><h5 class="font-bold mt-2">b. Gestion des utilisateurs</h5>
                    Le SE peut créer plusieurs comptes :

                    Un compte pour chaque utilisateur.
                    <br />
                    Chacun a ses propres fichiers et droits d’accès.
                    </li>
                  </ul>
                  `
              },
              {
                id: 2,
                title: 'Explication',
                type: 'image',
                completed: false,
                content: '',
                lien:"/fonctionnement_OS.png"
              },
              {
                id: 3,
                title: 'Vidéo explicative',
                type: 'video',
                completed: false,
                content: ``,
                lien:"https://www.youtube.com/embed/YScMI8lsy9s?si=CAek_y4-_2I31xBY"
              },
              {
                id: 4,
                title: 'Quiz',
                type: 'quiz',
                completed: false,
                content: JSON.stringify({
                  questions: [
                    {
                      question: "Que permet la fonction multitâche d’un système d’exploitation ?",
                      options: [
                        "Exécuter un seul programme à la fois",
                        "Exécuter plusieurs programmes simultanément",
                        "Redémarrer l’ordinateur automatiquement",
                        "Créer de nouveaux utilisateurs"
                      ],
                      answer: 1
                    },
                    {
                      question: "Un exemple d'utilisation du multitâche dans un système d’exploitation est :",
                      options: [
                        "Regarder un film sans utiliser d'autres applications",
                        "Écouter de la musique tout en écrivant un document",
                        "Installer un jeu vidéo",
                        "Imprimer un document sans ouvrir d’autre programme"
                      ],
                      answer: 1
                    },
                    {
                      question: "Que permet la gestion des utilisateurs dans un système d’exploitation ?",
                      options: [
                        "Partager un seul compte pour tous les utilisateurs",
                        "Ouvrir plusieurs sessions utilisateur sur le même compte",
                        "Créer un compte pour chaque utilisateur avec des fichiers et des droits d’accès distincts",
                        "Désactiver les comptes d’utilisateurs"
                      ],
                      answer: 2
                    }
                  ]
                })
              }
            ]
          }
        ]
      };
      
      setCourse(mockCourse);
      setCurrentLevel(levelFromUrl);
      setLoading(false);
    };
    
    fetchCourse();
  }, [courseId, levelFromUrl]); // Add levelFromUrl as dependency to reload when it changes

  const handleNextLesson = () => {
    if (currentContent && currentLessonIndex < currentContent.lessons.length - 1) {
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
    if (!course || !currentContent) return;
    
    // Create a deep copy of the course object to modify it
    const updatedCourse = { ...course };
    
    // Find the content array for the current level
    const contentIndex = updatedCourse.content.findIndex(
      content => content.level === currentLevel
    );
    
    if (contentIndex === -1) return;
    
    // Update the completed status of the current lesson
    updatedCourse.content[contentIndex].lessons[currentLessonIndex].completed = true;
    
    // Calculate new progress
    const currentLevelLessons = updatedCourse.content[contentIndex].lessons;
    const completedCount = currentLevelLessons.filter(lesson => lesson.completed).length;
    const newProgress = Math.round((completedCount / currentLevelLessons.length) * 100);
    
    // Update progress
    updatedCourse.progress = newProgress;
    
    setCourse(updatedCourse);
    
    toast({
      title: "Leçon terminée",
      description: "Progression mise à jour avec succès",
    });
  };

  const returnToDashboard = () => {
    navigate('/student-dashboard');
  };
  
  const finishCourse = () => {
    if (currentLevel === 'Avancé') {
      // If already at advanced level, simply finish the course
      toast({
        title: "Cours terminé",
        description: "Félicitations! Vous avez terminé ce cours au niveau avancé.",
      });
      navigate('/student-dashboard');
    } else {
      // Show level selection options
      setShowLevelOptions(true);
    }
  };
  
  const selectNextLevel = (nextLevel: string) => {
    toast({
      title: "Niveau sélectionné",
      description: `Vous allez continuer avec le niveau ${nextLevel}`,
    });
    
    // Directly navigate to the same course with the selected level as a URL parameter
    navigate(`/student-course/${courseId}?level=${nextLevel}`);
    setShowLevelOptions(false);
  };

  const switchLevel = (level: string) => {
    // Don't switch if the level is not allowed
    if (!isLevelAllowed(level)) {
      toast({
        title: "Niveau non disponible",
        description: `Vous devez d'abord terminer le niveau ${currentLevel} pour accéder au niveau ${level}`,
      });
      return;
    }
    
    if (level !== currentLevel) {
      toast({
        title: "Changement de niveau",
        description: `Vous passez au niveau ${level}`,
      });
      
      // Update current level and reset lesson index
      setCurrentLevel(level);
      setCurrentLessonIndex(0);
      navigate(`/student-course/${courseId}?level=${level}`);
    }
  };

  const renderLessonContent = (lesson: LessonUnit) => {
    switch (lesson.type) {
      case 'text':
      return (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content.replace('${courseLevel}', currentLevel) }} />
      );
      case 'video':
      return (
        <div className="flex flex-col items-center">
          {lesson.lien ? (
        <iframe
          src={lesson.lien}
          title={lesson.title}
          className="w-full aspect-video rounded-md shadow-md mb-4"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
          ) : (
        <div className="aspect-video bg-gray-200 flex items-center justify-center rounded-md mb-4">
          <Play className="h-16 w-16 text-gray-400" />
          <p className="text-gray-500">Vidéo non disponible</p>
        </div>
          )}
          {lesson.content && (
        <div className="prose max-w-none mt-4" dangerouslySetInnerHTML={{ __html: lesson.content }} />
          )}
        </div>
      );
      case 'image':
      return (
        <div className="flex flex-col ">
          {lesson.content && (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
          )}
          {lesson.lien && (
        <img src={lesson.lien} alt={lesson.title} className="rounded-md shadow-md max-w-full mb-4" />
          )}
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

  // Function to check if a level is allowed based on current level completion
  const isLevelAllowed = (targetLevel: string) => {
    // Always allow moving to lower levels
    if (targetLevel === 'Basique') return true;
    
    // For Recommandé level, only allow if current level is Basique and all modules are completed
    // or if current level is already Recommandé or Avancé
    if (targetLevel === 'Recommandé') {
      if (currentLevel === 'Basique') {
        return areAllModulesCompleted;
      }
      return currentLevel === 'Recommandé' || currentLevel === 'Avancé';
    }
    
    // For Avancé level, only allow if current level is Recommandé and all modules are completed
    // or if current level is already Avancé
    if (targetLevel === 'Avancé') {
      if (currentLevel === 'Recommandé') {
        return areAllModulesCompleted;
      }
      return currentLevel === 'Avancé';
    }
    
    return false;
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

  if (!course || !currentContent) {
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

  const currentLesson = currentContent.lessons[currentLessonIndex];

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
        {showLevelOptions ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Choisir votre prochain niveau</h2>
            <p className="text-center mb-8 text-gray-600">
              Vous avez terminé ce cours au niveau {currentLevel}. Souhaitez-vous continuer à progresser?
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card className={`hover:shadow-md transition-shadow ${currentLevel === 'Basique' ? 'border-green-500 border-2' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-blue-500" />
                    Niveau Basique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Cours adaptés aux débutants avec concepts fondamentaux.</p>
                  <Button 
                    variant={currentLevel === 'Basique' ? 'outline' : 'default'}
                    className="w-full"
                    disabled={currentLevel === 'Basique'}
                    onClick={() => selectNextLevel('Basique')}
                  >
                    {currentLevel === 'Basique' ? 'Niveau actuel' : 'Choisir'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className={`hover:shadow-md transition-shadow ${currentLevel === 'Recommandé' ? 'border-green-500 border-2' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-yellow-500" />
                    Niveau Recommandé
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Cours avec difficulté intermédiaire pour une progression équilibrée.</p>
                  <Button 
                    variant={currentLevel === 'Recommandé' ? 'outline' : 'default'}
                    className="w-full"
                    disabled={currentLevel === 'Recommandé'}
                    onClick={() => selectNextLevel('Recommandé')}
                  >
                    {currentLevel === 'Recommandé' ? 'Niveau actuel' : 'Choisir'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className={`hover:shadow-md transition-shadow ${currentLevel === 'Avancé' ? 'border-green-500 border-2' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-red-500" />
                    Niveau Avancé
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Cours avec concepts avancés et exercices plus complexes.</p>
                  <Button 
                    variant={currentLevel === 'Avancé' ? 'outline' : 'default'}
                    className="w-full"
                    disabled={currentLevel === 'Avancé'}
                    onClick={() => selectNextLevel('Avancé')}
                  >
                    {currentLevel === 'Avancé' ? 'Niveau actuel' : 'Choisir'}
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="ghost" onClick={() => navigate('/student-dashboard')}>
                Retour au tableau de bord
              </Button>
            </div>
          </div>
        ) : (
          <>
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
              
              {/* Level Selector Tabs */}
              <div className="mb-6">
                <Tabs defaultValue={currentLevel} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-2">
                    <TabsTrigger 
                      value="Basique" 
                      onClick={() => switchLevel("Basique")}
                    >
                      <Layers className="h-4 w-4 mr-1 text-blue-500" />
                      Basique
                    </TabsTrigger>
                    <TabsTrigger 
                      value="Recommandé" 
                      onClick={() => switchLevel("Recommandé")}
                      disabled={!isLevelAllowed('Recommandé')}
                    >
                      <Layers className="h-4 w-4 mr-1 text-yellow-500" />
                      Recommandé
                      {!isLevelAllowed('Recommandé') && currentLevel === 'Basique' && (
                        <span className="ml-1 text-xs">🔒</span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="Avancé" 
                      onClick={() => switchLevel("Avancé")}
                      disabled={!isLevelAllowed('Avancé')}
                    >
                      <Layers className="h-4 w-4 mr-1 text-red-500" />
                      Avancé
                      {!isLevelAllowed('Avancé') && currentLevel !== 'Avancé' && (
                        <span className="ml-1 text-xs">🔒</span>
                      )}
                    </TabsTrigger>
                  </TabsList>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-blue-500 mr-2" />
                        <p className="text-sm text-blue-700">
                          <span className="font-semibold">Niveau actuel:</span> {currentLevel}
                        </p>
                      </div>
                      {!areAllModulesCompleted && currentLevel !== 'Avancé' && (
                        <p className="text-xs text-blue-600 mt-1 ml-7">
                          Terminez tous les modules pour débloquer le niveau suivant
                        </p>
                      )}
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
            
            <div className="flex mb-6">
              <div className="w-1/4 pr-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-medium text-lg mb-4">Modules du cours</h3>
                  <ul className="space-y-2">
                    {currentContent.lessons.map((lesson, index) => (
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
                  
                  {/* Finish Course Button - disabled until all modules are completed */}
                  <div className="mt-6">
                    <Button 
                      onClick={finishCourse} 
                      variant="secondary" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      disabled={!areAllModulesCompleted}
                    >
                      {currentLevel === 'Avancé' ? 'Terminer le cours' : 'Terminer et choisir niveau'}
                    </Button>
                    {!areAllModulesCompleted && (
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Terminez tous les modules pour continuer
                      </p>
                    )}
                  </div>
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
                    disabled={currentLessonIndex === currentContent.lessons.length - 1}
                  >
                    Leçon suivante
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
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
