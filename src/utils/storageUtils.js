import store from 'store';//使用store这个插件处理localStorage会比原生的api简单一些，并且兼容性更好，几乎兼容所有浏览器
/*
  处理localStorage的user数据
*/
const USER_KEY = 'user_key';

//保存user
export const saveUser = (user) => {
  // localStorage.setItem(USER_KEY, JSON.stringify(user));
  store.set(USER_KEY, user);
}

//获取user
// export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY) || '{}');
export const getUser = () => store.get(USER_KEY) || {};

//删除保存的user
export const removeUser = () => {
  // localStorage.removeItem(USER_KEY);
  store.remove(USER_KEY);
}