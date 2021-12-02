import React, {} from "react";
import { Grid } from "@mui/material";
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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GoogleIcon from "@mui/icons-material/Google";
import { Typography } from "@mui/material";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import {signup} from '../../../actions/auth.js'

 
const Register = () => {
  const [formData, setformData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPasswordShow] = React.useState(false);
  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setformData({ ...formData, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch((signup(formData, history)))
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
    } catch (error) {
      console.log(error);
    }
    console.log(res);
  };
  
  const googleFailure = (error) => {
    console.log(error);
    console.log("Failured to register with using google, try again");
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPasswordShow(!confirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                Sign up with google
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
        <Grid item container xs={12} columnSpacing={0.5}  className={classes.item}>
          <Grid item xs={6} >
          <TextField
            label="First Name"
            required
            id="firstName-textField"
            fullWidth
            onChange={handleChange("firstName")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
          </Grid>

          <Grid item  xs={6} >
          <TextField
            label="Last Name"
            required
            id="secondName-textField"
            fullWidth
            onChange={handleChange("lastName")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
          </Grid>
        
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <TextField
            label="Email"
            id="email-textField"
            required
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
        <Grid item xs={12} className={classes.item}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-password"
              type={confirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {confirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Button type="submit" variant="contained">
            Create Account
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Register;
