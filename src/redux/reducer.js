/*
  管理状态数据的reducer函数
*/
import { combineReducers } from 'redux'

import { getUser } from '../utils/storageUtils'
import { 
  SET_HEADER_TITLE,
} from './action-types'

/*
  管理应用头部标题的reducer函数
*/
const initHeaderTitle = '首页'
function headerTitle(state = initHeaderTitle, action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data
    default:
      return state
  }
}

/*
  管理登录用户的reducer函数
*/
const initUser = getUser() // 读取local中保存user作为初始值
function user(state=initUser, action) {
  switch (action.type) {
    /* case value:
      
      break; */
    default:
      return state
  }
}

/* 
combineReducers()返回的是一个新的reducer函数(总reducer函数)
总的state的结构:
  {
    headerTitle: headerTitle(),  // ''
    user: user()  // {}
  }
*/
export default combineReducers({
  headerTitle,
  user,
})