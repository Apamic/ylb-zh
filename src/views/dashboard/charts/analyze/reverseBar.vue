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
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption( {
          title: {
            text: '问诊科室分布TOP10',

          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          // legend: {
          //   data: ['2011年', '2012年']
          // },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['妇科','骨科','肿瘤科','中医','检验科','放射科','皮肤科','心血管','内分泌','消化科']
          },
          series: [
            {
              name: '2011年',
              type: 'bar',
              data: [0, 0, 0, 0, 0, 0,0,0,0,0]
            },

          ]
        })
      }
    }
  }
</script>
