import React from "react";

import { Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import Main from "../routes/Main";

import theme from "../styles/theme";

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Switch>
      <Main />
    </Switch>
  </MuiThemeProvider>
);

export default App;
