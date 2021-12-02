
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => {
    return {
      root: {
        display: "flex",
        height: "100%",
        flexDirection: "Column",
        "& .MuiTextField-root": {
          margin: theme.spacing(2),
        },
      },
    
      cancelButton: {
        width: "fit-content",
        height: "fit-content",
        display: "flex",
      },
      cancelButtonContainer: {
        maxHeight: "80px",
        display: "flex",
        alignItems: "center",
      },
      error: {
        color: theme.palette.error.main,
        marginLeft: "15px",
        marginBottom: "10px"
       },
  
    };
  });