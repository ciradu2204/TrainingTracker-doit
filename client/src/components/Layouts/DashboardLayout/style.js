import { makeStyles } from "@mui/styles";
const drawerWidth = 240;

export default makeStyles((theme) => {
  return {
    page: {
      width: "100%",
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      "&::after": {
        content: '""',
        display: "inline-block",
        width: 2,
        position: "absolute",
        right: 0,
        height: 20,
        background: theme.palette.primary.main,
      },
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      color: "black !important",
      background: "#fff !important",
    },
    nonClickableButton: {
      "&:hover": {
        background: "none !important",
      },
    },
    clickableButton: {
      "&:hover": {
        background: "none !important",
        color: theme.palette.primary.main,
      },
    },
    toolbar: theme.mixins.toolbar,
  };
});