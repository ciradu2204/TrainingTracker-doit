import React, { useState } from "react";
import TimePicker from "@mui/lab/TimePicker";
import AdapterMoment from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment";
import TextField from "@mui/material/TextField";
import { InputAdornment, Box } from "@mui/material";
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
      position: "relative",
    },
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  select: {
    position: "absolute",
    right: "-15px",
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

const AddGoal = ({ activeStep, prevStep, nextStep, data, addDataToParent }) => {
  const initial = {
    goalName: "",
    date: null,
    time: null,
    target: { label: "Times", value: 0 },
    achieved: { label: "Times", value: 0 },
  };
  const [formData, setFormData] = useState({...data});

  const [errors, setErrors] = useState({});

  const handleTime = (index, time) => {
    const values = [...formData.goals];
    values[index]["time"] = time;
    setFormData({...formData, goals: values});
  };

  const handleDate = (index, date2) => {
    const values = [...formData.goals];
    values[index]["date"] = date2;
    setFormData({...formData, goals: values});
  };

  const handleValidation = () => {
    const prefix = formData.goals[formData.goals.length - 1];
    let temp = {};
    temp.goalName = prefix.goalName.length > 0 ? "" : "This field is required";
    
    // Check if the date is in the weekly plan date range
    const compareDate = moment(prefix.date, "DD/MM/YYYY");  
    const startDate = moment(formData.startDate, "DD/MM/YYYY");  
    const endDate = moment(formData.endDate, "DD/MM/YYYY");  
    const isBetween = compareDate.isBetween(startDate, endDate)  

    if(prefix.date == null){
      temp.date = "This field is required"
    }else if(!isBetween){
      temp.date = `The date needs to be between ${formData.startDate} and ${formData.endDate} `
    }else{
      temp.date = ""
    }
    
    temp.time = prefix.time !== null ? "" : "This field is required";
    temp.target = prefix.target.value > 0 ? "" : "This field is required";
    temp.achieved =
      prefix.achieved.value > prefix.target.value || prefix.achieved.value < 0
        ? "Invalid number"
        : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleAddFields = () => {
    const result = handleValidation();
    if (result) {
      setFormData({...formData, goals: [...formData.goals, initial]});
      addDataToParent(formData);
    }
  };
  const inputardoment = (index, addGoalField) => {
    return (
      <Select
        className={classes.select}
        value={addGoalField.achieved.label}
        name="Measures"
        onChange={(e) => handleMeasurements(index, "all", "label", e)}
      >
        <MenuItem key="Times" value="Times">
          Times
        </MenuItem>
        <MenuItem key="Min" value="Min">
          Mins
        </MenuItem>
      </Select>
    );
  };
  const handleDeleteFields = (index) => {
    const values = [...formData.goals];
    values.splice(index, 1);
    setFormData({...formData, goals: values});
  };

  const handleMeasurements = (index, target2, attribute, e) => {
    const values = [...formData.goals];
    if (target2 === "all") {
      values[index]["target"][attribute] = e.target.value;
      values[index]["achieved"][attribute] = e.target.value;
    } else {
      values[index][target2][attribute] = e.target.value;
    }
    setFormData({...formData, goals:values});
  };

  const handleChange = (index, e) => {
    const values = [...formData.goals];
    values[index][e.target.name] = e.target.value;
    setFormData({...formData, goals: values});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation() && formData.goals.length > 2) {
       addDataToParent(formData);
       nextStep();

    } else {
      let maxAddedGoals =
        formData.goals.length > 2 ? "" : "You need to add at least 3 goals";
      setErrors({ ...errors, maxAddedGoals });
    }
  };

  const classes = useStyles();
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <span className={classes.error}>{errors.maxAddedGoals}</span>
      {formData.goals && formData.goals.map((addGoalField, index) => (
        <div key={index} className={classes.container}>
          <TextField
            id="Goal Name"
            label="Goal Name"
            variant="outlined"
            name="goalName"
            value={addGoalField.goalName}
            error={
              index === formData.goals.length - 1 ? !!errors.goalName : false
            }
            helperText={
              index === formData.goals.length - 1 ? errors.goalName : ""
            }
            onChange={(e) => handleChange(index, e)}
          />

          {/* Time picker and date picker  */}

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              disablePast
              label="Date"
              openTo="year"
              value={addGoalField.date}
              name="date"
              onChange={(e) => handleDate(index, e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={
                    index === formData.goals.length - 1 ? errors.date : null
                  }
                  helperText={
                    index === formData.goals.length - 1 ? errors.date : ""
                  }
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
                  error={
                    index === formData.goals.length - 1 ? !!errors.time : null
                  }
                  helperText={
                    index === formData.goals.length - 1 ? errors.time : null
                  }
                />
              )}
              onChange={(e) => handleTime(index, e)}
            />
          </LocalizationProvider>

          {/* The target and achieved  */}

          <TextField
            value={addGoalField.target.value}
            name="target"
            error={index === formData.goals.length - 1 ? !!errors.target : null}
            helperText={index === formData.goals.length - 1 ? errors.target : ""}
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
            error={
              index === formData.goals.length - 1 ? !!errors.achieved : false
            }
            helperText={
              index === formData.goals.length - 1 ? errors.achieved : ""
            }
            label="Achieved"
            type="number"
            onChange={(e) => handleMeasurements(index, "achieved", "value", e)}
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
