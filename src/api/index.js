/*
  所有请求接口的函数：接口请求函数
  函数的返回值都是promise对象
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

import { BASE_URL } from '@/utils/constants'

/* 请求登录 */
export const reqLogin = (username, password) => ajax.post(BASE_URL + '/login', { username, password })
/* export function reqLogin (username, password) {
  return ajax({
    method: 'post',
    url: baseURL + '/login',
    data: {
      username,
      password
    }
  });
} */

/* 发送jsonp请求得到天气信息 */
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {// 执行器函数: 内部去执行异步任务, 成功了调用resolve(), 失败了不调用reject(), 直接提示错误
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2` // 网上找的以前的别人的百度地图平台的浏览器端类型的ak，因为浏览器端类型的ak现在不支持天气查询了，但以前的浏览器端类型的ak还支持天气查询，因此暂时用网上找的以前的别人的浏览器端类型的ak代替着练习一下（以前我自己没注册浏览器端类型的ak，现在再注册的浏览器端类型的ak已经不支持天气查询了），但实际工作中在pc端肯定不能用网上找的别人的浏览器端类型的ak
    // const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=WvmttGBDHD6fRqeOOGPoshNl7SOfvUh5` // 百度地图平台的微信小程序类型的ak，因为浏览器端类型的ak现在不支持天气查询了，因此暂时用微信小程序类型的ak代替着练习一下，但实际工作中在pc端肯定不能用微信小程序类型的ak
    jsonp(url, { timeout: 7000 }, (err, data) => {
      if (!err && data.error === 0) {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        message.error('获取天气信息失败')
      }
    })
  })
}

/* 获取分类列表 */
export const reqCategorys = () => ajax(BASE_URL + '/manage/category/list')

/* 添加分类 */
export const reqAddCategory = (categoryName) => ajax.post(BASE_URL + '/manage/category/add', { categoryName })

/* 修改分类（更新品类名称）*/
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax.post(BASE_URL + '/manage/category/update', { categoryId, categoryName })

/* 获取商品分页列表(后台分页) */
export const reqProducts = (pageNum, pageSize) => ajax(BASE_URL + '/manage/product/list', {
  params: { // 包含所有query参数的对象
    pageNum,
    pageSize
  }
})

/* 根据Name/desc搜索产品分页列表 */
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType, // 它的值是'productName'或者'productDesc'
  searchName
}) => ajax(BASE_URL + '/manage/product/search', {
  // method: 'GET',
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName
  }
})

/* 根据商品ID获取商品 */
export const reqProduct = (productId) => ajax(BASE_URL + '/manage/product/info', {
  params: {
    productId
  }
})

/* 对商品进行上架/下架处理(设置对应status的值，status为1表示在售状态，2表示已下架状态) */
export const reqUpdateStatus = (productId, status) => ajax.post(BASE_URL + '/manage/product/updateStatus', { productId, status })

/* 根据分类ID获取分类 */
export const reqCategory = (categoryId) => ajax(BASE_URL + '/manage/category/info', {
  params: {
    categoryId
  }
})

/* 删除图片 */
export const reqDeleteImg = (name) => ajax.post(BASE_URL + '/manage/img/delete', { name })

/* 添加/修改更新商品 */
export const reqAddOrUpdateProduct = (product) => ajax.post(
  BASE_URL + '/manage/product/' + (product._id ? 'update' : 'add'),
  product
)

/* 获取角色列表 */
export const reqRoles = () => ajax(BASE_URL + '/manage/role/list')

/* 添加角色 */
export const reqAddRole = (roleName) => ajax.post(BASE_URL + '/manage/role/add', { roleName })

/* 更新角色(给角色设置权限) */
export const reqUpdateRole = (role) => ajax.post(BASE_URL + '/manage/role/update', role)

/* 获取所有用户列表 */
export const reqUsers = () => ajax(BASE_URL + '/manage/user/list')

/* 添加或修改(更新)用户 */
export const reqAddOrUpdateUser = (user) => ajax.post(
  BASE_URL + '/manage/user/' + (user._id ? 'update' : 'add'),
  user
)

/* 删除用户 */
export const reqDeleteUser = (userId) => ajax.post(BASE_URL + '/manage/user/delete', { userId })

/* 根据城市名获取百度地图上的城市共享单车地图 */
export const reqBikeMap = (city) => ajax(BASE_URL + '/manage/bike_map/info', {
  params: {
    city
  }
})