import React from "react";
import {
  CardActionArea, Card, CardMedia, Fab, withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  card: {
    maxWidth: 345,
    border: theme.palette.secondary.main,
    borderStyle: "solid",
    borderWidth: 2,
    position: "relative"
  },
  media: {
    height: 300
  },
  button: {
    margin: theme.spacing.unit,
    position: "absolute",
    bottom: 5,
    right: 10,
    float: "right"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  iconsWrapper: {
    width: "100%"
  }
});

// eslint-disable-next-line react/prefer-stateless-function
class ProfileImage extends React.Component {
  handleClick = (event) => {
    console.log(event);
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card} elevation={0}>
        <CardMedia
          className={classes.media}
          title="Imagen del Comercio"
          image="https://picsum.photos/g/300/300"
        />
        <Fab
          color="secondary"
          size="small"
          className={classes.button}
          aria-label="Editar"
          onClick={this.handleClick}
        >
          <EditIcon fontSize="small" />
        </Fab>
      </Card>
    );
  }
}

ProfileImage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ProfileImage);
