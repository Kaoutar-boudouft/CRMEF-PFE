
import { Card, CardContent } from "@/components/ui/card";

interface SemesterCardProps {
  semester: {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  };
}

export const SemesterCard = ({ semester }: SemesterCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">{semester.name}</h3>
        <p className="text-gray-600 mb-3">{semester.description}</p>
        <div className="space-y-1 text-sm text-gray-500">
          <p><span className="font-medium">Début:</span> {new Date(semester.startDate).toLocaleDateString('fr-FR')}</p>
          <p><span className="font-medium">Fin:</span> {new Date(semester.endDate).toLocaleDateString('fr-FR')}</p>
        </div>
      </CardContent>
    </Card>
  );
};
