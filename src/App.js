/*
应用根组件
*/
import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '@/pages/login';
import Admin from './pages/addmin';

export default class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />
        </Switch>
      </Router>
    )
  }
}
