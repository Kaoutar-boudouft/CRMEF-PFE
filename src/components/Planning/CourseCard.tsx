
import { Card, CardContent } from "@/components/ui/card";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    sequenceId: string;
    duration: number;
    type: 'theorique' | 'pratique' | 'mixte';
    resources: string[];
  };
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theorique': return 'bg-blue-100 text-blue-800';
      case 'pratique': return 'bg-green-100 text-green-800';
      case 'mixte': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold text-purple-700 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-3">{course.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className={`px-2 py-1 rounded-full text-sm ${getTypeColor(course.type)}`}>
            {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
          </span>
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
            {course.duration}h
          </span>
        </div>
        {course.resources.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Ressources:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {course.resources.map((resource, index) => (
                <li key={index}>{resource}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
