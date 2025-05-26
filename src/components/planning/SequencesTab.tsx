
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Sequence, Unit } from "../../services/api";

interface SequencesTabProps {
  sequences: Sequence[];
  units: Unit[];
  selectedUnit: string;
}

export const SequencesTab = ({ sequences, units, selectedUnit }: SequencesTabProps) => {
  // Filtrer les séquences par unité sélectionnée
  const filteredSequences = selectedUnit === "all" 
    ? sequences 
    : sequences.filter((sequence) => sequence.unite === selectedUnit);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredSequences.map((sequence) => (
        <Card key={sequence.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{sequence.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unité:</span>
                <span>
                  {units.find((unit) => unit.id === sequence.unite)?.name || sequence.unite}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cours:</span>
                <span>{sequence.cours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exercices:</span>
                <span>{sequence.exercices}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Progression:</span>
                <span>{sequence.progression}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
