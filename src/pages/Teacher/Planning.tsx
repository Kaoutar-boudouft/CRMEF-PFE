import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, RotateCcw } from "lucide-react"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Import data (assuming these are in a separate file)
import semestersData from '@/data/semestres.json';
import unitsData from '@/data/units.json';
import sequencesData from '@/data/sequences.json';
import coursesData from '@/data/planning-courses.json';
import exercisesData from '@/data/exercices.json';
import { SemesterCard } from "@/components/Planning/SemesterCard";
import { UnitCard } from "@/components/Planning/UnitCard";
import { SequenceCard } from "@/components/Planning/SequenceCard";
import { CourseCard } from "@/components/Planning/CourseCard";
import { ExerciseCard } from "@/components/Planning/ExerciseCard";

export interface Semestre {
  id: string;
  name: string;
  annee_collegiale: string;
  niveau_collegiale: string;
}

export interface Unit {
  id: string;
  semestre: string;
  name: string;
  sequences: number;
  cours: number;
  progression: string;
  testDiagno: boolean;
}

export interface Sequence {
  id: string;
  unite: string;
  name: string;
  cours: number;
  exercices: number;
  progression: string;
}

export interface Course {
  id: string;
  name: string;
  sequence: string;
  exercices: number;
  progression: string;
}

export interface Exercice {
  id: string;
  name: string;
  cours: string;
  questions?: number;
  exercices?: number;
  progression: string;
}


