import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import style from './index.module.less';
import logo from '@/assets/images/logo.png';
import menuList from '@/config/menuConfig';

const { SubMenu } = Menu;

@withRouter
class LeftNav extends Component {
  constructor(props) {//为第一次render()之前做一些同步的准备工作,初始化 state
    super(props);
    this.menuNodes = this.getMenuNodes2(menuList);//使得getMenuNodes2（）在LeftNav组件周期内只运行一次，提高运行效率
  }
  /* 
  第一次render()之后执行一次
  执行异步任务: 发ajax请求, 启动定时器
  */
  // componentDidMount() {
  //   // this.menuNodes = this.getMenuNodes2(menuList)
  // }
  /* 
  第一次render()之前执行一次
  为第一次render()之前做一些同步的准备工作
  */
  // UNSAFE_componentWillMount() {// 官方不建议使用这个UNSAFE_componentWillMount()过时的生命周期方法了，而是建议使用constructor()生命周期方法代替。
  //   this.menuNodes = this.getMenuNodes2(menuList);
  // }

  /*
  根据指定菜单数据列表产生<Menu>的子节点数组
  使用 map() + 递归
  */
  /* getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
      const citem = item.children.find(citem => citem.key === path);
      if (citem) {
        this.openKey = item.key;
      }
      return (
        <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNodes(item.children)}
        </SubMenu>
      )
    });
  } */


  /*
  根据指定菜单数据列表产生<Menu>的子节点数组
  使用 reduce() + 递归
  */
  getMenuNodes2 = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
        const citem = item.children.find(citem => citem.key === path);
        if (citem) {
          this.openKey = item.key;
        }
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes2(item.children)}
          </SubMenu>
        )
      }
      return pre;
    }, []);
  }

  render() {
    return (
      <div className={style["left-nav"]}>
        <Link to="/home" className={style["left-nav-link"]}>
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>

        <Menu
          selectedKeys={[this.props.location.pathname]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
          {/* <Menu.Item key="/home">
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
          </SubMenu> */}
        </Menu>
      </div>
    )
  }
}

export default LeftNav;
