<template>
  <el-row class="panel-group">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>健康小屋看板</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link :to="'/healthHut/index'">
            查看更多
          </router-link>
        </el-button>
      </div>
      <div class="text">
        <div class="el-row">
          <el-col :xs="18" :sm="18" :lg="18">
            <div class="map-top clearfix">
              <div class="map-card">
                <p class="miniFont t2">健康小屋总数</p>
                <p class="t3">0</p>
              </div>
              <div class="map-card">
                <p class="miniFont t2">健康小屋检验总人次</p>
                <p class="t3">0</p>
              </div>
              <div class="map-card">
                <p class="miniFont t2">健康小屋预警总次数</p>
                <p class="t3">0</p>
              </div>
            </div>
            <div class="map-btm">
              <div class="amap-wrapper" >
                <div id="near" style="height: 100%;width: 100%">
                  <div id="amap-main" style="height: 550px;width: 100%">
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6">
            <p style="margin-bottom: 10px;">健康小屋实时预警</p>
            <div class="outer">
              <div class="map-scroll">
                <div  v-for="(u,i) in WarningDetailsList" class="text item clearfloat"  :class="u.level=='重要预警' ? 'red-box map-box':'map-box'">
                  <p><span class="level" :class="u.level=='重要预警' ? 'red' : ''">{{u.level}}</span><span>{{u.projectName}}</span></p>
                  <p>姓名: <span>{{u.userName}}</span></p>
                  <p>处理状态:
                    <span v-if="u.status == 1" style="color: #ff0000">未处理</span>
                    <span v-if="u.status == 2" style="color: #0076FF">处理中</span>
                    <span v-if="u.status == 3" style="color: #00c48c">已处理</span>
                  </p>
                  <p>响应时间: <span>{{u.processTime}}</span></p>
                  <p style="color: #666666;font-size: 12px;">{{u.createTime}}</p>
                </div>
              </div>
            </div>

          </el-col>
        </div>
      </div>
    </el-card>
  </el-row>


</template>

<script>
  // import AMap from 'vue-amap'
  // AMap.initAMapApiLoader({
  //     key: '1513bd9ff523b8d0875d4a92e1a71c29',
  //     plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType','AMap.Geolocation','AMap.Heatmap','AMap.PlaceSearch']
  // })

  import { lazyAMapApiLoaderInstance } from 'vue-amap';

  import {getToken} from '@/utils/auth'

  const state = {
      token: getToken('token'),
      name: getToken('nickName'),
      avatar: getToken('logo'),
      govId: getToken('govId')
  }

  export default{
    name:'near',
    data(){
      return{

          WarningDetailsList: [],
          distributedList: [],
          map: null,

          markerArr: [],

          scale: null
      }
    },

    // watch: {
    //     'distributedList'() {
    //         this.initMap()
    //     }
    // },

    created() {
        this.$nextTick(() => {
            this.initMap()
            this.getRealTimeData()
            this.getDistributed()
        })
        // this.getRealTimeData()
        // this.getDistributed()

    },

    mounted() {
        // this.initMap()
    },

      methods: {
          getRealTimeData() {
            this.$axios({
                url: '/healthHouse/house/realTimeData',
                method: 'POST',
                data: {
                    "pageParam" : {
                        "pageSize" : 5,
                        "pageNum" : 1
                    },
                    "govId" : state.govId
                }
            }).then(res => {
                this.WarningDetailsList = res.data.WarningDetailsList
            })
        },

          getDistributed() {
              this.$axios({
                  url: '/healthHouse/house/distributed',
                  method: 'POST',
                  data: {
                      "houseInfo" : {
                          "govId": state.govId,
                      }
                  }
              }).then(res => {
                  this.distributedList = res.data.houseInfoList
                  // this.initMap()
                  for(let i = 0,marker; i < this.distributedList.length;i++) {
                        marker = new AMap.Marker({
                            position: [this.distributedList[i].lng,this.distributedList[i].lat],
                            map: this.map,
                            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                            // offset: new AMap.Pixel(0, -35),
                            // content: '2',
                        })
                      this.markerArr.push(marker)
                      // this.markerArr.setMap(this.map);
                      // this.markerArr[i].setAnimation('AMAP_ANIMATION_BOUNCE');
                  }
                  // this.markerArr.forEach(item => {
                  //     item.setAnimation('AMAP_ANIMATION_BOUNCE')
                  // })

                  // this.markerArr[0].setAnimation('AMAP_ANIMATION_BOUNCE');
                  // this.initMap(this.distributedList)
              })
          },

          initMap() {
              lazyAMapApiLoaderInstance.load().then(() => {
                  this.map = new AMap.Map('amap-main', {
                      resizeEnable: true,
                      // viewMode: '3D', //3D
                      // pitch: 50, // 高度
                      // // defaultCursor: 'pointer',
                      // showBuildingBlock: false,//显示标记
                      // expandZoomRange: true,
                      // zooms: [3, 20],
                      zoom: 11
                  })


                  // console.log('123')
                  this.scale = new AMap.Scale({
                      visible: false
                  })

                  this.map.addControl(this.scale);
                  this.scale.show();
                  // console.log(this.scale)

                  //
                  // let marker = new AMap.Marker({
                  //     position: [116.397428,39.90923],
                  //     map: this.map
                  // })


                  for(let i = 0,marker; i < this.distributedList.length;i++) {
                        marker = new AMap.Marker({
                            position: [this.distributedList[i].lng,this.distributedList[i].lat],
                            map: this.map,
                            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                            // offset: new AMap.Pixel(0, -35),
                            // content: '2',
                        })
                      this.markerArr.push(marker)
                      // this.markerArr.setMap(this.map);
                      // this.markerArr[i].setAnimation('AMAP_ANIMATION_BOUNCE');
                  }
              })
          }

      }
  }

</script>

<style scoped>
  .map-top {
    margin-bottom: 10px;
  }

  .level {
    margin-right: 10px;
    padding: 4px;
    font-size: 13px;
    color: #666;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
  }

  .red {
    color: #ff0000;
    border: 1px solid #ff0000;
  }

  .miniFont {
    margin-bottom: 10px;
    text-align: center;
  }

  .t3 {
    text-align: center;
  }
</style>


<style lang="scss" scoped>
  .outer {
    width:100%;
    height: 584px;
    overflow: hidden;
    .map-scroll {
      margin-left: 20px;
      width: 105%;
      /*margin-right: -15px;*/
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      /*background: red;*/
      /*padding-top: 100px;*/
    }
  }

  /*.map-scroll{*/
    /*overflow-y: auto;*/
    /*height: 584px;*/
  /*}*/
  .map-box{
    padding: 30px;
    background-color: #fcfcfc;
    margin-bottom: 15px;
    .green{
      color: #00CC33;
      font-weight: 900;
    }
    p{
      margin: 0;
      padding: 0;
      height: 26px;
      font-size: 16px;
      line-height: 26px;

    }
  }
  .red-box{
    background-color: #fef0ef;
    .red-font{
      border: 1px solid red;
      color: red;
      padding: 5px;
      border-radius: 5px;
      margin-right: 10px;
    }
  }

  .amap-wrapper {
    width: 100%;
    height: 500px;
  }
  .map-card{
    float: left;
    width: 30%;
  }
</style>
