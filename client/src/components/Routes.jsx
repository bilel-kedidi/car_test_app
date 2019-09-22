import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Car from './Car';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={App} />
    <Route path='/car/:vin' component={Car} />
  </Switch>
);

export default Routes;
