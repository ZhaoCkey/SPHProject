import {reqGetSearchInfo} from '@/api'
// search模块的小仓库
const state = {
    // 仓库初始化状态
    searchList:{}
};
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
};
// 获取search模块数据
const actions={
    async getSearchList({commit},params){
        // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数
        // params是当用户派发action的时候，第二个参数传递过来，而且至少是一个空对象
        let result=await reqGetSearchInfo(params)
        if(result.code==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
    
};
// 计算属性-------在项目当中，主要作用是：简化仓库中的数据
// 可能把将来我们在组件当中要用的数据简化一下{将来组件在获取数据的时候方便}
const getters={
    goodsList(state){
        return state.searchList.goodsList||{};//假如网络不行，会返回undefind-至少给一个数组，以防万一
    },
    trademarkList(state){
        return state.searchList.trademarkList||{};
    },
    attrsList(state){
        return state.searchList.attrsList||{};
    },
};
export default {
    state,
    mutations,
    actions,
    getters
}