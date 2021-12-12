import React, { useEffect } from "react";
import { Card, Typography, IconButton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Icon } from "@iconify/react";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircularProgress from "@mui/material/CircularProgress";
import { LinearProgress } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { useDispatch } from "react-redux";
import DialogBox from "../Dialog/dialog";
import { useSelector } from "react-redux";
import {
  deleteWeeklyPlan,
  likeWeeklyPlan,
  markGoalComplete,
} from "../../actions/weeklyPlans";

import useStyles from "./style";
import Share from "../Share/share";
import Menu from "../Menu/menu";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

const WeeklyPlan = ({ weeklyPlan, setCurrentId, handleBackdropOpen }) => {
  const classes = useStyles();
  const [expand, setExpand] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openShareDialog, setOpenShareDialog] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState("");
  const user = useSelector((state) => state.auth);

  useEffect(() => {}, [anchorEl]);

  const handleOpenViewMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseViewMore = () => {
    setAnchorEl(null);
  };

  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  const handleEdit = () => {
    setCurrentId(weeklyPlan._id);
    handleCloseViewMore();
    handleBackdropOpen();
  };
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    handleCloseViewMore();
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
  const handleOpenShareDialog = () => {
    setOpenShareDialog(true);
  };

  const generateUrl = () => {
    let currentUrl = window.location.href;
    let startIndex = currentUrl.indexOf("//");
    let endIndex = currentUrl.indexOf("/", startIndex + 2);
    let domainName = currentUrl.substring(0, endIndex);
    const url = `${domainName}/dashboard/shared/${weeklyPlan._id}`;
    return url;
  };

  const handleShare = () => {
    const url = generateUrl();
    setShareUrl(url);
    handleCloseViewMore();
    handleOpenShareDialog();
  };

  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
    setShareUrl("");
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

  const Like = () => {
    if (weeklyPlan.likes.length > 0) {
      return weeklyPlan.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{weeklyPlan.likes.length > 2}?{" "}
          <Typography variant="body2">
            `You and ${weeklyPlan.likes.length - 1} others`
          </Typography>{" "}
          :{" "}
          <Typography variant="body2">
            `${weeklyPlan.likes.length} like$
            {weeklyPlan.like.length > 1 ? "s" : ""}`
          </Typography>
        </>
      ) : (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{weeklyPlan.likes.length}
          <Typography variant="body2">
            {weeklyPlan.likes.length > 1 ? "Likes" : "Like"}
          </Typography>
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;<Typography variant="body2">Like</Typography>
      </>
    );
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
                  <Grid item>
                    {weeklyPlan.creator !==
                    (user.authData.result._id ||
                      user.authData.result.googleId) ? (
                      <Typography variant="body2">
                        Creator: {weeklyPlan.userName}
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {weeklyPlan.description}
                </Typography>
              </Grid>
              <Grid
                item
                container
                rowSpacing={2}
                direction="row"
                alignItems="center"
              >
                <Grid item xs={12} md={5}>
                  <Typography variant="body2">
                    Date: &nbsp;
                    {moment(weeklyPlan.startDate).format("MMM Do YYYY")} -{" "}
                    {moment(weeklyPlan.endDate).format("MMM Do YYYY")}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body2">
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
                  <IconButton
                    onClick={() => {
                      handleLike();
                    }}
                    sx={{
                      color: "white",
                      "&:hover": {
                        background: "none",
                      },
                      cursor: "pointer !important",
                    }}
                  >
                    <Like />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={1}
              md={1}
              lg={1}
              direction="column"
              justifyContent="space-between"
              alignItems="flex-end"
              sx={{ width: "100%", height: "100%" }}
            >
              <Grid item>
                {weeklyPlan.creator ===
                (user.authData.result._id || user.authData.result.googleId) ? (
                  <IconButton
                    arial-label="More"
                    onClick={(e) => {
                      handleOpenViewMore(e);
                    }}
                  >
                    <MoreVertIcon sx={{ color: "white", cursor: "pointer" }} />
                  </IconButton>
                ) : null}
              </Grid>

              <Grid item>
                <IconButton
                  arial-label="Expand Icon"
                  onClick={() => {
                    toggleAcordion();
                  }}
                >
                  <ExpandMoreIcon sx={{ color: "white", cursor: "pointer" }} />
                </IconButton>
              </Grid>
            </Grid>

            <Grid item container>
              <Grid item xs={12}>
                <DialogBox
                  openDialog={openDialog}
                  handleCloseDialog={handleCloseDialog}
                  handleDelete={handleDelete}
                />
              </Grid>
              <Grid item xs={12}>
                <Share
                  url={shareUrl}
                  openShareDialog={openShareDialog}
                  handleCloseShareDialog={handleCloseShareDialog}
                />
              </Grid>
              <Grid item xs={12}>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  handleCloseViewMore={handleCloseViewMore}
                  handleClickOpenDialog={handleClickOpenDialog}
                  handleEdit={handleEdit}
                  handleShare={handleShare}
                />
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
                {weeklyPlan.creator ===
                (user.authData.result._id || user.authData.result.googleId) ? (
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
                ) : null}
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
