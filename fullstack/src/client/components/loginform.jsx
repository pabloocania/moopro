import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import ApiUsers from "../apiServices/apiUsers";
import SocialLoginForm from "./socialLoginForm";
import RegisterDialog from "./registerDialog";
import { openSnackbar } from "./notifier";
import { ValidateEmail, ValidatePassword } from "../_helpers/validator";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      openRegisterDialog: false
    };
    this.api = new ApiUsers();
    this.onLogIn = props.onLogIn;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (ValidateEmail(email) && ValidatePassword(password)) {
      this.api
        .loginUserService(email, password, this.actualizaUsuario)
        .then(() => this.onLogIn())
        .catch((message) => {
          openSnackbar({ message: "Los datos ingresados son incorrectos", variant: "error" });
          console.log(`${message} Login Error`);
        });
    } else {
      openSnackbar({ message: "Los datos ingresados son incorrectos", variant: "error" });
    }
  };

  onChange = ({ target: { name, value } }) => this.setState({
    [name]: value
  });

  onSocialRegisterConfirm = () => {
    this.onCloseRegisterDialog();
    this.onLogIn();
  };

  onRegisterClick = (e) => {
    const openModal = true;
    this.setState({ openRegisterDialog: openModal });
  };

  onCloseRegisterDialog = () => {
    const closeModal = false;
    this.setState({ openRegisterDialog: closeModal });
  };

  render() {
    const { classes, onLogIn } = this.props;
    const { openRegisterDialog, email, password } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required className={classes.margin} fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                defaultValue=""
                onChange={this.onChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required className={classes.margin} fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={this.onChange}
                defaultValue=""
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log in
            </Button>
            <SocialLoginForm onLogIn={onLogIn} />
            <Button fullWidth variant="outlined" color="secondary" onClick={this.onRegisterClick}>
              Registrarme
            </Button>
          </form>
        </Paper>
        <RegisterDialog
          open={openRegisterDialog}
          onRegister={this.onSocialRegisterConfirm}
          onClose={this.onCloseRegisterDialog}
          onLogIn={onLogIn}
        />
      </main>
    );
  }
}

LoginForm.propTypes = {
  onLogIn: PropTypes.func.isRequired
};
export default withStyles(styles)(LoginForm);
