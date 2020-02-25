import React, { Component } from 'react'
import { Card, Button } from 'antd'
// import ReactEcharts from 'echarts-for-react' // 全部导入
import ReactEchartsCore from 'echarts-for-react/lib/core' // 按需导入
import echarts from 'echarts/lib/echarts' // 按需导入
import 'echarts/lib/chart/line' // 按需导入
import 'echarts/lib/component/title' // 按需导入
import 'echarts/lib/component/tooltip' // 按需导入
import 'echarts/lib/component/legend' // 按需导入

/*
  后台管理的折线图路由组件
*/
export default class Line extends Component {

  state = {
    sales: [5, 20, 36, 10, 10, 20],
    inventories: [15, 30, 46, 20, 20, 40],
  }

  getOption = () => {
    const { sales, inventories } = this.state
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        type: 'category',
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '销量',
        type: 'line',
        data: sales
      }, {
        name: '库存',
        type: 'line',
        data: inventories
      }]
    }
  }

  getOption2 = () => {
    const { sales } = this.state
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: "销量",
        type: 'line',
        data: sales,
        areaStyle: {},
      }]
    }
  }

  handleUpdate = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      inventories: state.inventories.map(inventory => inventory - 1)
    }))
  }

  render() {
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleUpdate}>更新</Button>
        </Card>

        <Card title="折线图一">
          {/* 全部导入 */}
          {/* <ReactEcharts option={this.getOption()} style={{ height: '300px' }} /> */}

          {/* 按需导入 */}
          <ReactEchartsCore 
            echarts={echarts}
            option={this.getOption()}
            style={{ height: '300px' }}
          />
        </Card>

        <Card title="折线图二">
          {/* 全部导入 */}
          {/* <ReactEcharts option={this.getOption2()} style={{ height: '300px' }} /> */}

          {/* 按需导入 */}
          <ReactEchartsCore 
            echarts={echarts}
            option={this.getOption2()}
            style={{ height: '300px' }}
          />
        </Card>
      </div>
    )
  }
}
