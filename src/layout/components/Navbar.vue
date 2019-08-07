<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

<!--    <breadcrumb class="breadcrumb-container" />-->

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
<!--          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
          <span class="avatar-name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <!--<a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">-->
            <!--<el-dropdown-item>Github</el-dropdown-item>-->
          <!--</a>-->
          <!--<a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">-->
            <!--<el-dropdown-item>Docs</el-dropdown-item>-->
          <!--</a>-->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getToken, setToken, removeToken } from '@/utils/auth'



export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {

        this.$confirm('确认退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            removeToken('govId')
            removeToken('token')
            removeToken('nickName')
            removeToken('logo')
            this.$router.push('/login')


            this.$message({
                type: 'success',
                message: '退出成功!'
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消退出!'
            });
        });

      // console.log('out');
      // removeToken('govId')
      // removeToken('token')
      // removeToken('nickName')
      // removeToken('logo')
      // this.$router.push('/login')

//      await this.$store.dispatch('user/logout')

    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 40px;
  height: 68px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 68px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        display: flex;
        align-items: center;
        /*position: relative;*/
        .avatar-name{
          /*float: right;*/
          margin-left: 10px;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          /*position: absolute;*/
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
