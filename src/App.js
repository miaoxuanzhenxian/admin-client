import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import loadable from './utils/loadable'


//路由的懒加载，解决首屏加载过慢的问题
const Login = loadable(() => import('./pages/login'))
const Admin = loadable(() => import('./pages/admin'))


/*
  应用根组件
*/
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
