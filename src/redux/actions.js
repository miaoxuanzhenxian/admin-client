/*
  包含n个用于创建action对象/函数的工厂函数(action creator)
*/
import {
  SET_HEADER_TITLE,
  RECEIVE_USER,
  SHOW_MSG,
  LOGOUT,
} from './action-types'
import { reqLogin } from '../api'
import { saveUser, removeUser } from '../utils/storageUtils'
/* 
  设置头部标题的同步action
*/
export const setHeaderTitle = (headerTitle) => ({ type: SET_HEADER_TITLE, data: headerTitle })

/*
  接收用户的同步action
*/
export const receiveUser = (user) => ({ type: RECEIVE_USER, user })

/*
  显示错误信息的同步action
*/
export const showMsg = (msg) => ({ type: SHOW_MSG, msg })

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
  } else { // 2.2. 如果失败了, 分发失败的同步action,也就是分发显示错误信息的同步action
    dispatch(showMsg(result.msg))
  }
}

/*
  退出登录的同步action
*/
export const logout = () => {
  removeUser() // 删除localStorage中的user
  return { type: LOGOUT } // 返回一个action对象
}