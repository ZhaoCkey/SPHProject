<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
            <div class="container" @mouseleave="leaveShow" @mouseenter="enterShow"><!--事件委派，在父上可以执行子的事件。原理是冒泡。-->
                <h2 class="all">全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <!-- 三级联动 -->
                <transition name="sort"> <!-- 过渡动画包裹-->
                    <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch">
                        <!-- 一级 -->
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{current:currentIndex
                        ==index}">
                            <h3 @mouseenter="changeIndex(index)" >
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                            </h3>
                            <!-- 二级三级分类                 Js 控制二三级显示-->
                            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                <div class="subitem"  v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId" >
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    </div>
                </transition>
            </div>
        </div>
</template>

<script>
// 导入仓库
import {mapState} from 'vuex';
//引入lodash   import _ from 'lodash'--全部功能引入（最好----按需引入）
import {throttle} from 'lodash' 

export default {
    name:'TypeNav',
    // 组件挂载完毕，可以向服务器发请求
    data(){
        return {
            currentIndex: -1 ,
            show:true,
        }
    },
    mounted(){
        // this.$store.dispatch('categoryList')
        // 当组件挂载完毕，将show改为false
        // 如果不是Home路由组件，将typeNav进行隐藏
        if(this.$route.path!='/home'){
            this.show=false
        }
    },
    computed:{
        ...mapState({
            // 右侧需要一个函数，当使用这个计算属性的时候，右侧函数就会执行一次
            // 注入一个参数state，是大仓库中的数据
            categoryList:(state)=>{
                return state.home.categoryList
            }
        })
    },
    methods:{
        // changeIndex(index){
        //     this.currentIndex=index;
        // },
// 节流后
        changeIndex:throttle(function(index){
            this.currentIndex=index;
        },50),
        // 一级分类鼠标离开--------------合并到leaveshow隐藏三级分类
        // leaveIndex(){
        //     this.currentIndex=-1;
        // },
        // 进行路由跳转的方法
        goSearch(event){
            // 最好解决方案：编程式导航+事件委派（事件委派是吧全部子节点【h3/dt/d1/em】的事件委托给父节点）
                //事件委派存在问题。问题1：点击时确认被点击元素 ？
            // 问题2：即使能确定点击的是a标签，怎么确定是哪级分类？

            // 第一个问题：把子节点中a标签，加上自定义属性data-categoryName，其余子节点没有
                //节点存在dataset属性，可以获取节点自定义属性与属性值 
            // console.log(event.target)
            let element=event.target;
            let {categoryname,category1id,category2id,category3id }=element.dataset;
            // 如果标签身上有categoryName属性一定是a标签
            if(categoryname){
                // 整理路由跳转的参数
                // alert(123);
                let location={name:'search'};
                let query={categoryName:categoryname};
                // 一级二级三级分类的a标签
                if(category1id){
                    query.category1Id=category1id
                }else if(category2id){
                    query.category2Id=category2id
                }else{
                    query.category3Id=category3id
                };
                // 判断:如果路由跳转的时候,带有params参数,捎带传递过去
                if(this.$route.params){
                    location.params=this.$route.params;
                    // 整理完参数
                    location.query=query;
                    // 路由跳转
                    this.$router.push(location)
                };
                
            }
            // this.$router.push('/search')
        },
        // 鼠标移入显示三级分类
        enterShow(){
            this.show=true;
        },
        leaveShow(){
            this.currentIndex=-1;
            if(this.$route.path!="/home"){
                
                this.show=false; 
            }
            
        }
    },
}
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    
                    .item {
                        h3 {
                            line-height: 27.3px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }
                        
                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                            // 原 显示二三级
                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                    .current{
                            background-color: rgba(1, 192, 250, 0.603);
                        }
                }
            }
            // 过渡动画样式
            // 过渡动画--开始状态（进入）
            .sort-enter{
                height: 0px;
            }
            // 过渡动画--结束状态
            .sort-enter-to{
                height: 461px;
                // transform: rotate(360deg);//旋转
            }
            // 定义动画事件、速率
            .sort-enter-active{
                transition:all .5s linear;
                overflow: hidden;
            }
        }
    }

</style>