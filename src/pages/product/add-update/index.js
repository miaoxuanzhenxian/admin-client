import React, { Component } from 'react'
import { Card, Icon, Form, Input, Select, Button, message, } from 'antd';

import LinkButton from '@/components/link-button';
import { reqCategorys } from '@/api'

const { Item } = Form
const { Option } = Select

/* 
商品详情路由组件
*/
@Form.create()
class ProductAddUpdate extends Component {

  state = {
    categorys: []
  }

  /*
    异步获取分类列表显示
  */
  getCategorys = async () => {
    //发异步ajax请求
    const result = await reqCategorys()
    if (result.status === 0) {
      //取出分类列表
      const categorys = result.data
      //更新状态categorys数据
      this.setState({
        categorys
      })
    } else {
      message.error('获取分类列表失败')
    }
  }

  /* 
    对价格进行自定义验证
  */
  validatePrice = (rule, value, callback) => {
    if (!value) {
      callback()
    } else if (value * 1 <= 0) { // 乘以1可以使得字符串类型转换为数字类型，当然在此其实不需要乘以1，它会在字符串与数字比较大小时，会自动将字符串自动隐式类型转换为数字类型后再去比较，只有当自动隐式类型转换不了时，我们才加上乘以1，使其能转化为数字类型。
      callback('价格必须大于0')
    } else {
      callback()
    }
  }

  /*
    处理表单提交的回调
  */
  handleSubmit = e => {
    // 阻止事件的默认行为(提交表单)
    e.preventDefault()

    // 进行统一的表单验证
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { name, desc, price, categoryId } = values
        console.log('发送请求', name, desc, price, categoryId)
      }
    })
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {
    const { categorys } = this.state

    const { getFieldDecorator } = this.props.form

    const title = (
      <span>
        <LinkButton onClick={this.props.history.goBack}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>添加商品</span>
      </span>
    )

    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    return (
      <div>
        <Card title={title}>
          <Form {...formLayout} onSubmit={this.handleSubmit}>
            <Item label="商品名称">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '必须输入商品名称!' },
                ],
              })(<Input placeholder="商品名称" />)}
            </Item>
            <Item label="商品描述">
              {getFieldDecorator('desc', {
                rules: [
                  { required: true, message: '必须输入商品描述!' },
                ],
              })(<Input placeholder="商品描述" />)}
            </Item>
            <Item label="商品价格">
              {getFieldDecorator('price', {
                rules: [
                  { required: true, message: '必须输入价格!' },
                  { validator: this.validatePrice },
                ],
              })(<Input type="number" placeholder="商品价格" addonAfter="元" />)}
            </Item>
            <Item label="商品分类">
              {getFieldDecorator('categoryId', {
                initialValue: '',
                rules: [
                  { required: true, message: '必须选择商品分类!' },
                ],
              })(
                <Select>
                  <Option value="">未选择</Option>
                  {
                    categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                  }
                </Select>
              )}
            </Item>
            <Item label="商品图片">
              <div>商品图片组件</div>
            </Item>
            <Item label="商品详情">
              <div>商品详情组件</div>
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">提交</Button>
            </Item>
          </Form>
        </Card>
      </div>
    )
  }
}
export default ProductAddUpdate
