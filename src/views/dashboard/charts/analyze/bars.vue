<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import resize from '../mixins/resize'


  const animationDuration = 6000

  export default {
    mixins: [resize],
    props: {
      percentage:{
        type:Array
      },
      scope:{
        type:Array
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
        chart: null,

      }
    },
      watch: {
          percentage() {
              this.initChart()
          },
      },

    mounted() {
      this.$nextTick(() => {
//        this.getAgeListData()
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
//      getAgeListData() {
//        this.listLoading = true
//        let t=this
//        getAgeList({
//            "areaType" : "0",
//            "areaId" : 2019061711378900,
//            "timeType" : "0",
//
//
//          }
//        ).then(response => {
//
//
//          response.data.ageList.forEach(function (e) {
//            t.scope.push(e.scope);
//            t.percentage.push(e.percentage)
//          })
//
//        })
//
//      },

  initChart()
  {
    console.log(this.scope);
    this.chart = echarts.init(this.$el, 'macarons')

    this.chart.setOption({
      title: {
        text: '年龄趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: 60,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: this.scope,
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLabel: {
          formatter: '{value}%'
        }
      }],
      series: [{
        name: '百分比',
        type: 'bar',
        stack: 'vistors',
        barWidth: '40%',
        data: this.percentage,
        animationDuration
      }]
    })

  }
  }
  }
</script>
