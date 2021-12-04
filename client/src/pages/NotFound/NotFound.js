import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
 
const NotFound = () => {
    const navigate = useNavigate()
    const Login = () =>{
        navigate("/");
    }
    return (
     <Grid container alignItems="center" direction="column" justifyContent="center" sx={{height:"100vh"}} >
 
             <Grid item>
            <Typography variant="h3">Page Not Found</Typography>

            </Grid>
            <Grid item>
            <Typography variant="subtitle1">We can't find the page you are looking for. Please return back to the Login Page </Typography>

            </Grid>
            <Grid item >
            <Button startIcon={<KeyboardBackspaceIcon />} sx={{mt: 2}} variant="contained" onClick={() => Login()}> Return to Login</Button>

            </Grid>
 
     </Grid>
    )
}

export default NotFound
