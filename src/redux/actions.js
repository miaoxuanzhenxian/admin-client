/* 
  包含N个用于创建action对象的工厂函数
*/
import {
  INCREMENT,
  DECREMENT,
} from './action-types';

/* 
  创建增加的action
  同步action是对象
*/
export const increment = (num) => ({ type: INCREMENT, num })

/* 
  创建减少的action
*/
export const decrement = (num) => ({ type: DECREMENT, num })

/* 
  创建异步增加的action
  异步action是一个函数, 参数是dispatch函数
    1). 执行异步代码
    2). 完成后, 分发一个同步action对象
*/
export const incrementAsync = (num) => dispatch => {
  // 1). 执行异步代码
  setTimeout(() => {
    // 2). 完成后, 分发一个同步action对象
    dispatch(increment(num))
  }, 1000)
}