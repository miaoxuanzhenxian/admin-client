import React, { Component } from 'react';
import { Form, Input } from 'antd';

@Form.create()
class AddUpdateForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form>
          <Form.Item>
            {
              getFieldDecorator('categoryName', {
                rules: [
                  { required: true, message: '分类名称必须输入' }
                ]
              })(
                <Input placeholder="请输入分类名称" />
              )
            }
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default AddUpdateForm;
