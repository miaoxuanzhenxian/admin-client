import React, { Component } from 'react'
import {
  Card,
  Statistic,
  Icon,
  DatePicker,
  Timeline
} from 'antd'
import moment from 'moment'

import style from './index.module.less'

const { RangePicker } = DatePicker
const { Item } = Timeline


/* 首页 */
export default class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      key: 'app', // Card的默认显示的页签的标题的key
    }

    this.initTabList() // 初始化Card的页签标题列表
    this.initContentList() // 初始化Card的页签内容列表
  }

  /* 初始化Card的页签标题列表 */
  initTabList = () => {
    this.tabList = [
      {
        key: 'article',
        tab: 'article',
      },
      {
        key: 'app',
        tab: 'app',
      },
      {
        key: 'project',
        tab: 'project',
      },
    ]
  }

  /* 初始化Card的页签内容列表 */
  initContentList = () => {
    this.contentList = {
      article: <p>article content</p>,
      app: <p>app content</p>,
      project: <p>project content</p>,
    }
  }

  /* 页签切换的回调 */
  handleTabChange = (key) => {
    this.setState({ key })
  }

  render() {

    const { key } = this.state

    const statisticCardExtra = (
      <Icon type="question-circle" style={{ color: 'rgba(0, 0, 0, .45)' }} />
    )

    const dateFormat = 'YYYY/MM/DD'
    const contentCardExtra = (
      <RangePicker
        defaultValue={[moment('2019/01/01', dateFormat), moment('2020/03/06', dateFormat)]}
        format={dateFormat}
      />
    )

    return (
      <div className={style.home}>
        <Card
          className={style['home-statistic-card']}
          title="商品总量"
          extra={statisticCardExtra}
          headStyle={{ color: 'rgba(0, 0, 0, .45)' }}
        >
          <Statistic
            value={1128163}
            suffix="个"
            valueStyle={{ fontWeight: 'bolder' }}
          />
          <Statistic
            value={15}
            valueStyle={{ fontSize: 15 }}
            prefix="周同比"
            suffix={<div>%<Icon type='arrow-down' style={{ color: 'red', marginLeft: '10px' }} /></div>}
          />
          <Statistic
            value={15}
            valueStyle={{ fontSize: 15 }}
            prefix="日同比"
            suffix={<div>%<Icon type='arrow-up' style={{ color: '#3f8600', marginLeft: '10px' }} /></div>}
          />
        </Card>

        <Card
          className={style['home-content']}
          tabBarExtraContent={contentCardExtra}
          tabList={this.tabList}
          activeTabKey={key}
          onTabChange={this.handleTabChange}
        >
          <Card
            className={style['home-tab-left']}
            title={this.tabList.find(item => item.key === key).tab}
            extra={<Icon type="reload" />}
            bodyStyle={{ height: '275px' }}
          >
            {this.contentList[key]}
          </Card>

          <Card
            className={style['home-tab-right']}
            title="任务"
            extra={<Icon type="reload" />}
          >
            <Timeline>
              <Item color="green">新版本迭代会</Item>
              <Item color="green">完成网站设计初版</Item>
              <Item color="red">
                <p>联调接口</p>
                <p>功能验收</p>
              </Item>
              <Item>
                <p>登录功能设计</p>
                <p>权限验证</p>
                <p>页面排版</p>
              </Item>
            </Timeline>
          </Card>
        </Card>
      </div >
    )
  }
}