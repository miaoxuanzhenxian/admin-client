import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import style from './index.module.less';
import logo from '@/assets/images/logo.png';

const { SubMenu } = Menu;
@withRouter
class LeftNav extends Component {
  render() {
    return (
      <div className={style["left-nav"]}>
        <Link to="/home" className={style["left-nav-link"]}>
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          defaultSelectedKeys={['/home']}
          selectedKeys={[this.props.location.pathname]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="/home">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="/products"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/category">
              <Link to="/category">
                <Icon type="home" />
                <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to="/product">
                <Icon type="home" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default LeftNav;
