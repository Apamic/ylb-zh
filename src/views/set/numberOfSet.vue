<template>
    <div class="box">
        <div class="edit">
          <el-button>
            <p>本区域总人数<i class="el-icon-edit" style="margin-left: 20px;"></i></p>
            <p>123234</p>
          </el-button>
        </div>
        <div class="table-wrap">
          <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              prop="orgName"
              label="机构"
              >
            </el-table-column>
            <el-table-column
              prop="crowdAmount"
              label="总人数"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="180"
            >
              <el-button type="primary" @click="dialogFormVisible = true">编辑</el-button>
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

      <el-dialog title="设置人数" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="人数:" :label-width="formLabelWidth" width="60%">
            <el-input v-model="form.number" autocomplete="off" style="width: 60%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
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
        name: "numberOfSet",
        props: {},
        data() {
            return {
                listTotal: '',
                dialogFormVisible: false,
                tableData: [],
                pageSize: 5,
                form: {
                    number: '',
                },
                formLabelWidth: '80px',
                pageNum: 1,
            }
        },
        created() {
          this.getQueryListByGovId()
        },
        methods: {
           getQueryListByGovId() {
               let gdata = {
                   pageParam: {
                       pageSize: this.pageSize,
                       pageNum: this.pageNum
                   },
                   govId: state.govId
               }

              this.$axios({
                  url: '/system/organization/queryListByGovId',
                  method: 'POST',
                  data: gdata
              }).then(res => {
                  console.log(res)
                  this.listTotal = res.data.total
                  this.tableData = res.data.organizationList
              })
           },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }



        },

        components: {}
    }
</script>

<style scoped lang="scss">
    .box {
      .page {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
</style>
