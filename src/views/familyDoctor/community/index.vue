<template>
  <div class="dashboard-container market_out">
    <div style="width: 100%" class="clearfix ">
      <el-card>
        <div class="header">
          <div class="img">
            <el-avatar class="" style="margin-right: 10px;" :size="70"
                       :src="logo"></el-avatar>
            <div style="">
              <p class="docName t1">{{orgName}}</p>
              <p class="docAdd t3">{{address}}</p>
              <!--<router-link :to="'/signedDetail/index'">-->
              <!--<el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>-->
              <!--</router-link>-->
            </div>
          </div>
          <div class="docList">
            <ul>
              <li>
                <p>地区人数</p>
                <p>{{crowdAmount}}</p>
              </li>
              <li>
                <p>团队数量</p>
                <p>{{teamAmount}}</p>
              </li>
              <li>
                <p>签约人数排名</p>
                <p>{{signingPersonRanking}}/<span  style="color: #cfcfcf">{{signingRankingTotal}}</span></p>
              </li>
              <li>
                <p>签约率排名</p>
                <p>{{signingPercentRanking}}/<span style="color: #cfcfcf">{{signingRankingTotal}}</span></p>
              </li>
              <li>
                <p>签约数量</p>
                <p>{{signingAmount}}</p>
              </li>
              <li>
                <p>签约率</p>
                <p>{{signingPercentage}}%</p>
              </li>
            </ul>
          </div>
        </div>
      </el-card>

    </div>
    <div class="dateTool" style=" display: flex;justify-content: flex-end;width: 100%;margin-top: 20px">
      <div style="margin-right: 20px">
        <el-radio-group v-model="radio1" @change="getNewData(radio1)">
          <el-radio-button label="0">全部</el-radio-button>
          <el-radio-button label="1">今日</el-radio-button>
          <el-radio-button label="2">本周</el-radio-button>
          <el-radio-button label="3">本月</el-radio-button>
          <el-radio-button label="4">全年</el-radio-button>
        </el-radio-group>
      </div>
      <el-date-picker
        @change="selectTime"
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

    <el-card style="margin-top: 20px">
      <p>签约数据详细</p>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        empty-text="暂无数据"
        :fit="true"
      >
        <el-table-column
          type="index"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          prop="teamName"
          label="团队"
        >
        </el-table-column>
        <el-table-column
          prop="signingTargetAmount"
          label="签约目标数量"
        >
        </el-table-column>
        <el-table-column
          prop="signingAmount"
          label="已签约总数量"

        >
        </el-table-column>
        <el-table-column
          prop="targetCompletePercentage"
          label="目标完成率"
          :formatter="formatter"

        >
        </el-table-column>
        <el-table-column
          prop="generalAmount"
          label="一般人群签约"


        >
        </el-table-column>
        <el-table-column
          prop="emphasisAmount"
          label="重点人群签约"

        >
        </el-table-column>
        <el-table-column
          prop="currentSigningAmount"
          label="当前时间段合计"

        >
        </el-table-column>
        <el-table-column

          label="操作"
          prop="orgId"
        >
          <template slot-scope="scope">

            <el-button type="primary" size="small"  @click="handleDelete(scope.$index, scope.row)" >查看详细</el-button>


          </template>
        </el-table-column>
      </el-table>
      <div class="pagination  clearfix" style="padding: 20px;">
        <el-pagination
          class="fr"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotal">
        </el-pagination>
      </div>
    </el-card>
    <el-row style="margin-top: 20px" :gutter="20">

      <el-col :xs="12" :sm="12" :lg="12">
        <el-card>
          <p>签约人群构成</p>
          <signedPie v-if="!crowdFlag" :crowd="crowd"  />
          <div v-if="crowdFlag" style="width: 100%;height: 300px;text-align: center;line-height: 300px;font-size: 18px">暂无数据</div>
        </el-card>

      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
        <el-card>
          <p>签约年龄构成</p>
          <signedPie v-if="!crowd2Flag" :crowd="crowd2"  />
          <div v-if="crowd2Flag" style="width: 100%;height: 300px;text-align: center;line-height: 300px;font-size: 18px">暂无数据</div>
        </el-card>

      </el-col>
    </el-row>

  </div>

