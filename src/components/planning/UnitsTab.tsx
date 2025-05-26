
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Unit } from "../../services/api";

interface UnitsTabProps {
  units: Unit[];
  selectedSemester: string;
}

export const UnitsTab = ({ units, selectedSemester }: UnitsTabProps) => {
  // Filtrer les unités par semestre sélectionné
  const filteredUnits = selectedSemester === "all" 
    ? units 
    : units.filter((unit) => unit.semestre === selectedSemester);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredUnits.map((unit) => (
        <Card key={unit.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{unit.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Séquences:</span>
                <span>{unit.sequences}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cours:</span>
                <span>{unit.cours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Progression:</span>
                <span>{unit.progression}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Test Diagnostique:</span>
                <span>{unit.testDiagno ? "Oui" : "Non"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
