import React, { useState } from "react";
import WeeklyPlan from "./WeeklyPlan/WeeklyPlan";
import Grid from "@mui/material/Grid";
import {
  CircularProgress,
  Button,
  Backdrop,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import Form from "../Form/form";
import moment from "moment";
import EventIcon from "@mui/icons-material/Event";
import useStyles from "./style"

const WeeklyPlans = ({ setCurrentId, currentId }) => {
  //States
  const weeklyPlans = useSelector((state) => state.weeklyPlans);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  //functions
  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const findPeriod = (date, period) => {
    const planStartDate = moment(date, "YYYY-MM-DD");
    const startDate = moment().startOf("week");
    const endDate = moment().endOf("week");

    if (period === "week") {
      return planStartDate.isBetween(startDate, endDate);
    } else if (period === "upcoming") {
      return planStartDate.isAfter(endDate);
    } else if (period === "past") {
      return planStartDate.isBefore(startDate);
    }
  };
  return (
    <>
      <Grid container direction="column" className={classes.createButtonContainer}>
        <Grid item className={classes.item}>
          <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
            <Button
              className={classes.createButton}
              variant="contained"
              onClick={handleToggle}
            >
              Create Plan
            </Button>
          </Box>
        </Grid>

        <Grid item>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <Form
              setCurrentId={setCurrentId}
              currentId={currentId}
              handleBackdropClose={handleClose}
            />
          </Backdrop>
        </Grid>
      </Grid>
      {!weeklyPlans.length ? (
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
        <>
          <Grid container direction="column">
            <Grid item className={classes.item}>
              <Typography className={classes.typography}>This Week</Typography>
            </Grid>
            <Grid item className={classes.item}>
              <Divider />
            </Grid>

            <Grid item className={classes.containerWeeklyPlan}>
              {weeklyPlans.filter((weeklyPlan) =>
                findPeriod(weeklyPlan.startDate, "week")
              ).length > 0 ? (
                weeklyPlans
                  .filter((weeklyPlan) =>
                    findPeriod(weeklyPlan.startDate, "week")
                  )
                  .map((weeklyPlan, index) => (
                    <WeeklyPlan
                      key={index}
                      weeklyPlan={weeklyPlan}
                      setCurrentId={setCurrentId}
                      handleBackdropOpen={handleToggle}
                    />
                  ))
              ) : (
                <Grid
                  item
                  container
                  direction="column"
                  className={classes.typographyNoPlans}
                >
                  <Grid item>
                    <EventIcon sx={{ fontSize: 40 }} />
                  </Grid>
                  <Grid item>
                    <Typography>No current plans</Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid container direction="column">
            <Grid item className={classes.item}>
              <Typography className={classes.typography}>Upcoming</Typography>
            </Grid>

            <Grid item className={classes.item}>
              <Divider />
            </Grid>

            <Grid item className={classes.containerWeeklyPlan}>
              {weeklyPlans.filter((weeklyPlan) =>
                findPeriod(weeklyPlan.startDate, "upcoming")
              ).length > 0 ? (
                weeklyPlans
                  .filter((weeklyPlan) =>
                    findPeriod(weeklyPlan.startDate, "upcoming")
                  )
                  .map((weeklyPlan, index) => (
                    <WeeklyPlan
                      key={index}
                      weeklyPlan={weeklyPlan}
                      setCurrentId={setCurrentId}
                      handleBackdropOpen={handleToggle}
                    />
                  ))
              ) : (
                <Grid
                  item
                  container
                  direction="column"
                  className={classes.typographyNoPlans}
                >
                  <Grid item>
                    <EventIcon sx={{ fontSize: 40 }} />
                  </Grid>
                  <Grid item>
                    <Typography>No upcoming plans</Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid container direction="column">
            <Grid item className={classes.item}>
              <Typography className={classes.typography}>Past</Typography>
            </Grid>

            <Grid item className={classes.item}>
              <Divider />
            </Grid>

            <Grid item className={classes.containerWeeklyPlan}>
              {weeklyPlans.filter((weeklyPlan) =>
                findPeriod(weeklyPlan.startDate, "past")
              ).length > 0 ? (
                weeklyPlans
                  .filter((weeklyPlan) =>
                    findPeriod(weeklyPlan.startDate, "past")
                  )
                  .map((weeklyPlan, index) => (
                    <WeeklyPlan
                      key={index}
                      weeklyPlan={weeklyPlan}
                      setCurrentId={setCurrentId}
                      handleBackdropOpen={handleToggle}
                    />
                  ))
              ) : (
                <Grid
                  item
                  container
                  direction="column"
                  className={classes.typographyNoPlans}
                >
                  <Grid item>
                    <EventIcon sx={{ fontSize: 40 }} />
                  </Grid>
                  <Grid item>
                    <Typography>No past plans</Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default WeeklyPlans;
