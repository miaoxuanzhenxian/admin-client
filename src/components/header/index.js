import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';

import style from './index.module.less';
import { removeUser } from "@/utils/storageUtils";
import memoryUtils from "@/utils/memoryUtils";
import menuList from '@/config/menuConfig';
import { formatDate } from '@/utils/dateUtils';
import { reqWeather } from '@/api';
import LinkButton from '@/components/link-button';

@withRouter
class Header extends Component {

  state = {
    currentTime: formatDate(Date.now()),
    dayPictureUrl: '', //天气白天图片url
    weather: '' //天气文本
  }

  componentDidMount() {
    //启动循环定时器
    this.intertvalId = setInterval(() => {
      this.setState({
        currentTime: formatDate(Date.now())
      });
    }, 1000);
    //发jsonp请求获取天气信息显示
    this.getWeather('北京');
  }
  componentWillUnmount() {
    clearInterval(this.intertvalId);
  }

  /*
  获取天气信息显示
  */
  getWeather = async (city) => {
    //发请求
    const { dayPictureUrl, weather } = await reqWeather(city);
    //更新状态
    this.setState({
      dayPictureUrl,
      weather
    });
  }

  handleLogout = () => {
    Modal.confirm({
      title: '确定退出吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        removeUser();
        memoryUtils.user = {}
        this.props.history.replace('/login');
      }
    });
  }
  getTitle = (menuList) => {
    let title = '';
    const pathname = this.props.location.pathname;
    for (const item of menuList) {
      if (pathname.indexOf(item.key) === 0) { // 使用pathname.indexOf主要是为了防止当路由路径pathname为/product/addupdate等时出现无法匹配/product而造成的无法获取对应的表单项的标题title为商品管理的问题
        title = item.title;
        break;
      } else if (item.children) {
        title = this.getTitle(item.children);
        if (title) {
          break;
        }
      }
    }
    return title;
  }
  render() {
    const { currentTime, dayPictureUrl, weather } = this.state;
    const title = this.getTitle(menuList);
    return (
      <div className={style.header}>
        <div className={style["header-top"]}>
          欢迎, {memoryUtils.user.username}
          {/* <a href="javascript:" onClick={this.handleLogout}>退出</a> */}
          <LinkButton className={style["logout-button"]} onClick={this.handleLogout}>退出</LinkButton>
        </div>
        <div className={style["header-bottom"]}>
          <div className={style["header-bottom-left"]}>{title}</div>
          <div className={style["header-bottom-right"]}>
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
