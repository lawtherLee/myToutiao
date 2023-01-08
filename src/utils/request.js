import axios from 'axios'
import store from '@/store'
import router from '@/router'
// import router from '@/router'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

request.interceptors.request.use(config => {
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  return response
}, async error => {
  console.dir(error)
  // 解决401
  if (error.response && error.response.status === 401) {
    // 检测是否有refreshToken
    const user = store.state.user
    if (!user.token || !user.refresh_token) {
      await router.push('/login')
      return
    }
    // 如果有refresh则请求新的token
    try {
      const res = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 获取成功，把新的token更新到容器中
      console.log('刷新token success～', res)
      store.commit({
        type: 'SET_TOKEN',
        token: res.data.data.token,
        refresh_token: res.data.data.refresh_token
      })
      // 把当时失败的请求重新发出去
      return request(error.config)
    } catch (e) {
      // 获取失败直接跳转登录页
      await router.push('/login')
    }
  }

  return Promise.reject(error)
})
export default request
