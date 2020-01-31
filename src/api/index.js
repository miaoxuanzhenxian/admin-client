/*
  所有请求接口的函数：接口请求函数
*/
import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';

import { BASE_URL } from '@/utils/constants';

/* 请求登录 */
export const reqLogin = (username, password) => ajax.post(BASE_URL + '/login', { username, password });
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

/* 发送jsonp请求得到天气信息 */
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

/* 获取分类列表 */
export const reqCategorys = () => ajax(BASE_URL + '/manage/category/list');

/* 添加分类 */
export const reqAddCategory = (categoryName) => ajax.post(BASE_URL + '/manage/category/add', { categoryName });

/* 修改分类（更新品类名称）*/
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax.post(BASE_URL + '/manage/category/update', { categoryId, categoryName });

/* 获取商品分页列表(后台分页) */
export const reqProducts = (pageNum, pageSize) => ajax(BASE_URL + '/manage/product/list', {
  params: { // 包含所有query参数的对象
    pageNum,
    pageSize
  }
})

/* 根据Name/desc搜索产品分页列表 */
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType, // 它的值是'productName'或者'productDesc'
  searchName
}) => ajax(BASE_URL + '/manage/product/search', {
  // method: 'GET',
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName
  }
})

/* 对商品进行上架/下架处理(设置对应status的值，status为1表示在售状态，2表示已下架状态) */
export const reqUpdateStatus = (productId, status) => ajax.post(BASE_URL + '/manage/product/updateStatus', { productId, status })

/* 根据分类ID获取分类 */
export const reqCategory = (categoryId) => ajax(BASE_URL + '/manage/category/info', {
  params: {
    categoryId
  }
})

/* 删除图片 */
export const reqDeleteImg = (name) => ajax.post(BASE_URL + '/manage/img/delete', { name })
