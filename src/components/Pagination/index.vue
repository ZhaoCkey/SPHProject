<template>
    <div class="pagination">
      <!-- 上部 -->
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="starNum_endNum.star >1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
      <button v-if="starNum_endNum.star>2">···</button>
      <!-- 中间部分 -->
      <button v-for="(page,index) in starNum_endNum.end" :key="index" v-if="page>=starNum_endNum.star" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>
      <!-- 下部 -->
      <button v-if="starNum_endNum.end<totalPage-1">···</button>
      <button v-if="starNum_endNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
      <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
      
      <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
  </template>
  
  <script>
    export default {
      name: "Pagination",
      props:['pageNo','pageSize','total','continues'],
      computed:{
        // 计算总页数
        totalPage(){
          return Math.ceil(this.total/this.pageSize);
        },
        // 计算连续页码的起始数字和结束数字
        starNum_endNum(){
          const {continues,pageNo,totalPage}=this; //解构赋值
          let star=0,end=0;
          // 连续页数5 > 当前总页数，为不正常情况
          if(continues > totalPage){
            star:1;
            end=this.totalPage;
          }else{//总页数 > 联续页数{5|7}。正常情况
            star=pageNo - parseInt(continues/2);
            end=pageNo + parseInt(continues/2);
            // 不正常现象纠正，【star数字出现0|负数】纠正
            if(star<1){
              star=1;
              end=continues;
            };
            // 不正常现象纠正，【end数组大于总页码】纠正
            if(end>totalPage){
              star = totalPage-continues+1;
              end = totalPage;
            };
          }
          return {star,end};
        }
      },
    }
  </script>
  
  <style lang="less" scoped>
    .pagination {
        text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
      }
    }
  </style>
  