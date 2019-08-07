<template>


  <div class="text-table">
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
        label="本区域总人数"
        sortable
         >
      </el-table-column>
      <el-table-column
        prop="signingAmount"
        label="已签约总数量"
        sortable
         >
      </el-table-column>
      <el-table-column
        prop="signingPercentage"
        label="签约率"
        :formatter="formatter"
        sortable
         >
      </el-table-column>
      <el-table-column
        prop="teamAmount"
        label="新增团队数"
        sortable
         >
      </el-table-column>
      <el-table-column
        prop="generalAmount"
        label="一般人群签约"
        sortable
         >
      </el-table-column>
      <el-table-column
        prop="emphasisAmount"
        label="重点人群签约"
        sortable
         >
      </el-table-column>
      <el-table-column
        prop="currentSigningAmount"
        label="当前时间合计"
        sortable
         >
      </el-table-column>
      <el-table-column

        label="操作"
        prop="orgId"
      >
        <template slot-scope="scope">

            <el-button type="primary" size="small"  @click="handleDelete(scope.$index, scope.row)" >查看详细</el-button>


        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>

  export default {
    watch: {
      signList: function(val) {
        this.tableData = val
      }
    },
    props:{
      signList:{
        type:Array
      },
    },
      data(){
      return{
        tableData: this.signList,
        currentPage4: 1
      }
    },
    components: {

    },
    methods: {
      handleDelete(e,v){
//          console.log(e);
        console.log(v);
        this.$router.push({
          name: 'communityInfo',  // 路由的名称
          params: {
            orgId:v.orgId
          }
        })
      },
//      handleClick(row) {
//        this.$router.push({
//          path: '/familyDoctor/index/community'
//        })
//      },
      formatter(row, column) {
        return row.signingPercentage+'%';
      },
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
        margin-left: 80px;
        margin-right: 80px;
        height: 100px;
        background: url("../../../assets/bothway1.png")  no-repeat bottom ;
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
