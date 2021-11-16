import React, { useState } from "react";
import WeeklyPlan from "./WeeklyPlan/WeeklyPlan";
import { Grid, CircularProgress, Button, Backdrop, Box } from "@mui/material";
import { useSelector } from "react-redux";
import Form from "../Form/form2";

 
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
        <Button variant="contained" onClick={handleToggle} sx={{ m: 2 }}>
          Create Plan
        </Button>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
       >
        <Form setCurrentId={setCurrentId}  currentId={currentId}/>
      </Backdrop>

      {!weeklyPlans.length ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {weeklyPlans.map((weeklyPlan) => (
            <Grid key={weeklyPlan._id} item xs={12} sm={6} md={12}>
              <WeeklyPlan weeklyPlan={weeklyPlan} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default WeeklyPlans;
