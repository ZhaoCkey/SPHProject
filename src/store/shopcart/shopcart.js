import { reqCartList ,reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state ={
    cartList:[],
};
const mutations ={
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};
const  actions ={
    // 获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList();
        // console.log(result);//测试是否能获取个人购物车数据
        if(result.code==200){
            commit("GETCARTLIST",result.data)
        }
    },
    // 删除购物车产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code==200){
            return 'OK';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 修改购物车某一个产品的选中状态
    async updataCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked);
        if(result.code==200){
            return 'OK';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 删除全部选中的商品
    deleteAllCheckedCart({dispatch,getters}){
        // alert("测试点击删除全部选中后派发到action")
        // 可以带参进来打印后有：
        // context：小仓库，commit（提交mutations修改state）、getters（计算属性）、dispatch（派发action）、state（当前仓库的数据）
        // 获取购物车中全部的产品（是一个数组）
        let promiseAll=[];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'' ;
            // 将每一次返回的promise添加到数组当中
            promiseAll.push(promise);
        });
        // 只要全部的p1|p2...都成功，返回结果为成功
        // 有一个失败，则返回失败结果
        return Promise.all(promiseAll);
    },
    // 修改全部产品状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        // console.log(state);
        console.log(isChecked);
        let promiseAll=[];
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch("updataCheckedById",{
                skuId:item.skuId,
                isChecked,
            });
            promiseAll.push(promise);
        })
        return Promise.all(promiseAll);
    },
};
const  getters ={
    cartList(state){
        return state.cartList[0]||{};
    },
    // 计算出来购物车数据
    // cartInfoList(state){
    //     return state.
    // }
};
export default {
    state,
    mutations,
    actions,
    getters
}