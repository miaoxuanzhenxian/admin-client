import React, { Component } from 'react'
import { Card, Icon, List, message } from 'antd'

import LinkButton from '@/components/link-button'
import style from './index.module.less'
import memoryUtils from '@/utils/memoryUtils'
import { BASE_IMG } from '@/utils/constants'
import { reqCategory, reqProduct } from '@/api'

const { Item } = List

/* 
商品详情路由组件
*/
export default class ProductDetail extends Component {

  state = {
    categoryName: '',
    product: memoryUtils.product
  }

  /* 根据分类ID获取分类 */
  getCategory = async (categoryId) => {
    const result = await reqCategory(categoryId)
    if (result.status === 0) {
      const data = result.data
      const categoryName = data && data.name
      this.setState({
        categoryName
      })
    } else {
      message.error('获取分类失败')
    }
  }

  /* 根据商品ID获取商品 */
  getProduct = async () => {
    let product = this.state.product
    if (product._id) { // 如果商品有数据, 获取对应的分类
      this.getCategory(product.categoryId) // 根据分类ID获取分类
    } else { // 如果当前product状态没有数据, 根据路由参数中id参数请求获取商品并更新
      const result = await reqProduct(this.props.match.params.id)
      if (result.status === 0) {
        product = result.data
        if (product) {
          this.setState({ product })
          this.getCategory(product.categoryId) // 根据分类ID获取分类
        }
      } else {
        message.error('获取商品失败')
      }
    }
  }

  componentDidMount() {
    this.getProduct() // 根据商品ID获取商品
  }

  componentWillUnmount() {
    this.setState = () => { }
  }

  render() {
    const { categoryName, product } = this.state
  
    const title = (
      <span>
        <LinkButton onClick={this.props.history.goBack}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <div>
        <Card title={title} className={style['product-detail']}>
          <List>
            <Item>
              <span className={style['detail-left']}>商品名称:</span>
              <span>{product.name}</span>
            </Item>
            <Item>
              <span className={style['detail-left']}>商品描述:</span>
              <span>{product.desc}</span>
            </Item>
            <Item>
              <span className={style['detail-left']}>商品价格:</span>
              <span>{product.price}元</span>
            </Item>
            <Item>
              <span className={style['detail-left']}>所属分类:</span>
              <span>{categoryName}</span>
            </Item>
            <Item>
              <span className={style['detail-left']}>商品图片:</span>
              <span>
                {
                  product.imgs && product.imgs.map(img => <img className={style['detail-img']} key={img} src={BASE_IMG + img} alt="img" />)
                }
              </span>
            </Item>
            <Item>
              <span className={style['detail-left']}>商品详情:</span>
              <div dangerouslySetInnerHTML={{ __html: product.detail }} />
            </Item>
          </List>
        </Card>
      </div>
    )
  }
}
