import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import { connect } from 'react-redux'

import { logout } from '@/redux/actions'
import style from './index.module.less';
import { formatDate } from '@/utils/dateUtils';
import { reqWeather } from '@/api';
import LinkButton from '@/components/link-button';

@connect(
  state => ({
    headerTitle: state.headerTitle,
    user: state.user
  }),
  { logout }
)
@withRouter
class Header extends Component {

  state = {
    currentTime: formatDate(Date.now()),
    dayPictureUrl: '', //天气白天图片url
    weather: '' //天气文本
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
    })
  }

  /* 
   退出登陆
 */
  handleLogout = () => {
    Modal.confirm({
      title: '确定退出吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.props.logout()
      }
    })
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

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const { headerTitle, user } = this.props
    return (
      <div className={style.header}>
        <div className={style["header-top"]}>
          欢迎, {user.username}
          {/* <a href="javascript:" onClick={this.handleLogout}>退出</a> */}
          <LinkButton className={style["logout-button"]} onClick={this.handleLogout}>退出</LinkButton>
        </div>
        <div className={style["header-bottom"]}>
          <div className={style["header-bottom-left"]}>{headerTitle}</div>
          <div className={style["header-bottom-right"]}>
            <span>{currentTime}</span>
            {dayPictureUrl ? <img src={dayPictureUrl} alt="weather" /> : null}
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
