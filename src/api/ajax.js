/*
  利用axios，封装能发ajax请求的函数
*/
import axios from 'axios';
import qs from 'qs';

axios.interceptors.request.use(config => {
  config.data = qs.stringify(config.data);
  return config;
});

export default axios;