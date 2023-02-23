import { useMemo, useState } from "react";

import { Typography, Divider, Stack, Box, Alert } from "@mui/material";

import QuestionBox from "../components/QuestionBox";
import ProgressBar from "../components/ProgressBar";
import { Answer, Question } from "../types/question.types";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getQuestionnaire } from "../api/questionnaire";
import { postAnswers } from "../api/answer";

const DISPLAY_NONE_AT_SM = {
  display: { xs: "none", sm: "block" },
};

function Questionnaire() {
  const query = useQuery("questionnaire", getQuestionnaire);

  const questions: Question[] = useMemo(() => {
    if (query.isFetched && query.data && query.data.length > 0) {
      return query.data[0].questions as Question[];
    } else {
      return [];
    }
  }, [query]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submissionError, setSubmissionError] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation(postAnswers, {
    onSuccess: () => navigate("/submission"),
    onError: () => {
      setSubmissionError(true);
    },
  });

  const nextStep = () => {
    if (currentIndex >= questions.length - 1) return;
    if (activeIndex == currentIndex) {
      setActiveIndex((prev) => prev + 1);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const back = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const submitQuestionnaire = (answers: Answer[]) => {
    mutation.mutate(answers);
  };

  if (query.isError) {
    return (
      <Alert severity="error" sx={{ marginTop: "2rem" }}>
        Unable to load questionnaire! Please try again later.
      </Alert>
    );
  } else if (query.isFetching) {
    return <div style={{ marginTop: "1rem" }}>Loading...</div>;
  } else {
    return (
      <>
        {submissionError && (
          <Alert severity="error" sx={{ marginTop: "2rem" }}>
            There was error submitting your answers! Please try again.
          </Alert>
        )}
        <Stack direction="row" justifyContent="space-between" marginTop="2rem">
          <Box
            sx={{ maxHeight: "100vh", overflow: "auto", ...DISPLAY_NONE_AT_SM }}
          >
            <ProgressBar questions={questions} activeIndex={activeIndex} />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginRight: { xs: "0", sm: "2rem" }, ...DISPLAY_NONE_AT_SM }}
          />
          <div style={{ flexGrow: 1 }}>
            <Typography variant="overline">
              Question {currentIndex + 1} / {questions.length}
            </Typography>
            <QuestionBox
              question={questions[currentIndex]}
              nextStep={nextStep}
              back={back}
              canGoNext={currentIndex < questions.length - 1}
              canGoBack={currentIndex > 0}
              onSubmit={submitQuestionnaire}
            />
          </div>
        </Stack>
      </>
    );
  }
}

export default Questionnaire;
