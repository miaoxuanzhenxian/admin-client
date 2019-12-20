/*
应用根组件
*/
import React, { Component, Suspense, lazy } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/loading';
//路由的懒加载，解决首屏加载过慢的问题
const Login = lazy(() => import('./pages/login'));
const Admin = lazy(() => import('./pages/admin'));

export default class App extends Component {

  render() {
    return (
      <Router>
        <Suspense fallback={ <Loading /> }>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Admin} />
          </Switch>
        </Suspense>
      </Router>
    )
  }
}
