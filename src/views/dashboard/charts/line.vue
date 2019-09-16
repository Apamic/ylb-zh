<template>
  <div :id="id" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
    import echarts from 'echarts'
    import resize from './mixins/resize'

    export default {
        mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '200px'
            },
            lineData: {
                type: Array
            },

            nameIndex: {
                type: Number
            }
        },
        data() {
            return {
                chart: null,
                date: [],
                amount: [],
                money: [],
                list: ['在线问诊量','特色服务包','医疗服务包','健康产品','上门服务']
            }
        },

        watch: {
            lineData() {
                this.$nextTick(() => {
                    if (this.lineData) {
                        this.initChart()
                    }
                })
            }
        },

        created() {
            this.$nextTick(() => {
                this.initChart()
                // console.log(this.date)
                // console.log('特色服务包',this.nameIndex)
            })
        },
        mounted() {

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
                this.chart = echarts.init(document.getElementById(this.id))

                this.lineData.forEach(item => {
                    this.date.push(item.date)
                    this.money.push(item.money)
                    this.amount.push(item.amount)
                })

                this.chart.setOption({
                    color: ['#2fc25b', '#108ee9'],
                    title: {
                        text: this.list[this.nameIndex],
                        top: '10',
                        textStyle: {
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['数量', '金额']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {},
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        // data: ['周一','周二','周三','周四','周五','周六','周日'],
                        data: this.date,
                    },
                    yAxis: {
                        type: 'value'
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            realtime: true,
                            start: 65,
                            end: 85
                        },
                        // {
                        //     // type: 'slider',
                        //     realtime: true,
                        //     start: 65,
                        //     end: 85
                        // }
                    ],
                    series: [
                        {
                            name: '数量',
                            type: 'line',
                            // stack: '总量',
                            // data:[120, 132, 101, 134, 90, 230, 210]
                            data: this.amount
                        },
                        {
                            name: '金额',
                            type: 'line',
                            // stack: '总量',
                            // data:[220, 182, 191, 234, 290, 330, 310]
                            data: this.money,
                        },

                    ]
                })


            },


        }
    }
</script>
