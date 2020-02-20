import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { connect } from 'react-redux'

import { setHeaderTitle } from '@/redux/actions'
import style from './index.module.less'
import logo from '@/assets/images/logo.png'
import menuList from '@/config/menuConfig'

const { SubMenu } = Menu;

@connect(
  state => ({ user: state.user }),
  { setHeaderTitle, }
)
@withRouter
class LeftNav extends Component {
  constructor(props) {//为第一次开始执行render()之前做一些同步的准备工作,初始化 state,组件的整个生命周期(从挂载到卸载)内只执行一次constructor生命周期函数
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
      // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
      const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
      if (cItem) {
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
    判断当前用户是否有此item对应的权限
  */
  hasAuth = (item) => {
    // 得到当前用户的所有权限
    const user = this.props.user
    const menus = user.role.menus
    // 1. 如果当前用户是admin
    // 2. 如果item是公开的
    // 3. 当前用户有此item的权限
    if (user.username === 'admin' || item.public || menus.indexOf(item.key) !== -1) {
      return true
    } else if (item.children) { // 4. 如果当前用户有item的某个子节点的权限, 当前item也应该显示
      return !!item.children.find(cItem => menus.indexOf(cItem.key) !== -1)
    }
    return false
  }

  /*
    根据指定菜单数据列表产生<Menu>的子节点数组
    使用 reduce() + 递归
  */
  getMenuNodes2 = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) { // 判断当前用户是否有此item对应的权限
        if (!item.children) {
          // 此组件一开始加载前(在construct()中)，就找到path对应的item, 更新headerTitle状态, 值是item的title
          if (item.key === path || path.indexOf(item.key + '/') === 0) { // item.key + '/'中加'/'是为了防止如categoryxxx等路由路径匹配上，但此时还需在前面加上item.key === path条件，防止如category等对的路由路径匹配不上,而且同时也能提高效率，因为indexOf毕竟是在做遍历，耗费效率较多，这样在前面加上item.key === path条件，就表示item.key === path时就不去执行后面的indexOf条件了，item.key不等于path时再去执行后面的indexOf条件了，这样子也同时提高了效率
            this.props.setHeaderTitle(item.title)
            this.selectKey = item.key
          }
          pre.push(
            <Menu.Item key={item.key}>
              <Link to={item.key} onClick={this.props.setHeaderTitle.bind(this, item.title)}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        } else {
          // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
          const cItem = item.children.find(cItem => cItem.key === path || path.indexOf(cItem.key + '/') === 0); // 使用path.indexOf主要是为了防止当路由路径path为/product/addupdate等时出现无法匹配/product而造成的无法打开对应的折叠表单项的问题；cItem.key + '/'中加'/'是为了防止如categoryxxx等路由路径匹配上，但此时还需在前面加上cItem.key === path条件，防止如category等对的路由路径匹配不上
          if (cItem) {
            this.openKey = item.key
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
      }
      return pre;
    }, []);
  }

  render() {
    // 得到当前请求路径, 作为选中菜单项的key
    let selectKey = this.props.location.pathname  // /product/xxx
    if (this.selectKey && selectKey.indexOf(this.selectKey) === 0) { // 使得category/xxx等这种路由路径能匹配上，能选中对应的/category表单项,因为indexOf毕竟是在做遍历，耗费效率较多，这样在前面加上this.selectKey条件，就表示是在this.selectKey存在即有值的时候再去执行后面的indexOf条件，this.selectKey为undefined、不存在、没值的时候就不去执行后面的indexOf条件了，这样可以提高效率
      selectKey = this.selectKey
    }
    if (selectKey !== '/product' && selectKey.indexOf('/product/') === 0) selectKey = '/product' // 使用selectKey.indexOf主要是为了防止当路由路径selectKey为/product/addupdate等时出现无法匹配/product而造成的无法选中对应的表单项的问题，给'/product/'中的最后面再加个'/'，是为了防止出现/productxxx时，匹配上/product,从而在不应该选中/product表单项时，选中/product表单项；因为indexOf毕竟是在做遍历，耗费效率较多，这样在前面加上selectKey !== '/product'条件，就表示是在selectKey不为'/product'时，再去执行后面的indexOf条件和selectKey = '/product'赋值语句，selectKey为'/product'时就不去执行后面的indexOf条件和selectKey = '/product'赋值语句了，这样可以提高效率

    return (
      <div className={style["left-nav"]}>
        <Link to="/home" className={style["left-nav-link"]} onClick={this.props.setHeaderTitle.bind(this, '首页')}>
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>

        <Menu
          selectedKeys={[selectKey]}
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

export default LeftNav
