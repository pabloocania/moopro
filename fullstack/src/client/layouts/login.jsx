import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import LoginForm from "../components/loginform";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    const { user } = this.state;
    const { onLogIn } = this.props;
    return (
      <Grid container justify="space-around" alignContent="stretch" spacing={8}>
        <Grid item>
          <LoginForm onLogIn={onLogIn} />
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  onLogIn: PropTypes.func.isRequired
};
export default Login;
