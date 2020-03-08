/*
  redux最核心的管理对象
*/
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension' // 开发环境调试时用，生产环境打包时不用(生产环境打包时应注释掉)

import reducer from './reducer'


// export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk))) // 开发环境调试时用,生产环境打包时不用(生产环境打包时应注释掉)
export default createStore(reducer, applyMiddleware(thunk)) // 生产环境打包时用,开发环境调试时不用(开发环境调试时应注释掉，应用上面那个)