import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import posed from "react-pose";
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

const Box = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    maxWidth: 350
  },
  hover: {
    scale: 1.02,
    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
    maxWidth: 350
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
              <Box id="boxAnimation">
                <ShopCard shop={shop} />
              </Box>
            </Grid>
          ))
          : ""}
      </Grid>
    );
  }
}

export default withStyles(styles)(ShopsTable);
