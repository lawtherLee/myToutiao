import request from '@/utils/request'

/**
 * 登录
 * @param data
 * @returns {*}
 */
export const loginAPI = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
/**
 * 获取验证码
 * @param mobile
 * @returns {*}
 */
export const getSmsCodeAPI = mobile => request({
  method: 'GET',
  url: `/v1_0/sms/codes/${mobile}`
})

/**
 * 获取用户信息
 * @returns {*}
 */
export const getUserinfoAPI = () => {
  return request({
    url: '/v1_0/user/'
  })
}
