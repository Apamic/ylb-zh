<template>
  <div class="dashboard-container market_out">
    <div style="width: 100%">
      <div class="family-head clearfix">
        <span class="t1">医院统计</span>
        <!--        <el-button type="primary" size="small" @click="toLink()">-->
        <!--          跳转医院详细-->
        <!--        </el-button>-->
        <el-date-picker
          v-model="value2"
          class="fr"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="selectTime"
        />
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
    <div v-cloak class="listView">
      <ul class="clearfix">
        <li>
          <span>三级医院数量</span>
          <p>{{titleData.threeLevelAmount}}</p>
        </li>
        <li>
          <span>二级医院数量</span>
          <p>{{titleData.twoLevelAmount}}</p>
        </li>
        <li>
          <span>一级医院数量</span>
          <p>{{titleData.oneLevelAmount}}</p>
        </li>
        <li>
          <span>已认证医生总数</span>
          <p>{{titleData.officialDoctorAmount}}</p>
        </li>

      </ul>
    </div>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>本区域医院统计</span>

      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        empty-text="暂无数据"
        :fit="true"
      >
        <el-table-column
          type="index"
          label="序号"
        />
        <el-table-column
          prop="orgName"
          label="机构"
        />
        <el-table-column
          prop="orgTypeName"
          label="类型"
        />
        <el-table-column
          prop="officialDoctorAmount"
          label="认证医生数量"
          sortable
        />
        <el-table-column
          prop="reservationAmount"
          label="预约数"
          sortable
        />
        <el-table-column
          prop="inquiryAmount"
          label="问诊数"

          sortable
        />
        <el-table-column
          prop="servicePackageAmount"
          label="服务包销量"
          sortable
        />
        <el-table-column
          prop="healthProductAmount"
          label="健康产品销量"
          sortable
        />
        <el-table-column
          prop="homeServiceAmount"
          label="上门服务销量"
          sortable
        />

        <el-table-column

          label="操作"
          prop="orgId"
        >
          <template slot-scope="scope">

            <el-button type="primary" size="small" @click="toLink(scope.row)">查看详细</el-button>

          </template>
        </el-table-column>
      </el-table>

      <div class="pagination fr" style="padding: 20px">
        <el-pagination
          :current-page="pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

    </el-card>

  </div>

</template>

