
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Semestre } from "../../services/api";

interface SemestersTabProps {
  semestres: Semestre[];
}

export const SemestersTab = ({ semestres }: SemestersTabProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {semestres.map((semestre) => (
        <Card key={semestre.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{semestre.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Année collégiale:</span>
                <span>{semestre.annee_collegiale}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Niveau collégiale:</span>
                <span>{semestre.niveau_collegiale}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
