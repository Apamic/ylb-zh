<template>
  <el-row class="panel-group">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>家庭医生看板</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link :to="'/familyDoctor/index'">
           查看更多
          </router-link>
        </el-button>
      </div>
      <div class="text">
        <div class="el-row">
          <el-col :xs="18" :sm="18" :lg="18" v-loading='trendListFlag'>
            <bars   v-if="!trendListFlag" :trendList="trendList" height="300px" width="100%"/>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6">
            <doctorList  :rankingList="rankingList"/>
          </el-col>
        </div>
      </div>
    </el-card>
  </el-row>


</template>

<script>
  import bars from '../charts/bars.vue'
  import doctorList from './doctorList.vue'
  import {getTrend,getranking} from '@/api/familyDoctor'

  import { getToken} from '@/utils/auth'
  export default {
    components: {
        bars,
      doctorList
    },
    data() {
      return{
        trendList:{
          total:[],
          yearMonth:[]
        },
        trendListFlag:true,
        rankingList:[]
      }
    },
    methods: {
      getTrendData() {

        getTrend({
            "govId" :getToken('govId')
          }
        ).then(response => {
          let t=this
          response.data.trendList.forEach(function (c) {
            t.trendList.total.push(c.total)
            t.trendList.yearMonth.push(c.yearMonth)
          })


          this.trendListFlag=false
        })
      },
      getRankingData(){
        getranking({
            "govId" :getToken('govId')
          }
        ).then(response => {
//          console.log(response);
            this.rankingList=response.data.rankingList
        })
      }

    },
    mounted(){
      this.getTrendData();
      this.getRankingData();
    }
  }
</script>
<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    /*width: 480px;*/
  }
</style>
