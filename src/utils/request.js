import axios from 'axios'
import store from '@/store'
// import dsbridge from 'dsbridge'
// import qs from 'qs'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
// create an axios instance
// const dsBridge = require('dsbridge')
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 传递开启loading,不传不开启
    if (config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (store.getters.token) {
      config.headers['X-Token'] = store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    if (res.status && res.status !== 200) {
      // 登录超时,重新登录
      if (res.status === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
/** ************************** api封装 ************************** */
/**
 *
 * @param {string} url 路径
 * @param {object} params 参数
 * @param {boolean} hideloading 默认为 false不传就是显示hideloading效果，true为不显示hideloading效果
 *
 */
export const $get = (url, params, hideloading) => service({ url, method: 'get', params, hideloading })

export const $post = (url, data, params, hideloading) => service({ url, method: 'post', params, data, hideloading })

// export const $put = (url, data, params) => service({ url, method: 'put', params, data })

// export const $delete = (url, params) => service({ url, method: 'delete', params })

// export const $upload = (url, data, params) =>
//   service({
//     url,
//     method: 'post',
//     headers: { 'Content-Type': 'multipart/form-data' },
//     params,
//     data
//   })

// export const $simpleGet = (url, params) => service({ url, method: 'get', params, withCredentials: false })

// export const generateURL = (url, params) => {
//   let fullURL = ''
//   const query = qs.stringify(params, { addQueryPrefix: true, skipNulls: true })
//   if (/^(https?:)?\/\/\w+/.test(url)) {
//     fullURL = url + query
//   } else {
//     fullURL = config.url + url + query
//   }
//   return fullURL
// }

// export const $download = (url, params) => FileSaver.saveAs(generateURL(url, params))

export default service
