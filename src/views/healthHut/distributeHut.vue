<template>
  <div class="box">
    <div id="amap-main" style="width: 100%;height: 750px;">
    </div>
    <div class="search">
      <p>健康小屋</p>
      <div>
        <el-input placeholder="请输入健康小屋名称" v-model="search" class="input-with-select" @click="onSearch">
          <el-button slot="append" icon="el-icon-search" @click.native.prevent="onSearch"></el-button>
        </el-input>
      </div>
      <ul>
        <li v-for="(item,index) in searchList" @click="open(item,index)">
          <p>{{item.name}}</p>
          <p style="color: #666;font-size: 13px;">{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    // import AMap from 'vue-amap'
    // import AMapUI from 'vue-amap-ui'
    import {lazyAMapApiLoaderInstance} from 'vue-amap'
    import svg from '@/icons/svg/hut2.svg'


    import {getToken} from '@/utils/auth'

    const state = {
        token: getToken('token'),
        name: getToken('nickName'),
        avatar: getToken('logo'),
        govId: getToken('govId')
    }

    export default {
        name: "distributeHut",
        props: {},
        data() {
            return {
                map: null,

                markerArr: [],

                search: '',

                searchList: [],

                placeSearch: null,
            }
        },
        created() {
            this.$nextTick(() => {
                this.initMap()
            })

        },


        // mounted() {
        //     this.initMap()
        // },

        methods: {

            open(item,index) {

                let title = '<div style="display: flex;align-items: center;width: 260px;background: #66b1ff;">' +
                    '<img src="favicon.ico" style="width: 70px;height: 70px;"/>' +
                    '<ul style="color: #fff;font-size: 14px">' +
                    '<li>'+ item.name+'</li>' +
                    '<li>'+ item.address+'</li>' +
                    '</ul>' +
                    '</div>' +
                    '<div style="padding: 15px;background: #fff;font-size: 13px;">' +
                    '<ul style="display: flex;text-align: center">' +
                    '<li style="flex: 1;"><p style="color: #ccc">今日检查</p><p>'+ item.inspectionAmount +'</p></li>' +
                    '<li style="flex: 1;"><p style="color: #ccc">今日预警</p><p>'+ item.warningAmount+'</p></li>' +
                    // '<li><p style="color: #ccc">社区总人数</p><p>123</p></li>' +
                    // '<li><p style="color: #ccc">健康小屋管理</p><p>123</p></li>' +
                    '</ul>' +
                    '</div>';
                let infoWindow = new AMap.InfoWindow({
                    isCustom: true,
                    offset: new AMap.Pixel(0, -35),
                    anchor: 'top-center'
                })

                infoWindow.setContent(title)
                // infoWindow.setAnchor(['top-center'])
                infoWindow.open(this.map, [item.lng, item.lat])

                this.map.panTo([item.lng, item.lat])
                console.log(this.markerArr[index])
            },

            initMap() {
                lazyAMapApiLoaderInstance.load().then(() => {
                    this.map = new AMap.Map('amap-main', {
                        resizeEnable: true,
                        zoom: 12
                    })


                    this.map.plugin('AMap.PlaceSearch', () => {
                        this.placeSearch = new AMap.PlaceSearch({
                            city: '全国'
                        })
                    })

                    this.scale = new AMap.Scale({
                        visible: false
                    })

                    this.map.addControl(this.scale);
                    this.scale.show();

                    var path = [
                        [116.362209, 39.887487],
                        [116.422897, 39.878002],
                        [116.372105, 39.90651],
                        [116.428945, 39.89663]
                    ];

                    var polyline = new AMap.Polyline({
                        path: path,
                        isOutline: false, //轮廓
                        outlineColor: '#ffeeff', //轮廓颜色
                        borderWeight: 3, //轮廓的宽
                        strokeColor: "#3366FF",
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        // 折线样式还支持 'dashed'
                        strokeStyle: "solid",
                        // strokeStyle: "dashed",  //虚线
                        // strokeStyle是dashed时有效
                        strokeDasharray: [10, 5],
                        lineJoin: 'round',
                        lineCap: 'round',
                        zIndex: 50,
                    })

                    polyline.setMap(this.map)


                    // for (var i = 0, marker; i < this.lnglats.length; i++) {
                    //     var marker = new AMap.Marker({
                    //         position: this.lnglats[i],
                    //         map: this.map,
                    //         icon: new AMap.Icon({
                    //             image: "favicon.ico",
                    //             size: new AMap.Size(100, 100),  //图标大小
                    //             imageSize: new AMap.Size(26, 26)
                    //         })
                    //     })
                    //
                    //     // var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>'
                    //
                    //     var title = '<div style="display: flex;align-items: center;background: #66b1ff;">' +
                    //         '<img src="favicon.ico" style="width: 70px;height: 70px;"/>' +
                    //         '<ul style="color: #fff;font-size: 14px">' +
                    //         '<li>葛光社区</li>' +
                    //         '<li>河南省通许县城关镇行政路11号</li>' +
                    //         '</ul>' +
                    //         '</div>' +
                    //         '<div style="padding: 15px;background: #fff;font-size: 13px;">' +
                    //         '<ul style="display: flex;text-align: center">' +
                    //         '<li><p style="color: #ccc">今日检查</p><p>123</p></li>' +
                    //         '<li><p style="color: #ccc">今日预警</p><p>123</p></li>' +
                    //         '<li><p style="color: #ccc">社区总人数</p><p>123</p></li>' +
                    //         '<li><p style="color: #ccc">健康小屋管理</p><p>123</p></li>' +
                    //         '</ul>' +
                    //         '</div>';
                    //
                    //     var infoWindow = new AMap.InfoWindow({
                    //         isCustom: true,
                    //         offset: new AMap.Pixel(0, -35),
                    //         anchor: 'top-center'
                    //     })
                    //     marker.content = '我是第' + (i + 1) + '个Marker';
                    //     marker.on('click', e => {
                    //         infoWindow.setContent(title)
                    //         // infoWindow.setAnchor(['top-center'])
                    //         infoWindow.open(this.map, e.target.getPosition())
                    //     })
                    //     // marker.emit('click', {target: marker});
                    // }


                    // this.createdMarker()
                    // this.map.plugin(['AMap.ToolBar','AMap.MapType'],() => {
                    //     this.map.addControl(new AMap.ToolBar())
                    //     this.map.addControl(new AMap.MapType({
                    //       showTraffic: false,
                    //       showRoad: false
                    //     })
                    //     )
                    //   }
                    // )

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

                    // this.mapCilck()

                    // this.createInfoWindow()
                })


            },

            mapCilck() {
                this.map.on('click', (e) => {
                    alert('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！')

                    if (this.markers) {
                        this.markers.setPosition([e.lnglat.getLng(), e.lnglat.getLat()])
                    } else {
                        this.markers = new AMap.Marker({
                            position: [e.lnglat.getLng(), e.lnglat.getLat()],
                            map: this.map,
                            icon: new AMap.Icon({
                                image: "20190805100437.png",
                                size: new AMap.Size(52, 52),  //图标大小
                                imageSize: new AMap.Size(26, 26)
                            })
                        })
                    }
                })
            },

            createdMarker() {
                let marker = new AMap.Marker({
                    position: [116.397428, 39.90923],
                    map: this.map,
                    icon: new AMap.Icon({
                        image: svg,
                        size: new AMap.Size(100, 100),  //图标大小
                        imageSize: new AMap.Size(26, 26)
                    })
                })
                // this.markers =  new AMap.Marker({
                //       position: [116.397428, 39.90923],
                //       map: this.map
                //     })
                AMap.event.addListener(marker, 'click', (e) => {
                    var info = [];
                    info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
                    info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>高德软件</h4>");
                    info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
                    info.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>");

                    var infoWindow = new AMap.InfoWindow({
                        // isCustom: true,
                        anchor: 'top-center',
                        content: info.join(""), //使用默认信息窗体框样式，显示信息内容
                        // offset: new AMap.Pixel(16, -45) //偏移量
                    });

                    infoWindow.open(this.map, e.target.getPosition())

                })
            },

            createInfoWindow() {
                let marker = new AMap.Marker({
                    position: [116.397428, 39.90923],
                    map: this.map,
                    icon: new AMap.Icon({
                        image: "hut2.svg",
                        size: new AMap.Size(100, 100),  //图标大小
                        imageSize: new AMap.Size(26, 26)
                    })
                })

                AMap.event.addListener(marker, 'click', (e) => {
                    var info = [];
                    info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
                    info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>高德软件</h4>");
                    info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
                    info.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>");

                    var infoWindow = new AMap.InfoWindow({
                        anchor: 'top-center',
                        // isCustom: true,
                        // content: info.join(""), //使用默认信息窗体框样式，显示信息内容
                        content: '123',
                        // offset: new AMap.Pixel(16, -45) //偏移量
                    });

                    infoWindow.open(this.map, e.target.getPosition())
                })
            },

            onSearch() {
                this.markerArr = []
                this.map.clearMap()
                this.$axios({
                    url: '/healthHouse/house/distributed',
                    method: 'POST',
                    data: {
                        houseInfo: {
                            govId: state.govId,
                            name: this.search
                        }
                    }
                }).then(res => {
                    this.searchList = res.data.houseInfoList
                    for (let i = 0, maker; i < this.searchList.length; i++) {
                        maker = new AMap.Marker({
                            position: [this.searchList[i].lng, this.searchList[i].lat],
                            map: this.map,
                            icon: new AMap.Icon({
                                image: "favicon1.ico",
                                size: new AMap.Size(100, 100),  //图标大小
                                imageSize: new AMap.Size(30, 30)
                            }),
                            extData:{
                                id: i + 1
                            }
                        })
                        this.markerArr.push(maker)
                        this.map.add(this.markerArr)
                        let title = '<div style="display: flex;align-items: center;width: 260px;background: #66b1ff;">' +
                            '<img src="favicon.ico" style="width: 70px;height: 70px;"/>' +
                            '<ul style="color: #fff;font-size: 14px">' +
                            '<li>'+ this.searchList[i].name+'</li>' +
                            '<li>'+ this.searchList[i].address+'</li>' +
                            '</ul>' +
                            '</div>' +
                            '<div style="padding: 15px;background: #fff;font-size: 13px;">' +
                            '<ul style="display: flex;text-align: center">' +
                            '<li style="flex: 1;"><p style="color: #ccc">今日检查</p><p>'+ this.searchList[i].inspectionAmount +'</p></li>' +
                            '<li style="flex: 1;"><p style="color: #ccc">今日预警</p><p>'+ this.searchList[i].warningAmount+'</p></li>' +
                            // '<li><p style="color: #ccc">社区总人数</p><p>123</p></li>' +
                            // '<li><p style="color: #ccc">健康小屋管理</p><p>123</p></li>' +
                            '</ul>' +
                            '</div>';

                        let infoWindow = new AMap.InfoWindow({
                            isCustom: true,
                            offset: new AMap.Pixel(0, -35),
                            anchor: 'top-center'
                        })
                        this.markerArr[i].on('click', e => {
                            infoWindow.setContent(title)
                            // infoWindow.setAnchor(['top-center'])
                            infoWindow.open(this.map, e.target.getPosition())
                        })

                    }

                })

                // this.placeSearch.search('北京大学',(status,result) => {
                //     console.log(result)
                // })
            },

            getDistributed() {

            }

        },

        components: {}
    }
</script>

<style scoped lang="scss">
  .box {
    position: relative;

    .search {
      position: absolute;
      top: 10px;
      right: 20px;
      padding: 10px;
      width: 300px;
      heigth: 200px;
      background: #ffffff;
      border: 1px solid #EBEEF5;
      color: #303133;
      -webkit-transition: .3s;
      transition: .3s;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);*/
      box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
      border-radius: 4px;

      p {
        color: #999;
      }

      div {
        margin: 5px 0;
      }

      ul {
        li {
          padding: 5px 10px;
          margin: 5px 0;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s;
          &:hover {
            background: #f3f5f7;
          }

          p {
            color: #111111;
          }
        }
      }
    }
  }
</style>
