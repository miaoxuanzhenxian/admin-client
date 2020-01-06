/*
  所有请求接口的函数：接口请求函数
*/
import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';

const BASE = 'http://localhost:5000';

//请求登录
export const reqLogin = (username, password) => ajax.post(BASE + '/login', { username, password });
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

//发送jsonp请求得到天气信息
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {// 执行器函数: 内部去执行异步任务, 成功了调用resolve(), 失败了不调用reject(), 直接提示错误
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    jsonp(url, { timeout: 7000 }, (err, data) => {
      if (!err && data.error === 0) {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather });
      } else {
        message.error('获取天气信息失败');
      }
    });
  });
}

//获取分类列表
export const reqCategorys = () => ajax(BASE + '/manage/category/list');