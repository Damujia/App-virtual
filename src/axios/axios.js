import axios from 'axios'
import qs from 'qs'
import Toast from 'vant/lib/toast';
// 响应时间
// axios.defaults.timeout = 5 * 1000
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 配置接口地址
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://192.168.1.110:20924/wp20200924web'
} else if (process.env.NODE_ENV === 'production') {
  // axios.defaults.baseURL = 'http://192.168.7.127:8080/wp20200924web'
  axios.defaults.baseURL = 'http://192.168.0.163:8080/wp20200924web'
}
let toast = ''
let loadingObj = []
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '加载中',
    });
    loadingObj.push(toast)
    return config
  },
  err => {
    loadingObj.forEach(e => { e.close() })
    // Message.error('请求错误')
    return Promise.reject(err)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    loadingObj.forEach(e => { e.close() })
    return res
  },
  err => {
    loadingObj.forEach(e => { e.close() })
    // Message.error('请求失败，请稍后再试')
    return Promise.reject(err)
  }
)
// 发送请求
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data: params,
      withCredentials: true
    })
      // axios
      //   .post(url, params)
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
      .catch(() => { })
  })
}
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      params,
      withCredentials: true
    })
      // axios
      //   .get(url, {
      //     params: params
      //   })
      .then(res => {
        resolve(res)
      })
      .catch(() => {
        reject()
      })
  })
}
export function Delete (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(() => {
        reject()
      })
  })
}
