import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Main from "./layouts/main";
import Login from "./layouts/login";
import MainTheme from "./layouts/theme/MainTheme";

function App(props) {
  const [initialized, setInitialized] = useState(false);
  const [logged, setLogged] = useState(false);
  const logIn = () => {
    setLogged(true);
  };

  const logOut = () => {
    setLogged(false);
  };

  return (
    <MuiThemeProvider theme={MainTheme}>
      <div>{props.logged ? <Main onLogOut={logOut} /> : <Login onLogIn={logIn} />}</div>
      {/* <div>{logged ? <Main onLogOut={logOut} /> : <Login onLogIn={logIn} />}</div> */}
    </MuiThemeProvider>
  );
}

export default App;
