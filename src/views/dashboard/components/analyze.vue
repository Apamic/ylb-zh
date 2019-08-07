<template>
  <el-row class="panel-group">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" v-if="title == '患者分析看板'">
          <router-link :to="'/healthRecord/index'">
            查看更多
          </router-link>
        </el-button>
      </div>
      <div class="text">
        <div class="el-row">
          <el-col :xs="12" :sm="12" :lg="12" class="bl p10">
            <bars height="100%" v-if="!percentageFlag" :percentage="percentage" :scope="scope" />
            <div v-else style="width: 100%;height: 300px;text-align: center;line-height: 300px;font-size: 18px">暂无数据</div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12" class="bb p10" style="height: 300px">
            <el-col :xs="24" :sm="24" :lg="24" style="height: 50%">
              <div style="float: left;width: 10%;height: 100%">男</div>
              <div style="float: left;width: 90%;height: 100%">
                <male height="100%"  v-if="!genderFlag" :male="male"/>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="24" style="height: 50%">
              <div style="float: left;width: 10%;height: 100%">女</div>
              <div style="float: left;width: 90%;height: 100%">
                <female height="100% " v-if="!genderFlag" :female="female"/>
              </div>
            </el-col>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12" class="bt p10">
            <pie height="100%" width="100%" style="float:left;" v-if="!crowdFlag" :crowd="crowd"/>
            <div v-else style="width: 100%;height: 300px;text-align: center;line-height: 300px;font-size: 18px">暂无数据</div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12" class="br p10">
            <reverseBar height="100%"/>
          </el-col>
        </div>
      </div>
    </el-card>
  </el-row>


</template>

<script>

  import { getToken} from '@/utils/auth'
  import bars from '../charts/analyze/bars.vue'
  import male from '../charts/analyze/male.vue'
  import female from '../charts/analyze/female.vue'
  import pie from '../charts/analyze/pie.vue'
  import reverseBar from '../charts/analyze/reverseBar.vue'
  import {getAgeList,getGenderList,getCrowd} from '@/api/charts'
  export default {
    components: {
      bars,
      male,
      female,
      pie,
      reverseBar
    },
    props: {
      title: {
        type: String,
        defualt: '患者分析看板'
      },

      time: {
          type: Array,
          default: []
      },

      timeType: {
          type: String,
          default: '0'
      }

    },

    watch: {
        'time'() {
            this.getAgeListData(this.timeType,this.time)
            this.getCrowdData(this.timeType,this.time)
        },

        'timeType'() {
            this.getAgeListData(this.timeType,this.time)
            this.getCrowdData(this.timeType,this.time)
        }

    },

    data() {
      return {
        percentage:[],
        scope:[],
        percentageFlag:true,
        genderFlag:true,
        crowdFlag:true,
        crowd:{
          type:[],
          percentage:[],
          amount:[],
          arr:[],
          total:0
        },
        male:0,
        female:0,

      }
    },

      created() {
          this.getAgeListData('0');
          this.getGenderListData();
          this.getCrowdData('0')
      },
    // mounted() {
    // this.getAgeListData('0');
    // this.getGenderListData();
    // this.getCrowdData('0')
    // },
    methods: {
      getAgeListData(timeType = '0',time = []) {

        let t=this
        getAgeList({
            "areaType" : "0",
            "areaId" : getToken('govId'),
            "timeType" : timeType,
            "startTime" : time[0],
            "endTime" : time[1]

      }
        ).then(response => {
            if (response.data.ageList.length != 0) {
                this.scope = []
                this.percentage = []
                response.data.ageList.forEach(function (e) {
                    t.scope.push(e.scope);
                    t.percentage.push(e.percentage)
                })
                t.percentageFlag= false
            } else {
                t.percentageFlag= true
            }
          // this.scope = []
          // this.percentage = []
          // response.data.ageList.forEach(function (e) {
          //   t.scope.push(e.scope);
          //   t.percentage.push(e.percentage)
          // })
          // t.percentageFlag=false
        })

      },
      getGenderListData(){
        let t=this
        getGenderList({
          "govId" : getToken('govId')
          }
        ).then(response => {

          t.male=response.data.genderList[0].amount;
          t.female=response.data.genderList[1].amount;
//          console.log(t.male);
//          console.log(t.female);
          t.genderFlag=false
        })

      },
      getCrowdData(timeType = '0',time = []){
        let t=this
        getCrowd({
            "areaType" : "0",
            "areaId" : getToken('govId'),
            "crowdType" : "2",
            "timeType" : timeType,
            "startTime" : time[0],
            "endTime" : time[1]
      }).then(response => {

              if ( response.data.crowd.length != 0 ) {
                  this.crowdFlag=false
                  this.crowd = {}
                  this.crowd.type = []
                  this.crowd.percentage = []
                  this.crowd.amount = []
                  this.crowd.arr = []
                  response.data.crowd.forEach(function (e) {
                      t.crowd.type.push(e.name);
                      t.crowd.percentage.push(e.percentage)
                      t.crowd.amount.push(e.amount)
                      t.crowd.arr.push({value:e.amount,name:e.name,percentage:e.percentage})
                  });
                  t.crowd.total=response.data.total
              } else {
                  this.crowdFlag = true
              }

              // this.crowdFlag=false
              // this.crowd = {}
              // this.crowd.type = []
              // this.crowd.percentage = []
              // this.crowd.amount = []
              // this.crowd.arr = []
              // response.data.crowd.forEach(function (e) {
              //     t.crowd.type.push(e.name);
              //     t.crowd.percentage.push(e.percentage)
              //     t.crowd.amount.push(e.amount)
              //     t.crowd.arr.push({value:e.amount,name:e.name,percentage:e.percentage})
              // });
              // t.crowd.total=response.data.total

        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .p10{
    padding: 10px;
  }
  .bb{
    border-bottom: 1px solid #ccc;
    height: 300px;
  }
  .bt{
    height: 300px;
    border-right:1px solid #ccc;
  }
  .bl{
    border-bottom: 1px solid #ccc;
    border-right:1px solid #ccc;
    height: 300px;
  }
  .br{


    height: 300px;
  }
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
