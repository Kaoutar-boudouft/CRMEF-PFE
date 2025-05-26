
import { Card, CardContent } from "@/components/ui/card";

interface ExerciseCardProps {
  exercise: {
    id: string;
    title: string;
    description: string;
    courseId: string;
    type: 'td' | 'tp' | 'evaluation' | 'projet';
    duration: number;
    difficulty: 'facile' | 'moyen' | 'difficile';
    instructions: string;
  };
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'td': return 'bg-blue-100 text-blue-800';
      case 'tp': return 'bg-green-100 text-green-800';
      case 'evaluation': return 'bg-red-100 text-red-800';
      case 'projet': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'bg-green-100 text-green-800';
      case 'moyen': return 'bg-yellow-100 text-yellow-800';
      case 'difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">{exercise.title}</h3>
        <p className="text-gray-600 mb-3">{exercise.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-sm ${getTypeColor(exercise.type)}`}>
            {exercise.type.toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-full text-sm ${getDifficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
          </span>
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
            {exercise.duration}min
          </span>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-2">Instructions:</h4>
          <p className="text-sm text-gray-600">{exercise.instructions}</p>
        </div>
      </CardContent>
    </Card>
  );
};
