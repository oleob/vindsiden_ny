import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';

import Routes from './containers/Routes';
import NavBar from './components/NavBar';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="grid">
          <NavBar />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
