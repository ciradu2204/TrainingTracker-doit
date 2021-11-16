import React, { useState } from "react";
import TimePicker from "@mui/lab/TimePicker";
import AdapterMoment from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import { InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
  
const useStyles = makeStyles((theme) => ({

  root : {
      '& .MuiTextField-root': {
        margin: theme.spacing(2), 
        width: 200,
        position:'relative'

      }
  }, 
  container: {
    display: "flex !important",
    flexDirection: "row",
    gap: "3px",
  },
  select: {
    position: "absolute",
    right: "-15px",
  },
}));

const AddGoal = () => {
  const [addGoalFields, setAddGoalFields] = useState([
    {
      goalName: "",
      date: "",
      time: null,
      target: { label: "Times", value: null },
      achieved: { label: "Times", value: null },
    }
  ]);

 const handleChange = (index, event) =>{
     console.log(index, event)
    const values = [...addGoalFields]
    values[index][event.target.name] = event.target.value; 
    setAddGoalFields(values)
 }
  const classes = useStyles();
  return (
    <form className={classes.root}>
      {addGoalFields.map((addGoalField, index) => (
        <div key={index} className={classes.container}>
          <TextField
            required
            id="Goal Name"
            label="Goal Name"
            variant="outlined"
            fullWidth
            name="goalName"
            value={addGoalField.goalName}
            onChange= {e => handleChange(index, e)}
          />

          {/* Time picker and date picker  */}

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Date for the goal"
              openTo="year"
              views={["year", "month", "day"]}
              value={addGoalFields.date}
              name="date"
              onChange= {e => handleChange(index, e)}
              
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
              label="Time Picker"
              name="Time"
              value={addGoalField.time}
              renderInput={(params) => <TextField {...params} />}
              onChange= {e => handleChange(index, e)}

            />
          </LocalizationProvider>

          {/* The target and achieved  */}

          <TextField
            value={addGoalField.target.value}
            name="text"
            id="Target"
            onChange={ (e) =>
                setAddGoalFields([{
                    ...addGoalFields,
                    label: e.target.value,
                  }])
            }
            label="Target"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Select
                    className={classes.select}
                    value={addGoalField.target.label}
                    name="suffix"
                    onChange= {e => handleChange(index, e)}
                  >
                    <MenuItem key="Times" value="Times">
                      Times
                    </MenuItem>
                    <MenuItem key="Minutes" value="Minutes">
                      Minutes
                    </MenuItem>
                  </Select>
                </InputAdornment>
              )           
             }}
          />

          <TextField
            value={addGoalField.achieved.value}
            name="text"
            id="Achieved"
            label="Achieved"
            onChange= {e => handleChange(index, e)}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Select
                    className={classes.select}
                    value={addGoalField.achieved.label}
                    name="suffix"
                    onChange= {e => handleChange(index, e)}
                  >
                    <MenuItem key="Times" value="Times">
                      Times
                    </MenuItem>
                    <MenuItem key="Minutes" value="Minutes">
                      Minutes
                    </MenuItem>
                  </Select>
                </InputAdornment>
              )
            }}
          />
        </div>
      ))}
    </form>
  );
};

export default AddGoal;
