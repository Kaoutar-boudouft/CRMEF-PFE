
// requette donner a l'IA : 
// Génère-moi un test diagnostique composé de 10 questions à choix multiples pour des collégiens en informatique. Les questions doivent porter sur les notions suivantes :
// - Notion d'information et de donnée
// - Composants d’un système informatique (matériel et logiciel)
// - Logiciels : système d’exploitation et logiciels applicatifs
// - Connexions et périphériques (modem, carte réseau, Ethernet, etc.)
// - Navigateur et navigation Internet

// Chaque question doit avoir 4 options. Une seule réponse est correcte. Donne-moi la réponse correcte sous forme d’index (0 à 3).

// Retourne uniquement un tableau JSON au format suivant, sans commentaire, sans texte avant ou après :

// [
//   {
//     "question": "Texte de la question",
//     "options": ["Option A", "Option B", "Option C", "Option D"],
//     "answer": 1
//   },
//   ...
// ]

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const defaultQuestions: Question[] = [
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
      "Il n’y a aucune différence"
    ],
    answer: 0
  },
  {
    question: "Un système informatique est constitué de :",
    options: [
      "Uniquement d’un ordinateur",
      "De composants matériels et logiciels qui traitent l'information",
      "De câbles et d'électricité",
      "D’applications de messagerie"
    ],
    answer: 1
  },
  {
    question: "Le rôle d’une carte réseau est :",
    options: [
      "D’enregistrer les données",
      "D’envoyer et recevoir des données sur un réseau",
      "D’afficher les images à l’écran",
      "D’améliorer la vitesse du processeur"
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
      "Alimenter électriquement l’ordinateur",
      "Faire fonctionner le matériel informatique",
      "Ajouter plus de mémoire vive",
      "Créer des fichiers matériels"
    ],
    answer: 1
  },
  {
    question: "Parmi ces logiciels, lequel est un système d’exploitation ?",
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
      "Gérer le matériel de l’ordinateur",
      "Modifier des paramètres du BIOS",
      "Réaliser des tâches spécifiques (ex : écrire un texte)",
      "Démarrer l’ordinateur"
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

export default function ConsultDiagnosticTest() {
  const [questions, setQuestions] = useState<Question[]>([...defaultQuestions]);
  const [answers, setAnswers] = useState<number[]>(Array(defaultQuestions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
//   const [fullName, setFullName] = useState("");
  // const [editMode, setEditMode] = useState(false);

  const handleOptionChange = (qIndex: number, oIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = oIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => answer === questions[index].answer ? score + 1 : score, 0);
  };

  const getLevel = (score: number) => {
    if (score <= 4) return "Basique";
    if (score <= 7) return "Recommandé";
    return "Avancé";
  };

  const handleSubmit = () => {
    // if (!fullName.trim()) {
    //   alert("Veuillez entrer votre nom complet.");
    //   return;
    // }
    setSubmitted(true);
  };

  const handleRestart = () => {
    setAnswers(Array(questions.length).fill(-1));
    setSubmitted(false);
    // setFullName("");
  };

  // const handleQuestionChange = (index: number, field: "question" | "answer", value: string | number) => {
  //   const updated = [...questions];
  //   if (field === "question") updated[index].question = value as string;
  //   else updated[index].answer = Number(value);
  //   setQuestions(updated);
  // };

  // const handleOptionTextChange = (qIndex: number, oIndex: number, value: string) => {
  //   const updated = [...questions];
  //   updated[qIndex].options[oIndex] = value;
  //   setQuestions(updated);
  // };

  // const deleteQuestion = (index: number) => {
  //   const updated = [...questions];
  //   updated.splice(index, 1);
  //   const updatedAnswers = [...answers];
  //   updatedAnswers.splice(index, 1);
  //   setQuestions(updated);
  //   setAnswers(updatedAnswers);
  // };

  // const addQuestion = () => {
  //   setQuestions([
  //     ...questions,
  //     {
  //       question: "Nouvelle question",
  //       options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  //       answer: 0
  //     }
  //   ]);
  //   setAnswers([...answers, -1]);
  // };

  // const addOptionToQuestion = (qIndex: number) => {
  //   const updated = [...questions];
  //   updated[qIndex].options.push("Nouvelle option");
  //   setQuestions(updated);
  // };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Test Diagnostique – Système informatique</h1>

      {/* <div>
        <label className="block mb-2">Nom complet :</label>
        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Entrez votre nom complet" />
      </div> */}

      {/* <div className="text-right">
        <Button variant="outline" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Quitter le mode édition" : "Modifier les questions"}
        </Button>
      </div> */}

      {questions.map((q, qIndex) => (
        <Card key={qIndex} className="relative">
          <CardContent className="p-4 space-y-2">
            {/* {editMode ? (
              <div>
                <Textarea
                  className="mb-2"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
                />
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="flex gap-2 mb-1">
                    <Input
                      value={opt}
                      onChange={(e) => handleOptionTextChange(qIndex, oIndex, e.target.value)}
                      className="flex-1"
                    />
                    <input
                      type="radio"
                      name={`edit-answer-${qIndex}`}
                      checked={q.answer === oIndex}
                      onChange={() => handleQuestionChange(qIndex, "answer", oIndex)}
                    />
                    <label>Correct</label>
                  </div>
                ))}
                <Button variant="secondary" size="sm" onClick={() => addOptionToQuestion(qIndex)}>
                  Ajouter une option
                </Button>
                <Button variant="destructive" size="sm" onClick={() => deleteQuestion(qIndex)} className="ml-2">
                  Supprimer la question
                </Button>
              </div>
            ) : (
              <>*/}
                <p className="font-medium">{qIndex + 1}. {q.question}</p>
                {q.options.map((opt, oIndex) => (
                  <label key={oIndex} className="block">
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value={oIndex}
                      checked={answers[qIndex] === oIndex}
                      onChange={() => handleOptionChange(qIndex, oIndex)}
                      disabled={submitted}
                      className="mr-2"
                    />
                    
                    {opt}
                  </label>
                ))}
                {/*
              </>
            )} }*/}
          </CardContent>
        </Card>
      ))}

      {/* {editMode && (
        <div className="text-center">
          <Button variant="outline" onClick={addQuestion}>
            Ajouter une question
          </Button>
        </div>
      )} */}

      {!submitted 
      // && !editMode
       ? (
        <Button onClick={handleSubmit}>Soumettre</Button>
      ) : submitted ? (
        <div className="text-center p-4 space-y-2">
          {/* <p className="text-lg">Nom : {fullName}</p> */}
          <p className="text-lg">Score : {calculateScore()} / {questions.length}</p>
          <p className="text-xl font-semibold mt-2">Niveau : {getLevel(calculateScore())}</p>
          <Button variant="outline" onClick={handleRestart}>Recommencer le test</Button>
        </div>
      ) : null}
    </div>
  );
}
