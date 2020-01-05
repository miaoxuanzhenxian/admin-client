import React, { Component } from 'react';
import style from './index.module.less';

export default class Home extends Component {
  render() {
    return (
      <div className={style.home}>
        欢迎使用硅谷后台管理系统
      </div>
    )
  }
}
