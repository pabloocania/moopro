import React from "react";
import {
  Grid,
  Paper,
  Typography,
  withStyles,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import ProfileImage from "./profileImage";
import CategoriesPicker from "./categoriesPicker";

const { SocialIcon } = require("react-social-icons");

const categorias = [
  "Gastronomía",
  "Cervecería",
  "Tiempo Libre",
  "Productos",
  "Belleza",
  "Servicios",
  "Turismo",
  "Otro"
];

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  fullHeightContainer: {
    height: "100vh"
  },
  margin: {
    margin: 0
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  marginTop5: {
    marginTop: 5
  }
});

// eslint-disable-next-line react/prefer-stateless-function
class ShopDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        className={classes.fullContainer}
        container
        justify="center"
        alignItems="stretch"
        spacing={8}
      >
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <ProfileImage />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="h3" color="primary">
              Nombre
            </Typography>
            <form noValidate autoComplete="off">
              <Grid container justify="flex-start" alignItems="flex-start" spacing={8}>
                <Grid item xs={12} sm={6}>
                  <TextField placeholder="Nombre PH" label="Nombre LBL" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Telefono" fullWidth />
                </Grid>
              </Grid>
              <Grid container justify="flex-start" alignItems="flex-start" spacing={8}>
                <Grid item xs={12}>
                  <TextField label="Direccion" fullWidth />
                </Grid>
              </Grid>
              <Grid container justify="flex-start" alignItems="flex-start" spacing={8}>
                <Grid item xs={12} sm={6}>
                  <CategoriesPicker suggestionsStrings={categorias} label="Categorias" />
                </Grid>
              </Grid>
              <Grid container justify="flex-start" alignItems="flex-start" spacing={8}>
                <Grid item xs={12}>
                  <TextField label="Usuario Admin" fullWidth />
                </Grid>
              </Grid>
              <Grid
                container
                className={classes.marginTop5}
                justify="flex-start"
                alignItems="flex-start"
                spacing={8}
              >
                <Grid item xs={6} sm={3}>
                  <TextField
                    className={classes.margin}
                    label="WhatsApp"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SocialIcon network="whatsapp" style={{ height: 25, width: 25 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    className={classes.margin}
                    label="Facebook"
                    placeholder="/"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SocialIcon network="facebook" style={{ height: 25, width: 25 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    className={classes.margin}
                    label="Instagram"
                    placeholder="/"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SocialIcon network="instagram" style={{ height: 25, width: 25 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    className={classes.margin}
                    label="Twitter"
                    placeholder="/"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SocialIcon network="twitter" style={{ height: 25, width: 25 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
/*
_id = "",
    nombre = "",
    direccion = "",
    telefono = "",
    geolocalizacion = [],
    facebook = "",
    instagram = "",
    twitter = "",
    whatsapp = "",
    categorias = [],
    usuario,
    localidad,
    imagenUrl
*/

ShopDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShopDetail);
