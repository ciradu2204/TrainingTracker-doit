import React, { useState, useEffect } from "react";
import TimePicker from "@mui/lab/TimePicker";
import AdapterMoment from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment";
import TextField from "@mui/material/TextField";
import { InputAdornment, Box, FormControl } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    marginLeft: "20px",
    marginRight: "20px",
    flexDirection: "Column",
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
     },
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
 
  cancelButton: {
    width: "fit-content",
    height: "fit-content",
    display: "flex",
  },
  cancelButtonContainer: {
    maxHeight: "80px",
    display: "flex",
    alignItems: "center",
  },
  error: {
    color: theme.palette.error.main,
    marginLeft: "20px",
  },
 
}));

const AddGoal = ({
  activeStep,
  prevStep,
  nextStep,
  data,
  addDataToParent,
  currentId,
}) => {
  const initial = {
    goalName: "",
    date: null,
    time: null,
    target: { label: "Times", value: 0 },
    achieved: { label: "Times", value: 0 },
  };
  const [formData, setFormData] = useState({ ...data });

  const [errors, setErrors] = useState([]);

  const handleTime = (index, time) => {
    const values = [...formData.goals];
    values[index]["time"] = time;
    setFormData({ ...formData, goals: values });
  };


  const handleDate = (index, date2) => {
    const values = [...formData.goals];
    values[index]["date"] = date2;
    setFormData({ ...formData, goals: values });
    addDataToParent(formData)
  };

  const handleValidation = () => {
    let temp = [];
    // Loop through each goal
    for (var i = 0; i < formData.goals.length; i++) {
      const prefix = formData.goals[i];
      let error = {};
      error.goalName =
        prefix.goalName.length > 0 ? "" : "This field is required";

      // Check if the date is in the weekly plan date range
      const compareDate = moment(prefix.date, "YYYY-MM-DD");
      const startDate = moment(formData.startDate, "YYYY-MM-DD").subtract(1, 'days');
      const endDate = moment(formData.endDate, "YYYY-MM-DD").add(1, 'days');
      const isBetween = compareDate.isBetween(startDate, endDate);
      if (prefix.date == null) {
        error.date = "This field is required";
      } else if (isBetween === false) {
        error.date = `The date should be between ${startDate.format( "MMM Do YYYY")}  and ${endDate.format("MMM Do YYYY")} `;
      } else {
        error.date = "";
      }

      error.time = prefix.time !== null ? "" : "This field is required";
      error.target = prefix.target.value > 0 ? "" : "This field is required";
      error.achieved =
        prefix.achieved.value > prefix.target.value || prefix.achieved.value < 0
          ? "Invalid number"
          : "";
      temp.push(error);
    }

    setErrors([...temp]);
    return temp.every((el) => {
      return (
        el.goalName === "" &&
        el.date === "" &&
        el.time === "" &&
        el.target === "" &&
        el.achieved === ""
      );
    });
  };

  const handleAddFields = () => {
    const result = handleValidation();

    if (result === true) {
      setFormData({ ...formData, goals: [...formData.goals, initial] });
      addDataToParent(formData)
    }
  };

  const inputardoment = (index, addGoalField) => {
    return (
      <FormControl  variant="standard">
      <Select
        value={addGoalField.achieved.label}
        name="Measures"
        disableUnderline
        onChange={(e) => handleMeasurements(index, "all", "label", e)}
      >
        <MenuItem key="Times" value="Times">
          Times
        </MenuItem>
        <MenuItem key="Min" value="Min">
          Mins
        </MenuItem>
      </Select>
      </FormControl>
    );
  };
  const handleDeleteFields = (index) => {
    const values = [...formData.goals];
    values.splice(index, 1);
    setFormData({ ...formData, goals: values });
  };

  const handleMeasurements = (index, target2, attribute, e) => {
    const values = [...formData.goals];
    if (target2 === "all") {
      values[index]["target"][attribute] = e.target.value;
      values[index]["achieved"][attribute] = e.target.value;
    } else {
      values[index][target2][attribute] = e.target.value;
    }
    setFormData({ ...formData, goals: values });
  };

  const handleChange = (index, e) => {
    const values = [...formData.goals];
    values[index][e.target.name] = e.target.value;
    setFormData({ ...formData, goals: values });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = handleValidation();
    if (result === true && formData.goals.length > 2) {
      addDataToParent(formData);
      nextStep(formData);
    } else {
      let maxAddedGoals =
      formData.goals.length > 2 ? "" : "You need to add at least 3 goals";
      setErrors([...errors, maxAddedGoals ]);
    }
  };

  const classes = useStyles();
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <span className={classes.error}>{errors.maxAddedGoals}</span>
      {formData.goals &&
        formData.goals.map((addGoalField, index) => (
          <div key={index} className={classes.container}>
            <TextField
              id="Goal Name"
              label="Goal Name"
              variant="outlined"
              name="goalName"
              value={addGoalField.goalName}
              error={errors.length >= index +1 ? !!errors[index].goalName : false}
              helperText={errors.length >= index + 1 ? errors[index].goalName : ""}
              onChange={(e) => handleChange(index, e)}
            />

            {/* Time picker and date picker  */}

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                disablePast={currentId ? false : true}
                label="Date"
                openTo="year"
                value={addGoalField.date}
                name="date"
                onChange={(e) => handleDate(index, e)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={errors.length >= index + 1 ? !!errors[index].date : false}
                    helperText={errors.length >= index + 1 ? errors[index].date : ""}
                  />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                label="Time"
                name="Time"
                value={addGoalField.time}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={errors.length >= index + 1 ? !!errors[index].time : false}
                    helperText={errors.length >= index + 1 ? errors[index].time : null}
                  />
                )}
                onChange={(e) => handleTime(index, e)}
              />
            </LocalizationProvider>

            {/* The target and achieved  */}

            <TextField
              value={addGoalField.target.value}
              name="target"
              error={errors.length >= index + 1? !!errors[index].target : false}
              helperText={errors.length >= index + 1 ? errors[index].target : ""}
              className={classes.numberInput}
              id="Target"
              type="number"
              onChange={(e) => handleMeasurements(index, "target", "value", e)}
              label="Target"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {inputardoment(index, addGoalField)}
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              value={addGoalField.achieved.value}
              name="Achieved"
              id="Achieved"
              error={errors.length >= index + 1 ? !!errors[index].achieved : false}
              helperText={errors.length >= index + 1 ? errors[index].achieved : ""}
              label="Achieved"
              type="number"
              onChange={(e) =>
                handleMeasurements(index, "achieved", "value", e)
              }
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {inputardoment(index, addGoalField)}
                  </InputAdornment>
                ),
              }}
            />
            <div className={classes.cancelButtonContainer}>
              <IconButton
                aria-label="delete"
                size="medium"
                color="primary"
                className={classes.cancelButton}
                onClick={() => handleDeleteFields(index)}
              >
                <CancelOutlinedIcon fontSize="medium" />
              </IconButton>
            </div>
          </div>
        ))}

      <div>
        <Button
          variant="contained"
          size="medium"
          sx={{ m: 2 }}
          onClick={() => handleAddFields()}
        >
          Add
        </Button>
      </div>
      <Box
        sx={{
          display: "flex",
          height: "inherit",
          pb: "10px",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <Button disabled={activeStep === 0} onClick={prevStep}>
          Back
        </Button>
        <Button variant="contained" color="primary" type="Submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AddGoal;
