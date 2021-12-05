import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => {
    return {
      card: {
        display: "flex",
        padding: 20,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.black,
      },
      root: {
        display: "flex",
        justifyContent: "center",
        '& .MuiAccordionSummary-root:hover, .MuiButtonBase-root:hover': {
          cursor: 'default',
        },
      },
      accordion: {
        margin: "20px 0",
       },
      circularProgressBox: {
        [theme.breakpoints.up("xs")]: {
          display: "none",
        },
        [theme.breakpoints.up("md")]: {
          position: "relative",
          display: "inline-flex",
        },
      },
      AccordionSummary: {
        background: theme.palette.primary.main,
        color: "white",
      },
      circularProgresIcon: {
        color: theme.palette.primary.main,
        fontSize: 30,
      },
      circularProgress: {
        color: theme.palette.secondary.light,
      },
      iconBox: {
        top: 8,
        left: 9,
        bottom: 8,
        right: 8,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        background: theme.palette.secondary.main,
        borderRadius: "20px",
        justifyContent: "center",
      },
  
      linearProgress: {
        "& .MuiLinearProgress-colorPrimary": {
          backgroundColor: theme.palette.secondary.black,
        },
        "& .MuiLinearProgress-barColorPrimary": {
          backgroundColor: theme.palette.primary.main,
        },
      },
      checkBoxParent: {
        borderRadius: "20px",
        height: 30,
        width: 30,
        border: 1,
        cursor: "pointer",
        background: theme.palette.primary.main,
        borderBlockColor: "black",
      },
      checkBox: {
        display: "flex",
        height: "100%",
        width: "100%",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
      },
  
      checkBoxNone: {
        display: "none",
      },
    };
  });