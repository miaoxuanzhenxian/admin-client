import React, { Component, lazy, Suspense } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

// import { getUser } from '@/utils/storageUtils.js';
import memoryUtils from '@/utils/memoryUtils';
import LeftNav from '@/components/left-nav';
import Header from '@/components/header';
import Loading from '@/components/loading';
const Home = lazy(() => import('../home'));
const Category = lazy(() => import('../category'));
const Product = lazy(() => import('../product'));
const Role = lazy(() => import('../role'));
const User = lazy(() => import('../user'));
const Bar = lazy(() => import('../charts/bar'));
const Line = lazy(() => import('../charts/line'));
const Pie = lazy(() => import('../charts/pie'));

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {

  render() {
    //读取保存的user，如果不存在，直接重定向到login登录界面
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}');
    const user = memoryUtils.user;
    if (!user._id) {
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ backgroundColor: 'white', position: 'relative', margin: '20px' }}>
            <Suspense fallback={ <Loading style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} spinStyle={{ color: 'blue' }} /> }>
              <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/category" exact component={Category} />
                <Route path="/product" exact component={Product} />
                <Route path="/role" exact component={Role} />
                <Route path="/user" exact component={User} />
                <Route path="/charts/bar" exact component={Bar} />
                <Route path="/charts/line" exact component={Line} />
                <Route path="/charts/pie" exact component={Pie} />
                <Redirect to="/home" />
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
