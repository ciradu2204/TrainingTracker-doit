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
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import {
  deleteWeeklyPlan,
  likeWeeklyPlan,
  markGoalComplete,
} from "../../actions/weeklyPlans";

import useStyles from "./style"

const WeeklyPlan = ({ weeklyPlan, setCurrentId, handleBackdropOpen }) => {
  const classes = useStyles();
  const [expand, setExpand] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);

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
    handleBackdropOpen();
  };
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    handleCloseDialog();
    dispatch(deleteWeeklyPlan(weeklyPlan._id));
  };

  const handleLike = () => {
    dispatch(likeWeeklyPlan(weeklyPlan._id));
  };

  const markAsDone = (goalId, goalIndex) => {
    if (!weeklyPlan.goals[goalIndex].completed) {
      dispatch(markGoalComplete(weeklyPlan._id, goalId, goalIndex));
    }
  };

  const calculateProgress = (current, target) => {
    let value = current / target;
    let roundedNumber = value.toFixed(1);
    return roundedNumber * 100;
  };

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
            <Grid item md={2} lg={1}>
              <Box className={classes.circularProgressBox}>
                <CircularProgress
                  variant="determinate"
                  value={calculateProgress(
                    weeklyPlan.completedGoals,
                    weeklyPlan.goals.length
                  )}
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

            <Grid
              item
              container
              direction="column"
              xs={11}
              md={9}
              lg={10}
              rowSpacing={1}
            >
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
                <Typography>{weeklyPlan.description}</Typography>
              </Grid>
              <Grid
                item
                container
                rowSpacing={2}
                direction="row"
                alignItems="center"
              >
                <Grid item xs={12} md={5}>
                  <Typography>
                    Date: &nbsp;
                    {moment(weeklyPlan.startDate).format("MMM Do YYYY")} -{" "}
                    {moment(weeklyPlan.endDate).format("MMM Do YYYY")}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography>
                    Completed: &nbsp; {weeklyPlan.completedGoals}/
                    {weeklyPlan.goals.length} done
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  xs={12}
                  md={3}
                  direction="row"
                  alignItems="center"
                >
                  <FavoriteBorderIcon
                    onClick={() => {
                      handleLike();
                    }}
                    color="secondary"
                  />

                  <Typography>
                    {" "}
                    &nbsp; {weeklyPlan.likeCount} &nbsp;{" "}
                  </Typography>
                  <Typography>Likes </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={1}
              md={1}
              lg= {1}
              direction="column"
              justifyContent="space-between"
              alignItems="flex-end"
              sx={{ width: "100%", height: "100%" }}
            >
              <Grid item>
                <IconButton
                  arial-label="More"
                  onClick={(e) => {
                    handleViewMore(e);
                  }}
                >
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
                  <MenuItem
                    onClick={() => {
                      handleClickOpenDialog();
                    }}
                  >
                    <ListItemIcon>
                      <DeleteOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </MenuItem>
                  {/* Delete Dialog */}
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Delete Weekly Plan"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this plan?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => {
                          handleCloseDialog();
                        }}
                      >
                        No
                      </Button>
                      <Button
                        onClick={() => {
                          handleDelete();
                        }}
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      handleEdit();
                    }}
                  >
                    <ListItemIcon>
                      <ModeEditOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>Modify</ListItemText>
                  </MenuItem>

                  <Divider />
                  <MenuItem
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <IosShareIcon />
                    </ListItemIcon>
                    <ListItemText>Share</ListItemText>
                    Share
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid item>
                <IconButton
                  arial-label="Expand Icon"
                  onClick={() => {
                    toggleAcordion();
                  }}
                >
                  <ExpandMoreIcon sx={{ color: "white" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </AccordionSummary>
        {/* Details */}
        <AccordionDetails>
          {weeklyPlan.goals.map((goal, index) => (
            <Grid
              key={index}
              container
              sx={{ width: "100%", height: "100%", mt: 3, mb: 3 }}
              direction="row"
            >
              <Grid item xs={2} md={1} alignSelf="center">
                <Box
                  disabled={goal.completed ? true : false}
                  className={classes.checkBoxParent}
                  onClick={() => {
                    markAsDone(goal._id, index);
                  }}
                >
                  <IconButton
                    className={
                      goal.target.value === goal.achieved.value
                        ? classes.checkBox
                        : classes.checkBoxNone
                    }
                  >
                    <CheckSharpIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={10} md={11}>
                <Card className={classes.card} sx={{ borderRadius: "15px" }}>
                  <Grid container direction="row" alignItems="baseline">
                    <Grid item xs={6} md={2}>
                      <Typography variant="h6">{goal.goalName}</Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={5}
                      md={2}
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
                      xs={5}
                      md={2}
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
                      xs={5}
                      md={2}
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
                      xs={10}
                      md={3}
                      className={classes.linearProgress}
                    >
                      <Grid item xs={11}>
                        <LinearProgress
                          variant="determinate"
                          value={calculateProgress(
                            goal.achieved.value,
                            goal.target.value
                          )}
                          sx={{ height: 10 }}
                        />
                      </Grid>

                      <Grid item xs={1}>
                        <Typography>
                          {calculateProgress(
                            goal.achieved.value,
                            goal.target.value
                          )}
                          %
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
