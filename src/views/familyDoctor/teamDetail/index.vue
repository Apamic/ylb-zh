<template>
  <div class="dashboard-container market_out"  >
    <div class="dateTool" style="width: 100%;">
      <p class="t1" style="color: #737E8C;"><span></span>{{teamName}}的签约详情</p>
     <div style="display: flex;">
       <div class="fr" style="margin-right: 20px">
         <el-radio-group v-model="radio1" @change="getTypeData(radio1)">
           <el-radio-button label="0">全部</el-radio-button>
           <el-radio-button label="1">今日</el-radio-button>
           <el-radio-button label="2">本周</el-radio-button>
           <el-radio-button label="3">本月</el-radio-button>
           <el-radio-button label="4">全年</el-radio-button>
         </el-radio-group>
       </div>
       <el-date-picker
         @change="selectTime"
         class="fr"
         v-model="value2"
         type="daterange"
         align="right"
         unlink-panels
         range-separator="至"
         start-placeholder="开始日期"
         end-placeholder="结束日期"
         value-format="yyyy-MM-dd"
       >
       </el-date-picker>
     </div>
    </div>
    <div style="width: 100%" class="">
      <el-card>
        <div class="docList">
          <ul>
            <li>
              <p>签约总数量</p>
              <p>{{teamSigningTotal}}</p>
            </li>
            <li>
              <p>目标完成率</p>
              <p>{{targetCompletePercentage}}</p>
            </li>
            <li>
              <p>当前时间段总数量</p>
              <p>{{currentSigningTotal}}</p>
            </li>
            <li>
              <p>签约量排名</p>
              <p>{{signingAmountRanking}}/<span style="color: #cfcfcf">{{signingRankingTotal}}</span></p>
            </li>
            <li>
              <p>签约率排名</p>
              <p>{{signingPercentRanking}}/<span style="color: #cfcfcf">{{signingRankingTotal}}</span></p>
            </li>
            <li>
              <p>重点人群</p>
              <p>{{emphasisAmount}}</p>
            </li>
          </ul>
        </div>
      </el-card>

    </div>
    <!--<teamTable style="margin-top: 20px;"/>-->
    <div style="margin-top: 25px">
      <el-card>
        <div style="display: flex;justify-content: space-between;align-items: center;" >
          <p class="fl">签约列表</p>
          <div class="fr" style="margin-right: 20px">
            <el-radio-group style="margin-right: 20px" v-model="radio2" @change="getNewData(radio2)">
              <el-radio-button label="0">全部</el-radio-button>
              <el-radio-button label="1">服务中</el-radio-button>
              <el-radio-button label="2">履约完成</el-radio-button>
            </el-radio-group>
            <el-input
              class="fr"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              clearable
              @blur="getSearch()"
              @keyup.enter.native="getSearch()"
              v-model="input2" style="width: 250px;">
            </el-input>
          </div>
        </div>
        <div>
          <teamTable :tableData="tableData" :orgId="orgId"></teamTable>
          <div class="pagination clearfix" style="padding: 20px">
            <el-pagination
              class="fr"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="listTotal">
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
  import teamTable from './components/teamTable.vue'
  import {getTeamStatistics,getTeamStatisticsList} from '@/api/signing'
  //  import { mapGetters } from 'vuex'

  export default {
    components:{
      teamTable
//      familyDoctorTable,
//      signedPie
    },
    data() {
      return {
        input2:'',
        tableData:[],
        currentSigningTotal:'',
        emphasisAmount:'',
        signingAmountRanking:'',
        signingPercentRanking:'',
        signingRankingTotal:'',
        targetCompletePercentage:'',
        teamName:'',
        teamSigningTotal:'',
        orgId:this.$route.params.orgId,
        teamId: this.$route.params.teamId,
        radio1:"0",
        radio2:'0',
        value2: '',
        listTotal:0,
        pageSize:5,
        pageNum:1,
        currentPage: 1,
      };
    },
    mounted(){
      this.getTeamStatisticsData(0);
      this.getTeamStatisticsListData(0)
    },
    methods:{
      handleSizeChange(val) {
        this.pageSize=val
        this.pageNum=1
        this.getTeamStatisticsData(this.radio1,this.value2);
        this.getTeamStatisticsListData(this.radio1,this.value2)
      },
      handleCurrentChange(val) {
        this.pageNum=val
        this.getTeamStatisticsData(this.radio1,this.value2);
        this.getTeamStatisticsListData(this.radio1,this.value2)

      },
      getSearch(){
//        console.log(this.input2);
        this.getTeamStatisticsListData(this.radio1,this.value2)
      },
      getTypeData(radio1){
        this.value2=''
        this.pageNum=1
        this.getTeamStatisticsData(this.radio1)
        this.getTeamStatisticsListData(this.radio1)
      },
      getNewData(radio2){
        this.pageNum=1
        this.getTeamStatisticsData(this.radio1)
        this.getTeamStatisticsListData(this.radio1)
      },
      selectTime(value2){
        this.radio1=5;
        this.pageNum=1
        this.getTeamStatisticsData(this.radio1,this.value2);
        this.getTeamStatisticsListData(this.radio1,this.value2)
      },
      getTeamStatisticsData(e,timeA) {
        let gData={};
        if(timeA){
          gData={
            "orgId" : this.orgId,
            "teamId" : this.teamId,
            "timeType" : e,
            "startTime" :timeA[0],
            "endTime" :timeA[1]

          }
        }else {
          gData={
            "orgId" : this.orgId,
            "teamId" : this.teamId,
            "timeType" : e,


          }
        }

        getTeamStatistics(gData).then(response => {
//          console.log(response);
//          response.data.
          this.currentSigningTotal=response.data.currentSigningTotal
          this.emphasisAmount=response.data.emphasisAmount
          this.signingAmountRanking=response.data.signingAmountRanking
          this.signingPercentRanking=response.data.signingPercentRanking
          this.signingRankingTotal=response.data.signingRankingTotal
          this.targetCompletePercentage=response.data.targetCompletePercentage
          this.teamName=response.data.teamName
          this.teamSigningTotal=response.data.teamSigningTotal
        })
      },
      getTeamStatisticsListData(e,timeA){
        let gData={};
        if(timeA){
         gData = {
            "orgId" : this.orgId,
            "teamId" : this.teamId,
            "timeType" : e,
            "serviceType" : this.radio2,
            "pageParam" : {
            "pageSize" :this.pageSize,
              "pageNum" :this.pageNum
          },
            "search" :this.input2,
           "startTime" :timeA[0],
           "endTime" :timeA[1]

          }
        }else {
          gData= {
            "orgId" : this.orgId,
            "teamId" : this.teamId,
            "timeType" : e,
            "serviceType" : this.radio2,
            "pageParam" : {
              "pageSize" :this.pageSize,
              "pageNum" :this.pageNum
            },
            "search" :this.input2,


          }
        }
        getTeamStatisticsList(gData).then(response => {

            this.tableData=response.data.signList
            this.listTotal=response.data.total
        })
      }

    }
  };
