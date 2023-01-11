import Form from "./components/form";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    htmlFontSize: 10,
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container fixed>
        <Form />
      </Container>
    </ThemeProvider>
  );
}

export default App;
