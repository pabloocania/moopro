import React from "react";

import { storiesOf } from "@storybook/react";
import {
  Typography, Paper, Button, withStyles, Grid
} from "@material-ui/core";
import { muiTheme } from "storybook-addon-material-ui";
import ShopsTable from "../client/components/shopsTable";
import ShopCard from "../client/components/shopCard";
import ShopDetail from "../client/components/shopDetail";
import LoginForm from "../client/components/loginform";
import CategoriesPicker from "../client/components/categoriesPicker";
import PlaceAutocomplete from "../client/components/placeAutocomplete";
import Map from "../client/components/map";
import PromoCard from "../client/components/promoCard";
import MainTheme from "../client/layouts/theme/MainTheme";
import PromoList from "../client/components/promoList";
import Notifier, { openSnackbar, showProgress, hideProgress } from "../client/components/notifier";

const shop = {
  nombre: "Comercio Parametro",
  telefono: "2615537137",
  direccion: "Calle Falsa 1234",
  localidad: "Ciudad de Tucuman"
};

const showProgressValue = false;
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

storiesOf("Comercios", module)
  .addDecorator(muiTheme(MainTheme))
  .add("Login Form", () => <LoginForm />)
  .add("Shops Table", () => <ShopsTable />)
  .add("Shop Card", () => <ShopCard shop={shop} />)
  .add("New Shop Detail", () => <ShopDetail />)
  .add("Map", () => <Map />)
  .add("Categories Picker", () => (
    <CategoriesPicker suggestionsStrings={categorias} label="Categorias" />
  ))
  .add("Address", () => <PlaceAutocomplete />);
storiesOf("Promos", module)
  .addDecorator(muiTheme(MainTheme))
  .add("Promo List", () => <PromoList />)
  .add("Promo", () => <PromoCard />);
storiesOf("General", module)
  .addDecorator(muiTheme(MainTheme))
  .add("Snackbar", () => (
    <div>
      <Button
        size="small"
        variant="outlined"
        onClick={() => openSnackbar({ message: "Success!", variant: "success" })}
      >
        Show Snackbar Success
      </Button>
      <br />
      <Button
        size="small"
        variant="outlined"
        onClick={() => openSnackbar({ message: "Error!", variant: "error" })}
      >
        Show Snackbar Error
      </Button>
      <br />
      <Button
        size="small"
        variant="outlined"
        onClick={() => openSnackbar({ message: "Warning!", variant: "warning" })}
      >
        Show Snackbar Warning
      </Button>
      <br />
      <Button
        size="small"
        variant="outlined"
        onClick={() => openSnackbar({ message: "Info!", variant: "info" })}
      >
        Show Snackbar Info
      </Button>
      <Notifier />
    </div>
  ))
  .add("Progress", () => (
    <div>
      <Button
        size="small"
        variant="outlined"
        onClick={() => {
          showProgress();
          setTimeout(() => hideProgress(), 3000);
        }}
      >
        Show Progress 3 secs
      </Button>
      <Notifier />
    </div>
  ));
