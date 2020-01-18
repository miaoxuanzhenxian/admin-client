import React, { Component, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const ProductHome = lazy(() => import('./home'))
const ProductAddUpdate = lazy(() => import('./add-update'))
const ProductDetail = lazy(() => import('./detail'))

/*
 * 商品管理
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" exact component={ProductHome} />
        <Route path="/product/addupdate" component={ProductAddUpdate} />
        <Route path="/product/detail" component={ProductDetail} />
        <Redirect to="/product" />
      </Switch>
    )
  }
}
