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
import AdapterMoment from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CreatePlan = () => {
  const [firstStepFormData, setFirstStepFormDate] = useState({
    weeklyPlanName: "",
    start_Date: null,
    end_Date: null,
    repeat: "",
    description: "",
  });

  return (
    <div style={{ width: '600px' }}>
      {/* Weekly plan name */}
      <Box sx={{ flexDirection: "row", mb: 2 }}>
        <TextField
          required
          id="Weekly Plan Name"
          label="Weekly Plan Name"
          variant="outlined"
          fullWidth
          value={firstStepFormData.weeklyPlanName}
          onchange={(e) =>
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
            value={firstStepFormData.start_Date}
            onChange={(e) =>
              setFirstStepFormDate({
                ...firstStepFormData,
                start_Date: e.target.value,
              })
            }
            renderInput={(params) => <TextField {...params} />}
          />

          <DatePicker
            label="End Date"
            openTo="year"
            views={["year", "month", "day"]}
            value={firstStepFormData.end_Date}
            onChange={(e) =>
              setFirstStepFormDate({
                ...firstStepFormData,
                start_Date: e.target.value,
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
            onchange={(e) =>
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
          onchange={(e) =>
            setFirstStepFormDate({
              ...firstStepFormData,
              description: e.target.value,
            })
          }
          rows={2}
          rowsMax={4}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }} >
        <Button variant="contained" endIcon={<NavigateNextIcon />}>
          Add Goals
        </Button>
      </Box>
    </div>
  );
};

export default CreatePlan;
