import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const styles = theme => ({
  card: {
    display: "flex",
    width: "100%"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: "30%"
  },
  button: {
    margin: 3
  }
});

function MediaControlCard(props) {
  const { classes, theme } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        title="Imagen del Comercio"
        image="https://picsum.photos/g/300/300"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            2x1 Cervezas Happy Hour
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Detalles de la promoción. Fecha/s de validez. Mas información sobre la promo.
          </Typography>
        </CardContent>
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            size="small"
            className={classes.button}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            size="small"
            className={classes.button}
          >
            Ver/Generar QR
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            size="small"
            className={classes.button}
          >
            Eliminar
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
