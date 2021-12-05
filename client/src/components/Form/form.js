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
  handleBackdropClose,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const [user] = useState(JSON.parse(localStorage.getItem('profile')))
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
  const myWeeklyPlan = useSelector((state) =>
    currentId ? state.weeklyPlans.myWeeklyPlans.find((wp) => wp._id === currentId) : null
  );
  // provide the different steps
  const getSteps = () => {
    return ["Create weekly Plan", "Add Goals"];
  };

  useEffect(() => {
    if (myWeeklyPlan) {
      setweeklyPlanData({ ...myWeeklyPlan });
    }
  }, [myWeeklyPlan]);

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
      dispatch(updateWeeklyPlan(currentId, {...formData, userName: user?.result?.name}));
      handleBackdropClose();
      setCurrentId(null)
    } else {
      dispatch(createWeeklyPlans({...formData, userName: user?.result?.name}));
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
      <Stepper activeStep={activeStep} sx={{ my: 2, mx:1, position: "sticky", top: "0", background:"white", zIndex: 3, height: "30px", py: "10px"}}>
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
