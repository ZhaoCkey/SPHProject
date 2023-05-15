<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1"
              @change="updateChecked(cart,$event)"
            >
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @change="handler('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',+1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum*cart.skuPrice}}</span>
          </li> 
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @change="updateAllCartChecked" >
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex';
import {throttle} from 'lodash' ;//节流

  export default {
    name: 'ShopCart',
    mounted(){
      this.getData();
    },
    methods:{
      // 获取 个人 购物车数据
      getData(){
        this.$store.dispatch('getCartList');
      },
      // 修改某一个产品的个数
        // type 区分三个元素
        // disNUm 在+-表示变化量；  在input表示最终的个数（不是变化量）
        // cart 区分产品，cart上有ID
          // console.log(type , disNum,cart)
        // 向服务器发请求，修改数量
      handler:throttle(async function(type,disNum,cart){//添加防抖
        switch(type){
          // +
          case 'add':
            // 带给服务器变化的量
            disNum=1;
          break;
          case 'minus':
            // 判断产品个数大于1，才传递-1 ; 
            disNum=cart.skuNum>1?-1:0;
          break; 
          case 'change':
            // console.log("0"+"--"+disNum)
            if(isNaN(disNum)||disNum<1){
              disNum=0//输入非法格式
              // console.log('1'+'--'+disNum)
            }else{//正常情况（小数->取整）
              disNum=parseInt(disNum)-cart.skuNum;
              // console.log("2"+disNum)
            }
          break;
        }
        // 派发action
        try {
          // 代表修改成功
           await  this.$store.dispatch('addOrUpdateShopCart',{
            skuId:cart.skuId,
            skuNum:disNum
          })
          // 再获取一次购物车数据
          this.getData();
        } catch (error) {
          alert(error.message)
        }
      },1000),
      // 删除购物车某一个产品
      async deleteCartById(cart){
        try {
          // 如果删除成功，再发一次请求获取新的数据--刷新
          await this.$store.dispatch('deleteCartListBySkuId',cart.skuId);
          this.getData();
        } catch (error) {
          alert(error.message)
        }
      },
      // 修改商品选中状态
      async updateChecked(cart,event){
        // console.log(event.target.checked)
        // 带给服务器的参数 isChecked 不是布尔值 是 0|1
        try {
          let isChecked = event.target.checked?"1":"0";
          await this.$store.dispatch('updataCheckedById',{skuId:cart.skuId,isChecked:isChecked});
          // 如果成功子啊请求一次数据
          this.getData();
        } catch (error) {
          // 如果失败提示
          alert(error.message);
        }
        
      },
      // 删除全部选中后的产品
      async deleteAllCheckedCart(){
        // alert("测试点击删除全部选中的商品")
        try {
          await this.$store.dispatch("deleteAllCheckedCart");
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      },
      // 修改全选按钮的选中状态
      async updateAllCartChecked(event){
        // alert("测试点击选中按钮")
        try {
          let isChecked = event.target.checked?"1":"0";
        // 派发action
          await this.$store.dispatch("updateAllCartIsChecked",isChecked);
          this.getData();
        } catch (error) {
          alert(error.message)
        }
      },

    },
    computed:{
      ...mapGetters(['cartList']),
      // 购物车的数据
      cartInfoList(){
        return this.cartList.cartInfoList||[];
      },
      // 计算购物车总价
      totalPrice(){
        // if(this.cartInfoList.forEach(item=>{ item.checked==1 })){};
        let sum=0;
        this.cartInfoList.forEach(item => {
          sum+=item.skuNum*item.skuPrice;
        });
        return sum;
      },
      // 判断底部“全部”复选框是否勾选
      isAllChecked(){
        // 遍历数组原理-只有全部元素的ischecked属性都为1-->真 true
        // 只有有一个不是1-->假 false
        return this.cartInfoList.every(item=>item.isChecked==1);
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          // .cart-list-con3 {
          //   width: 20.8333%;

          //   .item-txt {
          //     text-align: center;
          //   }
          // }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>