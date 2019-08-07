<template>
  <div class="dashboard-container market_out"  >
    <div style="width: 100%" class="clearfix">
      <el-card>
        <el-avatar class="fl" style="margin-top: 5px" :size="70" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <div class="fl" style="margin-left: 15px">
          <p class="docName">医生名称</p>
          <p class="docAdd">医院地址asdasd</p>
        </div>
        <div class="fr docList">
          <ul>
            <li>
              <p>地区人数</p>
              <p>2,223</p>
            </li>
            <li>
              <p>团队数量</p>
              <p>2,223</p>
            </li>
            <li>
              <p>签约人数排名</p>
              <p>2,223</p>
            </li>
            <li>
              <p>签约率排名</p>
              <p>2,223</p>
            </li>
            <li>
              <p>签约数量</p>
              <p>2,223</p>
            </li>
            <li>
              <p>签约率</p>
              <p>2,223</p>
            </li>
          </ul>
        </div>
      </el-card>

    </div>
    <div class="dateTool clearfix" style="width: 100%;margin-top: 15px">
      <el-date-picker
        class='fr'
        v-model="value2"
        type="monthrange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <familyDoctorTable style="margin-top: 20px"/>
    <el-row style="margin-top: 20px" :gutter="20">

      <el-col :xs="12" :sm="12" :lg="12">
        <el-card>
          <signedPie/>
        </el-card>

      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
        <el-card>
          <signedPie/>
        </el-card>

      </el-col>
    </el-row>

  </div>

</template>

<script>
  import familyDoctorTable from '../components/familyDoctorTable.vue'
  import signedPie from '../../dashboard/charts/analyze/pie.vue'
  //  import { mapGetters } from 'vuex'

  export default {
    components:{
      familyDoctorTable,
      signedPie
    },
    data() {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        sizeList: ["large", "medium", "small"],
        pickerOptions: {
          shortcuts: [{
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
            }
          }, {
            text: '今年至今',
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: ''
      };
    }
  };
</script>
<style>

  .market_out .el-range-separator{
    width: 10% !important;
  }
</style>
<style lang="scss" scoped>
  .docList {
    width: 60%;
    ul{
      width: 100%;

      float:right ;
      list-style: none;
      li:before{
        content: "";
        position: absolute;
        top:15px; right:0;
        width: 1px;
        height:50px;
        background: #cfcfcf;


      }
      li{
        position: relative;
        width: 16.66%;
        float: left;
        text-align: center;
        /*border-right: 1px solid #cfcfcf;*/
        :first-child{
          color: #99a9bf;
          text-align: right;
          margin-right: 40px;
        }
        :last-child{

          margin: 0;
          font-size: 30px;
          text-align: right;
          margin-right: 40px;
          margin-bottom: 10px;
        }
      }
      :last-child{
        border: none;
      }
    }

  }
  .listView{
    width: 100%;
    margin-top: 10px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    overflow: hidden;

    ul{
      list-style: none;
      :last-child{
        border-right: none;
      }
      li{
        float: left;
        width: 16%;
        text-align: center;
        padding-top: 10px;
        margin-top: 10px;
        border-right: 1px solid #cfcfcf;
      }
    }
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }


  }

</style>
