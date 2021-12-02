import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => {
  return {
    item: {
      [theme.breakpoints.up("xs")]: {
        marginTop: "20px",
        width: "70%",
      },
      [theme.breakpoints.up("md")]: {
        width: "70%",
        marginTop: "30px",
      },
    },
    buttonContainer: {
      marginTop: "20px",
    },
    forgotPassword: {
      width: "70%",
      color: theme.palette.primary.main,
      fontWeight: "bold",
      cursor: "pointer", 
      marginTop: "10px",
    },
 
  };
});
