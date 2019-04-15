import React from "react";
import { Typography } from "@material-ui/core";
import ShopsTable from "../../components/shopsTable";

export default class Shops extends React.Component {
  state = {
    name: "Shops"
  };

  render() {
    return (
      <div>
        <Typography variant="h4" align="right">
          Comercios
        </Typography>
        <ShopsTable />
      </div>
    );
  }
}
