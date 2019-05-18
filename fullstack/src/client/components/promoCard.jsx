import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Button, Grid } from "@material-ui/core";
import Emoji from "./emoji";

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
  mainContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "stretch",
    alignContent: "stretch"
  },
  cover: {
    height: "100%",
    width: "100%",
    minHeight: 150
  },
  button: {
    margin: 3
  },
  title: {
    textDecorationLine: "underline",
    display: "inline"
  },
  originalValue: {
    display: "inline",
    textDecorationLine: "line-through",
    float: "right",
    color: theme.palette.text.secondary,
    textDecorationColor: theme.palette.text.secondary
  },
  discountValue: {
    display: "inline",
    float: "right"
  },
  quantityWrapper: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "stretch",
    width: "30%",
    textAlign: "right",
    paddingTop: 10
  },
  descriptionWrapper: {
    width: "70%"
  }
});

function MediaControlCard(props) {
  const { classes, theme } = props;

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} sm={2}>
          <CardMedia
            title="Imagen del Comercio"
            image="https://picsum.photos/g/300/300"
            className={classes.cover}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <div className={classes.details}>
            <CardContent className={classes.mainContent}>
              <div className={classes.descriptionWrapper}>
                <Typography component="h5" variant="h5" className={classes.title} color="primary">
                  2x1 Cervezas Happy Hour
                </Typography>
                <div>
                  <Emoji symbol="⭐" alt="Rating" />
                  <Emoji symbol="⭐" alt="Rating" />
                  <Emoji symbol="⭐" alt="Rating" />
                  <Emoji symbol="⭐" alt="Rating" />
                </div>
                <Typography variant="subtitle1" color="textPrimary">
                  Detalles de la promoción. Fecha/s de validez. Mas información sobre la promo.
                </Typography>
                <Typography variant="subtitle2">📅Dia de Validez</Typography>
              </div>
              <div className={classes.quantityWrapper}>
                <div>
                  <Typography variant="subtitle2">
                    Personas:
                    <Emoji symbol="😎" alt="Personas requeridas" />
                    <Emoji symbol="😎" alt="Personas requeridas" />
                    <Emoji symbol="😎" alt="Personas requeridas" />
                  </Typography>
                </div>
                <Typography variant="subtitle2">Cant disponibles: 1⃣0⃣0⃣</Typography>
                <Typography component="h5" variant="h5" className={classes.originalValue}>
                  <Emoji symbol="💰" alt="Precio Inicial" />
                  200
                </Typography>
                <Typography component="h4" variant="h4" className={classes.discountValue}>
                  <Emoji symbol="💰" alt="Precio Final" />
                  100
                </Typography>
              </div>
            </CardContent>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
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
        </Grid>
      </Grid>
    </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
