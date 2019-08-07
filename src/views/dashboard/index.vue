<template>
  <div class="dashboard-container">
    <div style="width: 90%">
      <realTimeData id="realTimeData"/>
      <familyDoctor style="margin-top: 20px" id="familyDoctor"/>
      <hospitalTotal style="margin-top: 20px" id="hospitalTotal" :data="Statistics" :lineData="lineData"/>
      <bothWay style="margin-top: 20px" id="bothWay"/>
      <analyze style="margin-top: 20px" id="analyze" :title="title"/>
      <mapHouse style="margin-top: 20px" id="mapHouse"/>
    </div>

    <div style="position: fixed;right: 40px;top: 100px;" class="right-box">
      <ul >
        <li v-on:click="viewTo('realTimeData')">实时数据</li>
        <li v-on:click="viewTo('familyDoctor')">家庭医生</li>
        <li v-on:click="viewTo('hospitalTotal')">医院看板</li>
        <li v-on:click="viewTo('bothWay')">双向转诊</li>
        <li v-on:click="viewTo('analyze')">患者分析</li>
        <li v-on:click="viewTo('mapHouse')">健康小屋</li>
      </ul>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import realTimeData from './components/realTimeData.vue'
import familyDoctor from './components/familyDoctor.vue'
import hospitalTotal from './components/hospitalTotal.vue'
import bothWay from './components/bothWay.vue'
import analyze from './components/analyze.vue'
import mapHouse from './components/map.vue'

import {getToken} from '@/utils/auth'

const state = {
    token: getToken('token'),
    name: getToken('nickName'),
    avatar: getToken('logo'),
    govId: getToken('govId'),
    orgName: getToken('orgName'),
    orgId: getToken('orgId')
}


export default {
    name: 'Dashboard',
    data() {
      return {
          title: '患者分析看板',
          o:[
            {'name':'实时数据','id':'realTimeData'},
            {'name':'XX社区','num':'323,234'},
            {'name':'西方社区','num':'323,234'},
            {'name':'北方社区','num':'323,234'},
            {'name':'南方社区','num':'323,234'},
            {'name':'白板社区','num':'323,234'},
            {'name':'红中社区','num':'323,234'},
          ],



          end:'',
          startdate: '',
          Statistics: {},
          lineData: [],


      }
    },

    created() {
        console.log(state.govId)
        this.$nextTick(() => {
            this.gethospitalServiceStatistics('0')
            this.gethospitalSpecialPackageList()
        })
    },
    methods: {
        initDate() {
            var date = new Date();
            //年
            var year = date.getFullYear();
            //月
            var month = date.getMonth() + 1;

            //日
            var day = date.getDate();

            var end = year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day);

            this.end = end

            var lw = new Date(date - 1000 * 60 * 60 * 24 * 30);//最后一个数字30可改，30天的意思
            var lastY = lw.getFullYear();
            var lastM = lw.getMonth() + 1;
            var lastD = lw.getDate();
            var startdate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);//三十天之前日期

            this.startdate = startdate

        },
        gethospitalServiceStatistics(timeType, time) {
            let gdata = {}
            if (!time) {
                gdata = {
                    govId: state.govId,
                    // orgId: state.orgId,
                    timeType: timeType,
                }
            } else {
                gdata = {
                    govId: state.govId,
                    // orgId: state.orgId,
                    timeType: timeType,
                    startTime: time[0],
                    endTime: time[1],
                }
            }

            this.$axios({
                url: '/statistics/hospital/hospitalServiceStatistics',
                method: 'POST',
                data: gdata
            }).then(res => {
                console.log(res)
                this.Statistics = res.data.serviceItemData
            })
        },
        gethospitalSpecialPackageList() {
            this.initDate()
            let gdata = {
                startTime: this.startdate,
                endTime: this.end,
                // orgId: state.orgId,
                govId: state.govId,
            }

            this.$axios({
                url: '/statistics/hospital/hospitalSpecialPackageList',
                method: 'POST',
                data: gdata
            }).then(res => {
                this.lineData = res.data.specialPackageList
                // console.log(123)
                // console.log(this.lineData)
            })
        },

        viewTo(e){
            document.getElementById(e).scrollIntoView({
                block: 'center'
            });
        }
    },

  components:{
    realTimeData,
    familyDoctor,
    hospitalTotal,
    bothWay,
    analyze,
    mapHouse
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .right-box{
    ul{
      list-style: none;
      padding: 0;
      margin: 0;
      li{
        margin-bottom: 5px;
        width: 50px;
        height:50px;
        text-align: center;
        line-height: 20px;
        padding: 5px;
        border: 1px solid #cfcfcf;
        border-radius: 4px;
        display: block;
        list-style: none;
        background-color: #fff;
        font-size: 14px;
        cursor: pointer;
        transition: .3s;
      }
      li:hover{
        background-color: #36a3f7;
        color: #fff;
        border: 1px solid #36a3f7;
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
