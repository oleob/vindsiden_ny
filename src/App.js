import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';

import store from './store';
import Routes from './containers/Routes';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#739CA0' } // Purple and green play nicely together.
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
