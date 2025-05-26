
import { Card, CardContent } from "@/components/ui/card";

interface SequenceCardProps {
  sequence: {
    id: string;
    name: string;
    description: string;
    unitId: string;
    duration: number;
    objectives: string[];
  };
}

export const SequenceCard = ({ sequence }: SequenceCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold text-orange-700 mb-2">{sequence.name}</h3>
        <p className="text-gray-600 mb-3">{sequence.description}</p>
        <div className="mb-3">
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
            {sequence.duration}h
          </span>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-2">Objectifs:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {sequence.objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
