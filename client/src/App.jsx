import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import Home from 'views/Home';
import Template from 'Components/Template';
import theme from 'theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Template>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Template>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
