// import api from './index'
// axios
// import request from '@/utils/request'
import { $post, $get } from '@/utils/request'

// 登录
// export function login(data) {
//   return request({
//     url: api.Login,
//     method: 'post',
//     data
//   })
// }

export const LOGIN = (params, hideloading) => $post('api', params, hideloading)

// 用户信息 post 方法
// export function getUserInfo(data) {
//   return request({
//     url: api.UserInfo,
//     method: 'post',
//     data,
//     hideloading: true
//   })
// }

// 用户名称 get 方法
// export function getUserName(params) {
//   return request({
//     url: api.UserName,
//     method: 'get',
//     params,
//     hideloading: true
//   })
// }
export const GET_HSER_NAME = (params, hideloading) => $get('api', { params }, hideloading)
