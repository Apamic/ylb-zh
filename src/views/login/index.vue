<template>
  <div class="login-container">
    <h4 style="font-weight: 700;font-size: 24px;">医联邦政府端</h4>
    <div style="display: flex;align-items: center;justify-content: center;">
      <div style="position: relative;">
        <img style="vertical-align: middle;" width="500" height="620" src="@/views/login/left.png"/>
        <img src="@/views/login/logo@2x.png" height="240" width="242" style="position: absolute;top: 190px;left: 130px;"/>
      </div>
      <div style="padding: 120px 90px;height: 620px;box-sizing: border-box;background: #fff;">
        <p style="margin-bottom: 20px;color: #0076FF;font-size: 14px;text-align: left"><span style="color:rgba(0,118,255,1);font-size: 24px">医联邦政府端</span> —区域医疗大数据平台</p>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
            <el-input
              ref="username"
              v-model="loginForm.account"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.pwd"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
          </el-form-item>

<!--          <el-form-item style="background: #fff!important;">-->
<!--            <el-col :span="11">-->
<!--              <el-input v-model="loginForm.sysType" style="width: 100%;background: rgba(0, 0, 0, 0.1);"></el-input>-->
<!--            </el-col>-->
<!--            <el-col class="line" :span="2">&nbsp;</el-col>-->
<!--            <el-col :span="11">-->
<!--                <p style="height: 47px;width: 100%;border: 1px solid #ccc;line-height: 47px;text-align: center;color: #0076FF;font-size: 24px">{{loginForm.sysType}}</p>-->
<!--            </el-col>-->
<!--          </el-form-item>-->

          <el-form-item>
            <el-button :loading="loading" type="primary" size="medium" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
<!--            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="login">登录</el-button>-->
          </el-form-item>
        </el-form>
      </div>

    </div>
    <p>&#169 2016-2019 YLB All Rights Reserved.</p>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        account: '',
        pwd: '',
        sysType: '1003106',
        code: '123'
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', validator: validateUsername }],
        pwd: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(res => {
            this.$router.push({ path: this.redirect || '/' })
              console.log(res)
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

      login() {
        this.$refs.loginForm.validate(valid => {
            if(valid) {
                this.loading = true
                this.$axios({
                    url: '/system/user/login',
                    method: 'POST',
                    data: {
                        "account": this.loginForm.account,
                        "pwd": this.loginForm.pwd,
                        "sysType": this.loginForm.sysType
                    },
                }).then(res => {
                    console.log(res)
                    // this.$router.push({ path: this.redirect || '/' })
                }).catch(() => {
                    this.loading = false
                })
            } else {
                console.log('error submit!!')
                return false
            }
        })

      },

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background: url("bj.png");
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;


.login-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 10px 10px 10px;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  color: #ffffff;
  overflow: hidden;
  h4 {
    text-align: center;
  }
  p {
    font-size:16px;
    text-align: center;
  }
  .login-form {
    position: relative;
    width: 320px;
    max-width: 100%;
    /*padding: 160px 35px 0;*/
    /*margin: 0 auto;*/
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
