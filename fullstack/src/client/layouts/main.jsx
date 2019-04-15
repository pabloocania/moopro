import React from "react";
import { Switch, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import Sidebar from "../components/sidebar";
import Login from "./login";
import Dashboard from "./dashboard";

const styles = {
  absolute: {
    position: "absolute"
  }
};
class Main extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    return (
      <div>
        <Button style={styles.absolute} onClick={this.toggleDrawer("left", true)}>
          <HomeIcon />
        </Button>
        <Sidebar left={this.state.left} close={() => this.toggleDrawer("left", false)} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default Main;
