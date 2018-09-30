import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Station from './Station';
import About from './About';
import NavBar from '../components/NavBar';
import Error404 from './Error404';

const Routes = () => (
  <div>
    <div className="grid">
      <NavBar />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          exact
          path="/station/:id"
          render={props => <Station id={props.match.params.id} />}
        />
        <Route exact path="/about">
          <About />
        </Route>
        <Route>
          <Error404 />
        </Route>
      </Switch>
    </div>
  </div>
);

export default Routes;
