/* 
  包含N个用于创建action对象的工厂函数
*/
import {
  INCREMENT,
  DECREMENT,
} from './action-types';

/* 
创建增加的action
*/
export const increment = (num) => ({ type: INCREMENT, num })

/* 
创建减少的action
*/
export const decrement = (num) => ({ type: DECREMENT, num })