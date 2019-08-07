<template>
  <el-row class="panel-group">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>实时数据</span>
        <el-button style="float: right; padding: 3px 0" type="text">实时直播</el-button>
        <span class="time"><span>更新时间:</span><span>{{ realTime}}</span></span>
      </div>
      <el-row>
        <el-col :xs="12" :sm="12" :lg="4">
          <div class="card-panel-text">
            今日就诊人数
          </div>
          <div class="card-panel-box">
            <count-to :start-val="0" :end-val="treatment" :duration="2600" class="card-panel-num" />
            人
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="4">
          <div class="card-panel-text">
            今日总在线交易
          </div>
          <div class="card-panel-box">
            <count-to :start-val="0" :end-val="transaction" :duration="2600" class="card-panel-num" :decimals="2" />
            元
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="4">
          <div class="card-panel-text">
            今日家庭医生签约
          </div>
          <div class="card-panel-box">
            <count-to :start-val="0" :end-val="signing" :duration="2600" class="card-panel-num" />
            人
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="4">
          <div class="card-panel-text">
            今日转诊人次
          </div>
          <div class="card-panel-box">
            <count-to :start-val="0" :end-val="referral" :duration="2600" class="card-panel-num" />
            人
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="4">
          <div class="card-panel-text">
            今日健康小屋检验
          </div>
          <div class="card-panel-box">
            <count-to :start-val="0" :end-val="examine" :duration="2600" class="card-panel-num" />
            人
          </div>

        </el-col>
        <el-col :xs="12" :sm="12" :lg="4">
          <div class="card-panel-text">
            今日健康小屋预警
          </div>
          <div class="card-panel-box">
            <count-to :start-val="0" :end-val="earlyWarning" :duration="2600" class="card-panel-num" />
            次
          </div>

        </el-col>

      </el-row>

    </el-card>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import {getrealTime} from '@/api/realTime'
import {parseTime} from '@/utils/index'
import { getToken} from '@/utils/auth'
export default {
  components: {

    CountTo
  },
  data() {
    return{
      treatment: 0,
      transaction: 0,
      signing: 0,
      referral: 0,
      examine: 0,
      earlyWarning: 0,
      list: null,
      listLoading: true,
      govId:getToken('govId'),
      realTime:parseTime(new Date()),
      time: null,
    }
  },
  methods: {
    f(){
      let myDate = new Date()
      console.log(parseTime(myDate));
    },

    getrealTimeData() {
//      console.log(this.$store.getters.govId);
      this.listLoading = true
      getrealTime({
          "govId" :getToken('govId')
        }
      ).then(response => {
//        console.log(response);
        this.treatment=response.data.realTimeData.treatment
        this.transaction=response.data.realTimeData.transaction
        this.signing=response.data.realTimeData.signing
        this.referral=response.data.realTimeData.referral
        this.examine=response.data.realTimeData.examine
        this.earlyWarning=response.data.realTimeData.earlyWarning
        this.list = response.data.items
        this.listLoading = false
      })
    }
  },

    created() {

    },
  mounted(){
//    this.f();
    this.getrealTimeData()
    this.time = window.setInterval(() => {
        this.getrealTimeData()
        this.realTime = parseTime(new Date())
    },1000 * 30)
  },
    beforeDestroy () {
        clearInterval(this.time)
    }
}
</script>

<style lang="scss" scoped>
.el-col{
  text-align: center;
  .card-panel-box{
    line-height: 40px;
    font-size: 16px;
    .card-panel-num{
      font-size: 24px;
    }
  }
  .card-panel-text{
    color: #bebebe;
    font-size: 18px;
  }
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
.time{
  float: right;
  font-size: 14px;
  line-height: 1.6;
  white-space: nowrap;
  margin-right: 10px;
}
@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
