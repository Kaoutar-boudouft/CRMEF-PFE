
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { PlanningCourse, Sequence } from "../../services/api";

interface CoursesTabProps {
  courses: PlanningCourse[];
  sequences: Sequence[];
  selectedSequence: string;
}

export const CoursesTab = ({ courses, sequences, selectedSequence }: CoursesTabProps) => {
  // Filtrer les cours par séquence sélectionnée
  const filteredCourses = selectedSequence === "all" 
    ? courses 
    : courses.filter((course) => course.sequence === selectedSequence);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredCourses.map((course) => (
        <Card key={course.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{course.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Séquence:</span>
                <span>
                  {sequences.find((seq) => seq.id === course.sequence)?.name.split(":")[0] || course.sequence}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exercices:</span>
                <span>{course.exercices}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Progression:</span>
                <span>{course.progression}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
