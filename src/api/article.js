import request from '@/utils/request'

/**
 * 获取文章列表
 * @returns {*}
 * @param id 频道id
 * @param timestamp 时间戳
 */
export const getArticleList = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
