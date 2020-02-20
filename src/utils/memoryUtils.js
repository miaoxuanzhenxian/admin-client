// import { getUser } from './storageUtils'

// 初始时取一次并保存为user
// const user = getUser()
export default {
  /*
    用来内存中存储登陆用户的信息,实现只读取localStorage对应的文件数据一次，剩下的其它的都从内存中读取，
    提高运行效率,初始值为localStorage中读取的user;
    也可以用全局状态管理（如redux，mobx等）实现内存中存储，实现只读取localStorage对应的文件数据一次，
    剩下的其它的都从内存中读取，提高运行效率;通常我们会用redux代替此种内存读写的方式。
    具体用哪种方式看情况，灵活变通，以最短的时间不择手段的最快完成全部基本功能为最先原则，其它都往后放。
  */
  // user,
  product: {}, // 需要查看的商品对象 
}
