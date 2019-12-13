import React, { Component } from 'react';
import {Button} from 'antd';

import style1 from './index.module.less';
import './a.less';


export default class Login extends Component {
  render() {
    return (
      <div>
        Login
        <div className={style1.test}>
          aaaa
          <p className={style1.testp}>ppppp</p>
          <p className="aa">1111</p>
        </div>
        <Button type="primary">antd</Button>
      </div>
    )
  }
}
