import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {NavLink} from "react-router-dom";
export default function Sidebar() {
  return (
    <>
      <List disablePadding>
        <ListItem disablePadding>
          <ListItemButton sx={{ pl: 0 }} component={NavLink} to="/">
            <ListItemText primary="Feed" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ pl: 0 }} component={NavLink} to="/explore" >
            <ListItemText primary="Explore" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
