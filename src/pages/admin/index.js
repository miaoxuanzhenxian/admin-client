import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

// import { getUser } from '@/utils/storageUtils.js';
import memoryUtils from '@/utils/memoryUtils';
import LeftNav from '@/components/left-nav';
import Header from '@/components/header';
import Home from '../home';
import Category from '../category';
import Product from '../product';
import Role from '../role';
import User from '../user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';


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
          <Content style={{ backgroundColor: 'white' }}>
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
          </Content>
          <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)' }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