<script>
    import {getAgeList, getGenderLis, getCrowd} from '@/api/charts'
    import {getGov, getList} from '../../api/familyDoctor'

    import {getToken} from '@/utils/auth'

    const state = {
        token: getToken('token'),
        name: getToken('nickName'),
        avatar: getToken('logo'),
        govId: getToken('govId')
    }

    export default {
        components: {},

        created() {
            this.getHospitalStatistics('0')
            this.getHospitalStatisticsList('0')
        },

        data() {
            return {

                titleData: [],

                tableData: [],

                radio1: '0',
                currentPage: 1,
                pickerOptions: {
                    shortcuts: [{
                        text: '今日',
                        onClick(picker) {
                            picker.$emit('pick', [new Date(), new Date()])
                        }
                    }, {
                        text: '今年至今',
                        onClick(picker) {
                            //              console.log(picker);
                            const end = new Date()
                            const start = new Date(new Date().getFullYear(), 0)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近六个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setMonth(start.getMonth() - 6)
                            picker.$emit('pick', [start, end])
                        }
                    }]
                },
                //        value1: '',
                value2: [],
                listTotal: 0,
                pageSize: 5,
                pageNum: 1
            }
        },
        mounted() {

        },
        methods: {


            getHospitalStatistics(timeType, time=[]) {
                let gdata = {}

                if (!time) {
                    gdata = {
                        govId: state.govId,
                        timeType: timeType,

                        // "pageParam" : {
                        //     "pageSize" :this.pageSize,
                        //     "pageNum" : this.pageNum
                        // },
                    }
                } else {
                    gdata = {
                        govId: state.govId,
                        timeType: timeType,
                        startTime: time[0],
                        endTime: time[1],
                        // "pageParam" : {
                        //     "pageSize" :this.pageSize,
                        //     "pageNum" : this.pageNum
                        // },
                    }
                }
                this.$axios({
                    url: '/statistics/hospital/hospitalStatistics',
                    method: 'POST',
                    data: gdata
                }).then(res => {
                    this.titleData = res.data
                    // this.listTotal = res.data.total
                    console.log(this.listTotal)
                })
            },

            getNewData(radio1) {
                this.value2 = []
                this.pageNum = 1

                this.getHospitalStatistics(radio1)
                this.getHospitalStatisticsList(radio1)

                // this.getGov(this.radio1)
                // this.getLIstData(this.radio1)
                // this.getCrowdData(this.radio1 )
                // this.getAgeData(this.radio1 )
            },

            selectTime(value2) {
                this.radio1 = 5;
                this.pageNum = 1

                this.getHospitalStatistics(this.radio1, value2)

                // this.getGov(this.radio1,value2)
                // this.getLIstData(this.radio1,value2)
                // this.getCrowdData(this.radio1,value2 )
                // this.getAgeData(this.radio1,value2 )
            },

            getHospitalStatisticsList(radio1) {
                let gdata = {
                    pageParam: {
                        pageSize: this.pageSize,
                        pageNum: this.pageNum,
                    },
                    timeType: radio1,
                    govId: state.govId,
                }
                this.$axios({
                    url: '/statistics/hospital/hospitalStatisticsList',
                    method: 'POST',
                    data: gdata,
                }).then(res => {
                    console.log(res.data)
                    this.tableData = res.data.hospitalList
                    this.listTotal = res.data.total
                })
            },


            handleSizeChange(val) {
                this.pageSize = val
                this.pageNum = 1
                this.getNewData(this.radio1, this.value2)
                this.getLIstData(this.radio1, this.value2)
            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.getNewData(this.radio1, this.value2)
                this.getHospitalStatisticsList(this.radio1, this.value2)
            },


            toLink(row) {
                this.$router.push({
                    name: 'hospitalDetail', // 路由的名称
                    params: {
                        orgId: row.orgId,
                    }
                })
                console.log(row.orgId)

            },

            // getNewData(radio1) {
            //     this.value2 = ''
            //     this.pageNum = 1
            //     this.getGov(this.radio1)
            //     this.getLIstData(this.radio1)
            //     this.getCrowdData(this.radio1)
            //     this.getAgeData(this.radio1)
            // },
            // selectTime(value2) {
            //     this.radio1 = 5
            //     this.pageNum = 1
            //     this.getGov(this.radio1, value2)
            //     this.getLIstData(this.radio1, value2)
            //     this.getCrowdData(this.radio1, value2)
            //     this.getAgeData(this.radio1, value2)
            // },
            // getGov(e, timeA) {
            //     let gData = {}
            //     if (timeA) {
            //         gData = {
            //             'govId': getToken('govId'),
            //             'timeType': e,
            //             'startTime': timeA[0],
            //             'endTime': timeA[1]
            //
            //         }
            //     } else {
            //         gData = {
            //             'govId': getToken('govId'),
            //             'timeType': e
            //         }
            //     }
            //     const t = this
            //     getGov(gData).then(response => {
            //         if (response.isFlag) {
            //             this.areaPersonTotal = response.data.areaPersonTotal
            //             this.emphasisCrowdAmount = response.data.emphasisCrowdAmount
            //             this.emphasisPercentage = response.data.emphasisPercentage
            //             this.generalCrowdAmount = response.data.generalCrowdAmount
            //             this.signingAmount = response.data.signingAmount
            //             this.signingPercentage = response.data.signingPercentage
            //         } else {
            //
            //         }
            //     })
            // },
            // getLIstData(e, timeA) {
            //     let gData = {}
            //     if (timeA) {
            //         gData = {
            //             'govId': getToken('govId'),
            //             'timeType': e,
            //             'startTime': timeA[0],
            //             'endTime': timeA[1],
            //             'pageParam': {
            //                 'pageSize': this.pageSize,
            //                 'pageNum': this.pageNum
            //             }
            //         }
            //     } else {
            //         gData = {
            //             'govId': getToken('govId'),
            //             'timeType': e,
            //             'pageParam': {
            //                 'pageSize': this.pageSize,
            //                 'pageNum': this.pageNum
            //             }
            //         }
            //     }
            //
            //     getList(gData).then(response => {
            //         this.listTotal = response.data.total
            //         this.signList = response.data.signList
            //     })
            // },
            // getCrowdData(e, timeA) {
            //     this.crowdFlag = true
            //     this.crowd = {
            //         type: [],
            //         percentage: [],
            //         amount: [],
            //         arr: [],
            //         total: '0'
            //     }
            //     const t = this
            //     let gData = {}
            //     if (timeA) {
            //         gData = {
            //             'areaType': '0',
            //             'areaId': getToken('govId'),
            //             'crowdType': '0',
            //             'timeType': 5,
            //             'startTime': timeA[0],
            //             'endTime': timeA[1]
            //         }
            //     } else {
            //         gData = {
            //             'areaType': '0',
            //             'areaId': getToken('govId'),
            //             'crowdType': '0',
            //             'timeType': e
            //
            //         }
            //     }
            //
            //     getCrowd(gData).then(response => {
            //         if (response.data.total != 0) {
            //             response.data.crowd.forEach(function (e) {
            //                 t.crowd.type.push(e.name)
            //                 t.crowd.percentage.push(e.percentage)
            //                 t.crowd.amount.push(e.amount)
            //                 t.crowd.arr.push({value: e.amount, name: e.name, percentage: e.percentage})
            //             })
            //             t.crowd.total = response.data.total
            //             console.log(t.crowd.total)
            //             this.crowdFlag = false
            //         } else {
            //             this.crowdFlag = true
            //         }
            //     })
            // },
            // getAgeData(e, timeA) {
            //     this.crowd2Flag = true
            //     this.crowd2 = {
            //         type: [],
            //         percentage: [],
            //         amount: [],
            //         arr: [],
            //         total: '0'
            //     }
            //     const t = this
            //     let gData = {}
            //     if (timeA) {
            //         gData = {
            //             'areaType': '0',
            //             'areaId': getToken('govId'),
            //             //            "crowdType" : "0",
            //             'timeType': 5,
            //             'startTime': timeA[0],
            //             'endTime': timeA[1]
            //         }
            //     } else {
            //         gData = {
            //             'areaType': '0',
            //             'areaId': getToken('govId'),
            //             //            "crowdType" : "0",
            //             'timeType': e
            //
            //         }
            //     }
            //
            //     getAgeList(gData).then(response => {
            //         if (response.data.total != 0) {
            //             response.data.ageList.forEach(function (e) {
            //                 t.crowd2.type.push(e.scope)
            //                 t.crowd2.percentage.push(e.percentage)
            //                 t.crowd2.amount.push(e.amount)
            //                 t.crowd2.arr.push({value: e.amount, name: e.scope, percentage: e.percentage})
            //             })
            //             t.crowd2.total = response.data.total
            //             this.crowd2Flag = false
            //         } else {
            //             this.crowd2Flag = true
            //         }
            //     })
            // }
        }
    }
</script>
<style>
  .market_out .el-range-separator {
    width: 10% !important;
  }
</style>
<style lang="scss" scoped>
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
        width: 25%;
        text-align: center;
        padding: 10px 0;
        margin: 10px 0;
        border-right: 1px solid #cfcfcf;

        p {
          padding-top: 10px;
          font-size: 20px;
        }
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
