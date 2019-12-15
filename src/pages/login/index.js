import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import style from './index.module.less';
import logo from './images/logo.png';

@Form.create()
class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    alert('发送登录的ajax请求');
  };

  render() {
    return (
      <div className={style.login}>
        <div className={style["login-header"]}>
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </div>
        <div className={style["login-content"]}>
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className={style["login-form"]}>
            <Form.Item>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={style["login-form-button"]}>登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login;

/*
  // 1).必须输入
    // 2).必须大于等于4位
    // 3).必须小于等于12位
    // 4).必须是英文、数字或下划线组成
*/