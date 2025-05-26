
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Calendar, Users, FileText, Award, Brain } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { 
  fetchSemestres, 
  fetchUnits, 
  fetchSequences, 
  fetchPlanningCourses, 
  fetchExercices,
  type Semestre,
  type Unit,
  type Sequence,
  type PlanningCourse,
  type Exercice
} from '@/services/api';

const Planning = () => {
  // Filter states
  const [selectedAnnee, setSelectedAnnee] = useState<string>('all');
  const [selectedNiveau, setSelectedNiveau] = useState<string>('all');
  const [selectedSemestre, setSelectedSemestre] = useState<string>('all');
  const [selectedUnite, setSelectedUnite] = useState<string>('all');
  const [selectedSequence, setSelectedSequence] = useState<string>('all');
  const [selectedCours, setSelectedCours] = useState<string>('all');

  // Fetch data using React Query
  const { data: semestres = [] } = useQuery({
    queryKey: ['semestres'],
    queryFn: fetchSemestres,
  });

  const { data: units = [] } = useQuery({
    queryKey: ['units'],
    queryFn: fetchUnits,
  });

  const { data: sequences = [] } = useQuery({
    queryKey: ['sequences'],
    queryFn: fetchSequences,
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['planning-courses'],
    queryFn: fetchPlanningCourses,
  });

  const { data: exercices = [] } = useQuery({
    queryKey: ['exercices'],
    queryFn: fetchExercices,
  });

  // Filter functions
  const filteredSemestres = semestres.filter(semestre => {
    if (selectedAnnee !== 'all' && semestre.annee_collegiale !== selectedAnnee) return false;
    if (selectedNiveau !== 'all' && semestre.niveau_collegiale !== selectedNiveau) return false;
    return true;
  });

  const filteredUnits = units.filter(unit => {
    if (selectedSemestre !== 'all' && unit.semestre !== selectedSemestre) return false;
    return true;
  });

  const filteredSequences = sequences.filter(sequence => {
    if (selectedUnite !== 'all' && sequence.unite !== selectedUnite) return false;
    return true;
  });

  const filteredCourses = courses.filter(course => {
    if (selectedSequence !== 'all' && course.sequence !== selectedSequence) return false;
    return true;
  });

  const filteredExercices = exercices.filter(exercice => {
    if (selectedCours !== 'all' && exercice.cours !== selectedCours) return false;
    return true;
  });

  // Get unique values for filter options
  const uniqueAnnees = [...new Set(semestres.map(s => s.annee_collegiale))];
  const uniqueNiveaux = [...new Set(semestres.map(s => s.niveau_collegiale))];

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Planning</h1>
          <p className="text-gray-600">Gestion des semestres, unités, séquences, cours et exercices</p>
        </div>
      </div>

      <Tabs defaultValue="semestres" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="semestres">Semestres</TabsTrigger>
          <TabsTrigger value="unites">Unités</TabsTrigger>
          <TabsTrigger value="sequences">Séquences</TabsTrigger>
          <TabsTrigger value="cours">Cours</TabsTrigger>
          <TabsTrigger value="exercices">Exercices</TabsTrigger>
        </TabsList>

        {/* Semestres Tab */}
        <TabsContent value="semestres" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Select value={selectedAnnee} onValueChange={setSelectedAnnee}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par année" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les années</SelectItem>
                {uniqueAnnees.map(annee => (
                  <SelectItem key={annee} value={annee}>{annee}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedNiveau} onValueChange={setSelectedNiveau}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                {uniqueNiveaux.map(niveau => (
                  <SelectItem key={niveau} value={niveau}>Niveau {niveau}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSemestres.map((semestre) => (
              <Card key={semestre.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{semestre.name}</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{semestre.annee_collegiale}</div>
                  <p className="text-xs text-muted-foreground">Niveau {semestre.niveau_collegiale}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Unités Tab */}
        <TabsContent value="unites" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Select value={selectedSemestre} onValueChange={setSelectedSemestre}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les semestres</SelectItem>
                {semestres.map(semestre => (
                  <SelectItem key={semestre.id} value={semestre.id}>{semestre.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUnits.map((unit) => (
              <Card key={unit.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{unit.name}</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{unit.progression}</div>
                  <p className="text-xs text-muted-foreground">
                    {unit.sequences} séquences • {unit.cours} cours
                  </p>
                  {unit.testDiagno && (
                    <div className="flex items-center gap-1 mt-2">
                      <Brain className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">Test diagnostique</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Séquences Tab */}
        <TabsContent value="sequences" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Select value={selectedUnite} onValueChange={setSelectedUnite}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par unité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les unités</SelectItem>
                {units.map(unit => (
                  <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSequences.map((sequence) => (
              <Card key={sequence.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{sequence.name}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sequence.progression}</div>
                  <p className="text-xs text-muted-foreground">
                    {sequence.cours} cours • {sequence.exercices} exercices
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Cours Tab */}
        <TabsContent value="cours" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Select value={selectedSequence} onValueChange={setSelectedSequence}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par séquence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les séquences</SelectItem>
                {sequences.map(sequence => (
                  <SelectItem key={sequence.id} value={sequence.id}>{sequence.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{course.name}</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{course.progression}</div>
                  <p className="text-xs text-muted-foreground">
                    {course.exercices} exercices
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Exercices Tab */}
        <TabsContent value="exercices" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Select value={selectedCours} onValueChange={setSelectedCours}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par cours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les cours</SelectItem>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercices.map((exercice) => (
              <Card key={exercice.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{exercice.name}</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{exercice.progression}</div>
                  <p className="text-xs text-muted-foreground">
                    {exercice.questions && `${exercice.questions} questions`}
                    {exercice.exercices && `${exercice.exercices} exercices`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Planning;
