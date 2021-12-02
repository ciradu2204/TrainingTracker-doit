import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AdapterMoment from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { Grid } from "@mui/material";

const CreatePlan = ({ nextStep, data, addDataToParent, currentId }) => {
  const [formData, setFormData] = useState({ ...data });
  const [errors, setErrors] = useState({});
  const useStyles = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
        height: "100%",
        marginLeft: "20px",
        marginRight: "20px",
        flexDirection: "Column",
      },
    };
  });

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const handleValidation = () => {
    let temp = {};
    temp.weeklyPlanName =
      formData.weeklyPlanName.length > 0 ? "" : "This field is required";
    temp.startDate =
      formData.startDate !== null ? "" : "This field is required";

    /** Use moment to calculate the date difference */
    var momentEndDate = moment(formData.endDate, "YYYY-MM-DD");
    var momentStartDate = moment(formData.startDate, "YYYY-MM-DD");
    if (formData.endDate == null) {
      temp.endDate = "This field is required";
    } else if (momentEndDate.diff(momentStartDate, "days") !== 7) {
      console.log(momentEndDate.diff(momentStartDate, "days"));
      temp.endDate =
        "The diff between start date and end date should be 7 days";
    } else {
      temp.endDate = "";
    }

    if (formData.description.length < 50) {
      temp.description = "A description should be 50 characters min ";
    } else if (formData.description.length < 100) {
      temp.description = "A description should be 100 characters max ";
    } else {
      temp.description = "";
    }

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      addDataToParent(formData);
      nextStep();
    }
  };

  const classes = useStyles();
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item >
          <TextField
            id="Weekly Plan Name"
            label="Weekly Plan Name"
            variant="outlined"
            error={!!errors.weeklyPlanName}
            helperText={errors.weeklyPlanName}
            fullWidth
            value={formData.weeklyPlanName}
            onChange={(e) =>
              setFormData({
                ...formData,
                weeklyPlanName: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item container direction="row"  justifyContent="space-between">
          <Grid item xs={5}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                disablePast={currentId ? false : true}
                label="Start Date"
                openTo="year"
                value={formData.startDate}
                onChange={(newValue) =>
                  setFormData({
                    ...formData,
                    startDate: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={5} sx={{display: "flex", justifyContent: "flex-end"}}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                disablePast={currentId ? false : true}
                label="End Date"
                openTo="year"
                value={formData.endDate}
                onChange={(newValue) =>
                  setFormData({
                    ...formData,
                    endDate: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid item>
          <FormControl required sx={{ width: "40%", mb: 2 }}>
            <InputLabel id="repeat-select">Repeat </InputLabel>
            <Select
              labelId="repeat-select"
              id="repeat-select"
              value={formData.repeat}
              label="Repeat"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  repeat: e.target.value,
                })
              }
            >
              <MenuItem value="None">None </MenuItem>
              <MenuItem value="This Week">This Week</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Bi-weekly">Bi-weekly</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <TextField
            placeholder="Enter a small description about your plan"
            multiline
            fullWidth
            error={!!errors.description}
            helperText={errors.description}
            label="Description"
            aria-label="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            rows={2}
            rowsmax={4}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          height: "inherit",
          mx: "10px",
          my: "20px",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<NavigateNextIcon />}
        >
          Add Goals
        </Button>
      </Box>
    </form>
  );
};

export default CreatePlan;
