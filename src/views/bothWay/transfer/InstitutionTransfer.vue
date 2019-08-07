<template>
  <div class="box">
    <div class="title">
      <span>转诊统计</span>
      <div class="market_out">
        <div class="fr" style="margin-right: 20px">
          <el-radio-group v-model="radio1" @change="getNewData(radio1)">
            <el-radio-button label="0">全部</el-radio-button>
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
          prop="orgTypeName"
          label="类型"
        >
        </el-table-column>
        <el-table-column
          prop="crowdTotal"
          label="转出(上转)次数"

        >
        </el-table-column>
        <el-table-column
          prop="signingAmount"
          label="转出(下转)次数"

        >
        </el-table-column>
        <el-table-column
          prop="crowdTotal"
          label="转出(上转)次数"

        >
        </el-table-column>
        <el-table-column
          prop="signingAmount"
          label="转出(下转)次数"

        >
        </el-table-column>
        <el-table-column

          label="操作"
          prop="orgId"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small"  @click="handleDelete(scope.$index, scope.row)" >详细</el-button>
          </template>
        </el-table-column>

      </el-table>

      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
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
    export default {
        name: "InstitutionTransfer",
        data() {
            return {
                radio1: '0',
                currentPage: 1,

                listTotal: 0,
                pageSize: 5,
                pageNum: 1,

                value2: '',
            }
        },

        created() {

        },
        methods: {
            handleSizeChange(val) {
                this.pageSize=val
                this.pageNum=1
                // this.getGov(this.radio1,this.value2)
                // this.getLIstData(this.radio1,this.value2)
            },
            handleCurrentChange(val) {
                this.pageNum=val
                // this.getGov(this.radio1,this.value2)
                // this.getLIstData(this.radio1,this.value2)

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
