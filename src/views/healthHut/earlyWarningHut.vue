<template>
  <div class="box">
    <div class="wrap">
      <span class="fl">健康小屋预警</span>
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
    <div class="state">
      <ul>
        <li>
          <span>预警总数</span>
          <p>{{statistics.warningTotal}}</p>
        </li>
        <li>
          <span>未处理预警</span>
          <p>{{statistics.noWarningAmount}}</p>
        </li>
        <li>
          <span>预警处理平均响应时间</span>
          <p>{{statistics.averageTime}}</p>
        </li>
      </ul>
    </div>
    <div class="table-wrap">
      <div class="title">
        <span class="fl">预警明细</span>
        <el-radio-group v-model="radio2" @change="getType(radio2)">
          <el-radio-button label="0">全部</el-radio-button>
          <el-radio-button label="1">未处理</el-radio-button>
          <el-radio-button label="2">处理中</el-radio-button>
          <el-radio-button label="3">以处理</el-radio-button>
        </el-radio-group>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="预警时间"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="houseName"
          label="预警健康小屋"
         >
        </el-table-column>
        <el-table-column
          prop="level"
          label="预警级别"
         >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="content"
          label="预警内容"
          >
        </el-table-column>
        <el-table-column
          prop="processingUserName"
          label="预警处理人"
         >
        </el-table-column>
        <el-table-column
          label="处理状态"
        >
          <template slot-scope="scope">
            <span style="color: red" v-if="scope.row.status == 1">未处理</span>
            <span style="color: #36a3f7;" v-if="scope.row.status == 2" >处理中</span>
            <span style="color: #00CC33;" v-if="scope.row.status == 3">以处理</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="processTime"
          label="响应时间"
          sortable
        >
        </el-table-column>
<!--        <el-table-column label="操作"-->
<!--        width="100">-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            @click="dialogVisible = true">查看-->
<!--          </el-button>-->
<!--        </el-table-column>-->
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

    <el-dialog
      title="服务证据"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <!--          <span slot="footer" class="dialog-footer">-->
      <!--            <el-button @click="dialogVisible = false">取 消</el-button>-->
      <!--            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--          </span>-->
    </el-dialog>

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
        name: "earlyWarningHut",
        props: {},
        data() {
            return {
                tableData: [],

                statistics: {},


                dialogVisible: false,

                radio1: '0',
                radio2: '0',

                value2: [],

                pageSize: 5,
                pageNum: 1,
                listTotal: 0,

            }
        },
        created() {
            this.getWarningStatistics('0')
            this.getStatisticsList('0','0')
        },

        methods: {
            handleClose(done) {
                this.dialogVisible = false
            },

            selectTime(value2) {
                this.radio1 = 5
                this.pageNum = 1
                this.getWarningStatistics(this.radio1,value2)
                this.getStatisticsList(this.radio1,this.radio2,value2)
            },

            getStatisticsList(timeType,status,tiem = []) {
                this.$axios({
                    url: '/healthHouse/house/warningList',
                    method: 'POST',
                    data: {
                        pageParam: {
                            pageSize : this.pageSize,
                            pageNum: this.pageNum
                        },
                        govId: state.govId,
                        status: status,
                        timeType: timeType,
                        startTime: tiem[0],
                        endTime: tiem[1]
                    },
                }).then(res => {
                    console.log(res)
                    this.tableData = res.data.warningDetailsList
                    this.listTotal = res.data.total
                })
            },

            getType(type) {
                this.pageNum = 1
                this.getStatisticsList(this.radio1,type,this.value2)
            },

            getNewData(timeType) {
                this.getWarningStatistics(timeType)
                this.getStatisticsList(timeType,this.radio2,this.value)
            },

            getWarningStatistics(timeType,time = []) {
                this.$axios({
                    url: '/healthHouse/house/warningStatistics',
                    method: 'POST',
                    data: {
                        govId: state.govId,
                        timeType : timeType,
                        startTime: time[0],
                        endTime: time[1]
                    },
                }).then(res => {
                    // console.log(res)
                    this.statistics = res.data.statisticsInfo
                })
            },


            handleSizeChange(val) {
                this.pageSize = val
                this.pageNum = 1
                this.getStatisticsList(this.radio1.this.radio2,this.value2)
            },

            handleCurrentChange(val) {
                this.pageNum = val
                this.getStatisticsList(this.radio1.this.radio2,this.value2)
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
    width: 100%;

    .wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .state {
      margin: 10px 0 20px;
      /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
      border: 1px solid #EBEEF5;
      border-radius: 4px;

      ul {
        display: flex;

        li {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0;
          height: 50px;
          color: #303133;
          font-size: 20px;
          border-left: 1px solid #cfcfcf;

          &:nth-child(1) {
            border-left: none;
          }
        }
      }
    }

    .table-wrap {
      padding: 10px;
      /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
      border: 1px solid #EBEEF5;
      border-radius: 4px;
      /*box-sizing: border-box;*/
      .title {
        display: flex;
        justify-content: space-between;
      }

      .page {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
  }
</style>
