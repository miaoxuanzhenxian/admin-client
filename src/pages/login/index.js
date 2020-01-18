import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Modal, message } from 'antd';

import style from './index.module.less';
import logo from '@/assets/images/logo.png';
import { reqLogin } from '@/api';
import { saveUser } from '@/utils/storageUtils.js';
import memoryUtils from '@/utils/memoryUtils.js';
// import Loading from '@/components/loading';

@Form.create()
class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();   
    /* //取出输入的相关数据
    const form = this.props.form;
    const values = form.getFieldsValue();
    const username = form.getFieldValue('username');
    const password = form.getFieldValue('password');
    console.log(values, username, password); */
    
    //对表单所有字段进行点击登录时的统一验证
    this.props.form.validateFields(async (err, { username, password }) => {
      if (!err) {
        const result = await reqLogin(username, password);
        if (result.status === 0) {
          //登录成功
          //将user信息保存到localStorage中
          const user = result.data;
          // localStorage.setItem('user_key', JSON.stringify(user));
          saveUser(user);
          //将user保存到内存中
          memoryUtils.user = user;
          //跳转到admin管理界面
          this.props.history.replace('/');
          message.success('登陆成功');
        } else {
          //登陆失败
          Modal.error({
            content: result.msg
          });
        }
      }
    });
  }

  /*
    对密码进行自定义验证
  */
  validatePwd = (rule, value, callback) => {
    // 1).必须输入
    // 2).必须大于等于4位
    // 3).必须小于等于12位
    // 4).必须是英文、数字或下划线组成
    // value = value.trim();
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
    /* const testReactNode = (
      <span style={{ color: 'blue' }}>用户名不能小于4位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    ) */
    //读取保存的user，如果存在，直接重定向到admin管理界面
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}');
    const user = memoryUtils.user;
    if (user._id) {
      /*在render中不能用this.props.history.replace方式跳转路由界面，此方式通常用于事件回调函数中，不能用于render中，
      在render中，要使用渲染Redirect重定向组件标签的方式（即return 返回Redirect重定向组件标签的方式）来跳转路由界面*/
      return <Redirect to='/' />
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.login}>
        {/* <Loading className={style.loading} spinStyle={{ color: 'pink' }} /> */}
        <div className={style['login-heade']}>
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </div>
        <div className={style['login-content']}>
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className={style['login-form']}>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  // 1).必须输入
                  // 2).必须大于等于4位
                  // 3).必须小于等于12位
                  // 4).必须是英文、数字或下划线组成
                  // initialValue: '',
                  // validateFirst: true, //当某一规则校验不通过时，是否停止剩下的规则的校验
                  rules: [
                    { required: true, message: '用户名是必须的' },
                    // { min: 4, message: testReactNode },
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
                  // initialValue: '',
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
              <Button type="primary" htmlType="submit" className={style['login-form-button']}>登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login;
