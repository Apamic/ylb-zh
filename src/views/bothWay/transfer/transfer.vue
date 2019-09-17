<template>
  <div class="box">
    <div class="title">
      <span>转诊数据</span>
      <div class="market_out">
        <div class="fr" style="margin-right: 20px">
          <el-radio-group v-model="radio1" @change="getNewData">
            <!--            <el-radio-button label="0">全部</el-radio-button>-->
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
    <div class="info">
      <ul>
        <li>
          <span>总转诊数</span>
          <p>{{data.total}}</p>
        </li>
        <li>
          <span>上转数量</span>
          <p>{{data.totalUpRefNum}}</p>
        </li>
        <li>
          <span>下转数量</span>
          <p>{{data.totalDownRefNum}}</p>
        </li>
        <li>
          <span>转诊平均耗时</span>
          <p>{{data.avgRefUseTime}}</p>
        </li>

      </ul>
    </div>
    <div class="table-wrap">
      <div>本区域机构转诊数据</div>
      <el-table
        :data="data.data"
        style="width: 100%"
        empty-text="暂无数据"
        :fit="true"
      >
        <el-table-column
          type="index"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          prop="timeReferral"
          label="转诊时间"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="refTypeName"
          label="转诊方向"
        >
        </el-table-column>
        <el-table-column
          prop="patientName"
          label="患者"

        >
        </el-table-column>
        <el-table-column
          prop="outOrgName"
          label="转出医院"

        >
        </el-table-column>
        <el-table-column
          prop="outDeptName"
          label="转出科室"
        >
        </el-table-column>
        <el-table-column
          prop="applicationDoctorName"
          label="转出医生"
        >
        </el-table-column>
        <el-table-column
          prop="inOrgName"
          label="转入医院"

        >
        </el-table-column>
        <el-table-column
          prop="inDeptName"
          label="转入科室"

        >
        </el-table-column>
        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.refStatus == '1044101'">转诊发起审批中</span>
            <span v-if="scope.row.refStatus == '1044102'">转诊接收审批中</span>
            <span style="color: red;" v-if="scope.row.refStatus == '1044103'">转诊发起审批失败</span>
            <span style="color: #67c23a;" v-if="scope.row.refStatus == '1044104'">转诊成功</span>
            <span style="color: red;" v-if="scope.row.refStatus == '1044105'">转诊接收审批失败</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="refUseTime"
          label="转诊耗时"

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
        name: "transfer",
        data() {
            return {

                titleData: [],

                radio1: '1',

                listTotal: 0,
                pageSize: 10,
                pageNum: 1,

                value2: [],

                data: {}
            }
        },

        created() {
            this.getRecordList()
        },
        methods: {

            getRecordList() {
                this.$axios2({
                    url: 'referral/government/record/list',
                    method: 'post',
                    data: {
                        govId: state.govId,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        timeInterval: this.radio1,
                        timeStart: this.value2[0],
                        timeEnd: this.value2[1]
                    }
                }).then(res => {
                    this.data = res
                    this.listTotal = this.data.total

                })
            },

            selectTime(val) {
                this.value2 = val
                this.radio1 = ''
                this.pageNum = 1
                this.getRecordList()
            },

            getNewData() {
                this.value2 = []
                this.pageNum = 1
                this.getRecordList()
            },

            handleSizeChange(val) {
                this.pageSize=val
                this.pageNum=1
                this.getRecordList()
            },
            handleCurrentChange(val) {
                this.pageNum=val
                this.getRecordList()
            },

        },

        components: {}
    }
</script>

<style scoped>
  .market_out .el-range-separator {
    width: 10% !important;
  }
</style>

<style lang="scss">
  .box {
    .title {
      display: flex;
      justify-content: space-between;

      div {
        display: flex;
      }
    }
    .info {
      margin-top: 10px;
      border: 1px solid #EBEEF5;
      background-color: #FFF;
      color: #303133;
      transition: .3s;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;

      ul {
        display: flex;
        font-size: 20px;

        li {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
          margin: 10px 0;
          border-right: 1px solid #cfcfcf;

          &:last-child {
            border-right: none;
          }
        }
      }
    }
    .table-wrap {
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #EBEEF5;
      background-color: #FFF;
      color: #303133;
      transition: .3s;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      .page {
        display: flex;
        justify-content: flex-end;
        padding: 20px 20px 0 20px;
      }
    }
  }
</style>
