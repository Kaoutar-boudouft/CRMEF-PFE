
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Progress } from '@/components/ui/progress';

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const StudentDiagnosticTest = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState('');

  // Example test questions based on course ID
  const getQuestions = (): Question[] => {
    // Using the same questions as in GenerateTestDiagnostique.tsx
    return [
      {
        question: "Parmi les propositions suivantes, laquelle définit le mieux le mot information ?",
        options: [
          "Un logiciel informatique",
          "Une donnée traitée et compréhensible",
          "Un périphérique de sortie",
          "Un fichier vide"
        ],
        answer: 1
      },
      {
        question: "Quelle est la différence principale entre donnée et information ?",
        options: [
          "La donnée est une information codée",
          "La donnée est toujours correcte",
          "L'information est brute et inutilisable",
          "Il n'y a aucune différence"
        ],
        answer: 0
      },
      {
        question: "Un système informatique est constitué de :",
        options: [
          "Uniquement d'un ordinateur",
          "De composants matériels et logiciels qui traitent l'information",
          "De câbles et d'électricité",
          "D'applications de messagerie"
        ],
        answer: 1
      },
      {
        question: "Le rôle d'une carte réseau est :",
        options: [
          "D'enregistrer les données",
          "D'envoyer et recevoir des données sur un réseau",
          "D'afficher les images à l'écran",
          "D'améliorer la vitesse du processeur"
        ],
        answer: 1
      },
      {
        question: "Lequel des éléments suivants est un périphérique de communication ?",
        options: [
          "Clavier",
          "Écran",
          "Modem",
          "Souris"
        ],
        answer: 2
      },
      {
        question: "Parmi ces types de connexions, lequel utilise un câble ?",
        options: [
          "Wi-Fi",
          "Bluetooth",
          "Ethernet",
          "Infrarouge"
        ],
        answer: 2
      },
      {
        question: "Un logiciel sert à :",
        options: [
          "Alimenter électriquement l'ordinateur",
          "Faire fonctionner le matériel informatique",
          "Ajouter plus de mémoire vive",
          "Créer des fichiers matériels"
        ],
        answer: 1
      },
      {
        question: "Parmi ces logiciels, lequel est un système d'exploitation ?",
        options: [
          "Windows",
          "Word",
          "Google Chrome",
          "VLC Media Player"
        ],
        answer: 0
      },
      {
        question: "Un logiciel applicatif permet de :",
        options: [
          "Gérer le matériel de l'ordinateur",
          "Modifier des paramètres du BIOS",
          "Réaliser des tâches spécifiques (ex : écrire un texte)",
          "Démarrer l'ordinateur"
        ],
        answer: 2
      },
      {
        question: "Quel logiciel utiliseriez-vous pour naviguer sur Internet ?",
        options: [
          "WordPad",
          "Paint",
          "Google Chrome",
          "Excel"
        ],
        answer: 2
      }
    ];
  };

  const questions = getQuestions();

  useEffect(() => {
    setAnswers(Array(questions.length).fill(-1));
  }, [questions]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === -1) {
      toast({
        variant: "destructive",
        title: "Veuillez sélectionner une réponse",
        description: "Vous devez répondre à la question avant de continuer.",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeTest = () => {
    // Calculate score
    const correctAnswers = answers.reduce((sum, answer, index) => {
      return answer === questions[index].answer ? sum + 1 : sum;
    }, 0);
    
    const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
    setScore(scorePercentage);
    
    // Determine level
    let studentLevel = '';
    if (scorePercentage <= 40) {
      studentLevel = 'Basique';
    } else if (scorePercentage <= 70) {
      studentLevel = 'Recommandé';
    } else {
      studentLevel = 'Avancé';
    }
    setLevel(studentLevel);
    
    setIsCompleted(true);
    
    toast({
      title: "Test terminé",
      description: `Votre niveau est: ${studentLevel}`,
    });
  };

  const returnToDashboard = () => {
    navigate('/student-dashboard');
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

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

      <main className="max-w-3xl mx-auto p-4 space-y-6">
        {!isCompleted ? (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold">Test Diagnostique – Système informatique</h1>
              <p className="text-gray-600 mt-2">
                Ce test va déterminer votre niveau de connaissance dans cette unité.
                Répondez aux questions suivantes au meilleur de vos connaissances.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Question {currentQuestion + 1} sur {questions.length}</span>
                  <span className="text-sm">{getProgressPercentage()}%</span>
                </div>
                <Progress value={getProgressPercentage()} className="h-2" />
              </div>
              
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h2 className="text-lg font-medium mb-4">
                    {questions[currentQuestion].question}
                  </h2>
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div 
                        key={index}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          answers[currentQuestion] === index 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => handleAnswer(index)}
                      >
                        <label className="flex items-start cursor-pointer">
                          <input 
                            type="radio"
                            className="mt-1"
                            checked={answers[currentQuestion] === index}
                            onChange={() => handleAnswer(index)}
                          />
                          <span className="ml-2">{option}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Précédent
                </Button>
                <Button onClick={handleNext}>
                  {currentQuestion < questions.length - 1 ? 'Suivant' : 'Terminer'}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="mb-8">
              <div className="bg-green-100 text-green-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold">Test Diagnostique Terminé</h2>
              <p className="mt-2 text-gray-600">
                Merci d'avoir complété le test diagnostique. Voici vos résultats.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="mb-4">
                <p className="text-xl font-medium">Votre score:</p>
                <p className="text-3xl font-bold">{score}%</p>
              </div>
              
              <div className="mb-4">
                <p className="text-xl font-medium">Votre niveau:</p>
                <p className="text-3xl font-bold text-blue-600">{level}</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg text-left">
                <p className="font-medium">Que signifie ce niveau?</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  <li><strong>Basique:</strong> Vous avez besoin de travailler sur les concepts fondamentaux.</li>
                  <li><strong>Recommandé:</strong> Vous avez une bonne compréhension des bases, mais pouvez vous améliorer.</li>
                  <li><strong>Avancé:</strong> Vous maîtrisez bien le sujet, prêt pour des concepts avancés.</li>
                </ul>
              </div>
            </div>
            
            <Button onClick={returnToDashboard}>
              Retourner au tableau de bord
            </Button>
          </div>
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

export default StudentDiagnosticTest;
