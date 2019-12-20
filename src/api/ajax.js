/*
  利用axios，封装能发ajax请求的函数
*/
import axios from 'axios';
import qs from 'qs';

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
  alert('请求出错 '+ error.message);
  return new Promise(() => {});
});

export default axios;