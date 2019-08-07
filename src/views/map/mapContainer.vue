<template>
    <div id="amap-main" style="width: 500px;height: 400px;">

    </div>
</template>

<script>
    import { lazyAMapApiLoaderInstance } from 'vue-amap';

    export default {
        name: "mapContainer",
        props: {
          props: {
            options: Object
          },
        },
        data() {
            return {
              $map: null
            }
        },

        created() {
          this.$nextTick(() => {
            lazyAMapApiLoaderInstance.load().then(() => {
              this.$map = new AMap.Map(this.$el, this.options);
            });
          })
        },

        // mounted() {
        //   this.$map = new AMap.MAP(this.$el, this.options)
        // },
        components: {},
        beforeDestroy () {
          // 组件销毁前可销毁地图实例
          this.$map && this.$map.destroy()
        }
    }
</script>

<style scoped lang="scss">

</style>
