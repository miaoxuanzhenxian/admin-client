import React, { Component } from 'react'

import startIcon from './images/start_point.png'
import endIcon from './images/end_point.png'
import bike from './images/bike.jpg'

export default class BaiduMap extends Component {

  /* 渲染百度地图 */
  renderMap = () => {
    const { BMap, BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP } = window
    // 创建Map实例
    const map = new BMap.Map("container")
    // 初始化地图,用城市名设置地图中心点和地图级别
    // map.centerAndZoom("北京") // 设初始化地图。如果center类型为Point时，zoom必须赋值，范围3-19级，若调用高清底图（针对移动端开发）时，zoom可赋值范围为3-18级。如果center类型为字符串时，比如“北京”，zoom可以有也可以忽略，zoom忽略时地图将自动根据center适配最佳zoom级别
    map.centerAndZoom("北京", 11) // 设初始化地图。如果center类型为Point时，zoom必须赋值，范围3-19级，若调用高清底图（针对移动端开发）时，zoom可赋值范围为3-18级。如果center类型为字符串时，比如“北京”，zoom可以有也可以忽略，zoom忽略时地图将自动根据center适配最佳zoom级别
    // 初始化地图,设置中心点坐标和地图级别
    // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
    // 添加地图类型控件
    map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP] }))
    // 添加城市列表控件
    map.addControl(new BMap.CityListControl())
    map.addControl(new BMap.OverviewMapControl({ isOpen: true }))
    //开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true)

    /* 绘制车辆起点和终点 */
    // 车辆起点
    const startPoint = new BMap.Point('116.353101', '40.067835')
    // 车辆起点图标icon
    const startPointIcon = new BMap.Icon(startIcon, new BMap.Size(36, 42), {
      anchor: new BMap.Size(18, 42)
    })
    // 车辆起点的覆盖物
    const bikeMarkerStart = new BMap.Marker(startPoint, { icon: startPointIcon })
    // 将车辆起点的覆盖物添加到地图中
    map.addOverlay(bikeMarkerStart)
    // 车辆终点
    const endPoint = new BMap.Point('116.397801', '40.01641')
    // 车辆终点图标icon
    const endPointIcon = new BMap.Icon(endIcon, new BMap.Size(36, 42), {
      anchor: new BMap.Size(18, 42)
    })
    // 车辆终点的覆盖物
    const bikeMarkerEnd = new BMap.Marker(endPoint, { icon: endPointIcon })
    // 将车辆终点的覆盖物添加到地图中
    map.addOverlay(bikeMarkerEnd)

    /* 绘制车辆行驶路线 */
    const route_list = ['116.353101,40.067835', '116.357701,40.053699', '116.374086,40.027626', '116.397801,40.01641']
    const routeList = []
    route_list.forEach(item => {
      const p = item.split(',')
      routeList.push(new BMap.Point(p[0], p[1]))
    })
    // 车辆行驶路线的覆盖物
    const routePolyline = new BMap.Polyline(routeList, {
      strokeColor: '#ef4136',
      strokeWeight: 2,
    })
    // 将车辆行驶路线的覆盖物添加到地图中
    map.addOverlay(routePolyline)

    /* 绘制车辆服务区 */
    const service_list = [{
      "lon": "116.274737",
      "lat": "40.139759",
      "ts": null
    },
    {
      "lon": "116.316562",
      "lat": "40.144943",
      "ts": null
    },
    {
      "lon": "116.351631",
      "lat": "40.129498",
      "ts": null
    },
    {
      "lon": "116.390582",
      "lat": "40.082481",
      "ts": null
    },
    {
      "lon": "116.38742",
      "lat": "40.01065",
      "ts": null
    },
    {
      "lon": "116.414297",
      "lat": "40.01181",
      "ts": null
    },
    {
      "lon": "116.696242",
      "lat": "39.964035",
      "ts": null
    },
    {
      "lon": "116.494498",
      "lat": "39.851306",
      "ts": null
    },
    {
      "lon": "116.238086",
      "lat": "39.848647",
      "ts": null
    },
    {
      "lon": "116.189454",
      "lat": "39.999418",
      "ts": null
    },
    {
      "lon": "116.244646",
      "lat": "39.990574",
      "ts": null
    },
    {
      "lon": "116.281441",
      "lat": "40.008703",
      "ts": null
    },
    {
      "lon": "116.271092",
      "lat": "40.142201",
      "ts": null
    },
    {
      "lon": "116.271092",
      "lat": "40.142201",
      "ts": null
    }
    ]
    const serviceList = []
    service_list.forEach(item => {
      serviceList.push(new BMap.Point(item.lon, item.lat))
    })
    // 车辆行服务区的覆盖物
    const servicePolyline = new BMap.Polyline(serviceList, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
    })
    // 将车辆服务区的覆盖物添加到地图中
    map.addOverlay(servicePolyline)

    /* 绘制地图中的车辆分布 */
    // 车辆分布的坐标
    const bike_list = ['116.356619,40.017782', '116.437107,39.975331', '116.34972,40.070808', '116.323849,39.964714', '116.404912,40.015129', '116.365243,39.958078']
    // 车辆图标icon
    const bikeIcon = new BMap.Icon(bike, new BMap.Size(36, 42), {
      anchor: new BMap.Size(18, 42)
    })
    bike_list.forEach(item => {
      const p = item.split(',')
      // 车辆分布的点
      const bikePoint = new BMap.Point(p[0], p[1])
      // 车辆的覆盖物
      const bikeMarker = new BMap.Marker(bikePoint, { icon: bikeIcon })
      // 将车辆的覆盖物添加到地图中
      map.addOverlay(bikeMarker)
    })

    /* // 步行路线规划
    var walking = new BMap.WalkingRoute(map, { renderOptions: { map: map, autoViewport: true } })
    walking.search('故宫', '清华大学') */

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
