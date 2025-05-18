/**
 * API Service to fetch data from JSON files
 */

// Import JSON data
import studentsData from '../data/students.json';
import classesData from '../data/classes.json';
import affectationsData from '../data/affectations.json';
import testDiagnostiqueData from '../data/test-diagnostique.json';
import coursesData from '../data/courses.json';
import activitiesData from '../data/activities.json';
import badgesData from '../data/badges.json';
import planningData from '../data/planning.json';
import semestersData from '../data/semesters.json';
import unitsData from '../data/units.json';
import sequencesData from '../data/sequences.json';
import exercisesData from '../data/exercises.json';

// Define types for each data structure
export interface Student {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  classe: string;
  niveau: string;
  type: string;
  dateInscription: string;
  niveau_competence: string;
  statut: string;
  progress: {
    global: number;
    coursesCompleted: number;
    totalCourses: number;
    streakDays: number;
    stars: number;
    hoursStudied: number;
  };
}

export interface Class {
  id: string;
  name: string;
  level: string;
  type: string;
  students: number;
  status: string;
  progression: number;
  semestres: number;
  coursesPlanned: number;
}

export interface Affectation {
  id: string;
  niveauCollegial: string;
  classe: string;
  type: string;
  cours: string;
  date: string;
}

export interface Question {
  question: string;
  options: string[];
  answer: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: string;
  unit: string;
  color: string;
}

export interface Activity {
  id: string;
  type: string;
  name: string;
  date: string;
  status: string;
  icon: string;
}

export interface BadgeType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface PlanningEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  classe: string;
  level: string;
  location: string;
  type: string;
  color: string;
}

// Educational structure interfaces
export interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface Unit {
  id: string;
  name: string;
  semesterId: string;
  description: string;
  progress: number;
  level: string;
  color: string;
  emoji: string;
  status: string;
}

export interface Sequence {
  id: string;
  name: string;
  unitId: string;
  description: string;
  progress: number;
  order: number;
}

export interface ExerciseQuestion {
  id: string;
  text: string;
  options?: string[];
  correctAnswer?: number | boolean;
  expectedLength?: number;
}

export interface Exercise {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: "qcm" | "vrai_faux" | "texte_libre";
  difficulty: "facile" | "moyen" | "difficile";
  points: number;
  questions: ExerciseQuestion[];
}

// Simulate API calls with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Students API
export const fetchStudents = async (): Promise<Student[]> => {
  await delay(300); // Simulate network delay
  return studentsData;
};

export const fetchStudentById = async (id: string): Promise<Student | undefined> => {
  await delay(200);
  return studentsData.find(student => student.id === id);
};

// Classes API
export const fetchClasses = async (): Promise<Class[]> => {
  await delay(300);
  return classesData;
};

export const fetchClassById = async (id: string): Promise<Class | undefined> => {
  await delay(200);
  return classesData.find(cls => cls.id === id);
};

// Affectations API
export const fetchAffectations = async (): Promise<Affectation[]> => {
  await delay(300);
  return affectationsData;
};

// Test Diagnostique API
export const fetchTestDiagnostique = async (): Promise<Question[]> => {
  await delay(300);
  return testDiagnostiqueData;
};

// Courses API
export const fetchCourses = async (): Promise<Course[]> => {
  await delay(300);
  return coursesData;
};

export const fetchCourseById = async (id: string): Promise<Course | undefined> => {
  await delay(200);
  return coursesData.find(course => course.id === id);
};

// Activities API
export const fetchActivities = async (): Promise<Activity[]> => {
  await delay(300);
  return activitiesData;
};

// Badges API
export const fetchBadges = async (): Promise<BadgeType[]> => {
  await delay(300);
  return badgesData;
};

// Planning API
export const fetchPlanningEvents = async (): Promise<PlanningEvent[]> => {
  await delay(300);
  return planningData;
};

export const fetchPlanningEventById = async (id: string): Promise<PlanningEvent | undefined> => {
  await delay(200);
  return planningData.find(event => event.id === id);
};

// Educational structure APIs
export const fetchSemesters = async (): Promise<Semester[]> => {
  await delay(300);
  return semestersData;
};

export const fetchSemesterById = async (id: string): Promise<Semester | undefined> => {
  await delay(200);
  return semestersData.find(semester => semester.id === id);
};

export const fetchUnits = async (): Promise<Unit[]> => {
  await delay(300);
  return unitsData;
};

export const fetchUnitById = async (id: string): Promise<Unit | undefined> => {
  await delay(200);
  return unitsData.find(unit => unit.id === id);
};

export const fetchUnitsBySemester = async (semesterId: string): Promise<Unit[]> => {
  await delay(300);
  return unitsData.filter(unit => unit.semesterId === semesterId);
};

export const fetchSequences = async (): Promise<Sequence[]> => {
  await delay(300);
  return sequencesData;
};

export const fetchSequenceById = async (id: string): Promise<Sequence | undefined> => {
  await delay(200);
  return sequencesData.find(sequence => sequence.id === id);
};

export const fetchSequencesByUnit = async (unitId: string): Promise<Sequence[]> => {
  await delay(300);
  return sequencesData.filter(sequence => sequence.unitId === unitId);
};

export const fetchExercises = async (): Promise<Exercise[]> => {
  await delay(300);
  return exercisesData as Exercise[];
};

export const fetchExerciseById = async (id: string): Promise<Exercise | undefined> => {
  await delay(200);
  return exercisesData.find(exercise => exercise.id === id) as Exercise | undefined;
};

export const fetchExercisesByCourse = async (courseId: string): Promise<Exercise[]> => {
  await delay(300);
  return exercisesData.filter(exercise => exercise.courseId === courseId) as Exercise[];
};
