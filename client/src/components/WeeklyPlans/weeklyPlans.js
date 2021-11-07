import React from "react";
import WeeklyPlan from "./WeeklyPlan/WeeklyPlan";
import { useSelector } from "react-redux";
import Form from "../Form/Form";

const WeeklyPlans = () => {
const  weeklyPlans =  useSelector((state) => state.weeklyPlans)

console.log(weeklyPlans);
    return (
        <>
        <Form/>
        <h1 >WeeklyPlans</h1>
        <WeeklyPlan/>
        </>
    )

}

export default  WeeklyPlans;