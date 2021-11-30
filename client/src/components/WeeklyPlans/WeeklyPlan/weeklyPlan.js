import React from "react";
import { Card, Typography, IconButton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Icon } from "@iconify/react";
import moment from "moment";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { makeStyles } from "@mui/styles";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { LinearProgress } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";

const useStyles = makeStyles((theme) => {
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
    },
    accordion: {
      width: "80%",
      margin: 20
    },
    circularProgressBox: {
      position: "relative",
      display: "inline-flex",
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
      left: 8,
      bottom: 8,
      right: 8,
      position: "absolute",
      display: "flex",
      alignItems: "center",
      background: theme.palette.secondary.main,
      borderRadius: "20px",
      justifyContent: "center",
    },
    circleBox: {
      color: "red",
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
      backgroundColor: theme.palette.primary.main,
      borderBlockColor: "black",
    },
    checkBox: {
      display: "flex",
      height: "100%",
      color: "white",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

const WeeklyPlan = ({ weeklyPlan, setCurrentId, handleBackdropOpen }) => {
  const classes = useStyles();
  const [expand, setExpand] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleViewMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  const handleEdit = () => {
    setCurrentId(weeklyPlan._id);
    handleClose();
    handleBackdropOpen()
     
  };

  const markAsDone = (index) => {};

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expand}
        sx={{ background: "none", boxShadow: "none" }}
        className={classes.accordion}
      >
        <AccordionSummary
          sx={{ borderRadius: "15px" }}
          aria-controls="panel1a-content"
          className={classes.AccordionSummary}
          id="panel1a-header"
        >
          <Grid container direction="row" alignItems="center">
            <Grid item xs={1}>
              <Box className={classes.circularProgressBox}>
                <CircularProgress
                  variant="determinate"
                  value={50}
                  size={65}
                  thickness={6}
                  className={classes.circularProgress}
                />
                <Box className={classes.iconBox}>
                  <Icon
                    icon="mdi:walk"
                    className={classes.circularProgresIcon}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item container direction="column" xs={10} rowSpacing={1}>
              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              >
                <Grid item>
                  <Typography variant="h6">
                    {weeklyPlan.weeklyPlanName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="h7">{weeklyPlan.description}</Typography>
              </Grid>
              <Grid item container direction="row" columnSpacing={2}>
                <Grid item>
                  <Typography>
                    {weeklyPlan.completedGoals}/{weeklyPlan.goals.length} done
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography>
                    {moment(weeklyPlan.startDate).format("MMMM Do YYYY")} -{" "}
                    {moment(weeklyPlan.endDate).format("MMMM Do YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={1}
              direction="column"
              justifyContent="space-between"
              alignItems="flex-end"
              sx={{ width: "100%", height: "100%" }}
            >
              <Grid item>
                <IconButton arial-label="More" onClick={handleViewMore}>
                  <Icon icon="mdi:dots-vertical" color="white" />
                </IconButton>
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "edit-update-shareMenu",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <DeleteOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                      <ModeEditOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>Modify</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <IosShareIcon />
                    </ListItemIcon>
                    <ListItemText>Share</ListItemText>
                    Share
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid item>
                <IconButton arial-label="Expand Icon" onClick={toggleAcordion}>
                  <ExpandMoreIcon sx={{ color: "white" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          {weeklyPlan.goals.map((goal, index) => (
            <Grid
              key={index}
              container
              sx={{ width: "100%", height: "100%", mt: 3, mb: 3 }}
              direction="row"
            >
              <Grid item xs={1} alignSelf="center">
                <Box
                  className={classes.checkBoxParent}
                  onClick={markAsDone(index)}
                >
                  <Box className={classes.checkBox}>
                    <CheckSharpIcon color="white" />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={11}>
                <Card className={classes.card} sx={{ borderRadius: "15px" }}>
                  <Grid container direction="row" alignItems="baseline">
                    <Grid item xs={2}>
                      <Typography variant="h6">{goal.goalName}</Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={2}
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <Icon icon="grommet-icons:time" />
                      </Grid>
                      <Grid item>
                        {goal.target.value} {goal.target.label}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={2}
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <CalendarTodayIcon />
                      </Grid>
                      <Grid item>{moment(goal.date).format("dddd")}</Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      xs={2}
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <AccessTimeIcon />
                      </Grid>
                      <Grid item>{moment(goal.time).format("h:mm a")}</Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      direction="row"
                      columnSpacing={2}
                      alignItems="center"
                      xs={3}
                      className={classes.linearProgress}
                    >
                      <Grid item xs={11}>
                        <LinearProgress
                          variant="determinate"
                          value={
                            (goal.achieved.value / goal.target.value) % 100
                          }
                          sx={{ height: 10 }}
                        />
                      </Grid>

                      <Grid item xs={1}>
                        <Typography>
                          {(goal.achieved.value / goal.target.value) % 100}%
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default WeeklyPlan;
