
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface SemesterFilterProps {
  selectedSemester: string;
  onSemesterChange: (value: string) => void;
  semesters: Array<{ id: string; name: string; }>;
}

export const SemesterFilter = ({ selectedSemester, onSemesterChange, semesters }: SemesterFilterProps) => {
  return (
    <div className="mb-6">
      <Select value={selectedSemester} onValueChange={onSemesterChange}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Sélectionner un semestre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les semestres</SelectItem>
          {semesters.map((semester) => (
            <SelectItem key={semester.id} value={semester.id}>{semester.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
