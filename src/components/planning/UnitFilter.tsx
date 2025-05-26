
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Unit } from "../../services/api";

interface UnitFilterProps {
  selectedUnit: string;
  onUnitChange: (value: string) => void;
  units: Unit[];
  selectedSemester: string;
}

export const UnitFilter = ({ selectedUnit, onUnitChange, units, selectedSemester }: UnitFilterProps) => {
  const filteredUnits = selectedSemester === "all" 
    ? units 
    : units.filter(unit => unit.semestre === selectedSemester);

  return (
    <div className="mb-6">
      <Select value={selectedUnit} onValueChange={onUnitChange}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Sélectionner une unité" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les unités</SelectItem>
          {filteredUnits.map((unit) => (
            <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
