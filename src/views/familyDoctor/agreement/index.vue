<template>
  <el-row class="dashboard-container" style="margin: 30px">
    <el-card   >
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
          prop="serviceTime"
          label="服务时间"
          sortable
        >
        </el-table-column>
        <el-table-column

          prop="doctorName"
          label="执行医生"
        >
        </el-table-column>
        <el-table-column
          prop="serviceName"
          label="服务项目"

        >
        </el-table-column>
        <el-table-column
          prop="serviceMode"
          label="服务方式"

        >
        </el-table-column>
        <el-table-column

          label="操作"
          prop="orgId"
        >
          <template slot-scope="scope">

            <el-button type="primary" size="small"  @click="DialogVisible(scope.row)">查看履约记录</el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="pagination clearfix" style="padding: 20px">
        <el-pagination
          class="fr"
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
    <el-dialog
      title="服务证据"
      :visible.sync="centerDialogVisible"
      width="30%"
      >
      <div style="margin-top: -40px" class="pBox clearfix">
        <div class="plBox">
          <p >服务项目 : </p>
          <span>{{serviceName}}</span>
        </div>
        <div class="plBox">
          <p >服务方式 :</p>
          <span>
           {{serviceMode}}
        </span>
        </div>
        <div class="tBox">
          <p>备注信息:</p>
          <span>{{description}}</span>

        </div>

      </div>

      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
  </span>
    </el-dialog>

  </el-row>


</template>

<script>
  import { getToken} from '@/utils/auth'
  import {getSigningItemList} from '@/api/agreement'
    export default {
        data(){
          return {
            centerDialogVisible: false,
            dialogData:'',
            serviceName:'',
            serviceMode:'',
            description:'',
            userId: this.$route.params.userId,
            tableData:[],
            pageSize:5,
            pageNum:1,
            listTotal:0,
          }

        },
        components: {},
      mounted(){
      this.getSigningItemListData()
      },
        methods: {
          DialogVisible(v){

            this.serviceName=v.serviceName
            this.serviceMode=v.serviceMode
            this.description=v.description
            this.centerDialogVisible=true

          },
          handleSizeChange(val) {
            this.pageSize=val
            this.pageNum=1
            this.getSigningItemListData()
          },
          handleCurrentChange(val) {
            this.pageNum=val
            this.getSigningItemListData()
          },
          getSigningItemListData(){
            getSigningItemList({
                  "pageParam" : {
                    "pageSize" : this.pageSize,
                    "pageNum" : this.pageNum
                  },
                  "userId" :this.userId
                }
              ).then(response => {
//                console.log(response);
                this.listTotal=response.data.total
                this.tableData=response.data.signingItemList

              })
          }
        }
    }
</script>
<style lang="scss" scoped>
.fr{
  float: right;
}
.plBox{
  width: 50%;
  float: left;
  padding: 20px;
}
.tBox{
  width: 100%;
  padding: 20px;
}
.pBox p{
/*padding: 20px;*/
  font-size: 16px;
}
</style>
