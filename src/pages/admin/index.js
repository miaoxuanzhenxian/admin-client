import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// import { getUser } from '@/utils/storageUtils.js';
import memoryUtils from '@/utils/memoryUtils';

export default class Admin extends Component {

  render() {
    //读取保存的user，如果不存在，直接重定向到login登录界面
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}');
    const user = memoryUtils.user;
    if (!user._id) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        hello, {user.username}
      </div>
    )
  }
}
