
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Sequence } from "../../services/api";

interface SequenceFilterProps {
  selectedSequence: string;
  onSequenceChange: (value: string) => void;
  sequences: Sequence[];
  selectedUnit: string;
}

export const SequenceFilter = ({ selectedSequence, onSequenceChange, sequences, selectedUnit }: SequenceFilterProps) => {
  const filteredSequences = selectedUnit === "all" 
    ? sequences 
    : sequences.filter(sequence => sequence.unite === selectedUnit);

  return (
    <div className="mb-6">
      <Select value={selectedSequence} onValueChange={onSequenceChange}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Sélectionner une séquence" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les séquences</SelectItem>
          {filteredSequences.map((sequence) => (
            <SelectItem key={sequence.id} value={sequence.id}>
              {sequence.name.split(":")[0]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
