/*
  所有请求接口的函数：接口请求函数
*/
import ajax from './ajax';

const baseURL= 'http://localhost:5000';
export function reqLogin (username, password) {
  ajax({
    method: 'post',
    url: baseURL + '/login',
    data: {
      username,
      password
    }
  });
}

reqLogin('admin','admin');