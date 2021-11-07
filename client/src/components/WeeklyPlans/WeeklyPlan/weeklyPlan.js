import React from "react";
import {Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material"; 
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({

    card:{
        display: 'flex',
        padding: 20
    }

}))

const WeeklyPlan = ({weeklyPlan}) => {
    const classes = useStyles();

    return (
        <Card  className={classes.card} >
            <Typography variant="h5" sx={{ m: 2 }}>{weeklyPlan.title}</Typography>
            <Typography variant="h6" sx={{ m: 2 }}>Target: {weeklyPlan.target}</Typography>
            <Typography variant="h6" sx={{ m: 2 }}>Achieved: {weeklyPlan.target}</Typography>
            <Button size="small" color="primary" onClick={() => {} }>
                <DeleteOutlineOutlinedIcon fontSize="default"/>
            </Button>
            <Button style={{color:"black"}} size="small" onClick={() => {}}>
            <MoreVertOutlinedIcon fontSize="default"/>
            </Button>

        </Card>
    )

}

export default  WeeklyPlan;