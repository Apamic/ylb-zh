import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken('token'),
  name: getToken('nickName'),
  avatar: getToken('logo'),
  govId: getToken('govId')
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_gov: (state, avatar) => {
    state.gov = avatar
    // console.log(state.gov);
  },

  SET_LOGO: (state,logo) => {

  },

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, pwd, sysType } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), pwd: pwd, sysType: sysType }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.user.token)
        commit('SET_NAME', data.user.nickName)
        commit('SET_AVATAR', data.user.logo)
        console.log(data.user.govId)
        commit('SET_gov', data.user.govId)
        setToken('govId', data.user.govId)
        setToken('govName',data.user.govName)
        setToken('token', data.user.token)
        setToken('nickName', data.user.nickName)
        setToken('logo', data.user.logo)
        setToken('orgId',data.user.orgId)
        setToken('orgName',data.user.orgName)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response
  //
  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }
  //
  //       const { name, avatar } = data
  //
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_TOKEN', '')
  //       commit('SET_NAME', '')
  //       commit('SET_AVATAR', '')
  //       removeToken('token')
  //       removeToken('nickName')
  //       removeToken('logo')
  //       resetRouter()
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

