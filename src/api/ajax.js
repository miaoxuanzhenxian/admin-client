/*
  能发ajax任意请求的函数模块
  封装axios, 函数的返回值是promise
  1. 将post请求参数转换为urlencoded(默认json格式)  ===> 使用请求拦截器
  2. 请求成功的结果不是response, 而是response.data ===> 使用响应拦截器(成功回调)
  3. 统一处理请求错误  ===> 使用响应拦截器(失败回调)
*/
import axios from 'axios'
import qs from 'qs' // lodash和qs这两个库属于基本的工具库，在我们前面所下的许多依赖包里都已经下载引用了这两个包，因此不需要再重新下载了，可以直接引用。并且lodash这个库可以模块化的按需引用。
import { message } from 'antd'


axios.interceptors.request.use(config => {
  const { method, data } = config
  if (method.toLowerCase() === 'post' && Object.prototype.toString.call(data) === '[object Object]') {
    config.data = qs.stringify(config.data)
  }
  return config
})

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  message.error('请求出错 '+ error.message)
  // return Promise.reject(error);
  // 返回一个pending状态(或者叫初始状态或者叫中断状态)的promise, 中断promise链
  return new Promise(() => {})
})

export default axios
