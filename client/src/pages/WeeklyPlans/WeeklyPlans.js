import React, { useState } from "react";
import WeeklyPlan from "../../components/WeeklyPlan/WeeklyPlan";
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
import Form from "../../components/Form/form";
import moment from "moment";
import { FormControl } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import useStyles from "./style";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";

const WeeklyPlans = ({
  handleToggle,
  handleClose,
  currentId,
  setCurrentId,
  open,
}) => {
  //States
  const { myWeeklyPlans, othersWeeklyPlans } = useSelector(
    (state) => state.weeklyPlans
  );
  const classes = useStyles();
  const [createdBy, setCreatedBy] = useState("me");

  const handleChange = (event) => {
    setCreatedBy(event.target.value);
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

  //create a select button
  //control the value
  // if(value is createdby others) fetch othersweeklyPlan else fetchmyplans
  return (
    <>
      <Grid
        container
        direction="column"
        className={classes.createButtonContainer}
      >
        <Grid item className={classes.item}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              className={classes.createButton}
              variant="contained"
              onClick={handleToggle}
            >
              Create Plan
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "80%",
            my: 2,
          }}
        >
          <FormControl variant="standard" sx={{ minWidth: "100px" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Created By
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={createdBy}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="me">Me</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
          </FormControl>
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


      {(createdBy === "me")?(
       !myWeeklyPlans?(
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
       ):(
        <>
        <Grid container direction="column">
          <Grid item className={classes.item}>
            <Typography className={classes.typography}>This Week</Typography>
          </Grid>
          <Grid item className={classes.item}>
            <Divider />
          </Grid>

          <Grid item className={classes.containerWeeklyPlan}>
            {myWeeklyPlans.filter((weeklyPlan) =>
              findPeriod(weeklyPlan.startDate, "week")
            ).length > 0 ? (
              myWeeklyPlans
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
            {myWeeklyPlans.filter((weeklyPlan) =>
              findPeriod(weeklyPlan.startDate, "upcoming")
            ).length > 0 ? (
              myWeeklyPlans
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
            {myWeeklyPlans.filter((weeklyPlan) =>
              findPeriod(weeklyPlan.startDate, "past")
            ).length > 0 ? (
              myWeeklyPlans
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
       )

      ):(

        !othersWeeklyPlans?(
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
        ):(
          <Grid container direction="column">
          <Grid item className={classes.item}>
            <Typography variant="h4" className={classes.typography}>
              Shared Plans
            </Typography>
          </Grid>

          <Grid item className={classes.item}>
            <Divider />
          </Grid>
          {othersWeeklyPlans.length > 0 ? (
            <Grid item className={classes.item}>
              {othersWeeklyPlans.map((weeklyPlan, index) => (
                <WeeklyPlan
                  key={index}
                  weeklyPlan={weeklyPlan}
                  setCurrentId={setCurrentId}
                  handleBackdropOpen={handleToggle}
                />
              ))}
            </Grid>
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
                <Typography>No shared plans</Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
        )


      )}
     
    </>
  );
};

export default WeeklyPlans;
