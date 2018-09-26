import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Station from './Station';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route
      path="/station/:id"
      render={props => <Station id={props.match.params.id} />}
    />
  </Switch>
);

export default Routes;
