<template>
  <div>
    <van-cell-group class="article-list" inset>
      <van-cell v-if="article.cover.type === 0" :label="label" :title="article.title"/>

      <van-cell v-if="article.cover.type === 1" :label="label" :title="article.title">
        <van-image :src="article.cover.images[0]" height="100px" width="100px"/>
      </van-cell>

      <van-cell v-else :label="label" :title="article.title">
        <template #label>
          <van-image v-for="(item,index) in article.cover.images" :key="index" :src="item" height="100"
                     style="margin-right: 7px" width="100"/>
          <div>{{ label }}</div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// import { getDateDiff } from '@/utils/dayjs'

import { timeAgo } from '@/utils/dayjs'

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    label () {
      const { aut_name: autName, comm_count: commCount, pubdate } = this.article
      return `${autName} ${commCount}评论 ${timeAgo(pubdate)}`
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list {
  .van-cell-group--inset {
    margin: 20px;
  }
}
</style>
