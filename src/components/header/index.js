import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'

import { logout } from '@/redux/actions'
import style from './index.module.less'
import { reqWeather } from '@/api'
import LinkButton from '@/components/link-button'


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
    currentTime: moment().format('YYYY-MM-DD HH:mm:ss'), 
    dayPictureUrl: '', // 天气白天图片url
    weather: '' // 天气文本
  }

  /*
    获取天气信息显示
  */
  getWeather = async () => {
    //发请求
    const { dayPictureUrl, weather } = await reqWeather('北京')
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

  /*
    更新显示时间
  */
 updateTime = () => {
    this.intertvalId = setInterval(() => { //启动循环定时器
      this.setState({
        currentTime: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000)
  }

  componentDidMount() {
    //更新显示时间
    this.updateTime()
    //发jsonp请求获取天气信息显示
    this.getWeather()
  }

  componentWillUnmount() {
    clearInterval(this.intertvalId) // 清除定时器，在react组件中只要有定时器，不管是循环定时器(时间间隔定时器)setInterval还是时间延迟定时器setTimeout，都要在componentWillUnmount()生命周期函数中清除所有的对应的定时器
    this.setState = () => { } // 若组件中的请求中用了this.setState方法，则需在componentWillUnmount()生命周期函数中取消this.setState这个异步任务，即将this.setState方法置为空函数
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

export default Header
