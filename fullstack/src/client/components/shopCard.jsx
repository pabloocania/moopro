import React from "react";
import PropTypes from "prop-types";
import posed from "react-pose";
import { tween } from "popmotion";
import {
  Card,
  CardActions,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Button,
  withStyles
} from "@material-ui/core";
import axios from "axios";
import Emoji from "./emoji";

const styles = theme => ({
  card: {
    height: "auto"
  },
  media: {
    height: 140
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

class ShopCard extends React.Component {
  constructor(props) {
    super(props);
    const { shop } = props;
    this.state = {
      shop,
      detailed: false,
      image: null
    };
  }

  componentDidMount() {
    const url = "https://picsum.photos/g/300/200";
    axios
      .get(url, {
        responseType: "arraybuffer"
      })
      .then((response) => {
        this.setState({
          image: `data:${response.headers["content-type"]};base64,${btoa(
            String.fromCharCode(...new Uint8Array(response.data))
          )}`
        });
        this.storeTheImage();
      });
  }

  storeTheImage() {
    const { image } = this.state;
    localStorage.setItem("imageStore", image);
  }

  render() {
    const { shop, detailed } = this.state;
    const { classes } = this.props;
    const imageURL = localStorage.getItem("imageStore") ? localStorage.getItem("imageStore") : "";
    return (
      <Box className={classes.box} id="boxAnimation">
        <Card className={classes.card} elevation="1">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={imageURL}
              src="img"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography variant="h6" noWrap="true">
                <Emoji symbol="👉" label="Nombre" />
                {shop.nombre}
              </Typography>
              <Typography variant="subtitle2">
                <Emoji symbol="📞" label="Nombre" />
                {shop.telefono}
              </Typography>
              <Typography variant="body2" noWrap="true">
                <Emoji symbol="💈" label="Dirección" />
                {`${shop.direccion} - ${shop.localidad}`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button fullWidth="true" size="small" color="secondary" variant="outlined">
              Ver promociones
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }
}
ShopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  shop: PropTypes.object.isRequired
};
export default withStyles(styles)(ShopCard);
