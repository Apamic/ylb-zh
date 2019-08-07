<template>


  <div class="text-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
      empty-text="暂无数据"
      :fit="true"
    >
      <el-table-column
        prop="clientName"
        label="签约人"
      >
        <template slot-scope="scope">
          <p>
            <span style="width: 110px;display: inline-block">{{scope.row.clientName}}({{scope.row.clientAge}}岁)</span>
            <span v-for='i in scope.row.personTypeList' :class="i=='一般人群'?'border':'border red'">{{i}}</span>
          </p>
          <p>{{scope.row.clientIdc}}</p>
          <!--<el-progress :percentage="70" />-->
          <!--<el-progress :percentage="100" status="success" />-->
          <!--<el-progress :percentage="0"   />-->
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="联系方式"
      >
        <template slot-scope="scope">
          <p>
            {{scope.row.linkTel}}
          </p>
          <p>{{scope.row.linkAddress}} </p>

        </template>
      </el-table-column>
      <el-table-column
        prop="resiterUserName"
        label="登记医生"
        :formatter="formatter">
      </el-table-column>
      <el-table-column
        prop="timeStart"
        label="合同时间"
        :formatter="formatter">
        <template slot-scope="scope">
          <p>
            合同开始时间
          </p>
          <p>{{scope.row.timeStart}}</p>
        </template>
      </el-table-column>
      <el-table-column

        label="进度条"

        :formatter="formatter">
        <template slot-scope="scope">
          <!--<p>{{scope.row.clientIdc}}</p>-->
          <el-progress :percentage="scope.row.completePercentage" :color="scope.row.completePercentage>'99'?'#13ce66':''"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        width="120px"
        :formatter="formatter">
        <template slot-scope="scope">

          <el-button type="primary" size="small"  @click="handleDelete(scope.$index, scope.row)" >履约详细</el-button>

          <!--</router-link>-->
        </template>
      </el-table-column>

    </el-table>
  </div>


</template>

<script>

  export default {
    props: {
      tableData: {
        type: Array
      },
      orgId:{
        type:String
      }
    },
    data() {
      return {

        currentPage4: 1
      }
    },
    components: {},
    methods: {
      handleDelete(e,v){

        console.log(v.userId);
        this.$router.push({
          name: 'agreement',  // 路由的名称
          params: {
            userId:v.userId
          }
        })
      },
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


  .border {
    padding: 3px;
    margin-left: 5px;
    border: 1px solid #cfcfcf;
    font-size: 12px;
    border-radius: 5px;
    color: #cfcfcf;
  }

  .red {
    color: red;
    border: 1px solid red;
  }

  .pagination {
    margin-top: 10px;
    text-align: right;
  }

  p {
    margin: 0;
    padding: 0;
  }

</style>