</template>

<script>
  import familyDoctorTable from '../components/familyDoctorTable.vue'
  import signedPie from '../../dashboard/charts/analyze/pie.vue'
  import {getCommunityStatistics,getCommunityStatisticsListics} from '@/api/community'
  import {getAgeList,getGenderList,getCrowd} from '@/api/charts'

  import { getToken} from '@/utils/auth'
  export default {
    mounted() {
//      this.$store.state.userData.xxx;
      this.getCommunityStatisticsData();
      this.getCommunityStatisticsListicsData(0)
      this.getCrowdData("0")
      this.getAgeData("0")
    },
    components: {

      familyDoctorTable,
      signedPie
    },
    data() {
      return {
        crowdFlag:true,
        crowd:{
          type:[],
          percentage:[],
          amount:[],
          arr:[],
          total:"0"
        },
        crowd2Flag:true,
        crowd2:{
          type:[],
          percentage:[],
          amount:[],
          arr:[],
          total:"0"
        },
        value2:'',
        pageSize:5,
        pageNum:1,
        tableData: [],
        currentPage: 1,
        radio1:'0',
        orgId: this.$route.params.orgId,
        signingPersonRanking: '',
        signingAmount: '',
        signingPercentage: '',
        orgName: '',
        address: '',
        orgTypeName: '',
        signingPercentRanking: '',
        logo: '',
        teamAmount: '',
        signingRankingTotal: '',
        crowdAmount: '',
        listTotal:0,
      };
    },
    methods: {
      getCrowdData(e,timeA){

        this.crowdFlag=true
        this.crowd={
          type:[],
          percentage:[],
          amount:[],
          arr:[],
          total:"0"
        }
        let t=this
        let gData={}
        if(timeA){
          gData={
            "areaType" : "1",
            "areaId" :  this.$route.params.orgId,
            "crowdType" : "0",
            "timeType" : 5,
            "startTime" : timeA[0],
            "endTime" : timeA[1]
          }
        }else {
          gData={
            "areaType" : "1",
            "areaId" :  this.$route.params.orgId,
            "crowdType" : "0",
            "timeType" : e,

          }
        }

        getCrowd(gData).then(response => {
          if( response.data.total!=0){
            response.data.crowd.forEach(function (e) {
              t.crowd.type.push(e.name);
              t.crowd.percentage.push(e.percentage)
              t.crowd.amount.push(e.amount)
              t.crowd.arr.push({value:e.amount,name:e.name,percentage:e.percentage})
            });
            t.crowd.total=response.data.total
            console.log(t.crowd.total);
            this.crowdFlag=false

          }else {

            this.crowdFlag=true
          }

        })
      },
      getAgeData(e,timeA){
        this.crowd2Flag=true
        this.crowd2={
          type:[],
          percentage:[],
          amount:[],
          arr:[],
          total:"0"
        }
        let t=this
        let gData={}
        if(timeA){
          gData={
            "areaType" : "1",
            "areaId" :  this.$route.params.orgId,
//            "crowdType" : "0",
            "timeType" : 5,
            "startTime" : timeA[0],
            "endTime" : timeA[1]
          }
        }else {
          gData={
            "areaType" : "1",
            "areaId" : this.$route.params.orgId,
//            "crowdType" : "0",
            "timeType" : e,

          }
        }

        getAgeList(gData).then(response => {
          if(response.data.total!=0){
            response.data.ageList.forEach(function (e) {
              t.crowd2.type.push(e.scope);
              t.crowd2.percentage.push(e.percentage)
              t.crowd2.amount.push(e.amount)
              t.crowd2.arr.push({value:e.amount,name:e.scope,percentage:e.percentage})
            });
            t.crowd2.total=response.data.total
            this.crowd2Flag=false
          }else {
            this.crowd2Flag=true
          }


        })
      },
      handleDelete(e,v){
        this.$router.push({
          name: 'teamDetail',  // 路由的名称
          params: {
            teamId:v.teamId,
            orgId:this.orgId
          }
        })
      },
      getNewData(radio1) {
        this.value2 = ''
        this.pageNum = 1
        this.getCommunityStatisticsListicsData(this.radio1)
        this.getCrowdData(this.radio1)
        this.getAgeData(this.radio1)
      },
      selectTime(value2){
        this.radio1=5;
        this.getCommunityStatisticsListicsData(this.radio1,value2)
        this.getCrowdData(this.radio1,value2)
        this.getAgeData(this.radio1,value2)
      },
      formatter(row, column) {
        return row.targetCompletePercentage+'%';
      },
      handleSizeChange(val) {
        this.pageSize=val
        this.pageNum=1
        this.getCommunityStatisticsListicsData(this.radio1,this.value2)


      },
      handleCurrentChange(val) {
        this.pageNum=val
        this.getCommunityStatisticsListicsData(this.radio1,this.value2)


      },
      getCommunityStatisticsListicsData(e,timeA){
        let gData={};
        if(timeA){
          gData= {
            "orgId": this.orgId,
            "timeType" :e,
            "startTime" :timeA[0],
            "endTime" : timeA[1],
            "pageParam" : {
            "pageSize" :this.pageSize,
              "pageNum" : this.pageNum
          }
          }
        }else {
          gData= {
            "orgId": this.orgId,
            "timeType" :e,
            "pageParam" : {
              "pageSize" :this.pageSize,
              "pageNum" : this.pageNum
            }
          }
        }
        getCommunityStatisticsListics(gData).then(response => {
             if(response.isFlag){
               this.tableData=response.data.signList
               this.listTotal=response.data.total

             }else {

             }


        })
      },
      getCommunityStatisticsData() {
        getCommunityStatistics({
          "govId":  getToken("govId"),
          "orgId": this.orgId
        }).then(response => {
              this.signingPersonRanking = response.data.signingPersonRanking
              this.signingAmount = response.data.signingAmount
              this.signingPercentage = response.data.signingPercentage
              this.orgName = response.data.orgName
              this.address = response.data.address
              this.orgTypeName = response.data.orgTypeName
              this.signingPercentRanking = response.data.signingPercentRanking
              this.logo = response.data.logo
              this.teamAmount = response.data.teamAmount
              this.signingRankingTotal = response.data.signingRankingTotal
              this.crowdAmount = response.data.crowdAmount
        })
      }
    }
  };
</script>
<style>

  .market_out .el-range-separator {
    width: 10% !important;
  }

  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .header .img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
<style lang="scss" scoped>
  .docList {
    width: 60%;
    ul {
      display: flex;
      width: 100%;
      list-style: none;
      height: 100%;
      li:before {
        content: "";
        position: absolute;
        right: 0;
        width: 1px;
        height: 65px;
        background: #cfcfcf;

      }
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        width: 16.66%;
        text-align: center;
        /*border-right: 1px solid #cfcfcf;*/
        :first-child {
          color: #99a9bf;
          font-size: 16px;
          /*text-align: right;*/
          /*margin-right: 25%;*/
        }
        :last-child {
          margin: 0;
          font-size: 18px;
          /*text-align: right;*/
          /*margin-right: 40px;*/
        }
      }
      :last-child {
        border: none;
      }
    }

  }

  .listView {
    width: 100%;
    margin-top: 10px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    overflow: hidden;

    ul {
      list-style: none;
      :last-child {
        border-right: none;
      }
      li {
        width: 16%;
        text-align: center;
        padding-top: 10px;
        margin-top: 10px;
        border-right: 1px solid #cfcfcf;
      }
    }
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
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
