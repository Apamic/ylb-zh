<template>
    <div class="box">
        <div>
          <el-button type="primary" @click="dialogFormVisible = true">+新建</el-button>
        </div>
        <div class="table-wrap">
          <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              prop="user"
              label="账号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
             >
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              width="80">
            </el-table-column>
            <el-table-column
              prop="create"
              label="创建时间"
              sortable
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="120"
            >
            <el-button type="danger" >删除</el-button>
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


      <el-dialog :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="账号:" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码:" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态:" :label-width="formLabelWidth">
            <el-radio v-model="form.radio" label="1">正常</el-radio>
            <el-radio v-model="form.radio" label="2">禁用</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false" :loading="true">提交</el-button>
          <el-button @click="dialogFormVisible = false">保存</el-button>
          <el-button type="danger" @click="dialogFormVisible = false">删除</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "accountManagement",
        props: {},
        data() {
            return {
              tableData: [
                {
                  user: '1',
                  name: '健康小屋葛光小区服务站',
                  state: '123',
                  create: '121',
                },
                {
                  user: '1',
                  name: '健康小屋葛光小区服务站',
                  state: '123',
                  create: '121',
                },
                {
                  user: '1',
                  name: '健康小屋葛光小区服务站',
                  state: '123',
                  create: '121',
                }
              ],
              listTotal: 100,
              form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                radio: '1'
              },

              dialogFormVisible: false,

              formLabelWidth: '80px'
            }
        },
        created() {

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
