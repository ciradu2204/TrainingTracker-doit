import { makeStyles } from "@mui/styles";
 import image from "./img/register2.jpg";

export default makeStyles((theme) => {
  return {
    root: {
      [theme.breakpoints.up('xs')]:{  
        height: "50vh",

      } ,
      [theme.breakpoints.up('md')]:{
        height: "100vh",
      },
      width: "100%",
    },
    formContainer: {
      boxSizing:"border-box",
      [theme.breakpoints.up('md')]:{
         paddingTop: "100px",
      },
      paddingTop: "10px",
      height: "100%",
      width: "100%",
    },
    imageContainer: {
      [theme.breakpoints.up('xs')]:{
        backgroundSize: "cover",

      }, 
      [theme.breakpoints.up('md')]:{
        backgroundSize: "100% 100%",

      },
      height: "100%",
      width: "100%",
      backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
    },
    overlay: {
      height: "100%",
      width: "100%",
      backgroundColor: theme.palette.primary.light,
      alignItems: "stretch",
    },
    title: {
      fontWeight: "bolder",
      fontSize: "25px",
      margin: "20px",
      color: theme.palette.primary.main,
    },
    description: {
      color: "white",
      fontSize: "35px",
      display: "flex",
      textAlign: "center",
      alignSelf: "center",
      height: "calc(100% - 100px)",
      justifyContent: "center",
      letterSpacing: "2px",
      alignItems: "center",
    },
    links: {
        display: "flex",
       justifyContent: "space-around",
    },
    link: {
      display: "flex",
       flexDirection: "column",
      cursor: "pointer",
      alignItems: "center",
      textDecoration: "none",
      color: "black",
      fontSize: "25px",
      fontWeight: "550",
      "&:hover": {
        background: "none !important",
      },
    },
    selected: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textDecoration: "none",
      color: "black",
      fontSize: "25px",
      fontWeight: "550",
      "&:hover": {
        background: "none !important",
      },
      "&::after": {
        content: '""',
        display: "block",
        height: "5px",
        position: "absolute",
        top: "40px",
        width: "150%",
        backgroundColor: theme.palette.primary.main,
      },
    },
    divider: {
      width: "70%"
    }
  };
});
