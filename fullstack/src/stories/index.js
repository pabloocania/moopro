import React from "react";

import { storiesOf } from "@storybook/react";
import {
  Typography, Paper, Button, withStyles, Grid
} from "@material-ui/core";
import { muiTheme } from "storybook-addon-material-ui";
import { MuiThemeProvider } from "material-ui/styles";
import getMuiTheme from "material-ui/styles/getMuiTheme";
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
import CustomDatePicker from "../client/components/customDatePicker";
import Notifier, { openSnackbar, showProgress, hideProgress } from "../client/components/notifier";
import PromoDetail from "../client/components/promoDetail";
import KeywordsInput from "../client/components/keywordsInput";
import { shops } from "./shops.json";
import { promos } from "./promos.json";

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

const shop = shops[0];
const promo = promos[0];

storiesOf("Comercios", module)
  .addDecorator(muiTheme(MainTheme))
  .add("Login Form", () => <LoginForm />)
  .add("Shops Table", () => <ShopsTable />)
  .add("Shop Card", () => (
    <div style={{ width: "30%" }}>
      <ShopCard shop={shop} />
    </div>
  ))
  .add("New Shop Detail", () => <ShopDetail />)
  .add("Map", () => <Map />)
  .add("Categories Picker", () => (
    <CategoriesPicker suggestionsStrings={categorias} label="Categorias" />
  ))
  .add("Address", () => <PlaceAutocomplete />);

storiesOf("Promos", module)
  .addDecorator(muiTheme(MainTheme))
  .add("Promo List", () => <PromoList />)
  .add("Promo", () => <PromoCard />)
  .add("Promo Detail", () => (
    <MuiThemeProvider>
      <PromoDetail shop={shop} promo={null} />
    </MuiThemeProvider>
  ));

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
  ))
  .add("Date Picker", () => <CustomDatePicker />)
  .add("Keywords", () => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <KeywordsInput />
    </MuiThemeProvider>
  ));
