<template>
  <el-row class="panel-group">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>双向转诊看板</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push('/bothWay/index')">查看更多</el-button>
      </div>
      <div class="text">
        <div class="el-row">
          <el-col :xs="6" :sm="6" :lg="6">
            <div>
              <p>转诊数量(上转)</p>
              <p class="num">8,846</p>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6">
           <div>
             <p>转诊数量(下转)</p>
             <p class="num">8,846</p>
           </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6">
            <div>
              <p>总转诊数量</p>
              <p class="num">8,846</p>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6">
            <div>
              <p>转诊平均耗时</p>
              <p class="num">8,846</p>
            </div>
          </el-col>
        </div>
          <div class="text-table">
          <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              prop="date"
              label="转诊时间"

              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="转诊方向"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="患者"
              :formatter="formatter">
            </el-table-column>
            <el-table-column
              prop="address"
              label="转出医院"
              :formatter="formatter">
            </el-table-column>
            <el-table-column
              prop="address"
              label="转入医院"
              :formatter="formatter">
            </el-table-column>
            <el-table-column
              prop="address"
              label="转入科室"
              :formatter="formatter">
            </el-table-column>
            <el-table-column
              prop="address"
              label="状态"
              :formatter="formatter">
            </el-table-column>
            <el-table-column
              prop="address"
              label="转诊耗时"
              :formatter="formatter">
            </el-table-column>
          </el-table>
          </div>
          <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="10">
          </el-pagination>
        </div>
      </div>
    </el-card>

  </el-row>


</template>

<script>

  export default {
    data(){
      return{
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentPage4: 1
      }
    },
    components: {

    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }

    }
  }
</script>
<style lang="scss" scoped>
  .pagination{
    margin-top: 10px;
    text-align: right;
  }
  p{
    margin: 0;
    padding: 0;
  }
  .text {
    .el-col{
      div{
        margin: 0 20px;
        height: 100px;
        background: url("../../../assets/bothway1.png")  no-repeat bottom;
        background-size:100% 50%;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.427450980392157);
        .num{
           margin-top: 5px;
          font-size: 24px;
          color: #000;
        }
      }

    }
  }
</style>
