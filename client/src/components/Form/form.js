import React, { useState, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import CreatePlan from "./CreatePlan/createPlan";
import AddGoal from "./AddGoals/addGoals";
import { Paper } from "@mui/material";
import StepLabel from "@mui/material/StepLabel";
import { useDispatch } from "react-redux";
import {
  createWeeklyPlans,
  updateWeeklyPlan,
} from "../../actions/weeklyPlans";
import { useSelector } from "react-redux";
import useStyles from './style';

const Form = ({
  setCurrentId,
  currentId,
  handleBackdropOpen,
  handleBackdropClose,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const [weeklyPlanData, setweeklyPlanData] = useState({
    weeklyPlanName: "",
    startDate: null,
    likeCount: 0,
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
        completed: false,
      },
    ],
  });

  //Fetching a weeklyPlan of the currentId
  const weeklyPlan = useSelector((state) =>
    currentId ? state.weeklyPlans.find((wp) => wp._id === currentId) : null
  );
  // provide the different steps
  const getSteps = () => {
    return ["Create weekly Plan", "Add Goals"];
  };

  useEffect(() => {
    if (weeklyPlan) {
      setweeklyPlanData({ ...weeklyPlan });
    }
  }, [weeklyPlan]);

  const steps = getSteps();

  //get each step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CreatePlan
            nextStep={nextStep}
            data={weeklyPlanData}
            currentId={currentId}
            addDataToParent={addFormData}
          />
        );
      case 1:
        return (
          <AddGoal
            nextStep={nextStep}
            prevStep={prevStep}
            data={weeklyPlanData}
            currentId={currentId}
            activeStep={activeStep}
            addDataToParent={addFormData}
          />
        );
      default:
        return <h1>No Steps remaning</h1>;
    }
  };

  const addFormData = (formData) => {
       setweeklyPlanData({ ...formData });
      return true;
   };

  const handleSubmit = (formData) => {
    if (currentId) {
      dispatch(updateWeeklyPlan(currentId, formData));
      handleBackdropClose();
      setCurrentId(null)
    } else {
      dispatch(createWeeklyPlans(formData));
      handleBackdropClose();
    }
  };

  const nextStep = (formData) => {
    if (activeStep < 1) {
      setActiveStep((currentStep) => currentStep + 1);
    } else {
      handleSubmit(formData);
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
      <Stepper activeStep={activeStep} sx={{ my: 3, mx:1, position: "sticky", top: "0", background:"white", zIndex: 3, height: "40px", py: "10px"}}>
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

export default Form;
