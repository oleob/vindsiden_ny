import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Station from './Station';
import NavBar from '../components/NavBar';

const Routes = () => (
  <div>
    <NavBar />
    <div className="grid">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          path="/station/:id"
          render={props => <Station id={props.match.params.id} />}
        />
      </Switch>
    </div>
  </div>
);

export default Routes;
