/*
  前台404页面
 */
import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import { connect } from 'react-redux'

import { setHeaderTitle } from '@/redux/actions'
import style from './index.module.less'

@connect(
  state => ({}),
  { setHeaderTitle }
)
class NotFound extends Component {

  constructor(props) {
    super(props)
  
    this.props.setHeaderTitle('404')
  }
  
  goHome = () => {
    this.props.history.replace('/')
    this.props.setHeaderTitle('首页')
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

export default NotFound
