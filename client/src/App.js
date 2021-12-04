import React from "react";
import { Routes, Route } from "react-router-dom";
import WeeklyPlans from "./pages/WeeklyPlans/WeeklyPlans.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout/layout";
import Login from "./pages/Auth/Login/login";
import PrivateRoute from "./components/privateRoute.js";
import Register from "./pages/Auth/Register/register";
import DashboardLayout from "./Layouts/DashboardLayout/layout";
import NotFound from "./pages/NotFound/NotFound.js";
import Overview from "./pages/Overview/overview"

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

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/dashboard" element={<PrivateRoute/>}>
            <Route path="" element={<DashboardLayout />}>
            <Route path="overview" element={<Overview />} />
              <Route path="weeklyPlans" element={<WeeklyPlans />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
