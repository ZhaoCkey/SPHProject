<template>
  <div>
    <Header></Header>
    <!-- <h1 v-upper="msg"></h1> -->
    <!-- 路由组件出口 -->
    <router-view></router-view>

    <Footer v-show="$route.meta.show"></Footer>
  </div>
  
</template>

<script>
  import Header from './components/Header/index.vue'
  import Footer from './components/Footer'
    export default {
      data(){
        return {
          msg:'abc'
        }
      },
      name:'',
      components:{//组件
      Header,
      Footer,
    },
    mounted(){//从TypeNav下的派发出提来，让数据请求值进行一次，优化
      this.$store.dispatch('categoryList')//派发 三级菜单
    }

}
</script>

<style>

</style>