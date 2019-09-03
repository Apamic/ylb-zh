<template>
  <div class="dashboard-container market_out">
    <div style="width: 100%">
      <el-card>
        <div class="card">
          <el-avatar style="flex: 0 0 70px;margin-right: 20px" :size="70"
                     :src="titleData.logo"></el-avatar>
          <div>
            <p class="docName">{{titleData.orgName}}</p>
            <p class="docAdd">{{titleData.address}}</p>
            <!--<router-link :to="'/signedDetail/index'">-->
            <!--<el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>-->
            <!--</router-link>-->
          </div>
          <div class="docList">
            <ul>
              <li>
                <p>在线总收入</p>
                <p>{{titleData.onlineRevenue}}元</p>
              </li>
              <li>
                <p>认证医生数量</p>
                <p>{{titleData.officialDoctorAmount}}</p>
              </li>
            </ul>
          </div>
        </div>
      </el-card>

    </div>
    <div class="dateTool clearfix" style="width: 100%;margin-top: 15px">
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
      <div class="fr" style="margin-right: 10px">
        <el-radio-group v-model="radio1" @change="getNewData(radio1)">
          <el-radio-button label="0">全部</el-radio-button>
          <el-radio-button label="1">今日</el-radio-button>
          <el-radio-button label="2">本周</el-radio-button>
          <el-radio-button label="3">本月</el-radio-button>
          <el-radio-button label="4">全年</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div style="margin-top: 20px">
      <hospitalTotal :data="Statistics" :lineData="lineData" :title="title"/>

    </div>


  </div>

</template>

<script>
    import hospitalTotal from '@/views/dashboard/components/hospitalTotal.vue'
    import signedPie from '../../dashboard/charts/analyze/pie.vue'
    import {getCommunityStatistics, getCommunityStatisticsListics} from '@/api/community'
    import {getAgeList, getGenderList, getCrowd} from '@/api/charts'

    import {getToken} from '@/utils/auth'

    const state = {
        token: getToken('token'),
        name: getToken('nickName'),
        avatar: getToken('logo'),
        govId: getToken('govId')
    }

    export default {
        mounted() {
//      this.$store.state.userData.xxx;
//      this.getCommunityStatisticsData();
//      this.getCommunityStatisticsListicsData(0)
//      this.getCrowdData("0")
//      this.getAgeData("0")


        },
        components: {
            hospitalTotal
        },

        created() {
            this.orgId = this.$route.params.orgId
            // console.log(this.orgId)
            this.getHospitalInfo('0')

            this.gethospitalSpecialPackageList()
            this.gethospitalServiceStatistics('0')

        },

        data() {
            return {
                title: '医院业务统计',

                titleData: {},
                Statistics: {},
                end: '',
                startdate: '',

                lineData: [],



                value2: [],

                tableData: [],

                radio1: '0',

                listTotal: 0,
            };
        },
        methods: {

            getHospitalInfo() {

                let gdata = {
                    govId: state.govId,
                    orgId: this.orgId,
                }

                this.$axios({
                    url: '/statistics/hospital/hospitalInfo',
                    method: 'POST',
                    data: gdata
                }).then(res => {
                    console.log(res)
                    this.titleData = res.data
                })
            },

            gethospitalServiceStatistics(timeType, time) {
                let gdata = {}
                if (!time) {
                    gdata = {
                        govId: state.govId,
                        orgId: this.orgId,
                        timeType: timeType,
                    }
                } else {
                    gdata = {
                        govId: state.govId,
                        orgId: this.orgId,
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

            getNewData(radio1) {
                this.radio1 = radio1
                this.value2 = ''
                this.gethospitalServiceStatistics(this.radio1)

            },

            selectTime(value2) {
                this.radio1 = 5
                this.gethospitalServiceStatistics(this.radio1, value2)
            },

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


            // selectTime(value2) {
            //     this.radio1 = 5;
            //     this.getCommunityStatisticsListicsData(this.radio1, value2)
            //     this.getCrowdData(this.radio1, value2)
            //     this.getAgeData(this.radio1, value2)
            // },


            handleDelete(e, v) {
                this.$router.push({
                    name: 'teamDetail',  // 路由的名称
                    params: {
                        teamId: v.teamId,
                        orgId: this.orgId
                    }
                })
            },
            // getNewData(radio1) {
            //     this.value2 = ''
            //     this.pageNum = 1
            //     this.getCommunityStatisticsListicsData(this.radio1)
            //     this.getCrowdData(this.radio1)
            //     this.getAgeData(this.radio1)
            // },

            formatter(row, column) {
                return row.targetCompletePercentage + '%';
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.pageNum = 1
                this.getCommunityStatisticsListicsData(this.radio1, this.value2)


            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.getCommunityStatisticsListicsData(this.radio1, this.value2)


            },
            getCommunityStatisticsListicsData(e, timeA) {
                let gData = {};
                if (timeA) {
                    gData = {
                        "orgId": this.orgId,
                        "timeType": e,
                        "startTime": timeA[0],
                        "endTime": timeA[1],
                        "pageParam": {
                            "pageSize": this.pageSize,
                            "pageNum": this.pageNum
                        }
                    }
                } else {
                    gData = {
                        "orgId": this.orgId,
                        "timeType": e,
                        "pageParam": {
                            "pageSize": this.pageSize,
                            "pageNum": this.pageNum
                        }
                    }
                }
                getCommunityStatisticsListics(gData).then(response => {
                    if (response.isFlag) {
                        this.tableData = response.data.signList
                        this.listTotal = response.data.total

                    } else {

                    }


                })
            },
            getCommunityStatisticsData() {
                getCommunityStatistics({
                    "govId": getToken("govId"),
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
<style scoped>

  .market_out >>> .el-range-separator {
    width: 10% !important;
  }

  .card {
    display: flex;
    align-items: center;
  }

  .docName {
    /*margin-bottom: 10px;*/
    white-space: nowrap;
  }

  .docAdd {
    /*padding-left: 10px;*/
    color: #999;
    font-size: 14px;
    white-space: nowrap;
  }

</style>
<style lang="scss" scoped>
  .docList {
    width: 100%;

    ul {
      display: flex;
      justify-content: flex-end;
      width: 100%;

      list-style: none;

      li:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 40px;
        background: #cfcfcf;
      }

      li {
        position: relative;
        width: 16.66%;
        text-align: center;
        /*border-right: 1px solid #cfcfcf;*/
        :first-child {
          color: #99a9bf;
        }

        :last-child {
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
        float: left;
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
