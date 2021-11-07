import React from "react";
import {Card, Button, Typography } from "@mui/material"; 
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({

    card:{
        display: 'flex',
        padding: 20
    }

}))

const WeeklyPlan = ({weeklyPlan, setCurrentId}) => {
    const classes = useStyles();

    return (
        <Card  className={classes.card} >
            <Typography variant="h5" sx={{ m: 2 }}>{weeklyPlan.title}</Typography>
            <Typography variant="h6" sx={{ m: 2 }}>Target: {weeklyPlan.target}</Typography>
            <Typography variant="h6" sx={{ m: 2 }}>Achieved: {weeklyPlan.achieved}</Typography>
            <Button size="small" color="primary" onClick={() => {} }>
                <DeleteOutlineOutlinedIcon fontSize="default"/>
            </Button>
            <Button style={{color:"black"}} size="small" onClick={() => {setCurrentId(weeklyPlan._id)}}>
            <ModeEditOutlineOutlinedIcon fontSize="default"/>
            </Button>

        </Card>
    )

}

export default  WeeklyPlan;