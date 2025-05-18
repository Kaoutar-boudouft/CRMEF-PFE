
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchTestDiagnostique, Question } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const ConsultDiagnosticTest = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const questionsData = await fetchTestDiagnostique();
        setQuestions(questionsData);
        setAnswers(Array(questionsData.length).fill(-1));
      } catch (error) {
        console.error("Error loading diagnostic test:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger le test diagnostique",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [toast]);

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
    setSubmitted(true);
    toast({
      title: "Test soumis",
      description: `Votre score est de ${calculateScore()} sur ${questions.length}`,
    });
  };

  const handleRestart = () => {
    setAnswers(Array(questions.length).fill(-1));
    setSubmitted(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Chargement du test diagnostique...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <header className="border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/planning")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold">Test Diagnostique</h1>
        </div>
      </header>
      <h1 className="text-2xl font-bold">Test Diagnostique – Système informatique</h1>

      {questions.map((q, qIndex) => (
        <Card key={qIndex} className="relative">
          <CardContent className="p-4 space-y-2">
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
          </CardContent>
        </Card>
      ))}

      {!submitted ? (
        <Button onClick={handleSubmit}>Soumettre</Button>
      ) : (
        <div className="text-center p-4 space-y-2">
          <p className="text-lg">Score : {calculateScore()} / {questions.length}</p>
          <p className="text-xl font-semibold mt-2">Niveau : {getLevel(calculateScore())}</p>
          <Button variant="outline" onClick={handleRestart}>Recommencer le test</Button>
        </div>
      )}
    </div>
  );
};

export default ConsultDiagnosticTest;
