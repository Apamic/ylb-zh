<template>


    <div :class="className" :style="{height:height,width:width}" />

</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from '../mixins/resize'

  const animationDuration = 6000

  export default {
    mixins: [resize],
    props: {
      crowd:{
        type:Object,
      },
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    data() {
      return {
        chart: null
      }
    },

      watch: {
          crowd() {
              this.initChart()
          }
      },
    mounted() {
      this.$nextTick(() => {



            this.initChart()



      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {

        if(this.crowd.total=='0'){

        }else {
          this.chart = echarts.init(this.$el, 'macarons')
          const t=this
          this.chart.setOption( {
            itemStyle:{
              normal: {
                borderWidth: 5,
                borderColor: '#fff',
              }
            },
            title: {
              text: '总人数\n'+ this.crowd.total,
              top:'center',
              textAlign:'center',
              left:'19%',

              textStyle:{
                color:'#000',
                lineHeight:30
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              type: 'scroll',
              orient: 'vertical',
              left: '40%',
              top: 0,
              itemGap: 15,
              padding: [10,40,10,0],
              width: 1000,
              data:this.crowd.type,
              itemWidth:20,
              itemHeight:20,
              align:'left',
              formatter:function (name) {
                let amount=0;
                let total=0;
                t.crowd.arr.forEach(function (e) {
                  total+=e.value;
                  if(e.name==name){
                    amount=e.value
                  }
                });
                let arr = [
                  '{b|'+name+'}',
                  '{d| |}',
                  '{a|'+((amount/total)*100).toFixed(2)+'%}',
                  '{c|'+amount+'}'
                ];
                return  arr.join(' ')
              },
              textStyle:{
                rich:{
                  b:{
                    fontSize:14,
                    width:100,
                    align:'left',
                    padding:[0,10,0,10]
                  },
                  d:{
                    fontSize:14,
                    color:'#cfcfcf',
                    padding:[0,10,0,10]
                  },
                  a:{
                    fontSize:14,
                    color:'#cfcfcf',
                    width:200,
                    align:'left',
                    padding:[0,0,0,0]
                  },

                  c:{
                    fontSize:14,
                    align:'right',
                    padding:[0,0,0,0]
                  },
                }
              }
            },
            series: [
              {
                itemStyle:{
                  borderWidth: '5',
                  borderColor: '#fff',
                },
                name:'重点人群分布',
                type:'pie',
                radius: ['60%', '80%'],
                center: ['20%', '50%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show:false,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:this.crowd.arr
              }
            ]
          } )
        }

      }
    }
  }
</script>
