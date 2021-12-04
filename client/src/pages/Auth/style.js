import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => {
  return {
    item: {
      [theme.breakpoints.up("xs")]: {
        marginTop: "30px",
        width: "80%",
       },
      [theme.breakpoints.up("md")]: {
        width: "70%",
        marginTop: "20px",
      },
    },
    buttonContainer: {
      margin: "20px 0",
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
