import React, { Component } from 'react'
import { Card, Icon, List } from 'antd';

import LinkButton from '@/components/link-button';
import style from './index.module.less';

const { Item } = List

/* 
商品详情路由组件
*/
export default class ProductDetail extends Component {
  render() {
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
              <span>aaa</span>
            </Item>
            <Item>
              <span className={style['detail-left']}>商品描述:</span>
              <span>bbb</span>
            </Item>
            <Item>
              <span className={style['detail-left']}>商品价格:</span>
              <span>11元</span>
            </Item>
            <Item>
              <span className={style['detail-left']}>所属分类:</span>
              <span>ccc</span>
            </Item>
            <Item>
              <span className={style['detail-left']}>商品图片:</span>
              <span>
                <img className={style['detail-img']} src="http://localhost:5000/upload/image-1578734781854.jpg" alt="" />
                <img className={style['detail-img']} src="http://localhost:5000/upload/image-1578734781854.jpg" alt="" />
              </span>
            </Item>
            <Item>
              <span className={style['detail-left']}>商品详情:</span>
              <div dangerouslySetInnerHTML={{ __html: '<a href="javascript:">百度</a>' }} />
            </Item>
          </List>
        </Card>
      </div>
    )
  }
}
