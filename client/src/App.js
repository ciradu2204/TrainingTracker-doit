import React, {useEffect} from "react";
import { Routes, Route} from "react-router-dom"
import WeeklyPlans from "./components/WeeklyPlans/WeeklyPlans.js";
import Account from "./components/Account/account";
import Settings from "./components/Settings/settings";
import Login from "./components/UserAuth/login";
import Overview from "./components/Overview/overview"; 
import Layout from "./components/layout";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {BrowserRouter as Router} from 'react-router-dom';
import { useDispatch } from "react-redux";
import {getWeeklyPlans} from "./actions/weeklyPlans"; 
import Form from "./components/Form/Form";



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
    const dispatch  = useDispatch(); 

    useEffect(() => {
        dispatch(getWeeklyPlans())
    }, [dispatch])
    return (
        <ThemeProvider theme={theme}>
            <Router>
            <Layout>
            <Routes>
                <Route path="/" exact element={<Login/>} />
                <Route path="/overview"  element={<Overview/>}/>
                <Route path="/weeklyPlans" element={<WeeklyPlans/>}/>
                <Route path="/settings"  element={<Settings/>}/>
                <Route path="/account"  element={<Account/>}/>
                <Route path="/createPlan" element={<Form />}/>
            </Routes>
            </Layout>
            </Router>
        </ThemeProvider>
    )
}

export default App