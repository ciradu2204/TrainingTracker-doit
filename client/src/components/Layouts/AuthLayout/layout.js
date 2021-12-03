import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import useStyles from "./style";
import { ListItem } from "@mui/material";
import { Outlet } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const classes = useStyles();
  return (
    <Grid container direction="row"  className={classes.root}>
      <Grid item container xs={12} md={6} className={classes.imageContainer}>
        <Grid item xs={12} className={classes.overlay} >
          <Typography className={classes.title}>.doit</Typography>

          <Typography className={classes.description}>
            A few clicks away from reaching your fitness goals!
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={12}
        md={6}
        direction="column"
        className={classes.formContainer}
      >
        <Grid item container direction="column" alignItems="center" >
          <Grid item container direction="row" className={classes.links}>
            <Grid item>
              <ListItem
                onClick={() => navigate("")}
                className={
                  location.pathname === "/" ? classes.selected : classes.link
                }
               >
                Login
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem
                onClick={() => navigate("/register")}
                className={
                  location.pathname === "/register"
                    ? classes.selected
                    : classes.link
                }
               >
                Register
              </ListItem>
            </Grid>
          </Grid>

          <Grid item className={classes.divider}>
              <Divider/>
          </Grid>
        </Grid>

        <Grid item  >
            <Outlet/>
        </Grid>
      </Grid>
    </Grid>
  );
}
