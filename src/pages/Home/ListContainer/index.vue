<template>
    <!--列表-->
    <div class="list-container">
            <div class="sortList clearfix">
                <div class="center">
                    <!--banner轮播-->
                    <Carousel :list="bannerList"></Carousel>
                    <!-- <div class="swiper-container" ref="mySwiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(carousel,index) in bannerList" :key="carousel.id">
                                <img :src="carousel.imgUrl" />
                            </div>
                            
                        </div>
                         如果需要分页器 
                        <div class="swiper-pagination"></div>

                         如果需要导航按钮 
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div> -->
                </div>
                <div class="right">
                    <div class="news">
                        <h4>
                            <em class="fl">尚品汇快报</em>
                            <span class="fr tip">更多 ></span>
                        </h4>
                        <div class="clearix"></div>
                        <ul class="news-list unstyled">
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[公告]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[公告]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                        </ul>
                    </div>
                    <ul class="lifeservices">
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">话费</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">机票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">电影票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">游戏</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">彩票</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">加油站</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">酒店</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">火车票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">众筹</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">理财</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">礼品卡</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">白条</span>
                        </li>
                    </ul>
                    <div class="ads">
                        <img src="./images/ad1.png" />
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
// 引入mapState
import { mapState } from 'vuex';
// 引入swiper包
import Swiper from 'swiper'//引入的JS
export default {
    name:'',
    mounted(){//------------------------------mounted代表挂载完毕（结构已经有了）
        // 派发action：通过Vuex发起Ajax请求，将数据请求到仓库中
        this.$store.dispatch('getBannerList');
        // 2.定时器----实例化swiper
        // setTimeout(()=>{
        //     var mySwiper = new Swiper (document.querySelector('.swiper-container'),{
        //     loop:true,
        //     // 如果需要分页器
        //     pagination:{
        //         el:".swiper-pagination",
        //         clickable:true
        //     },
        //     // 如果需要前进后退按钮
        //     navigation: {
        //         nextEl: '.swiper-button-next',
        //         prevEl: '.swiper-button-prev',
        //     },
        //     });
        // });
        
    },
    computed:{//从仓库中获取数据
        ...mapState({
            bannerList:state=>state.home.bannerList
        })
    },
    // 异步操作，mounted中实例化swiper不行，因为先挂载完毕，然后的获取仓库数据，和修改仓库数据异步会导致实例化在数据传入组件之前，导致页面结构不完整，无法正确实例化swiper
    // 2.定时器。
    // 1.update
    // updated(){
    //     // 实例化swiper
    //     var mySwiper = new Swiper (document.querySelector('.swiper-container'),{
    //         loop:true,
    //         // 如果需要分页器
    //         pagination:{
    //             el:".swiper-pagination",
    //             clickable:true
    //         },
    //         // 如果需要前进后退按钮
    //         navigation: {
    //             nextEl: '.swiper-button-next',
    //             prevEl: '.swiper-button-prev',
    //         },
    //     });
    // }
    // watch:{
    //     bannerList:{
    //         immediate:true,//同下方组件（floor）的轮播图保持相同结构，写法风格相同。
    //         handler(newValue,oadValue){
    //             // 通过watch监听bannerList属性的属性值变化
    //             // 如何执行handler方法，代表组件实例身上这个属性的属性值已经有了数据【数组，四个元素】
    //             // 监听仓库中的数据变化，只能保证数据存在，不能保证v-for已经执行结束；

    //             // nextTick：在下次DOM更新 循环结束之后，延迟执行回调函数；在修改数据之后 立即使用这个方法，获取更新后的DOM；
    //             this.$nextTick(()=>{
    //                 // 当执行这个回调函数时：保证拿到服务器数据，v-for执行完毕【轮播图的结构一定有了】
    //                 // 实例化swiper
    //                 // var mySwiper = new Swiper (document.querySelector('.swiper-container'),{
    //                 var mySwiper = new Swiper(
    //                     this.$refs.mySwiper,
    //                     {
    //                     loop:true,
    //                     // 如果需要分页器
    //                     pagination:{
    //                         el:".swiper-pagination",
    //                         clickable:true
    //                     },
    //                     // 如果需要前进后退按钮
    //                     navigation: {
    //                         nextEl: '.swiper-button-next',
    //                         prevEl: '.swiper-button-prev',
    //                     },
    //                     });
    //             })  
    //         }
    //     }
    // }
}
</script>

<style lang="less" scoped>
    .list-container {
        width: 1200px;
        margin: 0 auto;

        .sortList {
            height: 464px;
            padding-left: 210px;

            .center {
                box-sizing: border-box;
                width: 740px;
                height: 100%;
                padding: 5px;
                float: left;
            }

            .right {
                float: left;
                width: 250px;

                .news {
                    border: 1px solid #e4e4e4;
                    margin-top: 5px;

                    h4 {
                        border-bottom: 1px solid #e4e4e4;
                        padding: 5px 10px;
                        margin: 5px 5px 0;
                        line-height: 22px;
                        overflow: hidden;
                        font-size: 14px;

                        .fl {
                            float: left;
                        }

                        .fr {
                            float: right;
                            font-size: 12px;
                            font-weight: 400;
                        }
                    }

                    .news-list {
                        padding: 5px 15px;
                        line-height: 26px;

                        .bold {
                            font-weight: 700;
                        }
                    }
                }

                .lifeservices {
                    border-right: 1px solid #e4e4e4;
                    overflow: hidden;
                    display: flex;
                    flex-wrap: wrap;

                    .life-item {
                        border-left: 1px solid #e4e4e4;
                        border-bottom: 1px solid #e4e4e4;
                        margin-right: -1px;
                        height: 64px;
                        text-align: center;
                        position: relative;
                        cursor: pointer;
                        width: 25%;

                        .list-item {
                            background-image: url(~@/assets/images/icons.png);
                            width: 61px;
                            height: 40px;
                            display: block;
                        }

                        .service-intro {
                            line-height: 22px;
                            width: 60px;
                            display: block;
                        }

                        &:nth-child(1) {
                            .list-item {
                                background-position: 0px -5px;
                            }
                        }

                        &:nth-child(2) {
                            .list-item {
                                background-position: -62px -5px;
                            }
                        }

                        &:nth-child(3) {
                            .list-item {
                                background-position: -126px -5px;
                            }
                        }

                        &:nth-child(4) {
                            .list-item {
                                background-position: -190px -5px;
                            }
                        }

                        &:nth-child(5) {
                            .list-item {
                                background-position: 0px -76px;
                            }
                        }

                        &:nth-child(6) {
                            .list-item {
                                background-position: -62px -76px;
                            }
                        }

                        &:nth-child(7) {
                            .list-item {
                                background-position: -126px -76px;
                            }
                        }

                        &:nth-child(8) {
                            .list-item {
                                background-position: -190px -76px;
                            }
                        }

                        &:nth-child(9) {
                            .list-item {
                                background-position: 0px -146px;
                            }
                        }

                        &:nth-child(10) {
                            .list-item {
                                background-position: -62px -146px;
                            }
                        }

                        &:nth-child(11) {
                            .list-item {
                                background-position: -126px -146px;
                            }
                        }

                        &:nth-child(12) {
                            .list-item {
                                background-position: -190px -146px;
                            }
                        }
                    }
                }

                .ads {
                    margin-top: 5px;

                    img {
                        opacity: 0.8;
                        transition: all 400ms;

                        &:hover {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
</style>