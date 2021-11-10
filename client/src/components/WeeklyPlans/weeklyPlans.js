import React, { useState } from "react";
import WeeklyPlan from "./WeeklyPlan/WeeklyPlan";
import { Grid, CircularProgress, Button, Backdrop } from "@mui/material";
import { useSelector } from "react-redux";

const WeeklyPlans = ({ setCurrentId }) => {
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
      <Button onclick={handleToggle}>Create Plan</Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {!weeklyPlans.length ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {weeklyPlans.map((weeklyPlan) => (
            <Grid key={weeklyPlan.id} item xs={12} sm={6} md={12}>
              <WeeklyPlan weeklyPlan={weeklyPlan} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default WeeklyPlans;
