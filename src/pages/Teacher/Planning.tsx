
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "../../components/ui/tabs";
import { fetchSemestres, fetchUnits, fetchSequences, fetchPlanningCourses, fetchExercices } from '../../services/api';

// Import des composants créés
import { SemesterFilter } from '../../components/planning/SemesterFilter';
import { UnitFilter } from '../../components/planning/UnitFilter';
import { SequenceFilter } from '../../components/planning/SequenceFilter';
import { CourseFilter } from '../../components/planning/CourseFilter';
import { SemestersTab } from '../../components/planning/SemestersTab';
import { UnitsTab } from '../../components/planning/UnitsTab';
import { SequencesTab } from '../../components/planning/SequencesTab';
import { CoursesTab } from '../../components/planning/CoursesTab';
import { ExercicesTab } from '../../components/planning/ExercicesTab';

export default function Planning() {
  // États pour les sélections
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [selectedSequence, setSelectedSequence] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");

  // Requêtes pour récupérer les données
  const { data: semestres = [] } = useQuery({
    queryKey: ['semestres'],
    queryFn: fetchSemestres
  });

  const { data: units = [] } = useQuery({
    queryKey: ['units'],
    queryFn: fetchUnits
  });

  const { data: sequences = [] } = useQuery({
    queryKey: ['sequences'],
    queryFn: fetchSequences
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['planning-courses'],
    queryFn: fetchPlanningCourses
  });

  const { data: exercices = [] } = useQuery({
    queryKey: ['exercices'],
    queryFn: fetchExercices
  });

  // Réinitialiser les filtres lorsque le niveau supérieur change
  useEffect(() => {
    setSelectedUnit("all");
    setSelectedSequence("all");
    setSelectedCourse("all");
  }, [selectedSemester]);

  useEffect(() => {
    setSelectedSequence("all");
    setSelectedCourse("all");
  }, [selectedUnit]);

  useEffect(() => {
    setSelectedCourse("all");
  }, [selectedSequence]);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Planification</h1>
      
      <Tabs defaultValue="semestres">
        <TabsList className="mb-4">
          <TabsTrigger value="semestres">Semestres</TabsTrigger>
          <TabsTrigger value="unites">Unités</TabsTrigger>
          <TabsTrigger value="sequences">Séquences</TabsTrigger>
          <TabsTrigger value="cours">Cours</TabsTrigger>
          <TabsTrigger value="exercices">Exercices</TabsTrigger>
        </TabsList>
        
        {/* Contenu des onglets */}
        <TabsContent value="semestres">
          <SemestersTab semestres={semestres} />
        </TabsContent>
        
        <TabsContent value="unites">
          <SemesterFilter 
            selectedSemester={selectedSemester}
            onSemesterChange={setSelectedSemester}
            semesters={semestres}
          />
          <UnitsTab 
            units={units} 
            selectedSemester={selectedSemester} 
          />
        </TabsContent>
        
        <TabsContent value="sequences">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SemesterFilter 
              selectedSemester={selectedSemester}
              onSemesterChange={setSelectedSemester}
              semesters={semestres}
            />
            <UnitFilter 
              selectedUnit={selectedUnit}
              onUnitChange={setSelectedUnit}
              units={units}
              selectedSemester={selectedSemester}
            />
          </div>
          <SequencesTab 
            sequences={sequences} 
            units={units} 
            selectedUnit={selectedUnit} 
          />
        </TabsContent>
        
        <TabsContent value="cours">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SemesterFilter 
              selectedSemester={selectedSemester}
              onSemesterChange={setSelectedSemester}
              semesters={semestres}
            />
            <UnitFilter 
              selectedUnit={selectedUnit}
              onUnitChange={setSelectedUnit}
              units={units}
              selectedSemester={selectedSemester}
            />
            <SequenceFilter 
              selectedSequence={selectedSequence}
              onSequenceChange={setSelectedSequence}
              sequences={sequences}
              selectedUnit={selectedUnit}
            />
          </div>
          <CoursesTab 
            courses={courses} 
            sequences={sequences} 
            selectedSequence={selectedSequence} 
          />
        </TabsContent>
        
        <TabsContent value="exercices">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SemesterFilter 
              selectedSemester={selectedSemester}
              onSemesterChange={setSelectedSemester}
              semesters={semestres}
            />
            <UnitFilter 
              selectedUnit={selectedUnit}
              onUnitChange={setSelectedUnit}
              units={units}
              selectedSemester={selectedSemester}
            />
            <SequenceFilter 
              selectedSequence={selectedSequence}
              onSequenceChange={setSelectedSequence}
              sequences={sequences}
              selectedUnit={selectedUnit}
            />
            <CourseFilter 
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
              courses={courses}
              selectedSequence={selectedSequence}
            />
          </div>
          <ExercicesTab 
            exercices={exercices} 
            courses={courses} 
            selectedCourse={selectedCourse} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
