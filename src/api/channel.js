import request from '@/utils/request'

/**
 * 获取用户频道列表
 * @returns {*}
 */
export const getUserChannelsAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有频道列表
 * @returns {*}
 */
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
