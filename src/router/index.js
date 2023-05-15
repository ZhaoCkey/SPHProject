//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '@/store';
// 使用插件
Vue.use(VueRouter);

// 解决点击多次搜索报错
// 保存原push方法/replace方法
let originpush = VueRouter.prototype.push;
let originreplace = VueRouter.prototype.replace;
// 重写push|replace方法
// 第一个参数：告诉原来的push方法，往哪里跳，（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resove, reject) {
    if (resove && reject) {
        // console.log(this)
        // call | apply 区别： 
        // 相同点：都可以调用一次函数，都可以篡改函数的上下文一次；
        // 不同点：call与replace传递参数方式不同：call传参用逗号隔开，apply方法执行传递数组
        originpush.call(this, location, resove, reject);
    } else {
        originpush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function () {
    if (resove && reject) {
        originreplace.call(this, location, resove, reject);
    } else {
        originreplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由

let router = new VueRouter({
    // 配置路由--routes:routes(es6特性，key value kv一致，省略)
    routes,
    scrollBehavior(to,from,savePosition){
        // 返回y=0代表滚动条在最上方
        return {y:0};
    }
});

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to,from,next)=>{
    // to: 可以获取到你要跳转到那个路由的信息
    // from: 可以获取到你从哪个路由而来的信息
    // next: 放行函数   --   next():直接放行；--  next('/login')：指定放行，放行到指定的路由
    //  next(false): 中断当前党徽，如果浏览器url改变了(可能是用户手动或浏览器后退按钮)，那么URL会重置到from路由地址
    next();//测试全都放行
    // 用户登录了，才会有token；未登录一定不会有token
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name;
    console.log(token)
    if(token){              //用户已经登录
            // 用户登录了，禁止去登录页login，停留在首页
        if(to.path=='/login'){
            next('/home');
            // console.log("用户登录状态，点击登录，禁用登录")
        }else{
            // 用户登录了，去其他页面（home、detail、cartshop、search）
            // 如果 用户名 已有
            if(name){
                next();
                // console.log("用户登录状态，存在用户信息");
            }else{
                // 没有用户信息,
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                    // console.log("没有用户信息，用token尝试获取")
                } catch (error) {
                    // token失效，清除token--重新登录
                    await store.dispatch('userLogout');
                    next('/login');
                    // console.log("没有用户信息，尝试获取失败->清除token->让用户重新登录")
                }
            }
            // console.log('22')
        }
    }else{
        // 未登录---不能去交易相关页面（trade）、支付相关（pay、paysuccess）、不能去个人中心
        // 未登录去路由以上页面-->登录
        let topath = to.path;
        if(topath.indexOf('/trade')!=-1 ||  topath.indexOf('/pay')!=-1 || topath.indexOf('/center')!=-1){
            // 把未登录时要去的地址存储在路由（地址栏）query
            next('/login?redirect='+topath);
        }else{
            // 去非以上页面-->放行
             next();
        }
        
        // console.log("未登录状态")
    }
    // console.log(store.state.user.token)
});

export default router;