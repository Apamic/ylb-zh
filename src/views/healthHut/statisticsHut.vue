<template>
    <div class="box">
      <div class="wrap">
        <span class="fl">健康小屋统计</span>
        <div>
          <el-radio-group v-model="radio1" @change="getNewData(radio1)">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">今日</el-radio-button>
            <el-radio-button label="2">本周</el-radio-button>
            <el-radio-button label="3">本月</el-radio-button>
            <el-radio-button label="4">全年</el-radio-button>
          </el-radio-group>
          <el-date-picker
            @change="selectTime"
            class="market_out"
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
      <div class="table-wrap">
        <div class="title">
          <span>预警明细</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            type="index"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="健康小屋"
            >
          </el-table-column>
          <el-table-column
            prop="inspectionAmount"
            label="检测人数"
            sortable
           >
          </el-table-column>
          <el-table-column
            prop="warningAmount"
            label="预警次数"
            sortable
            width="300px"
           >
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination

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
    </div>
</template>

<script>

    import {getToken} from '@/utils/auth'

    const state = {
        token: getToken('token'),
        name: getToken('nickName'),
        avatar: getToken('logo'),
        govId: getToken('govId')
    }

    export default {
        name: "statisticsHut",
        props: {},
        data() {
            return {
                tableData: [],
                listTotal: 0,

                value2: [],
                radio1: '0',
                pageSize: 5,
                pageNum: 1,
            }
        },
        created() {
            this.getStatisticsList('0')
        },

        methods: {
            selectTime(value2) {
                this.radio1 = 5
                this.pageSize = 5
                this.pageNum = 1
                this.getStatisticsList(this.radio1,value2)
            },

            getNewData(radio1) {
                this.value2 = []
                this.pageNum = 1
                this.getStatisticsList(radio1)
            },


            getStatisticsList(timeType,time = []) {
                this.$axios({
                    url: '/healthHouse/house/statisticsList',
                    method: 'POST',
                    data: {
                        pageParam: {
                            pageSize : this.pageSize,
                            pageNum: this.pageNum
                        },
                        govId: state.govId,
                        timeType: timeType,
                        startTime: time[0],
                        endTime: time[1]
                    },
                }).then(res => {
                    this.tableData = res.data.houseInfoList
                    this.listTotal = res.data.total
                })
            },

            handleSizeChange(val) {
                this.pageSize = val
                this.pageNum = 1
                this.getStatisticsList(this.radio1,this.value2)
            },

            handleCurrentChange(val) {
                this.pageNum = val
                this.getStatisticsList(this.radio1,this.value2)
            }

        },

        components: {}
    }
</script>

<style scoped>
  .market_out >>> .el-range-separator {
    width: 10% !important;
  }
</style>


<style scoped lang="scss">
  .box {
    .wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .table-wrap {
      margin-top: 10px;
      padding: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #EBEEF5;
      border-radius: 4px;
      box-sizing: border-box;
      .page {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
  }
</style>
