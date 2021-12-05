import React, { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom"
import { useParams } from "react-router";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {
  addsharedWeeklyPlan,
  getSharedWeeklyPlan,
} from "../../actions/weeklyPlans";
import { useSelector } from "react-redux";
import WeeklyPlan from  "../../components/WeeklyPlan/WeeklyPlan"

const Share = ({handleBackdropOpen, setCurrentId}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { sharedPlan } = useSelector((state) => state.weeklyPlans);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate()
 
  const handleGoBack = () => {
     navigate("/dashboard/weeklyPlans")
  }

  const handleAddToMyPlan = () => {
    dispatch(addsharedWeeklyPlan(id));
    navigate("/dashboard/weeklyPlans")
  }

  useEffect(() => {
    dispatch(getSharedWeeklyPlan(id));
  }, [id, dispatch]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
    >
 
      <Grid item container sx={{ width: "75vw", my:10 }}>
        <Grid item >
           <Typography variant="h5">Shared Weekly Plan </Typography> 
        </Grid>

       <Grid item container>
        
        {sharedPlan?(
        <Grid item>
       <WeeklyPlan weeklyPlan={sharedPlan[0]}  setCurrentId={setCurrentId} handleBackdropOpen={handleBackdropOpen} />

        </Grid>

        ):(

          <Grid item  sx={{height: "200px", width: "100%", display: "flex", flexDirection: "column",  alignItems:"center", justifyContent: "center" }}>

              <ListAltIcon sx={{fontSize: "50px"}}/>
              <Typography  >The plan does not exist or have been deleted!</Typography>

          </Grid>

        )
        }

       </Grid>

        <Grid item sx={{width: "100%", display: "flex", justifyContent:"end", borderRadius:"15px", my:5}}>
        {(sharedPlan && sharedPlan[0].creator !== (user.authData.result._id || user.authData.result.googleId))?(
       <Button variant="contained" onClick={() => handleAddToMyPlan()} >Add it to your Plans</Button>

        ):(
       <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={() => handleGoBack()}>Go back to your plans</Button>

        )}
        </Grid>
      </Grid>

    </Grid>
  );
};
//http://localhost:3000/dashboard/61aa5190def703cb668d9507/shared
export default Share;
