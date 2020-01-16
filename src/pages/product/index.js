import React, { Component } from 'react';
import { Card, Select, Input, Button, Icon, Table, message } from 'antd';

import style from './index.module.less';
import LinkButton from '@/components/link-button';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '@/api';
import { PAGE_SIZE } from '@/utils/constants'

const { Option } = Select

export default class Product extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      total: 0, //商品的总数量
      products: [], //商品列表
      searchType: 'productName', // 默认是按商品名称搜索
      searchName: '', // 搜索的关键字
    }

    this.initColumns()
  }

  updateStatus = async (productId, status) => {
    // 计算更新后的值
    status = status === 1 ? 2 : 1
    // 请求更新
    const result = await reqUpdateStatus(productId, status);
    if (result.status === 0) {
      message.success('更新商品状态成功!')
      // 获取当前页显示
      this.getProducts(this.pageNum)
    } else {
      message.error('更新商品状态失败!')
    }
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
        width: '100px',
        render: ({ _id, status }) => {
          let btnText = '下架'
          let text = '在售'
          if (status === 2) {
            btnText = '上架'
            text = '已下架'
          }
          return (
            <span>
              <Button type="primary" onClick={this.updateStatus.bind(this, _id, status)}>
                {btnText}
              </Button> <br />
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
    异步获取指定页码商品分页(可能带搜索)列表显示
  */
  getProducts = async (pageNum) => {
    // 保存当前请求的页码
    this.pageNum = pageNum

    const { searchType, searchName } = this.state
    let result
    // 发请求获取数据
    if (!searchName) {
      // 发获取商品分页列表(后台分页)请求
      result = await reqProducts(pageNum, PAGE_SIZE);
    } else {
      // 发搜索产品分页列表请求
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName })
    }
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
    const { loading, total, products, searchType, searchName } = this.state
    //Card左上角结构
    const title = (
      <span>
        <Select
          className={style['search-select']}
          value={searchType}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          className={style['search-input']}
          placeholder="关键字"
          value={searchName}
          onChange={e => this.setState({ searchName: e.target.value })}
        />
        <Button
          type="primary"
          onClick={this.getProducts.bind(this, 1)}
        >
          搜索
        </Button>
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
              defaultPageSize: PAGE_SIZE,
              showQuickJumper: true,
              onChange: this.getProducts,
              current: this.pageNum,
            }}
          />
        </Card>
      </div>
    )
  }
}
