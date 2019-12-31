import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';

import style from './index.module.less';
import { removeUser } from "@/utils/storageUtils";
import memoryUtils from "@/utils/memoryUtils";
import menuList from '@/config/menuConfig';
import { formateDate } from '@/utils/dateUtils';

@withRouter
class Header extends Component {

  state = {
    currentTime: formateDate(Date.now())
  }

  componentDidMount() {
    this.intertvalId = setInterval(() => {
      this.setState({
        currentTime: formateDate(Date.now())
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intertvalId);
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
      if (item.key === pathname) {
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
    const { currentTime } = this.state;
    const title = this.getTitle(menuList);
    return (
      <div className={style.header}>
        <div className={style["header-top"]}>
          欢迎, {memoryUtils.user.username}
          <a href="javascript:" onClick={this.handleLogout}>退出</a>
        </div>
        <div className={style["header-bottom"]}>
          <div className={style["header-bottom-left"]}>{title}</div>
          <div className={style["header-bottom-right"]}>
            <span>{currentTime}</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather" />
            <span>晴转多云</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
