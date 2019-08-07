<template>
  <div class="dashboard-container market_out"  >
    <div style="width: 100%">
      <div class="family-head clearfix">
        <span class="fl">转诊统计</span>
        <el-button  type="primary" size="small" @click="toLink()">
          跳转转诊统计详细
        </el-button>
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
        <div class="fr" style="margin-right: 20px">
          <el-radio-group v-model="radio1" @change="getNewData(radio1)">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">今日</el-radio-button>
            <el-radio-button label="2">本周</el-radio-button>
            <el-radio-button label="3">本月</el-radio-button>
            <el-radio-button label="4">全年</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>


    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
      <span>机构转诊统计</span>

    </div>
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
          prop="orgName"
          label="机构"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="orgTypeName"
          label="类型"
        >
        </el-table-column>
        <el-table-column
          prop="crowdTotal"
          label="转出(上转)次数"

        >
        </el-table-column>
        <el-table-column
          prop="signingAmount"
          label="转出(下转)次数"

        >
        </el-table-column>
        <el-table-column
          prop="crowdTotal"
          label="转出(上转)次数"

        >
        </el-table-column>
        <el-table-column
          prop="signingAmount"
          label="转出(下转)次数"

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

      <div class="pagination fr" style="padding: 20px">
        <el-pagination
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




  </div>

</template>

<script>

  import {getAgeList,getGenderList,getCrowd} from '@/api/charts'
  import { getToken} from '@/utils/auth'

  export default {
    components:{


    },
    mounted() {
//      this.getGov(0);
//      this.getLIstData(0)
//      this.getCrowdData("0")
//      this.getAgeData("0")
    },
    methods: {
      toLink(){
        this.$router.push({
          name: 'bothWayStatisticsDetail',  // 路由的名称
          params: {
            orgId:"111"
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize=val
        this.pageNum=1
        this.getGov(this.radio1,this.value2)
        this.getLIstData(this.radio1,this.value2)
      },
      handleCurrentChange(val) {
        this.pageNum=val
        this.getGov(this.radio1,this.value2)
        this.getLIstData(this.radio1,this.value2)

      },
      getNewData(radio1){
        this.value2=''
        this.pageNum=1
        this.getGov(this.radio1)
        this.getLIstData(this.radio1)
        this.getCrowdData(this.radio1 )
        this.getAgeData(this.radio1 )
      },
      selectTime(value2){
        this.radio1=5;
        this.pageNum=1
        this.getGov(this.radio1,value2)
        this.getLIstData(this.radio1,value2)
        this.getCrowdData(this.radio1,value2 )
        this.getAgeData(this.radio1,value2 )
      },
      getGov(e,timeA) {

        let gData={};
        if(timeA){
          gData={
            "govId": getToken("govId"),
            "timeType":e,
            "startTime" :timeA[0] ,
            "endTime" : timeA[1]

          }
        }else {
          gData={
            "govId":  getToken("govId"),
            "timeType":e,
          }
        }
        let t = this
        getGov(gData).then(response => {
          if(response.isFlag){

            this.areaPersonTotal=response.data.areaPersonTotal
            this.emphasisCrowdAmount=response.data.emphasisCrowdAmount
            this.emphasisPercentage=response.data.emphasisPercentage
            this.generalCrowdAmount=response.data.generalCrowdAmount
            this.signingAmount=response.data.signingAmount
            this.signingPercentage=response.data.signingPercentage

          }else {

          }

        })
      },
      getLIstData(e,timeA){

        let gData={};
        if(timeA){
          gData={
            "govId":  getToken("govId"),
            "timeType":e,
            "startTime" :timeA[0] ,
            "endTime" : timeA[1],
            "pageParam" : {
              "pageSize" :this.pageSize,
              "pageNum" : this.pageNum
            },
          }
        }else {
          gData={
            "govId":  getToken("govId"),
            "timeType":e,
            "pageParam" : {
              "pageSize" :this.pageSize,
              "pageNum" : this.pageNum
            },
          }
        }

        getList(gData).then(response => {

          this.listTotal=response.data.total
          this.signList=response.data.signList

        })
      },
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
            "areaType" : "0",
            "areaId" :  getToken("govId"),
            "crowdType" : "0",
            "timeType" : 5,
            "startTime" : timeA[0],
            "endTime" : timeA[1]
          }
        }else {
          gData={
            "areaType" : "0",
            "areaId" :  getToken("govId"),
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
            "areaType" : "0",
            "areaId" : getToken("govId"),
//            "crowdType" : "0",
            "timeType" : 5,
            "startTime" : timeA[0],
            "endTime" : timeA[1]
          }
        }else {
          gData={
            "areaType" : "0",
            "areaId" : getToken("govId"),
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
    },
    data() {
      return {
        tableData:[],
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
        signList:[],
        radio1: '0',
        currentPage: 1,
        pickerOptions: {
          shortcuts: [{
            text: '今日',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
            }
          }, {
            text: '今年至今',
            onClick(picker) {
//              console.log(picker);
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);

            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
//        value1: '',
        value2: '',
        areaPersonTotal:0,
        emphasisCrowdAmount: 0,
        emphasisPercentage: 0,
        generalCrowdAmount: 0,
        signingAmount: 0,
        signingPercentage: 0,
        listTotal:0,
        pageSize:5,
        pageNum:1,
      };
    }
  };
</script>
<style>
  .market_out .el-range-separator{
    width: 10% !important;
  }
</style>
<style lang="scss" scoped>
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
        float: left;
        width: 25%;
        text-align: center;
        padding-top: 10px;
        margin-top: 10px;
        border-right: 1px solid #cfcfcf;
        p{
          font-size: 20px;
        }
      }
    }
  }
  .fl{
    float: left;
  }
  .fr{
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
