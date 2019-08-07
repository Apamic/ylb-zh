<template>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="健康小屋分布" name="first"><distributeHut></distributeHut></el-tab-pane>
        <el-tab-pane label="健康小屋预警" name="second"><earlyWarningHut></earlyWarningHut></el-tab-pane>
        <el-tab-pane label="健康小屋统计" name="third"><statisticsHut></statisticsHut></el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    import distributeHut from'@/views/healthHut/distributeHut'
    import earlyWarningHut from '@/views/healthHut/earlyWarningHut'
    import statisticsHut from '@/views/healthHut/statisticsHut'

    export default {
        name: "distribute",
        data() {
          return {
            activeName: 'first'
          }
        },
        created() {
        },

        methods: {
          handleClick(tab, event) {
            console.log(tab, event)
          }
        },
        components: {
          distributeHut,
          earlyWarningHut,
          statisticsHut
        }
    }
</script>

<style scoped lang="scss">
  .container {
    padding: 30px;
    height: 100%;
  }
</style>
