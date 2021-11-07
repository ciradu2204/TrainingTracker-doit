import {React, useState} from "react";
import {TextField, Button, Typography, Paper} from '@mui/material';
import { useDispatch } from "react-redux";
import {createWeeklyPlans} from "../../actions/weeklyPlans";
 

const Form = () => {

   const dispatch = useDispatch()
   const [weeklyPlanData, setweeklyPlanData] = useState({
       title:'', 
       target: '',
       achieved: '',
      
    
    })

    
    const handleSubmit = (e) =>{
        e.preventDefault()
       dispatch(createWeeklyPlans(weeklyPlanData))
    }

    const clear = () =>{

    }
    return (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>

                  <Typography variant="h6">Creating A goal</Typography>
                  <TextField name="title" variant="outlined" sx={{ my: 2 }} label="title" fullWidth value= {weeklyPlanData.title} onChange= {(e) => setweeklyPlanData({...weeklyPlanData, title: e.target.value})}/>
                  <TextField name="target" variant="outlined" sx={{ my: 2 }} label="target" fullWidth value= {weeklyPlanData.target} onChange= {(e) => setweeklyPlanData({...weeklyPlanData, target: e.target.value})}/>
                  <TextField name="achieved" variant="outlined" sx={{ my: 2 }} label="achieved" fullWidth value= {weeklyPlanData.achieved} onChange= {(e) => setweeklyPlanData({...weeklyPlanData, achieved: e.target.value})}/>
                  <Button variant="container" style={{ background: '#7A6AB8' , color:'white' }} size="large" type="submit" sx={{ my: 2 }} fullWidth>Submit</Button>
                  <Button variant="container" style={{ background: '#7A6AB8' , color:'white' }}  size="small" onClick={clear} sx={{ my: 2 }} fullWidth>Clear</Button>

            </form>

        </Paper>
    )

}

export default Form;
