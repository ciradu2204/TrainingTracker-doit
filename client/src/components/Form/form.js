import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import CreatePlan from "./createPlan";
import AddGoal from "./addGoals";
import { Paper } from "@mui/material";
import StepLabel from "@mui/material/StepLabel";
import { makeStyles } from "@mui/styles";
import {useDispatch} from "react-redux"
import {createWeeklyPlans} from "../../actions/weeklyPlans"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    height: "70%",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    height: "100%",
  },
}));

const Form2 = ({handleBackdropClose}) => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch(); 

  const [weeklyPlanData, setweeklyPlanData] = useState({
    weeklyPlanName: "",
    startDate: null,
    endDate: null,
    repeat: "None",
    description: "",
    completedGoals: 0,
    goals: [
      {
        goalName: "",
        date: null,
        time: null,
        target: { label: "Times", value: 0 },
        achieved: { label: "Times", value: 0 },
      }
    ]
  });

  // provide the different steps
  const getSteps = () => {
    return ["Create weekly Plan", "Add Goals"];
  };

  const steps = getSteps();

  //get each step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CreatePlan nextStep={nextStep}  data={weeklyPlanData} addDataToParent={addFormData}/>;
      case 1:
        return (
          <AddGoal
            nextStep={nextStep}
            prevStep={prevStep}
            data={weeklyPlanData}
            activeStep={activeStep}
            addDataToParent={addFormData}
          />
        );
      default:
        return <h1>No Steps remaning</h1>;
    }
  };

  const addFormData = (formData) => {
        setweeklyPlanData({...formData});
  } 

  const nextStep =  () => {
     if (activeStep < 1) {
      setActiveStep((currentStep) => currentStep + 1);
    }else{
      dispatch(createWeeklyPlans(weeklyPlanData))
      handleBackdropClose(); 
    }
   };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  };

  

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Stepper activeStep={activeStep} sx={{ p: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <div>All steps completed</div>
      ) : (
        <div className={classes.container}>{getStepContent(activeStep)}</div>
      )}
    </Paper>
  );
};

export default Form2;
