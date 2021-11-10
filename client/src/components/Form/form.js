import { React, useState, useEffect } from "react";
import {  Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import CreatePlan from "./createPlan.js";
import {
  createWeeklyPlans,
  updateWeeklyPlans,
} from "../../actions/weeklyPlans";
import { useSelector } from "react-redux";
 
const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [weeklyPlanData, setweeklyPlanData] = useState({
    title: "",
    target: "",
    achieved: "",
  });

  const weeklyPlan = useSelector((state) =>
    currentId
      ? state.weeklyPlans.find((weeklyPlan) => weeklyPlan._id === currentId)
      : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateWeeklyPlans(currentId, weeklyPlanData));
    } else {
      dispatch(createWeeklyPlans(weeklyPlanData));
    }
    
    clear();
  };

  const clear = () => {
      setCurrentId(null); 
      setweeklyPlanData({title:"", target: "", achieved: ""});
  };

  useEffect(() => {
    if (weeklyPlan) setweeklyPlanData(weeklyPlan);
  }, [weeklyPlan]);

  return (
    <Paper  sx={{ p: 4}}>
       <CreatePlan/>
    </Paper>
  );
};

export default Form;
