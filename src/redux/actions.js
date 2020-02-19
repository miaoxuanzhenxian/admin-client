/*
  包含n个用于创建action对象/函数的工厂函数(action creator)
*/
import {
  SET_HEADER_TITLE,
} from './action-types'

/* 
  设置头部标题的同步action
*/
export const setHeaderTitle = (headerTitle) => ({ type: SET_HEADER_TITLE, data: headerTitle })