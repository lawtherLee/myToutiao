import request from '@/utils/request'

/**
 * 获取文章列表
 * @param params 频道id，时间戳，是否置顶
 * @returns {*}
 */
export const getArticleList = params => {
  return request({
    url: '/v1_0/articles',
    params
  })
}
