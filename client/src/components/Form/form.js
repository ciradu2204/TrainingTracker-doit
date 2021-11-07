import { React, useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  createWeeklyPlans,
  updateWeeklyPlans,
} from "../../actions/weeklyPlans";
import { useSelector } from "react-redux";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [weeklyPlanData, setweeklyPlanData] = useState({
    title: "",
    target: "",
    achieved: "",
  });

  const weeklyPlan = useSelector((state) =>
    currentId
      ? state.weeklyPlans.find((weeklyPlan) => weeklyPlan._id === currentId)
      : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateWeeklyPlans(currentId, weeklyPlanData));
    } else {
      dispatch(createWeeklyPlans(weeklyPlanData));
    }
    
    clear();
  };

  const clear = () => {
      setCurrentId(null); 
      setweeklyPlanData({title:"", target: "", achieved: ""});
  };

  useEffect(() => {
    if (weeklyPlan) setweeklyPlanData(weeklyPlan);
  }, [weeklyPlan]);

  return (
    <Paper>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId? 'Editing': 'Creating'} </Typography>
        <TextField
          name="title"
          variant="outlined"
          sx={{ my: 2 }}
          label="title"
          fullWidth
          value={weeklyPlanData.title}
          onChange={(e) =>
            setweeklyPlanData({ ...weeklyPlanData, title: e.target.value })
          }
        />
        <TextField
          name="target"
          variant="outlined"
          sx={{ my: 2 }}
          label="target"
          fullWidth
          value={weeklyPlanData.target}
          onChange={(e) =>
            setweeklyPlanData({ ...weeklyPlanData, target: e.target.value })
          }
        />
        <TextField
          name="achieved"
          variant="outlined"
          sx={{ my: 2 }}
          label="achieved"
          fullWidth
          value={weeklyPlanData.achieved}
          onChange={(e) =>
            setweeklyPlanData({ ...weeklyPlanData, achieved: e.target.value })
          }
        />
        <Button
          variant="container"
          style={{ background: "#7A6AB8", color: "white" }}
          size="large"
          type="submit"
          sx={{ my: 2 }}
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="container"
          style={{ background: "#7A6AB8", color: "white" }}
          size="small"
          onClick={clear}
          sx={{ my: 2 }}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
