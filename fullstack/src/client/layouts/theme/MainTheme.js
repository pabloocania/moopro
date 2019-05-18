import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
  primary: { main: "#FFB74D" },
  secondary: { main: "#7CB342" }
};
const themeName = "Texas Rose Sushi Grey Atlantic Seal";
const typography = {
  useNextVariants: true
};

const overrides = {
  MuiTypography: {
    // Name of the component ⚛️ / style sheet
    // Name of the rule
    subtitle2: {
      fontSize: 13,
      fontWeight: 600 // Some CSS
    },
    h5: {
      fontWeight: 600
    }
  }
};
export default createMuiTheme({
  palette,
  overrides,
  themeName,
  typography
});
