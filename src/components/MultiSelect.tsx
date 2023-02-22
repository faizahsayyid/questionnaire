import { Select, Box, Chip, MenuItem, SelectChangeEvent } from "@mui/material";

type MultiSelectProps = {
  value: string[];
  onChange: (e: SelectChangeEvent<string[]>) => void;
  options: string[];
};

function MultiSelect({ value, onChange, options }: MultiSelectProps) {
  return (
    <Select
      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      value={value}
      onChange={onChange}
      renderValue={(selected: string[]) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((v) => (
            <Chip key={v} label={v} />
          ))}
        </Box>
      )}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}

export default MultiSelect;
