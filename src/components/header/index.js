import React, { Component } from 'react';
import style from './index.module.less';

export default class Header extends Component {
  render() {
    return (
      <div className={style.header}>
        <div className={style["header-top"]}>
          欢迎, admin
          <a href="javascript:">退出</a>
        </div>
        <div className={style["header-bottom"]}>
          <div className={style["header-bottom-left"]}>
            角色管理
          </div>
          <div className={style["header-bottom-right"]}>
            <span>2019-12-29 17:40:9</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
            <span>晴转多云</span>
          </div>
        </div>
      </div>
    )
  }
}
