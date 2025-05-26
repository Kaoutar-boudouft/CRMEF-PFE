
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Exercice, PlanningCourse } from "../../services/api";

interface ExercicesTabProps {
  exercices: Exercice[];
  courses: PlanningCourse[];
  selectedCourse: string;
}

export const ExercicesTab = ({ exercices, courses, selectedCourse }: ExercicesTabProps) => {
  // Filtrer les exercices par cours sélectionné
  const filteredExercices = selectedCourse === "all" 
    ? exercices 
    : exercices.filter((exercice) => exercice.cours === selectedCourse);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredExercices.map((exercice) => (
        <Card key={exercice.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{exercice.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cours:</span>
                <span>
                  {courses.find((course) => course.id === exercice.cours)?.name.split(":")[0] || exercice.cours}
                </span>
              </div>
              {exercice.questions && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions:</span>
                  <span>{exercice.questions}</span>
                </div>
              )}
              {exercice.exercices && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exercices:</span>
                  <span>{exercice.exercices}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Progression:</span>
                <span>{exercice.progression}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
