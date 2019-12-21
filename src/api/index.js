/*
  所有请求接口的函数：接口请求函数
*/
import ajax from './ajax';

const baseURL= 'http://localhost:5000';

//请求登录
export const reqLogin = (username, password) => ajax.post(baseURL + '/login', {username, password});
/* export function reqLogin (username, password) {
  return ajax({
    method: 'post',
    url: baseURL + '/login',
    data: {
      username,
      password
    }
  });
} */