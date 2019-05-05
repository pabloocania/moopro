import React from "react";
import {
  withStyles, List, ListItem, Typography
} from "@material-ui/core";
import PromoCard from "./promoCard";
import Notifier, { showProgress } from "./notifier";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class PromoList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    showProgress();
  }

  render() {
    return (
      <div>
        <List>
          <ListItem>
            <PromoCard />
          </ListItem>
          <ListItem>
            <PromoCard />
          </ListItem>
        </List>
        <Notifier />
      </div>
    );
  }
}

export default withStyles(styles)(PromoList);
