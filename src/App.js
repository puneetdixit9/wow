import React from "react";
import { useRoutes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {baseTheme} from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";
import FormLayouts from "./views/FormLayouts/FormLayouts.js";

const App = () => {
  const routes = [
    ...Themeroutes,
    { path: "/wow-pizza/signup", element: <FormLayouts form={"signup"}/> },
    { path: "/wow-pizza/login", element: <FormLayouts form={"login"}/> },
    { path: "/wow-pizza/otp/:phoneNumber", element: <FormLayouts form={"otp"}/> },
  ];
  const routing = useRoutes(routes);
  const theme = baseTheme;
  return (
    <ThemeProvider theme={theme}>
      {routing}
    </ThemeProvider>
  );
};

export default App;
