/* 
真正管理状态数据的函数
作用: 根据老的state和action, 产生新的state
*/
import {
  INCREMENT,
  DECREMENT,
} from './action-types';

export default function count(state = 1, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.num
    case DECREMENT:
      return state - action.num
    default: // 产生初始状态值
      return state
  }
}