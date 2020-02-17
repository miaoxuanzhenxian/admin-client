/* 
  redux最核心的管理对象: store
*/
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' // 注意:redux本身不支持异步，即dispatch()函数只接收同步action对象，因此利用redux-thunk库可以实现redux异步，即使得dispatch()可以接收函数也可以接收对象，此时同步操作时，给dispatch()函数传入同步action对象，异步操作时，给dispatch()函数传入异步action函数，在此函数体中，执行完异步操作后，再dispatch(同步action对象)分发一个同步action对象
import { composeWithDevTools } from 'redux-devtools-extension' // 注意:此时放到redux中的多个组件共享的公共状态数据已经不在组件中了，而是放到redux中了，因此此时在react的调试工具(React Developer Tools)中是看不到放到redux中的公共状态数据的,因此此时要给浏览器安装redux开发调式工具(redux DevTools)，但给浏览器安装上redux开发调式工具(redux DevTools)后，还是不能使用redux调试工具，还是不能看到redux中的公共状态数据，还要安装redux-devtools-extension库，按需导入其中的composeWithDevTools函数，在createStore()的第二个参数中调用执行composeWithDevTools()函数包裹(传入)applyMiddleware(thunk)即可，此时，才能使用redux调试工具，才能在redux调试工具(redux DevTools)中看到redux中的公共状态数据，方便我们调试。

import reducer from './reducer'

// 根据指定的reducer函数, 产生一个store对象
// store对象内部管理新状态数据, 状态数据的初始值为第一次调用reducer()的返回值
// 应用异步中间件
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))