import React, { Component } from 'react'
import { Card, Button } from 'antd'
// import ReactEcharts from 'echarts-for-react' // 全部导入
import ReactEchartsCore from 'echarts-for-react/lib/core' // 按需导入
import echarts from 'echarts/lib/echarts' // 按需导入
import 'echarts/lib/chart/bar' // 按需导入
import 'echarts/lib/component/title' // 按需导入
import 'echarts/lib/component/tooltip' // 按需导入
import 'echarts/lib/component/legend' // 按需导入

/*
  后台管理的柱状图路由组件
*/
export default class Bar extends Component {

  state = {
    sales: [5, 20, 36, 10, 10, 20], // 销量
    inventories: [15, 30, 46, 20, 20, 40], // 库存
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
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: sales
      }, {
        name: '库存',
        type: 'bar',
        data: inventories
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

        <Card title="柱状图一">
          {/* 全部导入 */}
          {/* <ReactEcharts option={this.getOption()} /> */}
          {/*  按需导入 */}
          <ReactEchartsCore
            echarts={echarts}
            option={this.getOption()}
            style={{ height: '300px' }}
          />
        </Card>
      </div>
    )
  }
}
