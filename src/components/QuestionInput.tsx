import {
  TextField,
  Select,
  MenuItem,
  Autocomplete,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { QuestionInputType } from "../types/question.types";
import MultiSelect from "./MultiSelect";

type QuestionInputProps = {
  inputType: QuestionInputType;
  options?: string[];
  autocomplete?: { label: string; id: number };
  setValue: (val: any) => void;
  error: boolean;
  helperText: string;
  label?: string;
  value: any;
};

function QuestionInput({
  inputType,
  value,
  setValue,
  label,
  error,
  helperText,
  options,
}: QuestionInputProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value);
  };

  const handleAutocompleteChange = (e: any, inputValue: string) => {
    setValue(inputValue);
  };

  const handleMultiSelectChange = (e: SelectChangeEvent<string[]>) => {
    setValue(e.target.value);
  };

  switch (inputType) {
    case "text":
      return (
        <TextField
          data-testid="questionBoxInput"
          onChange={handleTextChange}
          variant="outlined"
          value={value || ""}
          label={label}
          error={error}
          helperText={helperText}
        />
      );
    case "select":
      return (
        <Select value={value || ""} label={label} onChange={handleSelectChange}>
          {options?.map((option, i) => {
            return (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      );

    case "autocomplete":
      return (
        <Autocomplete
          onInputChange={handleAutocompleteChange}
          options={options || []}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      );

    case "multi-select":
      return (
        <MultiSelect
          onChange={handleMultiSelectChange}
          options={options || []}
          value={value || []}
        />
      );

    default:
      return (
        <TextField
          onChange={handleTextChange}
          variant="outlined"
          value={value || ""}
          label={label}
          error={error}
          helperText={helperText}
        />
      );
  }
}

export default QuestionInput;
