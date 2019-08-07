<template>
  <div class="box">
    <div class="t1">设置</div>
    <div class="wrap">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <basic></basic>
        </el-tab-pane>
        <el-tab-pane label="子账号管理" name="second">
          <accountManagement></accountManagement>
        </el-tab-pane>
        <el-tab-pane label="人数设置" name="third">
          <numberOfSet></numberOfSet>
        </el-tab-pane>
        <el-tab-pane label="健康小屋预警" name="four">
          <earlyWarning></earlyWarning>
        </el-tab-pane>
        <el-tab-pane label="健康小屋管理" name="five">
          <management></management>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    import basic from '@/views/set/basic'
    import accountManagement from '@/views/set/accountManagement'
    import numberOfSet from '@/views/set/numberOfSet'
    import earlyWarning from '@/views/set/earlyWarning'
    import management from '@/views/set/management'

    export default {
        name: "set",
        props: {},
        data() {
            return {
              activeName: 'four',
            }
        },
        created() {

        },
        methods: {
          handleClick() {

          }
        },
        components: {
          basic,
          accountManagement,
          numberOfSet,
          earlyWarning,
          management
        }
    }
</script>

<style scoped lang="scss">
  .box {
    padding: 30px;
    box-sizing: border-box;
    height: 100%;
    .wrap {
      margin-top: 20px;
      padding: 10px 20px;
      box-sizing: border-box;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #EBEEF5;
      border-radius: 4px;
    }
  }
</style>
