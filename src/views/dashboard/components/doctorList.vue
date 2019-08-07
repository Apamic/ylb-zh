<template>
<div>
  <div>
    本月签约量排名
  </div>

  <div  v-for="(u,i) in rankingList" class="text item clearfloat">
    <span class="text-index"><i :class="i+1>=4?'gary':'black'">{{i+1}}</i></span>
    <span class="text-name">{{u.name}}</span>
    <span class="text-num">{{u.total}}</span>
  </div>
  <div v-if="rankingList.length==0" style="margin-top: 30px;text-align: center;font-size: 16px">
    暂无数据
  </div>
</div>
</template>

<script>

    export default {
      props:['rankingList'],
      data() {
        return {
//            o:[
//              {'name':'东方社区','num':'323,234'},
//              {'name':'XX社区','num':'323,234'},
//              {'name':'西方社区','num':'323,234'},
//              {'name':'北方社区','num':'323,234'},
//              {'name':'南方社区','num':'323,234'},
//              {'name':'白板社区','num':'323,234'},
//              {'name':'红中社区','num':'323,234'},
//            ]
        }
      },
        components: {

        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
  /*清除浮动代码*/
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .clearfloat{zoom:1}
  .text {

    /*margin: 5px;*/
    margin-top: 20px;
    margin-bottom: 20px;
    .text-index{
      width: 10%;
      float: left;
      text-align: center;
      i{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: inline-block;
      text-align: center;
      line-height: 20px;
    }
    }
    .text-name{
      width: 70%;
      float: left;
      /*text-align: center;*/
      white-space: nowrap;
      text-overflow : ellipsis;
      overflow: hidden;
    }
    .text-num{
      width: 20%;
      float: left;
      text-align: center;
    }

  }
  .black{
    background-color: #000;
    color:#fff ;

  }
  .gary{
    background-color: #ccc;
    color:#fff ;

  }
</style>
