import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'

import style from './index.module.less'

export default class NotFound extends Component {

  goHome = () => {
    this.props.history.replace('/')
  }

  render() {
    return (
      <Row className={style['not-found']}>
        <Col span={12} className={style.left}></Col>
        <Col span={12} className={style.right}>
          <h1>404</h1>
          <h2>抱歉，你访问的页面不存在</h2>
          <Button type="primary" onClick={this.goHome}>
            回到首页
          </Button>
        </Col>
      </Row>
    )
  }
}
