import { Outlet } from "react-router-dom";
import { Container, Typography, Divider } from "@mui/material";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          sx={{ margin: "2rem 0 0.5rem" }}
        >
          Questionnaire
        </Typography>
        <Divider />
        <Outlet />
      </Container>
    </>
  );
}

export default App;
