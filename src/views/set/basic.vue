<template>
    <div class="box">
        <ul>
          <li>
            <span class="t3">机构简称</span>
            <div>
              <span class="t4">健康顺河</span>
              <div class="set">
                <el-button type="text">设置</el-button>
              </div>
            </div>
          </li>
          <li>
            <span class="t3">机构LOGO</span>
            <div>
                <img src="src/views/healthHut/favicon.ico" width="50" height="50"/>
                <div class="set">
                  <el-button type="text">设置</el-button>
                </div>
            </div>
          </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "basic",
        props: {},
        data() {
            return {}
        },
        created() {

        },
        components: {}
    }
</script>

<style scoped lang="scss">
  .box {
    ul {
      li {
        display: flex;
        align-items: center;
        span {
          width: 100px;
        }
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 80px;
          border-bottom: 1px solid #E4E7ED;
          .set {
            display: flex;
            justify-content: flex-end;
            padding: 10px;
            border: none;
          }
        }
      }
    }
  }
</style>
