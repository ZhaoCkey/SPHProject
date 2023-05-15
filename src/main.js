import Vue from 'vue'
import App from './App.vue'
//全局组件
import TypeNav from './components/TypeNav'
// 第一个参数：全局组件的名字； 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name,Carousel)
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

// 引入路由
import router from '@/router'

let a=100;
Vue.config.productionTip = false
// 测试（axios）
// import {reqCategoryList} from './api'
// reqCategoryList();
// 引入仓库
import store from './store'

// 引入MockServer.js---Mock数据
import '@/mock/mockServer'
// 引入swiper样式
import 'swiper/css/swiper.css'

import {reqGetSearchInfo} from '@/api'

// 引入 统一接口api文件夹里面全部请求函数
import * as API from '@/api'

// 引入ElementUI组件
import {Button , MessageBox} from 'element-ui'
// 全局组件的方法使用--变成全局组件
Vue.component(Button.name,Button)
// 第二种注册方式，挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入插件--lazyload懒加载
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/images/1.gif'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading: atm
});


// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
});

new Vue({
  render: h => h(App),
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$router，$route属性
  router,
  // 注册仓库：组件实例身上会多一个$store属性
  store,
  // 全局事件总线 $bus 配置
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API; // 挂载到vue原型对象身上，不需要多处引用，可以 直接使用
  },


}).$mount('#app')
