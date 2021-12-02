import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => {
    return {
    root: {
      overflowY:  'scroll',
      [theme.breakpoints.up('md')]: {
        width: "80%",
        height: "70%",
        display: "flex",
        flexDirection: "column",
  
      },
      [theme.breakpoints.down('md')]: {
        width: "95%",
      }
     
    },
    container: {
      height: "100%",
    },
    }
  });