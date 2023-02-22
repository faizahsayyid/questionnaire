import { Typography, Stack, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function Submitted() {
  const navigate = useNavigate();
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={4}
      marginTop={4}
    >
      <Typography variant="h6" component="p" color={green[700]}>
        Submission Successful!
      </Typography>
      <Button
        sx={{ width: "fit-content" }}
        variant="contained"
        disableElevation
        onClick={() => navigate("/")}
      >
        Re-Take the Questionnaire
      </Button>
    </Stack>
  );
}

export default Submitted;
