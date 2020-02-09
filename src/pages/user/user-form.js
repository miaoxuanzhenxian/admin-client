import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Form, Input, Select } from 'antd'

const Item = Form.Item
const Option = Select.Option

@Form.create()
class UserForm extends Component {

  static propTypes = {
    user: propTypes.object.isRequired,
    roles: propTypes.array.isRequired,
    setForm: propTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.props.setForm(this.props.form)
  }

  render() {

    const { user, roles } = this.props

    const { getFieldDecorator } = this.props.form

    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <Form {...formItemLayout}>
        <Item label="用户名">
          {
            getFieldDecorator('username', {
              initialValue: user.username,
              rules: [
                { required: true, message: '必须输入用户名' },
                { min: 4, message: '用户名不能小于4位' },
                { max: 12, message: '用户名不能大于12位' },
                { pattern: /^(\w)+$/, message: '用户名必须是英文、数字或下划线组成' },
              ]
            })(
              <Input placeholder="请输入用户名" />
            )
          }
        </Item>
        {
          user._id ? null : (
            <Item label="密码">
              {
                getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '必须输入密码' },
                    { min: 4, message: '密码不能小于4位' },
                    { max: 12, message: '密码不能大于12位' },
                    { pattern: /^(\w)+$/, message: '密码必须是英文、数字或下划线组成' },
                  ]
                })(
                  <Input.Password placeholder="请输入密码" />
                )
              }
            </Item>
          )
        }
        <Item label="手机号">
          {
            getFieldDecorator('phone', {
              initialValue: user.phone,
              rules: [
                { required: true, message: '必须输入手机号' },
                { pattern: /^1[3456789]\d{9}$/, message: '手机号填写有误，请重填' },
              ]
            })(
              <Input placeholder="请输入手机号" />
            )
          }
        </Item>
        <Item label="邮箱">
          {
            getFieldDecorator('email', {
              initialValue: user.email,
              rules: [
                { pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '邮箱填写有误，请重填' },
              ]
            })(
              <Input placeholder="请输入邮箱" />
            )
          }
        </Item>
        <Item label="角色">
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id,
              rules: [
                { required: true, message: '必须选择角色' },
              ]
            })(
              <Select placeholder="请选择角色">
                {
                  roles.map(role => <Option value={role._id} key={role._id}>{role.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}
export default UserForm
