import React from "react";
import {
  Grid,
  Paper,
  Typography,
  withStyles,
  InputAdornment,
  TextField,
  Button,
  Divider
} from "@material-ui/core";
import PropTypes from "prop-types";
import classNames from "classnames";
import SaveIcon from "@material-ui/icons/Save";
import ProfileImage from "./profileImage";
import CategoriesPicker from "./categoriesPicker";
import ApiShops from "../apiServices/apiShops";
import PlaceAutocomplete from "./placeAutocomplete";
import Map from "./map";

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
  paperLocation: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    marginTop: 20
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
  },
  marginTop10: {
    marginTop: 10
  },
  divider: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: theme.palette.primary.main
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  mapWrap: {
    width: "100%",
    height: "100%"
  }
});

// eslint-disable-next-line react/prefer-stateless-function
class ShopDetail extends React.Component {
  constructor(props) {
    super(props);
    const { shop } = this.props;
    this.api = new ApiShops();
    this.state = {
      nombre: shop ? shop.nombre : "",
      telefono: shop ? shop.telefono : "",
      direccion: shop ? shop.direccion : "",
      usuario: shop ? shop.usuario : "",
      whatsapp: shop ? shop.whatsapp : "",
      facebook: shop ? shop.facebook : "",
      instagram: shop ? shop.instagram : "",
      geopoint: shop ? shop.geopoint : { lat: -32.89, lng: -68.83 },
      twitter: shop ? shop.twitter : "",
      metadata: null
    };
  }

  onPlaceSelect = (place) => {
    this.setState({
      nombre: place.name,
      direccion: place.formatted_address,
      geopoint: place.geopoint,
      metadata: { rating: place.rating, icon: place.icon }
    });
  };

  onChange = ({ target: { name, value } }) => this.setState({
    [name]: value
  });

  saveShop = (e) => {
    e.preventDefault();
    this.api.saveNewShop({ shop: this.state });
  };

  render() {
    const { classes, shop } = this.props;
    const {
      nombre,
      telefono,
      direccion,
      usuario,
      whatsapp,
      geopoint,
      facebook,
      instagram,
      twitter
    } = this.state;
    // console.log(geopoint);
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
          <Paper className={`${classes.paperLocation}`}>
            <Typography variant="h5" color="secondary">
              Ubicación
            </Typography>
            <div className={classes.mapWrap}>
              <Map geopoint={geopoint} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            {shop ? (
              ""
            ) : (
              <form noValidate autoComplete="off" className={classes.marginTop10}>
                <Typography variant="h5" color="secondary">
                  Intenta buscando el comercio
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  En caso de encontrarse, los datos se completarán automáticamente
                </Typography>
                <PlaceAutocomplete onPlaceSelect={this.onPlaceSelect} />
              </form>
            )}
            <Divider className={classes.divider} variant="middle" />
            <form noValidate autoComplete="off" className={classes.marginTop10}>
              <Grid container justify="flex-start" alignItems="flex-start" spacing={8}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Nombre Comercio"
                    label="Nombre Comercio"
                    fullWidth
                    value={nombre}
                    onChange={this.onChange}
                    name="nombre"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Telefono"
                    fullWidth
                    placeholder="Telefono"
                    value={telefono}
                    onChange={this.onChange}
                    name="telefono"
                    required
                  />
                </Grid>
              </Grid>
              <Grid container justify="flex-start" alignItems="flex-start" spacing={8}>
                <Grid item xs={12}>
                  <TextField
                    label="Direccion"
                    placeholder="direccion"
                    fullWidth
                    value={direccion}
                    onChange={this.onChange}
                    required
                    name="direccion"
                  />
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
                    value={whatsapp}
                    onChange={this.onChange}
                    name="whatsapp"
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
                    value={facebook}
                    onChange={this.onChange}
                    name="facebook"
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
                    value={instagram}
                    onChange={this.onChange}
                    name="instagram"
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
                    value={twitter}
                    onChange={this.onChange}
                    name="twitter"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                justify="flex-start"
                alignItems="flex-start"
                spacing={8}
                className={classes.marginTop5}
              >
                <Grid item xs={12}>
                  <CategoriesPicker suggestionsStrings={categorias} label="Categorias" />
                </Grid>
              </Grid>
              <Grid
                container
                justify="flex-end"
                alignItems="center"
                spacing={8}
                alignContent="center"
                className={classes.marginTop5}
              >
                <Grid item>
                  <Button
                    size="medium"
                    color="secondary"
                    variant="outlined"
                    className={classes.marginTop10}
                    onClick={this.saveShop}
                  >
                    <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                    Guardar
                  </Button>
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
