import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Question } from "../types/question.types";
import { blue } from "@mui/material/colors";

const ACTIVE_COLOR = blue[700];

type ProgressBarProps = {
  questions: Question[];
  activeIndex: number;
};

function ProgressBar({ questions, activeIndex }: ProgressBarProps) {
  return (
    <Timeline
      position="left"
      sx={{ margin: 0, flexGrow: 0, flexBasis: "fit-content" }}
    >
      {questions.map((q, i) => {
        let dotStyles = {};
        let textStyles = {};
        let connectorStyles = {};
        if (i <= activeIndex) {
          dotStyles = { backgroundColor: ACTIVE_COLOR };
          textStyles = { color: ACTIVE_COLOR };
        }
        if (i < activeIndex) {
          connectorStyles = { backgroundColor: ACTIVE_COLOR };
        }
        return (
          <TimelineItem
            key={q.id}
            sx={{ margin: 0, ":before": { display: "none" }, ...textStyles }}
          >
            <TimelineSeparator>
              <TimelineDot sx={dotStyles} />
              {i < questions.length - 1 && (
                <TimelineConnector sx={connectorStyles} />
              )}
            </TimelineSeparator>
            <TimelineContent sx={{ flexBasis: "fit-content" }}>
              {q.title}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

export default ProgressBar;
