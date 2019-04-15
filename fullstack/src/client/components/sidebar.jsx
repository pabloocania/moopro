import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import axios from "axios";
import routes from "../routes";

const logOutRoute = "/api/v1/users/logout";

const logOut = () => {
  axios.get(logOutRoute).then(console.log("afuera").then(console.log(entro)));
};
const sideList = (
  <div>
    <List>
      {routes.map(route => (
        <ListItem
          button
          key={route.displayName}
          component={Link}
          to={`${route.path.toLowerCase()}`}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={route.displayName} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {["Logout"].map((text, index) => (
        <ListItem button key={text} component={Link} onClick={logOut}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>
);

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

const Sidebar = props => (
  <div>
    <Drawer open={props.left} onClose={props.close()}>
      <div tabIndex={0} role="button" onClick={props.close()} onKeyDown={props.close()}>
        {sideList}
      </div>
    </Drawer>
  </div>
);

export default withStyles(styles)(Sidebar);
