import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { withStyles, Typography, IconButton } from "@material-ui/core";
import ApiUsers from "../apiServices/apiUsers";
import Notifier, { hideProgress, openSnackbar, showProgress } from "./notifier";

const { SocialIcon } = require("react-social-icons");

const styles = theme => ({
  facebookButton: {
    backgroundColor: "#3b5998",
    color: "white",
    padding: theme.spacing.unit * 2,
    fontWeight: 600,
    fontSize: 14,
    fontFamily: theme.fontFamily
  },
  wrapper: {
    textAlign: "center",
    marginTop: theme.spacing.unit * 2
  }
});
class SocialLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.api = new ApiUsers();
    this.onLogIn = props.onLogIn;
    this.onRegister = props.onRegister;
    this.onlyRegister = props.onlyRegister;
  }

  ResponseFacebook = (response) => {
    const {
      name, email, userID, picture
    } = response;
    const password = userID;
    this.api
      .loginUserService(email, password)
      .then(() => {
        // Has already an account
        if (this.onlyRegister) {
          openSnackbar({
            message:
              "La cuenta ya existe. Registrate con otro email, o ingresá con tu cuenta ya creada",
            variant: "error"
          });
        } else {
          this.onLogIn();
        }
      })
      .catch((error) => {
        if (this.onlyRegister) {
          this.onLogIn(name, email, userID, "facebook", picture);
        } else {
          openSnackbar({
            message: "No se pudo encontrar la cuenta. Registrate!",
            variant: "error"
          });
        }
      });
  };

  render() {
    const { classes } = this.props;
    const responseGoogle = (response) => {
      console.log("ingreso con google no implementado todavía");
    };
    return (
      <div className={classes.wrapper}>
        <FacebookLogin
          appId="1436593786470733" // APP ID NOT CREATED YET
          fields="name,email,picture"
          callback={this.ResponseFacebook}
          render={renderProps => (
            <IconButton
              className={classes.button}
              onClick={renderProps.onClick}
              aria-label="Facebook"
            >
              <SocialIcon network="facebook" />
            </IconButton>
          )}
        />
        <GoogleLogin
          clientId="1436593786470733" // APP ID NOT CREATED YET
          callback={this.ResponseFacebook}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          render={renderProps => (
            <IconButton
              className={classes.button}
              onClick={renderProps.onClick}
              aria-label="Google"
            >
              <SocialIcon network="google" />
            </IconButton>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SocialLoginForm);
