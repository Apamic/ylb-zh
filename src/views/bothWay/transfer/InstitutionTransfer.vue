<template>
  <div class="box">
    <div class="title">
      <span>转诊统计</span>
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
    <div class="table-wrap">
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
          prop="orgGradeName"
          label="类型"
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
        <el-table-column

          label="操作"
          prop="orgId"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small"  @click="$router.push({path: '/statistics/detail',query: {orgId: scope.row.orgId}})" >详细</el-button>
          </template>
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
        name: "InstitutionTransfer",
        data() {
            return {
                radio1: '1',

                listTotal: 0,
                pageSize: 5,
                pageNum: 1,

                value2: [],

                tableData: [],
            }
        },

        created() {
            this.getGovernmentOrg()
        },
        methods: {

            getGovernmentOrg() {
                this.$axios2({
                    url: 'referral/government/org',
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
                    this.tableData = res.data
                    this.listTotal = res.total
                })
            },

            selectTime(val) {
                this.value2 = val
                this.radio1 = ''
                this.pageNum = 1
                this.getGovernmentOrg()
            },

            handleSizeChange(val) {
                this.pageSize=val
                this.pageNum=1
                this.getGovernmentOrg()
            },
            handleCurrentChange(val) {
                this.pageNum=val
                this.getGovernmentOrg()
            },

            getNewData(val) {
                this.radio1 = val
                this.value2 = []
                this.pageNum = 1
                this.getGovernmentOrg()
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

<style scoped lang="scss">
  .box {
    .title {
      display: flex;
      justify-content: space-between;

      div {
        display: flex;
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
