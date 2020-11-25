const state = {
  token: ''
}
const mutations = {
  // SET_USER_NAME(state, name) {
  //   state.userName = name
  // }
  // 登录
  signIn(state, data) {
    state.token = data.token
  }
}
const actions = {
  // 设置name
  // setUserName({ commit }, name) {
  //   commit('SET_USER_NAME', name)
  // }

  // 登录
  SIGN_IN({ commit }, params) {
    // api
    // commit('signIn', data)
  }
}
export default {
  state,
  mutations,
  actions
}
