import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import WeeklyPlans from "./components/WeeklyPlans/WeeklyPlans.js";
import DashboardLayout from "./components/Layouts/DashboardLayout/layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getWeeklyPlans } from "./actions/weeklyPlans";
import AuthLayout from "./components/Layouts/AuthLayout/layout";
import Login from "./components/Auth/Login/login";
import Register from "./components/Auth/Register/register";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7A6AB8",
      light: "rgb(122, 106, 184, 0.5)",
      black: "#071544",
    },
    secondary: {
      main: "#D1B8CF",
      light: "#BAA2B8",
      black: "E5E5E5",
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getWeeklyPlans());
  }, [currentId, dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/weeklyPlans" element={<DashboardLayout />}>
            <Route
              path=""
              element={
                <WeeklyPlans
                  setCurrentId={setCurrentId}
                  currentId={currentId}
                />
              }
            />
          </Route>
        </Routes>

        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
