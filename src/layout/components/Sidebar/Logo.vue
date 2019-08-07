<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <div class="flex">
          <img v-if="logo === 'null'"  class="sidebar-logo" src="@/assets/logo.png" width="32" height="32"/>
          <img v-else :src="logo" class="sidebar-logo"/>
<!--          <h1 class="sidebar-title">{{ title }}</h1>-->
        </div>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <div class="flex">
          <img v-if="logo === 'null'"  class="sidebar-logo" src="@/assets/logo.png" width="32" height="32"/>
          <img v-else :src="logo" class="sidebar-logo"/>
          <h1 class="sidebar-title">{{ title }}</h1>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script>

    import {getToken} from '@/utils/auth'

    const state = {
        token: getToken('token'),
        name: getToken('nickName'),
        avatar: getToken('logo'),
        govId: getToken('govId'),
        orgName: getToken('orgName'),
        govName: getToken('govName')
    }

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
        title: '',
      // logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
        logo: '',

    }
  },

  created() {

      this.title = state.govName
      this.logo = state.avatar
      // console.log(this.logo)
      // console.log(state.avatar)
  }
}
</script>

<style lang="scss" scoped>
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    img {
      margin-bottom: 5px;
    }
  }

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 68px;
  /*line-height: 50px;*/
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #f3f5f7;
      /*font-weight: 500;*/
      /*line-height: 50px;*/
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
