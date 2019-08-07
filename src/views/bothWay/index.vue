<template>
  <div style="margin: 30px ;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="转诊数据" name="first"><transfer></transfer></el-tab-pane>
      <el-tab-pane label="转诊统计" name="second"><InstitutionTransfer></InstitutionTransfer></el-tab-pane>
    </el-tabs>

<!--    <div style="width: 100%">-->



<!--      <div class="family-head clearfix">-->
<!--        <span class="fl">转诊统计</span>-->
<!--        <el-button type="primary" size="small" @click="toLink()">-->
<!--          跳转转诊统计-->
<!--        </el-button>-->
<!--        <el-date-picker-->
<!--          @change="selectTime"-->
<!--          class="fr"-->
<!--          v-model="value2"-->
<!--          type="daterange"-->
<!--          align="right"-->
<!--          unlink-panels-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--          value-format="yyyy-MM-dd"-->
<!--        >-->
<!--        </el-date-picker>-->
<!--        <div class="fr" style="margin-right: 20px">-->
<!--          <el-radio-group v-model="radio1" @change="getNewData(radio1)">-->
<!--            <el-radio-button label="0">全部</el-radio-button>-->
<!--            <el-radio-button label="1">今日</el-radio-button>-->
<!--            <el-radio-button label="2">本周</el-radio-button>-->
<!--            <el-radio-button label="3">本月</el-radio-button>-->
<!--            <el-radio-button label="4">全年</el-radio-button>-->
<!--          </el-radio-group>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="listView" v-cloak>-->
<!--      <ul class="clearfix">-->
<!--        <li>-->
<!--          <span>总转诊数</span>-->
<!--          <p>{{titleData.oneLevelAmount}}</p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <span>上转数量</span>-->
<!--          <p>{{titleData.twoLevelAmount}}</p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <span>下转数量</span>-->
<!--          <p>{{titleData.threeLevelAmount}}</p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <span>转诊平均耗时</span>-->
<!--          <p>{{titleData.officialDoctorAmount}}</p>-->
<!--        </li>-->

<!--      </ul>-->
<!--    </div>-->
<!--    <el-card class="box-card" style="margin-top: 20px">-->
<!--      <div slot="header" class="clearfix">-->
<!--        <span>本区域机构转诊数据</span>-->

<!--      </div>-->
<!--      <el-table-->
<!--        :data="tableData"-->
<!--        style="width: 100%"-->
<!--        :default-sort="{prop: 'date', order: 'descending'}"-->
<!--        empty-text="暂无数据"-->
<!--        :fit="true"-->
<!--      >-->
<!--        <el-table-column-->
<!--          type="index"-->
<!--          label="序号"-->
<!--        >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="orgName"-->
<!--          label="转诊时间"-->
<!--          sortable-->
<!--        >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="orgTypeName"-->
<!--          label="转诊反向"-->
<!--        >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="crowdTotal"-->
<!--          label="患者"-->

<!--        >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="signingAmount"-->
<!--          label="转出医院"-->

<!--        >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="signingPercentage"-->
<!--          label="转出科室"-->
<!--        >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="teamAmount"-->
<!--          label="转入医院"-->

<!--        >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="generalAmount"-->
<!--          label="转入科室"-->

<!--        >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="emphasisAmount"-->
<!--          label="状态"-->

<!--        >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="emphasisAmount"-->
<!--          label="转诊耗时"-->

<!--        >-->
<!--        </el-table-column>-->

<!--      </el-table>-->

<!--      <div class="pagination fr" style="padding: 20px">-->
<!--        <el-pagination-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :current-page="currentPage"-->
<!--          :page-sizes="[5, 10, 15, 20]"-->
<!--          :page-size="pageSize"-->
<!--          layout="total, sizes, prev, pager, next, jumper"-->
<!--          :total="listTotal">-->
<!--        </el-pagination>-->
<!--      </div>-->


<!--    </el-card>-->


  </div>

</template>

<script>
    import {getToken} from '@/utils/auth'

    import InstitutionTransfer from '@/views/bothWay/transfer/InstitutionTransfer.vue'
    import transfer from '@/views/bothWay/transfer/transfer'



    const state = {
        token: getToken('token'),
        name: getToken('nickName'),
        avatar: getToken('logo'),
        govId: getToken('govId')
    }


    export default {
        components: {
            InstitutionTransfer,
            transfer
        },

        created() {
            this.getHospitalStatistics('0')
            this.getHospitalStatisticsList('0')
        },
        mounted() {
//      this.getGov(0);
//      this.getLIstData(0)
//      this.getCrowdData("0")
//      this.getAgeData("0")


        },
        methods: {

            getHospitalStatistics(timeType, time) {
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
                    console.log(this.titleData)
                })
            },

            getNewData(radio1) {
                this.value2 = ''
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
                })
            },


            toLink() {
                this.$router.push({
                    name: 'bothWayStatistics',  // 路由的名称
                    params: {
                        orgId: "111"
                    }
                })
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.pageNum = 1
                this.getGov(this.radio1, this.value2)
                this.getLIstData(this.radio1, this.value2)
            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.getGov(this.radio1, this.value2)
                this.getLIstData(this.radio1, this.value2)

            },

        },
        data() {
            return {

                titleData: [],

                tableData: [],

                activeName: 'first',


                crowdFlag: true,
                crowd: {
                    type: [],
                    percentage: [],
                    amount: [],
                    arr: [],
                    total: "0"
                },
                crowd2Flag: true,
                crowd2: {
                    type: [],
                    percentage: [],
                    amount: [],
                    arr: [],
                    total: "0"
                },
                signList: [],
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
                areaPersonTotal: 0,
                emphasisCrowdAmount: 0,
                emphasisPercentage: 0,
                generalCrowdAmount: 0,
                signingAmount: 0,
                signingPercentage: 0,
                listTotal: 0,
                pageSize: 5,
                pageNum: 1,
            };
        }
    };
</script>
<style>
  .market_out .el-range-separator {
    width: 10% !important;
  }
</style>
