import request from '@/utils/request'

/**
 * 获取频道列表
 * @returns {*}
 */
export const getUserChannelsAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
