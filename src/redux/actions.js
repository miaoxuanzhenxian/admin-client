/*
  包含n个用于创建action对象/函数的工厂函数(action creator)
*/
import {
  SET_HEADER_TITLE,
  RECEIVE_USER,
  SHOW_USER_ERROR,
  LOGOUT,
  RECEIVE_PRODUCT,
  SHOW_PRODUCT_ERROR,
  CLEAR_PRODUCT,
  SET_BIKE_MAP_CITY,
} from './action-types'
import { reqLogin, reqProduct } from '../api'
import { saveUser, removeUser } from '../utils/storageUtils'


/* 
  设置头部标题的同步action
*/
export const setHeaderTitle = headerTitle => ({ type: SET_HEADER_TITLE, data: headerTitle })

/*
  接收用户的同步action
*/
export const receiveUser = user => ({ type: RECEIVE_USER, user })

/*
  显示登录用户错误提示信息的同步action
*/
export const showUserError = msg => ({ type: SHOW_USER_ERROR, msg })

/*
  退出登录的同步action
*/
export const logout = () => {
  removeUser() // 删除localStorage中的user
  return { type: LOGOUT } // 返回一个action对象
}

/*
  登录的异步action
*/
export const login = (username, password) => async dispatch => {
  // 1. 发登陆的异步ajax请求
  const result = await reqLogin(username, password)
  // 2. 请求结束, 分发同步action
  if (result.status === 0) { // 2.1. 如果成功了, 分发成功的同步action,也就是分发接收user的同步action
    const user = result.data
    saveUser(user) // 将user保存localStorage中
    dispatch(receiveUser(user)) // 分发接收user的同步action
  } else { // 2.2. 如果失败了, 分发失败的同步action,也就是分发显示登录用户错误提示信息的同步action
    dispatch(showUserError(result.msg))
  }
}

/*
  接收商品product的同步action
*/
export const receiveProduct = product => ({ type: RECEIVE_PRODUCT, product })

/*
  显示获取商品product错误提示信息的同步action
*/
export const showProductError = msg => ({ type: SHOW_PRODUCT_ERROR, msg })

/*
  清除商品product的同步action
*/
export const clearProduct = () => ({ type: CLEAR_PRODUCT })

/*
  根据id获取商品product的异步action
*/
export const productFromId = productId => async dispatch => {
  // 1. 发根据id获取商品product的异步ajax请求
  const result = await reqProduct(productId)
  // 2. 请求结束, 分发同步action
  if (result.status === 0) { // 2.1. 如果成功了, 分发成功的同步action,也就是分发接收商品product的同步action
    const product = result.data
    if (product) {
      return dispatch(receiveProduct(product)) // 通常dispatch前不加return，不加return时，productFromId异步action函数返回的是一个Promise对象，相当于返回new Promise((resolve, reject) => {resolve()})，用await productFromId(productId)将得到undefined; 但若加return时，productFromId异步action函数返回的也是一个Promise对象，相当于返回new Promise((resolve, reject) => {resolve(receiveProduct(product))})，用await productFromId(productId)将得到receiveProduct(product)的返回值，即得到一个接收商品product的同步action对象，即{type: RECEIVE_PRODUCT, product: {…}}
    } else {
      dispatch(showProductError('该商品不存在'))
    }
  } else { // 2.2. 如果失败了, 分发失败的同步action,也就是分发显示获取商品product错误提示信息的同步action
    dispatch(showProductError(result.msg))
  }
}

/* 
  设置车辆地图城市bikeMapCity的同步action
*/
export const setBikeMapCity = bikeMapCity => ({ type: SET_BIKE_MAP_CITY, bikeMapCity })

