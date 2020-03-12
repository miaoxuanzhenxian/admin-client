import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import loadable from '@/utils/loadable'
import ProductHome from './home'


//路由的懒加载，解决首屏加载过慢的问题
const ProductAddUpdate = loadable(() => import('./add-update'))
const ProductDetail = loadable(() => import('./detail'))

/*
  商品管理
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" exact component={ProductHome} />
        <Route path="/product/addupdate" component={ProductAddUpdate} />
        <Route path="/product/detail/:id" component={ProductDetail} />
        <Redirect to="/product" />
      </Switch>
    )
  }
}
