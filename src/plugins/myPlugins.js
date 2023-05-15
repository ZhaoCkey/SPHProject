// 自定义插件封装
// vue插件一定暴露一个对象
let myPlugins={};
myPlugins.install = function(Vue,options){
    console.log(Vue)
    // Vue.prototype.$bus : 任何组件都可以使用
    // Vue.directive() : 自定义全局指令
    // Vue.component : 全局组件
    // Vue.filter 。。。 ： 过滤器
    // 全局指令
    Vue.directive(options.name,(elemnet,params)=>{
        elemnet.innerHTML = params.value.toUpperCase();
        console.log("执行")
    })
}
export default myPlugins;