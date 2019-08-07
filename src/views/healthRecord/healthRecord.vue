<template>
  <div class="container">
    <div class="title">
      <span class="t1">患者人群统计</span>
      <div>
        <el-radio-group v-model="radio1" @change="getNewData(radio1)">
          <el-radio-button label="0">全部</el-radio-button>
          <el-radio-button label="1">今日</el-radio-button>
          <el-radio-button label="2">本周</el-radio-button>
          <el-radio-button label="3">本月</el-radio-button>
          <el-radio-button label="4">全年</el-radio-button>
        </el-radio-group>
        <el-date-picker
          @change="selectTime"
          class="market_out"
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="dashboard">
      <!--      <h3>患者基本属性</h3>-->
      <analyze id="analyze" :title="title" :timeType="radio1" :time="value2"></analyze>
    </div>
    <div class="distribute">
      <div class="wrap">
        <span>地域分布</span>
        <div class="check">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部人群
          </el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="disease in cities" :label="disease" :key="disease">{{disease}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div id="amap-main" style="width: 100%;height: 500px;">

      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import analyze from '@/views/dashboard/components/analyze.vue'
    import {lazyAMapApiLoaderInstance} from 'vue-amap'

    const diseaseOptions = ['精神病', '高血压', '糖尿病']
    export default {
        name: 'HealthRecord',
        data() {
            return {
                title: '患者基本属性',
                map: null,
                heatmapData: [
                    {
                        "lng": 116.191031,
                        "lat": 39.988585,
                        "count": 10
                    }, {
                        "lng": 116.389275,
                        "lat": 39.925818,
                        "count": 11
                    }, {
                        "lng": 116.287444,
                        "lat": 39.810742,
                        "count": 12
                    }, {
                        "lng": 116.481707,
                        "lat": 39.940089,
                        "count": 13
                    }, {
                        "lng": 116.410588,
                        "lat": 39.880172,
                        "count": 14
                    }, {
                        "lng": 116.394816,
                        "lat": 39.91181,
                        "count": 15
                    }, {
                        "lng": 116.416002,
                        "lat": 39.952917,
                        "count": 16
                    }, {
                        "lng": 116.39671,
                        "lat": 39.924903,
                        "count": 17
                    }, {
                        "lng": 116.180816,
                        "lat": 39.957553,
                        "count": 18
                    }, {
                        "lng": 116.382035,
                        "lat": 39.874114,
                        "count": 19
                    }, {
                        "lng": 116.316648,
                        "lat": 39.914529,
                        "count": 20
                    }, {
                        "lng": 116.395803,
                        "lat": 39.908556,
                        "count": 21
                    }, {
                        "lng": 116.74553,
                        "lat": 39.875916,
                        "count": 22
                    }, {
                        "lng": 116.352289,
                        "lat": 39.916475,
                        "count": 23
                    }, {
                        "lng": 116.441548,
                        "lat": 39.878262,
                        "count": 24
                    }, {
                        "lng": 116.318947,
                        "lat": 39.942735,
                        "count": 25
                    }, {
                        "lng": 116.382585,
                        "lat": 39.941949,
                        "count": 26
                    }, {
                        "lng": 116.42042,
                        "lat": 39.884017,
                        "count": 27
                    }, {
                        "lng": 116.31744,
                        "lat": 39.892561,
                        "count": 28
                    }, {
                        "lng": 116.407059,
                        "lat": 39.912438,
                        "count": 29
                    }, {
                        "lng": 116.412351,
                        "lat": 39.888082,
                        "count": 30
                    }, {
                        "lng": 116.444341,
                        "lat": 39.915891,
                        "count": 31
                    }, {
                        "lng": 116.335385,
                        "lat": 39.741756,
                        "count": 32
                    }, {
                        "lng": 116.3926,
                        "lat": 40.008733,
                        "count": 33
                    }, {
                        "lng": 116.389731,
                        "lat": 39.92292,
                        "count": 34
                    }, {
                        "lng": 116.413371,
                        "lat": 39.874483,
                        "count": 35
                    }, {
                        "lng": 116.199752,
                        "lat": 39.911717,
                        "count": 36
                    }, {
                        "lng": 116.278472,
                        "lat": 40.254994,
                        "count": 37
                    }, {
                        "lng": 116.464252,
                        "lat": 39.925828,
                        "count": 38
                    }, {
                        "lng": 116.479475,
                        "lat": 39.937945,
                        "count": 39
                    }, {
                        "lng": 116.415599,
                        "lat": 39.956902,
                        "count": 40
                    }, {
                        "lng": 116.355675,
                        "lat": 39.870089,
                        "count": 41
                    }, {
                        "lng": 116.295267,
                        "lat": 39.987171,
                        "count": 42
                    }, {
                        "lng": 116.323634,
                        "lat": 39.911692,
                        "count": 43
                    }, {
                        "lng": 116.692769,
                        "lat": 40.173307,
                        "count": 44
                    }, {
                        "lng": 116.287888,
                        "lat": 39.928531,
                        "count": 45
                    }, {
                        "lng": 116.386502,
                        "lat": 39.922747,
                        "count": 100
                    }, {
                        "lng": 116.236773,
                        "lat": 40.218341,
                        "count": 47
                    }, {
                        "lng": 116.490636,
                        "lat": 39.804253,
                        "count": 48
                    }, {
                        "lng": 116.391095,
                        "lat": 39.925791,
                        "count": 49
                    }, {
                        "lng": 116.472402,
                        "lat": 39.769178,
                        "count": 50
                    }, {
                        "lng": 116.38657,
                        "lat": 39.956731,
                        "count": 51
                    }, {
                        "lng": 116.427536,
                        "lat": 39.943671,
                        "count": 52
                    }, {
                        "lng": 116.374547,
                        "lat": 39.967588,
                        "count": 53
                    }, {
                        "lng": 116.380383,
                        "lat": 39.871634,
                        "count": 54
                    }, {
                        "lng": 116.376092,
                        "lat": 39.965485,
                        "count": 55
                    }, {
                        "lng": 116.352424,
                        "lat": 39.91811,
                        "count": 56
                    }, {
                        "lng": 116.020157,
                        "lat": 40.348526,
                        "count": 57
                    }, {
                        "lng": 116.416201,
                        "lat": 39.951736,
                        "count": 58
                    }, {
                        "lng": 116.405392,
                        "lat": 39.908738,
                        "count": 59
                    }, {
                        "lng": 116.49238,
                        "lat": 39.926248,
                        "count": 60
                    }, {
                        "lng": 116.389282,
                        "lat": 39.988391,
                        "count": 61
                    }, {
                        "lng": 116.396683,
                        "lat": 39.923487,
                        "count": 62
                    }, {
                        "lng": 116.41718,
                        "lat": 39.905213,
                        "count": 63
                    }, {
                        "lng": 116.321512,
                        "lat": 39.913192,
                        "count": 64
                    }, {
                        "lng": 116.260028,
                        "lat": 40.03353,
                        "count": 65
                    }, {
                        "lng": 116.394846,
                        "lat": 39.911168,
                        "count": 66
                    }, {
                        "lng": 116.374767,
                        "lat": 39.96608,
                        "count": 67
                    }, {
                        "lng": 116.6841,
                        "lat": 39.909762,
                        "count": 68
                    }, {
                        "lng": 116.3838,
                        "lat": 39.95811,
                        "count": 69
                    }, {
                        "lng": 116.39243,
                        "lat": 40.01143,
                        "count": 100
                    }],

                checkAll: false,
                checkedCities: ['精神病', '高血压'],
                cities: diseaseOptions,
                isIndeterminate: true,

                radio1: '0',
                value2: [],
            }
        },
        created() {

            this.$nextTick(() =>{
                this.initMap()
            })

        },
        methods: {
            initMap() {
                lazyAMapApiLoaderInstance.load().then(() => {
                    this.map = new AMap.Map('amap-main', {
                        center: [116.418261, 39.921984],
                        resizeEnable: true,
                        zoom: 11
                    })
                    // this.map.plugin(['AMap.Geolocation'],() => {
                    //   let geolocation = new AMap.Geolocation({
                    //     enableHighAccuracy: true,
                    //     timeout: 100,
                    //     maximumAge: 0,
                    //     convert: true,
                    //     showButton: true,
                    //     buttonPosition: 'RB',
                    //     showMarker: true,
                    //     showCircle: true,
                    //     panToLocation: true,
                    //     zoomToAccuracy:true,
                    //     extensions:'all',
                    //     pName: 'Geolocation'
                    //   })
                    //   this.map.addControl(geolocation)
                    //   geolocation.getCurrentPosition()
                    //   AMap.event.addListener(geolocation,'complete',(reslut) => {
                    //     this.map.setCenter(reslut.position)
                    //     console.log(reslut)
                    //   })
                    //   AMap.event.addListener(geolocation,'error',(reslut) => {
                    //     console.log(reslut)
                    //   })
                    // })

                    if (!this.isSupportCanvas()) {
                        alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
                    } else {
                        this.map.plugin(['AMap.Heatmap'], () => {
                            let heatmap = new AMap.Heatmap(this.map, {
                                radius: 25, //给定半径
                                opacity: [0, 0.8],
                                // gradient:{
                                //   0.5: 'blue',
                                //   0.65: 'rgb(117,211,248)',
                                //   0.7: 'rgb(0, 255, 0)',
                                //   0.9: '#ffea00',
                                //   1.0: 'red'
                                // }
                            })
                            heatmap.setDataSet({
                                data: this.heatmapData,
                                max: 100
                            });
                        })
                    }

                })
            },

            isSupportCanvas() {
                var elem = document.createElement('canvas');
                return !!(elem.getContext && elem.getContext('2d'));
            },

            handleCheckAllChange(val) {
                this.checkedCities = val ? diseaseOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },

            getNewData(radio1) {
                this.radio1 = radio1
                this.value2 = []
            },

            selectTime(value2) {
                this.radio1 = '5'
                this.value2 = value2
            }
        },
        computed: {

            ...mapGetters([
                'name'
            ])
        },
        components: {
            analyze
        }
    }
</script>

<style scoped>
  .market_out >>> .el-range-separator {
    width: 10% !important;
  }
</style>

<style scoped lang="scss">
  .container {
    padding: 30px;
    height: 100%;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
    }

    .dashboard {
      /*padding: 10px;*/
    }

    .distribute {
      margin-top: 20px;
      background-color: #FFF;
      color: #303133;
      -webkit-transition: .3s;
      transition: .3s;
      border: 1px solid #EBEEF5;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      border-radius: 4px;
      .wrap {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        span {
          line-height: 40px;
        }
      }
    }
  }
</style>
