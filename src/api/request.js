// 引入axios
import axios from "axios";

// 引入进度条
import nprogress from 'nprogress'
// 
import "nprogress/nprogress.css"
// console.log(nprogress)
// star: 进度条开始  done：进度条结束

// 在当前模块中引入store
import store from '@/store';

// 利用axios对象的方法create，去创建一个axios
// request就是axios，只不过改下配置
const requests=axios.create({
    // 配置对象
    // 基本路径，发送请求时
    baseURL:'http://gmall-h5-api.atguigu.cn/api',
    timeout:5000,
});
// 请求拦截器，发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config：配置对象，对象里面有个属性很重要，headers请求头
        // 进度条开始动
    nprogress.start();
    // uuId
    if(store.state.detail.uuid_token){
        // 给请求头添加一个 字段(userTempId)--（同后台协商）
        config.headers.userTempId = store.state.detail.uuid_token;
    }// console.log(store);//测试能否获取store下的state
    

    // 需要带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }

    return config  
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数，服务器数据返回后，响应拦截器可以检测到，可以做something
        // 进度条结束
        nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('faile'))
})

// 对外暴露
export default requests