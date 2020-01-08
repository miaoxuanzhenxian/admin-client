import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Form, Input } from 'antd';

@Form.create()
class AddUpdateForm extends Component {

  static propTypes = {
    setForm: propTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  
    this.props.setForm(this.props.form);
  }
  

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
