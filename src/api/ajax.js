/*
  利用axios，封装能发ajax请求的函数
*/
import axios from 'axios';
import qs from 'qs'; // lodash和qs这两个库属于基本的工具库，在我们前面所下的许多依赖包里都已经下载引用了这两个包，因此不需要再重新下载了，可以直接引用。并且lodash这个库可以模块化的按需引用。
import { message } from 'antd';

axios.interceptors.request.use(config => {
  const { method, data } = config;
  if (method.toLowerCase() === 'post' && Object.prototype.toString.call(data) === '[object Object]') {
    config.data = qs.stringify(config.data);
  }
  return config;
});

axios.interceptors.response.use(response => {
  return response.data;
}, error => {
  message.error('请求出错 '+ error.message);
  // return Promise.reject(error);
  // 返回一个pending状态的promise, 中断promise链
  return new Promise(() => {});
});

export default axios;