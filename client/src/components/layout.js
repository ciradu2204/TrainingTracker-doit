import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {makeStyles} from "@mui/styles";
import Drawer from "@mui/material/Drawer"; 
import Typography from "@mui/material/Typography";
import List from "@mui/material/List"; 
import ListItem from "@mui/material/ListItem"; 
import ListItemIcon from "@mui/material/ListItemIcon"; 
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AppBar  from "@mui/material/AppBar";
import Toolbar  from "@mui/material/Toolbar";

const drawerWidth = 240; 
const useStyles = makeStyles((theme) => ({
    page:{
        background: '',
        width: '100%'
    },
    drawer:{
     width: drawerWidth
    },
    drawerPaper:{
        width: drawerWidth
    },
    root:{
        display: 'flex',
    }, 
    active:{
       "&::after":{
        content: '""',
        display:'inline-block',
        width: 2,
        position: 'absolute', 
        right:0,
        height: 20,
        background: theme.palette.primary.main
       }
    }, 
    title:{
        padding:theme.spacing(2)
    },
    appbar:{
        background:"#fff",
        width:`calc(100% - ${drawerWidth}px)`
    },
    toolbar:theme.mixins.toolbar

}))

export default function Layout({ children }) {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()
    const menuItems = [
        {
            text: 'Overview', 
            icon: <HomeOutlinedIcon color="primary" />,
            path: '/overview'
        },
        {
            text: 'My weekly plans', 
            icon: <ListAltOutlinedIcon color="primary" />,
            path: '/weeklyPlans'
        },
        {
            text: 'Settings', 
            icon: <SettingsOutlinedIcon color="primary" />,
            path: '/settings'
        },
        {
            text: 'Logout',
            icon: <LogoutOutlinedIcon color="primary" />, 
            path: '/logout'
        }

    ]
  return (
    <div className={classes.root}>
         {/* App Bar */}

         <AppBar
         elevation={0}
         className={classes.appbar}
         >
              <Toolbar>
                  <Typography color="black" >
                      Welcome to the .doit app!
                  </Typography>
              </Toolbar>
         </AppBar>

         {/* Side Bar */}
         <Drawer
         className={classes.drawer}
         variant="permanent"
         anchor="left"
         //overide the paper class
         classes={{paper: classes.drawerPaper}}

         >
             <div>
                 <Typography variant="h5" className={classes.title} color="primary">
                     .doit
                  </Typography>
             </div>

             {/* List/ Links */}

             <List>
                {menuItems.map(item => (
                    <ListItem
                    button
                    key={item.text}
                    onClick={() => navigate(item.path)}
                    className={location.pathname === item.path ? classes.active: null}
                    >
                     <ListItemIcon>{item.icon}</ListItemIcon>
                     <ListItemText>{item.text}</ListItemText>
                     </ListItem>
                ))}
             </List>
         </Drawer>

        <div className={classes.page}>
          {/* avoid the children from going under the toolbar */}
          <div className={classes.toolbar}></div>
          {children}
         </div>
    </div>
  );
}
