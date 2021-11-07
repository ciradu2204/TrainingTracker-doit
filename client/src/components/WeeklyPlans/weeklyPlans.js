import React from "react";
import WeeklyPlan from "./WeeklyPlan/WeeklyPlan";
import {Grid, CircularProgress} from "@mui/material"; 

import { useSelector } from "react-redux";

const WeeklyPlans = ({setCurrentId}) => {
const  weeklyPlans =  useSelector((state) => state.weeklyPlans)

console.log(weeklyPlans);
    return (
        
        !weeklyPlans.length ? <CircularProgress/> : (

            <Grid>
                {weeklyPlans.map((weeklyPlan) => (

                    <Grid key={weeklyPlan.id} item xs={12} sm={6}>
                         <WeeklyPlan weeklyPlan={weeklyPlan} setCurrentId={setCurrentId}/>
                    </Grid>

                ))}
            </Grid>
        )
    )

}

export default  WeeklyPlans;