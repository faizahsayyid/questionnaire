import { useState } from "react";

import { Typography, Divider, Stack, Box } from "@mui/material";

import QuestionBox from "../components/QuestionBox";
import ProgressBar from "../components/ProgressBar";
import { Answer, Question } from "../types/question.types";
import questionData from "../assets/data.json";
import { useNavigate } from "react-router-dom";

const DISPLAY_NONE_AT_SM = {
  display: { xs: "none", sm: "block" },
};

function Questionnaire() {
  // TODO: fetch questions from backend API
  const questions = questionData as Question[];

  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

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
    // TODO: post answers to backend API
    console.log(answers);
    navigate("/submission");
  };

  return (
    <Stack direction="row" justifyContent="space-between" marginTop="2rem">
      <Box sx={{ maxHeight: "100vh", overflow: "auto", ...DISPLAY_NONE_AT_SM }}>
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
  );
}

export default Questionnaire;
