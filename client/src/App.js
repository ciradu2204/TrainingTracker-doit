import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import weeklyPlans from "./components/WeeklyPlans/weeklyPlans";
import Account from "./components/Account/account";
import Settings from "./components/Settings/settings";
import Login from "./components/UserAuth/login";
import Overview from "./components/Overview/overview"; 
import Layout from "./components/layout";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme  = createTheme({
palette:{
    primary:{
        main: "#7A6AB8",
        light: "rgb(122, 106, 184, 0.5)",
        black: "#071544", 
    }, 
    secondary:{
        main:"#D1B8CF",
        light:"#BAA2B8",
        black:"rgb(0,0,0, 0.7)"
    }
}
})

const App = () =>{
    return (
        <ThemeProvider theme={theme}>
        <Router>
            <Layout>
            <Routes>
                <Route path="/" exact component={Login} />
                <Route path="/overview" exact component ={Overview}/>
                <Route path="/weeklyPlans" exact component = {weeklyPlans}/>
                <Route path="/settings" exact component = {Settings}/>
                <Route path="/account" exact component = {Account}/>
            </Routes>
            </Layout>
        </Router>
        </ThemeProvider>
    )
}

export default App