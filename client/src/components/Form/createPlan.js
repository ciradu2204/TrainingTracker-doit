import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import AdapterMoment from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { makeStyles } from "@mui/styles";

const CreatePlan = () => {
  const [firstStepFormData, setFirstStepFormDate] = useState({
    weeklyPlanName: "",
    startDate: null,
    endDate: null,
    repeat: "",
    description: "",
  });

  const useStyles = makeStyles((theme) => ({

    root: {
      width: 1200,
    }
  }))

  const classes = useStyles()
  return (
    <div className={classes.root}>
      {/* Weekly plan name */}
      <Box sx={{ flexDirection: "row", mb: 2 }}>
        <TextField
          required
          id="Weekly Plan Name"
          label="Weekly Plan Name"
          variant="outlined"
          fullWidth
          value={firstStepFormData.weeklyPlanName}
          onChange={(e) =>
            setFirstStepFormDate({
              ...firstStepFormData,
              weeklyPlanName: e.target.value,
            })
          }
        />
      </Box>
      {/* Date pickker */}

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
        >
          <DatePicker
            label="Start Date"
            openTo="year"
            views={["year", "month", "day"]}
            value={firstStepFormData.startDate}
            onChange={(newValue) =>
              setFirstStepFormDate({
                ...firstStepFormData,
                startDate: newValue,
              })
             }
            renderInput={(params) => <TextField {...params} />}
          />

          <DatePicker
            label="End Date"
            openTo="year"
            views={["year", "month", "day"]}
            value={firstStepFormData.endDate}
            onChange={(newValue) =>
              setFirstStepFormDate({
                ...firstStepFormData,
                endDate: newValue,
              })
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </LocalizationProvider>

      {/* Select */}

         <FormControl required  sx={{width:'40%', mb: 2 }}>
          <InputLabel id="repeat-select">Repeat </InputLabel>
          <Select
            labelId="repeat-select"
            id="repeat-select"
            value={firstStepFormData.repeat}
            label="Repeat"
            onChange={(e) =>
              setFirstStepFormDate({
                ...firstStepFormData,
                repeat: e.target.value,
              })
            }
          >
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Bi-weekly">Bi-weekly</MenuItem>
          </Select>
        </FormControl>
      {/* TextArea */}
      <Box sx={{ flexDirection: "row", mb: 2 }}>
        <TextField
          placeholder="Enter a small description about your plan"
          multiline
          fullWidth
          label="Description"
          aria-label="description"
          value={firstStepFormData.description}
          onChange={(e) =>
            setFirstStepFormDate({
              ...firstStepFormData,
              description: e.target.value,
            })
          }
          rows={2}
          rowsmax={4}
        />
      </Box>
    </div>
  );
};

export default CreatePlan;
