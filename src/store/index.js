import Vue from 'vue';
import Vuex from 'vuex';
//使用插件一次
Vue.use(Vuex);

// 引入小仓库
import home from './home';
import search from './search';
import detail from './detail/detail.js';
import shopcart from './shopcart/shopcart';
import user from './user/user';
import trade from './trade/trade';
// 对外暴露store类的一个实例
export default new Vuex.Store({
//    实现vuex仓库模块式开发存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }

})
// state：仓库存储数据的地方
// const state={
//     count:1
// };
// // mutations：修改state的唯一手段
// const mutations={
//     ADD(state){
//         state.count++
//     }
// };
// // action：处理action可以书写自己的业务逻辑，也可以处理异步
// const actions={
//     // 可以修改业务逻辑，但是不能修改state
//     add({commit}){
//         commit("ADD")
//         console.log(commit)
//     }
// };
// // getters：理解为计算属性，拥有简化仓库数据，让组件获取仓库的数据更久方便
// const getters={};