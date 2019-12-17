import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import style from './index.module.less';
import logo from './images/logo.png';

@Form.create()
class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const form = this.props.form;
    const values = form.getFieldsValue();
    const username = form.getFieldValue('username');
    const password = form.getFieldValue('password');
    console.log(values, username, password);

    alert('发送登录的ajax请求');
  }

  /*
    对密码进行自定义验证
  */
  validatePwd = (rule, value, callback) => {
    // 1).必须输入
    // 2).必须大于等于4位
    // 3).必须小于等于12位
    // 4).必须是英文、数字或下划线组成
    value = value.trim();
    if (!value) {
      callback('密码是必须的');
    } else if (value.length < 4) {
      callback('密码不能小于4位');
    } else if (value.length > 12) {
      callback('密码不能大于12位');
    } else if (!/^(\w)+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成');
    } else {
      callback(); //验证通过
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
              {
                getFieldDecorator('username', {
                  // 1).必须输入
                  // 2).必须大于等于4位
                  // 3).必须小于等于12位
                  // 4).必须是英文、数字或下划线组成
                  rules: [
                    { required: true, whitespace: true, message: '用户名是必须的' },
                    { min: 4, message: '用户名不能小于4位' },
                    { max: 12, message: '用户名不能大于12位' },
                    { pattern: /^(\w)+$/, message: '用户名必须是英文、数字或下划线组成' }
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  // 1).必须输入
                  // 2).必须大于等于4位
                  // 3).必须小于等于12位
                  // 4).必须是英文、数字或下划线组成
                  rules: [
                    { validator: this.validatePwd }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
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
