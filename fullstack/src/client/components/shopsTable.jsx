import React from "react";
import {
  Typography, Grid, Paper, withStyles, Button
} from "@material-ui/core";
import ApiShops from "../apiServices/apiShops";
import ShopCard from "./shopCard";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    maringBottom: theme.spacing.unit
  },
  grid: {
    padding: "5%"
  }
});

class ShopsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: []
    };
    this.api = new ApiShops();
  }

  componentDidMount() {
    this.api
      .getShops()
      .then((apiShops) => {
        this.setState({ shops: apiShops });
      })
      .catch(error => console.log(error));
  }

  /**
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
    localidad
 */
  render() {
    const { shops } = this.state;
    const { classes } = this.props;
    // return <div>{shops ? shops.map(shop => <p>{shop.nombre}</p>) : ""}</div>;

    // redibujar algunas variables previamente algunos valores antes de mostrarlos
    // por ejemplo categorias concatenarlas en un string
    return (
      <Grid
        className={classes.grid}
        container
        cl
        direction="row"
        justify="center"
        alignItems="center"
        spacing={24}
      >
        {shops.length > 0
          ? shops.map(shop => (
            <Grid item xs={6} sm={4}>
              <ShopCard shop={shop} />
            </Grid>
          ))
          : ""}
      </Grid>
    );
  }
}

export default withStyles(styles)(ShopsTable);
