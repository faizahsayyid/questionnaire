import React, { useState, useMemo, useRef, useEffect } from "react";
import { TextField, Typography, Stack, Button } from "@mui/material";
import { Answer, Question } from "../types/question.types";
import QuestionInput from "./QuestionInput";

type QuestionBoxProps = {
  question: Question;
  nextStep: () => void;
  back: () => void;
  onSubmit: (answers: Answer[]) => void;
  canGoNext: boolean;
  canGoBack: boolean;
};

function QuestionBox({
  question,
  nextStep,
  back,
  onSubmit,
  canGoNext,
  canGoBack,
}: QuestionBoxProps) {
  const {
    id,
    text,
    input_type,
    required,
    validation,
    description,
    placeholder,
    options,
  } = question;

  const [currentValue, setCurrentValue] = useState<any>(null);
  const answersRef = useRef<Answer[]>([]);

  const isValid = (): boolean => {
    return (
      (!required || !!currentValue) &&
      (!validation ||
        (!required && !currentValue) ||
        !!currentValue.match(validation.pattern))
    );
  };

  const canContinue = useMemo<boolean>(isValid, [
    required,
    validation,
    currentValue,
  ]);

  const errorText = useMemo<string>(() => {
    if (!!currentValue && validation && !isValid()) {
      return validation.message;
    } else {
      return "";
    }
  }, [validation, currentValue]);

  useEffect(() => {
    const existingAnswer = answersRef.current.find(
      (answer) => answer.question_id === id
    );

    if (existingAnswer) {
      setCurrentValue(existingAnswer.value);
    } else {
      setCurrentValue(null);
    }
  }, [question]);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingAnswerIndex = answersRef.current.findIndex(
      (answer) => answer.question_id === id
    );

    if (existingAnswerIndex !== -1) {
      answersRef.current[existingAnswerIndex] = {
        question_id: id,
        value: currentValue || "",
      };
    } else {
      answersRef.current.push({
        question_id: id,
        value: currentValue || "",
      });
    }

    if (canGoNext) {
      e.target.reset();
      setCurrentValue(null);
      nextStep();
    } else {
      onSubmit(answersRef.current);
    }
  };

  return (
    <Stack
      justifyContent="flex-start"
      sx={{ height: "100%" }}
      spacing={4}
      component="form"
      onSubmit={handleSubmit}
    >
      <div>
        <Typography variant="h6" component="h2" data-testid="questionBoxText">
          {text}
        </Typography>
        <Typography variant="body1" data-testid="questionBoxDescription">
          {description}
        </Typography>
      </div>
      <QuestionInput
        options={options}
        inputType={input_type}
        value={currentValue}
        setValue={setCurrentValue}
        label={placeholder}
        error={!!errorText}
        helperText={errorText}
      />
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        {canGoBack && (
          <Button type="button" onClick={back} data-testid="questionBoxBackBtn">
            Back
          </Button>
        )}
        <Button
          data-testid="questionBoxNextBtn"
          type="submit"
          variant="contained"
          disableElevation
          disabled={!canContinue}
        >
          {canGoNext ? "Next Step" : "Submit"}
        </Button>
      </Stack>
    </Stack>
  );
}

export default QuestionBox;
