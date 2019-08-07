<template>
  <div class="box">
    <div class="table-wrap">
      <div>
        <el-button type="primary" @click="showDialog">+添加</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          label="序号"
          type="index"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="健康小屋">
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="管理社区"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="onDeit(scope)">编辑</el-button>
            <el-button type="danger" @click="onDelete(scope)" :loading="loading">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

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
    </div>

    <el-dialog title="添加健康小屋" :visible.sync="dialogFormVisible" width="60%">
      <el-form :model="form">
        <el-form-item label="健康小屋名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康小屋地址:" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康小屋地图:" :label-width="formLabelWidth">
          <div id="amap-main" style="width:450px; height:350px">

          </div>
        </el-form-item>
        <el-form-item label="健康小屋管理社区:" :label-width="formLabelWidth">
          <el-select v-model="form.orgId" placeholder="请选择" style="width: 40%">
            <el-option
              v-for="item in options"
              :key="item.orgId"
              :label="item.orgName"
              :value="item.orgId">
            </el-option>
          </el-select>
        </el-form-item>
        <!--          <el-form-item label="健康小屋接口地址:" :label-width="formLabelWidth">-->
        <!--            <el-input v-model="form.name" autocomplete="off"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="健康小屋接口秘钥:" :label-width="formLabelWidth">-->
        <!--            <el-input v-model="form.name" autocomplete="off"></el-input>-->
        <!--          </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!add" type="primary" @click="onUpdate()" :loading="loading">提交</el-button>
        <el-button v-if="add" @click="onSave()" :loading="loading">保存</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>

    // import AMap from 'AMap'
    import {lazyAMapApiLoaderInstance} from 'vue-amap'
    // import map from '@/views/map/mapContainer'
    // import AMapUI from 'AMapUI'

    import {getToken} from '@/utils/auth'

    const state = {
        token: getToken('token'),
        name: getToken('nickName'),
        avatar: getToken('logo'),
        govId: getToken('govId')
    }

    export default {
        name: "management",
        props: {},
        data() {
            return {
                tableData: [],

                form: {
                    name: '',
                    address: '',
                    lng: '',
                    lat: '',
                    govId: state.govId,
                    orgId: '',

                },

                loading: false,

                dialogFormVisible: false,

                formLabelWidth: '140px',

                listTotal: 0,
                pageNum: 1,
                pageSize: 5,

                options: [],
                value: '',

                add: false,

                map: null,

                option: {
                    // center: [116.397428, 39.90923],
                    resizeEnable: true,
                    zoom: 12,
                    // plugin: [
                    //   {
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
                    //     pName: 'Geolocation',
                    //     events: {
                    //       init(o) {
                    //         // o 是高德地图定位插件实例
                    //         o.getCurrentPosition((status, result) => {
                    //           console.log(result)
                    //           if (result && result.position) {
                    //             self.lng = result.position.lng;
                    //             self.lat = result.position.lat;
                    //             self.center = [self.lng, self.lat];
                    //             self.loaded = true;
                    //             self.$nextTick();
                    //           }
                    //         });
                    //       }
                    //     }
                    //   }
                    // ]
                },

                markers: null
            }
        },
        created() {
            this.getList()
        },
        mounted() {

        },
        methods: {
            showDialog() {
                this.add = true
                this.dialogFormVisible = true
                this.getCommunityList()
                this.initMap()
                this.reset()
            },

            initMap() {
                this.$nextTick(() => {
                    lazyAMapApiLoaderInstance.load().then(() => {
                        this.map = new AMap.Map('amap-main', this.option)
                        // this.map.plugin(['AMap.ToolBar','AMap.MapType'],() => {
                        //     this.map.addControl(new AMap.ToolBar())
                        // this.map.addControl(new AMap.MapType({
                        //   showTraffic: false,
                        //   showRoad: false
                        // })
                        // )
                        //   }
                        // )

                        // this.map.plugin(['AMap.Geolocation'], () => {
                        //     let geolocation = new AMap.Geolocation({
                        //         enableHighAccuracy: true,
                        //         timeout: 100,
                        //         maximumAge: 0,
                        //         convert: true,
                        //         showButton: true,
                        //         buttonPosition: 'RB',
                        //         showMarker: true,
                        //         showCircle: true,
                        //         panToLocation: true,
                        //         zoomToAccuracy: true,
                        //         extensions: 'all',
                        //         pName: 'Geolocation'
                        //     })
                        //     this.map.addControl(geolocation)
                        //     geolocation.getCurrentPosition()
                        //     AMap.event.addListener(geolocation, 'complete', (reslut) => {
                        //         this.map.setCenter(reslut.position)
                        //         console.log(reslut)
                        //     })
                        //     AMap.event.addListener(geolocation, 'error', (reslut) => {
                        //         console.log(reslut)
                        //     })
                        // })

                        if (this.form.lng) {
                            this.markers = new AMap.Marker({
                                position: [this.form.lng, this.form.lat],
                                // position: [116.397428,39.90923],
                                map: this.map,
                                // 设置是否可拖拽
                                draggable: true,
                                // 设置拖拽效果
                                raiseOnDrag: true
                            })

                            this.map.panTo([this.form.lng, this.form.lat])
                        }

                        // this.createdMarker(item)
                        this.mapCilck()
                        this.scale = new AMap.Scale({
                            visible: false
                        })

                        this.map.addControl(this.scale);
                        this.scale.show();
                        // this.markers.setMap(this.map);
                        // this.markers.setAnimation('AMAP_ANIMATION_BOUNCE');
                        // this.mapRightCilck()
                    })

                })
            },

            getCommunityList() {
                let gdata = {
                    govId: state.govId,
                }
                this.$axios({
                    url: '/statistics/signing/communityList',
                    method: 'POST',
                    data: gdata,
                }).then(res => {
                    this.options = res.data.communityList

                })
            },

            getList() {
                let gdata = {
                    pageParam: {
                        pageSize: this.pageSize,
                        pageNum: this.pageNum
                    },
                    govId: state.govId

                }
                this.$axios({
                    url: '/healthHouse/house/list',
                    method: 'POST',
                    data: gdata,
                }).then(res => {
                    console.log(res)
                    this.tableData = res.data.houseInfoList
                    this.listTotal = res.data.total
                })
            },

            handleSizeChange(val) {
                this.pageSize = val
                this.pageNum = 1
                this.getList()
            },

            handleCurrentChange(val) {
                this.pageNum = val
                this.getList()
            },

            onDeit(item) {
                // console.log(item)
                this.showDialog()
                this.add = false
                this.$axios({
                    url: '/healthHouse/house/query',
                    method: 'POST',
                    data: {
                        houseInfo: {
                            houseId: item.row.houseId
                        }
                    },
                }).then(res => {
                    // console.log(res)
                    this.form = {
                        name: res.data.houseInfo.name,
                        address: res.data.houseInfo.address,
                        lng: res.data.houseInfo.lng,
                        lat: res.data.houseInfo.lat,
                        orgId: res.data.houseInfo.orgId,
                        govId: state.govId,
                        houseId: item.row.houseId
                    }

                    console.log( this.form)
                    this.initMap()
                    // this.createdMarker(item)
                })
            },

            onUpdate() {
              this.$axios({
                  url: '/healthHouse/house/update',
                  method: 'POST',
                  data: {
                      houseInfo: {
                          houseId: this.form.houseId,
                          name: this.form.name,
                          orgId: this.form.orgId,
                          govId: state.govId,
                          lat: this.form.lat,
                          lng: this.form.lng,
                          address: this.form.address
                      }
                  },
              }).then(res => {
                  this.$message({
                      type: 'success',
                      message: res.rtnMsg
                  })
                  this.getList()
                  this.dialogFormVisible = false
              }).finally(() => {
                  this.loading = false
              })
            },

            onDelete(item) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true
                    this.$axios({
                        url: '/healthHouse/house/delete',
                        method: 'POST',
                        data: {
                            houseInfo:{
                                houseId: item.row.houseId
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
                    this.loading = false
                })

            },

            onSave() {
                this.loading = true
                this.$axios({
                    url: '/healthHouse/house/save',
                    method: 'POST',
                    data: {
                        houseInfo: {
                            name: this.form.name,
                            orgId: this.form.orgId,
                            govId: state.govId,
                            lat: this.form.lat,
                            lng: this.form.lng,
                            address: this.form.address
                        }
                    },
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: res.rtnMsg
                    })
                    this.getList()
                    this.dialogFormVisible = false
                }).finally(() => {
                    this.loading = false
                })


            },

            reset() {
                this.form = {
                    name: '',
                    address: '',
                    lng: '',
                    lat: '',
                    houseId: '',
                }
                this.markers = null
            },



            createdMarker(item) {
                this.markers = new AMap.Marker({
                    position: [item.lng,item.lat],
                    position: [116.397428, 39.90923],
                    map: this.map
                })
                this.map.panTo([item.lng,item.lat]);


                this.markers =  new AMap.Marker({
                      position: [116.397428, 39.90923],
                      map: this.map
                    })

                AMap.event.addListener(marker, 'click', (e) => {
                    AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow) => {
                        let infoWindow = new SimpleInfoWindow({
                            infoTitle: '<strong>这是标题</strong>',
                            infoBody: '<p>这是信息</p>',
                            offset: new AMap.Pixel(0, -20),
                            autoMove: true
                        })
                    })
                    infoWindow.open(this.map, e.target.getPosition())
                    // 最坑的就是这一步了，他的infowindow没有点击事件，所以infoWindow.get$Container()会返回这个infowindow（jquery）对象
                    let infoEle = infoWindow.get$Container()
                    //给infowindow添加点击事件，并在回调函数中处理业务或者跳转等
                    infoEle.on('click', (e) => {
                        console.log('123')
                    })
                })
            },

            mapCilck() {
                this.map.on('click', (e) => {
                    // alert('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！')
                    if (this.markers) {
                        this.markers.setPosition([e.lnglat.getLng(), e.lnglat.getLat()])
                    } else {
                        this.markers = new AMap.Marker({
                            position: [e.lnglat.getLng(), e.lnglat.getLat()],
                            map: this.map
                        })
                    }
                    this.form.lng = e.lnglat.getLng()
                    this.form.lat = e.lnglat.getLat()
                    // console.log(this.form)
                })
            },

            mapRightCilck() {
                var lnglat = new AMap.LngLat(116.397, 39.918) //基点

                var contextMenu = new AMap.ContextMenu()

                contextMenu.addItem("放大一级", () => {
                    this.map.zoomIn();
                }, 0);

                contextMenu.addItem("缩小一级", () => {
                    this.map.zoomOut();
                }, 1);

                contextMenu.addItem("缩放至全国范围", (e) => {
                    this.map.setZoomAndCenter(4, [108.946609, 34.262324]);
                }, 2);

                contextMenu.addItem("添加标记", (e) => {
                    if (this.markers) {
                        this.markers.setPosition(this.contextMenuPositon)
                    } else {
                        this.markers = new AMap.Marker({
                            map: this.map,
                            position: this.contextMenuPositon //基点位置
                        })
                    }
                }, 3);

                this.map.on('rightclick', (e) => {
                    alert('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！')

                    contextMenu.open(this.map, e.lnglat);
                    this.contextMenuPositon = e.lnglat;
                });

                contextMenu.open(this.map, lnglat);
            }

        },
        components: {
            // map
        }
    }
</script>

<style scoped lang="scss">
  .box {
    .page {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
</style>
