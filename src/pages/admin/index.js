import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';

// import { getUser } from '@/utils/storageUtils.js';
import memoryUtils from '@/utils/memoryUtils';
import LeftNav from '@/components/left-nav';
import Header from '@/components/header';


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
          <Content style={{ backgroundColor: 'white' }}>Content</Content>
          <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)' }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
