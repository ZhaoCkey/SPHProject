<template>
  <!--楼层-->
        <div class="floor">
            <div class="py-container">
                <div class="title clearfix">
                    <h3 class="fl" >{{floor_list.name}}</h3>
                    <div class="fr">
                        <ul class="nav-tabs clearfix">
                            <li class="active" v-for="(navList,index) in floor_list.navList" :key="index">
                                <a href="navList.url" data-toggle="tab">{{navList.text}}</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div class="tab-pane">
                        <div class="floor-1">
                            <div class="blockgary"><!--keyword-->
                                <ul class="jd-list">
                                    <li v-for="(keyword,index) in floor_list.keywords" :key="index">{{keyword}}</li>      
                                </ul>
                                <img :src="floor_list.imgUrl" /><!--大图-->
                            </div>
                            <div class="floorBanner"><!--轮播图-->
                                <Carousel :list="floor_list.carouselList"></Carousel>
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="floor_list.recommendList[0]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="floor_list.recommendList[1]" />
                                </div>
                            </div>
                            <div class="split center">
                                <img :src="floor_list.bigImg" />
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="floor_list.recommendList[2]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="floor_list.recommendList[3]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
// import Swiper from 'swiper';
export default {
    name:'Floor',
    props:['floor_list'],
    mounted(){
        // 此处的数据是父组件传递过来的，在floor展示前就存在，可以直接使用mounted。但是为了组件共用，同listcontainer轮播图组件一样使用watch监听的方法，但是要加入立即监听，不如不触发监听，因为数据没变化。
        // var mySwiper = new Swiper(
        //                 this.$refs.floor_swiper,
        //                 {
        //                 loop:true,
        //                 // 如果需要分页器
        //                 pagination:{
        //                     el:".swiper-pagination",
        //                     clickable:true
        //                 },
        //                 // 如果需要前进后退按钮
        //                 navigation: {
        //                     nextEl: '.swiper-button-next',
        //                     prevEl: '.swiper-button-prev',
        //                 },
        //                 });
    },
    // watch:{
    //     floor_list:{//watch今天不到数据变化---因为数据是父组件传递过来的，没有变化。解决->立即监听
    //         // 立即监听：不管数据有没有变化，一开始就立即监听一次
    //         immediate:true,
    //         handler(){
    //             // 只能监听到数据已经存在，但是不能确定v-for动态渲染的结构是否存在，因此还是需要用nextTick
    //             this.$nextTick(()=>{
    //                 var mySwiper = new Swiper(
    //                     this.$refs.floor_swiper,
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
 .floor {
        margin-top: 15px;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .title {
                .fl {
                    float: left;
                    color: #c81623;
                    font-size: 20px;
                    line-height: 30px;
                    margin: 9px 0;
                    font-weight: 700;
                }

                .fr {
                    float: right;

                    .nav-tabs {
                        margin: 10px 0 0;
                        display: inline-block;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                padding-top: 1px;
                                font-weight: 400;
                                background-color: #fff;

                                &::after {
                                    content: "|";
                                    padding: 0 10px;
                                }
                            }

                            &:nth-child(7) {
                                a {
                                    &::after {
                                        content: "";
                                    }
                                }
                            }

                            &.active {
                                a {
                                    color: #e1251b;
                                }
                            }
                        }
                    }
                }
            }

            .tab-content {
                border-top: 2px solid #c81623;
                border-bottom: 1px solid #e4e4e4;

                .tab-pane {
                    .floor-1 {
                        height: 360px;
                        display: flex;

                        .blockgary {
                            width: 210px;
                            height: 100%;
                            background: #f7f7f7;

                            .jd-list {
                                padding: 15px 0;
                                overflow: hidden;

                                li {
                                    list-style-type: none;
                                    float: left;
                                    width: 40%;
                                    margin: 0 10px;
                                    border-bottom: 1px solid #e4e4e4;
                                    text-align: center;
                                    line-height: 26px;
                                }
                            }

                            img {
                                width: 100%;
                            }
                        }

                        .floorBanner {
                            width: 330px;
                            height: 100%;
                        }

                        .split {
                            width: 220px;
                            height: 100%;
                            position: relative;

                            .floor-x-line {
                                position: absolute;
                                background: #e4e4e4;
                                width: 220px;
                                height: 1px;
                                top: 180px;
                            }

                            .floor-conver-pit {
                                width: 100%;
                                height: 50%;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    transition: all 400ms;

                                    &:hover {
                                        opacity: 0.8;
                                    }
                                }
                            }
                        }

                        .center {
                            border: 1px solid #e4e4e4;
                        }
                    }
                }
            }
        }
    }
</style>