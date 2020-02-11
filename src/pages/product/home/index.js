import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message,
} from 'antd';
import throttle from 'lodash.throttle'; // lodash和qs这两个库属于基本的工具库，在我们前面所下的许多依赖包里都已经下载引用了这两个包，因此不需要再重新下载了，可以直接引用。并且lodash这个库可以模块化的按需引用。

import style from './index.module.less';
import LinkButton from '@/components/link-button';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '@/api';
import { PRODUCT_PAGE_SIZE } from '@/utils/constants'
import memoryUtils from '@/utils/memoryUtils'

const { Option } = Select
/* 
商品管理的首页组件
*/
export default class ProductHome extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false, // 是否正在请求加载中,初始为关闭状态，不显示loading
      total: 0, //商品的总数量
      products: [], //商品列表
      searchType: 'productName', // 默认是按商品名称搜索
      searchName: '', // 搜索的关键字
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
            <LinkButton
              onClick={() => {
                // 在内存中保存product
                memoryUtils.product = product
                this.props.history.push('/product/detail/' + product._id)
              }}
            >
              详情
            </LinkButton> <br />
            <LinkButton
              onClick={() => {
                // 在内存中保存product
                memoryUtils.product = product
                this.props.history.push('/product/addupdate')
              }}
            >
              修改
            </LinkButton>
          </span>
        )
      },
    ]
  }

  /* 
    更新商品状态
  */
  updateStatus = throttle(async (productId, status) => {
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
  }, 2000)

  /*
    异步获取指定页码商品分页(可能带搜索)列表显示
  */
  getProducts = async (pageNum) => {
    //开启loading，显示loading
    this.setState({ loading: true })
    // 保存当前请求的页码
    this.pageNum = pageNum

    const { searchType, searchName } = this.state
    let result
    // 发请求获取数据
    if (!searchName) {
      // 发获取商品分页列表(后台分页)请求
      result = await reqProducts(pageNum, PRODUCT_PAGE_SIZE);
    } else {
      // 发搜索产品分页列表请求
      result = await reqSearchProducts({ pageNum, pageSize: PRODUCT_PAGE_SIZE, searchType, searchName })
    }
    if (result.status === 0) {
      // 取出数据
      const { total, list } = result.data
      // 更新状态
      this.setState({
        loading: false, //成功了后关闭loading,不显示loading（其实就是删除loading组件）
        total,
        products: list,
      })
    } else {
      message.error(`获取第${pageNum}页商品列表失败`)
      this.setState({ loading: false }) //获取商品列表失败后关闭loading,不显示loading（其实就是删除loading组件）
    }
  }

  componentDidMount() {
    //获取第一页商品列表显示
    this.getProducts(1)
  }

  componentWillUnmount() {
    this.setState = () => { }
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
      <Button type="primary" onClick={() => {
        memoryUtils.product = {}
        this.props.history.push('/product/addupdate')
      }}>
        <Icon type="plus" />
        添加商品
      </Button>
    )
    return (
      <div className={style['product-home']}>
        <Card title={title} extra={extra}>
          <Table
            bordered
            loading={loading}
            columns={this.columns}
            dataSource={products}
            rowKey='_id'
            pagination={{
              total,
              defaultPageSize: PRODUCT_PAGE_SIZE,
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
