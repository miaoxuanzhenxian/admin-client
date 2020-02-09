import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Card, Icon, List, message } from 'antd';

import LinkButton from '@/components/link-button';
import style from './index.module.less';
import memoryUtils from '@/utils/memoryUtils'
import { BASE_IMG } from '@/utils/constants'
import { reqCategory } from '@/api'

const { Item } = List

/* 
商品详情路由组件
*/
export default class ProductDetail extends Component {

  state = {
    categoryName: '',
  }

  getCategory = async () => {
    const product = memoryUtils.product
    const categoryId = product && product.categoryId
    if (categoryId) {
      const result = await reqCategory(categoryId)
      if (result.status === 0) {
        const data = result.data
        const categoryName = data && data.name
        this.setState({
          categoryName
        })
      } else {
        message.error(result.msg)
      }
    }
  }

  componentDidMount() {
    this.getCategory()
  }

  componentWillUnmount() {
    this.setState = () => { }
  }

  render() {
    const { categoryName } = this.state
    const product = memoryUtils.product
    if (!product || !product._id) {
      return <Redirect to="/product" />
    }

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
                  product.imgs.map(img => <img className={style['detail-img']} key={img} src={BASE_IMG + img} alt="img" />)
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
