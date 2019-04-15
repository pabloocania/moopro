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
import Emoji from "../client/components/emoji";
import MainTheme from "../client/layouts/theme/MainTheme";

const shop = {
  nombre: "Nombre Comercio",
  telefono: "2615537137",
  direccion: "Calle Falsa 1234",
  localidad: "Ciudad de Tucuman"
};

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
  .add("Shop Detail", () => <ShopDetail />)
  .add("Categories Picker", () => (
    <CategoriesPicker suggestionsStrings={categorias} label="Categorias" />
  ));
