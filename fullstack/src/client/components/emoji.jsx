import React from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  emoji: {
    padding: "5px"
  }
});

const Emoji = props => (
  <span
    className={props.classes.emoji}
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
);
export default withStyles(styles)(Emoji);
