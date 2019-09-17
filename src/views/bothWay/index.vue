<template>
  <div style="margin: 30px ;">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="转诊数据" name="first"><transfer></transfer></el-tab-pane>
      <el-tab-pane label="转诊统计" name="second"><InstitutionTransfer></InstitutionTransfer></el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
    import InstitutionTransfer from '@/views/bothWay/transfer/InstitutionTransfer.vue'
    import transfer from '@/views/bothWay/transfer/transfer'

    import {getToken} from '@/utils/auth'
    const state = {
        token: getToken('token'),
        name: getToken('nickName'),
        avatar: getToken('logo'),
        govId: getToken('govId')
    }


    export default {
        components: {
            InstitutionTransfer,
            transfer
        },

        created() {

        },
        mounted() {



        },
        methods: {


        },
        data() {
            return {
                activeName: 'first',
            };
        }
    };
</script>
<style>
  .market_out .el-range-separator {
    width: 10% !important;
  }
</style>
