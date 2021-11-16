import React, {useState} from "react";
import Stepper from "@mui/material/Stepper"; 
import Step from "@mui/material/Step"; 
import CreatePlan from "./createPlan";
import Box from "@mui/material/Box";
import AddGoal from "./addGoals";
import {  Paper } from "@mui/material";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button"

const  Form2 = () => {

    const [activeStep, setActiveStep] = useState(0); 

    const [weeklyPlanData, setweeklyPlanData] = useState({
        step: 1, 
        weeklyPlanName: "",
        startDate: null,
        endDate: null, 
        repeat: '' , 
        description: '',
    });

    // provide the different steps
    const getSteps =  ()  =>  {
        return ["Create weekly Plan", "Add Goals"];
    }
    const steps = getSteps(); 

    //get each step content
    const getStepContent = (step) => {

        switch(step){
            case 0: 
            return <CreatePlan/>
            case 1: 
             return <AddGoal/>
            default: 
              return <h1>No Steps remaning</h1>
        }

    }

    const nextStep = () => {
        if(activeStep < 1){
            setActiveStep((currentStep) => currentStep + 1); 
        }
    }

    const prevStep =  () => {

        if(activeStep > 0){
            setActiveStep((currentStep) => currentStep - 1); 

        }
    }

    const handleChange = (e) => {
 
    }
    
  


    return (

        <Paper  sx={{ p: 4}}>
        <Stepper activeStep={activeStep} sx={{p:3}}> 
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
        </Stepper>

        {activeStep === steps.length?(
            <div>
            All steps completed
           </div>
        ): (
           <div>
            {getStepContent(activeStep)}
            <Box sx={{display: 'flex', justifyContent: 'end'}}>
              <Button disabled={activeStep === 0} onClick={prevStep}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={nextStep} >
                {activeStep === steps.length - 1 ? "Finish" : "Add Goals"}
              </Button>
            </Box>
          </div>
 
        )}
        </Paper>

    )



}

export default Form2; 