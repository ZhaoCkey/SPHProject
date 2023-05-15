import { reqGetGoodsInfo,reqAddOrUpdateShopCart } from "@/api";
// 封装游客身份的模块 uuid-->生成一个随机的字符串（只能随一次，不能变）
import {getUUID} from '@/utils/uuid_token'
const state={
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
};
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo;
    }
};
const actions={
    // 获取产品信息的action
    async getGoodInfo({commit},skuid){
        let result = await reqGetGoodsInfo(skuid);
        if(result.code==200){
            commit('GETGOODINFO',result.data);
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车以后（发请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他数据，只返回code=200，代表这次操作成功
        // 服务器没有返回其他数据，不需要三连环存储数据。
        let result=await reqAddOrUpdateShopCart(skuId,skuNum);//当前这个函数如果执行，返回Promise
        if(result.code==200){
            return "OK";
        }else{
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'));
        }
        // return 'ok';//非空字符串表示成功
        // return Promise.reject(new Error('faile'));

        // console.log('添加到购物车的action返回数据'+result);
    }
};
const getters={
    // 简化路径导航
    categoryView(state){
        // state.goodInfo初始状态下是空对象，空对象的categoryView属性值是undefind
        return state.goodInfo.categoryView||{};
    },
    // 简化产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    // 简化售卖属性信息
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}