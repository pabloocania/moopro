import React from "react";
import PropTypes from "prop-types";
import posed from "react-pose";
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
import Notifier, { showProgress, hideProgress } from "./notifier";
import Emoji from "./emoji";

const styles = theme => ({
  card: {
    height: "auto"
  },
  media: {
    height: 140
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
    // showProgress();
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
        hideProgress();
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
              {/**
                <Emoji symbol="👉" label="Nombre" />
                */}
              {shop.name}
            </Typography>
            <Typography variant="subtitle2">
              <Emoji symbol="📞" label="Nombre" />
              {shop.phone}
            </Typography>
            <Typography variant="body2" noWrap="true">
              <Emoji symbol="💈" label="Dirección" />
              {`${shop.address} - ${shop.city}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button fullWidth="false" size="small" color="secondary" variant="outlined">
            Ver promociones
          </Button>
          <Button fullWidth="false" size="small" color="secondary" variant="outlined">
            Ver detalles
          </Button>
        </CardActions>
        <Notifier />
      </Card>
    );
  }
}
ShopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  shop: PropTypes.object.isRequired
};
export default withStyles(styles)(ShopCard);
