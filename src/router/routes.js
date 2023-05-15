// 路由配置信息
// 引入路由组件
// import Home from "@/pages/Home" //const Foo = () =>{ return import('@/pages/Home')};
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 二级路由组件
import MyOrder from '@/pages/Center/myOrder/index_myOrder'
import GroupOrder from '@/pages/Center/groupOrder/index_groupOrder'

/*  路由懒加载
当打包构建应用时，JavaScript包会非常大，影响界面加载
如果把不同路由对应的组件分割成不同的代码块，然后当路由被访问到的时候才加载对应组件，这样就更高效了。
现在文档：
代码分割是指构建工具将构建后的 JavaScript 包拆分为多个较小的，可以按需或并行加载的文件。
通过适当的代码分割，页面加载时需要的功能可以立即下载，而额外的块只在需要时才加载，从而提高性能。
*/


export default[
    {
        path: "/center",  //路径
        name: 'center',
        component: Center, //路由组件
        meta: { show: true },
        //二级路由组件
        children:[
            {
                path:'myorder',
                component: MyOrder,
            },
            {
                path:'grouporder',
                component: GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: "/paysuccess",  //路径
        name: 'paysuccess',
        component: PaySuccess, //路由组件
        meta: { show: true },
        // 路由独享守卫
        // beforeEnter: (to,from,next) =>{
        //     if(from.path=='/pay'){
        //         next();
        //     }else{
        //         next(false);
        //     }
        // } 
    },
    {
        path: "/pay",  //路径
        name: 'pay',
        component: Pay, //路由组件
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to,from,next) =>{
            if(from.path=='/trade'){
                next();
            }else{
                next(false);
            }
        }         
    },
    {
        path: "/trade",  //路径
        name: 'trade',
        component: Trade, //路由组件
        meta: { show: true },
        // 路由独享守卫
        beforeEnter:(to,from,next)=>{
            // 去交易页，必须从购物车页面跳转而来；
            if(from.path=='/shopcart'){
                next();
            }else{
                next(false)// 中断当前的导航，如果url改变了，路由地址重置到from
            }
        }
    },
    {
        path: "/shopcart",  //路径
        name: 'shopcart',
        component: ShopCart, //路由组件
        meta: { show: true },
    },
    {
        path: "/addcartsuccess",  //路径
        name: 'addcartsuccess',
        component: AddCartSuccess, //路由组件
        meta: { show: true },
    },
    {
        path: "/detail/:skuid",  //路径
        component: Detail, //路由组件
        meta: { show: true },
    },
    {
        path: "/home",  //路径
        component: ()=>import('@/pages/Home'), //路由组件
        meta: { show: true },
    },
    {
        path: "/search/:keyword?",  //路径-----占位符——/:keyword
        component: Search, //路由组件
        meta: { show: true },
        name: "search"
    },
    {
        path: "/login",  //路径
        component: Login, //路由组件
        meta: { show: false },
    },
    {
        path: "/register",  //路径
        component: Register, //路由组件
        meta: { show: false },
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向的首页
    {
        path: '*',
        redirect: "/home"   //--定向-路径
    },


]