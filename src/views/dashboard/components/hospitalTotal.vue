<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" v-if="title == '医院总体看板'">
          <router-link :to="'/hospital/index'">
            查看更多
          </router-link>
        </el-button>
      </div>
      <div class="tab-title clearfix">
        <div class="left"><</div>
        <div class="center clearfix">
          <el-row style="height: 100%">
            <el-col :xs="4" :sm="4" :lg="4" :class="{'pit':nameIndex == 0}">
              <p class="t1">在线问诊量</p>
              <span class="text-total t4">总销量</span>
              <span class="text-num t3">{{data.onlineInquiryAmount}}</span>
            </el-col>
            <el-col :xs="4" :sm="4" :lg="4" :class="{'pit':nameIndex == 1}">
              <p>特色服务包销量</p>
              <span class="text-total">总销量</span>
              <span class="text-num">{{data.specialServiceAmount}}</span>
            </el-col>
            <el-col :xs="4" :sm="4" :lg="4" :class="{'pit':nameIndex == 2}">
              <p>医疗服务包销量</p>
              <span class="text-total">总销量</span>
              <span class="text-num">{{data.medicalServiceAmount}}</span>
            </el-col>

            <el-col :xs="4" :sm="4" :lg="4" :class="{'pit':nameIndex == 3}">
              <p>健康产品销量</p>
              <span class="text-total">总销量</span>
              <span class="text-num">{{data.healthProductAmount}}</span>
            </el-col>
            <el-col :xs="4" :sm="4" :lg="4" :class="{'pit':nameIndex == 4}">
              <p>上门服务销量</p>
              <span class="text-total">总销量</span>
              <span class="text-num">{{data.homeServiceAmount}}</span>
            </el-col>
          </el-row>
        </div>
        <div class="right">></div>
      </div>
      <div class="line-box" style="margin-top: 15px">
        <lines :lineData="lineData" :nameIndex="nameIndex" height="100%" width="100%"/>
      </div>
    </el-card>
  </div>

</template>

<script>
    import lines from '../charts/line.vue'

    export default {
        data() {
            return {
                nameIndex: 1
            }
        },
        components: {
            lines
        },
        methods: {},

        props: {
            data: {
                type: Object
            },

            lineData: {
                type: Array
            },

            title: {
                type: String,
                default: '医院总体看板',
            }
        },
        mounted() {

        },
    }
</script>
<style lang="scss" scoped>
  .line-box {
    width: 100%;
    height: 400px;
  }

  .tab-title {
    height: 134px;

    .left {
      width: 2%;
      height: 100%;
      float: left;
      line-height: 134px;
      border: 1px solid #ccc;
      border-right: none;
      text-align: center;
      font-size: 22px;
    }

    .right {
      width: 2%;
      float: left;
      height: 100%;
      line-height: 134px;
      border: 1px solid #ccc;
      border-left: none;
      text-align: center;
      font-size: 22px;
    }

    .el-row:first-child {
      border-left: 1px solid #ccc;
    }

    .el-row:last-child {
      border-right: 1px solid #ccc;
    }

    .center {
      width: 96%;
      float: left;
      height: 100%;
      /*border-top:1px solid #ccc;*/
      /*border-bottom: 1px solid #ccc;*/

      .el-col {
        width: 20%;
        text-align: left;
        line-height: 37px;
        padding-left: 40px;
        padding-right: 40px;
        margin: 0;
        padding-top: 10px;
        padding-bottom: 10px;
        height: 100%;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        p {
          margin: 0;
          padding: 0;
          font-size: 16px;
        }

        span {
          display: block;
        }

        .text-total {
          font-size: 12px;

        }

        .text-num {
          font-size: 28px;
        }
      }

      .pit {
        border: 1px solid #ccc;
        border-bottom: none;
        border-top: 4px solid deepskyblue;
      }

    }
  }

</style>
