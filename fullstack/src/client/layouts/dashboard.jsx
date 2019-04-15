import React from "react";
import { Route, Switch } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Promotions from "./dashboardLayouts/promotions";
import Shops from "./dashboardLayouts/shops";

export default class Dashboard extends React.Component {
  state = {
    user: null
  };

  render() {
    return (
      <div>
        <Typography color="primary" variant="h2" align="right">
          Dashboard
        </Typography>
        <Switch>
          <Route path="/dashboard/shops/" component={Shops} />
          <Route path="/dashboard/promotions/" component={Promotions} />
        </Switch>
      </div>
    );
  }
}
