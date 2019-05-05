import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Dialog, Slide } from "@material-ui/core";

const styles = theme => ({
  /* mainLoader: {
    position: "absolute",
    width: "100%",
    height: "100%",

    backgroundColor: theme.palette.primary.main,
    opacity: 0.8
  } */
  mainLoader: {
    height: "100%",
    width: "100%",
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: theme.palette.primary.light,
    zIndex: 1000
  },
  progress: {
    maxWidth: "50%"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
function Progress(props) {
  const { classes, open } = props;
  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <div className={classes.mainLoader}>
        <div className={classes.progress}>
          <CircularProgress color="secondary" size={60} />
        </div>
      </div>
    </Dialog>
  );
}

export default withStyles(styles)(Progress);
