import React, { useState } from "react";
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

const CreatePlan = ({ nextStep, data, addDataToParent }) => {
  const [formData, setFormData] = useState({ ...data });
  const [errors, setErrors] = useState({});

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      height: "100%",
      marginLeft: "20px",
      marginRight: "20px",
      flexDirection: "Column",
    },
  }));

  const handleValidation = () => {
     let temp = {};
    temp.weeklyPlanName =
      formData.weeklyPlanName.length > 0
        ? ""
        : "This field is required";
    temp.startDate =
      formData.startDate !== null ? "" : "This field is required";

    /** Use moment to calculate the date difference */
    var momentEndDate = moment(formData.endDate, "DD-MM-YYYY");
    var momentStartDate = moment(formData.startDate, "DD-MM-YYYY");
    console.log(momentEndDate.diff(momentStartDate, "days"));
    if (formData.endDate == null) {
      temp.endDate = "This field is required";
    } else if (momentEndDate.diff(momentStartDate, "days") !== 7) {
      temp.endDate =
        "The diff between start date and end date should be 7 days";
    } else {
      temp.endDate = "";
    }

    temp.description =
      formData.description.length > 30
        ? ""
        : "A description should be 30 characters min";

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
      {/* Weekly plan name */}
      <Box sx={{ flexDirection: "row", mb: 2 }}>
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
      </Box>
      {/* Date pickker */}

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <DatePicker
            disablePast
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

          <DatePicker
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
        </Box>
      </LocalizationProvider>

      {/* Select */}

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
      {/* TextArea */}
      <Box sx={{ flexDirection: "row", mb: 2 }}>
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
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "inherit",
          pb: "10px",
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
