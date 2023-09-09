import React from "react";
import { useRoutes, Routes, Route, Navigate, useLocation, json } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";
import FormLayouts from "./views/FormLayouts/FormLayouts.js";
import { FirebaseProvider } from './FirebaseService';


const App = () => {
  const allRoutes = [
    ...Themeroutes,
    { path: "/wow-pizza/signup", element: <FormLayouts form={"signup"} /> },
    { path: "/wow-pizza/login", element: <FormLayouts form={"login"} /> },
    { path: "/wow-pizza/otp/:phoneNumber", element: <FormLayouts form={"otp"} /> },
  ];

  const authRoutes = [
    { path: "/wow-pizza/signup", element: <FormLayouts form={"signup"} /> },
    { path: "/wow-pizza/login", element: <FormLayouts form={"login"} /> },
    { path: "/wow-pizza/otp/:phoneNumber", element: <FormLayouts form={"otp"} /> },
  ];

  let user = localStorage.getItem("user");
  const isAuthenticated = !!user;
  const routing = useRoutes(isAuthenticated ? allRoutes : authRoutes);
  const isOTPPath = window.location.pathname.startsWith("/wow-pizza/otp")

  const location = useLocation();
  const currentPath = location.pathname;
  const isPathInAllRoutes = Themeroutes[0].children.some(route => route.path === currentPath);
  const isPathInAuthRoutes = authRoutes.some(route => route.path === currentPath);


  console.log("Navigate to login -> ", !isAuthenticated, !isOTPPath, isPathInAllRoutes, !isPathInAuthRoutes)
  if (!isAuthenticated && !isOTPPath && isPathInAllRoutes && !isPathInAuthRoutes) {
    return <Navigate to="/wow-pizza/login" replace />;
  }

  user = JSON.parse(user)
  if (isAuthenticated && (isOTPPath || isPathInAuthRoutes)) {
    console.log("User Role -> ", user.role)
    if (user.role === "customer") {
      return <Navigate to="/wow-pizza/food-items" replace />;
    } else if (user.role === "admin") {
      return <Navigate to="/wow-pizza/dashboard" replace />;
    }
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }

  const theme = baseTheme;
  return (
    <ThemeProvider theme={theme}>
      <FirebaseProvider>
        {routing}
      </FirebaseProvider>
    </ThemeProvider>
  );
};

export default App;
