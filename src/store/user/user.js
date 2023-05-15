// 登录与注册的模块
import { reqGetCode ,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api";
import { setToken , getToken , removeToken } from "@/utils/token";
const state={
    code:'',
    token:getToken('TOKEN'),
    userInfo:{},
};
const mutations={
    GETCODE(state,code){
        state.code=code;
    },
    USERLOGIN(state,token){
        state.token=token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo;
    },
    // 清除本地数据
    CLEAR(state){
        // 把仓库中相关用户信息情况
        state.token='';
        state.userInfo={};
        // 本地数据情况
        removeToken();
    }
};
const actions={
    // 获取验证码
    async getCode({commit},phone){
        // 获取验证码的接口，把验证码返回；正常情况，后台把验证码发到用户手机。
        let result = await reqGetCode(phone);
        // console.log(result);
        if(result.code==200){
            commit('GETCODE',result.data);
            return 'OK';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user);
        // console.log(result);
        if(result.code==200){
            return 'OK';
        }else{
            return Promise.reject(new Error('falie'));
        }
    },
    // 登录业务 【token--令牌】
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        // console.log(result);
        // 服务器下发token，用户唯一标识--经常通过带token找服务器要用户信息；
        if(result.code==200){
            commit("USERLOGIN",result.data.token);
            // 持久化存储token
            // localStorage.setItem("TOKEN",result.data.token);
            setToken(result.data.token);
            return 'OK';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 获取用户信息--home--> 路由配置’守卫
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        // console.log(result);
        if(result.code==200){
            commit('GETUSERINFO',result.data);//提交用户信息
            return 'OK';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 退出登录
    async userLogout({commit}){
        // 只是向服务器发请求，通知服务器清除token
        let result=await reqLogout();
        if(result.code==200){
            commit('CLEAR');
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'));
        }
    },
};
const getters={};
export default{
    state,
    mutations,
    actions,
    getters
}