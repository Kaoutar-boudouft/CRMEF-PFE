
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { PlanningCourse } from "../../services/api";

interface CourseFilterProps {
  selectedCourse: string;
  onCourseChange: (value: string) => void;
  courses: PlanningCourse[];
  selectedSequence: string;
}

export const CourseFilter = ({ selectedCourse, onCourseChange, courses, selectedSequence }: CourseFilterProps) => {
  const filteredCourses = selectedSequence === "all" 
    ? courses 
    : courses.filter(course => course.sequence === selectedSequence);

  return (
    <div className="mb-6">
      <Select value={selectedCourse} onValueChange={onCourseChange}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Sélectionner un cours" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les cours</SelectItem>
          {filteredCourses.map((course) => (
            <SelectItem key={course.id} value={course.id}>
              {course.name.split(":")[0]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