const Planning = () => {
  const [activeTab, setActiveTab] = useState<string>("semestres");
  const [semesters, setSemesters] = useState<Semester[]>(semestersData);
  const [units, setUnits] = useState<Unit[]>(unitsData);
  const [sequences, setSequences] = useState<Sequence[]>(sequencesData);
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [exercises, setExercises] = useState<Exercise[]>(exercisesData);

  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedSequence, setSelectedSequence] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  // Filter functions
  const filterSemesters = () => {
    if (selectedSemester === "all") {
      return semesters;
    }
    return semesters.filter((semester) => semester.id === selectedSemester);
  };

  const filterUnits = () => {
    let filtered = units;
    if (selectedSemester !== "all") {
      filtered = filtered.filter((unit) => unit.semesterId === selectedSemester);
    }
    if (selectedUnit !== "all") {
      filtered = filtered.filter((unit) => unit.id === selectedUnit);
    }
    return filtered;
  };

  const filterSequences = () => {
    let filtered = sequences;
    if (selectedSemester !== "all") {
      filtered = filtered.filter((sequence) => {
        const unit = units.find((u) => u.id === sequence.unitId);
        return unit?.semesterId === selectedSemester;
      });
    }
    if (selectedUnit !== "all") {
      filtered = filtered.filter((sequence) => sequence.unitId === selectedUnit);
    }
    if (selectedSequence !== "all") {
      filtered = filtered.filter((sequence) => sequence.id === selectedSequence);
    }
    return filtered;
  };

  const filterCourses = () => {
    let filtered = courses;
    if (selectedSemester !== "all") {
      filtered = filtered.filter((course) => {
        const sequence = sequences.find((s) => s.id === course.sequenceId);
        const unit = units.find((u) => u.id === sequence?.unitId);
        return unit?.semesterId === selectedSemester;
      });
    }
    if (selectedUnit !== "all") {
      filtered = filtered.filter((course) => {
        const sequence = sequences.find((s) => s.id === course.sequenceId);
        return sequence?.unitId === selectedUnit;
      });
    }
    if (selectedSequence !== "all") {
      filtered = filtered.filter((course) => course.sequenceId === selectedSequence);
    }
    if (selectedCourse !== "all") {
      filtered = filtered.filter((course) => course.id === selectedCourse);
    }
    return filtered;
  };

  const filterExercises = () => {
    let filtered = exercises;
    if (selectedSemester !== "all") {
      filtered = filtered.filter((exercise) => {
        const course = courses.find((c) => c.id === exercise.courseId);
        const sequence = sequences.find((s) => s.id === course?.sequenceId);
        const unit = units.find((u) => u.id === sequence?.unitId);
        return unit?.semesterId === selectedSemester;
      });
    }
    if (selectedUnit !== "all") {
      filtered = filtered.filter((exercise) => {
        const course = courses.find((c) => c.id === exercise.courseId);
        const sequence = sequences.find((s) => s.id === course?.sequenceId);
        return sequence?.unitId === selectedUnit;
      });
    }
    if (selectedSequence !== "all") {
      filtered = filtered.filter((exercise) => {
        const course = courses.find((c) => c.id === exercise.courseId);
        return course?.sequenceId === selectedSequence;
      });
    }
     if (selectedCourse !== "all") {
       filtered = filtered.filter((exercise) => exercise.courseId === selectedCourse);
     }
    return filtered;
  };

  // Handlers
  const resetFilters = () => {
    setSelectedSemester("all");
    setSelectedUnit("all");
    setSelectedSequence("all");
    setSelectedCourse("all");
  };

  // Memoized filtered data
  const filteredSemesters = React.useMemo(filterSemesters, [semesters, selectedSemester]);
  const filteredUnits = React.useMemo(filterUnits, [units, selectedSemester, selectedUnit]);
  const filteredSequences = React.useMemo(filterSequences, [sequences, selectedSemester, selectedUnit, selectedSequence, units]);
  const filteredCourses = React.useMemo(filterCourses, [courses, selectedSemester, selectedUnit, selectedSequence, selectedCourse, sequences, units]);
  const filteredExercises = React.useMemo(filterExercises, [exercises, selectedSemester, selectedUnit, selectedSequence, selectedCourse, courses, sequences, units]);

  // Available options for selects
  const availableUnits = React.useMemo(() => {
    if (selectedSemester === "all") {
      return units;
    }
    return units.filter((unit) => unit.semesterId === selectedSemester);
  }, [units, selectedSemester]);

  const availableSequences = React.useMemo(() => {
    if (selectedUnit === "all") {
      return sequences;
    }
    return sequences.filter((sequence) => sequence.unitId === selectedUnit);
  }, [sequences, selectedUnit]);

  const availableCourses = React.useMemo(() => {
    if (selectedSequence === "all") {
      return courses;
    }
    return courses.filter((course) => course.sequenceId === selectedSequence);
  }, [courses, selectedSequence]);

  const renderSemestersContent = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Filtrer par Semestre
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un semestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les semestres</SelectItem>
              {semesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.id}>
                  {semester.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={resetFilters}
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
          
          <Button className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Semestre
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSemesters.map((semester) => (
          <SemesterCard key={semester.id} semester={semester} />
        ))}
      </div>
    </div>
  );

  const renderUnitsContent = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Filtrer par Semestre et Unité
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un semestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les semestres</SelectItem>
              {semesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.id}>
                  {semester.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une unité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les unités</SelectItem>
              {availableUnits.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={resetFilters}
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Unité
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnits.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );

  const renderSequencesContent = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Filtrer par Semestre, Unité et Séquence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un semestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les semestres</SelectItem>
              {semesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.id}>
                  {semester.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une unité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les unités</SelectItem>
              {availableUnits.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSequence} onValueChange={setSelectedSequence}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une séquence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les séquences</SelectItem>
              {availableSequences.map((sequence) => (
                <SelectItem key={sequence.id} value={sequence.id}>
                  {sequence.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={resetFilters}
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Séquence
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSequences.map((sequence) => (
          <SequenceCard key={sequence.id} sequence={sequence} />
        ))}
      </div>
    </div>
  );

  const renderCoursesContent = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Filtrer par Semestre, Unité, Séquence et Cours
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un semestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les semestres</SelectItem>
              {semesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.id}>
                  {semester.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une unité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les unités</SelectItem>
              {availableUnits.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSequence} onValueChange={setSelectedSequence}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une séquence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les séquences</SelectItem>
              {availableSequences.map((sequence) => (
                <SelectItem key={sequence.id} value={sequence.id}>
                  {sequence.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un cours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les cours</SelectItem>
              {availableCourses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={resetFilters}
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Cours
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );

  const renderExercisesContent = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Filtrer par Semestre, Unité, Séquence, Cours et Exercice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un semestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les semestres</SelectItem>
              {semesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.id}>
                  {semester.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une unité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les unités</SelectItem>
              {availableUnits.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSequence} onValueChange={setSelectedSequence}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une séquence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les séquences</SelectItem>
              {availableSequences.map((sequence) => (
                <SelectItem key={sequence.id} value={sequence.id}>
                  {sequence.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un cours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les cours</SelectItem>
              {availableCourses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={resetFilters}
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel Exercice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Planning</h1>
          <p className="text-gray-500">
            Gérez votre planning de cours, unités, séquences et exercices.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="semestres">Semestres</TabsTrigger>
            <TabsTrigger value="unites">Unités</TabsTrigger>
            <TabsTrigger value="sequences">Séquences</TabsTrigger>
            <TabsTrigger value="cours">Cours</TabsTrigger>
            <TabsTrigger value="exercices">Exercices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="semestres" className="space-y-6">
            {renderSemestersContent()}
          </TabsContent>

          <TabsContent value="unites" className="space-y-6">
            {renderUnitsContent()}
          </TabsContent>

          <TabsContent value="sequences" className="space-y-6">
            {renderSequencesContent()}
          </TabsContent>

          <TabsContent value="cours" className="space-y-6">
            {renderCoursesContent()}
          </TabsContent>

          <TabsContent value="exercices" className="space-y-6">
            {renderExercisesContent()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Planning;
