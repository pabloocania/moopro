import React from "react";
import {
  Paper,
  TextField,
  withStyles,
  Checkbox,
  Grid,
  Typography,
  Divider,
  InputAdornment,
  MenuItem,
  FormControlLabel,
  Button
} from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import SaveIcon from "@material-ui/icons/Save";
import moment from "moment";
import Notifier, { showProgress, hideProgress, openSnackbar } from "./notifier";
import CustomDatePicker from "./customDatePicker";
import ImagePlaceholder from "../placeholder.png";
import ProfileImage from "./profileImage";
import DaysPicker from "./daysPicker";
import KeywordsInput from "./keywordsInput";
import ShopCard from "./shopCard";
import ApiPromos from "../apiServices/apiPromos";

const styles = theme => ({
  divider: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: theme.palette.primary.main,
    width: "95%"
  },
  withPadding: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  withPaddingRight: {
    paddingRight: theme.spacing.unit
  },
  promoImageContainer: {
    textAlign: "center"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    marginTop: 10,
    float: "right"
  },
  paperShop: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    marginTop: 20
  }
});

class PromoDetail extends React.Component {
  constructor(props) {
    super(props);
    const { promo, shop } = this.props;
    this.api = new ApiPromos();
    this.state = {
      title: promo ? promo.title : "",
      description: promo ? promo.description : "",
      from: promo ? promo.from : new Date(),
      until: promo ? promo.until : new Date(),
      active: promo ? promo.active : true,
      links: promo ? promo.links : [],
      keywords: promo ? promo.keywords : [],
      originalValue: promo ? promo.originalValue : 0,
      discountValue: promo ? promo.discountValue : 0,
      storeId: promo ? promo.storeId : shop._id,
      generated: promo ? promo.generated : 0,
      available: promo ? promo.available : 100,
      peopleReq: promo ? promo.peopleReq : 1
    };
  }

  onChange = ({ target: { name, value } }) => {
    if (name === "active") {
      const { active } = this.state;
      this.setState({ active: !active });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  onDateSelection = (date, name) => {
    this.setState({
      [name]: moment(date, 'DD-MM-YYYY"').toDate()
    });
  };

  handleAddChip = (chip) => {
    console.log(chip);
  };

  handleDeleteChip = (chip, index) => {
    console.log(chip);
  };

  handleChange = (text) => {
    console.log(text);
  };

  savePromo = (e) => {
    // VALIDAR CAMPOS PROMO
    showProgress();
    e.preventDefault();
    console.log(this.state);
    this.api
      .saveNewPromo({ promo: this.state })
      .then((newPromo) => {
        hideProgress();
        openSnackbar({ message: "Creado correctamente", variant: "success" });
        console.log(newPromo._id);
      })
      .catch((error) => {
        hideProgress();
        openSnackbar({ message: error.message, variant: "error" });
      });
  };

  render() {
    const { classes, shop } = this.props;
    const {
      title,
      description,
      from,
      until,
      active,
      links,
      keywords,
      originalValue,
      discountValue,
      available,
      peopleReq
    } = this.state;
    return (
      <Grid
        container
        className={classes.fullContainer}
        justify="center"
        alignItems="stretch"
        spacing={8}
      >
        <Notifier />
        <Grid item xs={12} sm={4} className={classes.promoImageContainer}>
          <Paper className={classes.withPadding}>
            <Typography variant="body2" color="textPrimary" align="left">
              Imagen de la promo:
            </Typography>
            <ProfileImage />
            {/** <img
              src={ImagePlaceholder}
              alt="200x200"
              width="200"
              height="200"
              style={{ borderWidth: "2px", borderStyle: "solid" }}
            />
            <br />
            */}
          </Paper>
          <Paper className={classes.paperShop}>
            <Typography variant="body2" color="textPrimary" align="left">
              Esta promoción pertenece al comercio:
            </Typography>
            <ShopCard shop={shop} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.withPadding}>
            <Typography variant="h5" color="secondary">
              Edición de promoción
            </Typography>
            <Typography variant="body2" color="textPrimary">
              Por favor, complete todos los campos posibles a continuación.
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={active}
                      onChange={this.onChange}
                      value="active"
                      name="active"
                    />
)}
                  label="Activa"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="Título"
                  onChange={this.onChange}
                  value={title}
                  placeholder="Titulo de la Promo"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Descripción"
                  value={description}
                  onChange={this.onChange}
                  placeholder="Descripcion"
                  required
                  multiline
                />

                <Divider variant="middle" className={classes.divider} />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.withPaddingRight}>
                <Typography variant="subtitle1" color="secondary">
                  Fecha de Validez
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <CustomDatePicker
                      name="from"
                      label="Desde"
                      onDateSelection={this.onDateSelection}
                      value={from}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomDatePicker
                      name="until"
                      label="Hasta"
                      onDateSelection={this.onDateSelection}
                      value={until}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DaysPicker />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.withPaddingRight}>
                <Typography variant="subtitle1" color="secondary">
                  Condiciones
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <TextField
                      label="Precio Original"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      name="originalValue"
                      required
                      value={originalValue}
                      type="number"
                      inputProps={{ min: "0" }}
                      onChange={this.onChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Precio Con Descuento"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      name="discountValue"
                      required
                      value={discountValue}
                      type="number"
                      inputProps={{ min: "0" }}
                      onChange={this.onChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      label="Personas Req."
                      value={peopleReq}
                      onChange={this.onChange}
                      name="peopleReq"
                      fullWidth
                    >
                      {["1", "2", "3", "4", "5", "6"].map(value => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Disponibles"
                      name="available"
                      required
                      value={available}
                      type="number"
                      inputProps={{ min: "0" }}
                      onChange={this.onChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Divider variant="middle" className={classes.divider} />
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1" color="secondary">
                  Datos Adicionales
                </Typography>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <KeywordsInput keywords={keywords} floatingLabelText="Keywords" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <KeywordsInput keywords={links} floatingLabelText="Links adicionales" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Button
                  size="medium"
                  color="secondary"
                  variant="outlined"
                  className={classes.button}
                  onClick={this.savePromo}
                >
                  <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
PromoDetail.defaultProps = {
  promo: null
};
PromoDetail.propTypes = {
  shop: PropTypes.object.isRequired,
  promo: PropTypes.object
};
export default withStyles(styles)(PromoDetail);
