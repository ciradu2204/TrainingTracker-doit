import React from "react";
import { Grid, ListItem } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { FormControl, InputLabel } from "@mui/material";
import { IconButton } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useStyles from "../style";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Typography } from "@mui/material";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import {signin} from '../../../actions/auth.js';
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { useLocation } from 'react-router-dom'

const Login = () => {
  const [formData, setformData] = React.useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation()

  const handleSubmit = (e) =>{
      e.preventDefault()
      dispatch((signin(formData, navigate, state?.path)))
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const auth = useSelector((state) => state.auth);


  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setformData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate(state?.path || "/dashboard/weeklyPlans")
    } catch (error) {
      console.log(error);
    }
   };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Failured to register with using google, try again");
  };

  return (
    <form onSubmit={handleSubmit}>
    <Grid item container direction="column" xs={12} alignItems="center">
      <Grid item xs={12} className={classes.item}>
        <GoogleLogin
          clientId="323302714008-72omnas7l9om3tohet731hmqv00k2oue.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign In with google
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
      </Grid>

      <Grid item>
        <Typography sx={{ mt: "20px" }}>Or</Typography>
      </Grid>
      <Grid item xs={12} className={classes.item}>
        <TextField
          label="Email"
          required
          id="email-textField"
          fullWidth
          onChange={handleChange("email")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} className={classes.item}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            required
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Grid>

      <Grid item className={classes.forgotPassword}>
        <ListItem>Forgot Password?</ListItem>
      </Grid>
      <Grid item sx={{mt: 2}} className={classes.item}>
          {auth.signInErrors?.response?(<Alert severity="error" variant="outlined" sx={{textAlign: "center"}} >
            {auth.signInErrors?.response.data.message}
           </Alert>): null}
        </Grid>
      <Grid item className={classes.buttonContainer}>
        <Button type="submit" variant="contained" sx={{ width: "20ch" }}>
          Sign in
        </Button>
      </Grid>
    </Grid>
    </form>
  );
};

export default Login;
