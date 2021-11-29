import React, { useState } from "react";
import WeeklyPlan from "./WeeklyPlan/WeeklyPlan";
import { CircularProgress, Button, Backdrop, Box } from "@mui/material";
import { useSelector } from "react-redux";
import Form from "../Form/form";

 
const WeeklyPlans = ({ setCurrentId, currentId }) => {
  //States
  const weeklyPlans = useSelector((state) => state.weeklyPlans);
  const [open, setOpen] = useState(false);

  //functions
  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
    
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleToggle} sx={{ mr: 15, mt: 5, mb: 5, borderRadius: "10px", background:'primary'  }}>
          Create Plan
        </Button>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
       >
        <Form setCurrentId={setCurrentId}  currentId={currentId} handleBackdropClose={handleClose}/>
      </Backdrop>

      {!weeklyPlans.length? (
        <Box
          sx={{
            height: "100%", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        weeklyPlans.map((weeklyPlan, index) => (

        <WeeklyPlan key={index} weeklyPlan={weeklyPlan} setCurrentId={setCurrentId}/>

        ))
      )}
    </>
  );
};

export default WeeklyPlans;
