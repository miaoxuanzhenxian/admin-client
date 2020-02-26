import React, { Component } from 'react'

export default class BaiduMap extends Component {

  renderMap = () => {
    const { BMap } = window
    // 创建Map实例
    var map = new BMap.Map("container")
    // 初始化地图,用城市名设置地图中心点
    // map.centerAndZoom("昆山",15);
    // 初始化地图,设置中心点坐标和地图级别
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl())
    //开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true)
  }

  componentDidMount() {
    this.renderMap()
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <div id="container" style={{ height: '100%' }}></div>
      </div>
    )
  }
}
