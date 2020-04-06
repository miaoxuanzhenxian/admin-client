import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

/*
  添加角色
*/
@Form.create()
class AddForm extends Component {
  
  static propTypes = {
    setForm: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  
    this.props.setForm(this.props.form)
  }
  

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    }

    return (
      <Form {...formItemLayout}>
        <Form.Item label="角色名称">
          {
            getFieldDecorator('roleName', {
              rules: [
                { required: true, message: '必须输入角色名称' }
              ],
            })(
              <Input placeholder="请输入角色名称" />,
            )
          }
        </Form.Item>
      </Form>
    )
  }
}
export default AddForm

