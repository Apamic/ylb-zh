<template>
  <div class="box">
    <div>
      <div>
        <el-button type="primary" @click="onShow">+添加</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          label="序号"
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="预警项目"
        >
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="项目类型">
        </el-table-column>
        <el-table-column
          prop="levelName"
          label="预警级别"
        >
        </el-table-column>
        <el-table-column
          prop="suggest"
          label="预警建议"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="onDeit(scope)">编辑</el-button>
            <el-button type="danger" @click="onDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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


    <el-dialog :visible.sync="dialogFormVisible" width="80%">
      <div class="flex">
        <div>
          <h3>基本信息</h3>
          <div style="padding: 20px;">
            <el-form :model="form">
              <el-form-item label="预警项目" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="项目类型" :label-width="formLabelWidth">
                <el-select v-model="form.categoryName" placeholder="请选择" style="width: 40%">
                  <el-option
                    v-for="(item,index) in warningType"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预警级别" :label-width="formLabelWidth">
                <el-select v-model="form.levelName" placeholder="请选择" style="width: 40%">
                  <el-option
                    v-for="(item,index) in warningLevel"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预警建议" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.suggest"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div>
          <h3>触发规则<span>可在编辑框中直接输入值，同项目类型的触发规则按照最高级别为准</span></h3>
          <table cellspacing="0" cellpadding="0">
            <tr>
              <th>年龄</th>
              <th>男</th>
              <th>女</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) in ruleList">
              <td>
                <input v-model="item.age" required></input>
              </td>
              <td>
                <input v-model="item.minMaleScope" required></input>
                -
                <input v-model="item.maxMaleScope" required></input>
              </td>
              <td>
                <input v-model="item.minFemaleScope" required></input>
                -
                <input v-model="item.maxFemaleScope" required></input>
              </td>
              <td>
                <el-button type="danger" @click="deleteRule(index)">删除</el-button>
              </td>
            </tr>
            <tr>
              <td>
                <input v-model="rule.age"></input>
              </td>
              <td>
                <input v-model="rule.minMaleScope"></input>
                -
                <input v-model="rule.maxMaleScope"></input>
              </td>
              <td>
                <input v-model="rule.minFemaleScope"></input>
                -
                <input v-model="rule.maxFemaleScope"></input>
              </td>
              <td>
                <el-button type="primary" @click="addRule()">新增</el-button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!add" type="primary" @click="onUpdate()" :loading="lupdate">提交</el-button>
        <el-button v-if="add" @click="onSave()" :loading="lsave">保存</el-button>
        <!--        <el-button type="danger" @click="onDelete()" :loading="ldelete" >删除</el-button>-->
        <el-button @click="onCancel()">取消</el-button>
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
        name: "earlyWarning",
        props: {},
        data() {
            return {
                tableData: [],

                listTotal: 0,

                disabled: false,

                dialogFormVisible: false,

                form: {
                    warningProjectId: '',
                    name: '',
                    categoryId: '',
                    categoryName: '',
                    levelName: '',
                    levelId: '',
                    suggest: '',
                },

                ruleList: [],

                rule: {
                    age: '',
                    minMaleScope: '',
                    maxMaleScope: '',
                    minFemaleScope: '',
                    maxFemaleScope: '',
                },

                formLabelWidth: '80px',

                pageSize: 5,
                pageNum: 1,

                warningType: [],
                warningLevel: [],

                warningProject: {},

                lupdate: false,
                ldelete: false,
                lsave: false,

                add: false,

            }
        },
        created() {
            this.getList()
            this.getQueryByParentCodeList()
        },
        methods: {
            getList() {
                let gdata = {
                    pageParam: {
                        pageSize: this.pageSize,
                        pageNum: this.pageNum
                    },
                    govId: state.govId
                }
                this.$axios({
                    url: '/healthHouse/warningProject/list',
                    method: 'POST',
                    data: gdata,
                }).then(res => {
                    // console.log(res)
                    this.tableData = res.data.warningProjectList
                    this.listTotal = res.data.total
                })
            },

            reset() {
                this.ruleList = []
                this.rule = {
                    age: '',
                    maleScope: '',
                    femaleScope: '',
                }
                this.form = {
                    warningProjectId: '',
                    name: '',
                    categoryId: '',
                    categoryName: '',
                    levelName: '',
                    levelId: '',
                    suggest: '',
                }
            },


            onShow() {
                this.dialogFormVisible = true
                this.add = true
                this.reset()
            },

            onDeit(item) {

                this.add = false

                this.dialogFormVisible = true

                this.$axios({
                    url: '/healthHouse/warningProject/query',
                    method: 'POST',
                    data: {
                        warningProject: {
                            warningProjectId: item.row.warningProjectId,
                        }
                    },
                }).then(res => {
                    let levelName
                    let categoryName


                    this.warningType.forEach(item => {
                        if (item.dictId == res.data.warningProject.categoryId) {
                            categoryName = item.name
                        }
                    })

                    this.warningLevel.forEach(item => {
                        if (item.dictId == res.data.warningProject.levelId) {
                            levelName = item.name
                        }
                    })

                    this.form = {
                        warningProjectId: res.data.warningProject.warningProjectId,
                        name: res.data.warningProject.name,
                        levelName: levelName,
                        levelId: res.data.warningProject.levelId,
                        categoryName: categoryName,
                        categoryId: res.data.warningProject.categoryId,
                        suggest: res.data.warningProject.suggest,
                    }

                    console.log(this.form)
                    this.ruleList = res.data.warningProject.warningRuleList


                    // let categoryId
                    // let levelId
                    //
                    // this.warningType.forEach(item => {
                    //     if (item.name == this.form.categoryName) {
                    //         categoryId = item.dictId
                    //     }
                    // })
                    //
                    // this.warningLevel.forEach(item => {
                    //     if (item.name == this.form.levelName) {
                    //         levelId = item.dictId
                    //     }
                    // })
                    //
                    // this.warningProject = {
                    //     warningProjectId: this.form.warningProjectId,
                    //     name: this.form.name,
                    //     categoryId: categoryId,
                    //     levelId: levelId,
                    //     suggest: this.form.suggest
                    // }


                })
            },

            getQueryByParentCodeList() {
                let gdata = {
                    codeList: ["HOUSEWARNPROJECTTYPE", "HOUSEWARNLEVEL"]
                }
                this.$axios({
                    url: '/system/dictionary/queryByParentCodeList',
                    method: 'POST',
                    data: gdata,
                }).then(res => {
                    this.warningType = res.data.dictionaryList[0].children
                    this.warningLevel = res.data.dictionaryList[1].children
                    console.log(this.warningType)
                })
            },

            handleCurrentChange(val) {
                this.pageNum = val
                this.getList()
            },

            handleSizeChange(val) {
                this.pageSize = val
                this.pageNum = 1
                this.getList()
            },

            addRule() {
                this.ruleList.push(this.rule)
                this.rule = {
                    age: '',
                    maleScope: '',
                    femaleScope: '',
                }
            },

            deleteRule(index) {
                this.ruleList.splice(index, 1)
            },

            onUpdate() {

                let categoryId
                let levelId

                this.warningType.forEach(item => {
                    if (item.name == this.form.categoryName) {
                        categoryId = item.dictId
                    }
                })

                this.warningLevel.forEach(item => {
                    if (item.name == this.form.levelName) {
                        levelId = item.dictId
                    }
                })

                this.warningProject = {
                    warningProjectId: this.form.warningProjectId,
                    name: this.form.name,
                    categoryId: categoryId,
                    levelId: levelId,
                    suggest: this.form.suggest,
                    govId: state.govId
                }

                this.lupdate = true
                this.$axios({
                    url: '/healthHouse/warningProject/update',
                    method: 'POST',
                    data: {
                        warningProject: this.warningProject,
                        warningRuleList: this.ruleList
                    },
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: res.rtnMsg
                    })
                    this.dialogFormVisible = false
                }).finally(() => {
                    this.lupdate = false
                })
            },

            onDelete(item) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ldelete = true
                    this.$axios({
                        url: '/healthHouse/warningProject/delete',
                        method: 'POST',
                        data: {
                            warningProject: {
                                warningProjectId: item.row.warningProjectId
                            }
                        },
                    }).then(res => {
                        this.getList()
                        this.$message({
                            type: 'success',
                            message: res.rtnMsg
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                }).finally(() => {
                    this.ldelete = false
                })
            },

            onSave() {
                this.lsave = true
                this.warningProject.govId = state.govId

                let categoryId;
                let levelId;


                this.warningType.forEach(item => {
                    if (item.name == this.form.categoryName) {
                        categoryId = item.dictId
                    }
                })

                this.warningLevel.forEach(item => {
                    if (item.name == this.form.levelName) {
                        levelId = item.dictId
                        console.log(levelId)
                    }
                })


                this.$axios({
                    url: '/healthHouse/warningProject/save',
                    method: 'POST',
                    data: {
                        warningProject: {
                            warningProjectId: this.form.warningProjectId,
                            name: this.form.name,
                            categoryId: categoryId,
                            levelId: levelId,
                            suggest: this.form.suggest,
                            govId: state.govId,
                        },
                        warningRuleList: this.ruleList,
                    },
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: res.rtnMsg
                    })
                    this.getList()
                    this.dialogFormVisible = false

                }).finally(() => {
                    this.lsave = false
                })
            },

            onCancel() {
                // this.warningProject = {
                //     warningProjectId: this.form.warningProjectId,
                //     name: this.form.name,
                //     categoryId: categoryId,
                //     levelId: levelId,
                //     suggest: this.form.suggest
                // }
                this.dialogFormVisible = false
            },

        },

        components: {}
    }
</script>

<style scoped>

  table {
    margin-top: 10px;
    width: 500px;
  }

  input {
    text-align: center;
    background: #ffffff;
    border: 0;
    width: 70px;
  }

  td, th {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }

  table, td, th {
    border: 1px solid #C0C4CC;
    text-align: center;
  }
</style>

<style scoped lang="scss">
  .box {
    .page {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }

    .flex {
      display: flex;

      div {
        flex: 1;

        h3 {
          padding-left: 10px;
          border-left: 4px solid #20a0ff;

          span {
            display: inline-block;
            margin-left: 10px;
            font-size: 12px;
            color: #cccccc;
          }
        }
      }
    }
  }
</style>
