const state = {
  getuserinfo: {}
}
const mutations = {
  // 获取用户信息
  signIn(state, data) {
    state.getuserinfo = { ...data }
  }
}
const actions = {
  // 获取原生用户信息
  SIGN_IN({ commit }) {
    const User = this.$bridge.call('getUserInfo')
    if (User) {
      const getUserInfo = JSON.parse(User)
      commit('signIn', getUserInfo)
    }
  }
}
export default {
  state,
  mutations,
  actions
}
// 用户信息
// let userinfo = {
//   cityCode: "510100",
//   cityName: "成都市",
//   terminal: "Android",
//   userId: "100386",
//   machineCode: "3119152b5e40fa63",
//   merId: "",
//   token: "Rk8rL3ZlKy92VUR2djczdnY3M3Z2NzN2djczSGswTVFOVVB2djcxZjc3KzlkZSsvdlFNeE1EQXpPRFk9",
//   versionCode: "3.0.2",
//   merName: ""
// }