</script>
<style>

  .market_out .el-range-separator{
    width: 10% !important;
  }
  .dateTool {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
  }

</style>
<style lang="scss" scoped>
  .docList {
    width: 100%;
    ul{
      display: flex;
      width: 100%;
      list-style: none;
      :last-child:before{
        content: "";
        position: absolute;
        right:0;
        width:0;
      }
      li:before{
        content: "";
        position: absolute;
        right:0;
        width: 1px;
        height:50px;
        background: #cfcfcf;
      }
      li{
        position: relative;
        width: 16.66%;
        text-align: center;
        /*border-right: 1px solid #cfcfcf;*/
        :first-child{
          color: #99a9bf;
          text-align: center;
          font-size: 18px;
          margin-bottom: 5px;
        }
        :last-child{
          margin: 0;
          font-size: 20px;
          text-align: center;
          /*margin-right: 40px;*/
        }
      }
      :last-child{
        border: none;
      }
    }

  }
  .listView{
    width: 100%;
    margin-top: 10px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    overflow: hidden;

    ul{
      list-style: none;
      :last-child{
        border-right: none;
      }
      li{
        width: 16%;
        text-align: center;
        padding-top: 10px;
        margin-top: 10px;
        border-right: 1px solid #cfcfcf;
      }
    }
  }
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }


  }

</style>
