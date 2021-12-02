import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => {
    return {
      containerWeeklyPlan: {
        [theme.breakpoints.up('md')]: {
          width: "80%",
          alignSelf: "center",
        }, 
        [theme.breakpoints.down('md')]:{
          width: "100%"
        }
      },
      item: {
        [theme.breakpoints.up('md')]: {
          width: "80%",
          alignSelf: "center",
        },  
      },
      createButtonContainer:{
        [theme.breakpoints.up('md')]: {
        alignItems: "center"
        }
      },
      createButton: {
        [theme.breakpoints.up('xs')]: {
          marginTop: "15px", 
          marginBottom: "10px",
          borderRadius: "10px",
          background: theme.palette.primary.main,
        },
  
     
      },
  
      typography: {
        fontSize: "18px",
      },
  
      typographyNoPlans: {
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    };
  });