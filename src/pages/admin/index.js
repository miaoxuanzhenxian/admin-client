import React, { Component, lazy, Suspense } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'

import style from './index.module.less'
import LeftNav from '@/components/left-nav'
import Header from '@/components/header'
import Loading from '@/components/loading'

const { Sider, Content, Footer } = Layout

const Home = lazy(() => import('../home'))
const Category = lazy(() => import('../category'))
const Product = lazy(() => import('../product'))
const Role = lazy(() => import('../role'))
const User = lazy(() => import('../user'))
const Bar = lazy(() => import('../charts/bar'))
const Line = lazy(() => import('../charts/line'))
const Pie = lazy(() => import('../charts/pie'))
const BikeMap = lazy(() => import('../bike-map'))
const NotFound = lazy(() => import('../not-found'))

@connect(
  state => ({ user: state.user }),
  {}
)
class Admin extends Component {

  render() {
    //读取保存的user，如果不存在，直接重定向到login登录界面
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}');
    const user = this.props.user
    if (!user._id) {
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{ height: '100%' }} className={style.admin}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content className={style.content}>
            <Suspense fallback={<Loading className={style.loading} spinstyle={{ color: 'blue' }} />}>
              <Switch>
                <Redirect from="/" to="/home" exact />
                <Route path="/home" component={Home} />
                <Route path="/category" component={Category} />
                <Route path="/product" component={Product} />
                <Route path="/role" component={Role} />
                <Route path="/user" component={User} />
                <Route path="/charts/bar" component={Bar} />
                <Route path="/charts/line" component={Line} />
                <Route path="/charts/pie" component={Pie} />
                <Route path="/bike_map" component={BikeMap} />
                <Route component={NotFound} />
                {/* 有要求时，按照项目要求做，但没有要求弄404 NOtFound页面时，我们通常就不弄404 NOtFound了，而是直接在最后重定向到首页，这样让没有匹配的就不再去匹配404 NOtFound了，而是直接重定向跳转到home首页即可，这样更简单，更简洁，更安全，更没有bug，更没有隐患，做项目速度更快 */}
                {/* <Redirect to="/home" />  */}
              </Switch>
            </Suspense>
          </Content>
          <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)' }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
