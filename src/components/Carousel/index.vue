<template>
  <div class="swiper-container" ref="floor_swiper" >
        <div class="swiper-wrapper" >
            <div class="swiper-slide" v-for="(carousel,index) in list" :key="index">
                <img :src="carousel.imgUrl">
            </div>
        </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name:'Carousel',
    props:['list'],
    watch:{
        list:{//watch今天不到数据变化---因为数据是父组件传递过来的，没有变化。解决->立即监听
            // 立即监听：不管数据有没有变化，一开始就立即监听一次
            immediate:true,
            handler(){
                // 只能监听到数据已经存在，但是不能确定v-for动态渲染的结构是否存在，因此还是需要用nextTick
                this.$nextTick(()=>{
                    var mySwiper = new Swiper(
                        this.$refs.floor_swiper,
                        {
                        loop:true,
                        // 如果需要分页器
                        pagination:{
                            el:".swiper-pagination",
                            clickable:true
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        });
                })
            }
        }
    }
}
</script>

<style>

</style>