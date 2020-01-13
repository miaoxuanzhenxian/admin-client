import React, { Component } from 'react';
import { Card, Select, Input, Button, Icon, Table, message } from 'antd';

import style from './index.module.less';
import LinkButton from '@/components/link-button';
import { reqProducts } from '@/api';

const { Option } = Select

export default class Product extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      total: 0, //商品的总数量
      products: [] //商品列表
    }

    this.initColumns()
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        width: '100px',
        dataIndex: 'price',
        render: (price) => '¥' + price
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          let btnText = '下架'
          let text = '在售'
          if (status === 2) {
            btnText = '上架'
            text = '已下架'
          }
          return (
            <span>
              <Button type="primary">{btnText}</Button> <br />
              <span>{text}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: (product) => (
          <span>
            <LinkButton>详情</LinkButton> <br />
            <LinkButton>修改</LinkButton>
          </span>
        )
      },
    ]
  }

  /*
    异步获取指定页码商品列表显示（后台分页）
  */
  getProducts = async (pageNum) => {
    // 发请求获取指定页码商品列表数据
    const result = await reqProducts(pageNum, 3);
    if (result.status === 0) {
      // 取出数据
      const { total, list } = result.data
      // 更新状态
      this.setState({
        total,
        products: list
      })
    } else {
      message.error(`获取第${pageNum}页商品列表失败`)
    }
  }

  componentDidMount() {
    //获取第一页商品列表显示
    this.getProducts(1)
  }

  render() {
    //取出状态数据
    const { loading, total, products } = this.state
    //Card左上角结构
    const title = (
      <span>
        <Select className={style['search-select']} value="1">
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input className={style['search-input']} placeholder="关键字" />
        <Button type="primary">搜索</Button>
      </span>
    )
    //Card右上角结构
    const extra = (
      <Button type="primary">
        <Icon type="plus" />
        添加商品
      </Button>
    )
    return (
      <div className={style.product}>
        <Card title={title} extra={extra}>
          <Table
            bordered
            loading={loading}
            columns={this.columns}
            dataSource={products}
            rowKey='_id'
            pagination={{
              total,
              defaultPageSize: 3,
              showQuickJumper: true,
              onChange: this.getProducts
            }}
          />
        </Card>
      </div>
    )
  }
}
