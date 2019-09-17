<template>
  <div class="dashboard-container market_out">
    <div style="width: 100%">
      <div class="family-head clearfix">
        <span class="fl">转诊统计</span>
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
          <el-radio-group v-model="radio1" @change="getNewData">
            <!--            <el-radio-button label="0">全部</el-radio-button>-->
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
        <span>科室转诊明细统计</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        empty-text="暂无数据"
        :fit="true"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80px"
        >
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="科室"
        >
        </el-table-column>

        <el-table-column
          prop="outUpNum"
          label="转出(上转)次数"

        >
        </el-table-column>
        <el-table-column
          prop="outDownNum"
          label="转出(下转)次数"
        >
        </el-table-column>
        <el-table-column
          prop="inUpNum"
          label="转出(上转)次数"

        >
        </el-table-column>
        <el-table-column
          prop="inDownNum"
          label="转出(下转)次数"
        >
        </el-table-column>


      </el-table>

      <div class="pagination fr" style="padding: 20px">
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


    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>医生转诊明细统计</span>
      </div>
      <el-table
        :data="drData"
        style="width: 100%"
        empty-text="暂无数据"
        :fit="true"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80px"
        >
        </el-table-column>
        <el-table-column
          prop="drName"
          label="医生"
        >
        </el-table-column>

        <el-table-column
          prop="outUpNum"
          label="转出(上转)次数"

        >
        </el-table-column>
        <el-table-column
          prop="outDownNum"
          label="转出(下转)次数"

        >
        </el-table-column>
        <el-table-column
          prop="inUpNum"
          label="转出(上转)次数"

        >
        </el-table-column>
        <el-table-column
          prop="inDownNum"
          label="转出(下转)次数"

        >
        </el-table-column>

      </el-table>

      <div class="pagination fr" style="padding: 20px">
        <el-pagination
          @size-change="drHandleSizeChange"
          @current-change="drHandleCurrentChange"
          :current-page="drPageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="drPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>


    </el-card>


  </div>

</template>

<script>

    import {getAgeList, getGenderList, getCrowd} from '@/api/charts'
    import {getToken} from '@/utils/auth'

    export default {
        components: {},
        data() {
            return {
                tableData: [],

                radio1: '1',


                value2: [],

                listTotal: 0,
                pageSize: 5,
                pageNum: 1,

                total: 0,
                drPageSize: 5,
                drPageNum: 1,

                drData: [],
                orgId: '',
            };
        },
        created() {
            this.orgId = this.$route.query.orgId
            this.getGovernmentDept()
            this.getGovernmentDoctor()
        },
        methods: {

            getGovernmentDept() {
                this.$axios2({
                    url: 'referral/government/dept',
                    method: 'post',
                    data: {
                        orgId: this.orgId,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        timeInterval: this.radio1,
                        timeStart: this.value2[0],
                        timeEnd: this.value2[1]
                    }
                }).then(res => {
                    this.tableData = res.data
                    this.listTotal = res.total
                })
            },

            getGovernmentDoctor() {
                this.$axios2({
                    url: 'referral/government/doctor',
                    method: 'post',
                    data: {
                        orgId: this.orgId,
                        pageNum: this.drPageNum,
                        pageSize: this.drPageSize,
                        timeInterval: this.radio1,
                        timeStart: this.value2[0],
                        timeEnd: this.value2[1]
                    }
                }).then(res => {
                    this.drData = res.data
                    this.total = res.total
                })
            },

            drHandleSizeChange(val) {
                this.drPageSize = val
                this.drPageNum = 1
                this.getGovernmentDoctor()
            },

            drHandleCurrentChange(val) {
                this.drPageNum = val
                this.getGovernmentDoctor()
            },

            handleSizeChange(val) {
                this.pageSize = val
                this.pageNum = 1
                this.getGovernmentDept()
            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.getGovernmentDept()
            },
            getNewData(val) {
                this.value2 = []
                this.pageNum = 1
                this.radio1 = val
                this.getGovernmentDept()
                this.getGovernmentDoctor()
            },
            selectTime(val) {
                this.value2 = val
                this.radio1 = ''
                this.pageNum = 1
                this.getGovernmentDept()
                this.getGovernmentDoctor()
            },

        },
    };
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
        padding-top: 10px;
        margin-top: 10px;
        border-right: 1px solid #cfcfcf;

        p {
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
