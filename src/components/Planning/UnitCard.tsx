
import { Card, CardContent } from "@/components/ui/card";

interface UnitCardProps {
  unit: {
    id: string;
    name: string;
    description: string;
    semesterId: string;
    credits: number;
    coefficient: number;
  };
}

export const UnitCard = ({ unit }: UnitCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold text-green-700 mb-2">{unit.name}</h3>
        <p className="text-gray-600 mb-3">{unit.description}</p>
        <div className="flex justify-between text-sm">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {unit.credits} crédits
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            Coeff. {unit.coefficient}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
