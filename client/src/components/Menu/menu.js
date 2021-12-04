import React from "react";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";

const MenuView = ({anchorEl, open, handleCloseViewMore, handleClickOpenDialog, handleEdit, handleShare}) => {
  return (
    <Menu
      id="menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleCloseViewMore}
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
          handleShare();
        }}
      >
        <ListItemIcon>
          <IosShareIcon />
        </ListItemIcon>
        <ListItemText>Share</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default MenuView;
