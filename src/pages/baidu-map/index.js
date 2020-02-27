import React, { Component } from 'react'

export default class BaiduMap extends Component {

  renderMap = () => {
    const { BMap, BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP } = window
    // 创建Map实例
    var map = new BMap.Map("container")
    // 初始化地图,用城市名设置地图中心点和地图级别
    map.centerAndZoom("北京") // 设初始化地图。如果center类型为Point时，zoom必须赋值，范围3-19级，若调用高清底图（针对移动端开发）时，zoom可赋值范围为3-18级。如果center类型为字符串时，比如“北京”，zoom可以忽略，地图将自动根据center适配最佳zoom级别
    // 初始化地图,设置中心点坐标和地图级别
    // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
    // 添加地图类型控件
    map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP] }))
    // 添加城市列表控件
    map.addControl(new BMap.CityListControl())
    map.addControl(new BMap.OverviewMapControl({ isOpen: true }))
    //开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true)

    // 步行路线规划
    var walking = new BMap.WalkingRoute(map, { renderOptions: { map: map, autoViewport: true } })
    walking.search('故宫', '清华大学')

    /* // 骑行路线规划
    var riding = new BMap.RidingRoute(map, { renderOptions: { map: map, autoViewport: true } })
    riding.search('故宫', '清华大学') */

    /* // 公交路线规划
    var transit = new BMap.TransitRoute(map, { renderOptions: { map: map, autoViewport: true } }) // 百度地图3.0版本中的公交(TransitRoute)和驾车(DrivingRoute)的路线规划暂不支持起参数为关键字，只支持坐标点，开发者可以先用检索接口确认关键字的坐标点
    var myGeo = new BMap.Geocoder()
    // 将地址解析为含经纬度的Point对象
    myGeo.getPoint("天安门", function (point) {
      if (point) {
        var start = point
        myGeo.getPoint("百度大厦", function (point) {
          if (point) {
            var end = point
            transit.search(start, end)
          } else {
            alert("您选择地址没有解析到结果!")
          }
        }, "北京市")
      } else {
        alert("您选择地址没有解析到结果!")
      }
    }, "北京市") */

    /* // 驾车路线规划
    var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } }) // 百度地图3.0版本中的公交(TransitRoute)和驾车(DrivingRoute)的路线规划暂不支持起参数为关键字，只支持坐标点，开发者可以先用检索接口确认关键字的坐标点
    var myGeo = new BMap.Geocoder()
    // 将地址解析为含经纬度的Point对象
    myGeo.getPoint("天安门", function (point) {
      if (point) {
        var start = point
        myGeo.getPoint("百度大厦", function (point) {
          if (point) {
            var end = point
            driving.search(start, end)
          } else {
            alert("您选择地址没有解析到结果!")
          }
        }, "北京市")
      } else {
        alert("您选择地址没有解析到结果!")
      }
    }, "北京市") */

  }

  componentDidMount() {
    this.renderMap()
  }

  render() {
    return (
      <div id="container" style={{ height: '100%' }} />
    )
  }
}
