import React, { useState, window, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
 import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
 import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AppBar from "@mui/material/AppBar";
  import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
 import IconButton from "@mui/material/IconButton";
import { Avatar, Divider } from "@mui/material";
import moment from "moment";
import { Box } from "@mui/material";
import useStyles from "./style"
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import decode from "jwt-decode"
import { useCallback } from 'react'
const drawerWidth = 240;

export default function Layout() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.auth)

  const logout = useCallback(() => {
    dispatch({type: 'LOGOUT'})
    dispatch({type: 'RESET'})
     navigate("/")
   }, [dispatch, navigate])

   //check if the user token has expired 

   useEffect(() => {
   
    const token = user.authData?.token

    if(token){
      const decodedToken = decode(token)

      if(decodedToken.exp * 1000 < new Date().getTime()){
        logout();
      } 
    }

        
   }, [location, user, dispatch, navigate, logout])

  

  
   const container =
    window !== undefined ? () => window().document.body : undefined;
  const menuItems = [
    {
      text: "Weekly plans",
      icon: <ListAltOutlinedIcon color="primary" />,
      path: "/dashboard/weeklyPlans",
    },
    {
      text: "Logout",
      icon: <LogoutOutlinedIcon color="primary" />,
      path: "/",
    },
  ];

  const drawer = () => {
    return (
      <div>
        <Typography variant="h5" className={classes.title} color="primary">
          .doit
        </Typography>

        {/* List/ Links */}

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => (item.text === "Logout")? logout() : navigate(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div className={classes.root}>
      {/* App Bar */}
      <AppBar
        elevation={0}
        className={classes.appBar}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h7" noWrap component="div" sx={{ flexGrow: 1 }}>
            {moment().format("MMM Do YYYY, dddd")}
          </Typography>


          <Typography variant="h7" noWrap component="div" sx={{ m: 2 }}>
            {user.authData.result.name}
          </Typography>

           <Avatar className={classes.purple} alt={user.authData.result.name} src={user.authData.result.imageUrl}>{user.authData.result.name.charAt(0)}</Avatar>
        </Toolbar>
        <Divider />
      </AppBar>

      {/* Side Bar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          //overide the paper class
          classes={{ paper: classes.drawerPaper }}
        >
          {drawer()}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer()}
        </Drawer>
      </Box>
      <div className={classes.page}>
        {/* avoid the children from going under the toolbar */}
        <div className={classes.toolbar}></div>
         <Outlet/>
      </div>
    </div>
  );
}
