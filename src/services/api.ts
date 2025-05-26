
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
