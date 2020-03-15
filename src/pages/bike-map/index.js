import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { setBikeMapCity } from '@/redux/actions'
import { reqBikeMap } from '@/api'
import style from './index.module.less'
import startIcon from './images/start_point.png'
import endIcon from './images/end_point.png'
import bike from './images/bike.jpg'


/* 百度地图 */
@connect(
  state => ({ bikeMapCity: state.bikeMapCity }),
  { setBikeMapCity }
)
class BikeMap extends PureComponent {

  state = {
    total_count: null,
    bikeMapError: ''
  }

  /* 根据城市名渲染百度地图上的城市共享单车地图 */
  renderBikeMap = async (city) => {
    // 发请求
    const result = await reqBikeMap(city)
    if (result.status === 0) {
      // 清除地图上所有覆盖物
      this.map.clearOverlays()
      // 从window中取出所需的全局变量
      const { BMap } = window
      // 从返回结果中取出所需数据
      const { total_count, bike_list, route_list, service_list } = result.data
      // 更新车辆总数状态
      this.setState({
        total_count,
        bikeMapError: ''
      })
      /* 绘制车辆起点和终点 */
      // 车辆起点
      const startGps = route_list[0].split(',')
      const startPoint = new BMap.Point(startGps[0], startGps[1])
      // 车辆起点图标icon
      const startPointIcon = new BMap.Icon(startIcon, new BMap.Size(36, 42), {
        anchor: new BMap.Size(18, 42)
      })
      // 车辆起点的覆盖物
      const bikeMarkerStart = new BMap.Marker(startPoint, { icon: startPointIcon })
      // 将车辆起点的覆盖物添加到地图中
      this.map.addOverlay(bikeMarkerStart)
      // 车辆终点
      const endGps = route_list[route_list.length - 1].split(',')
      const endPoint = new BMap.Point(endGps[0], endGps[1])
      // 车辆终点图标icon
      const endPointIcon = new BMap.Icon(endIcon, new BMap.Size(36, 42), {
        anchor: new BMap.Size(18, 42)
      })
      // 车辆终点的覆盖物
      const bikeMarkerEnd = new BMap.Marker(endPoint, { icon: endPointIcon })
      // 将车辆终点的覆盖物添加到地图中
      this.map.addOverlay(bikeMarkerEnd)

      /* 绘制车辆行驶路线 */
      const routeList = []
      route_list.forEach(item => {
        const p = item.split(',')
        routeList.push(new BMap.Point(p[0], p[1]))
      })
      // 车辆行驶路线的覆盖物
      const routePolyline = new BMap.Polyline(routeList, {
        strokeColor: '#ef4136',
        strokeWeight: 2
      })
      // 将车辆行驶路线的覆盖物添加到地图中
      this.map.addOverlay(routePolyline)

      /* 绘制车辆服务区 */
      const serviceList = []
      service_list.forEach(item => {
        serviceList.push(new BMap.Point(item.lon, item.lat))
      })
      // 车辆行服务区的覆盖物
      const servicePolyline = new BMap.Polyline(serviceList, {
        strokeColor: '#ef4136',
        strokeWeight: 3
      })
      // 将车辆服务区的覆盖物添加到地图中
      this.map.addOverlay(servicePolyline)

      /* 绘制地图中的车辆分布 */
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
        this.map.addOverlay(bikeMarker)
      })
    } else {
      this.setState({
        total_count: null,
        bikeMapError: result.msg
      })
    }
  }

  /* 渲染百度地图 */
  renderMap = () => {
    // 从window中取出所需的全局变量
    const { BMap, BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP } = window

    try {
      // 创建Map实例
      this.map = new BMap.Map("bike-map-container")
    } catch (error) {
      this.setState({
        total_count: null,
        bikeMapError: '百度地图连接出错'
      })
      return
    }
    // 初始化地图,用城市名设置地图中心点和地图级别
    // map.centerAndZoom("北京") // 设初始化地图。如果center类型为Point时，zoom必须赋值，范围3-19级，若调用高清底图（针对移动端开发）时，zoom可赋值范围为3-18级。如果center类型为字符串时，比如“北京”，zoom可以有也可以忽略，zoom忽略时地图将自动根据center适配最佳zoom级别
    this.map.centerAndZoom(this.props.bikeMapCity, 11) // 设初始化地图。如果center类型为Point时，zoom必须赋值，范围3-19级，若调用高清底图（针对移动端开发）时，zoom可赋值范围为3-18级。如果center类型为字符串时，比如“北京”，zoom可以有也可以忽略，zoom忽略时地图将自动根据center适配最佳zoom级别
    // 初始化地图,设置中心点坐标和地图级别
    // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
    // 添加地图类型控件
    this.map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP] }))
    // 添加城市列表控件
    // map.addControl(new BMap.CityListControl())
    this.map.addControl(new BMap.CityListControl({
      onChangeSuccess: (e) => {
        // console.log(e) // city: "上海市",code:289,level:12,point:{lat: 31.236304654494646,lng: 121.48023738884737},title:"上海市",uid:"4141110d95d0f74fefe4a5f0"
        if (e.city !== this.props.bikeMapCity) { // 加上该条件，可以减少不必要的发请求及不必要调用this.props.setBikeMapCity(e.city),提高效率
          this.renderBikeMap(e.city) // 根据城市名渲染百度地图上的城市共享单车地图
          this.props.setBikeMapCity(e.city) // 改变redux中的城市共享单车地图城市
        }
      }
    }))
    // 添加缩略地图控件，并设置为默认打开
    this.map.addControl(new BMap.OverviewMapControl({ isOpen: true }))
    //开启鼠标滚轮缩放
    this.map.enableScrollWheelZoom(true)

    // 根据城市名渲染百度地图上的城市共享单车地图
    this.renderBikeMap(this.props.bikeMapCity)

    /* 地图移动结束时触发此事件,解决地图移动时导致城市名变更出现的bug */
    this.map.addEventListener("moveend", () => {
      new BMap.Geocoder().getLocation(this.map.getCenter(), rs => {
        const city = rs && rs.addressComponents.city
        if (city !== this.props.bikeMapCity) {
          this.renderBikeMap(city) // 根据城市名渲染百度地图上的城市共享单车地图
          this.props.setBikeMapCity(city) // 改变redux中的城市共享单车地图城市
        }
      })
    })


    /* // 步行路线规划
    const walking = new BMap.WalkingRoute(this.map, { renderOptions: { map: this.map, autoViewport: true } })
    walking.search('故宫', '清华大学') */

    /* // 骑行路线规划
    const riding = new BMap.RidingRoute(this.map, { renderOptions: { map: this.map, autoViewport: true } })
    riding.search('故宫', '清华大学') */

    /* // 公交路线规划
    const transit = new BMap.TransitRoute(this.map, { renderOptions: { map: this.map, autoViewport: true } }) // 百度地图3.0版本中的公交(TransitRoute)和驾车(DrivingRoute)的路线规划暂不支持起参数为关键字，只支持坐标点，开发者可以先用检索接口确认关键字的坐标点
    const myGeo = new BMap.Geocoder()
    // 将地址解析为含经纬度的Point对象
    myGeo.getPoint("天安门", function (point) {
      if (point) {
        const start = point
        myGeo.getPoint("百度大厦", function (point) {
          if (point) {
            const end = point
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
    const driving = new BMap.DrivingRoute(this.map, { renderOptions: { map: this.map, autoViewport: true } }) // 百度地图3.0版本中的公交(TransitRoute)和驾车(DrivingRoute)的路线规划暂不支持起参数为关键字，只支持坐标点，开发者可以先用检索接口确认关键字的坐标点
    const myGeo = new BMap.Geocoder()
    // 将地址解析为含经纬度的Point对象
    myGeo.getPoint("天安门", function (point) {
      if (point) {
        const start = point
        myGeo.getPoint("百度大厦", function (point) {
          if (point) {
            const end = point
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
    this.renderMap() // 渲染百度地图
  }

  render() {
    const { total_count, bikeMapError } = this.state

    return (
      <div className={style['bike-map']}>
        <div className={style['error-msg'] + ' ' + (bikeMapError ? style.show : '')}>{bikeMapError}</div>
        <div className={style['bike-map-count']}>共{total_count}辆车</div>
        <div id="bike-map-container" className={style['bike-map-container']} />
      </div>
    )
  }
}

export default BikeMap
