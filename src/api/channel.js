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
/**
 * 添加频道
 * @param id
 * @param seq
 * @returns {*}
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
