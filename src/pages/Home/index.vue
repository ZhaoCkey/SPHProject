<template>
  <div>
  <!-- 三级联动组件 -->
  <TypeNav></TypeNav>
  <ListContainer></ListContainer>
  <Recommend></Recommend>
  <Rank></Rank>
  <Like></Like>
  <Floor v-for="(floor,index) in floorList" :key="floor.id" :floor_list="floor"></Floor>
 
  <Brand></Brand>
  <!-- <button @click="add">+1</button>
  <span>仓库的数据{{count}}</span>
  <button @click="">-1</button> -->
  </div>
</template>

<script>
// 引入其他组件
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
// 引入仓库
import { mapState } from 'vuex'
// mapState--Vuex
// import { mapState } from 'vuex'
export default {
  name:'Home',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  // computed:{
  //   ...mapState(['count'])
  // },
  mounted(){
    this.$store.dispatch("getFloorList");//派发action-getFloorList-->触发后，仓库中即存在数据
    // 获取用户信息，在首页展示
    // this.$store.dispatch('getUserInfo');
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  }
  
}
</script>

<style>

</style>